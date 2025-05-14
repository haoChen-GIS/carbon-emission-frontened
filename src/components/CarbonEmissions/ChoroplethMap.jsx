import React, { useEffect, useRef } from "react";
import Legend from "../Map/Legend";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const ChoroplethMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // style: "mapbox://styles/delusion-haochen/clwubpfrt01by01r04kuhhwpz",
      center: [30, 30],
      zoom: 2,
      projection: "mercator",
    });

    map.current.on("load", () => {
      map.current.addSource("carbon-emissions", {
        type: "vector",
        url: "mapbox://delusion-haochen.b7g651zg",
      });

      map.current.addLayer({
        id: "carbon-fill",
        type: "fill",

        source: "carbon-emissions",
        "source-layer": "carbon_emissions_entity-5miyyl",
        paint: {
          "fill-color": [
            "case",
            ["!", ["has", "emissions_1960"]],
            "#cccccc",
            [">", ["coalesce", ["get", "emissions_1960"], -1], -1],
            [
              "interpolate",
              ["linear"],
              ["/", ["get", "emissions_1960"], 1000000],
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

      map.current.on("click", (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ["carbon-fill"],
        });
        console.log(features);
      });
    });
  }, []);

  // ✅ 图例数据（你可以根据实际色带调整）
  const labels = [
    "No data",
    "0–1 Mt",
    "1–10 Mt",
    "10–100 Mt",
    "100–1000 Mt",
    ">1000 Mt",
  ];
  const colors = [
    "#cccccc",
    "#ffffcc",
    "#ffeda0",
    "#feb24c",
    "#f03b20",
    "#bd0026",
  ];
  const sizes = [14, 14, 16, 18, 20, 22]; // 可选：根据色阶改变圆圈大小

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <div ref={mapContainer} style={{ height: "100%" }} />
      <Legend labels={labels} colors={colors} sizes={sizes} />
    </div>
  );
};

export default ChoroplethMap;
