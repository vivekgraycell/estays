document.addEventListener("deviceready", onDeviceReady, true);

var mins;
var secs;
var currentMinutes = 0;
var currentSeconds = 0;

function onDeviceReady(){
	
	
	
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Arb"){
		window.location.replace("../arabic/notification-hotel-detail.html");
	}else{
		
		/*var minCovered = window.localStorage.getItem("min_covered");
		
		var newMinCovered;
		
		if(minCovered === minCovered || minCovered === null || minCovered.length === 0){
			newMinCovered = 0;
		}else{
			newMinCovered = minCovered;
		}*/
		
		var id = window.localStorage.getItem("hotel_book_id");
//		var fiveMinutes = 60.0 * 30, display = document.querySelector('#countdown');
//		startTimer(fiveMinutes, display);
		mins = 30;
		var previousMins = window.localStorage.getItem("currentMin");
		if(previousMins === undefined || previousMins === null || previousMins.length === 0){
			
			secs = mins * 60;
		}else{
			var intpm = parseInt(previousMins);
			mins = intpm; 
			secs = mins * 60;
		}
		
		console.log("mins : "+mins+"  secs : "+secs);
		
		setTimeout(Decrement,1000);
		
		var networkState = navigator.network.connection.type;

	    var states = {};
	    states[Connection.UNKNOWN]  = 'Unknown connection';
	    states[Connection.ETHERNET] = 'Ethernet connection';
	    states[Connection.WIFI]     = 'WiFi connection';
	    states[Connection.CELL_2G]  = 'Cell 2G connection';
	    states[Connection.CELL_3G]  = 'Cell 3G connection';
	    states[Connection.CELL_4G]  = 'Cell 4G connection';
	    states[Connection.NONE]     = 'No network connection';

//	    alert("networkState "+networkState);

	    if (networkState == 'unknown' || networkState == 'none') {
	    	alert("Please check your internet connection.");
	    }else{
	    	fetchHotelDetails(id);
	    }
		
		
	}
	
	var selcurrncytyp = window.localStorage.getItem("currencyType");
	if(selcurrncytyp === undefined || selcurrncytyp === null || selcurrncytyp.length === 0){
		window.localStorage.setItem("currencyType", "USD");
//		alert("Default currency type is USD.");
		$("#radio02").prop("checked", true);
	}else{
//		alert("Current currency type is  : "+window.localStorage.getItem("currencyType"));
		var defCurrency = window.localStorage.getItem("currencyType");
		if(defCurrency == "SR"){
			$("#radio02").prop("checked", false);
			$("#radio01").prop("checked", true);
		}else if(defCurrency == "USD"){
			$("#radio01").prop("checked", false);
			$("#radio02").prop("checked", true);
		}
	}
	
	var lsItem = window.localStorage.getItem("user_user_id");
	if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
		document.getElementById("logoutbtn").innerHTML = "Login";
	}else{
		document.getElementById("logoutbtn").innerHTML = "Logout";
	}
	
	var previousMins = window.localStorage.getItem("currentMin");
	if(previousMins === undefined || previousMins === null || previousMins.length === 0){
		//Do nothing
	}else{
		var intpm = parseInt(previousMins);
		if(intpm > 29){
			window.localStorage.removeItem("notification_count_int");
		}else{
			var notCount = window.localStorage.getItem("notification_count_int");
if(notCount === undefined || notCount === null || notCount.length === 0){
				
			}else{
				var intcount = parseInt(notCount);
			var notificationSecondRow = document.getElementById("notification_count");
			notificationSecondRow.style.display = 'block';
			document.getElementById("notification_count").innerHTML = intcount;
			}
			
		}
	}
}

function Decrement(){
	currentMinutes = Math.floor(secs / 60);
    currentSeconds = secs % 60;
    if(currentSeconds <= 9) currentSeconds = "0" + currentSeconds;
    secs--;
    
    window.localStorage.setItem("currentMin", currentMinutes);
    document.getElementById("countdown").innerHTML = "00:"+ currentMinutes + ":" + currentSeconds; //Set the element id you need the time put into.
    if(secs !== -1) setTimeout('Decrement()',1000);
}

