const fs = require('fs');
const path = require('path');
async function convertUrlToImageFile(url) {
    const imagePath = path.join(__dirname, 'IMAGES', url);
    if (await fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = Buffer.from(imageBuffer).toString('base64');
        return imageBase64;
    }
}
module.exports = {
    convertUrlToImageFile
}