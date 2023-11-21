import * as readline from "readline";
import generateTranslations from "./index"; // Adjust the import path as needed

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  const arrayToTranslate = (
    await prompt("Enter a comma-separated list of phrases to translate:")
  )
    .split(",")
    .map((phrase) => phrase.trim());

  const languages = (
    await prompt("Enter a comma-separated list of target languages:")
  )
    .split(",")
    .map((lang) => lang.trim());

  const freeApi =
    (
      await prompt("Use the free API (not recommended)? (yes/no):")
    ).toLowerCase() === "yes";

  let apiKey = "";
  if (!freeApi) {
    apiKey = await prompt("Enter your Google Cloud API Key:");
  }

  const outputDirectory = await prompt(
    "Enter the output directory for translations: (eg: src/translations)"
  );

  // Call the generateTranslations function
  const translations = generateTranslations(
    arrayToTranslate,
    languages,
    freeApi,
    apiKey,
    outputDirectory
  );

  console.log(translations);

  rl.close();
}

main();
