const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
}

module.exports = nextConfig
