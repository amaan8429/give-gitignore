#! /usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_readline = __toESM(require("readline"));

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
var gitignorePath = import_path.default.join(currentDir, ".gitignore");
function fileExists(filePath) {
  return __async(this, null, function* () {
    return new Promise((resolve) => {
      import_fs.default.access(filePath, import_fs.default.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  });
}
function writeGitignoreFile(filePath, content) {
  return __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      import_fs.default.writeFile(filePath, content, (err) => {
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
      const rl = import_readline.default.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(
        "The .gitignore file already exists. Do you want to overwrite it? (yes/no): ",
        (answer) => __async(this, null, function* () {
          rl.close();
          if (answer.toLowerCase() !== "yes") {
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
//# sourceMappingURL=index.js.map