function startTimer(duration, display) {
	var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        var oldMin = window.localStorage.getItem("countdownMin");
        var oldSec = window.localStorage.getItem("countdownSec");
        
        if(oldMin === undefined || oldMin === null || oldMin.length === 0){
        	minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        }else{
        	minutes = oldMin;
        	seconds = oldSec;
        	minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
        }
        
console.log("min "+minutes+" sec "+seconds);
        
        display.textContent = "00:"+ minutes + ":" + seconds;
    	
    	window.localStorage.setItem("countdownMin", minutes);
        window.localStorage.setItem("countdownSec", seconds);

        
        
        /*console.log("min "+minutes+" sec "+seconds);
        
        var oldMin = window.localStorage.getItem("countdownMin");
        var oldSec = window.localStorage.getItem("countdownSec");
        
        console.log("oldMin "+oldMin+" oldSec "+oldSec);
        
        if(oldMin == undefined || oldMin == null || oldMin.length == 0){
        	display.textContent = "00:"+ minutes + ":" + seconds;
        	
        	window.localStorage.setItem("countdownMin", minutes);
            window.localStorage.setItem("countdownSec", seconds);
        }else{
        	display.textContent = "00:"+ oldMin + ":" + oldSec;
        	
        	window.localStorage.setItem("countdownMin", oldMin);
            window.localStorage.setItem("countdownSec", oldSec);
        }*/

//        display.textContent = "00:"+ minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function openHotelBookPage(){
	window.open("hotel-book.html");
}

function fetchHotelDetails(id){
	$.ajax({
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hoteldetail',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		data: {hotelId:id},
		dataType : 'json',
		contentType: "application/json",
		success: function(data){
			document.getElementById("details_hotel_name").innerHTML += data.hotelDetail.hotelName;
			document.getElementById("details_hotel_contact").innerHTML += data.hotelDetail.hotelContact;
			document.getElementById("details_hotel_address").innerHTML += data.hotelDetail.hotelAddress;
			document.getElementById("htl_description_txt").innerHTML = data.hotelDetail.aboutHotel;
			document.getElementById("banner_img").src = data.hotelDetail.hotelMainpic;
			
			$('#banner_img')
			.error(function(){
				document.getElementById("banner_img").src = '../../img/no_image.jpg';
			});
			
			window.localStorage.setItem("notification_hotel_name", data.hotelDetail.hotelName);
			
			if(data.hotelDetail.hotelTypes.length > 0){
				$.each(data.hotelDetail.hotelTypes, function(index, hotelTypes){
					window.localStorage.setItem("notification_hotel_type", hotelTypes.hotelType);
				});
			}
			
			if(data.hotelDetail.galleryImages.length > 0){
				$.each(data.hotelDetail.galleryImages, function(index, galleryImages) {
				$('#htl_detl_img').append("<div class='photo'><img src="+ galleryImages.hotelImage +" alt='../../img/photos01.jpg' onclick='imageclicked(this.src, this.alt)');'></div>");
				});
			}else{
				$('#htl_detl_img').append("<div class='photo'><img src='../../img/no_image.jpg' alt='../../img/photos01.jpg' ></div>");
			}
			
			/*$.each(data.hotelDetail, function(index, hotelDetail) {
				document.getElementById("details_hotel_name").innerHTML += hotelDetail.hotelName;
				document.getElementById("details_hotel_contact").innerHTML += hotelDetail.hotelContact;
				document.getElementById("details_hotel_address").innerHTML += hotelDetail.hotelAddress;
				document.getElementById("htl_description_txt").innerHTML = hotelDetail.aboutHotel;
				
				document.getElementById("banner_img").src = hotelDetail.hotelMainpic;
				
				$.each(data.hotelDetail.galleryImages, function(index, galleryImages) {
					$('#htl_detl_img').append("<div class='photo'><img src="+ galleryImages.hotelImage +" alt='../../img/photos01.jpg' ></div>");
					
					});
				});*/

			/*for (var i = 0; i < data.hotelDetail.length; i++){
				alert("Hotel Id :"+data.hotelDetail[i].hotelid+" hotel name : "+data.hotelDetail[i].hotelName+" Hotel Email : "+data.hotelDetail[i].
                                hotelEmail+" Hotel Address: "+data.hotelDetail[i].hotelAddress);

				document.getElementById("details_hotel_name").innerHTML += data.hotelDetail[i].hotelName;
				document.getElementById("details_hotel_contact").innerHTML += data.hotelDetail[i].hotelContact;
				document.getElementById("details_hotel_address").innerHTML += data.hotelDetail[i].hotelAddress;
				document.getElementById("htl_description_txt").innerHTML = data.hotelDetail[i].aboutHotel;
				
				document.getElementById("banner_img").src = data.hotelDetail[i].hotelMainpic;
				
				$.each(data.hotelDetail.galleryImages, function(index, galleryImages) {
					$('#htl_detl_img').append("<div class='photo'><img src="+ galleryImages.hotelImage +" alt='../../img/photos01.jpg' ></div>");
					
					});

			}*/
			document.getElementById("loadingimg").style.display = "none";
		},
		error: function(xhr){
//			alert(""+xhr.responseText);
			var jsonResponse = JSON.parse(xhr.responseText);
			document.getElementById("loadingimg").style.display = "none";
			alert("Error  : "+jsonResponse.message);
		},
		async: true,
		cache: false
	});
}

