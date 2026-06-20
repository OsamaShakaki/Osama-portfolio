import { chatbotKnowledge, interviewLibrary, KnowledgeSection, InterviewQA } from '../data/chatbot-knowledge';

export interface RetrievedContext {
    sections: KnowledgeSection[];
    interviewQAs: InterviewQA[];
    isInterviewQuestion: boolean;
}

/**
 * Normalizes text by converting to lowercase, removing punctuation and extra whitespace.
 */
function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\u061f]/g, "") // removes english and arabic question marks, punctuation
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * Simple keyword-based matcher to retrieve relevant sections and interview responses.
 */
export function retrieveContext(query: string): RetrievedContext {
    const normalizedQuery = normalizeText(query);
    const queryWords = normalizedQuery.split(" ");

    // 1. Score and rank Knowledge Sections
    const sectionScores = chatbotKnowledge.map(section => {
        let score = 0;
        
        section.keywords.forEach(keyword => {
            const normalizedKeyword = normalizeText(keyword);
            const keywordWords = normalizedKeyword.split(" ");
            
            if (keywordWords.length > 1) {
                // Multi-word keyword: give a high score if it is contained in the query
                if (normalizedQuery.includes(normalizedKeyword)) {
                    score += 6; 
                }
            } else {
                // Single-word keyword: check exact word match first
                if (queryWords.includes(normalizedKeyword)) {
                    score += 4;
                } else if (normalizedQuery.includes(normalizedKeyword)) {
                    score += 1.5;
                }
            }
        });

        // Add additional points for title match
        const titleEn = normalizeText(section.titleEn);
        const titleAr = normalizeText(section.titleAr);
        if (normalizedQuery.includes(titleEn) || normalizedQuery.includes(titleAr)) {
            score += 10;
        }

        return { section, score };
    });

    // 2. Score and rank Interview QA pairs
    const qaScores = interviewLibrary.map(qa => {
        let score = 0;

        qa.keywords.forEach(keyword => {
            const normalizedKeyword = normalizeText(keyword);
            const keywordWords = normalizedKeyword.split(" ");
            
            if (keywordWords.length > 1) {
                if (normalizedQuery.includes(normalizedKeyword)) {
                    score += 6;
                }
            } else {
                if (queryWords.includes(normalizedKeyword)) {
                    score += 4;
                } else if (normalizedQuery.includes(normalizedKeyword)) {
                    score += 1.5;
                }
            }
        });

        // Check if the query matches the question text (either English or Arabic)
        const qEn = normalizeText(qa.questionEn);
        const qAr = normalizeText(qa.questionAr);
        if (normalizedQuery.includes(qEn) || normalizedQuery.includes(qAr)) {
            score += 15; // Extremely high relevance score for matching the actual question
        }

        // Check overlap count
        const qEnWords = qEn.split(" ");
        const qArWords = qAr.split(" ");
        let wordOverlap = 0;
        queryWords.forEach(word => {
            if (word.length > 2 && (qEnWords.includes(word) || qArWords.includes(word))) {
                wordOverlap++;
            }
        });
        score += wordOverlap * 2;

        return { qa, score };
    });

    // Filter and sort
    const matchedSections = sectionScores
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.section);

    const matchedQAs = qaScores
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.qa);

    // If there is a strong interview QA match (score >= 4), flag as Interview Question
    const topQA = qaScores.sort((a, b) => b.score - a.score)[0];
    const isInterviewQuestion = topQA && topQA.score >= 4;

    // Default fallbacks if nothing matched
    const finalSections = matchedSections.length > 0 
        ? matchedSections.slice(0, 3) 
        : chatbotKnowledge.slice(0, 2); // Default to personal profile and recruiter insights

    const finalQAs = matchedQAs.slice(0, 3);

    return {
        sections: finalSections,
        interviewQAs: finalQAs,
        isInterviewQuestion: !!isInterviewQuestion
    };
}
