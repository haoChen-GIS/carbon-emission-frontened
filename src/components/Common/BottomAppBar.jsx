import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import useThemeContext from "../../Context/useThemeContext";
import { useTheme } from "@mui/material/styles"; // ✅ 获取全局颜色

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  height: "70px",
});

const LeftBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  flex: 3,
  gap: 2,
});

const RightBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flex: 2,
  gap: 30,
});

function MapePageFooter() {
  const { mode } = useThemeContext();
  const theme = useTheme(); // ✅ 全局 theme

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: "0 -1px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <StyledToolbar>
        <LeftBox>
          <img
            src="images/USTS.png"
            alt="School Logo"
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <Typography variant="subtitle2" fontWeight={200}>
            SUZHOU UNIVERSITY OF SCIENCE AND TECHNOLOGY
          </Typography>
        </LeftBox>
        <RightBox>
          <Typography
            variant="subtitle2"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            See Carbon. Act Smarter.
          </Typography>
          <img
            src={
              mode === "dark"
                ? "images/Carbon-Atlas-Light.png"
                : "images/Carbon-Atlas-Dark.png"
            }
            alt="Carbon Atlas Logo"
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
        </RightBox>
      </StyledToolbar>
    </AppBar>
  );
}

export default MapePageFooter;
