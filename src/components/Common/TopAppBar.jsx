import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ThemeMenu from "../Common/ThemeMenu";

export default function TopAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ mr: 2 }}
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ height: isMobile ? 40 : 72 }}
            />{" "}
            {/* 移动端 logo 缩小 */}
          </IconButton>

          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              color: theme.palette.text.primary,
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <Typography
              variant={isMobile ? "subtitle1" : "h6"} // 移动端使用 subtitle1
              sx={{
                fontWeight: isMobile ? 500 : 400,
                fontSize: isMobile ? "1rem" : "inherit",
                display: "inline",
              }}
            >
              {isMobile ? "Carbon " : "Global Carbon "}
            </Typography>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              sx={{
                color: "#4CAF50",
                fontWeight: isMobile ? 500 : 400,
                fontSize: isMobile ? "1rem" : "inherit",
                display: "inline",
              }}
            >
              E
            </Typography>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              sx={{
                display: "inline",
                fontWeight: isMobile ? 500 : 400,
                fontSize: isMobile ? "1rem" : "inherit",
              }}
            >
              missions
            </Typography>
          </Typography>

          <ThemeMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
