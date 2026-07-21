import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {
  test('renders one column header with colspan 2', () => {
    render(
      <table>
        <tbody>
          <CourseListRow
            isHeader
            textFirstCell="Available courses"
          />
        </tbody>
      </table>
    );

    const header = screen.getByRole('columnheader');

    expect(header).toHaveAttribute('colspan', '2');
  });

  test('renders two header cells', () => {
    render(
      <table>
        <tbody>
          <CourseListRow
            isHeader
            textFirstCell="Course name"
            textSecondCell="Credit"
          />
        </tbody>
      </table>
    );

    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
  });

  test('renders two td elements', () => {
    render(
      <table>
        <tbody>
          <CourseListRow
            textFirstCell="ES6"
            textSecondCell="60"
          />
        </tbody>
      </table>
    );

    expect(screen.getAllByRole('cell')).toHaveLength(2);
  });
});
