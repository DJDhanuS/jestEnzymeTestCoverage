import React from 'react';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import StatusCard from '../../../../src/components/status-card/StatusCard';

configure({ adapter: new Adapter() });

jest.mock('../../../../src/components/cert-details/certDetails', () => () => <div />);
jest.mock('../../../../src/utils/AppUtils', () => jest.fn());
jest.mock('../../../../src/utils/AppUtils', () => {
  return {
    generateUUID: () => {
      return 123;
    },
    DOWNLOAD_PUBLIC_KEY_URL: '/v1/certificate/download/publickey',
    CERT_QUERY_URL: '/v1/certificate/search',
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

describe('<StatusCard> component', () => {
  beforeEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const data = {
    events: [
      {
        id: '0cdcdc71-1bbd-45eb-baa1-85e0f7794e15',
        externalRefId: 'c0cbd32c-cdef-4d18-969e-3daeed86f4c0',
        externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
        externalRefName: 'vendorservices-cert1.ecnp.bankofamerica.com',
        eventType: 'UPDATE_CERT',
        activeTime: 1605189668972,
        startTime: 1605190505658,
        endTime: 1605190506651,
        status: 'COMPLETE',
        modified: 1605190627814,
        created: 1605189669154,
        retryCount: 1,
      },
      {
        id: 'a7b0ead3-6ae2-4f42-a0b8-e9a461104d36',
        externalRefId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
        externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
        externalRefName: 'vendorservices-cert1.ecnp.bankofamerica.com',
        eventType: 'CREATE_CERT',
        activeTime: 1605189667489,
        startTime: 1605189668969,
        endTime: 1605189668972,
        status: 'COMPLETE',
        modified: 1605189669412,
        created: 1605189667867,
        retryCount: 1,
      },
      {
        id: '9a2ef3b6-7fea-4051-846d-b7b5e3fe1735',
        externalRefId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
        externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
        externalRefName: 'vendorservices-cert1.ecnp.bankofamerica.com',
        eventType: 'EXPIRE_CERT',
        activeTime: 1610366400000,
        status: 'CREATED',
        modified: 1605189667887,
        created: 1605189667887,
      },
    ],
    expiringCertificate: {
      id: 'd0ece66a-8aaa-4398-a273-69d77be4adb6',
      fiName: 'vendorservices-cert1.ecnp.bankofamerica.com',
      cname: 'vendorservices-cert1.ecnp.bankofamerica.com.platform.intuit.net',
      validityPeriod: 1,
      certificateRequestId: '1450',
      certificateId: '63802',
      certAlias:
        'vendorservices-cert1.ecnp.bankofamerica.com.d0ece66a-8aaa-4398-a273-69d77be4adb6.private.key',
      created: 1552495265482,
      modified: 1593715267166,
      expiry: 1610366400000,
      createdBy: '50002067918',
      modifiedBy: '50002197988',
      status: 'ACTIVE',
    },
    renewalCertificate: {
      id: 'c0cbd32c-cdef-4d18-969e-3daeed86f4c0',
      fiName: 'vendorservices-cert1.ecnp.bankofamerica.com',
      cname: 'vendorservices-cert1.ecnp.bankofamerica.com.platform.intuit.net',
      validityPeriod: 1,
      certificateRequestId: '1137',
      certificateId: '29654',
      certAlias: 'vendorservices-cert1.ecnp.bankofamerica.com.c0cbd32c-cdef-4d18-969e-3daeed86f4c0',
      created: 1605189669298,
      modified: 1605190627831,
      expiry: 1644472925000,
      createdBy: '50002067918',
      modifiedBy: 'lifecycle',
      status: 'DUE_RENEWAL',
    },
  };

  const dataWithNoExpiryDate = {
    events: [
      {
        id: '0cdcdc71-1bbd-45eb-baa1-85e0f7794e15',
        externalRefId: 'c0cbd32c-cdef-4d18-969e-3daeed86f4c0',
        externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
        externalRefName: 'vendorservices-cert1.ecnp.bankofamerica.com',
        eventType: 'UPDATE_CERT',
        activeTime: 1605189668972,
        startTime: 1605190505658,
        endTime: 1605190506651,
        status: 'COMPLETE',
        modified: 1605190627814,
        created: 1605189669154,
        retryCount: 1,
      },
      {
        id: 'a7b0ead3-6ae2-4f42-a0b8-e9a461104d36',
        externalRefId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
        externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
        externalRefName: 'vendorservices-cert1.ecnp.bankofamerica.com',
        eventType: 'CREATE_CERT',
        activeTime: 1605189667489,
        startTime: 1605189668969,
        endTime: 1605189668972,
        status: 'COMPLETE',
        modified: 1605189669412,
        created: 1605189667867,
        retryCount: 1,
      },
      {
        id: '9a2ef3b6-7fea-4051-846d-b7b5e3fe1735',
        externalRefId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
        externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
        externalRefName: 'vendorservices-cert1.ecnp.bankofamerica.com',
        eventType: 'EXPIRE_CERT',
        activeTime: 1610366400000,
        status: 'CREATED',
        modified: 1605189667887,
        created: 1605189667887,
      },
    ],
    expiringCertificate: {
      id: 'd0ece66a-8aaa-4398-a273-69d77be4adb6',
      fiName: 'vendorservices-cert1.ecnp.bankofamerica.com',
      cname: 'vendorservices-cert1.ecnp.bankofamerica.com.platform.intuit.net',
      validityPeriod: 1,
      certificateRequestId: '1450',
      certificateId: '63802',
      certAlias:
        'vendorservices-cert1.ecnp.bankofamerica.com.d0ece66a-8aaa-4398-a273-69d77be4adb6.private.key',
      created: 1552495265482,
      modified: 1593715267166,
      createdBy: '50002067918',
      modifiedBy: '50002197988',
      status: 'ACTIVE',
    },
    renewalCertificate: {
      id: 'c0cbd32c-cdef-4d18-969e-3daeed86f4c0',
      fiName: 'vendorservices-cert1.ecnp.bankofamerica.com',
      cname: 'vendorservices-cert1.ecnp.bankofamerica.com.platform.intuit.net',
      validityPeriod: 1,
      certificateRequestId: '1137',
      certificateId: '29654',
      certAlias: 'vendorservices-cert1.ecnp.bankofamerica.com.c0cbd32c-cdef-4d18-969e-3daeed86f4c0',
      created: 1605189669298,
      modified: 1605190627831,
      createdBy: '50002067918',
      modifiedBy: 'lifecycle',
      status: 'DUE_RENEWAL',
    },
  };

  test('StatusCard show modal', () => {
    const certId = 'd0ece66a-8aaa-4398-a273-69d77be4adb6';
    const certData = [
      {
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
      },
    ];
    axiosMock
      .onGet(`/v1/certificate/search?id=${certId}&includeKeystoreDetails=true`)
      .reply(200, certData);
    const wrapper = shallow(<StatusCard data={data} />);
    wrapper.setState({ modalState: true });
    const instance = wrapper.instance();
    instance.showModal(certId);
    expect(instance).toBeTruthy();
  });

  test('StatusCard hide modal', () => {
    const certId = 'd0ece66a-8aaa-4398-a273-69d77be4adb6';
    const certData = [
      {
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
      },
    ];
    axiosMock
      .onGet(`/v1/certificate/search?id=${certId}&includeKeystoreDetails=true`)
      .reply(200, certData);
    const wrapper = shallow(<StatusCard data={data} />);
    const instance = wrapper.instance();
    instance.showModal(certId);
    expect(instance).toBeTruthy();
  });

  test('StatusCard show modal with missing expiry time in certificate details', () => {
    const certId = 'd0ece66a-8aaa-4398-a273-69d77be4adb6';
    const certData = [
      {
        id: 'd0ece66a-8aaa-4398-a273-69d77be4adb6',
        fiName: 'acctagg.wellsfargo.com',
        cname: 'acctagg.wellsfargo.com.platform.intuit.net',
        validityPeriod: 2,
        certificateRequestId: '1815',
        certificateId: '27298',
        certAlias: 'acctagg.wellsfargo.com.d0ece66a-8aaa-4398-a273-69d77be4adb6.private.key',
        created: 1556570638692,
        modified: 1587723228462,
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
      },
    ];
    axiosMock
      .onGet(`/v1/certificate/search?id=${certId}&includeKeystoreDetails=true`)
      .reply(200, certData);
    const wrapper = shallow(<StatusCard data={dataWithNoExpiryDate} />);
    const instance = wrapper.instance();
    instance.showModal(certId);
    expect(instance).toBeTruthy();
  });

  test('StatusCard show modal on 401 error', () => {
    const certId = 'd0ece66a-8aaa-4398-a273-69d77be4adb6';
    axiosMock
      .onGet(`/v1/certificate/search?id=${certId}&includeKeystoreDetails=true`)
      .reply(401, '');
    const wrapper = shallow(<StatusCard data={data} />);
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
    const wrapper = shallow(<StatusCard data={data} />);
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
    const wrapper = shallow(<StatusCard data={data} />);
    const instance = wrapper.instance();

    instance.downloadCert('d0ece66a-8aaa-4398-a273-69d77be4adb6');
    expect(instance).toBeTruthy();
  });

  test('DownloadCert on 401 error ', () => {
    axiosMock.onPost(`/v1/certificate/download/publickey`).reply(401, '');
    const wrapper = shallow(<StatusCard data={data} />);
    const instance = wrapper.instance();

    instance.downloadCert('d0ece66a-8aaa-4398-a273-69d77be4adb6');
    expect(instance).toBeTruthy();
  });

  test('Show details of expiring certificate on button click', () => {
    const certId = 'd0ece66a-8aaa-4398-a273-69d77be4adb6';
    const certData = [
      {
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
      },
    ];
    axiosMock
      .onGet(`/v1/certificate/search?id=${certId}&includeKeystoreDetails=true`)
      .reply(200, certData);

    const wrapper = shallow(<StatusCard data={data} />);
    wrapper
      .find('Button')
      .at(0)
      .simulate('click');
  });

  test('Download public key of expiring certificate on button click', () => {
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

    const wrapper = shallow(<StatusCard data={data} />);
    wrapper
      .find('Button')
      .at(1)
      .simulate('click');
  });
});
