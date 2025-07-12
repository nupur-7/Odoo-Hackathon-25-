import React, { useEffect, useState } from "react";
import "./Notifications.css";

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/notifications/${userId}`);
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  const markAsRead = async (id) => {
    await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
      method: "PATCH",
    });
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="notif-wrapper">
      <div className="bell-icon" onClick={() => setShowDropdown(!showDropdown)}>
        🔔
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>

      {showDropdown && (
        <div className="notif-dropdown">
          <h4>Notifications</h4>
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            <ul>
              {notifications.map((n) => (
                <li
                  key={n._id}
                  className={n.isRead ? "read" : "unread"}
                  onClick={() => markAsRead(n._id)}
                >
                  {n.message}
                  <span className="timestamp">
                    {new Date(n.createdAt).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
