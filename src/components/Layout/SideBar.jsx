import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListSubheader,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  MyLocation as MyLocationIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

function SideBar({ setTopN, setRegion }) {
  const theme = useTheme();
  const [open, setOpen] = useState({ region: false, ranking: false });

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

  return (
    <Box
      sx={{
        width: 240,
        height: "100%",
        padding: 2,
        bgcolor: theme.palette.background.default,
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
          <ListItemIcon sx={{ color: "inherit" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home page" />
        </ListItemButton>

        <ListItemButton onClick={() => handleClick("region")}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <MyLocationIcon />
          </ListItemIcon>
          <ListItemText primary="Region" />
          {open.region ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open.region} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {[
              "AFRICA",
              "ASIA",
              "CENTRAL AMERICA",
              "EUROPE",
              "MIDDLE EAST",
              "NORTH AMERICA",
              "OCEANIA",
              "SOUTH AMERICA",
            ].map((region) => (
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

        <ListItemButton onClick={() => handleClick("ranking")}>
          <ListItemIcon sx={{ color: "inherit" }}>
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
      </List>
    </Box>
  );
}

export default SideBar;
