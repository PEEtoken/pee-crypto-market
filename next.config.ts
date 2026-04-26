
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/tonconnect-manifest.json',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          { key: 'Content-Type', value: 'application/json' }
        ],
      },
      {
        source: '/logo-principal.jpg',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ],
      },
      {
        source: '/propuesta-tecnologica.png',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ],
      }
    ];
  }
};

export default nextConfig;
