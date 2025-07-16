// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import partytown from "@astrojs/partytown";

// Environment-based configuration for different deployment targets
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const isDevelopment = process.env.NODE_ENV === 'development';

// GitHub Pages configuration
const gitHubPagesConfig = {
  site: 'https://bvelastegui.github.io',
  base: '/bvelastegui.dev',
};

// Custom domain configuration (for production)
const customDomainConfig = {
  site: 'https://bvelastegui.dev',
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
  if (isGitHubPages) {
    return gitHubPagesConfig;
  }
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
