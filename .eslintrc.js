module.exports = {
  extends: ["plugin:import/errors", "plugin:import/warnings", "plugin:import/typescript"],
  plugins: ["import"],
  rules: {
    "import/no-default-export": "error",
    "import/no-unresolved": "error",
    "import/order": ["error", { "alphabetize": { "order": "asc" } }],
  },
};
