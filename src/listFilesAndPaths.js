import fs from "fs";
import path from "path";

// مسیر ریشه پروژه
const rootDir = process.cwd();

// مسیر مورد نظر برای بررسی (src و db)
const dirsToCheck = ["src", "db"];

function listFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...listFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

dirsToCheck.forEach((dirName) => {
  const fullDir = path.join(rootDir, dirName);
  if (!fs.existsSync(fullDir)) return;
  console.log(`\n===== FILES IN ${fullDir} =====`);
  const files = listFiles(fullDir);
  files.forEach((file) => {
    // مسیر کامل
    console.log("Full path:", file);
    // مسیر نسبی از ریشه پروژه
    console.log("Relative to root:", path.relative(rootDir, file));
    console.log("---");
  });
});
