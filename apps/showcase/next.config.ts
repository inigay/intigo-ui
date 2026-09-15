import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@intigo-ui/web', '@intigo-ui/headless', '@intigo-ui/tokens', '@intigo-ui/motion'],
};

export default nextConfig;
