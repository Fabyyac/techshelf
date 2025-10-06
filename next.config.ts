import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* suas configurações existentes */

  eslint: {
    ignoreDuringBuilds: true, // ignora erros de ESLint/TypeScript durante o build
  },
};

export default nextConfig;
