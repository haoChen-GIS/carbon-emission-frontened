import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}
