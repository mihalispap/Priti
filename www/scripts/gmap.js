/**
 * Created by Mihalis on 20/6/2017.
 */

var map;

function onMapLongClick(latitude, longitude) {
    //alert("Map is long clicked.\n" + latLng.toUrlValue()+latLng.latitude);

    map.animateCamera({
        target: {lat: 37.44529, lng: 25.32872},
        zoom: 12,
        tilt: 60,
        bearing: 140,
        duration: 10
    }, function() {

        // Add a maker
        map.addMarker({
            position: {lat: latitude, lng: longitude},
            title: "Your Position",
            snippet: "Your Position",
            animation: plugin.google.maps.Animation.BOUNCE
        }, function(marker) {

            // Show the info window
            marker.showInfoWindow();

            // Catch the click event
            marker.on(plugin.google.maps.event.INFO_CLICK, function() {

                // To do something...

            });
        });
    });

}

var user_map=null;

function getPosition() {

    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    }

    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {

        /*alert('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');*/

        var latLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var marker = new google.maps.Marker({
            position: latLong,
            map: user_map,
            title: 'my location'
        });

        user_map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        google.maps.event.addListener(user_map, 'dblclick', function(e) {
            var positionDoubleclick = e.latLng;
            var latLong = e.latLng;//new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            console.log(e);

            var marker = new google.maps.Marker({
                position: latLong,
                map: user_map,
                title: 'my location',
                zoom:15
            });


            $("#latitude").val(e.latLng.lat());
            $("#longitude").val(e.latLng.lng());
        });

//var marker = new google.maps.Marker({position: myLatlng,map: map});
        $("#latitude").val(position.coords.latitude);
        $("#longitude").val(position.coords.longitude);
        if(true) return;







        map.animateCamera({
            target: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 16,
            tilt: 60,
            bearing: 140,
            duration: 5000
        }, function() {

            // Add a maker
            map.addMarker({
                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                title: "Your Position",
                snippet: "Your Position",
                animation: plugin.google.maps.Animation.BOUNCE
            }, function(marker) {

                // Show the info window
                marker.showInfoWindow();

                // Catch the click event
                marker.on(plugin.google.maps.event.INFO_CLICK, function() {

                    // To do something...

                });
            });

        });

        $("#latitude").val(position.coords.latitude);
        $("#longitude").val(position.coords.longitude);

        //alert( $("#latitude").val());
        return false;

    };

    function onError(error) {
        alert(error.message + '\n');
        return false;
    }
}

function onMapReady() {

    //alert("Map is ready!");

    /*map.animateCamera({
        target: {lat: 37.44529, lng: 25.32872},
        zoom: 12,
        tilt: 60,
        bearing: 140,
        duration: 5000
    }, function() {

        // Add a maker
        map.addMarker({
            position: {lat: 37.44529, lng: 25.32872},
            title: "Your Position",
            snippet: "Your Position",
            animation: plugin.google.maps.Animation.BOUNCE
        }, function(marker) {

            // Show the info window
            marker.showInfoWindow();

            // Catch the click event
            marker.on(plugin.google.maps.event.INFO_CLICK, function() {

                // To do something...

            });
        });
    });*/

    //$("#latitude").val(37.44529);
   //$("#longitude").val(25.32872);




    //map.on(plugin.google.maps.event.MAP_LONG_CLICK, onMapLongClick);



}

function onBtnClicked() {
    map.showDialog();
}