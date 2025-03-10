const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src', 'assets', 'Blog');
const indexPath = path.join(__dirname, 'src', 'index.html');

function extractMeta(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Extract the first <h1> tag for the title
    const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : 'Default Title';

    // Extract the first <p> tag for the description
    const descriptionMatch = content.match(/<p>(.*?)<\/p>/);
    const description = descriptionMatch ? descriptionMatch[1].replace(/<[^>]*>/g, '') : 'Default Description';

    return {
        title,
        description
    };
}

function updateIndexHtml(metaTags) {
    let indexContent = fs.readFileSync(indexPath, 'utf-8');
    const metaTagString = metaTags.map((meta, index) => `
        <meta name="title-${index}" content="${meta.title}">
        <meta name="description-${index}" content="${meta.description}">
    `).join('\n');

    indexContent = indexContent.replace(/<!-- Meta Tags Start -->[\s\S]*<!-- Meta Tags End -->/, `<!-- Meta Tags Start -->${metaTagString}<!-- Meta Tags End -->`);
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log('index.html updated with new meta tags.');
}

function getAllHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllHtmlFiles(file));
        } else if (file.endsWith('.html')) {
            results.push(file);
        }
    });
    return results;
}

function generateMetaTags() {
    const files = getAllHtmlFiles(blogDir);
    const metaTags = files.map(file => {
        const meta = extractMeta(file);
        return meta;
    });
    updateIndexHtml(metaTags);
    console.log('Updated meta tags:', metaTags); // Log the array of meta tags
}

generateMetaTags();
