var Jimp = require("jimp");

function generateImages(obj) {
  var fileNameIn = obj.src;
  var fileNameOut = obj.output;
  obj.text.map(async function(imageCaption) {
    try {
      console.log(`Processing started caption ${imageCaption}`);
      var loadedImage = await Jimp.read(fileNameIn);
      var font = await Jimp.loadFont(Jimp[obj.font]);
      loadedImage
        .print(font, obj.position.x, obj.position.y, imageCaption)
        .write(`${imageCaption}_${fileNameOut}`);
      console.log(`Processing Done ${imageCaption}`);
    } catch (error) {
      console.error(error);
    }
  });
}

generateImages({
  src: "home-banner.jpg",
  output: "home-banner_${text}.jpg",
  text: ["00000", "xyz", "99948585"],
  position: {
    x: 100,
    y: 200
  },
  font: "FONT_SANS_16_BLACK"
});
