const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const faviconBlock = `  <!-- Favicons -->
  <link href="assets/img/favicon.svg" rel="icon" type="image/svg+xml">
  <link href="assets/img/logo.webp" rel="alternate icon" type="image/webp">
  <link href="assets/img/favicon.svg" rel="apple-touch-icon">`;

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  if (content.includes('<link href="assets/img/logo.webp" type="image/webp" rel="icon">')) {
    content = content.replace('<link href="assets/img/logo.webp" type="image/webp" rel="icon">', faviconBlock);
  } else if (!content.includes('assets/img/favicon.svg')) {
    if (content.includes('<!-- Favicons -->')) {
      content = content.replace(/<!-- Favicons -->[\s\S]*?(?=<link|<style)/, faviconBlock + '\n\n  ');
    } else if (content.includes('<link rel="canonical"')) {
      content = content.replace(/(<link rel="canonical"[^>]*>)/, '$1\n\n' + faviconBlock);
    } else if (content.includes('<link href="https://fonts')) {
      content = content.replace('<!-- Fonts -->', faviconBlock + '\n\n  <!-- Fonts -->');
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log('Updated favicon in:', file);
  }
});

console.log('Finished updating favicons. Total updated:', updatedCount);
