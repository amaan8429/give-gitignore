#! /usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import { gitignoreContent } from "./sample";

const currentDir = process.cwd();
const gitignorePath = path.join(currentDir, ".gitignore");

// Function to check if the file exists
async function fileExists(filePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      resolve(!err);
    });
  });
}

// Function to write the .gitignore file
async function writeGitignoreFile(
  filePath: string,
  content: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Main function to handle the .gitignore file creation
async function createGitignoreFile(
  filePath: string,
  content: string
): Promise<void> {
  if (await fileExists(filePath)) {
    // File exists, ask the user if they want to overwrite it
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      "The .gitignore file already exists. Do you want to overwrite it? (yes/no): ",
      async (answer) => {
        rl.close();
        if (answer.toLowerCase() === "no") {
          console.log("The .gitignore file was not overwritten.");
        } else {
          try {
            await writeGitignoreFile(filePath, content);
            console.log("The .gitignore file has been overwritten.");
          } catch (err) {
            console.error("Error writing the .gitignore file:", err);
          }
        }
      }
    );
  } else {
    // File does not exist, create it
    try {
      await writeGitignoreFile(filePath, content);
      console.log("The .gitignore file has been created.");
    } catch (err) {
      console.error("Error creating the .gitignore file:", err);
    }
  }
}

// Call the main function with the .gitignore file path and content
createGitignoreFile(gitignorePath, gitignoreContent);
