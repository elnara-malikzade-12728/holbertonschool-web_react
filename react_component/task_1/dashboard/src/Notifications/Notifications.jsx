import './Notifications.css';
import closeButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

function Notifications({
  notifications = [],
  displayDrawer = false,
}) {
  const handleClick = () => {
    console.log('Close button has been clicked');
  };

  return (
    <>
      <div className="notification-title">
        Your notifications
      </div>

      {displayDrawer && (
        <div className="notification-items">
          {notifications.length > 0 ? (
            <>
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
            </>
          ) : (
            <p>No new notification for now</p>
          )}
        </div>
      )}
    </>
  );
}

export default Notifications;
