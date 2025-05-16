import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { Box, Slider, Typography, IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";

import { API_BASE_URL } from "../../utils/api";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
import CarbonEmissionChart from "./CarbonEmissionChart";
import Legend from "../Map/Legend";
function CarbonEmissionMapContainer({
  topN,
  region,
  layersVisibility = {},
  sidebarOpen,
  legendType,
  labels,
  colors,
  sizes,
}) {
  console.log(API_BASE_URL);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [year, setYear] = useState(2022);
  const [chartData, setChartData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [chartOpen, setChartOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playInterval = useRef(null);

  // 控制图层显示/隐藏
  useEffect(() => {
    if (map.current) {
      const updateLayerVisibility = (layerId, visible) => {
        if (map.current.getLayer(layerId)) {
          map.current.setLayoutProperty(
            layerId,
            "visibility",
            visible ? "visible" : "none"
          );
        }
      };
      updateLayerVisibility(
        "emissions-layer",
        layersVisibility["emissions-layer"]
      );
      updateLayerVisibility(
        "top-emissions-layer",
        layersVisibility["top-emissions-layer"]
      );
      updateLayerVisibility(
        "choropleth-fill",
        layersVisibility["planar-rendering-layer"]
      );
    }
  }, [layersVisibility]);

  // 初始化地图
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/delusion-haochen/clwubpfrt01by01r04kuhhwpz",
      center: [80, 30],
      zoom: 2,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.AttributionControl({ compact: true }));

    map.current.on("load", () => {
      map.current.addSource("emissions", {
        type: "vector",
        url: "mapbox://delusion-haochen.6a6rbb5w",
      });

      map.current.addLayer({
        id: "emissions-layer",
        type: "circle",
        source: "emissions",
        "source-layer": "carbon_emissions_with_coordin-4vqxcl",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            [
              "case",
              [
                "boolean",
                [
                  "any",
                  ["!", ["has", "carbon_emission"]],
                  ["==", ["get", "carbon_emission"], null],
                  ["==", ["typeof", ["get", "carbon_emission"]], "string"],
                ],
                true,
              ],
              -1,
              ["to-number", ["get", "carbon_emission"]],
            ],
            -1,
            sizes[0],
            0,
            sizes[0],
            100,
            sizes[1],
            500,
            sizes[2],
            1000,
            sizes[3],
            1500,
            sizes[4],
            3000,
            sizes[5],
            10000,
            sizes[6],
          ],
          "circle-color": [
            "interpolate",
            ["linear"],
            [
              "case",
              [
                "boolean",
                [
                  "any",
                  ["!", ["has", "carbon_emission"]],
                  ["==", ["get", "carbon_emission"], null],
                  ["==", ["typeof", ["get", "carbon_emission"]], "string"],
                ],
                true,
              ],
              -1,
              ["to-number", ["get", "carbon_emission"]],
            ],
            -1,
            colors[0],
            0,
            colors[1],
            100,
            colors[2],
            500,
            colors[3],
            1000,
            colors[4],
            1500,
            colors[5],
            3000,
            colors[6],
            10000,
            colors[6],
          ],
        },
        filter: ["==", ["number", ["get", "year"]], year],
      });

      map.current.addSource("top-emissions", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.current.addLayer({
        id: "top-emissions-layer",
        type: "circle",
        source: "top-emissions",
        paint: {
          "circle-radius": 10,
          "circle-color": "#0000ff",
        },
      });

      map.current.addSource("choropleth-emissions", {
        type: "vector",
        url: "mapbox://delusion-haochen.b7g651zg",
      });

      map.current.addLayer({
        id: "choropleth-fill",
        type: "fill",
        source: "choropleth-emissions",
        "source-layer": "carbon_emissions_entity-5miyyl",
        layout: {
          visibility: "none", // ✅ 初始隐藏
        },
        paint: {
          "fill-color": [
            "case",
            ["!", ["has", `emissions_${year}`]],
            "#cccccc",
            [">", ["coalesce", ["get", `emissions_${year}`], -1], -1],
            [
              "interpolate",
              ["linear"],
              ["/", ["get", `emissions_${year}`], 1000000],
              0,
              "#ffffcc",
              1,
              "#ffeda0",
              10,
              "#feb24c",
              100,
              "#f03b20",
              1000,
              "#bd0026",
            ],
            "rgba(0,0,0,0)",
          ],
          "fill-opacity": 0.85,
        },
      });

      // 添加点击事件，用于显示图表弹窗
      map.current.on("click", "emissions-layer", async (e) => {
        if (e.features.length > 0) {
          const feature = e.features[0];
          const entity = feature.properties.country;

          try {
            const response = await fetch(
              `${API_BASE_URL}/api/emissions/${entity}` //API——BASE——URL是一个环境变量，由Railway提供，是后端程序的地址
            );
            const result = await response.json();

            if (Array.isArray(result.emissions)) {
              setSelectedCountry(entity);
              setChartData(result.emissions);
              setChartOpen(true);
            }
          } catch (err) {
            console.error("❌ Failed to fetch emission data for chart:", err);
          }
        }
      });

      // 鼠标移入 emissions-layer 圆点时变为小手
      map.current.on("mouseenter", "emissions-layer", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      // 鼠标移出时恢复默认
      map.current.on("mouseleave", "emissions-layer", () => {
        map.current.getCanvas().style.cursor = "";
      });
    });
  }, [colors, labels, sizes, year]);

  useEffect(() => {
    if (map.current?.getLayer("emissions-layer")) {
      map.current.setFilter("emissions-layer", [
        "==",
        ["number", ["get", "year"]],
        year,
      ]);
    }
    if (map.current.getLayer("choropleth-fill")) {
      map.current.setPaintProperty("choropleth-fill", "fill-color", [
        "case",
        ["!", ["has", `emissions_${year}`]],
        "#cccccc",
        [">", ["coalesce", ["get", `emissions_${year}`], -1], -1],
        [
          "interpolate",
          ["linear"],
          ["/", ["get", `emissions_${year}`], 1000000],
          0,
          "#ffffcc",
          1,
          "#ffeda0",
          10,
          "#feb24c",
          100,
          "#f03b20",
          1000,
          "#bd0026",
        ],
        "rgba(0,0,0,0)",
      ]);
    }
  }, [year]);

  useEffect(() => {
    if (region && map.current) {
      const regions = {
        AFRICA: { center: [20, 0], zoom: 4 },
        ASIA: { center: [100, 30], zoom: 4 },
        "CENTRAL AMERICA": { center: [-85, 15], zoom: 4 },
        EUROPE: { center: [20, 50], zoom: 4 },
        "MIDDLE EAST": { center: [45, 30], zoom: 4 },
        "NORTH AMERICA": { center: [-100, 40], zoom: 4 },
        OCEANIA: { center: [140, -25], zoom: 4 },
        "SOUTH AMERICA": { center: [-60, -15], zoom: 4 },
      };
      const { center, zoom } = regions[region];
      map.current.flyTo({ center, zoom, essential: true });
    }
  }, [region]);

  useEffect(() => {
    if (topN !== null && map.current) {
      const fetchTopNEmissions = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/api/emissions/top/${topN}/${year}` //API——BASE——URL是一个环境变量，由Railway提供，是后端程序的地址
          );
          console.log(`${API_BASE_URL}/api/emissions/top/${topN}/${year}`);
          const data = await response.json();
          console.log("Top N emissions data:", data);
          if (Array.isArray(data.emissions)) {
            const features = data.emissions.map((e) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [e.longitude, e.latitude],
              },
              properties: {
                country: e.country,
                carbon_emission: e.carbon_emission,
              },
            }));
            map.current.getSource("top-emissions").setData({
              type: "FeatureCollection",
              features,
            });
          }
        } catch (err) {
          console.error("Failed to fetch top N emissions", err);
        }
      };
      fetchTopNEmissions();
    }
  }, [topN, year]);

  useEffect(() => {
    if (map.current) {
      map.current.getCanvas().blur(); // 让 canvas 失去焦点
    }
  }, []);

  const handleYearChange = (_, value) => setYear(value);

  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(playInterval.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playInterval.current = setInterval(() => {
        setYear((prev) => (prev < 2022 ? prev + 1 : 1960));
      }, 1000);
    }
  };

  const handleCloseChart = () => {
    setChartOpen(false);
    setChartData(null);
    setSelectedCountry("");
  };

  return (
    <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
      <Box
        ref={mapContainer}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 0,
        }}
      />

      {/* 底部控制条 */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(8, 18, 50, 0.6)",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 0",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom color="white">
          Year: {year}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", width: "90%" }}>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? (
              <Pause sx={{ color: "#fff" }} />
            ) : (
              <PlayArrow sx={{ color: "#fff" }} />
            )}
          </IconButton>
          <Slider
            value={year}
            min={1960}
            max={2022}
            step={1}
            marks
            valueLabelDisplay="auto"
            onChange={handleYearChange}
            sx={{
              color: "#fff",
              height: 20,
              width: "100%",
              ml: 2,
              "& .MuiSlider-markLabel": { color: "#ccc" },
              "& .MuiSlider-thumb": { color: "#ccc" },
              "& .MuiSlider-rail": { color: "#ccc" },
              "& .MuiSlider-track": { color: "#0E2453" },
              "& .MuiSlider-valueLabel": { color: "#ccc" },
            }}
          />
        </Box>
      </Box>
      <Legend
        labels={labels}
        colors={colors}
        sizes={sizes}
        sidebarOpen={sidebarOpen}
        type={legendType} // ✅ 动态图例类型
      />

      <CarbonEmissionChart
        open={chartOpen}
        onClose={handleCloseChart}
        country={selectedCountry}
        data={chartData || []}
      />
    </Box>
  );
}

export default CarbonEmissionMapContainer;
