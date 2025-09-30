module.exports = {
  '*.{ts,tsx}': [
    'eslint --fix',
    'node check-exports.js',
  ],
};
