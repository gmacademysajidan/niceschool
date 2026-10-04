const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const cssPath = path.join(projectRoot, 'assets', 'css', 'main.css');
const cssMinPath = path.join(projectRoot, 'assets', 'css', 'main.min.css');

const jsPath = path.join(projectRoot, 'assets', 'js', 'main.js');
const jsMinPath = path.join(projectRoot, 'assets', 'js', 'main.min.js');

// Minify CSS
console.log('Minifying CSS...');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Simple CSS minification regex rules: remove comments, remove extra whitespace/newlines
let cssMin = cssContent
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([\{\}\:\;\,\>])\s*/g, '$1')
  .replace(/\;}/g, '}')
  .trim();

fs.writeFileSync(cssMinPath, cssMin, 'utf8');
console.log(`CSS minified: ${cssContent.length} bytes -> ${cssMin.length} bytes (${Math.round((1 - cssMin.length / cssContent.length) * 100)}% reduction)`);

// Minify JS
console.log('Minifying JS...');
let jsContent = fs.readFileSync(jsPath, 'utf8');

let jsMin = jsContent
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\/\/.*/g, '')
  .replace(/^\s+|\s+$/gm, '')
  .replace(/\n+/g, '\n')
  .trim();

fs.writeFileSync(jsMinPath, jsMin, 'utf8');
console.log(`JS minified: ${jsContent.length} bytes -> ${jsMin.length} bytes`);
