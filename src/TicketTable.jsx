const FILTERS = ["all", "Open", "In Progress", "Pending", "Resolved"];
const AVATAR_COLORS = ["avatar-blue", "avatar-green", "avatar-orange", "avatar-red"];

function priorityClass(p) {
  return p === "High" ? "priority-high" : p === "Medium" ? "priority-med" : "priority-low";
}

function statusClass(s) {
  return s === "Open" ? "status-open" : s === "In Progress" ? "status-prog" : "status-done";
}

function TicketTable({ tickets, filter, onFilterChange, onDelete, onEdit, onView }) {
  return (
    <section className="ticket-section">
      <div className="section-head">
        <div>
          <h2>Recent Tickets</h2>
          <p>Manage and track support requests</p>
        </div>

        <div className="table-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => onFilterChange(f)}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="ticket-table-wrap">
        {tickets.length === 0 ? (
          <div className="empty-state">No tickets found</div>
        ) : (
          <table className="t-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((t, i) => (
                <tr key={t.id}>
                  <td className="t-id">{t.id}</td>
                  <td className="t-subject">{t.subject}</td>
                  <td><span className={`priority ${priorityClass(t.priority)}`}>{t.priority}</span></td>
                  <td><span className={`status ${statusClass(t.status)}`}>{t.status}</span></td>
                  <td>
                    <div className="assign-cell">
                      <div className={`avatar ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                        {(t.assign || "S")[0]}
                      </div>
                      {t.assign || "Support"}
                    </div>
                  </td>
                  <td className="t-date">{t.date}</td>
                  <td>
                    <div className="actions">
                      <button className="action-btn view-btn" onClick={() => onView(t)}>View</button>
                      <button className="action-btn edit-btn" onClick={() => onEdit(t)}>Edit</button>
                      <button className="action-btn delete-btn" onClick={() => onDelete(t.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default TicketTable;