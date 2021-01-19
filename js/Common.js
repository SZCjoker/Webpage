//detectIE
if (window.navigator.userAgent.indexOf('MSIE ') > 0 || window.navigator.userAgent.indexOf('Trident/') > 0) {
    location.href = "announce.html";
}


let domainUrl="http://localhost:5000/api/";

function StartLogin() {
    var getUrlString = location.href;
    var key = getUrlString.split('ad=');
    return key[1];
}


function DateConverter (integer)
{  let Str =  integer.toString();
    let date ="";
   if(!Str.lenth == 10 )
   {
     date = `${Str.substring(0,4)}-${Str.substring(5,1)}-${Str.substring(7,1)}`;
     console.log(date);
}
  else
   {
     let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
     date =  d.setUTCSeconds(Str);
     console.log(date);
   }
   return date ;
}



function CheckLogin()
{
  let cookie =  getCookie("plist");
  if(cookie=="")
  location.href="login.html";
}






function setCookie(day, data, key) {
    var d = new Date();
    var strjson = JSON.stringify(data);
    d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000)); //以一天計算
    var expires = "expires=" + d.toGMTString();
    document.cookie = key + "=" + strjson + ";" + expires;
}
function getCookie(key) {
    var name = key + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            var EA = c.substring(name.length, c.length);
            return EA;
        }
    }
    
    return "";
}
function removeCookie() {
    //過期就不見囉
    setCookie(-1, null, "team");
    setCookie(-1, null, "name");
    setCookie(-1, null, "plist");
}
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};
function AccountEncond(data) {
    var objJsonArray = JSON.parse(data);
    var login_name = objJsonArray.login_name;
    var token = parseJwt(objJsonArray.token);
    return {
        "login_name": login_name,
        "sub": token.sub,
        "jobtitles": token.jobtitles,
        "paths": token.paths,
        "depatts": token.depatts,
        "token": objJsonArray.token
    }
}

$(function () {

    //set tab width
    $('.nav-tabs3').each(function () {
        var navItem = $(this).find('.nav-item');
        var tabWAry = [];
        for (i = 0; i < navItem.length; i++) {
            tabWAry[i] = navItem.eq(i).width();
        }
        function totalW(arr) {
            var sum = 0;
            arr.forEach(function (e) {
                sum += e;
            });
            return sum;
        }
        $(this).css('min-width', totalW(tabWAry))
    });

    //datepicker
    if($( ".uDatePick" ).length > 0){
        $(".uDatePick").datepicker({
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true
        });
        $.datepicker._gotoToday = function(id) { 
            var today = new Date(); 
            var dateRef = jQuery("<td><a>" + today.getDate() + "</a></td>"); 
            this._selectDay(id, today.getMonth(), today.getFullYear(), dateRef); 
        };
        $(".uDatePickIcon").click(function(){
            $(this).next(".uDatePick").datepicker("show");
        }); 
    }
});