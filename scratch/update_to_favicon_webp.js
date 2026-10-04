const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const faviconBlock = `  <!-- Favicons -->
  <link href="assets/img/favicon.webp" rel="icon" type="image/webp">
  <link href="assets/img/favicon.webp" rel="apple-touch-icon">`;

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix header typo
  content = content.replace('class="heade  r ', 'class="header ');

  if (content.includes('<!-- Favicons -->')) {
    content = content.replace(/<!-- Favicons -->[\s\S]*?(?=<link rel="preconnect"|<link href="https:\/\/fonts|<style|<link href="assets\/vendor)/, faviconBlock + '\n\n  ');
  } else {
    content = content.replace(/<link [^>]*rel="(?:icon|alternate icon|apple-touch-icon)"[^>]*>/g, '');
    if (content.includes('<!-- Fonts -->')) {
      content = content.replace('<!-- Fonts -->', faviconBlock + '\n\n  <!-- Fonts -->');
    } else if (content.includes('<link href="https://fonts')) {
      content = content.replace('<link href="https://fonts', faviconBlock + '\n\n  <link href="https://fonts');
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log('Updated to favicon.webp:', file);
  }
});

console.log('Finished updating to favicon.webp. Total updated:', updatedCount);
