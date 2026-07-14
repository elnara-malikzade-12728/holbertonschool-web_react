import './Notifications.css';
import closeButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

function Notifications({ notifications = [] }) {
  const handleClick = () => {
    console.log('Close button has been clicked');
  };

  return (
    <div className="notification-items">
      <button
        type="button"
        aria-label="Close"
        onClick={handleClick}
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <img
          src={closeButton}
          alt="Close"
          width="10"
          height="10"
        />
      </button>

      <p>Here is the list of notifications</p>

      <ul>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            value={notification.value}
            html={notification.html}
          />
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
