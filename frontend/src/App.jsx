// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AnalysisPage from "./pages/AnalysisPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* http://localhost:5173 → otomatik /analysis */}
        <Route path="/" element={<Navigate to="/analysis" replace />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
