import { Routes, Route } from "react-router-dom"; 
import Home from "./pages/LogInPage";
import Registrierungsseite from "./pages/RegisterPage"; 
import Kalender from "./pages/Calender";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registrieren" element={<Registrierungsseite />} />
      <Route path="/calendar" element={<Kalender />} />
      <Route path="*" element={<h1>Seite nicht gefunden (404)</h1>} />
    </Routes>
  );
}

export default App;