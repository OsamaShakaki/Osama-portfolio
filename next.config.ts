import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'assets.aceternity.com' }
        ],
        formats: ['image/avif', 'image/webp'],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; img-src 'self' data: blob: https://cdn.jsdelivr.net https://images.unsplash.com https://assets.aceternity.com https://cdn.simpleicons.org; font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net; connect-src 'self' https://api.groq.com https://generativelanguage.googleapis.com https://prod.spline.design https://unpkg.com; media-src 'self'; frame-src 'self'; object-src 'none';",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/projects',
                destination: '/#projects',
                permanent: true,
            },
            {
                source: '/experience',
                destination: '/#education',
                permanent: true,
            },
            {
                source: '/achievements',
                destination: '/#education',
                permanent: true,
            },

            {
                source: '/gallery',
                destination: '/#about',
                permanent: true,
            },
            {
                source: '/resume',
                destination: '/#education',
                permanent: true,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
