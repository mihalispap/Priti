/**
 * Created by Mihalis on 10/5/2017.
 */

function getName()
{
    /*Connect with DB?*/
    return localStorage.getItem("name");
}

function getSurname()
{
    return localStorage.getItem("surname");
}

function getType()
{
    /*Connect with DB?*/
    return localStorage.getItem("type");
}

function getID()
{
    /*Connect with DB?*/
    return localStorage.getItem("id");
}

function getUsername()
{
    /*Connect with DB?*/
    return localStorage.getItem("username");
}

function logout()
{
    window.location="#index";

    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("surname");
    localStorage.removeItem("type");
    localStorage.removeItem("id");

    localStorage.clear();

}

function go_home(){
    if(getType()=="User")
        window.location="#menu_user";
    else if(getType()=="Professional")
        window.location="#menu_prof";
    else
        window.location="#index";
}


function showSpinner(){
    var options = { dimBackground: true };
    SpinnerPlugin.activityStart("Loading...", options);
}

function hideSpinner(){
    SpinnerPlugin.activityStop();
}

function open_my_profile(){

    showSpinner();

    window.location="#post_prof";

    $("#proname").val("");
    $("#prosurname").val("");
    $("#short-bio").val("");
    $("#social").val("");

    $('#post_prof_updates').click(post);
    generate_options();
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;

    hideSpinner();
}

function open_view_reservations(){
    window.location="#view_reservations";
    fetch_prof_appointments(localStorage.getItem("id"));
}

function open_open_requests(){
    window.location="#view_prof";
    fetch_appointments_on_interests(localStorage.getItem("id"));
}

var received_offer=false;

function open_new_request(){
    window.location="#post_user";
    $('#post_new_request').click(post_new_request);

    generate_new_request_options();

    var longitude = 25.32872;
    var latitude = 37.44529;
    var latLong = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: latLong,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    google.maps.event.addListener(map, 'dblclick', function(e) {
        var positionDoubleclick = e.latLng;
        var latLong = e.latLng;//new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        $("#latitude").val(e.latLng.lat());
        $("#longitude").val(e.latLng.lng());

        var marker = new google.maps.Marker({
            position: latLong,
            map: map,
            title: 'my location',
            zoom:18,
            draggable:true
        });
        google.maps.event.addListener(marker, 'dragend', function()
        {
            $("#latitude").val(marker.getPosition().lat());
            $("#longitude").val(marker.getPosition().lng());
        });
        google.maps.event.clearListeners(map, 'dblclick');
    });
    map.setCenter(latLong);
}

function open_my_requests(){
    window.location="#view_user";
    fetch_user_appointments(localStorage.getItem("id"));
}

function open_post_message(){
    $("#my-messages").html('');

    window.location="#post_message";

    if(getType()==="User")
        fetch_user_messages(localStorage.getItem("id"));
    else
        fetch_prof_messages(localStorage.getItem("id"));
}

function open_register(){
    window.location="#register_form";
    $('#register').click(register);
}

function open_login(){

    if(getType()==="User") {
        window.location = "#menu_user";
        showSpinner();
        setTimeout(hideSpinner(), 3000);
    }
    else if(getType()==="Professional") {
        window.location = "#menu_prof";
        showSpinner();
        setTimeout(hideSpinner(), 3000);
    }
    else
        window.location="#login";
}

function view_pro_profile(proid){

    window.location="#prof_profile";

    check_pchoices(proid);
    get_pprof_profile_pic(proid);
    get_psample_of_work1(proid);
    get_psample_of_work2(proid);
    get_psample_of_work3(proid);
    get_psample_of_work4(proid);
    get_psample_of_work5(proid);
}

var req_map;

function loadMapsApi(){

/*    var div = document.getElementById("map_canvas");
    document.getElementById("getPosition").addEventListener("click", getPosition);
    // Initialize the map view
    map = plugin.google.maps.Map.getMap(div);
    // Wait until the map is ready status.
    map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
*/
    document.getElementById("getPosition").addEventListener("click", getPosition);

    var longitude = 25.32872;
    var latitude = 37.44529;
    var latLong = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
        center: latLong,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    req_map = new google.maps.Map(document.getElementById("requests-map"), mapOptions);

    /*var marker = new google.maps.Marker({
        position: latLong,
        map: map,
        title: 'my location'
    });*/
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    google.maps.event.addListener(map, 'dblclick', function(e) {
        var positionDoubleclick = e.latLng;
        var latLong = e.latLng;//new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        $("#latitude").val(e.latLng.lat());
        $("#longitude").val(e.latLng.lng());

        var marker = new google.maps.Marker({
            position: latLong,
            map: map,
            title: 'my location',
            zoom:18,
            draggable:true
        });
        google.maps.event.addListener(marker, 'dragend', function()
        {
            $("#latitude").val(marker.getPosition().lat());
            $("#longitude").val(marker.getPosition().lng());
        });
        google.maps.event.clearListeners(map, 'dblclick');
    });
    map.setCenter(latLong);

    onMapReady();

    //map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

}

