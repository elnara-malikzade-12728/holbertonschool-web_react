import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {
  test(
    'renders one header cell spanning three columns',
    () => {
      render(
        <table>
          <tbody>
            <CourseListRow
              isHeader
              textFirstCell="Available courses"
            />
          </tbody>
        </table>,
      );

      const header =
        screen.getByRole(
          'columnheader',
        );

      expect(header).toHaveAttribute(
        'colspan',
        '3',
      );
    },
  );

  test(
    'renders three header cells',
    () => {
      render(
        <table>
          <tbody>
            <CourseListRow
              isHeader
              textFirstCell="Course name"
              textSecondCell="Credit"
            />
          </tbody>
        </table>,
      );

      expect(
        screen.getAllByRole(
          'columnheader',
        ),
      ).toHaveLength(3);

      expect(
        screen.getByText(
          'Course name',
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByText('Credit'),
      ).toBeInTheDocument();
    },
  );

  test(
    'renders three regular cells',
    () => {
      render(
        <table>
          <tbody>
            <CourseListRow
              id="1"
              textFirstCell="ES6"
              textSecondCell="60"
              isSelected={false}
              onChangeRow={() => {}}
            />
          </tbody>
        </table>,
      );

      expect(
        screen.getAllByRole('cell'),
      ).toHaveLength(3);

      expect(
        screen.getByText('ES6'),
      ).toBeInTheDocument();

      expect(
        screen.getByText('60'),
      ).toBeInTheDocument();

      expect(
        screen.getByRole(
          'checkbox',
        ),
      ).not.toBeChecked();
    },
  );

  test(
    'renders a checked checkbox when selected',
    () => {
      render(
        <table>
          <tbody>
            <CourseListRow
              id="1"
              textFirstCell="ES6"
              textSecondCell="60"
              isSelected
              onChangeRow={() => {}}
            />
          </tbody>
        </table>,
      );

      expect(
        screen.getByRole(
          'checkbox',
        ),
      ).toBeChecked();
    },
  );

  test(
    'calls onChangeRow when checkbox changes',
    () => {
      const onChangeRow = jest.fn();

      render(
        <table>
          <tbody>
            <CourseListRow
              id="1"
              textFirstCell="ES6"
              textSecondCell="60"
              isSelected={false}
              onChangeRow={onChangeRow}
            />
          </tbody>
        </table>,
      );

      fireEvent.click(
        screen.getByRole(
          'checkbox',
        ),
      );

      expect(
        onChangeRow,
      ).toHaveBeenCalledWith(
        '1',
        true,
      );
    },
  );
});
