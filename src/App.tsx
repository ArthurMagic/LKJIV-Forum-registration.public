import { Routes, Route } from "react-router-dom";

import ParticipantRegistration from "@/pages/participantRegistration";
import LegalPage from "@/pages/legalPage";
import ParticipantRegistrationNew from "@/pages/participantRegistration copy"
import Test from "@/components/ui/net";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ParticipantRegistration />} />
      <Route path="/impressum" element={<LegalPage type="impressum" />} />
      <Route path="/datenschutz" element={<LegalPage type="datenschutz" />} />
      <Route path="/new" element={<ParticipantRegistrationNew />}/>
      <Route path="/test" element={<Test />}/>
    </Routes>
  );
}

export default App
