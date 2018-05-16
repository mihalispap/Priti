// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";


    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {

        loadMapsApi();

        showSpinner();
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );



        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        $('#validate-login').click(validateLogin);

        if(localStorage.getItem("id")!==undefined && localStorage.getItem("id")!==null) {
            //check_valid_logged_user(localStorage.getItem("id"));

            if(getType()=="User")
                window.location="#menu_user";
            else if(getType()=="Professional")
                window.location="#menu_prof";
        }

        /*
        * TODO:
        *   this is only for iOS
        * */
        setInterval(check_for_offers, 15000);

        /*
         * TODO:
         *     this is for android
         */

        /*
        // 1) Request background execution
        cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.setDefaults({silent: true});
        // 2) Now the app runs ins background but stays awake
        cordova.plugins.backgroundMode.on('activate', function () {
            setInterval(check_for_offers, 15000);
        });

        // 3) App is back to foreground
        cordova.plugins.backgroundMode.on('deactivate', function () {
            cordova.plugins.notification.badge.clear();
        });
        */
        hideSpinner();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
/*
        // 1) Request background execution
        cordova.plugins.backgroundMode.enable();

        // 2) Now the app runs ins background but stays awake
        cordova.plugins.backgroundMode.on('activate', function () {
            setInterval(function () {
                cordova.plugins.notification.badge.increase();
            }, 1000);
        });

        // 3) App is back to foreground
        cordova.plugins.backgroundMode.on('deactivate', function () {
            cordova.plugins.notification.badge.clear();
        });
*/
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function check_for_offers(){
        if(localStorage.getItem("id")!==undefined && localStorage.getItem("id")!==null)
        {
            /*
             * TODO:
             *       add also timestamp
             * */

            var d = new Date();
            var unixTimetamp = Math.floor(d.getTime()/1000);

            var userID = localStorage.getItem("id");


            var queryString =
                getDomain()+getCheckForOffers()+"?uid="+userID+"&timestamp="+unixTimetamp;

            $.getJSON(queryString, function (results) {

                try {
                    var counter = 0;
                    //console.log('Running since ' + counter + ' sec');
                    //socket.doSend('Running  since ' + counter + ' sec');
                    //socket2.doSend('Running  since ' + counter + ' sec');

                    if((results.length==0 && results[0].offers!==null) || getType()!=="User")
                        return;

                    received_offer=true;

                    cordova.plugins.notification.badge.increase();

                        var date = new Date();
                        cordova.plugins.notification.local.schedule({
                            id: 1,
                            title: "New Offer",
                            message: "You just received a new offer",
                            firstAt: date, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
                            //every: "week", // this also could be minutes i.e. 25 (int)
                            //sound: "file://sounds/reminder.mp3",
                            icon: "../images/logo_priti.png",
                            led: "FFFFFF",
                            data: { meetingId:"123#fg8" }
                        });

                        cordova.plugins.notification.badge.increase();
                        cordova.plugins.notification.local.on("click", function (notification) {

                            cordova.plugins.notification.badge.clear();
                            if (getType() === 'User') {
                                //window.location = "#menu_user";
                                open_my_requests();
                            }
                            if(getType()==='Professional')
                                window.location="#menu_prof";

                            hideSpinner();
                        });

                    alert('You just received a new offer');
                        if (navigator.vibrate) {
                            navigator.vibrate(1000);
                        }

                    //}
                }
                catch(err){
                    //alert(err);
                }

            }).fail(function (jqXHR) {

            }).success(function (jqXHR) {
            });


            var queryString =
                getDomain()+getCheckForMessages()+"?uid="+userID+"&timestamp="+unixTimetamp;

            $.getJSON(queryString, function (results) {

                try {
                    var counter = 0;

                    if(results.length===0 && results[0].offers!==null)
                        return;

                    //alert('message');
                    cordova.plugins.notification.badge.increase();

                        var date = new Date();
                        cordova.plugins.notification.local.schedule({
                            id: 2,
                            title: "New Message",
                            message: "You have a new message",
                            firstAt: date, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
                            //every: "week", // this also could be minutes i.e. 25 (int)
                            //sound: "file://sounds/reminder.mp3",
                            icon: "../images/logo_priti.png",
                            data: { meetingId:"123#fg8" }
                        });

                        cordova.plugins.notification.badge.increase();
                        cordova.plugins.notification.local.on("click", function (notification) {

                            cordova.plugins.notification.badge.clear();
                            if (getType() === 'User') {
                                //window.location = "#menu_user";
                                open_post_message();
                            }
                            if(getType()==='Professional') {
                                //window.location = "#menu_prof";
                                open_post_message();
                            }
                        });

                    alert('You have a new message');
                    //}
                        if (navigator.vibrate) {
                            navigator.vibrate(1000);
                        }
                }
                catch(err){
                    //alert(err);
                }

            }).fail(function (jqXHR) {

            }).success(function (jqXHR) {
            });

            queryString =
                getDomain()+getCheckForNewRequests()+"?uid="+userID+"&timestamp="+unixTimetamp;

            $.getJSON(queryString, function (results) {

                try {
                    var counter = 0;

                    if((results.length===0 && results[0].offers!==null ) || getType()==="User")
                        return;

                    cordova.plugins.notification.badge.increase();

                        var date = new Date();
                        cordova.plugins.notification.local.schedule({
                            id: 3,
                            title: "New Open Request",
                            message: "There is a new open request on your preferences",
                            firstAt: date, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
                            //every: "week", // this also could be minutes i.e. 25 (int)
                            //sound: "file://sounds/reminder.mp3",
                            icon: "../images/logo_priti.png",
                            data: { meetingId:"123#fg8" }
                        });

                        cordova.plugins.notification.badge.increase();
                        cordova.plugins.notification.local.on("click", function (notification) {

                            cordova.plugins.notification.badge.clear();
                            if (getType() === 'User') {
                                window.location = "#menu_user";
                            }
                            if(getType()==='Professional') {
                                //window.location = "#menu_prof";
                                open_open_requests();
                            }
                        });

                    alert('There is a new open request on your preferences');
                        if (navigator.vibrate) {
                            navigator.vibrate(1000);
                        }


                    //}
                }
                catch(err){
                    //alert(err);
                }

            }).fail(function (jqXHR) {

            }).success(function (jqXHR) {
            });

            queryString =
                getDomain()+getCheckForOfferAcceptance()+"?uid="+userID+"&timestamp="+unixTimetamp;

            $.getJSON(queryString, function (results) {

                try {
                    var counter = 0;

                    if((results.length===0 && results[0].offers!==null ) || getType()==="User")
                        return;

                    cordova.plugins.notification.badge.increase();

                    //alert('offer acceptance');

                        var date = new Date();
                        cordova.plugins.notification.local.schedule({
                            id: 4,
                            title: "One of your offers has been approved",
                            message: "",
                            firstAt: date, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
                            //every: "week", // this also could be minutes i.e. 25 (int)
                            //sound: "file://sounds/reminder.mp3",
                            icon: "../images/logo_priti.png",
                            data: { meetingId:"123#fg8" }
                        });

                        cordova.plugins.notification.badge.increase();
                        cordova.plugins.notification.local.on("click", function (notification) {

                            cordova.plugins.notification.badge.clear();
                            if (getType() === 'User') {
                                window.location = "#menu_user";
                            }
                            if(getType()==='Professional') {
                                //window.location="#menu_prof";
                                open_view_reservations();
                            }
                        });

                        if (navigator.vibrate) {
                            navigator.vibrate(1000);
                        }


                    alert('One of your offers has been approved');
                    //}
                }
                catch(err){
                    //alert(err);
                }

            }).fail(function (jqXHR) {

            }).success(function (jqXHR) {
            });

            queryString =
                getDomain()+getCheckForCancel()+"?uid="+userID+"&timestamp="+unixTimetamp+"&type="+getType();

            $.getJSON(queryString, function (results) {

                try {
                    var counter = 0;

                    if((results.length===0 && results[0].offers!==null ))
                        return;

                    //alert('cancelation');

                    cordova.plugins.notification.badge.increase();

                    var typec='Appointment';
                    if(getType()==='User')
                        typec='Offer';

                        var date = new Date();
                        cordova.plugins.notification.local.schedule({
                            id: 3,
                            title: typec+" has been canceled",
                            firstAt: date, // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
                            //every: "week", // this also could be minutes i.e. 25 (int)
                            //sound: "file://sounds/reminder.mp3",
                            icon: "../images/logo_priti.png",
                            data: { meetingId:"123#fg8" }
                        });

                        cordova.plugins.notification.badge.increase();
                        cordova.plugins.notification.local.on("click", function (notification) {

                            cordova.plugins.notification.badge.clear();
                            if (getType() === 'User') {
                                window.location = "#menu_user";
                            }
                            if(getType()==='Professional')
                                window.location="#menu_prof";

                        });

                        if (navigator.vibrate) {
                            navigator.vibrate(1000);
                        }
                    //}
                }
                catch(err){
                    //alert(err);
                }

            }).fail(function (jqXHR) {

            }).success(function (jqXHR) {
            });
        }
    }


    function alertDismissed() {
        // do something
        //alert("You clicked me ;)");
    }

    function check_valid_logged_user(userID)
    {
        var queryString =
            getDomain()+getValidUser()+"?uid="+userID;

        $.getJSON(queryString, function (results) {

            try {
                if (results[0].user.id !== null && results[0].user.id !== undefined) {

                    $('#logout').show();

                    if (results[0].user.type == 'User') {
                        window.location = "#menu_user";
                    }
                    if(results[0].user.type=='Professional')
                        window.location="#menu_prof";


                }
            }
            catch(err){
            }

        }).fail(function (jqXHR) {
        }).success(function (jqXHR) {
        });
    }

    function validateLogin()
    {
        showSpinner();

        var username = $('#username-input').val();
        var password = $('#password-input').val();

        var queryString =
            getDomain()+getLogin()+"?username="+username+"&password="+password;

        $.getJSON(queryString, function (results) {

            //showWeatherData(results);
            try {
                $('#logout').show();

                localStorage.setItem("name", results[0].user.name);
                localStorage.setItem("surname", results[0].user.surname);
                localStorage.setItem("username", results[0].user.username);
                localStorage.setItem("type", results[0].user.type);
                localStorage.setItem("id", results[0].user.id);

                if (results[0].user.type === 'User') {
                    window.location = "#menu_user";

                    //$('#welcome-msg').show();
                    //$('#welcome-msg').html("<h4>Hello, " + getName() + "!</h4>");
                }
                else if (results[0].user.type === 'Professional')
                    window.location = "#menu_prof";
                else
                    window.plugins.toast.show('Incorrect username/password', 'long', 'center', function (a) {
                        console.log('toast success: ' + a)
                    }, function (b) {
                        console.log('toast error: ' + b)
                    });
            }
            catch(error){
                window.plugins.toast.show('Incorrect username/password', 'long', 'center', function (a) {
                    console.log('toast success: ' + a)
                }, function (b) {
                    console.log('toast error: ' + b)
                });
            }
            hideSpinner();
        }).fail(function (jqXHR) {
        }).success(function (jqXHR) {
        });

        hideSpinner();
        return false;
    }

    /*var socket2 = {
        _socket: null,

        init: function() {
            if (!window.hasOwnProperty('WebSocket'))
                return;

            this._socket = new WebSocket('ws://echo.websocket.org/');

            this._socket.onopen    = function(evt) { socket.onOpen(evt); };
            this._socket.onclose   = function(evt) { socket.onClose(evt); };
            this._socket.onmessage = function(evt) { socket.onMessage(evt); };
            this._socket.onerror   = function(evt) { socket.onError(evt); };
        },

        onOpen: function(evt) {
            //console.log('CONNECTED');
            this.doSend('background-mode plugin rocks');
        },

        onClose: function(evt) {
            //console.log('DISCONNECTED');
        },

        onMessage: function(evt) {
            //console.log('RECEIVED: ' + evt.data);
        },

        onError: function(evt) {
            //console.log('ERROR: ' + evt.data);
        },

        doSend: function(message) {
            if (this._socket) {
                //console.log('SENT: ' + message);
                this._socket.send(message);
            }
        }
    };*/
} )();


/*var socket = {
    _socket: null,

    init: function() {
        if (!window.hasOwnProperty('WebSocket'))
            return;

        this._socket = new WebSocket('ws://echo.websocket.org/');

        this._socket.onopen    = function(evt) { socket.onOpen(evt); };
        this._socket.onclose   = function(evt) { socket.onClose(evt); };
        this._socket.onmessage = function(evt) { socket.onMessage(evt); };
        this._socket.onerror   = function(evt) { socket.onError(evt); };
    },

    onOpen: function(evt) {
        console.log('CONNECTED');
        this.doSend('background-mode plugin rocks');
    },

    onClose: function(evt) {
        console.log('DISCONNECTED');
    },

    onMessage: function(evt) {
        console.log('RECEIVED: ' + evt.data);
    },

    onError: function(evt) {
        console.log('ERROR: ' + evt.data);
    },

    doSend: function(message) {
        if (this._socket) {
            console.log('SENT: ' + message);
            this._socket.send(message);
        }
    }
};
*/