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
    const { type, html, value } = this.props;

    const colorClass = type === 'urgent'
      ? 'text-urgent-notification-item'
      : 'text-default-notification-item';

    const itemClass = `
      ${colorClass}
      block
      border-b
      border-gray-500
      p-3
      text-[15px]
      leading-6
      min-[520px]:text-[14px]
      min-[912px]:list-item
      min-[912px]:border-0
      min-[912px]:p-0
      min-[912px]:text-[9px]
      min-[912px]:leading-normal
    `;

    if (html) {
      return (
        <li
          data-notification-type={type}
          className={itemClass}
          onClick={this.handleClick}
          dangerouslySetInnerHTML={html}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        className={itemClass}
        onClick={this.handleClick}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
