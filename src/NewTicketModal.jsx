import { useState } from "react";

function NewTicketModal({ onClose, onSubmit }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assign, setAssign] = useState("Ahmed");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!subject.trim()) {
      setError("Please enter a subject.");
      return;
    }
    onSubmit({ subject, description, priority, assign });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>Create new ticket</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="form-field">
          <label>Subject</label>
          <input
            type="text"
            placeholder="Brief description of the issue"
            value={subject}
            onChange={(e) => { setSubject(e.target.value); setError(""); }}
            className={error ? "input-error" : ""}
          />
          {error && <span className="error-msg">{error}</span>}
        </div>

        <div className="form-field">
          <label>Description</label>
          <textarea
            placeholder="Describe the problem in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-row-2">
          <div className="form-field">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="form-field">
            <label>Assign to</label>
            <select value={assign} onChange={(e) => setAssign(e.target.value)}>
              <option>Ahmed</option>
              <option>Sara</option>
              <option>Mohamed</option>
              <option>Habiba</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleSubmit}>Create Ticket</button>
        </div>
      </div>
    </div>
  );
}

export default NewTicketModal;