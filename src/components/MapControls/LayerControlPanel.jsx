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
  showTopEmissions, // 接收来自父组件的状态
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
        <FormControlLabel
          control={
            <Checkbox
              checked={layersVisibility["emissions-layer"]}
              onChange={() => handleChange("emissions-layer")}
            />
          }
          label="Carbon Emission Layer"
        />
        {showTopEmissions && ( // 只有当 showTopEmissions 为 true 时才渲染
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
      </FormGroup>
    </Box>
  );
}
