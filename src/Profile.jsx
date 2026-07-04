import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
const stored = JSON.parse(localStorage.getItem("currentUser"));
    if (!stored) {
      navigate("/");
      return;
    }

    setUser(stored);
    setFormData({
      fullName: stored.fullName || "",
      email: stored.email || "",
      phone: stored.phone || "",
      password: stored.password || "",
      newPassword: "",
    });
  }, [navigate]);

  const handleLogout = () => {
localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.newPassword || formData.password,
    };

localStorage.setItem("user", JSON.stringify(updatedUser));
localStorage.setItem("currentUser", JSON.stringify(updatedUser));    setUser(updatedUser);
    setFormData({
      ...formData,
      password: updatedUser.password,
      newPassword: "",
    });

    alert("Profile updated successfully");
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
            <h1 className="db-title">Profile</h1>
            <span className="db-date">Manage your account information</span>
          </div>

          <button className="btn-new" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.fullName ? user.fullName[0].toUpperCase() : "U"}
            </div>

            <div>
              <h2>{user.fullName}</h2>
              <p>{user.email}</p>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleSave}>
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Change Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>

            <div className="profile-actions">
              <button type="button" className="btn-cancel" onClick={() => navigate("/dashboard")}>
                Cancel
              </button>

              <button type="submit" className="btn-submit">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;