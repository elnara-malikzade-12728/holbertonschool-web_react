import { PureComponent } from 'react';

class NotificationItem extends PureComponent {
  static defaultProps = {
    id: 0,
    type: 'default',
    html: null,
    value: '',
    markAsRead: () => {},
  };

  handleClick = () => {
    const { id, markAsRead } = this.props;
    markAsRead(id);
  };

  render() {
    const {
      type,
      html,
      value,
    } = this.props;

    const itemStyle = {
      color: type === 'urgent' ? 'red' : 'blue',
    };

    if (html) {
      return (
        <li
          data-notification-type={type}
          style={itemStyle}
          onClick={this.handleClick}
          dangerouslySetInnerHTML={html}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        style={itemStyle}
        onClick={this.handleClick}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
