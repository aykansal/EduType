/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pdf-poppler'],
  // experimental: {
  //   optimizeCss: true,
  // },
  // images: {
  //   unoptimized: false
  // },
  // async headers() {
  //   return [
  //     {
  //       source: '/static/:path*',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable'
  //         }
  //       ]
  //     }
  //   ]
  // },
};

export default nextConfig;
