import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*\//, '');
  basePath = `/${repo}`;
  assetPrefix = `/${repo}/`;
}

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
    unoptimized: true, // Désactiver l'optimisation des images pour GitHub Pages
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  assetPrefix,
  basePath,
  output: 'standalone', // Utiliser le mode serveur, compatible avec les API routes
};

export default nextConfig;
