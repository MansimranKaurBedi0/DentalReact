import "./App.css";
import { Admin } from "./components/Admin";
import { AdminCompleted } from "./components/AdminCompleted";
import { Appointment } from "./components/Appointment";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import { Service } from "./components/Service";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedAdminRoute = ({ children }) => {
    if (!user || user.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav></Nav>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/services" element={<Service />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            } 
          />
          <Route 
            path="/admin/completed" 
            element={
              <ProtectedAdminRoute>
                <AdminCompleted />
              </ProtectedAdminRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
