import {buildingColoredZoomLevel} from '../../shared/utilities';

export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "my-buildings",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      1000,
      "#f28cb1",
      5000,
      "#09e836",
      10000,
      "#e8092e",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 1000, 40, 5000, 50, 10000, 60],
  },
};

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "my-buildings",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": ["step", ["get", "point_count"], 22, 100, 17, 1000, 17],
  },
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "my-buildings",
  filter: ["!", ["has", "point_count"]],
  maxzoom: buildingColoredZoomLevel,
  paint: {
    "circle-color": ["get", "feature_color"],
    "circle-radius": ["interpolate", ["linear"], ["zoom"], (buildingColoredZoomLevel-0.01), 12, buildingColoredZoomLevel, 0.1],
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

export const BuildingsLayer3D = {
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'type': 'fill-extrusion',
        'minzoom': buildingColoredZoomLevel,
        'paint': {
        'fill-extrusion-color': '#aaa',
         
        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'height']
        ],
        'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        ['zoom'],
        15,
        0,
        15.05,
        ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
        }
};

export const BuildingsLayer2D = {
  'id': 'add-2d-buildings',
  'source': 'composite',
  'source-layer': 'building',
  'type': 'fill',
  'minzoom': buildingColoredZoomLevel,
  'paint': {
    'fill-color': 'gray',
    'fill-opacity': 0.3
    }
};

export const BuildingsLayerColored = {
  'id': 'add-colored-buildings',
  'source': 'my-buildings-colored',
  'type': 'fill',
  'minzoom': buildingColoredZoomLevel,
  'paint': {
  'fill-color': ["get", "feature_color"],
  'fill-opacity': 0.6
  }
};

export const BuildingsLayerColoredMissing = {
  id: "add-colored-buildings-missings",
  type: "circle",
  minzoom: buildingColoredZoomLevel,
  source: "my-buildings",
  filter: ["all", ["!", ["has", "point_count"]], [">", ["get", "buildingCorrespondingDistance"], 99999]],
  paint: {
    "circle-color": ["get", "feature_color"],
    "circle-radius": 12,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};