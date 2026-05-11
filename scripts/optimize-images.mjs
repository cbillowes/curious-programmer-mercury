import fs from "fs";
import path from "path";
import sharp from "sharp";

const fromPath = process.argv[2];
const quality = parseInt(process.argv[3]) || 80;
const MAX_WIDTH = 2500;
const SUPPORTED = new Set([".webp", ".gif", ".png", ".jpg", ".jpeg"]);

async function processImage(filename) {
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename, ext);
  const dir = path.dirname(filename);

  const webpOut = path.join(dir, `${basename}.webp`);
  const jpgOut = path.join(dir, `${basename}.jpg`);

  try {
    const image = sharp(filename, { animated: true });
    const { width } = await image.metadata();

    const pipeline =
      width > MAX_WIDTH ? image.resize(MAX_WIDTH, null, { withoutEnlargement: true }) : image;

    // Read into buffer first so writing .jpg doesn't conflict when source is .jpg.
    // Use toBuffer() → writeFileSync for output to avoid sharp's internal atomic
    // rename, which hits EPERM on some existing files on macOS.
    const buffer = await pipeline.toBuffer();

    const outputs = [];

    // Skip an output format when its path equals the source — macOS blocks overwriting.
    if (webpOut !== filename) outputs.push(["webp", webpOut, sharp(buffer, { animated: true }).webp({ quality })]);
    if (jpgOut !== filename) outputs.push(["jpg", jpgOut, sharp(buffer).jpeg({ quality })]);

    await Promise.all(
      outputs.map(async ([, outPath, pipeline]) => {
        const outBuffer = await pipeline.toBuffer();
        fs.writeFileSync(outPath, outBuffer);
        console.log(`🖼️  Optimized: ${outPath} (quality: ${quality})`);
      }),
    );

    console.log(`✅ ${filename} → ${outputs.map(([fmt]) => `.${fmt}`).join(" + ") || "(skipped — already source format)"}`);
  } catch (err) {
    console.error(`❌ Failed: ${filename}: ${err.message}`);
  }
}

function collectFiles(dir) {
  const results = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results.push(...collectFiles(fullPath));
    } else if (SUPPORTED.has(path.extname(file).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

const stats = fs.statSync(fromPath);
const files = stats.isDirectory() ? collectFiles(fromPath) : [fromPath];

console.log(`🧪 Processing ${files.length} image(s) from ${fromPath}...`);

for (const file of files) {
  await processImage(file);
}

console.log("✅ Done.");
