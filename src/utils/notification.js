import { NotificationManager } from 'react-notifications';

const createNotification = (type, message, title, duration = 2000) => {
  switch (type) {
    case 'info':
      NotificationManager.info(message, title, duration);
      break;
    case 'success':
      NotificationManager.success(message, title, duration);
      break;
    case 'warning':
      NotificationManager.warning(message, title, duration);
      break;
    case 'error':
      NotificationManager.error(message, title, duration);
      break;
    default:
      NotificationManager.info('tada');
  }
};

export default createNotification;
