import { Box } from "@mui/material";
import LayerControlPanel from "./LayerControlPanel";

export default function LayerControlWrapper({
  layersVisibility,
  setLayersVisibility,
  showTopEmissions, // ✅ 接收 showTopEmissions prop
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
        showTopEmissions={showTopEmissions} // ✅ 将 showTopEmissions 传递给 LayerControlPanel
      />
    </Box>
  );
}
