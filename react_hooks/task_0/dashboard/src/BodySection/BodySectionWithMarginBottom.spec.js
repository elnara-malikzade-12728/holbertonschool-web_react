import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom component', () => {
  test('contains a div with the bodySectionWithMargin class', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="Test title">
        <p>Test child</p>
      </BodySectionWithMarginBottom>
    );

    const wrapper = container.querySelector('.bodySectionWithMargin');

    expect(wrapper).toBeInTheDocument();
  });

  test('renders the BodySection component', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="Test title">
        <p>Test child</p>
      </BodySectionWithMarginBottom>
    );

    const bodySection = container.querySelector('.bodySection');

    expect(bodySection).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /test title/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/test child/i)).toBeInTheDocument();
  });
});
