import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/dashboard/Home";
import Income from "./pages/dashboard/Income";
import Expence from "./pages/dashboard/Expence"
import UserProvider from "./context/userContext";
import {Toaster} from "react-hot-toast"
import LandingPage from "./pages/LadingPage/LandingPage"

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Roots />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expence" element={<Expence />} />
          </Routes>
        </Router>
      </div>

      <Toaster 
        toastOptions={{
          className: "",
          style:{fontSize:"13px"},
        }}
      />
    </UserProvider>
  )
}

export default App

const Roots = () => {
  // Check if token exist in localstorage
  const isAuthenticated = !localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) :
  (
    <Navigate to="/landing" />
  )
};