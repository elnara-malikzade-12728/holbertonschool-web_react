function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
}) {
  const cellClass = `
    border
    border-gray-400
    px-2
    py-2
    min-[912px]:py-0
  `;

  if (isHeader && textSecondCell === null) {
    return (
      <tr className="bg-table-header opacity-66">
        <th className={cellClass} text-black colSpan="2">
          {textFirstCell}
        </th>
      </tr>
    );
  }

  if (isHeader) {
    return (
      <tr className="bg-table-header opacity-66">
        <th className={`${cellClass} text-black`}>
          {textFirstCell}
        </th>

        <th className={`${cellClass} text-black`}>
          {textSecondCell}
        </th>
      </tr>
    );
  }

  return (
    <tr className="bg-table-rows opacity45">
      <td className={`${cellClass} pl-2`}>
        {textFirstCell}
      </td>

      <td className={`${cellClass} pl-2`}>
        {textSecondCell}
      </td>
    </tr>
  );
}

export default CourseListRow;
