import React, { useEffect, useState } from "react";

interface Notification {
  id: string;
  message: string;
  url: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Replace with your WebSocket server URL
    const ws = new WebSocket("ws://localhost:4000");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as Notification;
        // Expecting { id, message, url }
        setNotifications((prev) => [data, ...prev]);
      } catch (e) {
        // Handle parse error
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="notifications">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="notification"
          data-testid="notification"
        >
          <a
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {n.message}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
