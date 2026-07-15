import './CourseList.css';
import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

function CourseList({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <table id="CourseList">
        <thead>
          <CourseListRow
            isHeader
            textFirstCell="No course available yet"
          />
        </thead>
      </table>
    );
  }

  return (
    <table id="CourseList">
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
  );
}

export default WithLogging(CourseList);
