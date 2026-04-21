const { Jimp } = require('jimp');

async function main() {
  const logo = await Jimp.read('public/vidurasalogo.png');
  
  // Create a 512x512 white background
  const bg = new Jimp({ width: 512, height: 512, color: 0xFFFFFFFF });
  
  // Resize logo to fit inside the square with padding (e.g., 400x400)
  logo.resize({ w: 400 });
  
  // Calculate center position
  const x = (512 - logo.bitmap.width) / 2;
  const y = (512 - logo.bitmap.height) / 2;
  
  // Composite logo over white background
  bg.composite(logo, x, y);
  
  // Save as favicon.png
  await bg.write('public/favicon.png');
  console.log('Successfully created public/favicon.png');
}

main().catch(console.error);
