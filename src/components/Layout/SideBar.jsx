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
} from "@mui/icons-material";

function SideBar({ setTopN, setRegion }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState({ region: false, ranking: false });
  const [selectedRegionMobile, setSelectedRegionMobile] = useState("");

  const handleClick = (key) => {
    setOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...(key === "region" && { ranking: false }),
      ...(key === "ranking" && { region: false }),
    }));
  };

  const handleTopNClick = (n) => setTopN(n);
  const handleRegionClick = (region) => setRegion(region);

  const handleRegionChangeMobile = (event) => {
    const region = event.target.value;
    setSelectedRegionMobile(region);
    setRegion(region);
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
        color: theme.palette.text.primary, // 依赖主题颜色
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
            {" "}
            {/* 依赖主题颜色 */}
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home page" /> {/* 依赖主题颜色 */}
        </ListItemButton>

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
          //  桌面端：保持原有的展开列表，并依赖主题颜色
          <>
            <ListItemButton onClick={() => handleClick("region")}>
              <ListItemIcon>
                {" "}
                {/* 依赖主题颜色 */}
                <MyLocationIcon />
              </ListItemIcon>
              <ListItemText primary="Region" /> {/* 依赖主题颜色 */}
              {open.region ? <ExpandLess /> : <ExpandMore />}{" "}
              {/* 依赖主题颜色 */}
            </ListItemButton>
            <Collapse in={open.region} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {regions.map((region) => (
                  <ListItemButton
                    key={region}
                    sx={{ pl: 9 }}
                    onClick={() => handleRegionClick(region)}
                  >
                    <ListItemText primary={region} /> {/* 依赖主题颜色 */}
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </>
        )}

        <ListItemButton onClick={() => handleClick("ranking")}>
          <ListItemIcon>
            {" "}
            {/* 依赖主题颜色 */}
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Ranking" /> {/* 依赖主题颜色 */}
          {open.ranking ? <ExpandLess /> : <ExpandMore />} {/* 依赖主题颜色 */}
        </ListItemButton>
        <Collapse in={open.ranking} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[5, 10, 20].map((n) => (
              <ListItemButton
                key={n}
                sx={{ pl: 9 }}
                onClick={() => handleTopNClick(n)}
              >
                <ListItemText primary={`Top ${n}`} /> {/* 依赖主题颜色 */}
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
}

export default SideBar;
