/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'source.boringavatars.com',
      'avatar.vercel.sh',
      'pirlo.s3-us-west-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
