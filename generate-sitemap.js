const fs = require('fs');
const path = require('path');

const urls = JSON.parse(fs.readFileSync(path.join(__dirname, 'blog-urls.json'), 'utf-8'));
console.log('Loaded URLs from blog-urls.json');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
    <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
    </url>`).join('')}
</urlset>`;
console.log('Generated sitemap content');

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
console.log('Sitemap written to sitemap.xml');
console.log('Sitemap generated successfully.');
