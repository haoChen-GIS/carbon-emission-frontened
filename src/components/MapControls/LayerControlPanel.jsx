import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";

export default function LayerControlPanel({
  layersVisibility,
  setLayersVisibility,
  showBubbleRendering, // ✅ 控制是否显示 Bubble 图层项
  showTopEmissions, // ✅ 控制是否显示 TopN 图层项
  showPlanarRendering, // ✅ 控制是否显示 Planar 图层项
}) {
  const handleChange = (layerId) => {
    setLayersVisibility((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: 2,
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Layer Control
      </Typography>
      <Divider sx={{ mb: 1 }} />

      <FormGroup>
        {/* ✅ 仅在 Bubble 渲染时显示 */}
        {showBubbleRendering && (
          <FormControlLabel
            control={
              <Checkbox
                checked={layersVisibility["emissions-layer"]}
                onChange={() => handleChange("emissions-layer")}
              />
            }
            label="Carbon Emission Layer"
          />
        )}

        {/* ✅ Top 排名图层控制 */}
        {showTopEmissions && (
          <FormControlLabel
            control={
              <Checkbox
                checked={layersVisibility["top-emissions-layer"]}
                onChange={() => handleChange("top-emissions-layer")}
              />
            }
            label="Top Emitters"
          />
        )}

        {/* ✅ 面状渲染图层控制 */}
        {showPlanarRendering && (
          <FormControlLabel
            control={
              <Checkbox
                checked={layersVisibility["planar-rendering-layer"]}
                onChange={() => handleChange("planar-rendering-layer")}
              />
            }
            label="Planar Rendering"
          />
        )}
      </FormGroup>
    </Box>
  );
}
