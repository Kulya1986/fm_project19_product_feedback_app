/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bowvpboyebaiocgwklrl.storage.supabase.co",
        port: "",
        pathname: "/v1/object/public/avatars/**",
      },
    ],
  },
};

export default nextConfig;
