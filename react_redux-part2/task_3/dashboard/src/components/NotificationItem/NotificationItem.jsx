function NotificationItem({
  id,
  type,
  value,
  markAsRead,
}) {
  const color =
    type === 'urgent'
      ? 'red'
      : 'blue';

  const handleClick = () => {
    markAsRead(id);
  };

  return (
    <li
      data-notification-type={type}
      onClick={handleClick}
      style={{
        color,
        cursor: 'pointer',
      }}
    >
      {value}
    </li>
  );
}

export default NotificationItem;
