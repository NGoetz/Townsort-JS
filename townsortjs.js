// a javascript-version of my C-programm "townsort", using webstorage and jQuery 

$(document).ready(function() {
        
    restoreContents();
    
    	$('#edit').bind('click', toggleEditContent);
    	$('#clear').bind('click', resetContent);
	$('#people').bind('click', sortpeople);
	$('#name').bind('click', sortname);
	$('#lat').bind('click', sortgeola);
	$('#lon').bind('click', sortgeolo);
	$('#degree').bind('click', google);
	

    
    function saveContents() {
        var townlist = $('#townlist').html();
        localStorage['townlist'] = townlist;  //saves into local storage; available for modern browsers
	
    }
    
    function restoreContents() {
        var mytownlist = localStorage['townlist'];
        if (mytownlist != undefined) {
            $('#townlist').html(mytownlist);
        }
    }
    
    function toggleEditContent(e) {   //makes box editable
        if ($('#townlist').attr('contenteditable') == 'false') {
            $('#townlist').attr('contenteditable', 'true');
            $('#edit').val('Save');
            $('#todolist').focus();
        } else {
            $('#townlist').attr('contenteditable', 'false');
            $('#edit').val('Edit');
            saveContents();
        }
    }
    
    function resetContent(e) {
        localStorage.clear();
        window.location.reload();
	
    }


	function sortpeople () {  //uses bubblesort and stringmethods to sort by inhabitants
	

	var number = document.getElementsByTagName("li").length;
	listoftowns=gettown(number);
	
		for (i=0; i<=number-1; i++) {
			
			for (j=0; j<=number-1; j++) {
				container=listoftowns [i] [3];
				listoftowns [i] [3] = parseInt (container);
				container=listoftowns [j] [3];
				listoftowns [j] [3] = parseInt(container);
				if (!(listoftowns [i] [3])){
					listoftowns [i] [3] = 0;
				}
				if (!(listoftowns [j] [3])){
					listoftowns [j] [3] = 0;
				}
				if (listoftowns [i] [3] > listoftowns [j] [3] ) {
					var puffer = listoftowns [i];
					listoftowns [i] = listoftowns [j];
					listoftowns [j] = puffer;
				}
			}
		}
		for (i=number+1; i>=0; i--){
			if(document.getElementsByTagName("ol")[0].firstChild) {
			var knot = document.getElementsByTagName("ol")[0].firstChild;
      			document.getElementsByTagName("ol")[0].removeChild(knot);
			}
		}
		
		for (n=0; n<=number-1; n++){
			var a = listoftowns [n] [0];
			var b = listoftowns [n] [1];
			var c = listoftowns [n] [2];
			var d = listoftowns [n] [3];
			var newLI = document.createElement("li");
			var newLIText = document.createTextNode(""+a+"; "+b+"; "+c+"; "+d+"") ;
			$('#townlist').append(newLI);
			document.getElementsByTagName("li")[n].appendChild(newLIText);
			
			
			
		}
		
	}
	
/*gettown reads the given information in the box and saves it in an multidimensional array. 
It is used for all sorting functions.
*/
function gettown(number) {
		
		listoftowns = new Array ();
		for (i=0; i<=number-1; i++) {
			listoftowns [i] = document.getElementsByTagName("li") [i].innerHTML;
			if (listoftowns [i].lastIndexOf('<')!=-1) {
				old=listoftowns [i];
				listoftowns [i]=old.slice(0, listoftowns [i].lastIndexOf('<'));
			}
		}
		for (i=0; i<=number-1; i++){
		container = listoftowns [i];
		listoftowns [i] = container.split (';', 4);
		}
		return listoftowns;

		
	}

function sortname() {   //mostly like all the other sorting functions
var number = document.getElementsByTagName("li").length;
	listoftowns=gettown(number);
	
		for (i=0; i<=number-1; i++) {
			
			for (j=0; j<=number-1; j++) {

				if (listoftowns [i] [0].localeCompare(listoftowns [j] [0]) < 0 ) {
					var puffer = listoftowns [i];
					listoftowns [i] = listoftowns [j];
					listoftowns [j] = puffer;
				}
			}
		}
		for (i=number+1; i>=0; i--){
			if(document.getElementsByTagName("ol")[0].firstChild) {
			var knot = document.getElementsByTagName("ol")[0].firstChild;
      			document.getElementsByTagName("ol")[0].removeChild(knot);
			}
		}
		
		for (n=0; n<=number-1; n++){
			var a = listoftowns [n] [0];
			var b = listoftowns [n] [1];
			var c = listoftowns [n] [2];
			var d = listoftowns [n] [3];
			var newLI = document.createElement("li");
			var newLIText = document.createTextNode(""+a+"; "+b+"; "+c+"; "+d+"") ;
			$('#townlist').append(newLI);
			document.getElementsByTagName("li")[n].appendChild(newLIText);
			
			
			
		}
		
}

function sortgeola () {
	

	var number = document.getElementsByTagName("li").length;
	listoftowns=gettown(number);
	
		for (i=0; i<=number-1; i++) {
			
			for (j=0; j<=number-1; j++) {
				container1=listoftowns [i] [1];
				if(typeof(container1)=="string") {
				container=container1.replace(/,/ ,".");}
				else {
				container=container1;
				}
				listoftowns [i] [1] = deci(container, true);
				container1=listoftowns [j] [1];
				if(typeof(container1)=="string") {
				container=container1.replace(/,/ ,".");}
				else {
				container=container1;
				listoftowns [j] [1] = deci(container, true);
				}
				if (!(listoftowns [i] [1])){
					listoftowns [i] [1] = 0;
				}
				if (!(listoftowns [j] [1])){
					listoftowns [j] [1] = 0;
				}
				if (listoftowns [i] [1] > listoftowns [j] [1] ) {
					var puffer = listoftowns [i];
					listoftowns [i] = listoftowns [j];
					listoftowns [j] = puffer;
				}
			}
		}
		for (i=number+1; i>=0; i--){
			if(document.getElementsByTagName("ol")[0].firstChild) {
			var knot = document.getElementsByTagName("ol")[0].firstChild;
      			document.getElementsByTagName("ol")[0].removeChild(knot);
			}
		}
		
		for (n=0; n<=number-1; n++){
			var a = listoftowns [n] [0];
			var b = listoftowns [n] [1];
			var c = listoftowns [n] [2];
			var d = listoftowns [n] [3];
			var newLI = document.createElement("li");
			var newLIText = document.createTextNode(""+a+"; "+b+"; "+c+"; "+d+"") ;
			$('#townlist').append(newLI);
			document.getElementsByTagName("li")[n].appendChild(newLIText);
			
			
			
		}
		
	}

function sortgeolo () {
	

	var number = document.getElementsByTagName("li").length;
	listoftowns=gettown(number);
	
		for (i=0; i<=number-1; i++) {
			
			for (j=0; j<=number-1; j++) {
				container1=listoftowns [i] [2];
				if(typeof(container1)=="string") {
				container=container1.replace(/,/ ,".");}
				else {
				container=container1;
				}
				listoftowns [i] [2] = deci(container, false);
				container1=listoftowns [j] [2];
				if(typeof(container1)=="string") {
				container=container1.replace(/,/ ,".");}
				else {
				container=container1;
				listoftowns [j] [2] = deci(container, false);
				}
				if (!(listoftowns [i] [2])){
					listoftowns [i] [2] = 0;
				}
				if (!(listoftowns [j] [2])){
					listoftowns [j] [2] = 0;
				}
				if (listoftowns [i] [2] < listoftowns [j] [2] ) {
					var puffer = listoftowns [i];
					listoftowns [i] = listoftowns [j];
					listoftowns [j] = puffer;
				}
			}
		}
		for (i=number+1; i>=0; i--){
			if(document.getElementsByTagName("ol")[0].firstChild) {
			var knot = document.getElementsByTagName("ol")[0].firstChild;
      			document.getElementsByTagName("ol")[0].removeChild(knot);
			}
		}
		
		for (n=0; n<=number-1; n++){
			var a = listoftowns [n] [0];
			var b = listoftowns [n] [1];
			var c = listoftowns [n] [2];
			var d = listoftowns [n] [3];
			var newLI = document.createElement("li");
			var newLIText = document.createTextNode(""+a+"; "+b+"; "+c+"; "+d+"") ;
			$('#townlist').append(newLI);
			document.getElementsByTagName("li")[n].appendChild(newLIText);
			
			
			
		}
		
	}

function deci (element1, lalo) {  //converts standard degrees into decimal-degrees, used in the geosort-functions
	
	element= new String (element1);
	
	var n = true; 
	var k = false;
	//var m = false;
	//var s = false;
	if (element.lastIndexOf("N")<0 && lalo==true && element.lastIndexOf("S")>0){n=false}
	if (element.lastIndexOf("O")<0 && lalo==false && element.lastIndexOf("W")>0){n=false}
	coo = element.replace(/[NSOW]/, "");
	
	var sec=coo.lastIndexOf("''");
	if(sec>0) {
	secv=coo.substring(0,sec); 
	} else {secv=coo;}
	var min=secv.lastIndexOf("'");
	if(min>0) {
	minv=secv.substring(0,min); 
	} else{minv=secv;}
	var grad=minv.lastIndexOf("°");
	if (grad>0) {
	gradv=minv.substring(0,grad); k = true;
	} else {gradv=minv}
	degree=parseFloat(gradv);
	if (k==true) {
	container=gradv+"°";
	minv2=minv.replace(container,"");
	min=parseFloat(minv2)
	if (!min) {min=0}
	container=gradv+"°"+minv2+"'";
	secv2=secv.replace(container,"");
	sec=parseFloat(secv2);
	if (!sec) {sec=0;}
	decidegree1=(sec/3600)+(min/60)+degree;
		if(n==false) {decidegree=-1*decidegree1;}
		else {decidegree=decidegree1;}
	} else {decidegree=gradv;}
	element=decidegree;
	return element;

}

function google() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
       alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
   alert(position.coords.latitude +"; " + position.coords.longitude);
}
 

	
	
    
});