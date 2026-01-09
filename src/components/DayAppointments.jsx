import { Modal, Button, ListGroup } from "react-bootstrap";
import "./DayAppointments.css";

export default function DayAppointments({ show, onClose, date, appointments, onDelete, onAddNew, onSelectAppointment }) {
  if (!date) return null;

  const dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  const monthNames = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ];

  const dateObj = new Date(date + 'T00:00:00');
  const dayName = dayNames[dateObj.getDay()];
  const day = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  const dayAppointments = appointments.filter(apt => apt.fromDate === date);

  return (
    <Modal show={show} onHide={onClose} centered className="day-modal">
      <Modal.Body className="day-modal-body">
        <div className="day-header">
          {dayName} {day}.{String(dateObj.getMonth() + 1).padStart(2, '0')}.{year}
        </div>

        <div className="appointments-list">
          {dayAppointments.length === 0 ? (
            <p className="no-appointments">Keine Termine</p>
          ) : (
            <ListGroup variant="flush">
              {dayAppointments.map((apt, index) => (
                <ListGroup.Item key={index} className="appointment-item" onClick={() => onSelectAppointment && onSelectAppointment(apt)} style={{ cursor: "pointer" }}>
                  <div className="appointment-info">
                    <span className="appointment-name">{apt.name}: {apt.genre}</span>
                    <span className="appointment-time">{apt.fromTime}</span>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>

        <div className="day-actions">
          <Button variant="secondary" className="btn-delete" onClick={() => onDelete(date)}>
            Termin löschen
          </Button>
          <Button variant="primary" className="btn-add-new" onClick={onAddNew}>
            Termin hinzufügen
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
