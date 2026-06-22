import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display, Alex_Brush, Noto_Sans_Arabic } from 'next/font/google';
import { getMessages, getLocale } from 'next-intl/server';
import { ThemeProvider, I18nProvider, SmoothScrollProvider } from '@/providers';

import '@/styles/globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const signature = Alex_Brush({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-signature',
    display: 'swap',
});

const notoSansArabic = Noto_Sans_Arabic({
    subsets: ['arabic'],
    variable: '--font-arabic',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: {
        default: 'Osama Shakaki | AI Engineer',
        template: '%s | Osama Shakaki',
    },
    description: 'Honours Computer Science graduate from Islamic University (Madinah) with expertise in AI, Data Science, and Full-Stack Development. Multi-award winning innovator (1st place Agenticthon & Future Fintech Hackathons), skilled in Python, ML/DL/NLP, and integrating AI models into scalable applications using LLMs and multi-agent architectures.',
    keywords: ['AI Engineer', 'Machine Learning', 'Data Science', 'Full Stack Developer', 'Python', 'NLP', 'Deep Learning', 'Osama Shakaki', 'LLM', 'Multi-Agent AI'],
    authors: [{ name: 'Osama Ahmad Anas Shakaki' }],
    creator: 'Osama Ahmad Anas Shakaki',
    metadataBase: new URL('https://osamashakaki.dev'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://osamashakaki.dev',
        title: 'Osama Shakaki | AI Engineer',
        description: 'Multi-award winning AI Engineer building scalable intelligent systems. Expertise in ML, NLP, and multi-agent architectures.',
        siteName: 'Osama Shakaki Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Osama Shakaki | AI Engineer',
        description: 'Multi-award winning AI Engineer building scalable intelligent systems.',
        creator: '@OsamaSh_CS',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.png', media: '(prefers-color-scheme: light)' },
            { url: '/favicon.png', media: '(prefers-color-scheme: dark)' },
        ],
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    ],
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
};

import { ThemeAwareClickSpark } from '@/components/ui/ThemeAwareClickSpark';
import { ConditionalNavigation } from '@/components/layout/ConditionalNavigation';
import { ChatBot } from '@/components/layout/ChatBot';
import { Analytics } from '@vercel/analytics/next';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} data-scroll-behavior="smooth" suppressHydrationWarning>
            <head>
                <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
            </head>
            <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${signature.variable} ${notoSansArabic.variable} font-sans relative`}>
                <ThemeProvider>
                    <I18nProvider locale={locale} messages={messages}>
                        <SmoothScrollProvider>
                            <ThemeAwareClickSpark>
                                <ConditionalNavigation>
                                    {children}
                                </ConditionalNavigation>
                                <ChatBot headless />
                            </ThemeAwareClickSpark>
                        </SmoothScrollProvider>
                    </I18nProvider>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
