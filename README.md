# bvelastegui.dev - Personal Portfolio

A modern, fast, and responsive portfolio website built with Astro, showcasing professional experience, technical skills, and personal projects.

## 🌐 Live Site

- **Production**: [bvelastegui.dev](https://bvelastegui.dev)
- **GitHub Pages**: [bvelastegui.github.io/bvelastegui.dev](https://bvelastegui.github.io/bvelastegui.dev)

## 🚀 Project Structure

```text
/
├── public/
│   ├── CNAME                    # Custom domain configuration
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── assets/                  # Technology icons and images
│   ├── components/
│   │   ├── sections/           # Page sections (Hero, About, etc.)
│   │   └── portfolio/          # Portfolio-specific components
│   ├── content/
│   │   ├── config.ts           # Content collections schema
│   │   └── projects/           # Project markdown files
│   ├── data/
│   │   └── experiences.json    # Work experience data
│   ├── layouts/                # Base layout components
│   ├── pages/
│   │   ├── index.astro         # Main portfolio page
│   │   └── projects/           # Project pages
│   └── styles/
│       └── global.css          # Global styles
├── .github/
│   └── workflows/
│       └── github-pages.yml    # GitHub Pages deployment
├── Dockerfile                  # Docker deployment
├── docker-compose.yml          # Local Docker setup
└── docker-stack.yml           # Production Docker stack
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                     | Action                                           |
| :-------------------------- | :----------------------------------------------- |
| `pnpm install`              | Installs dependencies                            |
| `pnpm dev`                  | Starts local dev server at `localhost:4321`      |
| `pnpm build`                | Build production site to `./dist/`               |
| `pnpm build:github-pages`   | Build for GitHub Pages deployment                |
| `pnpm preview`              | Preview build locally                            |
| `pnpm preview:github-pages` | Preview GitHub Pages build locally               |
| `pnpm astro ...`            | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help`      | Get help using the Astro CLI                     |

## 🚀 Deployment

### GitHub Pages Deployment (Recommended)

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

#### Automatic Deployment

1. Push changes to the `main` branch
2. GitHub Actions automatically builds and deploys the site
3. Site is available at: `https://bvelastegui.github.io/bvelastegui.dev`

#### Manual Deployment

You can also trigger deployment manually:

1. Go to the **Actions** tab in the GitHub repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button

#### Custom Domain Setup

The site is configured to use a custom domain (`bvelastegui.dev`):

1. **CNAME Configuration**: The `public/CNAME` file contains the custom domain
2. **DNS Setup**: Point your domain's DNS to GitHub Pages:
   ```
   CNAME record: www.yourdomain.com → username.github.io
   A records: yourdomain.com → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   ```
3. **GitHub Settings**:
   - Go to repository **Settings** → **Pages**
   - Ensure **Source** is set to "GitHub Actions"
   - Custom domain should show as configured

#### GitHub Pages Configuration

The deployment is configured with:

- **Build Tool**: GitHub Actions with Node.js 18 and pnpm
- **Build Command**: `pnpm run build:github-pages`
- **Output Directory**: `./dist`
- **Environment Variables**: Automatically configured for GitHub Pages

### Local Development with Docker (Optional)

For developers who prefer Docker for local development:

```bash
# Build and run locally
docker-compose up --build

# Access at http://localhost (with Traefik proxy)
# Traefik dashboard at http://localhost:8080
```

#### Docker Configuration

- **Base Image**: nginx:alpine for serving static files
- **Build Process**: Multi-stage build with Node.js for compilation
- **Local Proxy**: Traefik for local development routing

### Environment Configuration

The Astro configuration automatically adapts based on the deployment environment:

- **Development**: `http://localhost:4321` with no base path
- **GitHub Pages (with custom domain)**: `https://bvelastegui.dev` with `/` base path
- **GitHub Pages (subdirectory)**: `https://bvelastegui.github.io/bvelastegui.dev` with `/bvelastegui.dev` base path

## 🛠️ Technology Stack

- **Framework**: Astro 5.9.2 with static site generation
- **Styling**: Tailwind CSS 4.1.10 with typography plugin
- **Content**: Astro Content Collections with Zod validation
- **Package Manager**: pnpm
- **Deployment**: GitHub Actions + GitHub Pages / Docker + nginx
- **Reverse Proxy**: Traefik (Docker deployment)

## 📝 Content Management

### Projects

- Located in `src/content/projects/`
- Markdown files with frontmatter metadata
- Schema validation with Zod
- Automatic slug generation from filename

### Experiences

- Located in `src/data/experiences.json`
- JSON format with structured work history
- Loaded via Astro's file loader

### Adding New Content

#### New Project

1. Create a new `.md` file in `src/content/projects/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   title: "Project Title"
   description: "Brief description"
   image: "/images/projects/project-image.jpg"
   technologies: ["Astro", "TypeScript", "Tailwind"]
   github: "https://github.com/username/repo"
   demo: "https://demo-url.com"
   featured: true
   publishDate: 2024-01-01
   ---
   ```
3. Add project content in Markdown format

#### New Experience

1. Edit `src/data/experiences.json`
2. Add new experience object:
   ```json
   {
     "startDate": "2024-01-01",
     "endDate": "2024-12-31",
     "company": "Company Name",
     "position": "Job Title",
     "description": "Job description and achievements"
   }
   ```

## 🔧 Development

### Prerequisites

- Node.js 18+
- pnpm package manager

### Setup

```bash
# Clone the repository
git clone https://github.com/bvelastegui/bvelastegui.dev.git
cd bvelastegui.dev

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Building for Production

```bash
# Standard build
pnpm build

# GitHub Pages build (with environment variables)
pnpm build:github-pages

# Preview production build
pnpm preview
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
