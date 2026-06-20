import { NextRequest, NextResponse } from 'next/server';
import { detectLanguage } from '@/lib/languageDetector';
import { retrieveContext } from '@/lib/retriever';
import { buildSystemPrompt } from '@/lib/formatter';
import { isRateLimited } from '@/lib/rateLimiter';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatRequest {
    messages: Message[];
    locale?: string;
}

// ─── Groq API call ───────────────────────────────────────────────────────────
async function callGroq(messages: Message[], systemPrompt: string): Promise<string> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error('GROQ_API_KEY not configured');

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages,
            ],
            max_tokens: 1024,
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Groq API error ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty response from Groq');
    return content;
}

// ─── Gemini API call ─────────────────────────────────────────────────────────
async function callGemini(messages: Message[], systemPrompt: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

    // Convert messages to Gemini format
    const geminiContents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
    }));

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents: geminiContents,
                generationConfig: {
                    maxOutputTokens: 1024,
                    temperature: 0.7,
                },
            }),
        }
    );

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Gemini API error ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error('Empty response from Gemini');
    return content;
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    try {
        // Rate Limiting (10 requests per minute)
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                   req.headers.get('x-real-ip') || 
                   '127.0.0.1';
        if (isRateLimited(ip, { limit: 10, windowMs: 60 * 1000 })) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again in a minute.' },
                { status: 429 }
            );
        }

        const body: ChatRequest = await req.json();

        if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
            return NextResponse.json(
                { error: 'Invalid request: messages array is required.' },
                { status: 400 }
            );
        }

        // Validate each message
        for (const msg of body.messages) {
            if (!msg.role || !msg.content || typeof msg.content !== 'string') {
                return NextResponse.json(
                    { error: 'Invalid message format.' },
                    { status: 400 }
                );
            }
            if (!['user', 'assistant'].includes(msg.role)) {
                return NextResponse.json(
                    { error: 'Invalid message role.' },
                    { status: 400 }
                );
            }
        }

        // Limit to last 20 messages to avoid token overflow
        const messages = body.messages.slice(-20);
        
        // Find the last user query to retrieve context
        const lastUserQuery = [...messages].reverse().find(m => m.role === 'user')?.content || '';
        const detectedLang = detectLanguage(lastUserQuery);
        const context = retrieveContext(lastUserQuery);
        const systemPrompt = buildSystemPrompt(context, detectedLang);

        let reply: string;
        let provider: string;

        // Try Groq first, then fallback to Gemini, then local fallback
        try {
            reply = await callGroq(messages, systemPrompt);
            provider = 'groq';
        } catch (groqError) {
            console.warn('[Chat] Groq failed, falling back to Gemini:', groqError);
            try {
                reply = await callGemini(messages, systemPrompt);
                provider = 'gemini';
            } catch (geminiError) {
                console.warn('[Chat] Both AI providers failed or are unconfigured. Using local fallback responder.');
                reply = generateLocalFallbackResponse(messages);
                provider = 'local-fallback';
            }
        }

        return NextResponse.json({ reply, provider });
    } catch (error) {
        console.error('[Chat] Unexpected error:', error);
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}

// ─── GET health check ─────────────────────────────────────────────────────────
export async function GET() {
    const hasGroq = !!process.env.GROQ_API_KEY;
    const hasGemini = !!process.env.GEMINI_API_KEY;
    return NextResponse.json({
        status: 'ok',
        providers: { groq: hasGroq, gemini: hasGemini },
    });
}

// ─── Local Fallback Responder ─────────────────────────────────────────────────
function generateLocalFallbackResponse(messages: Message[]): string {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';
    const lang = detectLanguage(lastUserMessage);
    const context = retrieveContext(lastUserMessage);
    
    // Check if we retrieved a strong interview response
    if (context.interviewQAs.length > 0 && context.isInterviewQuestion) {
        const topQA = context.interviewQAs[0];
        const answer = lang === 'ar' ? topQA.answerAr : topQA.answerEn;
        const prefix = lang === 'ar' ? 'يقول أسامة:\n\n' : 'Osama says:\n\n';
        return `${prefix}${answer}`;
    }
    
    // Check if we retrieved a specific section match
    if (context.sections.length > 0) {
        const topSection = context.sections[0];
        return lang === 'ar' ? topSection.contentAr : topSection.contentEn;
    }
    
    // General fallback template if nothing matched
    if (lang === 'ar') {
        return `مرحباً! أنا المساعد الافتراضي للمهندس أسامة شكاكي.
بسبب عدم توفر مفاتيح API حالياً، أعمل بوضع الاستجابة المحلية.

يمكنني إخبارك عن:
- الملف الشخصي والتعليم ومعدله (4.57/5)
- مشروع التخرج (تصنيف إشارات الدماغ بدقة 94%)
- مشروع منجز (المركز الأول في أنجيكثون 2026)
- خبرته في شركة الفنار للدعم الفني
- معلومات الاتصال والتواصل

ما الذي تود معرفته؟`;
    } else {
        return `Hello! I am Osama Shakaki's AI Assistant.
Due to API keys being unconfigured, I am running in local fallback mode.

I can tell you about:
- Osama's profile, GPA (4.57/5), and education.
- Graduation project (AI EEG Signal Converter with 94% accuracy).
- Monjez Project (1st place at Agenticthon 2026).
- Alfanar Company internship experience.
- Contact details and social links.

What would you like to know?`;
    }
}
