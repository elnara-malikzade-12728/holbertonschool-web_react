import { memo } from 'react';

function NotificationItem({
  id = 0,
  type = 'default',
  value = '',
  markAsRead = () => {},
}) {
  const handleClick = () => {
    markAsRead(id);
  };

  return (
    <li
      data-notification-type={type}
      style={{
        color:
          type === 'urgent'
            ? 'red'
            : 'blue',
      }}
      className="
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
      "
      onClick={handleClick}
      onKeyDown={(event) => {
        if (
          event.key === 'Enter'
          || event.key === ' '
        ) {
          event.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {value}
    </li>
  );
}

export default memo(NotificationItem);
