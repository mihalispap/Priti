var inner_html;

function fetch_appointments_on_interests(id)
{
    inner_html="";

    showSpinner();

    var queryString=getDomain()+getUserInterestedAppointments()+"?uid="+id;
    $.getJSON(queryString, function (results)
    {

        console.log(results);

        results.forEach(function(item, index){

            var get_posted=getDomain()+getServiceProfessionals()+"?nid="+item.appointment.id+
                "&uid="+localStorage.getItem("id");

            $.getJSON(get_posted, function (results_inner)
            {
                try
                {
                    var found=false;

                    //console.log(results_inner);

                    if (results_inner[0].user.id !== null && results_inner[0].user.id !== undefined
                        && results_inner.length!==0) {
                        found=true;
                        //console.log("got in here");
                    }
                    var d1 = new Date();
                    var d2 = new Date(item.appointment.date);

                    var month = d2.getMonth()+1; // month (in integer 0-11)
                    var year = d2.getFullYear(); // year
                    var day = d2.getUTCDate();

                    item.appointment.date=day+"/"+month+"/"+year;

                    if(d2>=d1 && item.appointment.app_status!=="assigned")
                        inner_html += "<div id='appoint-" + item.appointment.id + "'><button id='submit' class='ui-btn ui-icon-eye ui-btn-icon-left ui-shadow ui-corner-all'" +
                            " onclick='show_offer_for(" + item.appointment.id + ")' " +
                            "data-role='button' data-icon='plus'>"
                            + item.appointment.type + " on " + item.appointment.date + " at "
                            + item.appointment.time +
                            "</button>"
                            + print_hidden_form(item.appointment.id, item.appointment.type,item.appointment.latitude, item.appointment.longitude
                                ,item.appointment.address, item.appointment.loctype,item.appointment.notes, item.appointment.qty
                            ) + "</div>";
                        /*inner_html += "<div id='appoint-" + item.appointment.id + "'>"
                            + item.appointment.type + " on " + item.appointment.date + " at "
                            + item.appointment.time +
                            "<button id='submit' class='ui-btn ui-icon-eye ui-btn-icon-left ui-shadow ui-corner-all'" +
                            " onclick='show_offer_for(" + item.appointment.id + ")' " +
                            "data-role='button' data-icon='plus'>View</button>"
                            + print_hidden_form(item.appointment.id, item.appointment.type,item.appointment.latitude, item.appointment.longitude
                                ,item.appointment.address, item.appointment.loctype,item.appointment.notes, item.appointment.qty
                            ) + "</div>";*/

                    $("#requests").html(inner_html);
                }
                catch(err){
                    //console.log("in here");

                    var d1 = new Date();
                    var d2 = new Date(item.appointment.date);

                    var month = d2.getMonth()+1; // month (in integer 0-11)
                    var year = d2.getFullYear(); // year
                    var day = d2.getUTCDate();

                    item.appointment.date=day+"/"+month+"/"+year;

                    if(d2>d1 && item.appointment.app_status!=="assigned") {
                        inner_html += "<div id='appoint-" + item.appointment.id + "'><button id='submit'  class='ui-btn ui-icon-eye ui-btn-icon-left ui-shadow ui-corner-all' onclick='show_offer_for(" + item.appointment.id + ")' " +
                            "data-role='button' data-icon='plus'>"
                            + item.appointment.type + " on " + item.appointment.date + " at "
                            + item.appointment.time +
                            "</button>"
                            + print_hidden_form(item.appointment.id, item.appointment.type, item.appointment.latitude, item.appointment.longitude
                                , item.appointment.address, item.appointment.loctype, item.appointment.notes, item.appointment.qty, item.appointment.username
                            ) + "</div>";
                    }
                        /*inner_html += "<div id='appoint-" + item.appointment.id + "'>"
                            + item.appointment.type + " on " + item.appointment.date + " at "
                            + item.appointment.time +
                            "<button id='submit'  class='ui-btn ui-icon-eye ui-btn-icon-left ui-shadow ui-corner-all' onclick='show_offer_for(" + item.appointment.id + ")' " +
                            "data-role='button' data-icon='plus'>View</button>"
                            + print_hidden_form(item.appointment.id, item.appointment.type,item.appointment.latitude, item.appointment.longitude
                                                ,item.appointment.address, item.appointment.loctype,item.appointment.notes, item.appointment.qty
                            ) + "</div>";*/

                    $("#requests").html(inner_html);
                }

                hideSpinner();
            }).fail(function (jqXHR) {
                console.log("error");
            });

        });
    }).fail(function (jqXHR) {
    });

    hideSpinner();
};

