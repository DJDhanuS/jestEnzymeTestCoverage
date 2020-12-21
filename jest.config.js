/**
 * Defaults are provided by Plugin-CLI.
 * Use this as a place to specify your overrides, then import it into `plugin-cli.config.js` and pass it there.
 */
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  modulePaths: ['<rootDir>'],
  setupFiles: ['<rootDir>/test/unit/setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/cypress/'],
  notify: false,
  transformIgnorePatterns: ['node_modules/(?!(@rconnamacher))'],
};
