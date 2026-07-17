import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection component', () => {
  test('renders a heading with the title prop', () => {
    render(
      <BodySection title="Test title">
        <p>Test child</p>
      </BodySection>
    );

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /test title/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('renders all children passed to it', () => {
    render(
      <BodySection title="Test section">
        <p>First child</p>
        <p>Second child</p>
        <button type="button">Third child</button>
      </BodySection>
    );

    expect(screen.getByText(/first child/i)).toBeInTheDocument();
    expect(screen.getByText(/second child/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /third child/i })
    ).toBeInTheDocument();
  });
});
