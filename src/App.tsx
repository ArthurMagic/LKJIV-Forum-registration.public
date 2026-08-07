import { Routes, Route } from "react-router-dom";

import ParticipantRegistration from "@/pages/participantRegistration";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ParticipantRegistration />} />
    </Routes>
  );
}

export default App
