import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";

import TopAppBar from "../components/Common/TopAppBar";
import BottomAppBar from "../components/Common/BottomAppBar";
import SideBar from "../components/Layout/SideBar";
import LayerControlWrapper from "../components/MapControls/LayerControlWrapper";
import CarbonEmissionMapContainer from "../components/CarbonEmissions/CarbonEmissionMapContainer";

export default function CarbonEmissionMapPage() {
  const [region, setRegion] = useState(null);
  const [topN, setTopN] = useState(null);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [layersVisibility, setLayersVisibility] = useState({
    "emissions-layer": true,
    "top-emissions-layer": true,
  });

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 顶部栏 */}
      <Box>
        <TopAppBar />
      </Box>

      {/* 中间区域：Sidebar + LayerControl + Map */}
      <Box sx={{ flex: 1, display: "flex", position: "relative" }}>
        {/* Sidebar */}
        <Box sx={{ width: 240 }}>
          <SideBar setRegion={setRegion} setTopN={setTopN} />
        </Box>

        {/* 折叠按钮，固定在 Sidebar 右边 */}
        <IconButton
          onClick={() => setShowLayerPanel((prev) => !prev)}
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
          {showLayerPanel ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

        {/* 图层控制面板 */}
        {showLayerPanel && (
          <Box sx={{ width: 300 }}>
            <LayerControlWrapper
              layersVisibility={layersVisibility}
              setLayersVisibility={setLayersVisibility}
            />
          </Box>
        )}

        {/* 地图区域 */}
        <Box sx={{ flexGrow: 1 }}>
          <CarbonEmissionMapContainer
            region={region}
            topN={topN}
            layersVisibility={layersVisibility}
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
