var map;

$(function() {
  //add leaflet map and set maxview and minview;
  map = L.map('map').setView(new L.LatLng(-13.923404,-51.555177), 4);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  map._layersMaxZoom= 8;
  map._layersMinZoom= 2;

  // add locate button
  L.control.locate().addTo(map);

  // gets data to display and automatically codes in geolocation for data display
  var markersLayer;
  $.getJSON('json/geodata.json', function(data) {
    var options = {
      onEachFeature: onEachFeature
    };
    markersLayer = L.geoJson(null, options);
    markersLayer.addData(data);
    markersLayer.addTo(map);

    // add search control
    map.addControl( new L.Control.Search({
        layer: markersLayer,
        position: 'topleft',
        propertyName: 'Nome',
        marker: false
      }) 
    );
  });

  // set sidebar
  var sidebar = L.control.sidebar('sidebar', {
    position: 'right'
  });
  map.addControl(sidebar);

  //set sidebar content and hides about
  //each pin clicked will call the related .html available in the json file (Arquivo)
  function onEachFeature(feature, layer) {
    layer.on("click", function() {
      $("#sidebar").load(feature.properties.Arquivo);
      $(".about").hide();
      sidebar.show();
    }); //ends searchLayer
  }; //onEachFeature

  //for hiding the sidebar and showing the "about" div again
  map.on("click",function() {
    sidebar.hide();
    $(".about").show();
  });
}); //main function
