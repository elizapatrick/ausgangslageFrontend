import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Notes from "./Notes";
import "./AppointmentDetailModal.css";

export default function AppointmentDetailModal({ show, onClose, appointment, onEdit, onDelete }) {
  const [showNotes, setShowNotes] = useState(false);

  if (!appointment) return null;

  const handleSaveNotes = (noteText) => {
    const updated = { ...appointment, notes: noteText };
    onEdit(updated);
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered className="appointment-detail-modal">
        <Modal.Body className="appointment-detail-body">
          <div className="detail-header">
            <h2 className="detail-date">
              {new Date(appointment.fromDate + 'T00:00:00').toLocaleDateString("de-DE")}
            </h2>
            <Button variant="light" size="sm" onClick={onClose} className="detail-close-btn">
              ✕
            </Button>
          </div>

          <div className="detail-content">
            <h3 className="detail-title">{appointment.name}</h3>

            <div className="detail-section">
              <p className="detail-label">Beschreibung:</p>
              <p className="detail-value">{appointment.description}</p>
            </div>

            <div className="detail-section">
              <p className="detail-label">Zeit: {appointment.fromTime}</p>
              <p className="detail-label">Genre: {appointment.genre}</p>
            </div>

            {appointment.notes && (
              <div className="detail-section">
                <p className="detail-label">Notizen:</p>
                <p className="detail-value">{appointment.notes}</p>
              </div>
            )}

            <div className="detail-actions">
              <Button
                variant="info"
                className="detail-btn-notes"
                onClick={() => setShowNotes(true)}
              >
                Notizen
              </Button>
              <Button
                variant="danger"
                className="detail-btn-delete"
                onClick={onDelete}
              >
                Bearb.
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {showNotes && (
        <Notes
          show={showNotes}
          onClose={() => setShowNotes(false)}
          appointmentName={appointment.name}
          initialNotes={appointment.notes || ""}
          onSave={handleSaveNotes}
        />
      )}
    </>
  );
}
