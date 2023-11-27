import inquirer from "inquirer";
import generateTranslations from "./index"; // Adjust the import path as needed

interface Answers {
  arrayToTranslate: string;
  languages: string;
  freeApi: boolean;
  apiKey: string;
  outputDirectory: string;
}

async function main() {
  const answers: Answers = await inquirer.prompt([
    {
      type: "input",
      name: "arrayToTranslate",
      message: "Enter a comma-separated list of phrases to translate:",
      validate: (input) => input.trim() !== "",
    },
    {
      type: "input",
      name: "languages",
      message: "Enter a comma-separated list of target languages:",
      validate: (input) => input.trim() !== "",
    },
    {
      type: "confirm",
      name: "freeApi",
      message: "Use the free API (not recommended)?",
      default: true,
    },
    {
      type: "input",
      name: "apiKey",
      message: "Enter your Google Cloud API Key:",
      when: (answers) => !answers.freeApi,
      validate: (input) => input.trim() !== "",
    },
    {
      type: "input",
      name: "outputDirectory",
      message: "Enter the output directory for translations:",
      default: "./src/translations",
    },
  ]);

  const arrayToTranslate: string[] = answers.arrayToTranslate
    .split(",")
    .map((phrase) => phrase.trim());

  const languages: string[] = answers.languages.split(",").map((lang) => lang.trim());

  // Call the generateTranslations function
  const translations = await generateTranslations(
    arrayToTranslate,
    languages,
    answers.freeApi,
    answers.apiKey,
    answers.outputDirectory
  );

  console.log(translations);
}

main();
