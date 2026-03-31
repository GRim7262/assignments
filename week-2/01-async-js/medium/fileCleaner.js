const fs = require("fs");

fs.readFile("1-file-cleaner.md", "utf-8", function (err, data) {
  const cleaned = data
    .split("\n")
    .map((line) => line.trim().replace(/\s+/g, " "))
    .join("/n");
//   console.log(cleaned);

  fs.writeFile("1-file-cleaner.md", cleaned, "utf-8", function () {
    console.log("File is cleaned.");
  });
});
