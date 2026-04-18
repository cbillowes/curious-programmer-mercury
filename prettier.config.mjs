/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 100,
  arrowParens: "always",
  endOfLine: "lf",
  bracketSpacing: true,
  objectWrap: "preserve",

  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    // tailwindcss must be last so it sees the final output of other plugins
    "prettier-plugin-tailwindcss",
  ],

  // ── @ianvs/prettier-plugin-sort-imports ──────────────────────────────────
  importOrder: [
    // React core
    "^(react/(.*)$)|^(react$)",
    "^(react-dom/(.*)$)|^(react-dom$)",
    // Next.js
    "^(next/(.*)$)|^(next$)",
    // All other third-party packages
    "<THIRD_PARTY_MODULES>",
    "",
    // Internal — types first, then lib, then providers, then components
    "^@/types(.*)$",
    "^@/lib(.*)$",
    "^@/providers(.*)$",
    "^@/components/ui(.*)$",
    "^@/components(.*)$",
    "^@/app(.*)$",
    "",
    // Relative imports
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",

  // ── prettier-plugin-tailwindcss (Tailwind v4) ─────────────────────────────
  // v4 uses a CSS entry-point instead of tailwind.config.js
  tailwindStylesheet: "./app/globals.css",
};

export default config;
