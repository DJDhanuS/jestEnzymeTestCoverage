/**
 * This file is used for the sandbox object mocks for the `yarn serve` command
 * It can also double as sandbox mocks for jest and other tests
 * Any unmocked functions are noops by default when doing local server development
 */

module.exports = {
  logger: {
    // Since we need this for the server, we ignore
    // eslint-disable-next-line no-console
    success: (input2) => console.log(input2),
    // eslint-disable-next-line no-console
    error: (input) => console.log(input),
    // eslint-disable-next-line no-console
    logException: (input, error) => console.log(`${input}, error=${error}`),
  },
};
