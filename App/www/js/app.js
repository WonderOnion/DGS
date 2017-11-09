
/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

/*function myEventHandler() {
    "use strict" ;

    var ua = navigator.userAgent ;
    var str ;

    if( window.Cordova && dev.isDeviceReady.c_cordova_ready__ ) {
            str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!" ;
    }
    else if( window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______ ) {
            str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!" ;
    }
    else {
        str = "Bad device ready, or none available because we're running in a browser." ;
    }

    alert(str) ;
}


function fooDesi() {
    request = $.ajax({
        url: "http://localhost/test.php", //indirizzo di invio delle informazioni
        method: "post",
        data: "id="+1,
        async: false            
    })
    request.done(function(response){
        response = JSON.parse(response);
        response.forEach(function(a){
            $("#foo").append(a.email+"<br>");
        })
    })
}*/

function foo(urlSend, DataSend) {
    request = $.ajax({
        url: urlSend,
        method: "post",
        data: DataSend,
        async: false
    }).responseText
    /*request.done(function(response){
        // Se andato a buon fine
    })*/
    
    return request;
}

function createNewAccount() {
    /*username = document.getElementById("usernameForm").value;
    email = document.getElementById("emailForm").value; 
    password = document.getElementById("passwordForm").value;*/
    
    username = "";
    email= "";
    password = "";
    
    if(document.getElementById("usernameForm") != null) {
        username = document.getElementById("usernameForm").value;
    } if(document.getElementById("emailForm") != null) {
        email = document.getElementById("emailForm").value;
    } if(document.getElementById("passwordForm") != null) {
        password = document.getElementById("passwordForm").value;
    }
    
    Data = "username=" + username + "&email=" + email + "&password=" + password;
    
    req = foo("http://dgsteam.altervista.org/server/createaccount.php", Data);
    
    //alert(req); 
    
    // azzera le stritte sopra
    if(document.getElementById("containerError").innerHTML != null) {
        document.getElementById("containerError").innerHTML = "";
    } if(document.getElementById("containerSuccess").innerHTML != null) {
        document.getElementById("containerSuccess").innerHTML = "";
    }
    
    if(req.indexOf("&") == -1) {
        // Non sono presenti errori nel valori inviati
        
        // controlla se esce la scritta "success"
        if(req.indexOf("success") > -1) {
            document.getElementById("containerSuccess").innerHTML = "You can now login with your new account";
            
            // azzera tutti i campi
            document.getElementById("usernameForm").value = "";
            document.getElementById("emailForm").value    = "";
            document.getElementById("passwordForm").value = "";
            
        }
    } else {
        // errori nei valori inviati dal modulo
        printErr(req, "containerError", "&");
    }
}

function login() {
    keycode = randomString(10);
    email= "";
    password = "";
    
    if(document.getElementById("emailForm") != null) {
        email = document.getElementById("emailForm").value;
    } if(document.getElementById("passwordForm") != null) {
        password = document.getElementById("passwordForm").value;
    }
    
    Data = "email=" + email + "&password=" + password + "&keycode=" + keycode;
    
    req = foo("http://dgsteam.altervista.org/server/loginaccount.php", Data);
    
    // azzera le stritte sopra
    if(document.getElementById("containerError").innerHTML != "") {
        document.getElementById("containerError").innerHTML = "";
    } if(document.getElementById("containerSuccess").innerHTML != "") {
        document.getElementById("containerSuccess").innerHTML = "";
    }
    
    if(req.indexOf("&") == -1) {
        // Non sono presenti errori nel valori inviati
        
        // controlla se esce la scritta "success"
        if(req.indexOf("success") > -1) {
            // Manda alla home
            
            
            Now = new Date();
            Now = Now.setDate(Now.getDate() + 5); 
            
            // crea il cookie che salva l'utente normalmente
            document.cookie = "key=" + keycode + "; expires=Thu, " + Now;
            
            
            // redirect alla home page dell'app
            if(document.cookie.indexOf('key='+keycode) > -1 ) {
                window.location.replace("home.html");
            }
        }
    } else {
        // errori nei valori inviati dal modulo
        printErr(req, "containerError", "&");
    }
}

function logout() {
    Now = new Date();
    
    document.cookie = "key=; expires=Thu, "+Now;
    
    if(!checkCookie("key")) {
        window.location.replace("../index.html");
    }
}

function randomString(Lenght) {
    // caratteri
    Valori = ["q","w","e","r","t","y","u","i","o","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9","0"];
    
    // Stringa con il risultato
    Res = "";
    
    for(I=0; I < Lenght; I++) {
        Res = Res + Valori[Math.floor(Math.random() * Valori.length)];
    }
    
    return Res;
}

function printErr(String, Container, SlitChar) {
        Errori = req.split("&");
        
        Stringa = "";
        
        for(I=0;I<Errori.length;I++) {
            // Valore da stampare (tutto il codice)
            Stringa = Stringa + Errori[I]+"<br>" ;
        }
        
        // Inserisci nella grafica
        document.getElementById("containerError").innerHTML = Stringa;
}

function UpTime(Data1, Data2) {
    return Data1 + Data2;
}

function updateBasicUserData() {
    Data = getCookie("key");
    
    username = foo("http://dgsteam.altervista.org/server/loginaccount.php", Data);
}

// Funzioni sui cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var CookieValue = getCookie(cname);
    if (CookieValue != "") {
        return true;
    } else {
        return false;
    }
}
