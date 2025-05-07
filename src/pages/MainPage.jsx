import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { keyframes } from "@mui/system";

import BasicAppBar from "../components/Common/BasicAppBar";

// 文字淡入 + 上移动画
const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// 箭头上下浮动动画
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

function MainPage() {
  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const appBarRef = useRef(null); // 绑定 AppBar 外部容器
  const [appBarHeight, setAppBarHeight] = useState(0);

  useEffect(() => {
    if (appBarRef.current) {
      setAppBarHeight(appBarRef.current.offsetHeight); // 动态获取高度
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
          height: `calc(100vh - ${appBarHeight}px)`,
          overflow: "hidden",
        }}
      >
        {/* 背景视频（IPCC官方） */}
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

        {/* 左侧遮罩增强对比度 */}
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

        {/* 居中文字内容区域 */}
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
            {/* <Button
              variant="contained"
              color="primary"
              sx={{ fontSize: "1rem", px: 4, py: 1.5, borderRadius: "8px" }}
              onClick={handleScroll}
            >
              Explore Now
            </Button> */}
          </Box>
        </Box>

        {/* 向下滚动箭头提示 */}
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

      {/* 下方内容区域（IPCC说明文字） */}
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
        <Box sx={{ width: "100%", maxWidth: "880px" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              color: "#444546",
              textAlign: "left",
            }}
          >
            Human activities have caused unprecedented changes in Earth's
            climate.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.15rem",
              color: "#555",
              lineHeight: 1.9,
              textAlign: "left",
            }}
          >
            Human activities have{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#444546",
                fontWeight: 500,
              }}
            >
              warmed
            </Box>{" "}
            Earth’s climate by more than 1°C since the late 19th century, and
            the effects on our climate are{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#444546",
                fontWeight: 500,
              }}
            >
              unprecedented
            </Box>
            . We are increasingly feeling the consequences in every inhabited{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#444546",
                fontWeight: 500,
              }}
            >
              region
            </Box>
            , and the changes we experience become{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#444546",
                fontWeight: 500,
              }}
            >
              larger
            </Box>{" "}
            the more the Earth warms. People in all regions will be affected in{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#444546",
                fontWeight: 500,
              }}
            >
              multiple
            </Box>{" "}
            ways. We're already seeing more severe and frequent{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#444546",
                fontWeight: 500,
              }}
            >
              extremes
            </Box>
            . Future emissions will determine{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#444546",
                fontWeight: 500,
              }}
            >
              future
            </Box>{" "}
            global warming. With higher emissions,{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#444546",
                fontWeight: 500,
              }}
            >
              nature
            </Box>{" "}
            becomes less efficient in absorbing the carbon we emit. Some changes
            cannot be avoided, but by limiting warming we can{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#444546",
                fontWeight: 500,
              }}
            >
              slow
            </Box>
            , and even stop, many of them. The{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                color: "#444546",
                fontWeight: 500,
              }}
            >
              good news
            </Box>{" "}
            is that reducing our emissions quickly can limit global warming.
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mt: 2,
              mb: 2,
              color: "#444546",
              textAlign: "left",
            }}
          >
            We can reach a more sustainable world. The choices made now will
            determine our shared future.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            <Button
              variant="outlined"
              href="https://www.ipcc.ch/sr15/"
              target="_blank"
            >
              View Full IPCC Report →
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MainPage;
