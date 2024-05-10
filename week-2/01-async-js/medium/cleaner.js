const fs = require("fs");

const data = fs.readFile("a.txt", "utf-8", () => {});
const trimData = data.trim();

fs.writeFile("a.txt", trimData);
