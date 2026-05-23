// Fix all invisible image issues:
// 1. Rename .jfif files to .jpg
// 2. Update designs.ts with corrected paths
// 3. Handle filenames with spaces

import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DESIGNS_FILE = path.join(process.cwd(), 'src', 'data', 'designs.ts');

let designsContent = fs.readFileSync(DESIGNS_FILE, 'utf8');
let renamedCount = 0;
let fixedCount = 0;

// Step 1: Rename .jfif files to .jpg in /public root
const files = fs.readdirSync(PUBLIC_DIR);
for (const file of files) {
  const fullPath = path.join(PUBLIC_DIR, file);
  if (!fs.statSync(fullPath).isFile()) continue;

  if (file.endsWith('.jfif')) {
    const newName = file.replace(/\.jfif$/i, '.jpg');
    const newPath = path.join(PUBLIC_DIR, newName);
    fs.renameSync(fullPath, newPath);
    // Update designs.ts
    const oldUrl = `/${file}`;
    const newUrl = `/${newName}`;
    if (designsContent.includes(oldUrl)) {
      designsContent = designsContent.split(oldUrl).join(newUrl);
      fixedCount++;
    }
    renamedCount++;
    console.log(`Renamed: ${file} → ${newName}`);
  }
}

console.log(`\n✅ Renamed ${renamedCount} .jfif files`);
console.log(`✅ Fixed ${fixedCount} imageUrl references in designs.ts`);

// Step 2: Fix filenames with spaces - URL-encode check
const spacedFiles = files.filter(f => f.includes(' ') && !f.endsWith('.jfif'));
if (spacedFiles.length > 0) {
  console.log(`\nFound ${spacedFiles.length} files with spaces in names:`);
  for (const file of spacedFiles) {
    const newName = file.replace(/ /g, '_');
    const oldPath = path.join(PUBLIC_DIR, file);
    const newPath = path.join(PUBLIC_DIR, newName);
    if (!fs.existsSync(newPath)) {
      fs.renameSync(oldPath, newPath);
      const oldUrl = `/${file}`;
      const newUrl = `/${newName}`;
      if (designsContent.includes(oldUrl)) {
        designsContent = designsContent.split(oldUrl).join(newUrl);
        fixedCount++;
        console.log(`Renamed: ${file} → ${newName}`);
      }
    }
  }
}

// Save updated designs.ts
fs.writeFileSync(DESIGNS_FILE, designsContent, 'utf8');
console.log(`\n✅ designs.ts saved with all fixes`);
console.log(`Total fixes: ${fixedCount} URLs updated`);
