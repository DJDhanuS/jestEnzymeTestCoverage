import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShallowRenderer from 'react-test-renderer/shallow';
import Tile from '../../../../src/components/tile/Tile';

configure({ adapter: new Adapter() });

describe('<Tile> component', () => {
  // eslint-disable-next-line no-underscore-dangle
  test('Tile component Enable Div', () => {
    const rendererShallow = new ShallowRenderer();
    rendererShallow.render(<Tile name="Upcoming Expiry" value={33} />);
    expect(rendererShallow).toBeTruthy();
  });
});
