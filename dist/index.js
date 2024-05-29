#! /usr/bin/env node
"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
const sample_1 = require("./sample");
const currentDir = process.cwd();
const gitignorePath = path_1.default.join(currentDir, ".gitignore");
// Function to check if the file exists
function fileExists(filePath) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve) => {
      fs_1.default.access(filePath, fs_1.default.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  });
}
// Function to write the .gitignore file
function writeGitignoreFile(filePath, content) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fs_1.default.writeFile(filePath, content, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}
// Main function to handle the .gitignore file creation
function createGitignoreFile(filePath, content) {
  return __awaiter(this, void 0, void 0, function* () {
    if (yield fileExists(filePath)) {
      // File exists, ask the user if they want to overwrite it
      const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(
        "The .gitignore file already exists. Do you want to overwrite it? (yes/no): ",
        (answer) =>
          __awaiter(this, void 0, void 0, function* () {
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
      // File does not exist, create it
      try {
        yield writeGitignoreFile(filePath, content);
        console.log("The .gitignore file has been created.");
      } catch (err) {
        console.error("Error creating the .gitignore file:", err);
      }
    }
  });
}
// Call the main function with the .gitignore file path and content
createGitignoreFile(gitignorePath, sample_1.gitignoreContent);
