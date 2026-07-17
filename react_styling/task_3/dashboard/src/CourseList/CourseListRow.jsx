function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
}) {
  if (isHeader && textSecondCell === null) {
    return (
      <tr className="bg-table-header/66">
        <th className="border border-gray-400" colSpan="2">
          {textFirstCell}
        </th>
      </tr>
    );
  }

  if (isHeader) {
    return (
      <tr className="bg-table-header/66">
        <th className="border border-gray-400 text-black">
          {textFirstCell}
        </th>
        <th className="border border-gray-400 text-black">
          {textSecondCell}
        </th>
      </tr>
    );
  }

  return (
    <tr className="bg-table-rows/45">
      <td className="border border-gray-400 pl-2">
        {textFirstCell}
      </td>
      <td className="border border-gray-400 pl-2">
        {textSecondCell}
      </td>
    </tr>
  );
}

export default CourseListRow;
