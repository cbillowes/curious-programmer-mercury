const fs = require('fs');
const path = require('path');

const fromPath = process.argv[2];
const waitTime = process.argv[3] || 0;

console.log(`🧪 Renaming temp images from ${fromPath}...`);

function renameSync(filename) {
  const basename = path.basename(filename);
  if (!basename.startsWith('temp_')) return;

  if (!fs.existsSync(filename)) {
    console.log(`⚠️ Temp file does not exist for: ${filename}`);
    return;
  }

  const newFilename = filename.replace('temp_', '');
  console.log(`🧹 Replacing original file with optimized version for: ${newFilename}`);
  fs.renameSync(filename, newFilename, {
    force: true
  });
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      traverseDirectory(fullPath);
    } else {
      renameSync(fullPath);
    }
  });
}

// Sometimes the optimized images can take a while to be ready.
// Set the wait time after the optimization script to ensure all temp files are present.
setTimeout(() => {
  console.log(`🧪 Starting renaming process...`);
  const stats = fs.statSync(fromPath);
  if (stats.isDirectory()) {
    traverseDirectory(fromPath)
  } else {
    renameSync(fromPath);
  }
  console.log('✅ Optimizing images script completed.');
}, waitTime);

