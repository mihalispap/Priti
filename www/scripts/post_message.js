
/**
 * Created by Mihalis on 10/5/2017.
 */

function fetch_user_messages(id)
{


    document.getElementById("messages-title").innerHTML = "Contact your pro";
    var queryString=getDomain()+getUserAppointments()+"?uid="+id;
    $.getJSON(queryString, function (results)
    {


        var inner_html=""
        results.forEach(function(item, index){
            var d1 = new Date();
            d1.setHours(0,0,0,0);
            if(item.appointment.date!==null && item.appointment.date!=="") {
                var d2 = new Date(item.appointment.date);
                var month = d2.getMonth()+1; // month (in integer 0-11)
                var year = d2.getFullYear(); // year
                var day = d2.getUTCDate();
                item.appointment.date=day+"/"+month+"/"+year;
                if (d2 >= d1 && item.appointment.app_status==="assigned") {

                    inner_html += "<button class='ui-btn ui-icon-comment ui-btn-icon-left ui-shadow ui-corner-all mcounter messages'  id='submit' data-role='button' data-icon='cloud' " +
                        "onclick='show_messages_for(" + item.appointment.id + ")'><div id='messages-view-" + item.appointment.id + "' class='appointment'>"
                        + item.appointment.type + "<br/>on " + item.appointment.date + "<br/>at "
                        + item.appointment.time +
                        //"<button id='view-message' onclick='send_message("+item.appointment.id+","+getID()+")' " +
                        //"data-role='button' data-icon='plus'>Send Message</button>"+
                        "<br/>with: "+item.appointment.profid+"</button><div id='placeholder-appoint-for-" + item.appointment.id + "'></div></div>";

                    get_messages_for(item.appointment.id);
                }
            }
        });
        $("#my-messages").html(inner_html);

    }).fail(function (jqXHR) {
    });
};

function fetch_prof_messages(id)
{
    var queryString=getDomain()+getProfessionalAppointments()+"?uid="+id;
    $.getJSON(queryString, function (results)
    {
        var inner_html="";
        results.forEach(function(item, index){
            var d1 = new Date();

            if(item.appointment.date!==null && item.appointment.date!=="") {
                var d2 = new Date(item.appointment.date);
                d1.setHours(0,0,0,0);

                var month = d2.getMonth()+1; // month (in integer 0-11)
                var year = d2.getFullYear(); // year
                var day = d2.getUTCDate();

                item.appointment.date=day+"/"+month+"/"+year;

                if (d2 >= d1 && item.appointment.app_status==="assigned") {
                    inner_html += "<button class='ui-btn ui-icon-comment ui-btn-icon-left ui-shadow ui-corner-all mcounter messages'  id='submit' data-role='button' data-icon='cloud' " +
                        "onclick='show_messages_for(" + item.appointment.appnid + ")'><div id='messages-view-" + item.appointment.id + "'>"
                        + item.appointment.type + "<br/>on " + item.appointment.date + "<br/>at "
                        + item.appointment.time +
                        //"<button id='view-message' onclick='send_message("+item.appointment.id+","+getID()+")' " +
                        //"data-role='button' data-icon='plus'>Send Message</button>"+
                        "<br/>with: "+item.appointment.username+"</button><div id='placeholder-appoint-for-" + item.appointment.appnid + "'></div></div>";

                    get_messages_for(item.appointment.appnid);
                }
            }
        });
        $("#my-messages").html(inner_html);

    }).fail(function (jqXHR) {
    });
};

function get_messages_for(id)
{
    var queryString=getDomain()+getAppointmentMessages()+"?nid="+id;

    $.getJSON(queryString, function (results)
    {
        try {
            /*var html = "<button class='ui-btn ui-icon-comment ui-btn-icon-left ui-shadow ui-corner-all mcounter'  id='submit' data-role='button' data-icon='cloud' " +
                "onclick='show_messages_for(" + id + ")'>Messages (" + results.length + ")</button>" +
                "<div id='messages-for-" + id + "' class='not-displayed'>";*/
            var html = "" +
                "<div id='messages-for-" + id + "' class='not-displayed'>";

            results.forEach(function(item, index){
                /*html += "<div id='message-"+item.message.id+"'>" +
                    "<form>" +
                    "<input type='hidden' name='nid' id='nid' value='" + item.message.id + "' required/>" +
                    "<input type='hidden' name='appid' id='appid' value='" + id + "' required/>" +
                    "<textarea id='notes' value='"+item.message.body+"'  name='notes' rows='5' disabled/>" +
                    "<textarea id='message' value='' placeholder='message here'  name='message' rows='5'/>" +
                    "<button id='submit' data-role='button' data-icon='cloud'" +
                    " onclick='submit_message_for(" + id + ")'>Accept</button>" +
                    "</form>" +
                    "</div>";*/

                var sent_from="self";
                if(item.message.uid===getID())
                    sent_from="other";

                html += "<div id='message-"+item.message.id+"' class='sent-"+sent_from+"'>" +
                    "<div class='sent-message'>"+item.message.body+"</div>" +
                    "</div>";
            });

            html+= "</div>";

            html += "<div id='new-message-"+id+"'>" +
                //"<form>" +
                "<input type='hidden' name='appoint-nid' id='appoint-nid' value='" + id + "' required/>" +
                "<div class='post-new-message'>" +
                "<textarea id='new-message' value='' placeholder='message here'  name='message' rows='5'></textarea></div>" +
                "<button class='ui-btn ui-icon-navigation ui-btn-icon-left ui-shadow ui-corner-all' " +
                " id='submit' data-role='button' data-icon='cloud'" +
                " onclick='submit_message_for(" + id + ")'>Send</button>" +
                //"</form>" +
                "</div>";

            $("#placeholder-appoint-for-"+id).html(html);

            return html;
        }
        catch(err){}

    }).fail(function (jqXHR) {
        return "";
    });

}

function submit_message_for(nid)
{
    //alert("i as clicked"+nid);

    uid=localStorage.getItem("id");
    var body=$('#new-message-'+nid+' #new-message').val();

    var queryString=getDomain()+getSubmitMessage()+"?appid="+nid+"&uid="+localStorage.getItem("id")+"&body="+encodeURI(body);

    //alert(body);
    $.getJSON(queryString, function (results)
    {
        console.log(queryString);

    }).fail(function (jqXHR) {
        //window.location="#menu_user";
    });

    /*if (getType() == 'User') {
        window.location = "#menu_user";
    }
    if(getType()=='Professional')
        window.location="#menu_prof";*/

    window.plugins.toast.show('Message Sent!', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

    return false;
};

function show_messages_for(id)
{
    $("#messages-for-"+id).show();
}
