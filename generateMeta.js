const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'assets', 'Blog');
const indexPath = path.join(__dirname, 'src', 'index.html');

function extractMeta(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
    const descriptionMatch = content.match(/<p>(.*?)<\/p>/);

    return {
        title: titleMatch ? titleMatch[1] : 'Default Title',
        description: descriptionMatch ? descriptionMatch[1] : 'Default Description'
    };
}

function updateIndexHtml(metaTags) {
    let indexContent = fs.readFileSync(indexPath, 'utf-8');
    const metaTagString = metaTags.map(meta => `
        <meta name="title" content="${meta.title}">
        <meta name="description" content="${meta.description}">
    `).join('\n');

    indexContent = indexContent.replace(/<!-- Meta Tags Start -->[\s\S]*<!-- Meta Tags End -->/, `<!-- Meta Tags Start -->${metaTagString}<!-- Meta Tags End -->`);
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
}

function generateMetaTags() {
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));
    const metaTags = files.map(file => extractMeta(path.join(blogDir, file)));
    updateIndexHtml(metaTags);
    console.log('Meta tags generated successfully.');
}

generateMetaTags();
