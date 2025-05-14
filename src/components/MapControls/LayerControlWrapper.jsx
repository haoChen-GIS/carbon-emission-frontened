import { Box } from "@mui/material";
import LayerControlPanel from "./LayerControlPanel";

export default function LayerControlWrapper({
  layersVisibility,
  setLayersVisibility,
  showBubbleRendering, // ✅ 从 props 接收
  showTopEmissions,
  showPlanarRendering,
}) {
  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      <LayerControlPanel
        layersVisibility={layersVisibility}
        setLayersVisibility={setLayersVisibility}
        showBubbleRendering={showBubbleRendering} // ✅ 正确传值
        showTopEmissions={showTopEmissions}
        showPlanarRendering={showPlanarRendering}
      />
    </Box>
  );
}
