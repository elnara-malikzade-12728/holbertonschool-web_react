function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
}) {
  if (isHeader && textSecondCell === null) {
    return (
      <tr>
        <th colSpan="2">{textFirstCell}</th>
      </tr>
    );
  }

  if (isHeader) {
    return (
      <tr>
        <th>{textFirstCell}</th>
        <th>{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr>
      <td>{textFirstCell}</td>
      <td>{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
