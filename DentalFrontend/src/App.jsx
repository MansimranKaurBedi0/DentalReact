import "./App.css";
import { Admin } from "./components/Admin";
import { Appointment } from "./components/Appointment";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import { Routes, Route, Navigate } from "react-router-dom";
import { Service } from "./components/Service";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedAdminRoute = ({ children }) => {
    if (!user || user.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/services" element={<Service />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
