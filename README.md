# Nottingham MEP Consultancy Website

Professional website for Nottingham MEP Engineering Consultancy built with React, TypeScript, and Tailwind CSS.

## Features

- 🏗️ **Multi-page website** with React Router
- 🎨 **Modern design** with Tailwind CSS v4
- 🎭 **Smooth animations** with Motion (Framer Motion)
- 📱 **Fully responsive** for all devices
- 🔍 **Advanced project filtering** by service type and location
- 📊 **CMS-ready** with editable data files
- ⚡ **Fast performance** with Vite
- 🎯 **Brand colors**: #a11d17 (Primary Red)

## Pages

1. **Home** - Hero banner with rotating images, metrics, featured projects, services
2. **Projects** - Searchable project portfolio with filters
3. **Project Details** - Individual project case studies
4. **Services** - MEP services showcase
5. **About** - Company information, mission, vision, timeline
6. **Contact** - Contact form and information
7. **Careers** - Job listings and benefits
8. **Insights** - Blog/articles section

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Start development server (already running)
# Site is available in preview
```

### Build for Production

```bash
pnpm build
```

The build output will be in the `/dist` folder.

## Content Management (CMS)

All content is managed through JSON/TypeScript files - no database needed!

See **[CMS_INSTRUCTIONS.md](./CMS_INSTRUCTIONS.md)** for detailed instructions on:
- Updating site content
- Managing projects
- Editing services
- Changing colors
- Adding images
- Exporting HTML

### Quick CMS Reference

- **Site info, services, about**: `/src/app/data/cms.ts`
- **Projects**: `/src/app/data/projects.ts`
- **Colors**: `/src/styles/theme.css`
- **Images**: Add to `/public/images/` or use URLs

## Project Structure

```
/src/
  /app/
    /data/          # CMS data files
      cms.ts        # Main site content
      projects.ts   # Project portfolio
    /pages/         # Page components
    /components/    # Reusable components
  /styles/          # Global styles and theme
```

## Technologies

- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router 7** - Navigation
- **Tailwind CSS 4** - Styling
- **Motion** - Animations
- **Lucide React** - Icons

## Deployment

### Option 1: Netlify (Easiest)
1. Run `pnpm build`
2. Upload `/dist` folder to Netlify
3. Done!

### Option 2: Vercel
1. Connect your GitHub repository
2. Vercel auto-detects Vite
3. Deploys automatically

### Option 3: Traditional Hosting
1. Run `pnpm build`
2. Upload contents of `/dist` to your web server
3. Configure server to route all requests to `index.html`

## Customization

### Change Brand Colors

Edit `/src/styles/theme.css`:

```css
:root {
  --primary: #a11d17;  /* Your brand color */
  --accent: #7d1712;   /* Darker shade */
}
```

### Add New Project

Edit `/src/app/data/projects.ts` and add to the array:

```typescript
{
  id: "project-slug",
  name: "Project Name",
  location: "Dubai, UAE",
  // ... other fields
}
```

### Update Hero Banner Images

Edit `/src/app/data/cms.ts`:

```typescript
hero: {
  images: [
    "your-image-1.jpg",
    "your-image-2.jpg",
  ]
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- ⚡ Fast page loads with code splitting
- 🎨 Optimized images
- 📦 Minimal bundle size
- 🚀 Production build optimizations

## Support

For questions about:
- Content updates: See [CMS_INSTRUCTIONS.md](./CMS_INSTRUCTIONS.md)
- Technical issues: Check React/Vite documentation
- Deployment: See deployment platform docs

## License

Proprietary - Nottingham MEP Consultancy

---

Built with ❤️ using React + Vite + Tailwind CSS
