import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { keyframes } from "@mui/system";
import BasicAppBar from "../components/BasicAppBar";

// 动画
const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

function MainPage() {
  const appBarRef = useRef(null); // 1. 拿到 AppBar 的ref
  const [appBarHeight, setAppBarHeight] = useState(0);

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  useEffect(() => {
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.offsetHeight); // 2. 获取真实高度
    }
  }, []);

  return (
    <>
      {/* 顶部导航栏 */}
      <Box ref={appBarRef}>
        <BasicAppBar />
      </Box>

      {/* 顶部主视觉区域 */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: `calc(100vh - ${appBarHeight}px)`, // 3. 动态剪掉AppBar
          overflow: "hidden",
        }}
      >
        {/* 背景视频 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          <source src="/videos/main.webm" type="video/webm" />
        </video>

        {/* 左侧遮罩 */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0))",
            zIndex: 1,
          }}
        />

        {/* 中间文字 */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            px: 2,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              color: "#fff",
              opacity: 0,
              animation: `${fadeUp} 2s ease-out forwards`,
              animationDelay: "1s",
              maxWidth: "800px",
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontWeight: "bold", mb: 2, color: "yellow" }}
            >
              The future is in our hands.
            </Typography>

            <Typography variant="h3" sx={{ mb: 4 }}>
              Monitoring climate change through data and science.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ fontSize: "1rem", px: 4, py: 1.5, borderRadius: "8px" }}
              onClick={handleScroll}
            >
              Explore Now
            </Button>
          </Box>
        </Box>

        {/* 向下箭头 */}
        <Box
          onClick={handleScroll}
          sx={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            cursor: "pointer",
            animation: `${bounce} 2s infinite`,
            color: "white",
          }}
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </Box>
      </Box>

      {/* 下方文字区域 */}
      {/* 这里你原来写得没问题，不需要动 */}
      <Box
        sx={{
          py: 10,
          px: { xs: 3, md: 12 },
          backgroundColor: "#f8f9fa",
          animation: `${fadeUp} 1.8s ease-out forwards`,
          opacity: 0,
          animationDelay: "0.8s",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* 文字内容 */}
        <Box sx={{ width: "100%", maxWidth: "880px" }}>
          {/* ... 你的文字内容 */}
        </Box>
      </Box>
    </>
  );
}

export default MainPage;
