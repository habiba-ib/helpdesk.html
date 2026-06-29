import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import StatsCards from "./StatsCards";
import TicketTable from "./TicketTable";
import NewTicketModal from "./NewTicketModal";
import "./Dashboard.css";

const INITIAL_TICKETS = [
  { id: "#1001", subject: "Login page not loading", priority: "High", status: "Open", assign: "Ahmed", date: "Jun 20" },
  { id: "#1002", subject: "Password reset email not sending", priority: "High", status: "In Progress", assign: "Sara", date: "Jun 21" },
  { id: "#1003", subject: "Dashboard stats wrong", priority: "Medium", status: "In Progress", assign: "Mohamed", date: "Jun 22" },
  { id: "#1004", subject: "Upload button not working", priority: "Low", status: "Resolved", assign: "Habiba", date: "Jun 22" },
  { id: "#1005", subject: "User cannot update profile", priority: "Medium", status: "Open", assign: "Ahmed", date: "Jun 23" },
  { id: "#1006", subject: "Email notifications delayed", priority: "Low", status: "In Progress", assign: "Sara", date: "Jun 23" },
  { id: "#1007", subject: "Search results empty", priority: "Medium", status: "Open", assign: "Mohamed", date: "Jun 24" },
  { id: "#1008", subject: "Mobile layout broken", priority: "High", status: "In Progress", assign: "Habiba", date: "Jun 24" },
];

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const [tickets, setTickets] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("tickets"));
    return saved || INITIAL_TICKETS;
  });

  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  // 👁️ View + ✏️ Edit states
  const [viewTicket, setViewTicket] = useState(null);
  const [editTicket, setEditTicket] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!stored) navigate("/");
    else setUser(stored);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ➕ Add Ticket
  const handleAddTicket = (newTicket) => {
    const id = "#" + (1000 + tickets.length + 1);
    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    

    const ticket = {
      id,
      ...newTicket,
      status: "Open",
      date: today,
    };

    const updated = [ticket, ...tickets];
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
    setShowModal(false);
  };

  // 🗑️ DELETE
  const handleDelete = (id) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
  };

  // 👁️ VIEW
  const handleView = (ticket) => {
    setViewTicket(ticket);
  };

  // ✏️ EDIT
  const handleEdit = (ticket) => {
    setEditTicket(ticket);
  };

  // 💾 SAVE EDIT
  const handleSaveEdit = () => {
    const updated = tickets.map((t) =>
      t.id === editTicket.id ? editTicket : t
    );

    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
    setEditTicket(null);
  };

  const filtered = tickets.filter((ticket) => {
  const matchesFilter = filter === "all" || ticket.status === filter;

  const searchText = search.toLowerCase();

  const matchesSearch =
    ticket.subject.toLowerCase().includes(searchText) ||
    ticket.id.toLowerCase().includes(searchText) ||
    ticket.assign.toLowerCase().includes(searchText);

  return matchesFilter && matchesSearch;
});

 const stats = {
  total: tickets.length,
  open: tickets.filter((t) => t.status === "Open").length,
  inProgress: tickets.filter((t) => t.status === "In Progress").length,
  pending: tickets.filter((t) => t.status === "Pending").length,
  resolved: tickets.filter((t) => t.status === "Resolved").length,
};

  if (!user) return null;

  return (
    <div className="db-layout">
      <Sidebar
        user={user}
        onLogout={handleLogout}
        stats={stats}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <main className="db-main">
        <div className="db-topbar">
          <div>
            <h1 className="db-title">
              {filter === "all" ? "Dashboard" : filter + " Tickets"}
            </h1>
          </div>

          <button className="btn-new" onClick={() => setShowModal(true)}>
            + New Ticket
          </button>
           </div>

          <div className="search-box">
  <input
    type="text"
    placeholder="Search by subject, ID, or assigned name..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
       

        <StatsCards stats={stats} />

        {/* 👇 مهم: بنبعت الأكشنز للـ Table */}
        <TicketTable
          tickets={filtered}
          filter={filter}
          onFilterChange={setFilter}
          onDelete={handleDelete}
          onView={handleView}
          onEdit={handleEdit}
        />
      </main>

      {/* ➕ New Ticket */}
      {showModal && (
        <NewTicketModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddTicket}
        />
      )}

      {/* 👁️ VIEW MODAL */}
      {viewTicket && (
        <div className="modal">
          <h2>{viewTicket.subject}</h2>
          <p><b>Priority:</b> {viewTicket.priority}</p>
          <p><b>Status:</b> {viewTicket.status}</p>
          <p><b>Assigned:</b> {viewTicket.assign}</p>
          <p><b>Date:</b> {viewTicket.date}</p>

          <button onClick={() => setViewTicket(null)}>Close</button>
        </div>
      )}

      {/* ✏️ EDIT MODAL */}
 {viewTicket && (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setViewTicket(null)}>
    <div className="modal">
      <div className="modal-header">
        <h2>Ticket Details</h2>
        <button className="modal-close" onClick={() => setViewTicket(null)}>X</button>
      </div>

      <div className="ticket-details">
        <h3>{viewTicket.subject}</h3>
        <p><b>Priority:</b> {viewTicket.priority}</p>
        <p><b>Status:</b> {viewTicket.status}</p>
        <p><b>Assigned:</b> {viewTicket.assign}</p>
        <p><b>Date:</b> {viewTicket.date}</p>
        <p><b>Description:</b> {viewTicket.description || "No description added."}</p>
      </div>

      <div className="modal-actions">
        <button className="btn-cancel" onClick={() => setViewTicket(null)}>Close</button>
      </div>
    </div>
  </div>
)}

{editTicket && (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setEditTicket(null)}>
    <div className="modal">
      <div className="modal-header">
        <h2>Edit Ticket</h2>
        <button className="modal-close" onClick={() => setEditTicket(null)}>X</button>
      </div>

      <div className="form-field">
        <label>Subject</label>
        <input
          value={editTicket.subject}
          onChange={(e) => setEditTicket({ ...editTicket, subject: e.target.value })}
        />
      </div>

      <div className="form-row-2">
        <div className="form-field">
          <label>Priority</label>
          <select
            value={editTicket.priority}
            onChange={(e) => setEditTicket({ ...editTicket, priority: e.target.value })}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="form-field">
          <label>Status</label>
          <select
            value={editTicket.status}
            onChange={(e) => setEditTicket({ ...editTicket, status: e.target.value })}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      <div className="modal-actions">
        <button className="btn-cancel" onClick={() => setEditTicket(null)}>Cancel</button>
        <button className="btn-submit" onClick={handleSaveEdit}>Save Changes</button>
      </div>
    </div>
  </div>
)}
      
    </div>
  );
}

export default Dashboard;