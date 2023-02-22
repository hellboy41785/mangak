/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['meo.comick.pictures',"meo3.comick.pictures","meo2.comick.pictures"],
  },
  env:{
    CORS_URL:process.env.CORS_URL
  }
}

module.exports = nextConfig
