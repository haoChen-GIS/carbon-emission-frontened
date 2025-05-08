import { useEffect } from "react";
import {
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import LayersIcon from "@mui/icons-material/Layers";
import { useState } from "react";

import TopAppBar from "../components/Common/TopAppBar";
import BottomAppBar from "../components/Common/BottomAppBar";
import SideBar from "../components/Layout/SideBar";
import LayerControlWrapper from "../components/MapControls/LayerControlWrapper";
import CarbonEmissionMapContainer from "../components/CarbonEmissions/CarbonEmissionMapContainer";

export default function CarbonEmissionMapPage() {
  const [region, setRegion] = useState(null);
  const [topN, setTopN] = useState(null);
  const [showLayerPanelDesktop, setShowLayerPanelDesktop] = useState(false);
  const [showPanelMobile, setShowPanelMobile] = useState(false);
  const [activeTabMobile, setActiveTabMobile] = useState(0);
  const [layersVisibility, setLayersVisibility] = useState({
    "emissions-layer": true,
    "top-emissions-layer": true,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 处理移动端视口高度
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile Panel Handlers
  const handleTabChangeMobile = (event, newValue) => {
    setActiveTabMobile(newValue);
    if (!showPanelMobile) setShowPanelMobile(true);
  };

  const handlePanelToggleMobile = (tabIndex) => {
    if (!showPanelMobile) {
      setActiveTabMobile(tabIndex);
      setShowPanelMobile(true);
    } else if (activeTabMobile !== tabIndex) {
      setActiveTabMobile(tabIndex);
    } else {
      setShowPanelMobile(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        "@media (max-width: 600px)": {
          height: "calc(var(--vh, 1vh) * 100)",
          overflow: "hidden",
        },
      }}
    >
      {/* 顶部导航栏 */}
      <Box>
        <TopAppBar />
      </Box>

      {/* 中间区域：Sidebar + LayerControl + Map */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          position: "relative",
          "@media (max-width: 600px)": {
            height: "calc(100% - 60px)",
          },
        }}
      >
        {/* Desktop Layout */}
        {!isMobile && (
          <>
            {/* Sidebar */}
            <Box sx={{ width: 240 }}>
              <SideBar setRegion={setRegion} setTopN={setTopN} />
            </Box>

            {/* 折叠按钮，固定在 Sidebar 右边 */}
            <IconButton
              onClick={() => setShowLayerPanelDesktop((prev) => !prev)}
              sx={{
                position: "absolute",
                top: 250,
                left: 240,
                zIndex: 10,
                bgcolor: "background.paper",
                borderRadius: "0 4px 4px 0",
                boxShadow: 1,
              }}
            >
              {showLayerPanelDesktop ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>

            {/* 图层控制面板 */}
            {showLayerPanelDesktop && (
              <Box sx={{ width: 300 }}>
                <LayerControlWrapper
                  layersVisibility={layersVisibility}
                  setLayersVisibility={setLayersVisibility}
                />
              </Box>
            )}
          </>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <>
            {/* Mobile Tabbed Panel */}
            {showPanelMobile && (
              <Box
                sx={{
                  position: "fixed",
                  bottom: "60px",
                  left: 0,
                  width: "100%",
                  height: "50vh",
                  zIndex: 10,
                  bgcolor: "background.paper",
                  transition: "transform 0.3s",
                  transform: showPanelMobile
                    ? "translateY(0)"
                    : "translateY(100%)",
                  display: "flex",
                  flexDirection: "column",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
                }}
              >
                <Tabs
                  value={activeTabMobile}
                  onChange={handleTabChangeMobile}
                  sx={{ bgcolor: "background.paper" }}
                >
                  <Tab label="Sidebar" />
                  <Tab label="Layers" />
                </Tabs>
                {activeTabMobile === 0 && (
                  <SideBar setRegion={setRegion} setTopN={setTopN} />
                )}
                {activeTabMobile === 1 && (
                  <LayerControlWrapper
                    layersVisibility={layersVisibility}
                    setLayersVisibility={setLayersVisibility}
                  />
                )}
              </Box>
            )}

            {/* Toggle Buttons */}
            <IconButton
              onClick={() => handlePanelToggleMobile(0)}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 11,
                bgcolor: "background.paper",
                borderRadius: "50%",
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              onClick={() => handlePanelToggleMobile(1)}
              sx={{
                position: "absolute",
                top: 60,
                right: 10,
                zIndex: 11,
                bgcolor: "background.paper",
                borderRadius: "50%",
              }}
            >
              <LayersIcon />
            </IconButton>
          </>
        )}

        {/* 地图区域 */}
        <Box
          sx={{
            flexGrow: 1,
            position: "relative",
          }}
          onClick={() => {
            if (isMobile && showPanelMobile) setShowPanelMobile(false);
          }}
        >
          <CarbonEmissionMapContainer
            region={region}
            topN={topN}
            layersVisibility={layersVisibility}
            sidebarOpen={!isMobile}
            layerPanelOpen={!isMobile && showLayerPanelDesktop}
            mobileSidebarOpen={
              isMobile && showPanelMobile && activeTabMobile === 0
            }
            mobileLayerPanelOpen={
              isMobile && showPanelMobile && activeTabMobile === 1
            }
          />
        </Box>
      </Box>

      {/* 底部栏 */}
      <Box>
        <BottomAppBar />
      </Box>
    </Box>
  );
}
