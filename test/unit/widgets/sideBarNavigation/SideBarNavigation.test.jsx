import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideBarNavigation from '../../../../src/components/side-navigation/sideBarNavigation';

configure({ adapter: new Adapter() });
jest.mock('../../../../src/components/search-Certificate/SearchCertificates', () => () => <div />);
jest.mock('../../../../src/components/cert-dashboard/certDashboard', () => () => <div />);
jest.mock('../../../../src/assets/images/helloWorld.png', () => () => <image />);

describe('<SideBarNavigation> component', () => {
  // eslint-disable-next-line no-underscore-dangle
  test('Navigate to Dashboard', () => {
    const wrapper = shallow(<SideBarNavigation />);
    const instance = wrapper.instance();
    instance.setState({
      viewComponent: 'Dashboard',
    });
    instance.handleNavigation('Dashboard');
    instance.componentRender();
    expect(instance).toBeTruthy();
  });

  test('Navigate Search Tab', () => {
    const wrapper = shallow(<SideBarNavigation />);
    const instance = wrapper.instance();
    instance.setState({
      viewComponent: 'Search',
    });
    instance.handleNavigation('Search');
    instance.componentRender();
    expect(instance).toBeTruthy();
  });

  test('Default Navigation', () => {
    const wrapper = shallow(<SideBarNavigation />);
    const instance = wrapper.instance();
    instance.setState({
      viewComponent: 'Default',
    });
    instance.handleNavigation('Default');
    instance.componentRender();
    expect(instance).toBeTruthy();
  });

  test('Dashboard Tab clicked', () => {
    const wrapper = shallow(<SideBarNavigation />);
    wrapper
      .find('NavItem')
      .at(0)
      .simulate('click');
    expect(wrapper).toBeTruthy();
  });

  test('Search Tab clicked', () => {
    const wrapper = shallow(<SideBarNavigation />);
    wrapper
      .find('NavItem')
      .at(1)
      .simulate('click');
    expect(wrapper).toBeTruthy();
  });
});
