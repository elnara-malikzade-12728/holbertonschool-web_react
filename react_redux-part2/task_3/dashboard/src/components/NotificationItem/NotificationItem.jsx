function NotificationItem({
  id,
  type,
  value,
  markAsRead,
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
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {value}
    </li>
  );
}

export default NotificationItem;
