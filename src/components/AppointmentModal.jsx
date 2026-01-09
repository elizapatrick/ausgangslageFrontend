import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./AppointmentModal.css";
import Notes from "./Notes";

export default function AppointmentModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fromDate: "",
    fromTime: "",
    genre: "",
    notes: ""
  });

  const [errors, setErrors] = useState({
    name: false,
    description: false,
    fromDate: false,
    genre: false
  });

  const [submitError, setSubmitError] = useState("");

  const [showNotes, setShowNotes] = useState(false);

  const handleSaveNotes = (noteText) => {
    setFormData({ ...formData, notes: noteText });
  };

  
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const h = String(hour).padStart(2, '0');
        const m = String(minute).padStart(2, '0');
        times.push(`${h}:${m}`);
      }
    }
    return times;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: !formData.name,
      description: !formData.description,
      fromDate: !formData.fromDate,
      genre: !formData.genre
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);
    if (!hasErrors) {
      setSubmitError("");
      const success = await onSave(formData);
      if (success !== false) {
        onClose();
      } else {
        setSubmitError("Speichern fehlgeschlagen");
      }
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered className="appointment-modal-wrapper">
      <Modal.Body className="appointment-modal-body-bg">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="appointment-modal-title mb-0">Neuer Termin</h2>
          <Button variant="light" size="sm" onClick={onClose} className="appointment-btn-cancel">
            Abbrechen
          </Button>
        </div>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Termin-Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isInvalid={errors.name}
            />
            {errors.name && (
              <Form.Text className="text-danger">Validation</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Beschreibung:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              isInvalid={errors.description}
            />
            {errors.description && (
              <Form.Text className="text-danger">Validation</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Von:</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                  isInvalid={errors.fromDate}
                />
              </Col>
              <Col>
                <Form.Select
                  name="fromTime"
                  value={formData.fromTime}
                  onChange={handleInputChange}
                >
                  <option value="">Zeit wählen</option>
                  {generateTimeOptions().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            {errors.fromDate && (
              <Form.Text className="text-danger">Validation</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Genre:</Form.Label>
            <Form.Control
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              isInvalid={errors.genre}
            />
            {errors.genre && (
              <Form.Text className="text-danger">Validation</Form.Text>
            )}
          </Form.Group>

          <div className="d-flex gap-2 mt-3">
            <Button variant="info" className="flex-fill appointment-btn-notes" onClick={() => setShowNotes(true)}>
              Notizen hinzufügen
            </Button>
            <Button variant="info" className="flex-fill appointment-btn-create" onClick={handleSubmit}>
              Erstellen
            </Button>
          </div>
          {submitError && <Form.Text className="text-danger">{submitError}</Form.Text>}
        </Form>
      </Modal.Body>

      {/* Notes Modal */}
      {showNotes && (
        <Notes 
          show={showNotes}
          onClose={() => setShowNotes(false)}
          appointmentName={formData.name}
          initialNotes={formData.notes}
          onSave={handleSaveNotes}
        />
      )}
    </Modal>
  );
}
