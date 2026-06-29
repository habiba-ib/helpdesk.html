import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function Notifications() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const notifications = [
    {
      id: 1,
      title: "Ticket #1001 has been updated",
      message: "Support team added a new response to your ticket.",
      time: "Today",
      type: "update",
    },
    {
      id: 2,
      title: "Ticket #1004 has been resolved",
      message: "Your ticket was marked as resolved.",
      time: "Yesterday",
      type: "success",
    },
    {
      id: 3,
      title: "New ticket created successfully",
      message: "Ticket #1008 is now open and waiting for support.",
      time: "Jun 24",
      type: "new",
    },
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));

    if (!stored) {
      navigate("/");
      return;
    }

    setUser(stored);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="db-layout">
      <Sidebar
        user={user}
        onLogout={handleLogout}
        stats={{ total: 0, open: 0, inProgress: 0, resolved: 0 }}
        activeFilter=""
        onFilterChange={() => navigate("/dashboard")}
      />

      <main className="db-main">
        <div className="db-topbar">
          <div>
            <h1 className="db-title">Notifications</h1>
            <span className="db-date">Latest ticket updates and alerts</span>
          </div>

          <button className="btn-new" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>

        <div className="notifications-card">
          {notifications.map((notification) => (
            <div className={`notification-item ${notification.type}`} key={notification.id}>
              <div className="notification-icon">
                {notification.type === "success" ? "OK" : "!"}
              </div>

              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
              </div>

              <span className="notification-time">{notification.time}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Notifications;