/**
 * Created by Mihalis on 10/5/2017.
 */



function show_offer_for_reservations(id)
{
    $("#reservations-"+id).show();
}
function view_on_map_reservations(lat, lon){

    var longitude = parseFloat(lon);
    var latitude = parseFloat(lat);
    var latLong = new google.maps.LatLng(latitude, longitude);

    res_map_pro.setCenter(latLong);
    res_map_pro.setZoom(18);

}

var res_map_pro=null;
function print_hidden_form_reservations(id, type, lat, lon, address, loctype, notes, qty, price, username) {

    if (lat !== "")
    {
        var myLatLng = {lat: parseFloat(lat), lng: parseFloat(lon)};

        if(res_map_pro===null)
            res_map_pro = new google.maps.Map(document.getElementById('reservations-map'), {
                zoom: 10,
                center: myLatLng
            });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: res_map_pro,
            title: 'priti appointment'
        });


    }
    if(address!=""){
        address_html="Location: <input type='text' name='addr' id='addr' disabled value='"+address+"'/><br/>";
    }


    html="<div id='reservations-"+id+"' class='not-displayed'>" +
        //"<form>" +
        "<input type='hidden' name='nid' id='nid' value='"+id+"' required/>" +
        "<input type='hidden' name='type' id='type' value='"+type+"' required/>" +
        "<div class='lefter'>Quantity:</div> <input class='righter' type='text' name='qty' id='qty' disabled value='"+qty+"'/><br/>" +
        "<div class='lefter'>Location:</div> <input class='righter'  type='text' name='loct' id='loct' disabled value='"+loctype+"'/><br/>" +
        "<div class='lefter'>Special Requests:</div> <input class='righter'  type='text' name='loct' id='loct' disabled value='"+notes+"'/><br/>" +
        "<div class='lefter'>With:</div> <input class='righter'  type='text' name='usr' id='usr' disabled value='"+username+"'/><br/>" +
        "<div class='lefter'>Price(&euro;):</div> <input class='righter'  type='text' name='price' id='price' value='"+price+"' placeholder='price' disabled/><br/>" +
        "<textarea id='notes' name='notes' rows='5' style='display:none;'/>" +
        "<button id='submit' style='width: 130px;'  class='ui-btn ui-icon-location ui-btn-icon-left ui-shadow ui-corner-all' onclick='view_on_map_reservations("+lat+","+ lon+")'>On Map</button><br/>" +
        //"</form>" +
        "</div>";

    return html;
}

    function fetch_prof_appointments(id)
    {
        var queryString=getDomain()+getProfessionalAppointments()+"?uid="+id;
        $.getJSON(queryString, function (results)
        {
            var inner_html="";
            results.forEach(function(item, index){

                var d1 = new Date();
                d1.setHours(0,0,0,0);
                var d2 = new Date(item.appointment.date);
                if(d2>=d1)
                {

                    var month = d2.getMonth()+1; // month (in integer 0-11)
                    var year = d2.getFullYear(); // year
                    var day = d2.getUTCDate();

                    item.appointment.date=day+"/"+month+"/"+year;

                    inner_html+="<div class='appoint' id='appoint-"+item.appointment.id+"'><button id='submit'  class='ui-btn ui-icon-eye ui-btn-icon-left ui-shadow ui-corner-all'" +
                        " onclick='show_offer_for_reservations(" + item.appointment.id + ")' " +
                        "data-role='button' data-icon='plus'>"
                        +item.appointment.type+" on "+item.appointment.date+" at "
                        +item.appointment.time+//" status: "+item.appointment.app_status+
                        "</button>"+ print_hidden_form_reservations(item.appointment.id, item.appointment.type,item.appointment.latitude, item.appointment.longitude
                        ,item.appointment.address, item.appointment.loctype,item.appointment.notes, item.appointment.qty, item.appointment.price, item.appointment.username
                )+"<button id='cancel' onclick='cancel_appointment("+item.appointment.id+","+getID()+")' " +
                        "data-role='button' class='ui-btn ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all'  data-icon='minus'>Cancel</button>"+
                        "<div id='placeholder-for-"+item.appointment.id+"'></div></div>";


                        //get_offers_for(item.appointment.id);

                        var startDate=new Date(item.appointment.date+"T"+item.appointment.time+":00Z");
                        var endDate=startDate.addHours(2);
                        var eventLocation = "Mykonos";

                    window.plugins.toast.show('Syncing reservations with your phone\'s calendar',
                        'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

                    window.plugins.calendar.createEvent(item.appointment.type,eventLocation,null,startDate,endDate,success_event_add,error_in_event_add);

                }

            });
            $("#my-reservations").html(inner_html);

        }).fail(function (jqXHR) {
        });
    };


var error_in_event_add = function(message) { console.log("Error while attempting to add appointments to calendar, please check your settings!"); };

function success_event_add(){}

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}

function cancel_appointment(nid, uid)
{
    var queryString=getDomain()+getCancelOffer()+"?nid="+nid+"&uid="+uid;

    $.getJSON(queryString, function (results)
    {
        window.plugins.toast.showShortBottom("Appointment was cancelled successfully!");
    }).fail(function (jqXHR) {
    });
    window.location="#menu_prof";
    window.plugins.toast.show('Appointment has been cancelled', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
};


function get_offers_for(id)
{
    var queryString=getDomain()+getAppointmentOffers()+"?nid="+id;

    $.getJSON(queryString, function (results)
    {
        try {
            var html = "<button id='submit' data-role='button' data-icon='cloud' " +
                "onclick='show_for(" + id + ")'>Offers (" + results.length + ")</button>" +
                "<div id='offers-for-" + id + "' class='not-displayed'>";

            results.forEach(function(item, index){
                html += "<div id='offer-"+item.offer.id+"'>" +
                    //"<form>" +
                    "<input type='hidden' name='nid' id='nid' value='" + item.offer.id + "' required/>" +
                    "<input type='hidden' name='appid' id='appid' value='" + id + "' required/>" +
                    "Price(&euro;): <input type='text' value='"+item.offer.price+"' name='price' id='price' placeholder='price' disabled/>" +
                    "Est. Time: <input type='text' value='"+item.offer.time+"'  name='time' id='time' disabled/>" +
                    "Notes: <textarea id='notes' value='"+item.offer.notes+"'  name='notes' rows='5' disabled>"+item.offer.notes+"</textarea>" +
                    "<button id='submit' data-role='button' data-icon='cloud'" +
                    " onclick='accept_offer(" + item.offer.id + ")'>Accept</button>" +
                    //"</form>" +
                    "</div>";
            });

            html+= "</div>";

            $("#placeholder-for-"+id).html(html);

            return html;
        }
        catch(err){}

    }).fail(function (jqXHR) {
        return "";
    });

}

function accept_offer(nid)
{
    uid=localStorage.getItem("id");
    nid=$("#offer-"+nid+" #nid").val();
    appid=$("#offer-"+nid+" #appid").val();

    var queryString=getDomain()+getOfferAccept()+"?offerid="+nid+
        "&appid="+appid;
    $.getJSON(queryString, function (results)
    {
        console.log(queryString);

    }).fail(function (jqXHR) {
    });

    window.plugins.toast.show('Offer Accepted!', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
}

function show_for(id)
{
    $("#offers-for-"+id).show();
}
