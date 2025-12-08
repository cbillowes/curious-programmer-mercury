const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const fromPath = process.argv[2];
const toPath = process.argv[3];
const quality = parseInt(process.argv[4]) || 80;

console.log(`🧪 Processing images for optimization from: ${fromPath} to ${toPath}...`);

function optimizeWebp(filename, image) {
  sharp(image)
    .toFormat('webp')
    .webp({ quality })
    .toFile(filename, (err) => {
      if (err) {
        console.error('❌ Conversion failed for ', filename, err);
      } else {
        console.log(`✅ Webp generated: ${filename}`);
      }
    });
}

function optimizeGif(filename, image) {
  sharp(image)
    .toFormat('gif')
    .gif({ quality })
    .toFile(filename, (err) => {
      if (err) {
        console.error('❌ Conversion failed for ', filename, err);
      } else {
        console.log(`✅ Gif generated: ${filename}`);
      }
    });
}

function optimizePng(filename, image) {
  sharp(image)
    .toFormat('png')
    .png({ quality })
    .toFile(filename, (err) => {
      if (err) {
        console.error('❌ Conversion failed for ', filename, err);
      } else {
        console.log(`✅ Png generated: ${filename}`);
      }
    });
}

function optimizeJpg(filename, image) {
  sharp(image)
    .toFormat('jpeg')
    .jpeg({ quality })
    .toFile(filename, (err) => {
      if (err) {
        console.error('❌ Conversion failed for ', filename, err);
      } else {
        console.log(`✅ Jpg generated: ${filename}`);
      }
    });
}

function optimizeImage(image) {
  const ext = path.extname(image).toLowerCase();
  const basename = path.basename(image);
  const outputJpg = path.join(toPath, basename);

  if (['.DS_Store'].includes(basename)) {
    console.log(`⏭️ Skipping file: ${image}`);
    return;
  }

  switch (ext) {
    case '.webp':
      optimizeWebp(outputJpg, image);
      break;
    case '.gif':
      optimizeGif(outputJpg, image);
      break;
    case '.png':
      optimizePng(outputJpg, image);
      break;
    case '.jpg':
    case '.jpeg':
      optimizeJpg(outputJpg, image);
      break;
    default:
      console.log(`⚠️ Unsupported file type: ${image}`);
  }
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      traverseDirectory(fullPath);
    } else {
      optimizeImage(fullPath);
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
  optimizeImage(fromPath);
}

console.log('✅ Optimizing images script completed.');
