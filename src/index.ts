#! /usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";

import { gitignoreContent } from "./sample";

const currentDir: string = process.cwd();

const gitignorePath: string = path.join(currentDir, ".gitignore");

/**
 * Checks if a file exists at the given file path.
 * @param {string} filePath - The path to the file to check.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the file exists, `false` otherwise.
 */
async function fileExists(filePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      resolve(!err);
    });
  });
}

/**
 * Writes the given content to the specified file path.
 * @param {string} filePath - The path to the file to write.
 * @param {string} content - The content to write to the file.
 * @returns {Promise<void>} A promise that resolves when the file has been written successfully.
 */
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

/**
 * Handles the creation of the .gitignore file.
 * If the file already exists, it asks the user if they want to overwrite it.
 * If the file does not exist, it creates a new one with the provided content.
 * @param {string} filePath - The path to the .gitignore file.
 * @param {string} content - The content to write to the .gitignore file.
 * @returns {Promise<void>} A promise that resolves when the file creation process is complete.
 */
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

createGitignoreFile(gitignorePath, gitignoreContent);
