declare module "@vitalets/google-translate-api" {
  const translate: (
    text: string,
    options: { to: string }
  ) => Promise<{ text: string }>;
  export = translate;
}
