var map = L.map("map").setView([51, 0], 13);
map.on("click", onMapMouseClick);

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

// Marker styles
var blankMarker = L.icon({
  iconUrl: "markers/blackMarker.svg",
  iconSize: [0, 0],
  iconAnchor: [0, 0],
});

var regularMarker = L.icon({
  iconUrl: "markers/blackMarker.svg",
  iconSize: [50, 100],
  iconAnchor: [25, 75],
});

var aMarker = L.icon({
  iconUrl: "markers/greenMarker.svg",
  iconSize: [50, 100],
  iconAnchor: [25, 75],
});

var bMarker = L.icon({
  iconUrl: "markers/redMarker.svg",
  iconSize: [50, 100],
  iconAnchor: [25, 75],
});

var pointA = L.latLng(51, 0);
var pointB = L.latLng(51, 0.1);

var pointA1 = L.latLng(51.3, 0);
var pointB1 = L.latLng(51, 0.5);

var pointA2 = L.latLng(51.2, 0.1);
var pointB2 = L.latLng(51.1, 0.2);

var markersCluster = L.markerClusterGroup();
var markers = [];

marker = createMarker(pointA, pointB);
markers.push(marker);
markersCluster.addLayer(marker);

marker = createMarker(pointA1, pointB1);
markers.push(marker);
markersCluster.addLayer(marker);

marker = createMarker(pointA2, pointB2);
markers.push(marker);
markersCluster.addLayer(marker);

map.addLayer(markersCluster);

function onMarkerMouseOver(e) {
  addToMap(e.target);
}
function onMarkerMouseOut(e) {
  removeFromMap(e.target);
}
function onMarkerMouseClick(e) {
  // Deactivate all other routes
  for (let i = 0; i < markers.length; i++) {
    // Prevent from removing marker that is clicked
    if (e.target._leaflet_id !== markers[i]._leaflet_id) {
      markers[i].options.options.routeActive = false;
      removeFromMap(markers[i]);
    }
  }
  e.target.options.options.routeActive = true;
  addToMap(e.target);
}

function onMapMouseClick(e) {
  // Remove all routes
  for (let i = 0; i < markers.length; i++) {
    markers[i].setIcon(regularMarker);
    markers[i].options.options.route.remove();
  }
}

function createMarker(pointA, pointB) {
  marker = L.marker(pointA, {
    icon: regularMarker,
    options: {
      route: createRoute(pointA, pointB),
      routeActive: false,
    },
  });

  marker.on("mouseover", onMarkerMouseOver);
  marker.on("mouseout", onMarkerMouseOut);
  marker.on("click", onMarkerMouseClick);
  return marker;
}

function createRoute(pointA, pointB) {
  route = L.Routing.control({
    show: false,
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,

    waypoints: [pointA, pointB],
    lineOptions: {
      styles: [{ color: "green", opacity: 1, weight: 5 }],
    },
    createMarker: function (i, wp, nWps) {
      if (i === 0) {
        // First marker
        return L.marker(wp.latLng, {
          icon: blankMarker,
        });
      } else {
        // Last marker
        return L.marker(wp.latLng, {
          icon: bMarker,
        });
      }
    },
  });

  return route;
}
function addToMap(marker) {
  // Check if route is already displayed on the map
  if (!marker.options.options.route._map) {
    marker.setIcon(aMarker);
    marker.options.options.route.addTo(map);
  }
}
function removeFromMap(marker) {
  if (marker.options.options.routeActive === false) {
    marker.setIcon(regularMarker);
    marker.options.options.route.remove();
  }
}
