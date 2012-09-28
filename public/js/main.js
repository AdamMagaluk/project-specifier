$(document).ready(function(){

    var map;
    function initialize() {
        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    
    if($("#show") != undefined){
        $("#show").avgrund({			
            width: 380, // max is 640px
            height: 280, // max is 350px
            showClose: false, // switch to 'true' for enabling close button 
            closeByEscape: false, // enables closing popup by 'Esc'..
            closeByDocument: false, // ..and by clicking document itself
            enableStackAnimation: false,
            template: '<h1>Please Login</h1><form action="/login" method="post"><div><label>Username:</label><input type="text" name="username"/><br/></div><div><br><label>Password:</label><input type="password" name="password"/></div><div><button class="button" type="submit" value="Login">Login</button></div></form>'
        });
        $("#show").click();
    }
})
