import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

function CourseList({ courses = [] }) {
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
                textFirstCell={course.name}
                textSecondCell={course.credit}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
