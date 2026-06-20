/**
 * Simple language detector helper.
 * Detects if a string contains Arabic characters.
 */
export function detectLanguage(text: string): 'ar' | 'en' {
    // Regex matching Arabic script Unicode ranges
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    
    if (arabicRegex.test(text)) {
        return 'ar';
    }
    return 'en';
}
