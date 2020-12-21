import Activator from '../../../../src/js/widgets/certificateDashboard/service/Activator';

describe('<Activator> component', () => {
  test('Test Activator when env is specified', () => {
    const args = {
      sandbox: {
        log: jest.fn(),
        appContext: {
          getEnvironment: () => 'prf',
        },
      },
    };
    const activator = new Activator(args);
    activator.onBeforeStart();
    expect(activator).toBeTruthy();
  });

  test('Test Activator when env is not specified', () => {
    const args = {
      sandbox: {
        log: jest.fn(),
        appContext: {
          getEnvironment: () => '',
        },
      },
    };
    const activator = new Activator(args);
    activator.onBeforeStart();
    expect(activator).toBeTruthy();
  });
});
