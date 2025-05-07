import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useThemeContext from "../../Context/useThemeContext";
import { useTheme } from "@mui/material/styles";

// 自定义样式的 Menu
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(() => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
  },
}));

export default function ThemeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { mode, toggleMode } = useThemeContext();
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = () => {
    toggleMode();
    handleClose();
  };

  return (
    <Box elevation={2}>
      <Button
        id="theme-switcher-button"
        aria-controls={open ? "theme-switcher-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRadius: "8px",
          px: 2,
          py: 1,
          fontWeight: 500,
          "&:hover": {
            bgcolor:
              mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
          },
        }}
      >
        {mode === "dark" ? (
          <>
            <DarkModeIcon sx={{ marginRight: 1 }} />
            Dark
          </>
        ) : (
          <>
            <LightModeIcon sx={{ marginRight: 1 }} />
            Light
          </>
        )}
      </Button>

      <StyledMenu
        id="theme-switcher-menu"
        MenuListProps={{
          "aria-labelledby": "theme-switcher-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleModeChange}
          disableRipple
          sx={{
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          {mode === "dark" ? (
            <>
              <LightModeIcon sx={{ marginRight: 0.5 }} />
              Light
            </>
          ) : (
            <>
              <DarkModeIcon sx={{ marginRight: 0.5 }} />
              Dark
            </>
          )}
        </MenuItem>
      </StyledMenu>
    </Box>
  );
}
