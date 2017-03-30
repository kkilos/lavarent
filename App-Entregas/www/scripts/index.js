// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        //// TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        
       // getDatos();


    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function getDatos() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximunAge: 300000, timeout: 10000, enableHighAccuracy: true });
    };


    function onSuccess(position) {
        var latitud = document.getElementById("lat");
        var longitud = document.getElementById("lon");
        latitud.innerHTML = "" + position.coords.latitude;
        longitud.innerHTML = "" + position.coords.longitude;
        var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var opciones = { center: coords, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP };

        var mapa = new google.maps.Map(document.getElementById("map"), opciones);

        var marcador = new google.maps.Marker({
            position: coords,
            map: mapa,
            title: ":D",
            animation: google.maps.Animation.DROP
        });

    };

    function onError(err) {
        console.log("fallo el API Google Maps, codigo de err:" + err.code + "  msj=" + err.message);
    };

})();

$(document).ready(function () {
    App.init();
    
    $('#btnObtCoordenadas').click(function () {
        $('#map').Mapa({ divMapa: '#map' });
    });
});