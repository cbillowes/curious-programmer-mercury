import type { NextConfig } from 'next';
import { withContentCollections } from '@content-collections/next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
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
};

// withContentCollections must be the outermost plugin
// const plugins = [withFlowbiteReact, withContentCollections];
withContentCollections(nextConfig);

export default withFlowbiteReact(nextConfig);
