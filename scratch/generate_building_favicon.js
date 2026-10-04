const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const imgDir = path.join(projectRoot, 'assets', 'img');

// Bootstrap buildings icon SVG inside emerald green square tile
const svgBuildingContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="22" fill="#047857"/>
  <g fill="#ffffff" transform="translate(18, 18) scale(2.667)">
    <path d="M14.763.075A.5.5 0 0 0 14.44 0H9.5a.5.5 0 0 0-.5.5V2h-3V.5a.5.5 0 0 0-.5-.5H.558A.5.5 0 0 0 .075.441l-2 5A.5.5 0 0 0 0 6h1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6h1a.5.5 0 0 0 .442-.735l-2-5zM2 15V6h3v9H2zm4 0V3h3v12H6zm4 0V1h4v14h-4z"/>
    <path d="M2.5 7.5A.5.5 0 0 1 3 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-1zM2.5 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-1zM7 4.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zM7 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zM7 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zM11.5 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V2zM11.5 5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V5zM11.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V8zM11.5 11a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'favicon.svg'), svgBuildingContent, 'utf8');
console.log('Created assets/img/favicon.svg with bi-buildings icon!');
