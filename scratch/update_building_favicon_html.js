const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const files = fs.readdirSync(projectRoot).filter(f => f.endsWith('.html'));

console.log(`Updating favicon tags to building SVG logo across ${files.length} HTML files...`);

const faviconTags = `  <!-- Favicons -->
  <link href="assets/img/favicon.svg" rel="icon" type="image/svg+xml">
  <link href="assets/img/logo.webp" rel="alternate icon" type="image/webp">
  <link href="assets/img/favicon.svg" rel="apple-touch-icon">`;

files.forEach(file => {
  const filePath = path.join(projectRoot, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Fix header class typo in index.html if present
  if (html.includes('class="heade  r')) {
    html = html.replace('class="heade  r', 'class="header');
  }

  // Replace old favicon links with SVG building logo link
  const oldFaviconPattern = /<!-- Favicons? -->[\s\S]*?<link href="assets\/img\/logo\.webp" rel="apple-touch-icon">/g;
  if (oldFaviconPattern.test(html)) {
    html = html.replace(oldFaviconPattern, faviconTags);
  } else {
    // Fallback replace
    html = html.replace(/<link href="assets\/img\/(?:favicon\.png|logo\.webp)" rel="icon" type="image\/webp">/g, faviconTags);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated building favicon in ${file}`);
});

console.log('Building favicon update complete!');
