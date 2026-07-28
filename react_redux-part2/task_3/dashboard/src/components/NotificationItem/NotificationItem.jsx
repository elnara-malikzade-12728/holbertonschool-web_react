function NotificationItem({
  id = '',
  type = 'default',
  value = '',
  markAsRead = () => {},
}) {
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
      onClick={() => {
        markAsRead(id);
      }}
      onKeyDown={(event) => {
        if (
          event.key === 'Enter'
          || event.key === ' '
        ) {
          event.preventDefault();
          markAsRead(id);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {value}
    </li>
  );
}

export default NotificationItem;
