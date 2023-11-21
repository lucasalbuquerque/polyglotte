# Polyglotte - Simplifying Translation Generation with JSON files

<p align="center">
 <img src="./assets/logo-sm.png" width="400">
</p>

Have you ever faced the daunting task of populating extensive .json files with translations for various languages?

Polyglotte is a user-friendly tool designed to simplify the process of generating translations for your application in multiple languages.

This versatile tool supports internationalization (i18n) and automatically generates JSON files containing translations for your chosen languages.

Polyglotte leverages the Google Cloud Translation API for precise and dependable translations.

## Features

- Generate translations in JSON files for any language seamlessly.
- User-friendly tool for i18n support.
- Leverages the Google Cloud Translation API for precision.

## Installation

```bash
npm install polyglotte
```

## Usage

```javascript
import generateTranslations from "polyglotte";

const arrayToTranslate = ["Hello", "my name is", "How", "Are", "You"];

// Specify your target languages
const languages = ["en", "es", "fr"];

// Set freeApi to false if you are not using a free API
const freeApi = false;

// Replace 'your-api-key' with your actual Google Cloud API Key
const apiKey = "your-api-key";

const translations = generateTranslations(
  arrayToTranslate,
  languages,
  freeApi,
  apiKey
);

console.log(translations);
```

### CLI

You can also generate translations through the terminal, just type `npx polyglotte` in your terminal and respond each prompt.

```bash
##
npx polyglotte

## Enter a comma-separated list of phrases to translate:
"Hello", "my name is", "How", "Are", "You"

## Enter a comma-separated list of target languages:
"en", "es", "fr"

## Use the free API? (yes/no):
no

## Enter your Google Cloud API Key:
api-key

## Enter the output directory for translations:
/translations
```

## Example Output

After using Polyglotte to generate translations, your `translations` folder will support any language, producing files like:

```bash
project-root-directory/
|-- translations/
| |-- en.json
| |-- es.json
| |-- fr.json
| |-- your-language.json
|-- other-project-files-and-directories
```

## Parameters

<ul>
    <li><strong>arrayToTranslate:</strong> An array of strings containing the text to be translated.</li>
    <li><strong>languages:</strong> An array of language codes for which translations should be generated.</li>
    <li><strong>freeApi:</strong> A boolean indicating whether to use the free Google Translate API. Set to false if using a paid API key <strong>(recommended)</strong>.</li>
    <li><strong>apiKey:</strong> Your Google Cloud API Key for translation services.</li>
</ul>

## Example

In the example above, the <strong>arrayToTranslate</strong> contains phrases that you want to translate into <strong>English (en), Spanish (es), and French (fr)</strong>. The translations are automatically generated using the specified languages and stored in JSON files.

## Note

Ensure that you have a valid Google Cloud API Key with the necessary permissions for the Translation API.

If using the free API, set freeApi to true. For paid API usage, set freeApi to false and provide your API key.
Feel free to contribute and enhance Polyglotte for better multilingual support in your applications!

```vbnet
Please replace `"your-api-key"` with your actual Google Cloud API Key in the code. If you have any further requests or adjustments, feel free to let me know!
```

**Attention Users:**

Polyglotte offers a convenient and powerful translation solution using the Google Cloud Translation API. However, please be aware of the following limitations when using the free API:

1. **Limited Requests:** The free Google Translate API has usage limitations, including a restricted number of requests per day. If your application demands a higher volume of translations, you may encounter service interruptions.

2. **Consider a Paid Option:** For projects with higher translation needs, we strongly recommend considering a paid subscription to the Google Cloud Translation API. This ensures a more reliable and scalable translation service for your application.
