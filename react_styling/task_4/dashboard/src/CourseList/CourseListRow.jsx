function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
}) {
  const cellClass = `
    border
    border-gray-400
    px-2
    py-0
    min-[912px]:py-0
  `;

  if (isHeader && textSecondCell === null) {
    return (
      <tr className="bg-table-header/66 text-[12px]">
        <th className={cellClass} text-black colSpan="2">
          {textFirstCell}
        </th>
      </tr>
    );
  }

  if (isHeader) {
    return (
      <tr className="bg-table-header/66 text-[12px]">
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
    <tr className="bg-table-rows/45">
      <td className={`${cellClass} text-black pl-2`}>
        {textFirstCell}
      </td>

      <td className={`${cellClass}  text-black pl-2`}>
        {textSecondCell}
      </td>
    </tr>
  );
}

export default CourseListRow;
