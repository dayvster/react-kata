module.exports = {
  extends: [
    'cz',
  ],
  rules: {
    'header-match-team': [
      2,
      'always',
      '^(feat|feature|chore|bugfix|fix|docs|refactor|test|style|perf|ci|build|revert)(\(.+\))?: .+',
    ],
  },
};
