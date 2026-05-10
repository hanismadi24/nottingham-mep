# Nottingham MEP Website - CMS Instructions

## Content Management System (CMS)

All website content is managed through editable data files located in `/src/app/data/`.

### Main CMS Files

1. **`/src/app/data/cms.ts`** - Main site configuration
   - Site information (name, contact, social media)
   - Hero section (banner images, text, buttons)
   - Metrics/statistics
   - Services
   - Clients
   - About page content
   - Contact form configuration
   - Careers/job listings

2. **`/src/app/data/projects.ts`** - Project portfolio
   - All project listings with details
   - Project images and descriptions
   - Filter categories (sector, location, services)

### How to Edit Content

#### 1. Update Site Information
Edit `/src/app/data/cms.ts`:

```typescript
site: {
  name: "Nottingham",
  tagline: "MEP Consultancy",
  phone: "+971 4 XXX XXXX",
  email: "info@nottingham-mep.com",
  address: "Business Bay, Dubai, UAE",
  // ... etc
}
```

#### 2. Change Hero Banner
Update hero section in `/src/app/data/cms.ts`:

```typescript
hero: {
  images: [
    "url-to-image-1.jpg",
    "url-to-image-2.jpg",
    // Add more images
  ],
  title: "Your Title Here",
  subtitle: "Your Subtitle",
  // ... buttons
}
```

#### 3. Add/Edit Projects
Edit `/src/app/data/projects.ts`:

```typescript
{
  id: "unique-project-id",
  name: "Project Name",
  location: "City, Country",
  city: "City",
  country: "Country",
  sector: "Hospitality",
  client: "Client Name",
  projectType: "Type",
  serviceType: ["Mechanical", "Electrical"],
  builtUpArea: "1000 m²",
  year: "2024",
  image: "image-url.jpg",
  description: "Project description",
  scope: "Scope of work",
  technicalChallenges: ["Challenge 1", "Challenge 2"],
  gallery: ["image1.jpg", "image2.jpg"]
}
```

#### 4. Update Services
Modify services array in `/src/app/data/cms.ts`:

```typescript
services: [
  {
    id: "service-id",
    title: "Service Name",
    icon: "IconName",
    description: "Description",
    features: ["Feature 1", "Feature 2"],
    image: "image-url.jpg"
  }
]
```

#### 5. Manage Job Openings
Update careers section in `/src/app/data/cms.ts`:

```typescript
careers: {
  openings: [
    {
      id: "job-id",
      title: "Job Title",
      department: "Department",
      location: "Location",
      type: "Full-time",
      description: "Job description"
    }
  ]
}
```

### Brand Colors

Main brand colors are defined in `/src/styles/theme.css`:
- Primary: `#a11d17` (Red)
- Accent: `#7d1712` (Dark Red)

To change colors, edit the `:root` section in `/src/styles/theme.css`.

### Images

#### Option 1: Use External URLs
```typescript
image: "https://example.com/image.jpg"
```

#### Option 2: Add to Project
1. Place images in `/public/images/` folder
2. Reference as: `image: "/images/your-image.jpg"`

## Exporting as HTML

This is a React application built with Vite. To export static HTML:

### Method 1: Build Static Files
```bash
npm run build
```

This creates a production build in the `/dist` folder with:
- `index.html` - Main HTML file
- `/assets/` - JavaScript, CSS, and other assets

These files can be deployed to any static hosting service (Netlify, Vercel, AWS S3, etc.)

### Method 2: Static Site Generation (Recommended for SEO)

For better SEO and true static HTML pages, consider using:

1. **Remix** - Full-stack React framework with SSR
2. **Next.js** - Can export static HTML pages
3. **Astro** - Static site generator with React components

### Deployment Options

**Free Hosting:**
- Netlify (drag & drop the `/dist` folder)
- Vercel (connect GitHub repo)
- GitHub Pages
- Cloudflare Pages

**Steps for Netlify/Vercel:**
1. Build the project: `npm run build`
2. Upload the `/dist` folder
3. Site is live!

## File Structure

```
/src/app/
  /data/
    cms.ts          # Main CMS configuration
    projects.ts     # Project portfolio data
  /pages/
    HomePage.tsx    # Home page
    ProjectsPage.tsx # Projects listing
    ServicesPage.tsx # Services page
    AboutPage.tsx   # About page
    ContactPage.tsx # Contact page
    CareersPage.tsx # Careers page
    InsightsPage.tsx # Blog/insights
  /components/
    Navbar.tsx      # Navigation
    Footer.tsx      # Footer
    RootLayout.tsx  # Layout wrapper

/src/styles/
  theme.css         # Brand colors and design tokens
  fonts.css         # Typography
```

## Making Updates

1. Edit the relevant data file in `/src/app/data/`
2. Save the file
3. The website will automatically refresh with your changes
4. Run `npm run build` to create production files

## Need Help?

- React documentation: https://react.dev
- Vite documentation: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com

## Quick Content Updates Reference

| What to Update | File | Section |
|---------------|------|---------|
| Contact info | `cms.ts` | `site` |
| Banner images | `cms.ts` | `hero.images` |
| Services | `cms.ts` | `services` |
| Projects | `projects.ts` | `projects` array |
| Job openings | `cms.ts` | `careers.openings` |
| About content | `cms.ts` | `about` |
| Brand colors | `theme.css` | `:root` |
