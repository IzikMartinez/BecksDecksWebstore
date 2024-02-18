/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@square/web-sdk', 'react-square-web-payments-sdk'])

module.exports = ({
  reactStrictMode: true,
  experimental: {
    appDir: true,
    esmExternals: 'loose'
  },
  images: {
    domains: ['vlormrdjyqfcebbwsmfx.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vlormrdjyqfcebbwsmfx.supabase.co',
        port: "",
      }
    ],
  }
})
