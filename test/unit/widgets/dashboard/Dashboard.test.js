import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShallowRenderer from 'react-test-renderer/shallow';
import Dashboard from '../../../../src/js/widgets/certificateDashboard/Dashboard';

jest.mock('../../../../src/components/side-navigation/sideBarNavigation', () => () => <div />);
jest.mock('../../../../src/styles/app.css');
jest.mock('../../../../src/redux/store/index');

configure({ adapter: new Adapter() });

describe('<Dashboard> component', () => {
  test('Test Dashboard component', () => {
    const rendererShallow = new ShallowRenderer();
    rendererShallow.render(<Dashboard />);
    expect(rendererShallow).toBeTruthy();
  });
});
