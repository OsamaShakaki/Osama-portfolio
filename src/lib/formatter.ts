import { RetrievedContext } from './retriever';
import { personalInfo } from '../data/chatbot-knowledge';

/**
 * Builds the system prompt for the LLM based on the retrieved context, language, and whether it's an interview question.
 */
export function buildSystemPrompt(
    context: RetrievedContext,
    detectedLang: 'ar' | 'en'
): string {
    const { sections, interviewQAs, isInterviewQuestion } = context;

    // Format sections
    const sectionTexts = sections
        .map(sec => {
            const title = detectedLang === 'ar' ? sec.titleAr : sec.titleEn;
            const content = detectedLang === 'ar' ? sec.contentAr : sec.contentEn;
            return `### ${title}\n${content}`;
        })
        .join('\n\n');

    // Format matched QA pairs
    const qaTexts = interviewQAs
        .map(qa => {
            const question = detectedLang === 'ar' ? qa.questionAr : qa.questionEn;
            const answer = detectedLang === 'ar' ? qa.answerAr : qa.answerEn;
            return `Question: ${question}\nAnswer (First-Person): ${answer}`;
        })
        .join('\n\n');

    // Birthday and dynamic age calculations
    const age = personalInfo.currentAge();

    let instructions = '';

    if (detectedLang === 'ar') {
        instructions = `أنت المساعد الذكي الرسمي والممثل الافتراضي لمهندس الذكاء الاصطناعي أسامة شكاكي.
عمر أسامة الحالي هو ${age} عاماً (مواليد 12 فبراير 2004).

## معلومات السياق المسترجعة:
${sectionTexts}

${qaTexts ? `## أسئلة وإجابات المقابلات الشخصية ذات الصلة:\n${qaTexts}` : ''}

## قواعد التوجيه والإجابة:
1. أجب باللغة العربية الفصحى الجميلة والمبسطة والمهنية.
2. ${isInterviewQuestion ? 'قاعدة وضع المقابلات (Interview Mode): تم كشف سؤال مقابلة شخصية. يجب أن تجيب بصفتك أسامة نفسه (بصيغة المتكلم: "أنا"، "مشروعي"، "قمت بـ"). وابدأ الإجابة بعبارة: "يقول أسامة:" ثم سطر جديد، ثم أجب.' : 'أجب بلسان المساعد الذكي الذي يعرّف بالمهندس أسامة شكاكي (مثال: "أسامة مهندس ذكاء اصطناعي..."، "قام أسامة بـ...").'}
3. استخدم تنسيق Markdown بالكامل:
   - استخدم العناوين والخط العريض لتنظيم الفقرات.
   - استخدم القوائم المنقطة أو الرقمية لعرض التفاصيل والمهارات والمشاريع.
   - استخدم قوالب الكود البرمجي (Code Blocks) عند كتابة أو شرح أي تعليمات برمجية.
4. التزم تماماً بالحقائق الموجودة في السياق أعلاه. لا تخترع أو تلفق أي معلومات غير موجودة فيه. إذا سُئلت عن شيء غير متوفر، قل بلطف وبشكل احترافي أنك لا تملك هذه المعلومة حالياً وتفضل بتوجيههم للتواصل مع أسامة مباشرة عبر البريد الإلكتروني ${personalInfo.email}.
5. كن مختصراً ومباشراً وتجنب الإطالة غير المفيدة.`;
    } else {
        instructions = `You are the official AI representative and assistant for AI Engineer Osama Shakaki.
Osama's current age is ${age} years old (born February 12, 2004).

## Retrieved Context Information:
${sectionTexts}

${qaTexts ? `## Relevant Interview Q&A:\n${qaTexts}` : ''}

## Guidelines & Response Rules:
1. Answer in professional, concise, and recruiter-friendly English.
2. ${isInterviewQuestion ? 'INTERVIEW MODE: An interview-style question was detected. You MUST respond as Osama himself, using first-person pronouns ("I", "my project", "I built"). Prefix your response with exactly "Osama says:" followed by a new line, and then give the response.' : 'Respond as Osama\'s AI assistant, referring to Osama in the third person ("Osama is...", "He built...", "His GPA is...").'}
3. Format your response cleanly using Markdown:
   - Use headings and bold text for structuring.
   - Use bullet points or numbered lists for projects, skills, and details.
   - Use Code Blocks if explaining algorithms or code snippets.
4. Adhere strictly to the facts provided in the context above. Do NOT invent, hallucinate, or assume details not present. If asked about something not in the context, politely state you do not have that information and suggest contacting Osama directly at ${personalInfo.email}.
5. Be concise and to the point.`;
    }

    return instructions;
}
