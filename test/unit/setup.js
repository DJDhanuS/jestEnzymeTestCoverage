const enzyme = require('../../node_modules/enzyme');
const Adapter = require('../../node_modules/enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

global.window = Object.create(window);
Object.defineProperty(window, 'location', {
  value: {
    href: '',
    search: '',
    hostname: '',
  },
  writable: true,
});

window.Headers = function(obj) {
  const _obj = obj || {};
  const keys = Object.keys(_obj);
  keys.forEach((val) => {
    this[val] = _obj[val];
  });
};
window.Headers.prototype.append = function(key, val) {
  this[key] = val;
  return this;
};

// window.crypto = null;

window.alert = () => {
  /* no-op */
};
window.console.error = () => {
  /* no-op */
};
window.console.warn = () => {
  /* no-op */
};
window.console.debug = () => {
  /* no-op */
};
window.console.info = () => {
  /* no-op */
};
window.define = () => {};

window.MutationObserver = function() {
  this.observe = function() {};
};

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

/*
 * UnhandledRejection errors appear when rejected Promises are not catch()'d
 * LISTENING_TO_UNHANDLED_REJECTION avoids a memory leak issue when listening for unhandled rejections
 * https://github.com/facebook/jest/issues/3251#issuecomment-299183885
 */
if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err.message, err.stack);
  });
  // Avoid memory leak by adding too many listeners
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}
