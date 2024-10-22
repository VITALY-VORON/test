/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SITE_NAME: process.env.SITE_NAME,
        SITE_DESCRIPTION: process.env.SITE_DESCRIPTION,
        APP_URL: process.env.APP_URL
    },
    i18n: {
        locales: ['ru'],
        defaultLocale: 'ru',
        localeDetection: false,
    },
    reactStrictMode: true
};

export default nextConfig;
