---
title: Optimize images for sharing on social media
cover: optimize-image.webp
creditSource: Wikipedia
date: 2025-12-08
creditLink: https://www.freepik.com/pikaso/ai-image-generator
tags:
  - Technical
  - Image Optimization
  - Node.js
  - Next.js
abstract: >
  A simple guide to optimize images on build for social media sharing using Node.js in a Next.js application.
---

You can create metadata for social media sharing using optimized images in a format that is universally supported across various platforms.
WhatsApp, for instance, does not like sharing with webp images, so converting them to JPEG is a good idea.
Large images can be slow and rejected by some platforms, so resizing them is beneficial.

## Optimize images

You will need to install sharp which is a high performance Node.js image processing library to handle programmatic image optimization.

```bash
npm install sharp
```

This script will convert images to JPEG format, resize them to 400x400 pixels, and set the quality to 80 for optimal sharing on social media platforms.
You can adjust the dimensions and quality settings as needed.

```js:title=scripts/optimize-images.js
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
  const basename = path.basename(image);
  const newBasename = basename.replace(ext, toExt);
  const outputJpg = path.join(toPath, newBasename);

  if (fs.existsSync(outputJpg)) {
    console.log(`✅ Image already exists: ${outputJpg}`);
    return;
  }

  if (['.DS_Store'].includes(basename)) {
    console.log(`⏭️ Skipping file: ${image}`);
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
        console.error('❌ Conversion failed for ', outputJpg, err);
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
    } else {
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
```

You can use the script by running the following command in your terminal, replacing the source and destination paths as needed:

```bash
node optimize-images.js ./path/to/source/images ./path/to/destination/images
```

## Run on build

Run this on build using `nodemon` and `concurrently`.
Nodemon will watch for changes in the source images folder and run the optimization script automatically and Concurrently will allow you to run this alongside your development server.

```bash
npm install --save-dev nodemon concurrently
```

```json:title=nodemon.json
{
  "ext": "gif,jpg,jpeg,png,webp",
  "watch": [
    "public/**/*"
  ],
  "exec": "node scripts/optimize-images.js public/source public/destination"
}
```

Update your `package.json` to include the following scripts:

```json:title=package.json
"scripts": {
  "watch": "nodemon",
  "dev": "concurrently \"npm run watch\" \"next dev\""
}
```

## Page metadata

You can then reference the optimized images in your Next.js page metadata for social sharing.
This example uses Next.js 16 with App Router and TypeScript.

```tsx:title=app/page.js
export async function generateMetadata() {
  const image = '/share/optimized-image.jpg';
  return {
    title: 'Some page',
    description: 'Some description',
    imageUrl: image,
    openGraph: {
      title: 'Some page',
      description: 'Some description',
      images: [{
        url: image,
        width: 400,
        height: 400,
        alt: 'Optimized image for sharing',
        type: 'image/jpeg'
      }],
      type: 'website',
      publishedTime: '2025-12-08T00:00:00Z',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Some page',
      description: 'Some description',
      images: [image],
    },
    type: 'website',
  };
}
```
