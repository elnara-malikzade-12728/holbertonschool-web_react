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

    const colorClass = type === 'urgent'
      ? 'text-urgent-notification-item'
      : 'text-default-notification-item';

    const itemClasses = `
      ${colorClass}
      border-b
      border-gray-300
      px-3
      py-3
      text-sm
      min-[520px]:text-base
      min-[912px]:border-0
      min-[912px]:px-0
      min-[912px]:py-0
      min-[912px]:text-[4px]
    `;

    if (html) {
      return (
        <li
          data-notification-type={type}
          className={itemClasses}
          onClick={this.handleClick}
          dangerouslySetInnerHTML={html}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        className={itemClasses}
        onClick={this.handleClick}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
