import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import ShallowRenderer from 'react-test-renderer/shallow';
import TileGroup from '../../../../src/components/tile-group/TileGroup';

configure({ adapter: new Adapter() });
jest.mock('../../../../src/components/tile/Tile', () => () => <div />);

describe('<TileGroup> component', () => {
  const propsData = [
    {
      name: 'Upcoming Expiry',
      value: 30,
      description: 'Displays the number of certificates for which the renewal process has started.',
      type: 'ALL',
    },
    {
      name: 'Yet to renew',
      value: 3,
      description: 'Displays the number of pending renewal certificate creation tasks.',
      type: 'UPDATE_PENDING',
    },
    {
      name: 'Renewals in progress',
      value: 27,
      description: 'Displays the number of certificate which are ready for use by Intuit systems.',
      type: 'UPDATE_COMPLETE',
    },
  ];
  // eslint-disable-next-line no-underscore-dangle
  test('Tile group render', () => {
    const wrapper = shallow(<TileGroup filterRenewalDetails={jest.fn()} data={propsData} />);
    wrapper
      .find('Col')
      .at(0)
      .simulate('click');
    expect(wrapper).toBeTruthy();
  });
});
