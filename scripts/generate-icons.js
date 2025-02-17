const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = path.join(__dirname, "../public/app-icon.png");
const outputDir = path.join(__dirname, "../public/icons");

// Créer le dossier icons s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

sizes.forEach((size) => {
  sharp(inputFile)
    .resize(size, size)
    .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
    .then((info) => {
      console.log(`Generated ${size}x${size} icon`);
    })
    .catch((err) => {
      console.error(`Error generating ${size}x${size} icon:`, err);
    });
});
