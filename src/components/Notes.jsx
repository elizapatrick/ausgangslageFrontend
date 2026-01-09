import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import "./Notes.css";

export default function Notes({ show, onClose, appointmentName, initialNotes, onSave }) {
  const [noteText, setNoteText] = useState(initialNotes || "");

  const handleSave = () => {
    if (onSave) {
      onSave(noteText);
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered className="notes-modal">
      <Modal.Body className="notes-modal-body">
        <div className="notes-header">
          NOTES
        </div>
        
        <div className="notes-content">
          <div className="notes-title">
            <span>{appointmentName || "Termin"}</span>
          </div>
          
          <Form.Control
            as="textarea"
            rows={12}
            className="notes-textarea"
            placeholder="Notizen schreiben..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          
          <div className="notes-actions">
            <Button variant="secondary" className="btn-save-note" onClick={handleSave}>
              Speichern
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
