const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const fromPath = process.argv[2];
const toPath = process.argv[3];

console.log(`🧪 Processing images for social sharing from: ${fromPath} to ${toPath}...`);

function processImage(image) {
  const toExt = '.jpg';
  // Get extension from image path
  const ext = path.extname(image).toLowerCase();
  const baseName = path.basename(image);
  const newBaseName = baseName.replace(ext, toExt);
  const outputJpg = path.join(toPath, newBaseName);

  if (fs.existsSync(outputJpg)) {
    console.log(`✅ Image already exists: ${outputJpg}`);
    return;
  }

  sharp(image)
    .toFormat('jpeg')
    .jpeg({ quality: 80 })
    .resize(400, 400, {
      fit: 'cover',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFile(outputJpg, (err) => {
      if (err) {
        console.error('❌ Conversion failed:', err);
      } else {
        console.log(`✅ Jpg generated from webp: ${outputJpg}`);
      }
    });
}


function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.webp')) {
      processImage(fullPath);
    }
  });
}

if (!fs.existsSync(toPath)) {
  console.log(`🧪 Making directory for ${toPath}...`);
  fs.mkdirSync(toPath, { recursive: true });
}

const stats = fs.statSync(fromPath);
if (stats.isDirectory()) {
  traverseDirectory(fromPath)
} else {
  processImage(fromPath);
}

console.log('✅ Optimizing images script completed.');
