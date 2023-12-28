module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "extends": [
    "prettier",
    "react-app",
    "plugin:eslint-comments/recommended"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "latest"
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "ignoreRestSiblings": true,
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "import/no-anonymous-default-export": "off",

    // Eslint-comments rules
    "eslint-comments/no-unused-disable": "warn"
  }
}