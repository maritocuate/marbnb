/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com"
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
