/**
 * Created by Mihalis on 10/5/2017.
 */

function register()
{
    var username = $('#username').val();
    var password = $('#password').val();
    var name = $('#name-input').val();
    var surname = $('#surname-input').val();
    var role = $('#role-input').val();
    var email = $('#email-input').val();

    var queryString =
        getDomain()+getUserRegister()+"?username="+username+"&password="+password
        +"&name="+name+"&surname="+surname+"&role="+role
        +"&email="+email;

    console.log(queryString);

    $.getJSON(queryString, function (results) {

    }).fail(function (jqXHR) {

    }).success(function(response){
        console.log("SUCCESS");
    })
    ;
    window.plugins.toast.show('Successfull registration', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    window.location("#index");
    return false;
}