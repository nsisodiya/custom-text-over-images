var Jimp = require("jimp");
var Papa = require("papaparse");

async function generateImages(obj) {
  var fileNameIn = obj.src;
  var fileNameOut = obj.output;
  var loadedImage = await Jimp.read(fileNameIn);
  var jsonData = await convertCSVToJson(obj.csvFileName);
  console.log("jsonData", jsonData);

  jsonData.map(async function(person, i) {
    try {
      var Name = person.Name;
      var LastName = person["Last Name"];
      var ReferralCode = person["Referral Code"];
      var uName = `${i}_${Name}_${LastName}`;
      console.log(`Processing started caption ${uName}`);
      var cImage = loadedImage.clone();
      var font = await Jimp.loadFont(Jimp[obj.font]);
      cImage
        .print(font, 1200, 710, Name)
        .print(font, 1200, 2090, ReferralCode)
        .write(`./out/${uName}_${fileNameOut}`);
      console.log(`Processing Done ${uName}`);
    } catch (error) {
      console.error(error);
    }
  });
}

generateImages({
  src: "CareBear.png",
  output: "CareBear.png",
  csvFileName: "Data.csv",
  font: "FONT_SANS_64_BLACK"
});

const readFilePromise = require("fs-readfile-promise");

async function convertCSVToJson(fname) {
  const buffer = await readFilePromise(fname);
  var filecontent = buffer.toString(); //=> '... file contents ...'
  var filecontentArr = filecontent.split("\n");
  var header = filecontentArr[0].split(",");
  var data = filecontentArr.shift();
  var jsonData = [];
  filecontentArr.map(function(str) {
    var data = {};
    var arr = str.split(",");
    header.map(function(key, i) {
      data[key] = arr[i];
    });
    jsonData.push(data);
  });
  return jsonData;
}
