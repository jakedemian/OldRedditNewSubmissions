function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
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

function setcookie(name, value, days, domain)
{
  if (days)
  {
    var date = new Date();
    date.setTime(date.getTime()+days*24*60*60*1000); // ) removed
    var expires = "; expires=" + date.toGMTString(); // + added
  }
  else
    var expires = "";
  document.cookie = name+"=" + value+expires + ";" + "domain=" + domain + ";path=/"; // + and " added
}

window.onbeforeunload = function() {
    var url = document.activeElement.href;

    var redesignCookie = getCookie("redesign_optout");

    if(!url || url.indexOf("/submit") > -1){
        // remove the redesign optout cookie
        setcookie("redesign_optout", "", -1, ".reddit.com");
    } else if(!redesignCookie){
        // add the redesign optout cookie, if it doesnt exist
        setcookie("redesign_optout", "true", 100000, ".reddit.com");
        window.location = url;
        window.location.reload;
    }
}

window.onload = function() {
    var url = window.location.pathname;
    var redesignCookie = getCookie("redesign_optout");

    // add a proper redirect to the logo to force refresh
    var links = document.querySelectorAll('a');
    for(var i = 0; i < links.length; i++){
        var nodeAttributes = links[i].attributes;
        for(var j = 0; j < nodeAttributes.length; j++){
            var thisAttr = nodeAttributes[j];
            if(thisAttr.name == 'aria-label' && thisAttr.value == 'Home'){
                links[i].onclick = function(){
                    window.location.href = 'https://www.reddit.com/';
                }
            }
        }
    }

    if(!url || url.indexOf("/submit") > -1){
        // remove the redesign optout cookie
        setcookie("redesign_optout", "", -1, ".reddit.com");
    } else if(!redesignCookie){
        // add the redesign optout cookie, if it doesnt exist
        setcookie("redesign_optout", "true", 100000, ".reddit.com");
        window.location = url;
        window.location.reload;
    }
}





