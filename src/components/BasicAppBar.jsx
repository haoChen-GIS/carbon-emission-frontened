import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function BasicAppBar() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = React.useState(false);

  const handleLoginClick = () => {
    setIsClicked(true); // 播放过渡效果
    setTimeout(() => {
      navigate("/sign-in");
    }, 300); // 延迟跳转
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#6391c8" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Global Carbon Emissions
          </Typography>
          <Button
            color="inherit"
            onClick={handleLoginClick}
            sx={{
              transition: "all 0.3s ease",
              transform: isClicked ? "scale(0.95)" : "scale(1)",
              opacity: isClicked ? 0.5 : 1,
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
