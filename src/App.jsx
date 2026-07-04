import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Notifications from "./Notifications";
import AdminDashboard from "./AdminDashboard";

function App() {
  return (
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/helpdesk" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="/admin" element={<AdminDashboard />} />
</Routes>
  );
}

export default App;