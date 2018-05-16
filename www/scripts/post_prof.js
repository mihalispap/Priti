/**
 * Created by Mihalis on 11/5/2017.
 */

function check_choices(id)
{
    var queryString=getDomain()+getUserServices()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            $("input#service-"+item.service.id).prop( "checked", true );
            $("#service-"+item.service.id).prop( "checked", true );
            $("#service-"+item.service.id).attr( "checked", true );
            $("input:checkbox[id='service-"+item.service.id+"']").attr("checked", true);
            $("#short-bio").val(item.service.bio);
            $("#social").val(item.service.social);
            $("#proname").val(item.service.proname);
            $("#prosurname").val(item.service.prosurname);
            //console.log("I checked checkbox: #service-"+item.service.id);
        });

    }).fail(function (jqXHR) {
    });
}

function check_pchoices(id)
{
    var queryString=getDomain()+getUserServices()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            $("#pshort-bio").val(item.service.bio);
            $("#psocial").val(item.service.social);
            $("#pproname").val(item.service.proname);
            $("#pprosurname").val(item.service.prosurname);
            //console.log("I checked checkbox: #service-"+item.service.id);
        });

    }).fail(function (jqXHR) {
    });
}


function generate_options()
{
    check_choices(localStorage.getItem("id"));
    get_prof_profile_pic(localStorage.getItem("id"));
    get_sample_of_work1(localStorage.getItem("id"));
    get_sample_of_work2(localStorage.getItem("id"));
    get_sample_of_work3(localStorage.getItem("id"));
    get_sample_of_work4(localStorage.getItem("id"));
    get_sample_of_work5(localStorage.getItem("id"));
    /*var queryString=getDomain()+getServiceTypes();
    $.getJSON(queryString, function (results)
    {
        var inner_html="";
        results.forEach(function(item, index){
            inner_html+="<input id='service-"+item.service.id+"' type='checkbox' " +
                "value='"+item.service.name+"' name='service'>"
                +item.service.name+"</input>";
        });
        $("#services").html(inner_html);

        check_choices(localStorage.getItem("id"));
        get_prof_profile_pic(localStorage.getItem("id"));

    }).fail(function (jqXHR) {
    });*/


}

