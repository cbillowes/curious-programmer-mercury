import type { NextConfig } from 'next';
import { withContentCollections } from "@content-collections/next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

// withContentCollections must be the outermost plugin
export default withFlowbiteReact(withContentCollections(nextConfig));