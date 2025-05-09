import React from "react";
import { Box, Typography, useMediaQuery, useTheme, Grid } from "@mui/material";

function Legend({ labels, colors }) {
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
        backgroundColor: "#A5CCF4",
        color: "#000",
        p: 2,
        borderRadius: 1,
        boxShadow: 3,
        minWidth: isMobile ? 260 : 260,
        maxWidth: isMobile ? 320 : 360,
        border: "1px solid #ccc",
        ...positionStyle,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
        Global Carbon Emissions (MtCO₂)
      </Typography>

      {isMobile ? (
        // ✅ 移动端：两行四列
        <Grid container spacing={1}>
          {labels.map((label, i) => (
            <Grid key={i} size={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: colors[i],
                    border: "1px solid #666",
                    mb: 0.5,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.7rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 80,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        // ✅ 桌面端：两列
        <Grid container spacing={2}>
          {labels.map((label, i) => (
            <Grid key={i} size={6}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: colors[i],
                    border: "1px solid #666",
                    marginRight: 1,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                  {label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Legend;
