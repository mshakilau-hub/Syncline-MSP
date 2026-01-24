// scan-links.js
const fs = require("fs");
const path = require("path");

const root = "./src";

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith(".jsx") || filepath.endsWith(".js")) {
      callback(filepath);
    }
  });
}

function scanFile(filepath) {
  const content = fs.readFileSync(filepath, "utf8");
  const lines = content.split("\n");

  const patterns = [
    {
      label: "<a href=\"/…\">",
      regex: /<a\s+[^>]*href="(\/[^"]*)"/g
    },
    {
      label: "<motion.a href=\"/…\">",
      regex: /<motion\.a\s+[^>]*href="(\/[^"]*)"/g
    }
  ];

  let foundInFile = false;

  patterns.forEach(({ label, regex }) => {
    lines.forEach((line, index) => {
      let match;
      while ((match = regex.exec(line)) !== null) {
        if (!foundInFile) {
          console.log("\n=== File:", filepath, "===\n");
          foundInFile = true;
        }
        console.log(
          `[${label}] line ${index + 1}:`,
          line.trim()
        );
      }
    });
  });
}

walk(root, scanFile);

console.log("\nScan complete.");
