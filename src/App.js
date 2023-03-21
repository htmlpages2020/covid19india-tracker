import { BrowserRouter, Routes, Route } from "react-router-dom";
import Covid19IndiaTracker from './pages/covid19IndiaTracker';
import StateWiseListPage from './pages/stateWiseList'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/* Home Page */}
            <Route path="/" element={<Covid19IndiaTracker />} />
            <Route path="/:state" element={<StateWiseListPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
