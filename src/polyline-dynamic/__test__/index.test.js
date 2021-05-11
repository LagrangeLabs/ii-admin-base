import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import PolylineDynamic from '../index';

const testSelfProps = {
  offsetEach: -0.25,
  clearSvg: false,
  points: '100 100, 200 200, 300, 200',
  stroke: 'red',
  className: 'test-svg',
};
const arrayPointsProps = {
  offsetEach: -0.25,
  clearSvg: false,
  points: ['100 100, 200 200, 300, 200', '400 400, 500 400, 600, 300'],
  stroke: 'red',
  className: 'test-svg',
};

describe("Test PolylineDynamic component on the self's props", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should have the test-svg class', () => {
    const wrapper = mount(<PolylineDynamic {...testSelfProps} />);
    expect(wrapper.find('.test-svg').length).toBeTruthy(); // 判断有没有对应的class
    wrapper.unmount();
  });
});

describe('Test PolylineDynamic component on the points Array props', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should have the two polyline', () => {
    const wrapper = mount(<PolylineDynamic {...arrayPointsProps} />);
    expect(wrapper.find('polyline').length).toBe(
      arrayPointsProps.points.length,
    ); // 判断有没有对应的class
    wrapper.unmount();
  });
});
