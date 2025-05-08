import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import useThemeContext from "../../Context/useThemeContext";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "auto", // 允许高度自适应内容
  paddingTop: 8,
  paddingBottom: 8,
});

const LeftBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  gap: 8,
  overflow: "hidden", // 防止内容溢出
});

const RightBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 16,
});

function MapePageFooter() {
  const { mode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const schoolName = "SUZHOU UNIVERSITY OF SCIENCE AND TECHNOLOGY";
  const schoolNameShort = "USTS"; // 缩写

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
            style={{
              width: isMobile ? 30 : 50,
              height: isMobile ? 30 : 50,
              marginRight: 6,
            }}
          />
          <Typography
            variant={isMobile ? "caption" : "subtitle2"}
            fontWeight={200}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis", // 超出部分显示省略号
              fontSize: isMobile ? "0.7rem" : "0.8rem",
            }}
          >
            {isMobile ? schoolNameShort : schoolName}
          </Typography>
        </LeftBox>
        <RightBox>
          <Typography
            variant={isMobile ? "caption" : "subtitle2"}
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
            style={{
              width: isMobile ? 30 : 50,
              height: isMobile ? 30 : 50,
              marginRight: 6,
            }}
          />
        </RightBox>
      </StyledToolbar>
    </AppBar>
  );
}

export default MapePageFooter;
