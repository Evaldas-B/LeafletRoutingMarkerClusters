var map = L.map("map").setView([51, 0], 13);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);

var markers = L.markerClusterGroup();

markers.addLayer(L.marker([51, 0]));
markers.addLayer(L.marker([51, 0]));

L.Routing.control({
  show: false,
  addWaypoints: false,
  draggableWaypoints: false,
  fitSelectedRoutes: false,

  waypoints: [L.latLng(51, 0), L.latLng(51, 0.1)],
  lineOptions: {
    styles: [{ color: "green", opacity: 1, weight: 5 }],
  },
}).addTo(map);

map.addLayer(markers);
