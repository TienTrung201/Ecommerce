import { notificationsSelector } from '@/redux/selector';
import { message } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Notification() {
  const [messageApi, contextHolder] = message.useMessage();
  const notifications = useSelector(notificationsSelector);

  useEffect(() => {
    const loading = (content) => {
      messageApi.open({
        type: 'loading',
        content: content,
        duration: 1000,
        className: 'antd-status-mesage',
      });
    };

    const success = (content) => {
      messageApi.open({
        type: 'success',
        content: content,
        duration: 2.5,
        className: 'antd-status-mesage',
      });
    };

    const error = (content) => {
      messageApi.open({
        type: 'error',
        content: content,
        duration: 2.5,
        className: 'antd-status-mesage',
      });
    };

    if (notifications.type === 'loading') {
      loading(notifications.message);
    } else if (notifications.type === 'success') {
      messageApi.destroy();
      success(notifications.message);
    } else if (notifications.type === 'error') {
      messageApi.destroy();
      error(notifications.message);
    }
  }, [notifications, messageApi]);

  return <>{contextHolder}</>;
}

export default Notification;
