import React from "react";
import { Box, Typography, useMediaQuery, useTheme, Grid } from "@mui/material";

function Legend({ labels, colors }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const positionStyle = isMobile
    ? { top: 10, left: 20 }
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
        minWidth: isMobile ? 200 : 160,
        maxWidth: isMobile ? 240 : undefined,
        border: "1px solid #ccc",
        ...positionStyle,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
        Global Carbon Emissions (MtCO₂)
      </Typography>

      {isMobile ? (
        // ✅ 移动端：两列横排，使用 v7 Grid API
        <Grid container spacing={1}>
          {labels.map((label, i) => (
            <Grid size={6} key={i}>
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
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}
                >
                  {label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        // ✅ 桌面端：单列纵向
        <Box>
          {labels.map((label, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 0.8,
              }}
            >
              <Box
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: colors[i],
                  border: "1px solid #666",
                  marginRight: 1.5,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Legend;
