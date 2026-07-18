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
      border-b
      border-gray-400
      p-3
      text-sm
      leading-6
      last:border-b-0
      min-[520px]:text-base
      min-[912px]:border-0
      min-[912px]:p-0
      min-[912px]:text-[8px]
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
