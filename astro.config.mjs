// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import partytown from "@astrojs/partytown";

// Environment-based configuration for different deployment targets
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const isDevelopment = process.env.NODE_ENV === 'development';

// Check if we have a CNAME file (indicates custom domain usage)
import { readFileSync, existsSync } from 'fs';
const hasCNAME = existsSync('./public/CNAME');
const customDomain = hasCNAME ? readFileSync('./public/CNAME', 'utf-8').trim() : null;

// GitHub Pages with subdirectory (no custom domain)
const gitHubPagesConfig = {
  site: 'https://bvelastegui.github.io',
  base: '/bvelastegui.dev',
};

// Custom domain configuration (GitHub Pages with CNAME)
const customDomainConfig = {
  site: customDomain ? `https://${customDomain}` : 'https://bvelastegui.dev',
  base: '/',
};

// Development configuration
const developmentConfig = {
  site: 'http://localhost:4321',
  base: '/',
};

// Select configuration based on environment
const getDeploymentConfig = () => {
  if (isDevelopment) {
    return developmentConfig;
  }
  if (isGitHubActions && hasCNAME) {
    // GitHub Actions build with custom domain
    return customDomainConfig;
  }
  if (isGitHubActions) {
    // GitHub Actions build without custom domain
    return gitHubPagesConfig;
  }
  // Fallback to custom domain config for production
  return customDomainConfig;
};

const deploymentConfig = getDeploymentConfig();

// https://astro.build/config
export default defineConfig({
  // Site and base URL configuration for GitHub Pages compatibility
  site: deploymentConfig.site,
  base: deploymentConfig.base,

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    service: passthroughImageService(),
  },

  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
