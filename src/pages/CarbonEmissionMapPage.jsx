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
import { useState, useEffect } from "react";

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
  const [labels, setLabels] = useState([
    "null",
    "0 - 100",
    "100 - 500",
    "500 - 1000",
    "1000 - 1500",
    "1500 - 3000",
    ">3000",
  ]);
  const [colors, setColors] = useState([
    "#fff",
    "#d9d9d9",
    "#bdbdbd",
    "#969696",
    "#737373",
    "#525252",
    "#252525",
  ]);
  const [sizes, setSizes] = useState([5, 10, 15, 20, 25, 30, 35]);
  const [legendType, setLegendType] = useState("circle");

  const [showBubbleRenderingLayerControl, setShowBubbleRenderingLayerControl] =
    useState(true); // 控制是否显示 Bubble Rendering 控制项
  const [showTopEmissionsLayerControl, setShowTopEmissionsLayerControl] =
    useState(false); // 控制是否显示 Top Emitters 控制项
  const [showPlanarRenderingLayerControl, setShowPlanarRenderingLayerControl] =
    useState(false); // 控制是否显示 Planar Rendering 控制项

  // 初始图层的可见性
  const [layersVisibility, setLayersVisibility] = useState({
    "emissions-layer": true,
    "top-emissions-layer": false,
    "planar-rendering-layer": false, // ✅ 新增
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // topN 改变时，显示 Top Emitters 图层控制并将其默认设置为可见
    if (topN !== null) {
      setShowTopEmissionsLayerControl(true);
      setLayersVisibility((prev) => ({ ...prev, "top-emissions-layer": true }));
    } else {
      setShowTopEmissionsLayerControl(false);
      setLayersVisibility((prev) => ({
        ...prev,
        "top-emissions-layer": false,
      }));
    }
  }, [topN]);

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
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 顶部导航栏 */}
      <Box>
        <TopAppBar />
      </Box>

      {/* 中间区域：Sidebar + LayerControl + Map */}
      <Box sx={{ flex: 1, display: "flex", position: "relative" }}>
        {/* Desktop Layout */}
        {!isMobile && (
          <>
            {/* Sidebar */}
            <Box sx={{ width: 240 }}>
              <SideBar
                setRegion={setRegion}
                setTopN={setTopN}
                setLayerVisibility={(layerId, visible) =>
                  setLayersVisibility((prev) => ({
                    ...prev,
                    [layerId]: visible,
                  }))
                }
                setShowBubbleRenderingLayerControl={
                  setShowBubbleRenderingLayerControl
                }
                setShowPlanarRenderingLayerControl={
                  setShowPlanarRenderingLayerControl
                }
                setLegendType={setLegendType}
                setLabels={setLabels}
                setColors={setColors}
                setSizes={setSizes}
              />
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
                  showBubbleRendering={showBubbleRenderingLayerControl} // ✅ ✅ ✅ 加上这一行！
                  showTopEmissions={showTopEmissionsLayerControl} // 传递控制 Top Emitters 显示的状态
                  showPlanarRendering={showPlanarRenderingLayerControl} // 传递控制 Planar Rendering 显示的状态
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
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "60%",
                  zIndex: 10,
                  bgcolor: "background.paper",
                  transition: "transform 0.3s",
                  transform: showPanelMobile
                    ? "translateY(0)"
                    : "translateY(100%)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Tabs
                  value={activeTabMobile}
                  onChange={handleTabChangeMobile}
                  textColor="inherit"
                  indicatorColor="secondary"
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    "& .MuiTab-root": {
                      color: theme.palette.text.secondary,
                    },
                    "& .Mui-selected": {
                      color: theme.palette.text.primary,
                      fontWeight: "bold",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Tab label="Sidebar" />
                  <Tab label="Layers" />
                </Tabs>

                {activeTabMobile === 0 && (
                  <SideBar
                    setRegion={setRegion}
                    setTopN={setTopN}
                    setLayerVisibility={(layerId, visible) =>
                      setLayersVisibility((prev) => ({
                        ...prev,
                        [layerId]: visible,
                      }))
                    }
                    setShowBubbleRenderingLayerControl={
                      setShowBubbleRenderingLayerControl
                    }
                    setShowPlanarRenderingLayerControl={
                      setShowPlanarRenderingLayerControl
                    }
                    setLegendType={setLegendType}
                    setLabels={setLabels}
                    setColors={setColors}
                    setSizes={setSizes}
                  />
                )}
                {activeTabMobile === 1 && (
                  <LayerControlWrapper
                    layersVisibility={layersVisibility}
                    setLayersVisibility={setLayersVisibility}
                    showBubbleRendering={showBubbleRenderingLayerControl} // ✅ ✅ ✅ 加上这一行！
                    showTopEmissions={showTopEmissionsLayerControl} // 传递控制 Top Emitters 显示的状态
                    showPlanarRendering={showPlanarRenderingLayerControl} // 传递控制 Planar Rendering 显示的状态
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
          sx={{ flexGrow: 1 }}
          onClick={() => {
            if (isMobile && showPanelMobile) setShowPanelMobile(false);
          }}
        >
          <CarbonEmissionMapContainer
            region={region}
            topN={topN}
            layersVisibility={layersVisibility}
            sidebarOpen={!isMobile} // Desktop sidebar is always conceptually open
            layerPanelOpen={!isMobile && showLayerPanelDesktop}
            mobileSidebarOpen={
              isMobile && showPanelMobile && activeTabMobile === 0
            }
            mobileLayerPanelOpen={
              isMobile && showPanelMobile && activeTabMobile === 1
            }
            labels={labels}
            colors={colors}
            sizes={sizes}
            legendType={legendType}
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
