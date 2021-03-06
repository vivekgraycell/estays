document.addEventListener("deviceready", onDeviceReady, true);
function onDeviceReady(){
	
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng"){
		window.location.replace("../english/checkbidstatus.html");
	}else{
		
	}
	
//	db = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
	
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

function openBookingFoot(){
	window.open("bookings.html");
}

function openProfileFoot(){
	window.open("user-profile.html");
}

function openNotificationFoot(){
	window.open("user-bid.html");
}

function termsandconditionsscreen(){
	window.open("termsandcondition.html");
}

function backButton(){
    history.go(-1);navigator.app.backHistory();
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
function validationCheck(){
			if(document.getElementById("reference_number").value == ""){
                
                navigator.notification.alert(
                                             'Enter reference number.',  // message
                                             function(){},         // callback
                                             'Alert',            // title
                                             'OK'                  // buttonName
                                             );
                return false;
                
			}else{
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
		    	console.log("referralId : "+document.getElementById("reference_number").value);
		    	var data = {referralId:document.getElementById("reference_number").value};
			$.ajax({
				type : 'GET',
				url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/bookingInfo',
				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
				crossDomain : true,
				data : data,
				dataType : 'json',
				contentType: "application/json",
				success : function(res){
					document.getElementById("loadingimg").style.display = "none";
					document.getElementById("statusblock").style.display = "block";
					document.getElementById("submit_btn").style.display = "none";
					name = res.summary[0].userName;
					email = res.summary[0].userEmail;
					arrivalTime = res.summary[0].arrivalTime;
					phoneNumber = res.summary[0].phoneNumber;
					address = res.summary[0].address;
					countryName = res.summary[0].countryName;
					actualprice = res.summary[0].actualprice;
					checkInDate = res.summary[0].checkInDate;
					checkOutDate = res.summary[0].checkOutDate;
					numberOfRooms = res.summary[0].numberOfRooms;
					hotelName = res.summary[0].hotelName;
					hotelType = res.summary[0].hotelType;
					roomType = res.summary[0].roomType;
					result = '<div class="greyBox">Name : '+name+'</div>'+'<div class="greyBox">Email : '+email+'</div>'+'<div class="greyBox">Arrival Time : '+arrivalTime+'</div>'+'<div class="greyBox">Phone : '+phoneNumber+'</div>'+'<div class="greyBox">Address : '+address+'</div>'+'<div class="greyBox">Price : '+actualprice+'</div>'+'<div class="greyBox">Check In : '+checkInDate+'</div>'+'<div class="greyBox">Check Out : '+checkOutDate+'</div>'+'<div class="greyBox">Number Of Rooms : '+numberOfRooms+'</div>'+'<div class="greyBox">Hotel Name : '+hotelName+'</div>'+'<div class="greyBox">Type : '+hotelType+'</div>'+'<div class="greyBox">Room Type : '+roomType+'</div>'+'<div class="greyBox">Country : '+countryName+'</div>';
					$('#statusresult').html(result);
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

function errorHandler(transaction, error) {
    
    navigator.notification.alert(
                                 'Error: ' + error.message + ' code: ' + error.code,  // message
                                 function(){},         // callback
                                 'Alert',            // title
                                 'OK'                  // buttonName
                                 );
    
    return false;
}
