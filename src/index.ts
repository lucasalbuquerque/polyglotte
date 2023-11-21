import * as fs from "fs";
import * as path from "path";
import * as i18next from "i18next";
import translate from "@vitalets/google-translate-api";
import Translate from "@google-cloud/translate";

interface Translations {
  [language: string]: Record<string, string>;
}

async function generateTranslations(
  array: string[],
  languages: string[],
  freeApi: boolean,
  apiKey: string,
  outputPath = "./translations"
): Promise<Translations> {
  const translations: Translations = {};

  // Initial i18next configuration
  i18next.default.init({
    interpolation: {
      escapeValue: false,
    },
    resources: {},
  });

  const fullOutputPath = path.resolve(
    process.cwd(),
    "./" + outputPath.replace("/", "")
  );

  // Ensure the output directory exists
  if (!fs.existsSync(fullOutputPath)) {
    fs.mkdirSync(fullOutputPath);
  }

  // Function to convert a string to snake_case
  const toSnakeCase = (str: string): string =>
    str.replace(/\s+/g, "_").toLowerCase();

  // Function to translate text using Google Translate
  const translateText = async (
    text: string,
    targetLang: string
  ): Promise<string> => {
    if (freeApi) {
      const result = await translate(text, { to: targetLang });
      return result.text;
    }

    const googleTranslate = new Translate.v2.Translate({ key: apiKey });

    const result = await googleTranslate.translate(text, { to: targetLang });
    return result[0];
  };

  // Generate translations for each specified language
  for (const language of languages) {
    translations[language] = {};

    // Create the full path for the JSON file
    const filePath = path.join(outputPath, `${language}.json`);

    // Check if the JSON file already exists
    if (fs.existsSync(filePath)) {
      const existingTranslations = JSON.parse(
        fs.readFileSync(filePath, "utf8")
      );
      translations[language] = existingTranslations;
    }

    for (const item of array) {
      const key = toSnakeCase(item);

      // Add the translation only if the key does not exist
      if (!translations[language][key]) {
        // Translate the text using Google Translate
        const translatedText = await translateText(item, language);
        translations[language][key] = translatedText;
      }
    }

    // Add translations to the i18next resource
    i18next.default.addResourceBundle(
      language,
      "translation",
      translations[language]
    );

    // Write translations to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(translations[language], null, 2));
  }

  return translations;
}

export = generateTranslations;
