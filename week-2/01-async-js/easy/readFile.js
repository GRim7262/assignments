const fs = require("fs");

fs.readFile("3-read-from-file.md", "utf-8", function (err, data) {
  console.log(data);
});

let ans = 0;
for (let i = 0; i < 100000000; i++) {
  ans += i;
}
