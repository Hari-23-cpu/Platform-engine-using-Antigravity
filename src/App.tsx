import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";

function App() {
  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/profile/:username" element={<ProfileDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
