const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const gifPath = process.argv[2];

function processGif(gifPath) {
  if (!gifPath || !gifPath.endsWith('.gif')) {
    console.log('Not a GIF file, skipping...');
    process.exit(0);
  }

  if (!fs.existsSync(gifPath.replace(".gif", "-still.png"))) {
    console.error(`Ignore - already created: ${gifPath}`);
    process.exit(1);
  }

  const dir = path.dirname(gifPath);
  const basename = path.basename(gifPath, '.gif');
  const stillPath = path.join(dir, `${basename}-still.png`);

  if (fs.existsSync(stillPath)) {
    console.log(`⏭️  Still exists: ${stillPath}`);
    process.exit(0);
  }

  console.log(`🎬 Processing: ${gifPath}`);
  execSync(`ffmpeg -i "${gifPath}" -vframes 1 "${stillPath}"`);
  console.log(`✅ Created: ${stillPath}`);
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.gif')) {
      processGif(fullPath);
    }
  });
}

console.log('Starting GIF processing script...');

const stats = fs.statSync(gifPath);
if (stats.isDirectory()) {
  traverseDirectory(gifPath)
} else {
  processGif(gifPath);
}

console.log('GIF processing script completed.');
