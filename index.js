#!/usr/bin/env node

const { Command } = require('commander');
const figlet = require('figlet');
const Jimp = require('jimp');

const program = new Command();

program
  .version('1.0.0')
  .description('Customizable ASCII Art Generator')
  .option('-t, --text <text>', 'Text to convert to ASCII art')
  .option('-i, --image <path>', 'Image file path to convert to ASCII art')
  .option('-w, --width <number>', 'Width of ASCII art output (default: 80)', parseInt, 80)
  .option('-f, --font <font>', 'Font for text ASCII art (default: Standard)', 'Standard')
  .parse(process.argv);

const options = program.opts();

function textToAscii(text, font) {
  figlet.text(text, { font }, (err, data) => {
    if (err) {
      console.error('Error generating ASCII art from text:', err);
      process.exit(1);
    }
    console.log(data);
  });
}

async function imageToAscii(filepath, width) {
  try {
    const chars = '@%#*+=-:. ';
    const image = await Jimp.read(filepath);
    const aspectRatio = image.bitmap.height / image.bitmap.width;
    const w = width;
    const h = Math.round(w * aspectRatio * 0.5);
    image.resize(w, h);
    let ascii = '';
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(x, y));
        const brightness = (r + g + b) / 3 / 255;
        const charIndex = Math.floor((1 - brightness) * (chars.length - 1));
        ascii += chars[charIndex];
      }
      ascii += '\n';
    }
    console.log(ascii);
  } catch (err) {
    console.error('Error generating ASCII art from image:', err);
    process.exit(1);
  }
}

if (options.text) {
  textToAscii(options.text, options.font);
} else if (options.image) {
  imageToAscii(options.image, options.width);
} else {
  program.help();
} 