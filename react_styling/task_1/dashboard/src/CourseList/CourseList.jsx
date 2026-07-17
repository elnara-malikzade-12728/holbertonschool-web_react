import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

function CourseList({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <div className="w-[80%] mx-auto my-8 overflow-x-auto">
        <table id="CourseList" className="w-full">
          <thead>
            <CourseListRow
              isHeader
              textFirstCell="No course available yet"
            />
          </thead>
        </table>
      </div>
    );
  }

  return (
    <div className="w-[80%] mx-auto my-8 overflow-x-auto">
      <table id="CourseList" className="w-full">
        <thead>
          <CourseListRow
            isHeader
            textFirstCell="Available courses"
          />

          <CourseListRow
            isHeader
            textFirstCell="Course name"
            textSecondCell="Credit"
          />
        </thead>

        <tbody>
          {courses.map((course) => (
            <CourseListRow
              key={course.id}
              textFirstCell={course.name}
              textSecondCell={course.credit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
