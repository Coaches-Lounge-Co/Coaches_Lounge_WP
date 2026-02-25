import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Discover from "./pages/Discover.jsx";
import Messages from "./pages/Messages.jsx";
import Profile from "./pages/Profile.jsx";
import PeopleProfile from "./pages/PeopleProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />


        
        <Route path="/discover" element={<Discover />} />

          {/* ✅ New unified route */}
        <Route path="/people/:id" element={<PeopleProfile />} />
        <Route path="/messages" element={<Messages />} />

        {/* existing "my profile" page route */}
        <Route path="/profile" element={<Profile />} />

        {/* NEW: profile detail page route */}
        <Route path="/players/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}