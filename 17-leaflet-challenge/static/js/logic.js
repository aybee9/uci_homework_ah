var earthquake_map;

buildMap()
// get data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
  // setStyle function definition
  function setStyle(dataFeatures) {
    return { opacity: 1, fillOpacity: 1,
       // pass co-ordinates to findCircleColor
      fillColor: findCircleColor(dataFeatures.geometry.coordinates[2]),color: "#000000",
      // pass magnitude to setCircleRadius function
      radius: setCircleRadius(dataFeatures.properties.mag), 
      stroke: true,weight: 0.5
    };
  }
  // findCircleColor function to return color according to depth  
  function findCircleColor(depth) {
     if(depth > 90){ return "red"; }
     else if(depth > 70){  return "darkorange"; }
     else if(depth > 50){  return "orange"; }
     else if(depth > 30){  return "yellow"; }
     else if(depth > 10){  return "green"; }
     else {  return "lightgreen"; }
  }
  // setCircleRadius function finds marker radius based on magnitude.  
  function setCircleRadius(_mag) {
    if (_mag === 0) { return 1;}
     return _mag * 4;
     }
  
  L.geoJson(data, {  pointToLayer: function(dataFeatures, latlng) {return L.circleMarker(latlng); },
    style: setStyle, //  set the style of circleMarker using setStyle function.
  // show pop-up onclick 
    onEachdataFeatures: function(dataFeatures, layer) {
      layer.bindPopup( "Magnitude: " + dataFeatures.properties.mag  + "<br>Depth: "
          + dataFeatures.geometry.coordinates[2] + "<br>Location: " + dataFeatures.properties.place );}
  })
  .addTo(earthquake_map);
  // create legend 
  var mapLegend = L.control({ position: "bottomright" });
  // info for legend
  mapLegend.onAdd = function() {
    var newDiv = L.DomUtil.create("div", "info legend");
    var grades = [-10, 10, 30, 50, 70, 90];
    var markerColors = ["lightgreen","green","yellow","orange","darkorange","red"];

    // loop through intervals to generate label with colored square
    for (var i = 0; i < grades.length; i++) {
      newDiv.innerHTML += "<i style='background: " + markerColors[i] + "'></i> " + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");} return newDiv;
     };
  // show legend 
  mapLegend.addTo(earthquake_map);
});
// buildMap() function definitions, will create backgrouund tileLayer of generated map 
function buildMap(){
  var mapyLayer = L.tileLayer( "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:"© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512, maxZoom: 18,zoomOffset: -1,
      id: "mapbox/light-v10", accessToken: API_KEY
    }
  );
  //map object 
    earthquake_map = L.map("mapid", { center: [ 39.6, -93.4],
    zoom: 1
  });
  // adding mapyLayer in the map
  mapyLayer.addTo(earthquake_map);}