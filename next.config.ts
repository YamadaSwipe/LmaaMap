import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  serverExternalPackages: ['qrcode', 'bcryptjs'],
  // Ignore hydration warnings caused by browser extensions
  reactStrictMode: true,
  // Ajout de configurations spécifiques pour Vercel
  poweredByHeader: false, // Désactiver l'en-tête X-Powered-By
  trailingSlash: true, // Ajouter un slash final aux URL
  images: {
    domains: ['example.com'], // Remplacez par vos domaines autorisés
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
