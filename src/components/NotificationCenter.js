import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications for the user
    axios.get('/api/user/notifications')
      .then(response => setNotifications(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="notification-center">
      <h1>Notifications</h1>
      <div className="notification-list">
        {notifications.map(notification => (
          <div className="notification" key={notification.id}>
            <p>{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;