function post()
{
    var services="";
    $( "input:checked" ).each(function(index){
        services+=$( this ).val()+",";
    });

    var name=localStorage.getItem("username");
    var shortbio=$("#short-bio").val();
    var social=$("#social").val();
    var proname=$("#proname").val();
    var prosurname=$("#prosurname").val();

    try {
        uploadPhoto();
    }
    catch(err){
        console.log(err);
    }

    var queryString =
        getDomain()+getPostPreferences()+"?name="+name+"&services="+services+"&bio="+shortbio+"&social="+social+"&proname="+proname+"&prosurname="+prosurname;
    queryString=encodeURI(queryString);

    console.log(queryString);

    $.getJSON(queryString, function (results) {


    }).fail(function (jqXHR) {


    }).success(function (jqXHR) {
    });
    window.location="#menu_prof";

    window.plugins.toast.show('Profile Updated!', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
}

function get_sample_of_work1(id)
{
    var queryString=getDomain()+getUserSampleOfWork1()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('smallImage1');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}
function get_sample_of_work2(id)
{
    var queryString=getDomain()+getUserSampleOfWork2()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('smallImage2');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}
function get_sample_of_work3(id)
{
    var queryString=getDomain()+getUserSampleOfWork3()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('smallImage3');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}
function get_sample_of_work4(id)
{
    var queryString=getDomain()+getUserSampleOfWork4()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('smallImage4');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}
function get_sample_of_work5(id)
{
    var queryString=getDomain()+getUserSampleOfWork5()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('smallImage5');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}

function get_psample_of_work1(id)
{
    var queryString=getDomain()+getUserSampleOfWork1()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('psmallImage1');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}
function get_psample_of_work2(id)
{
    var queryString=getDomain()+getUserSampleOfWork2()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('psmallImage2');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}
function get_psample_of_work3(id)
{
    var queryString=getDomain()+getUserSampleOfWork3()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('psmallImage3');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}
function get_psample_of_work4(id)
{
    var queryString=getDomain()+getUserSampleOfWork4()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('psmallImage4');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}
function get_psample_of_work5(id)
{
    var queryString=getDomain()+getUserSampleOfWork5()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('psmallImage5');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}

function get_prof_profile_pic(id)
{
    var queryString=getDomain()+getUserProfilePicture()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('smallImage');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}
function get_pprof_profile_pic(id)
{
    var queryString=getDomain()+getUserProfilePicture()+"?id="+id;
    $.getJSON(queryString, function (results)
    {
        console.log(results);

        results.forEach(function(item, index){
            var smallImage = document.getElementById('psmallImage');
            smallImage.style.display = 'block';
            smallImage.src = "http://api.priti.gr/upload/"+item.image.name;
        });

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("An error has occured, most likely it has to do with the internet connection!");
    });
}

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

function onPhotoURISuccess(imageURI) {

    /*if(!imageURI.includes(".jpg") && !imageURI.includes(".jpeg") && !imageURI.includes(".JPG") && !imageURI.includes(".JPEG")) {
        window.plugins.toast.show('Only jpg files are supported!', 'long', 'center',
            function (a) {
                console.log('toast success: ' + a)
            }, function (b) {
                console.log('toast error: ' + b)
            });
        return;
    }*/
    // Show the selected image
    var smallImage = document.getElementById('smallImage');
    smallImage.style.display = 'block';
    smallImage.src = imageURI;

    //uploadPhoto();
}
function onPhotoURISuccess1(imageURI) {

    /*if(!imageURI.includes(".jpg") && !imageURI.includes(".jpeg") && !imageURI.includes(".JPG") && !imageURI.includes(".JPEG")) {
        window.plugins.toast.show('Only jpg files are supported!', 'long', 'center',
            function (a) {
                console.log('toast success: ' + a)
            }, function (b) {
                console.log('toast error: ' + b)
            });
        return;
    }*/
    // Show the selected image
    var smallImage = document.getElementById('smallImage1');
    smallImage.style.display = 'block';
    smallImage.src = imageURI;

    //uploadPhoto();
}
function onPhotoURISuccess2(imageURI) {

    /*if(!imageURI.includes(".jpg") && !imageURI.includes(".jpeg") && !imageURI.includes(".JPG") && !imageURI.includes(".JPEG")) {
        window.plugins.toast.show('Only jpg files are supported!', 'long', 'center',
            function (a) {
                console.log('toast success: ' + a)
            }, function (b) {
                console.log('toast error: ' + b)
            });
        return;
    }*/
    // Show the selected image
    var smallImage = document.getElementById('smallImage2');
    smallImage.style.display = 'block';
    smallImage.src = imageURI;

    //uploadPhoto();
}
function onPhotoURISuccess3(imageURI) {

    if(!imageURI.includes(".jpg") && !imageURI.includes(".jpeg") && !imageURI.includes(".JPG") && !imageURI.includes(".JPEG")) {
        window.plugins.toast.show('Only jpg files are supported!', 'long', 'center',
            function (a) {
                console.log('toast success: ' + a)
            }, function (b) {
                console.log('toast error: ' + b)
            });
        return;
    }
    // Show the selected image
    var smallImage = document.getElementById('smallImage3');
    smallImage.style.display = 'block';
    smallImage.src = imageURI;

    //uploadPhoto();
}
function onPhotoURISuccess4(imageURI) {

    if(!imageURI.includes(".jpg") && !imageURI.includes(".jpeg") && !imageURI.includes(".JPG") && !imageURI.includes(".JPEG")) {
        window.plugins.toast.show('Only jpg files are supported!', 'long', 'center',
            function (a) {
                console.log('toast success: ' + a)
            }, function (b) {
                console.log('toast error: ' + b)
            });
        return;
    }
    // Show the selected image
    var smallImage = document.getElementById('smallImage4');
    smallImage.style.display = 'block';
    smallImage.src = imageURI;

    //uploadPhoto();
}
function onPhotoURISuccess5(imageURI) {

    if(!imageURI.includes(".jpg") && !imageURI.includes(".jpeg") && !imageURI.includes(".JPG") && !imageURI.includes(".JPEG")) {
        window.plugins.toast.show('Only jpg files are supported!', 'long', 'center',
            function (a) {
                console.log('toast success: ' + a)
            }, function (b) {
                console.log('toast error: ' + b)
            });
        return;
    }
    // Show the selected image
    var smallImage = document.getElementById('smallImage5');
    smallImage.style.display = 'block';
    smallImage.src = imageURI;

    //uploadPhoto();
}

function onPhotoURISuccessWithId(imageURI) {

    if(!imageURI.includes(".jpg") && !imageURI.includes(".jpeg") && !imageURI.includes(".JPG") && !imageURI.includes(".JPEG")) {
        window.plugins.toast.show('Only jpg files are supported!', 'long', 'center',
            function (a) {
                console.log('toast success: ' + a)
            }, function (b) {
                console.log('toast error: ' + b)
            });
        return;
    }
    // Show the selected image
    var smallImage = document.getElementById('smallImage'+currentId);
    smallImage.style.display = 'block';
    smallImage.src = imageURI;

    //uploadPhoto();
}


// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });

    //window.location="#post_prof";
}

var currentId=0;

