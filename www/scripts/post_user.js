/**
 * Created by Mihalis on 10/5/2017.
 */

var user_map2;

function generate_new_request_options()
{

    var longitude = 25.32872;
    var latitude = 37.44529;
    var latLong = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: latLong,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    user_map2 = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    google.maps.event.addListener(user_map2, 'dblclick', function(e) {
        var positionDoubleclick = e.latLng;
        var latLong = e.latLng;//new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        $("#latitude").val(e.latLng.lat());
        $("#longitude").val(e.latLng.lng());

        var marker = new google.maps.Marker({
            position: latLong,
            map: user_map2,
            title: 'my location',
            zoom:18,
            draggable:true
        });
        google.maps.event.addListener(marker, 'dragend', function()
        {
            $("#latitude").val(marker.getPosition().lat());
            $("#longitude").val(marker.getPosition().lng());
        });
        google.maps.event.clearListeners(user_map2, 'dblclick');
    });
    map.setCenter(latLong);

    var queryString=getDomain()+getServiceTypes();
    $.getJSON(queryString, function (results)
    {
        var inner_html=""
        results.forEach(function(item, index){
            //inner_html+="<option value='"+item.service.name+"'>"+item.service.name+"</option>";
        });
        //$("#service-input").html(inner_html);

    }).fail(function (jqXHR) {
    });

    queryString=getDomain()+getLocationTypes();
    $.getJSON(queryString, function (results)
    {
        var inner_html=""
        results.forEach(function(item, index){
            //inner_html+="<option value='"+item.location.name+"'>"+item.location.name+"</option>";
            inner_html+="<input type='radio' name='loctype' value='"+item.location.name+"'/>"+item.location.name;
        });
        $("#loctype-input").html(inner_html);


        var longitude = 25.32872;
        var latitude = 37.44529;
        var latLong = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            center: latLong,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        user_map2 = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        google.maps.event.addListener(user_map2, 'dblclick', function(e) {
            var positionDoubleclick = e.latLng;
            var latLong = e.latLng;//new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            $("#latitude").val(e.latLng.lat());
            $("#longitude").val(e.latLng.lng());

            var marker = new google.maps.Marker({
                position: latLong,
                map: user_map2,
                title: 'my location',
                zoom:18,
                draggable:true
            });
            google.maps.event.addListener(marker, 'dragend', function()
            {
                $("#latitude").val(marker.getPosition().lat());
                $("#longitude").val(marker.getPosition().lng());
            });
            google.maps.event.clearListeners(user_map2, 'dblclick');
        });
        map.setCenter(latLong);

    }).fail(function (jqXHR) {
    });


    var longitude = 25.32872;
    var latitude = 37.44529;
    var latLong = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: latLong,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    user_map2 = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    google.maps.event.addListener(user_map2, 'dblclick', function(e) {
        var positionDoubleclick = e.latLng;
        var latLong = e.latLng;//new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        $("#latitude").val(e.latLng.lat());
        $("#longitude").val(e.latLng.lng());

        var marker = new google.maps.Marker({
            position: latLong,
            map: user_map2,
            title: 'my location',
            zoom:18,
            draggable:true
        });
        google.maps.event.addListener(marker, 'dragend', function()
        {
            $("#latitude").val(marker.getPosition().lat());
            $("#longitude").val(marker.getPosition().lng());
        });
        google.maps.event.clearListeners(user_map2, 'dblclick');
    });
    map.setCenter(latLong);
    //alert("reached this....");
}

function post_new_request()
{
    var date = $('#app-date-input').val();
    var time = $('#app-time-input').val();
    var participants = $('#participants-input').val();
    var notes = $('#notes-input').val();
    var uid=localStorage.getItem("id");
    var service = $('input[name=servicer]:checked').val();
    //var loctype = $('#loctype-input').val();
    var loctype = $('input[name=loctype]:checked').val();
    var notes = $('#notes-input').val();
    var latitude = $('#latitude').val();
    var longitude = $('#longitude').val();
    var address = $('#address-input').val();

    //alert(service+"|"+loctype);

    //console.log($('input[name=sevicer]'));

    //return;

    var queryString =
        getDomain()+getPostAppointment()+"?uid="+uid+"&date="+date
        +"&time="+time+"&participants="+participants
        +"&notes="+notes+"&type="+service+"&longitude="+longitude+"&latitude="+latitude
        +"&address="+address+"&loctype="+loctype;
    queryString=encodeURI(queryString);

    console.log(queryString);

    $.getJSON(queryString, function (results) {


    }).fail(function (jqXHR) {


    }).success(function (jqXHR) {
    });


    window.location="#search-pro";
    //showSpinner();
    setTimeout(cancel_request, (300000));
}

function cancel_request(){

    //hideSpinner();
    if(received_offer) {
        window.location="#menu_user";
        return;
    }
    window.location="#sorry";

    var queryString =
        getDomain()+getCancelRequest()+"?uid="+uid;
    $.getJSON(queryString, function (results) {
    }).fail(function (jqXHR) {
    }).success(function (jqXHR) {
    });

}
