import React from "react";
import { Box, Typography, useMediaQuery, useTheme, Grid } from "@mui/material";

function Legend({ labels, colors, sizes }) {
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
        // border: "1px solid #ccc",
        ...positionStyle,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
        Global Carbon Emissions (MtCO₂)
      </Typography>

      {isMobile ? (
        // ✅ 移动端：两行四列
        <Grid container spacing={0.5} justifyContent="flex-start">
          {labels.map((label, i) => (
            <Grid key={i} size={3}>
              <Box
                sx={{
                  height: 56, // ✅ 原来是 64，图例高度减少
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: sizes[i] * 0.7, // ✅ 缩小圆圈大小
                    height: sizes[i] * 0.7,
                    borderRadius: "50%",
                    backgroundColor: colors[i],
                    border: "1px solid #666",
                    mb: 0.3,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.65rem", // ✅ 字体缩小
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 60,
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
            <Grid key={i} size={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: sizes[i],
                    height: sizes[i],
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
