const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesPath = process.argv[2];

function processWebp(image) {
  const outputPng = `${image.replace('.webp', '.png')}`;
  if (!fs.existsSync(outputPng)) {
    sharp(image)
      .toFormat('png')
      .toFile(outputPng, (err, info) => {
        if (err) {
          console.error('Conversion failed:', err);
        } else {
          console.log('Conversion successful:', info);
        }
      });
    console.log(`✅ Png generated from webp: ${outputPng}`);
  }
}


function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.webp')) {
      processWebp(fullPath);
    }
  });
}

console.log('Starting Webp conversion script...');

const stats = fs.statSync(imagesPath);
if (stats.isDirectory()) {
  traverseDirectory(imagesPath)
} else {
  processWebp(imagesPath);
}

console.log('Webp conversion script completed.');
