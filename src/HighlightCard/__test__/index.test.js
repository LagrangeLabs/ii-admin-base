import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import HighlightCard from '../index';
const testSelfProps = {
  cardTitle: '卡片标题',
  showHighLightIcon: true,
};

describe("Test HighlightCard component on the self's props", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should have the highlight class', () => {
    const wrapper = mount(<HighlightCard {...testSelfProps} />);
    // const highlightElement = wrapper.find('卡片标题').instance().getComponent();

    // expect(wrapper).toBeInTheDocument(); // 判断元素是否在HTML文档中
    expect(wrapper.text()).toContain('卡片标题');
    expect(wrapper.find('.ii-highlight-card-head').length).toBeTruthy(); // 判断有没有对应的class
    expect(wrapper.find('.ii-highlight-icon').length).toBeTruthy(); // 判断有没有对应的class
  });
});
