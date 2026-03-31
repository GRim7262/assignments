const fs = require("fs");
const content = "This sentence was added later with fs.writeFile.";

// fs.writeFile("4-write-to-file.md", content, "utf-8", function () {
//   console.log("content is written");
// });

fs.appendFile("4-write-to-file.md", content, "utf-8", function () {
  console.log("Content appended");
});