var req_map_prof=null;

function print_hidden_form(id, type, lat, lon, address, loctype, notes, qty, username) {

    if (lat !== "")
    {
        var myLatLng = {lat: parseFloat(lat), lng: parseFloat(lon)};

        if(req_map_prof===null)
            req_map_prof = new google.maps.Map(document.getElementById('requests-map'), {
                zoom: 10,
                center: myLatLng
            });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: req_map_prof,
            title: 'priti open request'
        });


    }
    if(address!=""){
        address_html="Location: <input type='text' name='addr' id='addr' disabled value='"+address+"'/><br/>";
    }


    html="<div id='submit-offer-"+id+"' class='not-displayed'>" +
            //"<form>" +
            "<input type='hidden' name='nid' id='nid' value='"+id+"' required/>" +
            "<input type='hidden' name='type' id='type' value='"+type+"' required/>" +
            "<div class='lefter'>Quantity:</div> <input class='righter'  type='text' name='qty' id='qty' disabled value='"+qty+"'/><br/>" +
            "<div class='lefter'>Location:</div> <input class='righter'  type='text' name='loct' id='loct' disabled value='"+loctype+"'/><br/>" +
            "<div class='lefter'>Special Requests:</div> <input class='righter'  type='text' name='loct' id='loct' disabled value='"+notes+"'/><br/>" +
            "<div class='lefter'>With:</div> <input class='righter'  type='text' name='usr' id='usr' disabled value='"+username+"'/><br/>" +
            "<div class='lefter'>Price(&euro;):</div> <input class='righter'  type='text' name='price' id='price' placeholder='price' required/><br/>" +
            "<div class='lefter'>Est. Time(mins):</div> <input class='righter'  type='text' name='time' id='time' required/><br/>" +
            "<button id='submit' style='width: 130px;' class='ui-btn ui-icon-location ui-btn-icon-left ui-shadow ui-corner-all'  onclick='view_on_map("+lat+","+ lon+")'>On Map</button><br/>" +
            "<textarea id='notes' name='notes' rows='5' style='display:none;'/>" +
            "<button id='submit' class='ui-btn ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all' " +
        "data-role='button' data-icon='cloud' onclick='submit_offer("+id+")'>Send your Offer</button>" +
            //"</form>" +
        "</div>";

    return html;
}

function view_on_map(lat, lon){

    var longitude = parseFloat(lon);
    var latitude = parseFloat(lat);
    var latLong = new google.maps.LatLng(latitude, longitude);

    req_map_prof.setCenter(latLong);
    req_map_prof.setZoom(17);
}

function submit_offer(nid)
{
    uid=localStorage.getItem("id");
    price=$("#submit-offer-"+nid+" #price").val();
    time=$("#submit-offer-"+nid+" #time").val();
    notes=$("#submit-offer-"+nid+" #notes").val();
    type=$("#submit-offer-"+nid+" #type").val();

    if(price==="")
    {
        alert('Please input a price!');
        return;
    }

    var queryString=getDomain()+getPostServices()+"?uid="+uid+"&nid="+nid+
        "&price="+price+"&time="+time+"&notes="+encodeURI(notes)+"&type="+encodeURI(type);
    $.getJSON(queryString, function (results)
    {
        console.log(queryString);
        window.plugins.toast.showShortBottom("Offer was successfully posted!");

    }).fail(function (jqXHR) {
    });
    window.plugins.toast.show('Offer submited!', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    window.location="#menu_prof";
};

function show_offer_for(id)
{
    $("#submit-offer-"+id).show();
}