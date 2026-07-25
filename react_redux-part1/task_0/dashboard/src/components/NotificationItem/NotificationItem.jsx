import { memo } from 'react';

function NotificationItem({
  id = 0,
  type = 'default',
  html = null,
  value = '',
  markAsRead = () => {},
}) {
  const handleClick = () => {
    markAsRead(id);
  };

  const colorClass =
    type === 'urgent'
      ? 'text-urgent-notification-item'
      : 'text-default-notification-item';

  const itemClass = `
    ${colorClass}
    block
    cursor-pointer
    border-b
    border-gray-600
    p-3
    text-[15px]
    leading-6
    min-[520px]:text-base
    min-[912px]:list-item
    min-[912px]:border-0
    min-[912px]:p-0
    min-[912px]:text-[8px]
    min-[912px]:leading-normal
  `;

  if (html) {
    return (
      <li
        data-notification-type={type}
        className={itemClass}
        onClick={handleClick}
        dangerouslySetInnerHTML={html}
      />
    );
  }

  return (
    <li
      data-notification-type={type}
      className={itemClass}
      onClick={handleClick}
    >
      {value}
    </li>
  );
}

export default memo(NotificationItem);
