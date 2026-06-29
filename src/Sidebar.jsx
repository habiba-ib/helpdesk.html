function Sidebar({ user, onLogout, stats, activeFilter, onFilterChange }) {
  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const navItems = [
    { label: "Dashboard", icon: "DB", filter: "all" },
    { label: "All Tickets", icon: "AT", filter: "all", badge: stats.total },
    { label: "Open", icon: "OP", filter: "Open", badge: stats.open, badgeClass: "accent" },
    { label: "In Progress", icon: "IP", filter: "In Progress", badge: stats.inProgress, badgeClass: "warning" },
    { label: "Resolved", icon: "RS", filter: "Resolved", badge: stats.resolved, badgeClass: "success" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-mark">HD</span>
        <div>
          <strong>HelpDesk</strong>
          <small>IT Support</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item ${activeFilter === item.filter ? "active" : ""}`}
            onClick={() => onFilterChange(item.filter)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span className={`nav-badge ${item.badgeClass || ""}`}>{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <span className="user-name">{user?.fullName || "User"}</span>
            <span className="user-email">{user?.email || ""}</span>
          </div>
        </div>
<button className="logout-btn" onClick={() => window.location.href = "/admin"}>
  Admin Dashboard
</button>

<button className="logout-btn" onClick={() => window.location.href = "/profile"}>
  Profile
</button>

<button className="logout-btn" onClick={() => window.location.href = "/notifications"}>
  Notifications
</button>


        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;