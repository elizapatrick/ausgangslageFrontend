import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentModal from "../components/AppointmentModal";
import DayAppointments from "../components/DayAppointments";
import AppointmentDetailModal from "../components/AppointmentDetailModal";
import "./Calender.css";
import Logo from "../Images/Logo.png";
import UserIcon from "../Images/user.png";

const monthNames = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember"
];

const weekdayNames = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag"
];

function formatIsoDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildCalendar(viewDate, appointments) {
  const year = viewDate.getUTCFullYear();
  const month = viewDate.getUTCMonth();
  const firstDay = new Date(Date.UTC(year, month, 1));
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const weekdayOffset = (firstDay.getUTCDay() + 6) % 7; 

  const cells = [];
  for (let i = 0; i < weekdayOffset; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayAppointments = appointments.filter((apt) => apt.fromDate === iso);
    cells.push({ day, date: iso, appointments: dayAppointments });
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export default function Calender() {
  const navigate = useNavigate();
  const [viewDate, setViewDate] = useState(new Date(Date.UTC(2025, 10, 1)));
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDayModal, setShowDayModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/");
  };

  const calendarWeeks = useMemo(
    () => buildCalendar(viewDate, appointments),
    [viewDate, appointments]
  );

  const currentMonthLabel = `${monthNames[viewDate.getUTCMonth()]} ${viewDate.getUTCFullYear()}`;

  const isToday = (iso) => {
    const todayIso = formatIsoDate(new Date());
    return iso === todayIso;
  };

  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(Date.UTC(prev.getUTCFullYear(), prev.getUTCMonth() - 1, 1)));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(Date.UTC(prev.getUTCFullYear(), prev.getUTCMonth() + 1, 1)));
  };

  const handleSelectDay = (iso) => {
    setSelectedDate(iso);
    setShowDayModal(true);
  };

  const handleDeleteDay = (iso) => {
    setAppointments((prev) => prev.filter((apt) => apt.fromDate !== iso));
    setShowDayModal(false);
  };

  const handleAddNew = (dayIso) => {
    setSelectedDate(dayIso || formatIsoDate(new Date()));
    setShowAddModal(true);
  };

  const handleSaveAppointment = async (data) => {
    const payload = data.fromDate
      ? data
      : { ...data, fromDate: selectedDate || formatIsoDate(new Date()) };
    setAppointments((prev) => [...prev, payload]);
    return true;
  };

  return (
    <div className="calendar-page">
      <header className="calendar-toolbar">
        <div className="toolbar-left">
          <img src={UserIcon} alt="User" className="user-icon" />
          <button className="logout-btn">Abmelden</button>
        </div>
        <div className="logo-area">
          <img src={Logo} alt="KEMflow Logo" className="logo-img" />
        </div>
        <div className="toolbar-right">
          <span className="settings-icon">⚙</span>
          <button className="add-appointment" onClick={() => handleAddNew(selectedDate)}>
            ＋ Termin hinzufügen
          </button>
        </div>
      </header>

      <div className="calendar-content">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>←</button>
          <h1 className="month-label">{currentMonthLabel}</h1>
          <button onClick={handleNextMonth}>→</button>
        </div>

        <div className="weekday-row">
          {weekdayNames.map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarWeeks.map((week, weekIndex) => (
            <div className="calendar-week" key={weekIndex}>
              {week.map((cell, idx) => {
                if (!cell) {
                  return <div key={idx} className="calendar-day empty" />;
                }
                const hasAppointments = cell.appointments.length > 0;
                return (
                  <button
                    type="button"
                    key={cell.date}
                    className={`calendar-day ${hasAppointments ? "has-appointments" : ""} ${isToday(cell.date) ? "is-today" : ""}`}
                    onClick={() => handleSelectDay(cell.date)}
                  >
                    <span className="day-number">{cell.day}</span>
                    {hasAppointments && (
                      <div className="appointment-dots">
                        {cell.appointments.map((apt, aptIdx) => (
                          <span key={aptIdx} className="dot" title={`${apt.name} • ${apt.fromTime}`}></span>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {showDayModal && (
        <DayAppointments
          show={showDayModal}
          onClose={() => setShowDayModal(false)}
          date={selectedDate}
          appointments={appointments}
          onDelete={handleDeleteDay}
          onAddNew={() => handleAddNew(selectedDate)}
          onSelectAppointment={(apt) => {
            setSelectedAppointment(apt);
            setShowDetailModal(true);
            setShowDayModal(false);
          }}
        />
      )}

      {showAddModal && (
        <AppointmentModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveAppointment}
        />
      )}

      {showDetailModal && selectedAppointment && (
        <AppointmentDetailModal
          show={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          appointment={selectedAppointment}
          onEdit={(updated) => {
            setAppointments((prev) =>
              prev.map((apt) => (apt === selectedAppointment ? updated : apt))
            );
            setShowDetailModal(false);
          }}
          onDelete={() => {
            setAppointments((prev) => prev.filter((apt) => apt !== selectedAppointment));
            setShowDetailModal(false);
          }}
        />
      )}
    </div>
  );
}
