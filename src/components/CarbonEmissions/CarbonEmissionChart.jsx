import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Highcharts from "highcharts";
import "highcharts/modules/accessibility"; // ✅ 自动激活，无需调用

import HighchartsReact from "highcharts-react-official";

// 自定义拖动组件
function PaperComponent(props) {
  const paperRef = useRef(null);

  useEffect(() => {
    const node = paperRef.current;
    if (!node) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      const rect = node.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      node.style.position = "absolute";
      node.style.margin = 0;
      node.style.left = `${e.clientX - offsetX}px`;
      node.style.top = `${e.clientY - offsetY}px`;
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    const titleBar = node.querySelector("#draggable-dialog-title");
    titleBar?.addEventListener("mousedown", handleMouseDown);

    return () => {
      titleBar?.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return <Paper ref={paperRef} {...props} />;
}

function CarbonEmissionChart({ open, onClose, country, data }) {
  const chartOptions = {
    chart: {
      type: "line",
    },
    accessibility: {
      enabled: true,
    },
    title: {
      text: `Carbon Emissions for ${country}`,
    },
    xAxis: {
      categories: data.map((d) => d.year),
      title: {
        text: "Year",
      },
    },
    yAxis: {
      title: {
        text: "Emissions (MtCO₂)",
      },
    },
    series: [
      {
        name: country,
        data: data.map((d) => d.carbon_emission),
      },
    ],
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Carbon Emissions
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </DialogContent>
    </Dialog>
  );
}

export default CarbonEmissionChart;
