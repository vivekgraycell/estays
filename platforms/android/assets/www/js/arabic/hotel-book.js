document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady(){
	
	
	
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng"){
		window.location.replace("../english/hotel-book.html");
	}else{
		
		var monthNames = [
		                  "January", "February", "March",
		                  "April", "May", 'June', "July",
		                  "August", "September", "October",
		                  "November", "December"
		                ];

		                var date = new Date(window.localStorage.getItem("notification_hotel_date"));
		                var day = date.getDate();
		                var monthIndex = date.getMonth();
		                var year = date.getFullYear();

		                var finalDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
		
		document.getElementById("book_hotel_name").innerHTML = window.localStorage.getItem("notification_hotel_name");
		document.getElementById("book_hotel_type").innerHTML = window.localStorage.getItem("notification_hotel_type");
		document.getElementById("book_hotel_date").innerHTML = finalDate;
		calculateYearAndMonths();
		calYear();
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

function bookhotel(){
	/*var spin_card_date = document.getElementById("book_hotel_ccexp_mnth");
    var card_date = spin_card_date.options[spin_card_date.selectedIndex].value;
    
    var spin_card_year = document.getElementById("book_hotel_ccexp_year");
    var card_year = spin_card_year.options[spin_card_year.selectedIndex].text;*/
    
	var currentDate = new Date();
	var year = currentDate.getFullYear() - 1; 
    
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
			    	var data = {userId:window.localStorage.getItem("user_user_id") , gcmId:window.localStorage.getItem("user_device_Id") , hotelId:window.localStorage.getItem("hotel_book_id"), bidId:window.localStorage.getItem("hotel_bid_id"), userCountry:window.localStorage.getItem("countryVisitingId")};
				$.ajax({
					type : 'POST',
					url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hotelBooking',
					beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
					crossDomain : true,
					data : JSON.stringify(data),
					dataType : 'json',
					contentType: "application/json",
					success : function(data){
						document.getElementById("loadingimg").style.display = "none";
						var clickedBidIdFrmList = window.localStorage.getItem("clicked_booked_id");
                       navigator.notification.alert(
                                                    "Your Booking Id is : "+data.hotelBookingId,  // message
                                                    function(){
                                                    
                                                    window.localStorage.removeItem("timerStarted");
                                                    window.localStorage.removeItem("notification_count_int");
                                                    window.localStorage.removeItem("currentMin"+clickedBidIdFrmList);
                                                    window.localStorage.setItem("hotel_booked", "yes");
                                                    window.localStorage.removeItem("startProcess"+clickedBidIdFrmList);
                                                    window.localStorage.removeItem("bidSuccessTime"+clickedBidIdFrmList);
                                                    window.localStorage.removeItem("hotel_bid_id_"+clickedBidIdFrmList);
                                                    window.location.replace("search.html");
      
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

function calYear(){
	var min = new Date().getFullYear(), max = min + 10, select = document.getElementById('book_hotel_ccexp_year');
	for (var i = min; i<=max; i++){
		
		$('#book_hotel_ccexp_year').append("<option value='" + i +"' text='" + i + "'>"+i+"</option>");
		
	    /*var opt = document.createElement('option');
	    opt.value = i;
	    opt.innerHTML = i;
	    select.appendChild(opt);*/
	}
}

function calculateYearAndMonths(){
	var minDate = 1, maxDate = minDate + 30, select = document.getElementById('book_hotel_ccexp_mnth');
	
	for (var j = minDate; j<=maxDate; j++){
		$('#book_hotel_ccexp_mnth').append("<option value='" + j +"' text='" + j + "'>"+j+"</option>");
	    /*var opt = document.createElement('option');
	    opt.value = j;
	    opt.innerHTML = j;
	    select.appendChild(opt);*/
	}
}
