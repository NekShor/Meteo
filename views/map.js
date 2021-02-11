const accessToken = 'xu8KmS8yKi2LjwF8nb3P4RHh2BwDsVwXhORq3eZav52ui2327pW5h7NwaSheZyRG';
const map = L.map('map').setView([49.38173668148508, 1.0739455034193934], 12);
L.tileLayer(
    `https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}.png?access-token=${accessToken}`, {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
    maxZoom: 10
}
).addTo(map);

// This add a marker with the default icon
const marker = L.marker([49.38173668148508, 1.0739455034193934]).addTo(map);
marker.bindPopup('<b>Sonde du Cesi</b>');