function getPhoto1(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess1, onFail, { quality: 85,
        destinationType: destinationType.FILE_URI,
        sourceType: source });

}
function getPhoto2(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess2, onFail, { quality: 85,
        destinationType: destinationType.FILE_URI,
        sourceType: source });

}
function getPhoto3(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess3, onFail, { quality: 85,
        destinationType: destinationType.FILE_URI,
        sourceType: source });

}
function getPhoto4(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess4, onFail, { quality: 85,
        destinationType: destinationType.FILE_URI,
        sourceType: source });

}
function getPhoto5(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess5, onFail, { quality: 85,
        destinationType: destinationType.FILE_URI,
        sourceType: source });

}

function selectPicture(){
    navigator.camera.getPicture({
        quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
};

function uploadPhoto() {

    //selected photo URI is in the src attribute (we set this on getPhoto)
    var imageURI = document.getElementById('smallImage').getAttribute("src");
    if (!imageURI) {
        alert('Please select an image first.');
        return;
    }

    //alert(imageURI);

    //set upload options
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    console.log(options.fileName);
    var params = new Object();
    params.uid = localStorage.getItem("id");
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    //ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo.php"), win, fail, options);

    //ft.upload(imageURI, "http://api.priti.gr/upload_photo.php", function(result){
    ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo.php"), function(result){
        //alert(result);
        console.log(result);
    }, function(error){
        console.log(JSON.stringify(error));
    }, options, true);

    uploadPhoto2();
}

function uploadPhoto2() {

    //selected photo URI is in the src attribute (we set this on getPhoto)
    var imageURI = document.getElementById('smallImage1').getAttribute("src");
    if (!imageURI) {
        return;
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    console.log(options.fileName);
    var params = new Object();
    params.uid = localStorage.getItem("id");
    params.cid = '1';
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    //ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo.php"), win, fail, options);

    //ft.upload(imageURI, "http://api.priti.gr/upload_photo.php", function(result){
    ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo2.php"), function(result){
        //alert(result);
        console.log(result);
    }, function(error){
        console.log(JSON.stringify(error));
    }, options, true);

    //selected photo URI is in the src attribute (we set this on getPhoto)
    var imageURI = document.getElementById('smallImage2').getAttribute("src");
    if (!imageURI) {
        return;
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    console.log(options.fileName);
    var params = new Object();
    params.uid = localStorage.getItem("id");
    params.cid = '2';
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    //ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo.php"), win, fail, options);

    //ft.upload(imageURI, "http://api.priti.gr/upload_photo.php", function(result){
    ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo2.php"), function(result){
        //alert(result);
        console.log(result);
    }, function(error){
        console.log(JSON.stringify(error));
    }, options, true);

    //selected photo URI is in the src attribute (we set this on getPhoto)
    var imageURI = document.getElementById('smallImage3').getAttribute("src");
    if (!imageURI) {
        return;
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    console.log(options.fileName);
    var params = new Object();
    params.uid = localStorage.getItem("id");
    params.cid = '3';
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    //ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo.php"), win, fail, options);

    //ft.upload(imageURI, "http://api.priti.gr/upload_photo.php", function(result){
    ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo2.php"), function(result){
        //alert(result);
        console.log(result);
    }, function(error){
        console.log(JSON.stringify(error));
    }, options, true);

    //selected photo URI is in the src attribute (we set this on getPhoto)
    var imageURI = document.getElementById('smallImage4').getAttribute("src");
    if (!imageURI) {
        return;
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    console.log(options.fileName);
    var params = new Object();
    params.uid = localStorage.getItem("id");
    params.cid = '4';
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    //ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo.php"), win, fail, options);

    //ft.upload(imageURI, "http://api.priti.gr/upload_photo.php", function(result){
    ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo2.php"), function(result){
        //alert(result);
        console.log(result);
    }, function(error){
        console.log(JSON.stringify(error));
    }, options, true);

    //selected photo URI is in the src attribute (we set this on getPhoto)
    var imageURI = document.getElementById('smallImage5').getAttribute("src");
    if (!imageURI) {
        return;
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    console.log(options.fileName);
    var params = new Object();
    params.uid = localStorage.getItem("id");
    params.cid = '5';
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    //ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo.php"), win, fail, options);

    //ft.upload(imageURI, "http://api.priti.gr/upload_photo.php", function(result){
    ft.upload(imageURI, encodeURI("http://api.priti.gr/upload_photo2.php"), function(result){
        //alert(result);
        console.log(result);
    }, function(error){
        console.log(JSON.stringify(error));
    }, options, true);

}

// Called if something bad happens.
//
function onFail(message) {
    console.log('Failed because: ' + message);
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    //alert("Response =" + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    //alert("An error has occurred: Code = " + error.code);
    //alert(error);
    console.log(error);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}
