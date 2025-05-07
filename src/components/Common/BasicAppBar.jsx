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

export default function BasicAppBar() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = React.useState(false);

  const handleLoginClick = () => {
    setIsClicked(true); // 播放过渡效果
    setTimeout(() => {
      navigate("/login");
    }, 300); // 延迟跳转
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="fixed" sx={{ bgcolor: "#222529" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ mr: 4 }}
          >
            <img src="/images/logo.png" alt="Logo" style={{ height: 72 }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Global Carbon{" "}
            <Typography variant="span" sx={{ color: "#4CAF50" }}>
              E
            </Typography>
            missions
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
