import 'file?name=vendor/[name].[ext]!leaflet.markercluster/dist/leaflet.markercluster.js';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

document.addEventListener("DOMContentLoaded", function() {
  const mapEl = document.getElementById('main-map');

  if (mapEl) {
    const tonerUrl = "http://{S}tile.stamen.com/toner-lite/{Z}/{X}/{Y}.png";

    const url = tonerUrl.replace(/({[A-Z]})/g, s => s.toLowerCase());

    const leafmap = L.map('main-map', { center: [32.34944, -64.72444], zoom: 2 });

    const basemap = L.tileLayer(url, {
      subdomains: ['', 'a.', 'b.', 'c.', 'd.'],
      minZoom: 0,
      maxZoom: 20,
      type: 'png',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
    });

    basemap.addTo(leafmap);

    const markers = L.markerClusterGroup();
    let markerList = [];

    fetch('/api/v1/locations.json').then(function(response) {
      return response.json();
    }).then(function(json) {
      const locationArray = json.locations;

      for (var i=0; i < locationArray.length; i++) {
        const loc = locationArray[i];
        const title = `${loc.settlement}, ${loc.region}, ${loc.country}`;
        const marker = L.marker(L.latLng(loc.lat, loc.lon), { title: title });
        marker.bindPopup(title);
  			markerList.push(marker);

        markers.addLayers(markerList);
      	leafmap.addLayer(markers);
      }
    });
  }

});
