import React from 'react';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import SearchCertificate from '../../../../src/components/search-Certificate/SearchCertificates';

configure({ adapter: new Adapter() });

jest.mock('../../../../src/utils/AppUtils', () => jest.fn());
jest.mock('../../../../src/utils/AppUtils', () => {
  return {
    generateUUID: () => {
      return 123;
    },
    CERT_QUERY_URL: '/v1/certificate/search',
    CERT_PARTNER_QUERY_URL: '/v1/certificate',
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

const event = { preventDefault: () => {} };
jest.spyOn(event, 'preventDefault');

const mockAxios = new MockAdapter(axios);
describe('Test SearchCertificate component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('Test SearchCertificate component with unknown filter', () => {
    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({ title: { title: 'test', value: 'testId' }, searchText: 'testId' });

    instance.handleSearchInput({ target: { value: 'test' } });
    instance.handleSearch(event);
    expect(instance).toBeTruthy();
  });

  test('Test SearchCertificate component with status filter', () => {
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
    mockAxios.onGet('/v1/certificate/search?status=ACTIVE').reply(200, certData);
    mockAxios
      .onGet(
        '/v1/certificate/search?id=d0ece66a-8aaa-4398-a273-69d77be4adb6&includeKeystoreDetails=true',
      )
      .reply(200, certData);

    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({ title: { title: 'Status', value: 'status' }, searchText: 'ACTIVE' });

    instance.handleSearchInput({ target: { value: 'ACTIVE' } });
    instance.handleSearch(event);

    instance.showModal('d0ece66a-8aaa-4398-a273-69d77be4adb6');
    instance.renderButton(true);
    instance.renderDropdown();
    expect(instance).toBeTruthy();
  });

  test('Test SearchCertificate component with id filter', () => {
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
    mockAxios
      .onGet('/v1/certificate/search?id=d0ece66a-8aaa-4398-a273-69d77be4adb6')
      .reply(200, certData);

    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({
      title: { title: 'Cert ID', value: 'id' },
      searchText: 'd0ece66a-8aaa-4398-a273-69d77be4adb6',
    });

    instance.handleSearch(event);
    expect(instance).toBeTruthy();
  });

  test('Test SearchCertificate component with fiName filter', () => {
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
    mockAxios
      .onGet('/v1/certificate/search?fiName=acctagg.wellsfargo.com.platform.intuit.net')
      .reply(200, certData);

    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({
      title: { title: 'Host Name', value: 'fiName' },
      searchText: 'acctagg.wellsfargo.com.platform.intuit.net',
    });

    instance.handleSearch(event);
    expect(instance).toBeTruthy();
  });

  test('Test SearchCertificate component with partnerUid filter', () => {
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
    mockAxios.onGet('/v1/certificate/wellsfargo').reply(200, certData);

    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({
      title: { title: 'PartnerUid', value: 'partnerUid' },
      searchText: 'wellsfargo',
    });

    instance.handleSearch(event);
    expect(instance).toBeTruthy();
  });

  test('Test SearchCertificate component with partnerUid filter on 401 error', () => {
    mockAxios.onGet('/v1/certificate/wellsfargo').reply(401, '');

    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({
      title: { title: 'PartnerUid', value: 'partnerUid' },
      searchText: 'wellsfargo',
    });

    instance.handleSearch(event);
    expect(instance).toBeTruthy();
  });

  test('Test SearchCertificate component with partnerUid filter on 404 error', () => {
    mockAxios.onGet('/v1/certificate/wellsfargo').reply(404, '');

    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({
      title: { title: 'PartnerUid', value: 'partnerUid' },
      searchText: 'wellsfargo',
    });

    instance.handleSearch(event);
    expect(instance).toBeTruthy();
  });

  test('Test SearchCertificate component with status filter for 401 error', () => {
    mockAxios.onGet('/v1/certificate/search?status=ACTIVE').reply(401, '');

    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({ title: { title: 'Status', value: 'status' }, searchText: 'ACTIVE' });

    instance.handleSearch(event);
    expect(instance).toBeTruthy();
  });

  test('Test SearchCertificate component with status filter for 404 error', () => {
    mockAxios.onGet('/v1/certificate/search?status=ACTIVE').reply(404, '');

    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({ title: { title: 'Status', value: 'status' }, searchText: 'ACTIVE' });

    instance.handleSearch(event);
    expect(instance).toBeTruthy();
  });

  test('Test modal', () => {
    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({ title: { title: 'Status', value: 'status' }, modalState: true });

    instance.showModal('d0ece66a-8aaa-4398-a273-69d77be4adb6');
    instance.renderButton(true);
    instance.renderDropdown();
    expect(instance).toBeTruthy();
  });

  test('Test modal on 401 error', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock
      .onGet(
        '/v1/certificate/search?id=d0ece66a-8aaa-4398-a273-69d77be4adb6&includeKeystoreDetails=true',
      )
      .reply(401, '');

    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({ title: { title: 'Status', value: 'status' }, modalState: false });

    instance.showModal('d0ece66a-8aaa-4398-a273-69d77be4adb6');
    expect(instance).toBeTruthy();
  });

  test('Test modal on 404 error', () => {
    const axiosMock = new MockAdapter(axios);
    axiosMock
      .onGet(
        '/v1/certificate/search?id=d0ece66a-8aaa-4398-a273-69d77be4adb6&includeKeystoreDetails=true',
      )
      .reply(404, '');

    const wrapper = shallow(<SearchCertificate />);
    const instance = wrapper.instance();
    instance.setState({ title: { title: 'Status', value: 'status' }, modalState: false });

    instance.showModal('d0ece66a-8aaa-4398-a273-69d77be4adb6');
    expect(instance).toBeTruthy();
  });
});
