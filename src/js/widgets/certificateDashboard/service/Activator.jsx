import BaseActivator from 'web-shell-core/application/BaseActivator';
import axios from 'axios';

export const GlobalContext = {};

const envToPASSEndPointsMap = {
  prod: 'https://partnerauthselfservice.api.intuit.com',
  e2e: 'https://partnerauthselfservice-e2e.api.intuit.com',
  qa: 'https://partnerauthselfservice-prf.api.intuit.com',
  perf: 'https://partnerauthselfservice-prf.api.intuit.com',
  default: 'https://partnerauthselfservice-prf.api.intuit.com',
};

const envToAuthKeyMap = {
  prod: 'prdakyresHiuCkKfrxbFAVCKiIq8DQr3lupieVQ1',
  e2e: 'preprdakyresPtK10EfuXBBg9T4mTzgg0DMheA2o',
  qa: 'preprdakyresPtK10EfuXBBg9T4mTzgg0DMheA2o',
  perf: 'preprdakyresPtK10EfuXBBg9T4mTzgg0DMheA2o',
  default: 'preprdakyresPtK10EfuXBBg9T4mTzgg0DMheA2o',
};

export default class Activator extends BaseActivator {
  constructor(args) {
    super(args);
    // eslint-disable-next-line no-console
    // console.log(this.sandbox.appContext.getUserAuthInfo());
    this.sandbox = args && args.sandbox;
  }

  onBeforeStart() {
    GlobalContext.sandbox = this.sandbox;
    GlobalContext.env = this.sandbox.appContext.getEnvironment();
    GlobalContext.passBaseUrl = envToPASSEndPointsMap.default;

    axios.defaults.headers.common.intuit_assetid = '4326850934505453399';
    axios.defaults.headers.common.intuit_appId = 'Intuit.identity.connect.partnercertdashboard';
    axios.defaults.headers.common.intuit_offeringid =
      'Intuit.identity.connect.partnercertdashboard';
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common.Authorization = `Intuit_APIKey intuit_apikey=${envToAuthKeyMap.default}`;

    if (this.sandbox.appContext.getEnvironment()) {
      GlobalContext.passBaseUrl = envToPASSEndPointsMap[this.sandbox.appContext.getEnvironment()];
      axios.defaults.headers.common.Authorization = `Intuit_APIKey intuit_apikey=${
        envToAuthKeyMap[this.sandbox.appContext.getEnvironment()]
      }`;
    }
  }
}
