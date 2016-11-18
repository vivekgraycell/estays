document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady(){
	
	
	
var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng"){
		window.location.replace("../english/hotel-detail.html");
	}else{
		var id = window.localStorage.getItem("clicked_hotel_id");
			networkState = checkConnection();
				if (networkState == 'No network connection') {
                    navigator.notification.alert(
                                                 'Please check your internet connection.',  // message
                                                 function(){},         // callback
                                                 'Alert',            // title
                                                 'OK'                  // buttonName
                                                 );
                    
                    return false;
                    
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
		document.getElementById("logoutbtn").innerHTML = "تسجيل الدخول";
	}else{
		document.getElementById("logoutbtn").innerHTML = "خروج";
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
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    return states[networkState];
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
			
			if(data.hotelDetail.galleryImages.length > 0){
				$.each(data.hotelDetail.galleryImages, function(index, galleryImages) {
				$('#htl_detl_img').append("<div class='photo'><img src="+ galleryImages.hotelImage +" alt='../../img/photos01.jpg' onclick='imageclicked(this.src, this.alt)'></div>");
				
				
				
				});
			}else{
				$('#htl_detl_img').append("<div class='photo'><img src='../../img/no_image.jpg' alt='../../img/photos01.jpg' ></div>");
			}
			
			/*$.each(data.hotelDetail.galleryImages, function(index, galleryImages) {
				$('#htl_detl_img').append("<div class='photo'><img src="+ galleryImages.hotelImage +" alt='../../img/photos01.jpg' ></div>");
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
			document.getElementById("loadingimg").style.display = "none";
//			alert(""+xhr.responseText);
			var jsonResponse = JSON.parse(xhr.responseText);
           
           navigator.notification.alert(
                                        "Error  : "+jsonResponse.message,  // message
                                        function(){},         // callback
                                        'Alert',            // title
                                        'OK'                  // buttonName
                                        );
           
           
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
    history.go(-1);navigator.app.backHistory();
}

function logoutUser(){
    var lsItem = window.localStorage.getItem("user_user_id");
    if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
        //User not login. Show error dialog.
        window.localStorage.setItem("SearchPage", "Yes");
        window.open("register.html");
    }else{
        //User is login. Continue login
        
        
        navigator.notification.confirm(
                                       'Are you sure you want to logout?',  // message
                                       function(buttonIndex){
                                       
                                       switch (buttonIndex)
                                       {
                                       case 0:
                                       break;
                                       case 1:
                                       
                                       //Ok button clicked
                                       networkState = checkConnection();
                                       if (networkState == 'No network connection') {
                                       navigator.notification.alert(
                                                                    'Please check your internet connection.',  // message
                                                                    function(){},         // callback
                                                                    'Alert',            // title
                                                                    'OK'                  // buttonName
                                                                    );
                                       return false;
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
                                              document.getElementById("logoutbtn").innerHTML = "تسجيل الدخول";
                                              document.getElementById("loadingimg").style.display = "none";
                                              
                                              navigator.notification.alert(
                                                                           ""+data.message,  // message
                                                                           function(){
                                                                           
                                                                           window.localStorage.removeItem("user_user_id");
                                                                           var prflImgPath = window.localStorage.getItem("profileImgPath");
                                                                           if(prflImgPath === undefined || prflImgPath === null || prflImgPath.length === 0){
                                                                           }else{
                                                                           window.localStorage.removeItem("profileImgPath");
                                                                           }
                                                                           
                                                                           },         // callback
                                                                           'Alert',            // title
                                                                           'OK'                  // buttonName
                                                                           );
                                              
                                              },error : function(xhr) {
                                              var jsonResponse = JSON.parse(xhr.responseText);
                                              document.getElementById("loadingimg").style.display = "none";
                                              navigator.notification.alert(
                                                                           ""+jsonResponse.message,  // message
                                                                           function(){},         // callback
                                                                           'Alert',            // title
                                                                           'OK'                  // buttonName
                                                                           );
                                              
                                              }
                                              });
                                       }
                                       
                                       break;
                                       
                                       }
                                       
                                       },         // callback
                                       'Alert',            // title
                                       ['Confirm'  ,'Cancel']
                                       // buttonName
                                       );
        
    }
}

function changeLanguageBtn(){
    navigator.notification.confirm(
                                   'Change language to English.',  // message
                                   function(buttonIndex){
                                   
                                   switch (buttonIndex)
                                   {
                                   case 0:
                                   break;
                                   case 1:
                                   window.localStorage.setItem("selectedLanguage", "Eng");
                                   window.location.replace("../english/search.html");
                                   break;}
                                   
                                   },         // callback
                                   'Alert',            // title
                                   ['Confirm'  ,'Cancel']
                                   // buttonName
                                   );
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
