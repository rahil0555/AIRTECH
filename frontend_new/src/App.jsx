import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Record from "./pages/Record";
import Analytics from "./pages/Analytics";
import Drills from "./pages/Drills";

export default function App() {
  const Protected = ({ children }) => {
    const user = localStorage.getItem("user");
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/home" element={<Protected><Home /></Protected>} />
        <Route path="/record" element={<Protected><Record /></Protected>} />
        <Route path="/analytics" element={<Protected><Analytics /></Protected>} />
        <Route path="/drills" element={<Protected><Drills /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}
