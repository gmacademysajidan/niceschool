const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const files = fs.readdirSync(projectRoot).filter(f => f.endsWith('.html'));

console.log(`Updating favicon link to logo.webp across ${files.length} HTML files...`);

files.forEach(file => {
  const filePath = path.join(projectRoot, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace favicon.png and apple-touch-icon.png with logo.webp
  html = html.replace(
    /<link href="assets\/img\/favicon\.png" rel="icon">[\s\S]*?<link href="assets\/img\/apple-touch-icon\.png" rel="apple-touch-icon">/g,
    '<link href="assets/img/logo.webp" rel="icon" type="image/webp">\n  <link href="assets/img/logo.webp" rel="apple-touch-icon">'
  );

  // Fallback single replace if written slightly differently
  html = html.replace('href="assets/img/favicon.png"', 'href="assets/img/logo.webp" type="image/webp"');
  html = html.replace('href="assets/img/apple-touch-icon.png"', 'href="assets/img/logo.webp"');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated favicon in ${file}`);
});

console.log('Favicon update complete!');
