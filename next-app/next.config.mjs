/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pdf-poppler'],
  reactStrictMode:false,
  webpack: (config, { isServer }) => {
    // Socket.IO client-side configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
      };
    }
    return config;
  },
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
