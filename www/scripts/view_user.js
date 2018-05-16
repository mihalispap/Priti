
/**
 * Created by Mihalis on 10/5/2017.
 */


function cancel_appointmentu(nid, uid)
{
    var queryString=getDomain()+getCancelAppointments()+"?nid="+nid+"&uid="+uid;

    $.getJSON(queryString, function (results)
    {

    }).fail(function (jqXHR) {
    });

    window.location="#menu_user";
    window.plugins.toast.show('Appointment has been cancelled', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
};

function view_appointmentu(appid,uid){
    $("#appoint-"+appid+"-info").show();
}

function fetch_user_appointments(id)
{
    var queryString=getDomain()+getUserAppointments()+"?uid="+id;
    $.getJSON(queryString, function (results)
    {
        var inner_html=""
        results.forEach(function(item, index){

            var d1 = new Date();

            if(item.appointment.date!==null && item.appointment.date!=="") {
                var d2 = new Date(item.appointment.date);

                var month = d2.getMonth()+1; // month (in integer 0-11)
                var year = d2.getFullYear(); // year
                var day = d2.getUTCDate();

                item.appointment.date=day+"/"+month+"/"+year;
                if (d2 > d1) {
                    inner_html += "<button style='height: 60px;padding-top: 0px;' onclick='view_appointmentu(" + item.appointment.id + "," + getID() + ")' " +
                        "class='ui-btn ui-icon-eye ui-btn-icon-left ui-shadow ui-corner-all' data-role='button' data-icon='minus'>" +
                        "<div id='appoint-" + item.appointment.id + "' class='appointment'><h4>"
                        + item.appointment.type +"</h4></div></button>" +
                        "<div id='appoint-"+item.appointment.id+"-info' style='display:none;'>" +
                        "<div class='lefter'>Date:</div> <input class='righter'  type='text' name='loct' id='loct' disabled value='"+item.appointment.date+"'/><br/>" +
                        "<div class='lefter'>Time:</div> <input class='righter'  type='text' name='usr' id='usr' disabled value='"+item.appointment.time+"'/><br/>" +
                        "<div class='lefter'>Location:</div> <input class='righter'  type='text' name='loct' id='loct' disabled value='"+item.appointment.loctype+"'/><br/>" +
                        "<div class='lefter'>With:</div> <input class='righter'  type='text' name='usr' id='usr' disabled value='"+item.appointment.profid+"'/><br/>" +
                        "<div class='lefter'>Price(&euro;):</div> <input class='righter'  type='text' name='loct' id='loct' disabled value='"+item.appointment.price+"'/><br/>" +
                        "</div>"+
                        "<button  class='ui-btn ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all'" +
                        " id='cancel' style='width:35%;float: left;margin-right: 20px;background-color: rgba(155, 155, 155, 0.3)!important;' " +
                        "onclick='cancel_appointmentu(" + item.appointment.id + "," + getID() + ")' " +
                            "data-role='button' data-icon='minus'>Cancel</button>"+
                        "<div id='placeholder-for-" + item.appointment.id + "'><button style='width: 55%;float: left;margin-right: 10px;'" +
                        "class='ui-btn ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all' data-role='button' data-icon='minus'>Confirmed</button></div>" +

                        "</div>";
                    // inner_html += "<div id='appoint-" + item.appointment.id + "' class='appointment'><h4>"
                    //     + item.appointment.type + " on " + item.appointment.date + " at "
                    //     + item.appointment.time +"</h4>"+
                    //     "<button  class='ui-btn ui-icon-delete ui-btn-icon-left ui-shadow ui-corner-all'" +
                    //     " id='cancel' style='width:35%;' onclick='cancel_appointmentu(" + item.appointment.id + "," + getID() + ")' " +
                    //         "data-role='button' data-icon='minus'>Cancel</button>"+
                    //     "<div id='placeholder-for-" + item.appointment.id + "'><button style='width: 55%;float: left;margin-right: 10px;'" +
                    //     "class='ui-btn ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all' data-role='button' data-icon='minus'>Confirmed</button></div>" +
                    //
                    //     "</div>";

                    if(item.appointment.app_status!=="assigned")
                        get_request_offers_for(item.appointment.id);
                }
            }
        });
        $("#my-appointments").html(inner_html);

    }).fail(function (jqXHR) {
    });
};

function get_request_offers_for(id)
{
    var queryString=getDomain()+getAppointmentOffers()+"?nid="+id;

    $.getJSON(queryString, function (results)
    {
        try {
            var html = "<button  style='width: 55%;float: left;margin-right: 10px;background-color:rgba(155, 155, 155, 0.9)!important;'" +
                " class='ui-btn ui-icon-plus ui-btn-icon-left ui-shadow ui-corner-all' id='submit' data-role='button' data-icon='cloud' " +
                    "onclick='show_request_for(" + id + ")'>View Offers (" + results.length + ")</button>" +
                "<div id='offers-for-" + id + "' class='not-displayed'>";

            results.forEach(function(item, index){
                html += "<div id='offer-"+item.offer.id+"' class='offer'>" +
                        //"<form>" +
                            "<input type='hidden' name='nid' id='nid' value='" + item.offer.id + "' required/>" +
                            "<input type='hidden' name='appid' id='appid' value='" + id + "' required/>" +
                            "<input type='hidden' name='proid' id='proid' value='" + item.offer.proid + "' required/>" +
                            "<div class='offer-info'>" +
                                "<img src='http://api.priti.gr/upload/prof_"+item.offer.proid+".jpg' class='propic'/>"
                                +"<div class='proname' onclick='view_pro_profile("+item.offer.proid+")'>"+item.offer.proname+" "+item.offer.prosurname+"</div>" +
                                    "<div class='offer-stats'>" +
                                        "<div>Price(&euro;): "+item.offer.price+"&euro;</div>" +
                                        "<div>Est. Time: "+item.offer.time+"mins</div>"+
                                        "<button class='ui-btn ui-icon-check ui-btn-icon-left ui-shadow ui-corner-all' " +
                                            "id='submit' data-role='button' data-icon='cloud'" +
                                        " onclick='accept_request_offer(" + item.offer.id + ")'>Book</button>" +
                                    "</div>" +
                            "</div>" +
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

function accept_request_offer(nid)
{
    uid=localStorage.getItem("id");
    nid=$("#offer-"+nid+" #nid").val();
    appid=$("#offer-"+nid+" #appid").val();

    var queryString=getDomain()+getOfferAccept()+"?offerid="+nid+
        "&appid="+appid;

    //alert(queryString);
    //window.location="#menu_user";
    $.getJSON(queryString, function (results)
    {
        console.log(queryString);
        window.plugins.toast.showShortBottom("Appointment confirmed! You are now moments away from indulging in your selected service.Use priti's messenger to contact your priti pro");

    }).fail(function (jqXHR) {
        //window.location="#menu_user";
    });

    window.location="#menu_user";
    window.plugins.toast.show("Appointment confirmed! You are now moments away from indulging in your selected service.Use priti's messenger to contact your priti pro", 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
};

function show_request_for(id)
{
    $("#offers-for-"+id).show();
}
