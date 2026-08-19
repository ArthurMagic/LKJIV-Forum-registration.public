import { Routes, Route } from "react-router-dom";

import ParticipantRegistration from "@/pages/participantRegistration";
import LegalPage from "@/pages/legalPage";
import ParticipantRegistrationNew from "@/pages/participantRegistration copy"
import Test from "@/components/ui/net";
import ParticipantRegistrationNewNew from '@/pages/participantRegistration copy 2'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ParticipantRegistration />} />
      <Route path="/impressum" element={<LegalPage type="impressum" />} />
      <Route path="/datenschutz" element={<LegalPage type="datenschutz" />} />
      <Route path="/new" element={<ParticipantRegistrationNew />}/>
      <Route path="/new/new" element={<ParticipantRegistrationNewNew />}/>
      <Route path="/test" element={<Test />}/>
    </Routes>
  );
}

export default App
