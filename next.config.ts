import type { NextConfig } from 'next';
import { withContentCollections } from '@content-collections/next';
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'curiousprogrammer.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['flowbite-react'],
  webpack: async (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(withFlowbiteReact);
    }
    return config;
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
