const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const fromPath = process.argv[2];
const toPath = process.argv[3];
const quality = parseInt(process.argv[4]) || 80;

console.log(`🧪 Optimizing images from ${fromPath} to ${toPath}...`);

function optimizeWebp(filename, newFilename) {
  sharp(filename)
    .toFormat('webp')
    .webp({ quality })
    .toFile(newFilename, (err) => {
      if (err) {
        console.error('❌ Conversion failed for ', filename, err);
      } else {
        console.log(`✅ Webp generated: ${filename}`);
      }
    });
}

function optimizeGif(filename, newFilename) {
  sharp(filename)
    .toFormat('gif')
    .gif({ quality })
    .toFile(newFilename, (err) => {
      if (err) {
        console.error('❌ Conversion failed for ', filename, err);
      } else {
        console.log(`✅ Gif generated: ${filename}`);
      }
    });
}

function optimizePng(filename, newFilename) {
  sharp(filename)
    .toFormat('png')
    .png({ quality })
    .toFile(newFilename, (err) => {
      if (err) {
        console.error('❌ Conversion failed for ', filename, err);
      } else {
        console.log(`✅ Png generated: ${filename}`);
      }
    });
}

function optimizeJpg(filename, newFilename) {
  sharp(filename)
    .toFormat('jpeg')
    .jpeg({ quality })
    .toFile(newFilename, (err) => {
      if (err) {
        console.error('❌ Conversion failed for ', filename, err);
      } else {
        console.log(`✅ Jpg generated: ${filename}`);
      }
    });
}

function optimizeImage(filename) {
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename);
  const tempFilename = filename.replace(basename, `temp_${basename}`);

  if (basename.startsWith('temp_')) {
    console.log(`⏭️ Skipping temp file: ${filename}`);
    return;
  }

  if (['.DS_Store'].includes(basename)) {
    console.log(`⏭️ Skipping file: ${filename}`);
    return;
  }

  switch (ext) {
    case '.webp':
      optimizeWebp(filename, tempFilename);
      break;
    case '.gif':
      optimizeGif(filename, tempFilename);
      break;
    case '.png':
      optimizePng(filename, tempFilename);
      break;
    case '.jpg':
    case '.jpeg':
      optimizeJpg(filename, tempFilename);
      break;
    default:
      console.log(`⚠️ Unsupported file type: ${filename}`);
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
