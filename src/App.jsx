import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Discover from "./pages/Discover.jsx";
import Messages from "./pages/Messages.jsx";
import PeopleProfile from "./pages/PeopleProfile";
import Auth from "./pages/Auth.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/discover" element={<Discover />} />

          {/* ✅ New unified route */}
        <Route path="/people/:id" element={<PeopleProfile />} />
        <Route path="/messages" element={<RequireAuth>
          <Messages />
        </RequireAuth>} />

        <Route path="/auth" element={<Auth />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/players/:id" element={<PeopleProfile />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}