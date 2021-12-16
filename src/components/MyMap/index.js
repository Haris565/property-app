import React, { useEffect, useRef, useState } from "react";
import { BuildingsLayerColored, BuildingsLayerColoredMissing, clusterCountLayer, clusterLayer, unclusteredPointLayer } from "./Layers";
import { getBuildings, pruneUnique, numFormatter, buildingColoredZoomLevel } from "../../shared/utilities";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxGeocoder from '!@mapbox/mapbox-gl-geocoder'
import buildingdata from './BuildingData.json'
import classes from "./index.module.css";
import {Card, Box, Backdrop, Button, Autocomplete, TextField} from '@mui/material'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PropPriceFilter from "../PropPriceFilter";
import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css'
import '../../../node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const MyMap = React.forwardRef((props, ref) => {
  const mapRef = useRef();
  const geocoderContainerRef = useRef();
  window.mapdata = buildingdata;
  pruneUnique(window.mapdata.features);
  var eventScheduled = null;
  var isDrawingBuildingColored = false;
  var dataColored = {
    "type": "FeatureCollection",
    "crs": {
      "type": "name",
      "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" }
    },
    "features": []};
  var filtersMap = {};
  const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGl4ZWxibG9jay1wYiIsImEiOiJja3VzZmxibjMwcnAyMm9vZDM5N2pkeTZuIn0.v23swpuxdhMzslDRyJqFtA";
  // const MapStyle = "mapbox://styles/pixelblock-pb/ckuvirr8v5b1f17mxkbp65dbq";
  const MapStyle = 'mapbox://styles/mapbox/light-v10';
  mapboxgl.accessToken = MAPBOX_TOKEN;
  var myMap = null;  
  const minPriceRange = 1000, maxPriceRange = 1000000;
  const minPriceDistance = 0.1*(maxPriceRange-minPriceRange);
  var [suburbs, setSuburbs] = useState([{"label":"Suburb 1"}, {"label":"Suburb 2"}]);
  var [myStateMap, setMyStateMap] = useState(null);
  var [openEditFilters, setOpenEditFilters] = useState(false);
  var [viewport, setViewport] = useState(null);
  const [priceRange, setPriceRange] = useState([minPriceRange, maxPriceRange-10]);
  const [suburbValue, setSuburbValue] = useState(null);
  var sliderTimer = null;
  var mapPopup = null;

  useEffect(()=>{
    if(myMap != null){
      myMap = myStateMap;
    } else {
      myMap = new mapboxgl.Map({
        container: mapRef.current,
        style: MapStyle,
        center:[151.4239862, -32.8050062],
        zoom: 15,
        bearing: 0,
        pitch: 0,
      });
      setMyStateMap(myMap);
    }
    
    myMap.on('load', (e)=>{
      const layers = myMap.getStyle().layers;
      const labelLayerId = layers.find(
      (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;
      var source = myMap.addSource("my-buildings", {
        type:'geojson',
        data: window.mapdata,
        cluster: true,
        clusterRadius:50
      });
      // var buildingLayer3D = source.addLayer({...BuildingsLayer3D}, labelLayerId);
      // var buildingLayer2D = source.addLayer({...BuildingsLayer2D}, labelLayerId);
      var mapClusterLayer = source.addLayer({...clusterLayer});
      var mapClusterCountLayer = source.addLayer({...clusterCountLayer});
      var mapUnClusteredPointLayer = source.addLayer({...unclusteredPointLayer});
      var buildingLayerColoredMissing = source.addLayer({...BuildingsLayerColoredMissing});
      
      var sourceColored = myMap.addSource('my-buildings-colored', {
        type:'geojson',
        data: dataColored,
      });
      var buildingLayerColored = sourceColored.addLayer({...BuildingsLayerColored});
      updateSuburbs();
    });
    
    myMap.on('idle', processEvent);
    myMap.on('click', 'add-colored-buildings', buildingClicked);
    myMap.on('click', 'add-colored-buildings-missings', buildingClicked);
    myMap.on('click', 'unclustered-point', buildingClicked);
    // myMap.on('sourcedata', processEvent);
    myMap.on('zoom', processEvent);
    myMap.on('move', processEvent);
    myMap.addControl(new mapboxgl.NavigationControl({showCompass:false}), 'bottom-right');
    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      // render: function (item) {
      //   // extract the item's maki icon or use a default
      //   const maki = item.properties.maki || 'marker';
      //   return `<div class='geocoder-dropdown-item'>
      //   <img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/${maki}-15.svg'>
      //   <span class='geocoder-dropdown-text'>
      //   ${item.text}
      //   </span>
      //   </div>`;
      //   },
      marker: true // Do not use the default marker style
    });
      myMap.addControl(geocoder);
    return ()=>{
      myMap.remove();
    };

  }, [ref]);

  const processEvent = (event) =>{
    var e = Object.assign({}, event);
    var eventType = e.type;
    var timeout = 100;
    if(eventType === 'idle') { timeout = 100; e.target.off('idle', processEvent);}
    if(!isDrawingBuildingColored)
    {
      if(eventScheduled === null){
        eventScheduled = setTimeout(()=>{drawColorBuildings(e)}, timeout);
      } else {
        clearTimeout(eventScheduled);
        eventScheduled = setTimeout(()=>{drawColorBuildings(e)}, timeout);
      }
    }
  }

  const buildingClicked = (e) => {
    var coordinates = [150, 30];
    var geometry = e.features[0].geometry;
    if(geometry.type.toLowerCase() == 'point')
      coordinates = geometry.coordinates.slice();
    else
      coordinates = geometry.coordinates[0][0].slice();
    
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    mapPopup = new mapboxgl.Popup({closeButton: false})
    .setLngLat(coordinates)
    .setHTML(buildPopup(e))
    .addTo(e.target);
  }

  const buildPopup = (e) => {
    var value = e.features[0];
    var html = '<img src="' + value.properties['feature_image'] + '" alt="Image not found" class="'+ classes.custom_popup_img +'"/>'+
      '<h5 class="' + classes.custom_popup_address + '">' + value.properties['feature_address'] + '</h5>' +
      '<p class="' + classes.custom_popup_description + '">' + value.properties['feature_description'] + '</p>';
    var ret = document.createElement('div');
    //ReactDOM.render(<img src={require(value.properties['feature-image'])} alt={"Image not found"} className={"custom_popup_image"}></img>, ret);
    return(
      html
    );
  }

  const drawColorBuildings = (e) => {
    return;
    isDrawingBuildingColored = true;
    if(mapPopup)mapPopup.remove();
    var map = e.target;
    if(map && map.getZoom()>16){
      if (map.areTilesLoaded()) 
      {
        // console.log('at least one Tiles loaded!');
        var buildings = getBuildings(map, buildingColoredZoomLevel);
        dataColored.features.splice(0, dataColored.features.length);
        buildings.forEach(building => {
          if(building){
            if(building.layer || building.layer == null)
              delete building.layer;
            if(building.source || building.source == null)
              delete building.source;
            if(building.sourceLayer || building.sourceLayer == null)
              delete building.sourceLayer;
            if(building.state || building.state == null)
              delete building.state;
            dataColored.features.push(building);
          }
        });
        // console.log(dataColored.features);
        if(map.getSource('my-buildings-colored'))
          map.getSource('my-buildings-colored').setData(dataColored);
      }
    }
    isDrawingBuildingColored = false;
    clearTimeout(eventScheduled);
    eventScheduled = null;
  }

  const handlePriceRange = (event, newPriceRange, activeThumb) => {
    if (!Array.isArray(newPriceRange)) {
      return;
    }
    var newStart = minPriceRange;
    var newStop = maxPriceRange;
    if (activeThumb === 0) {
      newStart = Math.min(newPriceRange[0], priceRange[1] - minPriceDistance);
      newStop = priceRange[1];
      // setPriceRange([Math.min(newPriceRange[0], priceRange[1] - minPriceDistance), priceRange[1]]);
    } else {
      newStart = priceRange[0];
      newStop = Math.max(newPriceRange[1], priceRange[0] + minPriceDistance);
      // setPriceRange([priceRange[0], Math.max(newPriceRange[1], priceRange[0] + minPriceDistance)]);
    }
    if(newStop == maxPriceRange) newStop = newStop-10;
    setPriceRange([newStart, newStop]);
    if(sliderTimer != null){
      clearTimeout(sliderTimer);
    }
    sliderTimer = setTimeout(()=>{
      // filtersMap['price_range'] = [newStart, newStop];
      filterMapData();
    }, 300);
  };

  const handleSuburbChange = (event, newValue) => {
    setSuburbValue(newValue);
    // filtersMap['suburb_selected'] = [newValue];
    filterMapData();
  };

  const clearFilters = (event)=>{
    filtersMap = {};
    setPriceRange([minPriceRange, maxPriceRange - 10]);
    setSuburbValue([]);
    filterMapData();
  };

  const filterMapData = ()=>{
    // console.log(filtersMap);
    // console.log(window.mapdata);
    sliderTimer = null;
    var copiedData = JSON.parse(JSON.stringify(window.mapdata));
    // var copiedData = clone(data);
    if(filtersMap['price_range']!=null && filtersMap['price_range'].length==2){
      var startPrice = filtersMap['price_range'][0];
      var stopPrice = filtersMap['price_range'][1];
      copiedData['features'] = copiedData['features'].filter((feature)=>{
        return startPrice <= feature.properties['feature_price'] && feature.properties['feature_price'] <= stopPrice;
        // return feature.properties['feature_color'] !='grey';
      });
    }
    if(filtersMap['suburb_selected']!=null){
      var filterSuburb = filtersMap['suburb_selected'];
      copiedData['features'] = copiedData['features'].filter((feature)=>{
        return filterSuburb.includes(feature.properties['feature_suburb']);
      });
    }
    if(myMap != null){
      var myBuildings = myMap.getSource('my-buildings');
      if(myBuildings!=null)
        myBuildings.setData(copiedData);
    }
  };

  const toggleEditFilters = () => {
    if(openEditFilters){
      document.body.classList.remove(classes.filter_modal_open);
    } else {
      document.body.classList.add(classes.filter_modal_open);
    }
    setOpenEditFilters(!openEditFilters);
  };
  const onSelected = (viewport, item) => {
    this.setState({viewport});
    console.log('Selected: ', item)
  }

  const updateSuburbs = ()=>{
    fetch("https://www.homiee.a2hosted.com/api/v1/index.php/property/suburbs")
    .then((res)=>res.json())
    .then((json)=>{
        setSuburbs(json);
    });
    fetch('https://www.homiee.a2hosted.com/api/v1/index.php/property/listmap')
    .then(res => res.json())
    .then(json => {
      window.mapdata = json;
      pruneUnique(window.mapdata.features);
      window.mapdata.features.forEach(element=>{
        if(element.properties['buildingCorresponding'] != undefined && element.properties['buildingCorresponding'] != null){
          dataColored.features.push(JSON.parse(element.properties['buildingCorresponding']));
        }
      });
      if(myMap.getSource('my-buildings-colored'))
          myMap.getSource('my-buildings-colored').setData(dataColored);
      filterMapData();
    });
  }

  return (
    <div style={{ width: "100%" }}>
    <div ref={geocoderContainerRef} ></div>
    <div style={{ height: "80vh", width: "100%" }}>
      <div ref={(node) => {
      mapRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }} style={{height:"100%"}}/>
    </div>
    <div className={classes.min_filter_front}>
    <PropPriceFilter width={500} priceRange={priceRange} onChange={handlePriceRange} min={minPriceRange} max={maxPriceRange}></PropPriceFilter>
    {/* background:'#AA00AAAA' */}
    <Card sx={{display:'inline-block', height:"100px", cursor:'pointer'}} onClick={toggleEditFilters}>
        <span style = {{display:'inline-block', fontWeight:'bold', marginLeft:"20px", marginRight:"20px", marginTop:"40px"}}>Edit Filters</span>
    </Card>
    </div>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 , justifyContent:'right'}}
      open={openEditFilters}
      onClick={toggleEditFilters}
    >
      <Card sx={{position:'relative', height:"100%", width: "400px", overflow:'visible!important'}} onClick={(e)=>{e.stopPropagation()}}>
      <Box sx={{margin:'0px 0px 30px 0px'}}>
        <Button onClick={toggleEditFilters} style={{width:'20%'}}><HighlightOffIcon /></Button>
        <Box sx={{display:'inline-block', width:'60%'}}>
          <Box sx={{display:'flex'}} alignItems="center" justifyContent="center">
            Filters
          </Box>
        </Box>
      </Box>
      {/* <Box m='0 0 20px 40px' sx={{fontWeight:'normal'}}>
        Suburb:
      </Box> */}
      <Box style={{width:'100%'}} textAlign='center'>
      <Autocomplete 
        value={suburbValue}
        onChange={handleSuburbChange}
        id="suburb-filters"
        options={suburbs}
        sx={{ width: '80%', margin:'0 10%', my:'20px'}}
        renderInput={(params) => <TextField {...params} label="Suburb" />}
        ></Autocomplete>
        <PropPriceFilter width={340} priceRange={priceRange} onChange={handlePriceRange} min={minPriceRange} max={maxPriceRange}></PropPriceFilter>
        <Button sx={{my:'20px'}} startIcon={<CleaningServicesIcon />} onClick={clearFilters} fullWidth={true}>Clear Filters</Button>
        </Box>
        <Box sx={{width:'100%', position:'absolute', bottom:0}}>
          <Button startIcon={<HighlightOffIcon />} color='error' onClick={toggleEditFilters} fullWidth={true}>Close Filters</Button>
        </Box>
      </Card>
    </Backdrop>
    </div>
  );
});

// Grey = We dont have data
// Green = sold in the last 12 months
// Blue = sold in 1-3 years
// Orange = sold in 3-6 years
// Red = sold 6-10
// Black 10 years +


export default MyMap;
