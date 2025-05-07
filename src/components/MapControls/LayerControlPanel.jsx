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
        <FormControlLabel
          control={
            <Checkbox
              checked={layersVisibility["top-emissions-layer"]}
              onChange={() => handleChange("top-emissions-layer")}
            />
          }
          label="Top Emitters"
        />
      </FormGroup>
    </Box>
  );
}
