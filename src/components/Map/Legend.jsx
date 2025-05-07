import React from "react";
import { Box, Typography } from "@mui/material";

function Legend({ labels, colors, sidebarOpen }) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 120,
        right: sidebarOpen ? 260 : 20,
        backgroundColor: "#A5CCF4",
        color: "#000",
        p: 2,
        borderRadius: 1,
        zIndex: 1000,
        boxShadow: 3,
        minWidth: 160,
        border: "1px solid #ccc",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
        Global Carbon Emissions (MtCO₂)
      </Typography>

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
  );
}

export default Legend;
