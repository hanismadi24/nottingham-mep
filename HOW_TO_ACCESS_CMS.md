# How to Access the CMS Admin Panel

## Quick Access Methods

### Method 1: Direct URL
Simply navigate to:
```
/cms
```
Or click this link when viewing the site: [Open CMS Admin](/cms)

### Method 2: Footer Link
1. Scroll to the bottom of any page
2. Look for the **Footer** section
3. Find **"Quick Links"** column
4. Click on **"CMS Admin"**

### Method 3: Browser URL Bar
Type in your browser:
```
your-site-url.com/cms
```

Example: `https://nottingham-mep.com/cms`

---

## What You'll See in the CMS

The CMS Admin panel has **6 tabs**:

### 1. 📋 Site Info
- Company name and tagline
- Phone, email, address
- Working hours
- Social media links (LinkedIn, Twitter, Facebook)

### 2. 🖼️ Hero Banner
- Hero section images (4 rotating images)
- Main title and subtitle
- Button text and links

### 3. 💼 Services
- All 6 MEP services
- Service descriptions
- Features list
- Service images

### 4. 🏗️ Projects
- Complete project portfolio (10 projects)
- Project images, descriptions
- Client, location, sector information
- Services provided per project

### 5. ℹ️ About
- Mission and vision statements
- Company description
- Timeline of milestones
- "Why Choose Us" section

### 6. 📞 Contact
- Contact information cards
- Form field configuration
- Job openings list

---

## How to Edit Content

The CMS is **view-only** in the browser. To edit content:

1. **View** what you want to change in the CMS dashboard
2. **Note** which section it's in
3. **Open** your code editor
4. **Edit** the corresponding file:
   - `/src/app/data/cms.ts` - For site info, hero, services, about, contact
   - `/src/app/data/projects.ts` - For all projects
5. **Save** the file
6. **Refresh** browser - changes appear automatically

### Quick Edit Guide

| Content to Update | File to Edit | Section |
|------------------|--------------|---------|
| Phone/Email | `cms.ts` | `site` |
| Hero Images | `cms.ts` | `hero.images` |
| Services | `cms.ts` | `services` |
| Projects | `projects.ts` | `projects` array |
| Job Listings | `cms.ts` | `careers.openings` |
| Mission/Vision | `cms.ts` | `about.mission/vision` |

---

## Tips

✅ **Bookmark the CMS page** (`/cms`) for quick access  
✅ **Use the CMS** to see current content before editing  
✅ **Check the blue info box** at the bottom of CMS page for file paths  
✅ **See CMS_INSTRUCTIONS.md** for detailed editing guide

---

## Screenshots Location

When you navigate to `/cms`, you'll see a clean dashboard with tabs at the top. Click any tab to view that section's content.

**Questions?** See `README.md` and `CMS_INSTRUCTIONS.md` for more details.
