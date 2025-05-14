// ✅ Legend.jsx
import React from "react";
import { Box, Typography, useMediaQuery, useTheme, Grid } from "@mui/material";

function Legend({ labels, colors, sizes, type = "circle" }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const positionStyle = isMobile
    ? { top: 10, left: 10 }
    : { bottom: 120, right: 20 };

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 1000,
        backgroundColor: " rgba(165,204,244,0.6)",
        color: "#000",
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        minWidth: isMobile ? 260 : 260,
        maxWidth: isMobile ? 320 : 300,
        ...positionStyle,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
        Global Carbon Emissions (MtCO₂)
      </Typography>

      <Grid container spacing={isMobile ? 0.5 : 2}>
        {labels.map((label, i) => (
          <Grid key={i} item {...(isMobile ? { size: 3 } : { size: 12 })}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <Box
                sx={{
                  width:
                    type === "fill"
                      ? 24
                      : (sizes?.[i] || 12) * (isMobile ? 0.7 : 1),
                  height:
                    type === "fill"
                      ? 16
                      : (sizes?.[i] || 12) * (isMobile ? 0.7 : 1),
                  borderRadius: type === "fill" ? 2 : "50%",
                  backgroundColor: colors[i],
                  border: "1px solid #666",
                  marginRight: isMobile ? 0 : 1,
                  marginBottom: isMobile ? 0.3 : 0,
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontSize: isMobile ? "0.65rem" : "0.85rem",
                  textAlign: "center",
                  maxWidth: isMobile ? 60 : "none",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Legend;
