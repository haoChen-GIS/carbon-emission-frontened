// ✅ SideBar.jsx
import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListSubheader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  MyLocation as MyLocationIcon,
  BarChart as BarChartIcon,
  Public as PublicIcon,
} from "@mui/icons-material";

function SideBar({
  setTopN,
  setRegion,
  setLayerVisibility,
  setShowBubbleRenderingLayerControl,
  setShowPlanarRenderingLayerControl,
  setLegendType,
  setLabels,
  setColors,
  setSizes,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState({
    region: false,
    ranking: false,
    rendering: false,
  });
  const [selectedRegionMobile, setSelectedRegionMobile] = useState("");

  const handleClick = (key) => {
    setOpen((prevState) => ({
      region: key === "region" ? !prevState.region : false,
      ranking: key === "ranking" ? !prevState.ranking : false,
      rendering: key === "rendering" ? !prevState.rendering : false,
    }));
  };

  const handleTopNClick = (n) => setTopN(n);
  const handleRegionClick = (region) => setRegion(region);
  const handleRegionChangeMobile = (event) => {
    const region = event.target.value;
    setSelectedRegionMobile(region);
    setRegion(region);
  };

  // 图例数据
  const circleLabels = [
    "null",
    "0 - 100",
    "100 - 500",
    "500 - 1000",
    "1000 - 1500",
    "1500 - 3000",
    ">3000",
  ];
  const circleColors = [
    "#fff",
    "#d9d9d9",
    "#bdbdbd",
    "#969696",
    "#737373",
    "#525252",
    "#252525",
  ];
  const circleSizes = [5, 10, 15, 20, 25, 30, 35];

  const fillLabels = [
    "No data",
    "0–1 Mt",
    "1–10 Mt",
    "10–100 Mt",
    "100–1000 Mt",
    ">1000 Mt",
  ];
  const fillColors = [
    "#cccccc",
    "#ffffcc",
    "#ffeda0",
    "#feb24c",
    "#f03b20",
    "#bd0026",
  ];

  // 切换图层及图例
  const handleAddBubbleRendering = () => {
    setLayerVisibility("emissions-layer", true);
    setLayerVisibility("planar-rendering-layer", false);
    setShowBubbleRenderingLayerControl(true);
    setShowPlanarRenderingLayerControl(false);
    setLegendType("circle");
    setLabels(circleLabels);
    setColors(circleColors);
    setSizes(circleSizes);
  };

  const handleAddPlanarRendering = () => {
    setLayerVisibility("planar-rendering-layer", true);
    setLayerVisibility("emissions-layer", false);
    setShowPlanarRenderingLayerControl(true);
    setShowBubbleRenderingLayerControl(false);
    setLegendType("fill");
    setLabels(fillLabels);
    setColors(fillColors);
    setSizes([]); // fill 图例不需要大小
  };

  const regions = [
    "AFRICA",
    "ASIA",
    "CENTRAL AMERICA",
    "EUROPE",
    "MIDDLE EAST",
    "NORTH AMERICA",
    "OCEANIA",
    "SOUTH AMERICA",
  ];

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : 240,
        height: "100%",
        padding: 2,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <List
        component="nav"
        subheader={
          <ListSubheader sx={{ bgcolor: "inherit", color: "inherit" }} />
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home page" />
        </ListItemButton>

        {/* ✅ Region 菜单 */}
        {isMobile ? (
          //  移动端：使用带图标的下拉选择框（图标和文字在一行）
          <FormControl fullWidth margin="normal">
            <InputLabel
              id="region-select-label"
              sx={{
                display: "flex",
                alignItems: "center",
                color: theme.palette.text.primary, // 依赖主题颜色
              }}
            >
              <ListItemIcon sx={{ mr: 1 }}>
                {" "}
                {/* 依赖主题颜色 */}
                <MyLocationIcon />
              </ListItemIcon>
              Region
            </InputLabel>
            <Select
              labelId="region-select-label"
              id="region-select"
              value={selectedRegionMobile}
              label="Region"
              onChange={handleRegionChangeMobile}
              sx={{ color: theme.palette.text.primary }} // 依赖主题颜色
              inputProps={{ style: { color: theme.palette.text.primary } }} // 依赖主题颜色
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  },
                },
              }}
            >
              <MenuItem value="">
                <em style={{ color: theme.palette.text.secondary }}>
                  Select a region
                </em>
              </MenuItem>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {" "}
                  {/* 依赖主题颜色 */}
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <>
            <ListItemButton onClick={() => handleClick("region")}>
              <ListItemIcon>
                <MyLocationIcon />
              </ListItemIcon>
              <ListItemText primary="Region" />
              {open.region ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.region} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {regions.map((region) => (
                  <ListItemButton
                    key={region}
                    sx={{ pl: 9 }}
                    onClick={() => handleRegionClick(region)}
                  >
                    <ListItemText primary={region} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </>
        )}

        {/* ✅ Ranking 菜单 */}
        <ListItemButton onClick={() => handleClick("ranking")}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Ranking" />
          {open.ranking ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.ranking} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[5, 10, 20].map((n) => (
              <ListItemButton
                key={n}
                sx={{ pl: 9 }}
                onClick={() => handleTopNClick(n)}
              >
                <ListItemText primary={`Top ${n}`} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* ✅ Rendering 菜单 */}
        <ListItemButton onClick={() => handleClick("rendering")}>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Rendering" />
          {open.rendering ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.rendering} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 9 }} onClick={handleAddBubbleRendering}>
              <ListItemText primary="Bubble Rendering" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 9 }} onClick={handleAddPlanarRendering}>
              <ListItemText primary="Planar Rendering" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}

export default SideBar;
