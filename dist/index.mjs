#! /usr/bin/env node
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
import fs from "fs";
import path from "path";
import readline from "readline";

// src/sample.ts
var gitignoreContent = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# database
/prisma/db.sqlite
/prisma/db.sqlite-journal

# next.js
/.next/
/out/
next-env.d.ts

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env
.env*.local

# vercel
.vercel

# local env files
.env*.local
.env

# typescript
*.tsbuildinfo
next-env.d.ts
`;

// src/index.ts
var currentDir = process.cwd();
var gitignorePath = path.join(currentDir, ".gitignore");
function fileExists(filePath) {
  return __async(this, null, function* () {
    return new Promise((resolve) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  });
}
function writeGitignoreFile(filePath, content) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}
function createGitignoreFile(filePath, content) {
  return __async(this, null, function* () {
    if (yield fileExists(filePath)) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(
        "The .gitignore file already exists. Do you want to overwrite it? (yes/no): ",
        (answer) => __async(this, null, function* () {
          rl.close();
          if (answer.toLowerCase() === "no") {
            console.log("The .gitignore file was not overwritten.");
          } else {
            try {
              yield writeGitignoreFile(filePath, content);
              console.log("The .gitignore file has been overwritten.");
            } catch (err) {
              console.error("Error writing the .gitignore file:", err);
            }
          }
        })
      );
    } else {
      try {
        yield writeGitignoreFile(filePath, content);
        console.log("The .gitignore file has been created.");
      } catch (err) {
        console.error("Error creating the .gitignore file:", err);
      }
    }
  });
}
createGitignoreFile(gitignorePath, gitignoreContent);
//# sourceMappingURL=index.mjs.map