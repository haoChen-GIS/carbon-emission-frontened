import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import ThemeMenu from "../Common/ThemeMenu";
import { useTheme } from "@mui/material/styles";

export default function TopAppBar() {
  const theme = useTheme(); // 直接从 MUI 主题拿颜色

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          bgcolor: theme.palette.background.default, // ✅ 使用 Theme 中的颜色
          color: theme.palette.text.primary,
          boxShadow: "none", // 可选，去掉阴影
        }}
      >
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

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: theme.palette.text.primary }}
          >
            Global Carbon{" "}
            <Typography
              variant="span"
              sx={{ color: "#4CAF50", fontWeight: "bold" }}
            >
              E
            </Typography>
            missions
          </Typography>

          <ThemeMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
