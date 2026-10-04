const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const criticalCss = `  <!-- Critical Above-The-Fold CSS -->
  <style id="critical-css">
    :root {
      --background-color: #ffffff;
      --default-color: #212529;
      --heading-color: #111827;
      --accent-color: #047857;
      --contrast-color: #ffffff;
      --nav-color: #1f2937;
    }
    body { margin: 0; font-family: 'Roboto', system-ui, -apple-system, sans-serif; color: var(--default-color); background-color: var(--background-color); }
    .header { transition: all 0.5s; z-index: 997; padding: 15px 0; background: rgba(17, 24, 39, 0.95); }
    .header .logo { text-decoration: none; color: #fff; }
    .header .logo h1 { font-size: 24px; margin: 0; font-weight: 700; color: #fff; display: inline-block; }
    .navmenu ul { margin: 0; padding: 0; display: flex; list-style: none; align-items: center; gap: 20px; }
    .navmenu a { color: rgba(255, 255, 255, 0.85); text-decoration: none; font-size: 15px; font-weight: 500; }
    .navmenu a.active, .navmenu a:hover { color: #fff; }
    .page-title { padding: 80px 0 60px 0; background-color: #111827; color: #ffffff; position: relative; }
  </style>`;

const cleanJsBlock = `  <!-- Optimized Deferred Vendor & Main JS Files (Zero Blockage) -->
  <script defer src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script defer src="assets/vendor/aos/aos.js"></script>
  <script defer src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script defer src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script defer src="assets/js/main.min.js"></script>`;

const files = fs.readdirSync(projectRoot).filter(f => f.endsWith('.html'));

console.log(`Optimizing ${files.length} HTML files...`);

files.forEach(file => {
  const filePath = path.join(projectRoot, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Update CSS link to main.min.css if main.css is present
  if (html.includes('href="assets/css/main.css"')) {
    html = html.replace('href="assets/css/main.css"', 'href="assets/css/main.min.css"');
  }

  // 2. Inject Critical CSS before main CSS link if not present
  if (!html.includes('id="critical-css"') && html.includes('href="assets/css/main.min.css"')) {
    html = html.replace(
      '<link href="assets/css/main.min.css" rel="stylesheet">',
      `${criticalCss}\n\n  <!-- Main CSS File -->\n  <link href="assets/css/main.min.css" rel="stylesheet">`
    );
  }

  // 3. Replace vendor scripts at bottom with clean deferred script block
  // Find regex from <!-- Vendor JS Files --> to </body> or <!-- Main JS File -->
  const scriptRegex = /<!-- (?:Vendor|Main) JS Files -->[\s\S]*?(?=<script src="assets\/js\/main\.js"|<\/body>)/i;
  
  if (html.includes('assets/js/main.js') || html.includes('assets/js/main.min.js')) {
    // Replace script section up to end of main.js / main.min.js
    const fullScriptPattern = /<!-- Vendor JS Files -->[\s\S]*?<script src="assets\/js\/main(?:\.min)?\.js"><\/script>/i;
    if (fullScriptPattern.test(html)) {
      html = html.replace(fullScriptPattern, cleanJsBlock);
    } else {
      // Fallback for custom script patterns
      const simpleScriptPattern = /<script src="assets\/vendor\/bootstrap\/js\/bootstrap\.bundle\.min\.js"><\/script>[\s\S]*?<script src="assets\/js\/main(?:\.min)?\.js"><\/script>/i;
      if (simpleScriptPattern.test(html)) {
        html = html.replace(simpleScriptPattern, cleanJsBlock);
      }
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${file}`);
});

console.log('HTML optimization complete!');
