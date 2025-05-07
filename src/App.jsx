import { Box } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/Register";
import ForgetPassword from "./pages/Authentication/ResetPassword";
import CarbonEmissionMapPage from "./pages/CarbonEmissionMapPage";
import { ThemeProvider } from "./Context/ThemeContext";
export default function App() {
  return (
    <ThemeProvider>
      <Box>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/reset-password" element={<ForgetPassword />} />
            <Route
              path="/carbon-emission"
              element={<CarbonEmissionMapPage />}
            />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}
