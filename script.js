// Initialize the Leaflet map 
var map = L.map('map').setView([37.7, -122.4], 10);

// Add a tile layer from ArcGIS
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Esri, HERE, Garmin, © OpenStreetMap',
    maxZoom: 16
}).addTo(map);

// Load GeoJSON data for San Francisco crimes
$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/sf_crime.geojson", function(data) {
    var crimeIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616569.png',
        iconSize: [60, 60]
    });

    // Create GeoJSON layer with custom markers
    var crime = L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var marker = L.marker(latlng, {icon: crimeIcon});

            // Bind a popup to the marker 
            if (feature.properties && feature.properties.description) {
                marker.bindPopup(feature.properties.description);
            }
            return marker;
        }
    });

    // Create a marker cluster group
    var clusters = L.markerClusterGroup();
    clusters.addLayer(crime);
    map.addLayer(clusters);
});
