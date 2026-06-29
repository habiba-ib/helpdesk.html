import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { INITIAL_TICKETS } from "./ticketData";
import "./Dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));

    if (!stored) {
      navigate("/");
      return;
    }

    setUser(stored);

    const savedTickets = JSON.parse(localStorage.getItem("tickets"));
    setTickets(savedTickets || INITIAL_TICKETS);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const updateTicket = (ticketId, field, value) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId ? { ...ticket, [field]: value } : ticket
    );

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));

    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        [field]: value,
      });
    }
  };

  const closeTicket = (ticketId) => {
    updateTicket(ticketId, "status", "Resolved");
  };

  const sendReply = () => {
    if (!reply.trim()) {
      alert("Please write a reply first");
      return;
    }

    alert(`Reply sent to ${selectedTicket.id}: ${reply}`);
    setReply("");
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "Open").length,
    inProgress: tickets.filter((ticket) => ticket.status === "In Progress").length,
    resolved: tickets.filter((ticket) => ticket.status === "Resolved").length,
  };

  if (!user) return null;

  return (
    <div className="db-layout">
      <Sidebar
        user={user}
        onLogout={handleLogout}
        stats={stats}
        activeFilter=""
        onFilterChange={() => navigate("/dashboard")}
      />

      <main className="db-main">
        <div className="db-topbar">
          <div>
            <h1 className="db-title">Admin Dashboard</h1>
            <span className="db-date">Manage all support tickets</span>
          </div>

          <button className="btn-new" onClick={() => navigate("/dashboard")}>
            User Dashboard
          </button>
        </div>

        <div className="admin-grid">
          <div className="admin-table-card">
            <div className="section-head">
              <div>
                <h2>All Tickets</h2>
                <p>Change status, priority, and manage requests</p>
              </div>
            </div>

            <div className="ticket-table-wrap">
              <table className="t-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Subject</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Assigned</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="t-id">{ticket.id}</td>
                      <td className="t-subject">{ticket.subject}</td>

                      <td>
                        <select
                          className="admin-select"
                          value={ticket.priority}
                          onChange={(e) => updateTicket(ticket.id, "priority", e.target.value)}
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </td>

                      <td>
                        <select
                          className="admin-select"
                          value={ticket.status}
                          onChange={(e) => updateTicket(ticket.id, "status", e.target.value)}
                        >
                         <option>Open</option>
                         <option>In Progress</option>
                         <option>Pending</option>
                         <option>Resolved</option>
                        </select>
                      </td>

                      <td>{ticket.assign || "Support"}</td>

                      <td>
                        <div className="actions">
                          <button
                            className="action-btn view-btn"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            Manage
                          </button>

                          <button
                            className="action-btn delete-btn"
                            onClick={() => closeTicket(ticket.id)}
                          >
                            Close
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-panel">
            {selectedTicket ? (
              <>
                <h2>{selectedTicket.id}</h2>
                <h3>{selectedTicket.subject}</h3>

                <p>
                  <b>Status:</b> {selectedTicket.status}
                </p>

                <p>
                  <b>Priority:</b> {selectedTicket.priority}
                </p>

                <p>
                  <b>Description:</b>{" "}
                  {selectedTicket.description || "No description added."}
                </p>

                <div className="form-field">
                  <label>Reply to customer</label>
                  <textarea
                    rows="5"
                    placeholder="Write your response..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                </div>

                <button className="btn-submit" onClick={sendReply}>
                  Send Reply
                </button>
              </>
            ) : (
              <div className="empty-state">
                Select a ticket to manage it
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;