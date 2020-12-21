import React from 'react';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import CertDashboard from '../../../../src/components/cert-dashboard/certDashboard';

configure({ adapter: new Adapter() });
jest.mock('../../../../src/components/status-card-group/StatusCardGroup', () => () => <div />);
jest.mock('../../../../src/components/tile-group/TileGroup', () => () => <div />);
jest.mock('../../../../src/utils/AppUtils', () => {
  return {
    generateUUID: () => {
      return 123;
    },
    groupBy: (res, predicate) => {
      const grouped = {};
      res.forEach((entry) => {
        const groupKey = predicate(entry);
        if (typeof grouped[groupKey] === 'undefined') grouped[groupKey] = [];
        grouped[groupKey].push(entry);
      });
      return grouped;
    },
    EVENTS_QUERY_URL: '/v1/events/search',
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

describe('<CertDashboard> component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const pendingEventsData = [
    {
      externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
      eventType: 'UPDATE_CERT',
    },
    {
      externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
      eventType: 'EXPIRE_CERT',
    },
  ];

  const data = [
    {
      id: '0cdcdc71-1bbd-45eb-baa1-85e0f7794e15',
      externalRefId: 'c0cbd32c-cdef-4d18-969e-3daeed86f4c0',
      externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
      externalRefName: 'vendorservices-cert1.ecnp.bankofamerica.com',
      eventType: 'UPDATE_CERT',
      activeTime: 1605189668972,
      startTime: 1605190505658,
      endTime: 1605190506651,
      status: 'CREATED',
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
      status: 'CREATED',
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
  ];

  const certDataForExpiringCert = [
    {
      id: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
      fiName: 'vendorservices-cert1.ecnp.bankofamerica.com',
      cname: 'vendorservices-cert1.ecnp.bankofamerica.com.platform.intuit.net',
      validityPeriod: 2,
      certificateRequestId: '1815',
      certificateId: '27298',
      certAlias:
        'vendorservices-cert1.ecnp.bankofamerica.com.ed2afcf6-bfb9-4ab0-834c-475f6f860f3f.private.key',
      created: 1556570638692,
      modified: 1587723228462,
      expiry: 1610155800000,
      createdBy: 'mliberty',
      modifiedBy: 'mgarg',
      status: 'ACTIVE',
      keystoreDetails: {
        subject:
          'C=US,ST=California,L=San Diego,O=INTUIT INC.,OU=Technology Operations,CN=vendorservices-cert1.ecnp.bankofamerica.com',
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

  const certDataForRenewalCert = [
    {
      id: 'c0cbd32c-cdef-4d18-969e-3daeed86f4c0',
      fiName: 'vendorservices-cert1.ecnp.bankofamerica.com',
      cname: 'vendorservices-cert1.ecnp.bankofamerica.com',
      validityPeriod: 2,
      certificateRequestId: '1815',
      certificateId: '27298',
      certAlias:
        'vendorservices-cert1.ecnp.bankofamerica.com.c0cbd32c-cdef-4d18-969e-3daeed86f4c0.private.key',
      created: 1556570638692,
      modified: 1587723228462,
      expiry: 1610155800000,
      createdBy: 'mliberty',
      modifiedBy: 'mgarg',
      status: 'ACTIVE',
      keystoreDetails: {
        subject:
          'C=US,ST=California,L=San Diego,O=INTUIT INC.,OU=Technology Operations,CN=vendorservices-cert1.ecnp.bankofamerica.com',
        issuer: 'C=US,O=DigiCert Inc,CN=DigiCert SHA2 Secure Server CA',
        serialNumberHex: 'c6f7069ec23ddd7bbb6571f2c3f840c7bc6',
        notBeforeDate: 'Mon Jan 07 16:00:00 PST 2019',
        notAfterDate: 'Fri Jan 08 04:00:00 PST 2021',
        fingerPrintMD5: 'adadaada22112sdasdadas',
        fingerPrintSHA1: '123123123123asadasd',
        fingerPrintSHA256: '1231223wqddadfafq2121212',
        signatureAlg: 'SHA256WITHRSA',
        version: 3,
      },
    },
  ];

  const renewalDetails = {
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
        status: 'CREATED',
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
        status: 'CREATED',
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
    expiringCertificate: certDataForExpiringCert,
    renewalCertificate: certDataForRenewalCert,
  };

  const renewalDetailsWithCertUpdateComplete = {
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
        status: 'CREATED',
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
    renewalCertificate: certDataForRenewalCert,
    expiringCertificate: certDataForExpiringCert,
  };

  test('test CertDashboard on 401 - eventy query 1', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();

    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(401, '');

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, data);

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, certDataForExpiringCert);

    axiosMock
      .onGet('/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0')
      .reply(200, certDataForRenewalCert);

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();
    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: [],
      renewalDetails: [renewalDetails],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'ALL');
  });

  test('test CertDashboard on 404 - eventy query 1', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();

    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(404, '');

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, data);

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, certDataForExpiringCert);

    axiosMock
      .onGet('/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0')
      .reply(200, certDataForRenewalCert);

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();
    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: [],
      renewalDetails: [renewalDetails],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'ALL');
    expect(instance).toBeTruthy();
  });

  test('test CertDashboard on 401 - eventy query 2', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();

    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(200, pendingEventsData);

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(401, '');

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, certDataForExpiringCert);

    axiosMock
      .onGet('/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0')
      .reply(200, certDataForRenewalCert);

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();
    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: [],
      renewalDetails: [renewalDetails],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'ALL');
    expect(instance).toBeTruthy();
  });

  test('test CertDashboard on 404 - eventy query 2', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();

    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(200, pendingEventsData);

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(404, '');

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, certDataForExpiringCert);

    axiosMock
      .onGet('/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0')
      .reply(200, certDataForRenewalCert);

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();
    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: [],
      renewalDetails: [renewalDetails],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'ALL');
    expect(instance).toBeTruthy();
  });

  test('test CertDashboard on 401 - certificate query for expiring certificate', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();

    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(200, pendingEventsData);

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, data);

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(401, '');

    axiosMock
      .onGet('/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0')
      .reply(200, certDataForRenewalCert);

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();
    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: ['0cdcdc71-1bbd-45eb-baa1-85e0f7794e15'],
      renewalDetails: [renewalDetails],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'ALL');
    expect(instance).toBeTruthy();
  });

  test('test CertDashboard on 404 - certificate query for expiring certificate', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();

    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(200, pendingEventsData);

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, data);

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(404, '');

    axiosMock
      .onGet('/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0')
      .reply(200, certDataForRenewalCert);

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();
    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: ['0cdcdc71-1bbd-45eb-baa1-85e0f7794e15'],
      renewalDetails: [renewalDetails],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'ALL');
    expect(instance).toBeTruthy();
  });

  test('test CertDashboard on 401 - certificate query for renewal certificate', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();

    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(200, pendingEventsData);

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, data);

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, certDataForExpiringCert);

    axiosMock
      .onGet('/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0')
      .reply(401, '');

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();
    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: [],
      renewalDetails: [renewalDetails],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'ALL');
    expect(instance).toBeTruthy();
  });

  test('test CertDashboard on 404 - certificate query for renewal certificate', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();

    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(200, pendingEventsData);

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, data);

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, certDataForExpiringCert);

    axiosMock
      .onGet('/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0')
      .reply(404, '');

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();
    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: [],
      renewalDetails: [renewalDetails],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'ALL');
    expect(instance).toBeTruthy();
  });

  test('CertDashboard on success', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();

    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(200, pendingEventsData);

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, data);

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, certDataForExpiringCert);

    axiosMock
      .onGet(`/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0`)
      .reply(200, certDataForRenewalCert);

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();
    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: ['ed2afcf6-bfb9-4ab0-834c-475f6f860f3f'],
      renewalDetails: [renewalDetails],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'ALL');
    expect(instance).toBeTruthy();
  });

  test('test filterRenewalDetails for UPDATE_PENDING', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();
    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(200, pendingEventsData);

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, data);

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, certDataForExpiringCert);

    axiosMock
      .onGet(`/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0`)
      .reply(200, certDataForRenewalCert);

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();

    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: [],
      renewalDetails: [renewalDetails],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'UPDATE_PENDING');
    expect(instance).toBeTruthy();
  });

  test('test filterRenewalDetails for UPDATE_COMPLETE with update pending ', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();
    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(200, pendingEventsData);

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, data);

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, certDataForExpiringCert);

    axiosMock
      .onGet('/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0')
      .reply(200, certDataForRenewalCert);

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();

    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: [],
      renewalDetails: [renewalDetails],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'UPDATE_COMPLETE');
    expect(instance).toBeTruthy();
  });

  test('test filterRenewalDetails for UPDATE_COMPLETE with update completed ', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();
    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(200, pendingEventsData);

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, data);

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, certDataForExpiringCert);

    axiosMock
      .onGet('/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0')
      .reply(200, certDataForRenewalCert);

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();
    instance.setState({
      upcomingExpiry: {
        name: 'Upcoming Expiry',
        value: 0,
        description:
          'Displays the number of certificates for which the renewal process has started.',
        type: 'ALL',
      },
      certYetToRenew: {
        name: 'Yet to renew',
        value: 0,
        description: 'Displays the number of pending renewal certificate creation tasks.',
        type: 'UPDATE_PENDING',
      },
      renewalInProgress: {
        name: 'Renewals in progress',
        value: 0,
        description:
          'Displays the number of certificate which are ready for use by Intuit systems.',
        type: 'UPDATE_COMPLETE',
      },
      // eslint-disable-next-line react/no-unused-state
      expiryCertId: [],
      renewalDetails: [renewalDetailsWithCertUpdateComplete],
      activeRenewalDetails: [],
    });
    instance.filterRenewalDetails(null, 'UPDATE_COMPLETE');
    expect(instance).toBeTruthy();
  });

  test('test filterRenewalDetails for ALL', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock.reset();
    axiosMock
      .onGet(
        `/v1/events/search?eventType=EXPIRE_CERT,UPDATE_CERT&status=CREATED&field=eventType,externalSrcId`,
      )
      .reply(200, pendingEventsData);

    axiosMock
      .onGet('/v1/events/search?externalSrcId=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, data);

    axiosMock
      .onGet('/v1/certificate/search?id=ed2afcf6-bfb9-4ab0-834c-475f6f860f3f')
      .reply(200, certDataForExpiringCert);

    axiosMock
      .onGet('/v1/certificate/search?id=c0cbd32c-cdef-4d18-969e-3daeed86f4c0')
      .reply(200, certDataForRenewalCert);

    const wrapper = shallow(<CertDashboard />);
    const instance = wrapper.instance();
    instance.filterRenewalDetails(null, 'ALL');
    expect(instance).toBeTruthy();
  });
});
