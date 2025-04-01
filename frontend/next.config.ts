// @type {import('next').NextConfig}
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/apis/:path*',
                destination: `${process.env.REST_API_URL}/apis/:path*`
            }
        ]
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    //limit size for image upload
    experimental: {serverActions: {bodySizeLimit: '2mb'}}
};

export default nextConfig;