//Get the modal
var modal = document.getElementById('myModal');
//Get top banner
var topbannerDiv = document.getElementById('top_banner_div');

//Get the image and insert it inside the modal - use its "alt" text as a caption
//var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");

function imageclicked(src, alt){
	modal.style.display = "block";
	modalImg.src = src;
    modalImg.alt = alt;
    
    topbannerDiv.style.display = "none";
    
}

/*img.onclick = function(){
    
    modalImg.src = this.src;
    modalImg.alt = this.alt;
}*/

//Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
  topbannerDiv.style.display = "block";
}

function showImage(smSrc, lgSrc) {
    document.getElementById('largeImg').src = smSrc;
    showLargeImagePanel();
    unselectAll();
    setTimeout(function() {
        document.getElementById('largeImg').src = lgSrc;
    }, 1)
}
function showLargeImagePanel() {
    document.getElementById('largeImgPanel').style.display = 'block';
}
function unselectAll() {
    if(document.selection)
        document.selection.empty();
    if(window.getSelection)
        window.getSelection().removeAllRanges();
}

function backButton(){
    navigator.app.backHistory();
}

function logoutUser(){
	var lsItem = window.localStorage.getItem("user_user_id");

	if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
		//User not login. Show error dialog.
//		alert("Unable to perform operation as user is not currently loggedIn.");
		window.localStorage.setItem("NotificationHotelDetail", "Yes");
		window.open("register.html");
	}else{
		//User is login. Continue login
		
		if(confirm("Are you sure you want to logout?") == true){
			//Ok button clicked
			var networkState = navigator.network.connection.type;

		    var states = {};
		    states[Connection.UNKNOWN]  = 'Unknown connection';
		    states[Connection.ETHERNET] = 'Ethernet connection';
		    states[Connection.WIFI]     = 'WiFi connection';
		    states[Connection.CELL_2G]  = 'Cell 2G connection';
		    states[Connection.CELL_3G]  = 'Cell 3G connection';
		    states[Connection.CELL_4G]  = 'Cell 4G connection';
		    states[Connection.NONE]     = 'No network connection';

//		    alert("networkState "+networkState);

		    if (networkState == 'unknown' || networkState == 'none') {
		    	alert("Please check your internet connection.");
		    }else{
		    	var data = {userId:window.localStorage.getItem("user_user_id") , deviceId:window.localStorage.getItem("user_device_Id")};
			$.ajax({
				type : 'POST',
				url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/logout',
				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
				crossDomain : true,
				data : JSON.stringify(data),
				dataType : 'json',
				contentType: "application/json",
				success : function(data){
					document.getElementById("logoutbtn").innerHTML = "Login";
					document.getElementById("loadingimg").style.display = "none";
					alert(""+data.message);
					window.localStorage.removeItem("user_user_id");
					var prflImgPath = window.localStorage.getItem("profileImgPath");
					if(prflImgPath === undefined || prflImgPath === null || prflImgPath.length === 0){
					}else{
						window.localStorage.removeItem("profileImgPath");
					}
				},error : function(xhr) {
					var jsonResponse = JSON.parse(xhr.responseText);
					document.getElementById("loadingimg").style.display = "none";
					alert(""+jsonResponse.message);
				}
			});
		    }
			
			
		}else{
			//Cancel button clicked
			//Do nothing.
		}
	}
}

function changeLanguageBtn(){
	if(confirm("Change language to Arabic.") == true){
		//Ok button clicked.
		window.localStorage.setItem("selectedLanguage", "Arb");
		window.location.replace("../arabic/notification-hotel-detail.html");
	}else{
		//Cancel button clicked.
	}
}

function openProfileFoot(){
	window.open("user-profile.html");
}

function openSearchFoot(){
	window.open("search.html");
}

function notificationFoot(){
	window.open("user-bid.html");
}

function bookingFoot(){
	window.open("bookings.html");
}

function changecurrencyUSD(){
	window.localStorage.setItem("currencyType", "USD");
	
var defCurrency = window.localStorage.getItem("currencyType");
	
	if(defCurrency == "SR"){
		$("#radio02").prop("checked", false);
		$("#radio01").prop("checked", true);
	}else if(defCurrency == "USD"){
		$("#radio01").prop("checked", false);
		$("#radio02").prop("checked", true);
	}
}

function changecurrencySR(){
	window.localStorage.setItem("currencyType", "SR");
	
var defCurrency = window.localStorage.getItem("currencyType");
	
	if(defCurrency == "SR"){
		$("#radio02").prop("checked", false);
		$("#radio01").prop("checked", true);
	}else if(defCurrency == "USD"){
		$("#radio01").prop("checked", false);
		$("#radio02").prop("checked", true);
	}
}