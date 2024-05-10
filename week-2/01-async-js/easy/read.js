const fs = require("fs");

fs.readFile("3-read-from-file.md", "utf-8", (err, data) => {
  for (let i = 0; i < 10000000000; i++) {}
  console.log(data);
});
