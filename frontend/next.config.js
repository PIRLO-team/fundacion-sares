/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['source.boringavatars.com', 'avatar.vercel.sh'],
  },
};

module.exports = nextConfig;
