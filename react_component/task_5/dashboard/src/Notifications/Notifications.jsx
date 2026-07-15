import { Component } from 'react';
import './Notifications.css';
import closeButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  static defaultProps = {
    notifications: [],
    displayDrawer: false,
  };

  handleClick = () => {
    console.log('Close button has been clicked');
  };

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  render() {
    const { notifications, displayDrawer } = this.props;

    return (
      <>
        <div className="notification-title">
          Your notifications
        </div>

        {displayDrawer && (
          <div className="notification-items">
            {notifications.length > 0 && (
              <button
                type="button"
                aria-label="Close"
                onClick={this.handleClick}
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
            )}

            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>

                <ul>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

export default Notifications;
