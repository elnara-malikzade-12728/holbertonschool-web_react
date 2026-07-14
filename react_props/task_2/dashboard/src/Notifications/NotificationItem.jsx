function NotificationItem({ type, html, value }) {
  const itemStyle = {
    color: type === 'urgent' ? 'red' : 'blue',
  };

  if (html) {
    return (
      <li
        data-notification-type={type}
        style={itemStyle}
        dangerouslySetInnerHTML={html}
      />
    );
  }

  return (
    <li
      data-notification-type={type}
      style={itemStyle}
    >
      {value}
    </li>
  );
}

export default NotificationItem;
