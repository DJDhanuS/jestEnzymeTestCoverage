/**
 * NOTE: This config is purely for IDE integration. Rules can be overridden here and then fed into the
 * plugin-cli.config.js
 */

module.exports = {
  extends: '@appfabric/eslint-config-appfabric',
  rules: {
    "valid-jsdoc" : "off",
    "require-jsdoc" : "off",
    "react/prefer-stateless-function" : "off",
    "react/destructuring-assignment" : "off",
    'spaced-comment': 'warn',
    'multiline-comment-style': 'off',
    'no-confusing-arrow': ['error', { allowParens: false }],
    'no-underscore-dangle': 'off', // for TypeScript module compilation
    // 'no-console': 'off',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
};
