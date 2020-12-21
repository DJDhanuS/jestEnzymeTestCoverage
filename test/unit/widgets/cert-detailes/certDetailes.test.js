import React from 'react';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import CertDetails from '../../../../src/components/cert-details/certDetails';

configure({ adapter: new Adapter() });
jest.mock('../../../../src/components/status-card-group/StatusCardGroup', () => () => <div />);
jest.mock('../../../../src/components/tile-group/TileGroup', () => () => <div />);
jest.mock('../../../../src/utils/AppUtils', () => jest.fn());
jest.mock('../../../../src/utils/AppUtils', () => {
  return {
    generateUUID: () => {
      return 123;
    },
    DOWNLOAD_PUBLIC_KEY_URL: '/v1/certificate/download/publickey',
  };
});

jest.mock('../../../../src/js/widgets/certificateDashboard/service/Activator', () => {
  return {
    GlobalContext: {
      sandbox: {
        logger: {
          error: jest.fn(),
          success: jest.fn(),
          logException: jest.fn(),
        },
      },
    },
  };
});

const axiosMock = new MockAdapter(axios);

describe('<CertDetails> component', () => {
  beforeEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  // const certId = 'd0ece66a-8aaa-4398-a273-69d77be4adb6';
  const certData = {
    id: 'd0ece66a-8aaa-4398-a273-69d77be4adb6',
    fiName: 'acctagg.wellsfargo.com',
    cname: 'acctagg.wellsfargo.com.platform.intuit.net',
    validityPeriod: 2,
    certificateRequestId: '1815',
    certificateId: '27298',
    certAlias: 'acctagg.wellsfargo.com.d0ece66a-8aaa-4398-a273-69d77be4adb6.private.key',
    created: 1556570638692,
    modified: 1587723228462,
    expiry: 1610155800000,
    createdBy: 'mliberty',
    modifiedBy: 'mgarg',
    status: 'ACTIVE',
    keystoreDetails: {
      subject:
        'C=US,ST=California,L=San Diego,O=INTUIT INC.,OU=Technology Operations,CN=wellsfargo.platform.intuit.net',
      issuer: 'C=US,O=DigiCert Inc,CN=DigiCert SHA2 Secure Server CA',
      serialNumberHex: 'c6f7069ecd7bbb6571f2c3f840c7bc6',
      notBeforeDate: 'Mon Jan 07 16:00:00 PST 2019',
      notAfterDate: 'Fri Jan 08 04:00:00 PST 2021',
      fingerPrintMD5: '59f34e45e095c9146f08e1791f28f3ed',
      fingerPrintSHA1: 'bff90686c40298b980f95b4fafb28f28a36512db',
      fingerPrintSHA256: '0286a12d8f401c7a508cb76161a86df628279801e2eec255cf7047816c3475fc',
      signatureAlg: 'SHA256WITHRSA',
      version: 3,
    },
  };

  // eslint-disable-next-line no-underscore-dangle
  test('CertDetails Show modal ', () => {
    const certId = 'd0ece66a-8aaa-4398-a273-69d77be4adb6';
    axiosMock
      .onGet(`/v1/certificate/search?id=${certId}&includeKeystoreDetails=true`)
      .reply(200, certData);
    const wrapper = shallow(<CertDetails show details={certData} showModal={() => jest.fn()} />);
    wrapper.setState({ modalState: true });
    const instance = wrapper.instance();
    instance.showModal(certId);
    expect(instance).toBeTruthy();
  });

  test('StatusCard hide modal', () => {
    const certId = 'd0ece66a-8aaa-4398-a273-69d77be4adb6';
    axiosMock
      .onGet(`/v1/certificate/search?id=${certId}&includeKeystoreDetails=true`)
      .reply(200, certData);
    const wrapper = shallow(<CertDetails show details={certData} showModal={() => jest.fn()} />);
    const instance = wrapper.instance();
    instance.showModal(certId);
    expect(instance).toBeTruthy();
  });

  test('DownloadCert on success', () => {
    global.URL.createObjectURL = jest.fn();
    const mockElement = {
      download: jest.fn(),
      href: jest.fn(),
      click: jest.fn(),
    };
    global.document.createElement = jest.fn().mockReturnValue(mockElement);

    axiosMock
      .onPost(`/v1/certificate/download/publickey`)
      .reply(200, '----BEGIN PUBLIC CERTIFICATE----');
    const wrapper = shallow(<CertDetails show details={certData} showModal={() => jest.fn()} />);
    const instance = wrapper.instance();
    instance.downloadCert('d0ece66a-8aaa-4398-a273-69d77be4adb6');
    expect(instance).toBeTruthy();
  });

  test('DownloadCert on empty response', () => {
    global.URL.createObjectURL = jest.fn();
    const mockElement = {
      download: jest.fn(),
      href: jest.fn(),
      click: jest.fn(),
    };
    global.document.createElement = jest.fn().mockReturnValue(mockElement);

    axiosMock.onPost(`/v1/certificate/download/publickey`).reply(200, '');
    const wrapper = shallow(<CertDetails show details={certData} showModal={() => jest.fn()} />);
    const instance = wrapper.instance();
    instance.downloadCert('d0ece66a-8aaa-4398-a273-69d77be4adb6');
    expect(instance).toBeTruthy();
  });

  test('DownloadCert on 401 error ', () => {
    axiosMock.onPost(`/v1/certificate/download/publickey`).reply(401, '');
    const wrapper = shallow(<CertDetails show details={certData} showModal={() => jest.fn()} />);
    const instance = wrapper.instance();
    instance.downloadCert('d0ece66a-8aaa-4398-a273-69d77be4adb6');
    expect(instance).toBeTruthy();
  });

  test('Download public key of certificate on button click', () => {
    global.URL.createObjectURL = jest.fn();
    const mockElement = {
      download: jest.fn(),
      href: jest.fn(),
      click: jest.fn(),
    };
    global.document.createElement = jest.fn().mockReturnValue(mockElement);

    axiosMock
      .onPost(`/v1/certificate/download/publickey`)
      .reply(200, '----BEGIN PUBLIC CERTIFICATE----');

    const wrapper = shallow(<CertDetails show details={certData} showModal={() => jest.fn()} />);
    wrapper
      .find('Button')
      .at(0)
      .simulate('click');
  });
});
