var Jimp = require("jimp");

async function generateImages(obj) {
  var fileNameIn = obj.src;
  var fileNameOut = obj.output;
  var imageCaption = obj.text[0];
  var loadedImage;

  Jimp.read(fileNameIn)
    .then(function(image) {
      loadedImage = image;
      return Jimp.loadFont(Jimp[obj.font]);
    })
    .then(function(font) {
      loadedImage
        .print(font, obj.position.x, obj.position.y, imageCaption)
        .write(fileNameOut);
    })
    .catch(function(err) {
      console.error(err);
    });
}

generateImages({
  src: "home-banner.jpg",
  output: "home-banner_${text}.jpg",
  text: ["abc", "xyz"],
  position: {
    x: 100,
    y: 200
  },
  font: "FONT_SANS_16_BLACK"
});
