const fs = require("fs");
const content = "Easy assignment done";

fs.writeFile("a.txt", content, "utf-8", () => {});
