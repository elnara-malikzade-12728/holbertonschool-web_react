function CourseListRow({
  id = '',
  isHeader = false,
  isSelected = false,
  textFirstCell = '',
  textSecondCell = null,
  onChangeRow,
  changeRow,
}) {
  const cellClass = `
    border
    border-gray-400
    px-2
    py-2
    min-[912px]:py-0
  `;

  if (
    isHeader
    && textSecondCell === null
  ) {
    return (
      <tr className="bg-table-header opacity-66">
        <th
          className={`${cellClass} text-black`}
          colSpan="3"
        >
          {textFirstCell}
        </th>
      </tr>
    );
  }

  if (isHeader) {
    return (
      <tr className="bg-table-header opacity-66">
        <th
          className={`${cellClass} w-10 text-black`}
          aria-label="Select course"
        />

        <th
          className={`${cellClass} text-black`}
        >
          {textFirstCell}
        </th>

        <th
          className={`${cellClass} text-black`}
        >
          {textSecondCell}
        </th>
      </tr>
    );
  }

  const handleCheckboxChange = (event) => {
    const handler =
      onChangeRow ?? changeRow;

    if (handler) {
      handler(
        id,
        event.target.checked,
      );
    }
  };

  return (
    <tr className="bg-table-rows opacity-45">
      <td
        className={`${cellClass} text-center`}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={
            handleCheckboxChange
          }
          aria-label={`Select ${textFirstCell}`}
        />
      </td>

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
