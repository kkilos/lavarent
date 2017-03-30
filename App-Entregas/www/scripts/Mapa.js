(function ($) {

    $.fn.Mapa = function (opciones) {
        var configuracionDefacto = {
            divMapa: '',
            geolocaliza : true,
            latitud: 0,
            longitud: 0
        };

        var opciones = $.extend(configuracionDefacto, opciones);
        var Latitude = undefined;
        var Longitude = undefined;

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var labelIndex = 0;
        var banderaMarcadorInicial = true;


        var onSuccess = function (position) {
            opciones.latitud = position.coords.latitude;
            opciones.longitud = position.coords.longitude;
            $("#lat").text("" + opciones.latitud);
            $("#lon").text("" + opciones.longitud);

            //var map = new GMaps({
            //    div: opciones.divMapa,
            //    lat: opciones.latitud,
            //    lng: opciones.longitud,
            //});
            //map.addMarker({
            //    lat: opciones.latitud,
            //    lng: opciones.longitud,
            //    title: 'tu localizacion',
            //    click: function (e) {
            //        if (console.log) console.log(e);
            //        alert('You clicked in this marker');
            //    }
            //});
            //map.setZoom(15);

            var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var opcions = { center: coords, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP };

            var mapa = new google.maps.Map(document.getElementById("map"), opcions);

            var marcador = new google.maps.Marker({
                position: coords,
                map: mapa,
                title: ":D",
                animation: google.maps.Animation.DROP
            });
        }

        var  onError =  function(err) {
            console.log("fallo el API Google Maps, codigo de err:" + err.code + "  msj=" + err.message);
        }

        var fnPrivateGeolocaliza = function ($this) {
            //GMaps.geolocate({
            //    success: function (position) {
            //        onSuccess(position);
            //    },
            //    error: function (error) {
            //        onError(error);
            //    },
            //    not_supported: function () {
            //        alert("Your browser does not support geolocation");
            //    },
            //    always: function () {
            //        //alert("Geolocation Done!");
            //    }
            //});
            banderaMarcadorInicial = true;
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximunAge: 300000, timeout: 10000, enableHighAccuracy: true });
           
        };


        var onMapSuccess = function (position) {

            Latitude = position.coords.latitude;
            Longitude = position.coords.longitude;

            $("#lat").text("" + Latitude);
            $("#lon").text("" + Longitude);

            getMap(Latitude, Longitude);

        }

        function getMap(latitude, longitude) {

            var mapOptions = {
                center: new google.maps.LatLng(0, 0),
                zoom: 1,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map
            (document.getElementById("map"), mapOptions);


            var latLong = new google.maps.LatLng(latitude, longitude);

            var marker = new google.maps.Marker({
                position: latLong
            });

            marker.setMap(map);
            map.setZoom(15);
            map.setCenter(marker.getPosition());

            google.maps.event.addListener(map, 'click', function (event) {
                addMarker(event.latLng, map);
            });
        }
        var presitionMarker; 
        function addMarker(location, map) {
            // Add the marker at the clicked location, and add the next-available label
            // from the array of alphabetical characters.
            if (banderaMarcadorInicial) {
                presitionMarker = new google.maps.Marker({
                    position: location,
                    //label: labels[labelIndex++ % labels.length],
                    map: map,
                    icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                });
                banderaMarcadorInicial = false;
            }
            else {
                presitionMarker.setPosition(location);
            }

        }

        // Success callback for watching your changing position



        var onMapWatchSuccess = function (position) {

            var updatedLatitude = position.coords.latitude;
            var updatedLongitude = position.coords.longitude;

            if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

                Latitude = updatedLatitude;
                Longitude = updatedLongitude;

                getMap(updatedLatitude, updatedLongitude);
            }
        }

        // Error callback

        function onMapError(error) {
            console.log('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        // Watch your changing position

        function watchMapPosition() {

            return navigator.geolocation.watchPosition
            (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
        }



        var fnPrivateDespliegaMapa = function ($this) {

            navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, { enableHighAccuracy: true });
            //if (opciones.geolocaliza) {
            //    fnPrivateGeolocaliza($this);
            //}
            //else {
            //    $("#lat").text("" + opciones.latitud);
            //    $("#lon").text("" + opciones.longitud);
            //}

            //var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            //var opciones = { center: coords, zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP };

            //var mapa = new google.maps.Map(document.getElementById("map"), opciones);

            //var marcador = new google.maps.Marker({
            //    position: coords,
            //    map: mapa,
            //    title: ":D",
            //    animation: google.maps.Animation.DROP
            //});
        }

        return this.each(function () {

            var $this = $(this);

            fnPrivateDespliegaMapa($this);

            return $this;
        });
    };





})(jQuery);
