import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StatusCardGroup from '../../../../src/components/status-card-group/StatusCardGroup';

configure({ adapter: new Adapter() });

jest.mock('../../../../src/components/status-card/StatusCard', () => () => <div />);

describe('<StatusCardGroup> component', () => {
  // eslint-disable-next-line no-underscore-dangle
  // const e = { stopPropagation: jest.fn() };
  const props = {
    data: [
      {
        events: [
          {
            id: '60a1fee4-b019-4b39-b2a8-64cb257b61f2',
            externalRefId: 'f3e26df9-6be4-47e3-9aa4-31c06ec1cd80',
            externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
            externalRefName: 'UPDATED_avishkar-ma-e2e.platform.intuit.com',
            eventType: 'UPDATE_CERT',
            activeTime: 1605189669009,
            startTime: 1605190505811,
            endTime: 1605190626961,
            status: 'COMPLETE',
            modified: 1605190627815,
            created: 1605189669180,
            retryCount: 1,
          },
          {
            id: 'fa75b8e8-ac5c-428f-8ad0-4ce9c2c4bd1d',
            externalRefId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
            externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
            externalRefName: 'UPDATED_avishkar-ma-e2e.platform.intuit.com',
            eventType: 'CREATE_CERT',
            activeTime: 1605189667492,
            startTime: 1605189668999,
            endTime: 1605189669009,
            status: 'COMPLETE',
            modified: 1605189669413,
            created: 1605189667991,
            retryCount: 1,
          },
          {
            id: '2cbab93f-8039-4294-989f-f7ed902064d1',
            externalRefId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
            externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
            externalRefName: 'UPDATED_avishkar-ma-e2e.platform.intuit.com',
            eventType: 'EXPIRE_CERT',
            activeTime: 1610366400000,
            status: 'CREATED',
            modified: 1605189668007,
            created: 1605189668007,
          },
        ],
        expiringCertificate: {
          id: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
          fiName: 'UPDATED_avishkar-ma-e2e.platform.intuit.com',
          cname: 'avishkar-ma-e2e.platform.intuit.com.platform.intuit.net',
          validityPeriod: 2,
          certificateRequestId: '1494',
          certificateId: '63846',
          certAlias:
            'avishkar-ma-e2e.platform.intuit.com.ed2afcf6-bfb9-4ab0-834c-475f6f860f3.private.key',
          created: 1554108690491,
          modified: 1573821305875,
          expiry: 1610366400000,
          createdBy: 'rbangaloreshankar',
          modifiedBy: '13645bb3fda444037bd979b7ca9224f14',
          status: 'ACTIVE',
        },
        renewalCertificate: {
          id: 'f3e26df9-6be4-47e3-9aa4-31c06ec1cd80',
          fiName: 'UPDATED_avishkar-ma-e2e.platform.intuit.com',
          cname: 'avishkar-ma-e2e.platform.intuit.com.platform.intuit.net',
          validityPeriod: 1,
          certificateRequestId: '1141',
          certificateId: '29658',
          certAlias:
            'UPDATED_avishkar-ma-e2e.platform.intuit.com.f3e26df9-6be4-47e3-9aa4-31c06ec1cd80',
          created: 1605189669315,
          modified: 1605190627855,
          expiry: 1644473045000,
          createdBy: 'rbangaloreshankar',
          modifiedBy: 'lifecycle',
          status: 'DUE_RENEWAL',
        },
      },
    ],
  };

  const props2 = {
    data: [
      {
        events: [
          {
            id: '60a1fee4-b019-4b39-b2a8-64cb257b61f2',
            externalRefId: 'f3e26df9-6be4-47e3-9aa4-31c06ec1cd80',
            externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
            externalRefName: 'UPDATED_avishkar-ma-e2e.platform.intuit.com',
            eventType: 'UPDATE_CERT',
            activeTime: 1605189669009,
            startTime: 1605190505811,
            endTime: 1605190626961,
            status: 'CREATED',
            modified: 1605190627815,
            created: 1605189669180,
            retryCount: 1,
          },
          {
            id: 'fa75b8e8-ac5c-428f-8ad0-4ce9c2c4bd1d',
            externalRefId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
            externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
            externalRefName: 'UPDATED_avishkar-ma-e2e.platform.intuit.com',
            eventType: 'CREATE_CERT',
            activeTime: 1605189667492,
            startTime: 1605189668999,
            endTime: 1605189669009,
            status: 'COMPLETE',
            modified: 1605189669413,
            created: 1605189667991,
            retryCount: 1,
          },
          {
            id: '2cbab93f-8039-4294-989f-f7ed902064d1',
            externalRefId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
            externalSrcId: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
            externalRefName: 'UPDATED_avishkar-ma-e2e.platform.intuit.com',
            eventType: 'EXPIRE_CERT',
            activeTime: 1610366400000,
            status: 'CREATED',
            modified: 1605189668007,
            created: 1605189668007,
          },
        ],
        expiringCertificate: {
          id: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
          fiName: 'UPDATED_avishkar-ma-e2e.platform.intuit.com',
          cname: 'avishkar-ma-e2e.platform.intuit.com.platform.intuit.net',
          validityPeriod: 2,
          certificateRequestId: '1494',
          certificateId: '63846',
          certAlias:
            'avishkar-ma-e2e.platform.intuit.com.ed2afcf6-bfb9-4ab0-834c-475f6f860f3.private.key',
          created: 1554108690491,
          modified: 1573821305875,
          expiry: 1610366400000,
          createdBy: 'rbangaloreshankar',
          modifiedBy: '13645bb3fda444037bd979b7ca9224f14',
          status: 'ACTIVE',
        },
        renewalCertificate: {
          id: 'f3e26df9-6be4-47e3-9aa4-31c06ec1cd80',
          fiName: 'UPDATED_avishkar-ma-e2e.platform.intuit.com',
          cname: 'avishkar-ma-e2e.platform.intuit.com.platform.intuit.net',
          validityPeriod: 1,
          certificateRequestId: '1141',
          certificateId: '29658',
          certAlias:
            'UPDATED_avishkar-ma-e2e.platform.intuit.com.f3e26df9-6be4-47e3-9aa4-31c06ec1cd80',
          created: 1605189669315,
          modified: 1605190627855,
          expiry: 1644473045000,
          createdBy: 'rbangaloreshankar',
          modifiedBy: 'lifecycle',
          status: 'SUBMITTED',
        },
      },
    ],
  };

  const data = [
    {
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
        id: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3f',
        fiName: 'vendorservices-cert1.ecnp.bankofamerica.com',
        cname: 'vendorservices-cert1.ecnp.bankofamerica.com.platform.intuit.net',
        validityPeriod: 1,
        certificateRequestId: '1450',
        certificateId: '63802',
        certAlias:
          'vendorservices-cert1.ecnp.bankofamerica.com.ed2afcf6-bfb9-4ab0-834c-475f6f860f3f.private.key',
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
        certAlias:
          'vendorservices-cert1.ecnp.bankofamerica.com.c0cbd32c-cdef-4d18-969e-3daeed86f4c0',
        created: 1605189669298,
        modified: 1605190627831,
        expiry: 1644472925000,
        createdBy: '50002067918',
        modifiedBy: 'lifecycle',
        status: 'DUE_RENEWAL',
      },
    },
  ];

  const rowValues = {
    expiringCertID: 'ed2afcf6-bfb9-4ab0-834c-475f6f860f3',
    fiName: 'vendorservices-cert1.ecnp.bankofamerica.com',
    expiry: 'Mon, 11 Jan 2021 12:00:00 GMT',
    newCertId: '6df4afaa-b63a-41a1-a3fc-27203e730b85',
    status: 'New certificate is ready for download.',
  };

  test('Test StatusCardGroup component', () => {
    const wrapper = shallow(<StatusCardGroup {...props} />);
    const instance = wrapper.instance();

    instance.processDeatils(data);
    instance.openModal(true);
    instance.closeModal(false);
    instance.populateValues(rowValues);
    expect(instance).toBeTruthy();
  });

  test('Test StatusCardGroup component with pending events', () => {
    const wrapper = shallow(<StatusCardGroup {...props2} />);
    const instance = wrapper.instance();

    instance.processDeatils(data);
    instance.openModal(true);
    instance.closeModal(false);
    instance.populateValues(rowValues);
    expect(instance).toBeTruthy();
  });

  test('test SideBarNavigation renderButton component', () => {
    const wrapper = mount(<StatusCardGroup {...props} />);
    const instance = wrapper.instance();
    instance.renderButton(rowValues);
    expect(instance).toBeTruthy();
  });

  test('test SideBarNavigation renderButton component', () => {
    const wrapper = mount(<StatusCardGroup {...props} />);
    wrapper
      .find('Button')
      .at(0)
      .simulate('click');
    expect(wrapper).toBeTruthy();
  });
});
