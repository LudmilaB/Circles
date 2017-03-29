
	 
	function setCookie(cname, cvalue, exdays) {
       var d = new Date();
       d.setTime(d.getTime() + (exdays*24*60*60*1000));
       var expires = "expires="+d.toUTCString();
       document.cookie = cname + "=" + cvalue + "; " + expires;
	   alert('cookie : ' + document.cookie);
    }
	
	function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "0"; //default
    }
	
	
	window.onbeforeunload = function (e) {
	  setCookie("best-container", best,180 );	
	}
	
     function RemoveMessage()
	{
		
	  messageContainer = document.querySelector(".game-message");
	  messageContainer.classList.remove("game-over");
      messageContainer.classList.remove("game-continue");  
		
	}
   
