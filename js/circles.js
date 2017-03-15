 	  var best=getCookie("best-circles");
	  document.getElementById('best-container').innerHTML=best;

 	 function StartGame(){
		
	  RemoveMessage();
	  
      var len=shapes.length;
	  for(var i=0; i<len; i++)
		  shapes.pop();
		 
	  mistakes=0;
	  score=0;
	  level=1;
	  setCookie("best-circles", best,180 );
	  document.getElementById('best-container').innerHTML=best;
	  document.getElementById('score-container').innerHTML=0;
	  Start=true;	
	  context.clearRect(0, 0, canvas.width, canvas.height);		
	}
  
	  function draw()
	  {
         var growing = false;	  
         for (var i=0; i<shapes.length; i++)
    	 {
          if(shapes[i].growing)
		  {
    		 for (var j=0; j<shapes.length; j++ )
			 {
    		     if(!CircleInsideCanvas(shapes[i],canvas))
				 {
    		        shapes[i].growing=false;
    				break;
    			 }
    		     else if(i!=j && CirclesTouch(shapes[i],shapes[j]))
				 {
					 if (shapes[i].clr===shapes[j].clr)// delete shapes if they are the same color
					 {
					    DrawCircle(shapes[i]);
						DrawCircle(shapes[j]);
						shapes.splice(i,1);
						if(i<j)
						  shapes.splice(j-1,1);
					    else
						  shapes.splice(j,1);
						redraw();
						return;
					 }
					 else
    			        shapes[i].growing=shapes[j].growing=false;
    				 break;  //contiue to search other circles that touch circle i
    			 }
    			}
    		 if(shapes[i].growing)
			 {
			    shapes[i].r=shapes[i].r+1;
    		    growing =true;
			 }
             DrawCircle(shapes[i]);
    	   }
    	  }
         if (growing==false)
    	      clearInterval(interv);     
     }
	 
	 
	 function startCircle(event){
	   if(!Start)
	      return;
	   var rect = canvas.getBoundingClientRect();
       var x=(event.clientX-rect.left)/(rect.width)*canvas.width;
       var y= (event.clientY-rect.top)/(rect.height)*canvas.height;
 //     var x=event.clientX-rect.left;
//	    var y= event.clientY-rect.top;
       
	   if ((i=PointInsideCircles(x,y)) !=-1)   // regraw old circle
		{
			shapes[i].growing=true;
			interv=setInterval(draw, 1000/30);
			return;
		}
	   var c=new shape(x, y, "circle");
       if (!CircleInsideCanvas(c,canvas)||CirclesIntersect(c) )
	   {
		    DrawMistakeCircle(c);
			mistakes++;
			if (mistakes==3)
			{
			   Start=false;
			   setCookie("best-circles", best,180 );
			   clearInterval(interv);
			   messageContainer = document.querySelector(".game-message");
			   messageContainer.classList.add("game-over");
			   messageContainer.getElementsByTagName("p")[0].textContent ="Game over!";
			}			
		    return;
	    }
		
			
	   mistakes=0;
	   redraw();
	   shapes.push(c);
	   clearInterval(interv);
	   interv=setInterval(draw, 1000/30);
	   score+=level;
	   var newlevel= GetLevel(score);
	   document.getElementById('score-container').innerHTML=score;
	 
	   if(score > best)
	   {
	     best=score;
	     document.getElementById('best-container').innerHTML= best;
		}
		if (newlevel>level){
			level=newlevel;
			messageContainer = document.querySelector(".game-message");
            messageContainer.classList.add("game-continue");
			var txt = "Conratulations! You've reached level "+ level +" !"
            messageContainer.getElementsByTagName("p")[0].textContent =txt;
			ShareScore();
		}
/*		var len=scoreLevels.length;
		for (var i=0; i<len; i++)
			if(score==scoreLevels[i])
            {
              messageContainer = document.querySelector(".game-message");
              messageContainer.classList.add("game-continue");
			  var txt = "Conratulations! You've reached level "+ (i+2) +" !"
              messageContainer.getElementsByTagName("p")[0].textContent =txt;
            }   */
	 }
	 
	 function PointInsideCircles(x,y){
	    for (i=0; i<shapes.length; i++)
		  if( (x-shapes[i].ct_x)*(x-shapes[i].ct_x)+ (y-shapes[i].ct_y)*(y-shapes[i].ct_y) <  (shapes[i].r+3)*(shapes[i].r+3))
		      return i;
	    return -1;
	 }

	 function CircleInsideCanvas(circle,canvas){
	   if(circle.ct_x-circle.r < 0 || circle.ct_x+circle.r >canvas.width 
  	   || circle.ct_y-circle.r < 0 || circle.ct_y+circle.r >canvas.height)
		   return false;
//		console.log("true");
		return true
	 }
	 function CirclesIntersect(circle){	 
	    for(var i=0; i<shapes.length; i++)		
	        if(Math.pow(circle.ct_x-shapes[i].ct_x,2)+ Math.pow(circle.ct_y-shapes[i].ct_y,2)<Math.pow(circle.r+shapes[i].r,2))
	           return true;
	   return false;	  
	 }
	 function CirclesTouch(circle1, circle2){	 		
	    if(Math.pow(circle1.ct_x-circle2.ct_x,2)+ Math.pow(circle1.ct_y-circle2.ct_y,2)<=Math.pow(circle1.r+circle2.r,2))
	         return true;
	 return false;	  
	 }
	 function DrawMistakeCircle(circle)
	 {	   
	   var dotsPerCircle=20;

       var interval=(Math.PI*2)/dotsPerCircle;   
       
       var centerX=circle.ct_x;
       var centerY=circle.ct_y;
       var radius=circle.r;
       
       for(var i=0;i<dotsPerCircle;i++)
	   {
       
           desiredRadianAngleOnCircle = interval*i;
           
           var x = centerX+radius*Math.cos(desiredRadianAngleOnCircle);
           var y = centerY+radius*Math.sin(desiredRadianAngleOnCircle);
       
            context.beginPath();
            context.arc(x,y,.8,0,Math.PI*2);
            context.closePath();
			context.fillStyle="#000000";
            context.fill();
           
       }   	   	 
	 }
	 
	 function DrawCircle(c){
		context.beginPath();
        context.arc(c.ct_x, c.ct_y, c.r, 0, 2 * Math.PI, false);
    	context.fillStyle = c.clr;						
        context.fill(); 
		 
	 }
	 
	function Close(){
	
	setCookie("best-circles", best,180 );	
}	

