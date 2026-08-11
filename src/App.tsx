import { Routes, Route } from "react-router-dom";

import ParticipantRegistration from "@/pages/participantRegistration";
import LegalPage from "@/pages/legalPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ParticipantRegistration />} />
      <Route path="/impressum" element={<LegalPage type="impressum" />} />
      <Route path="/datenschutz" element={<LegalPage type="datenschutz" />} />
    </Routes>
  );
}

export default App
