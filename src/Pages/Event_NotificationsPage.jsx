import React, { useEffect, useState } from "react";
import axios from "axios";

const EventNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications here, if needed
    // Example:
    axios.get("/api/notifications")
      .then((response) => {
        setNotifications(response.data); // Assume response.data contains the notifications array
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []); 

  return (
    <div className="container mt-5 basic-campian-section 2xl:px-12 lg:px-5">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="notification">
            {/* Render each notification here */}
            {notification.message}
          </div>
        ))
      ) : (
        <p>No notification to show yet</p>
      )}
    </div>
  );
};

export default EventNotificationsPage;
