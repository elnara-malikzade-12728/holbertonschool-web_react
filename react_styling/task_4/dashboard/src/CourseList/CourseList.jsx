import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

function CourseList({ courses = [] }) {
  return (
    <div
      className="mx-auto my-32 w-4/5 overflow-x-auto min-[912px]:my-32"
    >
      <table
        id="CourseList"
        className="w-full border-collapse text-base leading-6 text-black min-[912px]:text-base min-[912px]:leading-6"
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
