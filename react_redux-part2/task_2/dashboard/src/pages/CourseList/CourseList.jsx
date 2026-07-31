import {
  useCallback,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import CourseListRow from
  './CourseListRow/CourseListRow.jsx';
import WithLogging from
  '../../components/HOC/WithLogging.jsx';

import {
  selectCourse,
  unSelectCourse,
} from '../../features/courses/courseSlice.js';

function CourseList() {
  const dispatch = useDispatch();

  const courses = useSelector(
    (state) => state.courses.courses,
  );

  const onChangeRow = useCallback(
    (id, checked) => {
      if (checked) {
        dispatch(selectCourse(id));
      } else {
        dispatch(unSelectCourse(id));
      }
    },
    [dispatch],
  );

  return (
    <div
      className="
        my-20
        flex
        justify-center
        min-[912px]:my-10
      "
    >
      <table
        id="CourseList"
        className="
          w-[75%]
          border-collapse
          text-[12px]
          text-black
          min-[520px]:w-[70%]
          min-[520px]:text-xs
          min-[912px]:w-[60%]
          min-[912px]:text-[8px]
        "
      >
        <thead>
          {courses.length === 0 ? (
            <CourseListRow
              isHeader
              textFirstCell="No course available yet"
            />
          ) : (
            <>
              <CourseListRow
                isHeader
                textFirstCell="Available courses"
              />

              <CourseListRow
                isHeader
                textFirstCell="Course name"
                textSecondCell="Credit"
              />
            </>
          )}
        </thead>

        {courses.length > 0 && (
          <tbody>
            {courses.map((course) => (
              <CourseListRow
                key={course.id}
                id={String(course.id)}
                isSelected={
                  course.isSelected
                }
                textFirstCell={
                  course.name
                }
                textSecondCell={
                  course.credit
                }
                changeRow={
                  onChangeRow
                }
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export { CourseList };
export default WithLogging(CourseList);
