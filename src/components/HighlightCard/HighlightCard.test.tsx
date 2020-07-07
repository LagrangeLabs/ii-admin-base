import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import HighlightCard, { IIHighlightCardProps } from './HighlightCard';

const testSelfProps: IIHighlightCardProps = {
  cardTitle: '卡片标题',
  showHighLightIcon: true,
};

let wrapper: RenderResult;

describe("Test HighlightCard component on the self's props", () => {
  beforeEach(() => {
    wrapper = render(<HighlightCard {...testSelfProps} />);
  });

  it('should have the highlight class', () => {
    const highlightElement = wrapper.getByText('卡片标题');

    expect(highlightElement).toBeInTheDocument(); // 判断元素是否在HTML文档中
    expect(highlightElement).toHaveClass('ii-highlight-card-head'); // 判断有没有对应的class
    expect(highlightElement).toHaveClass('ii-highlight-icon'); // 判断有没有对应的class
  });
});
