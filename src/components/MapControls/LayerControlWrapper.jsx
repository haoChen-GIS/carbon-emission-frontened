import { Box } from "@mui/material";
import LayerControlPanel from "./LayerControlPanel";

export default function LayerControlWrapper({
  layersVisibility,
  setLayersVisibility,
}) {
  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        borderRight: "1px solid #ccc",
      }}
    >
      <LayerControlPanel
        layersVisibility={layersVisibility}
        setLayersVisibility={setLayersVisibility}
      />
    </Box>
  );
}
