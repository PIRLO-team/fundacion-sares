/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'source.boringavatars.com',
      'avatar.vercel.sh',
      'saresapp.s3-us-west-1.amazonaws.com',
    ],
  },
  env: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
  },
};

module.exports = nextConfig;
