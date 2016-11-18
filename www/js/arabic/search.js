document.addEventListener("deviceready", onDeviceReady, true);
document.addEventListener("backbutton", onBackKeyDown, false);
var todaysDate, tomorowDate, checkInSelDate, checkOutSelDate; 

function onDeviceReady(){
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
	
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	
	//Testing purpose
	var yesterdayDate = new Date();
	yesterdayDate.setDate(currentDate.getDate()-1);
	
	todaysDate = yesterdayDate;
	
	var tomorrow = new Date();
	tomorrow.setDate(currentDate.getDate()+1);
	
	tomorowDate = tomorrow; 
	
	var tomDay = tomorrow.getDate();
	var tomMonth = tomorrow.getMonth() + 1;
	var tomYear = tomorrow.getFullYear();
	
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng"){
		window.location.replace("../english/search.html");
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
	    	fetchroomType();
	    }
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
function onBackKeyDown() {
    navigator.app.exitApp();
}

function selecthoteltype(){
//	var checkOutDateVal = window.localStorage.getItem("country_name");
	
	var roomTypeSelted = window.localStorage.getItem("selroomid");
	
	var spin_country_list = document.getElementById("spinner_country_list");
	var spin_state_list = document.getElementById("spinner_state_list");
	var spin_city_list = document.getElementById("spinner_city_list");
    var address = spin_country_list.options[spin_country_list.selectedIndex].text;
    var state = spin_state_list.options[spin_state_list.selectedIndex].text;
    var city = spin_city_list.options[spin_city_list.selectedIndex].text;
    var cityId = spin_city_list.options[spin_city_list.selectedIndex].id;
    var stateId = spin_state_list.options[spin_state_list.selectedIndex].id;
    var countryId = spin_country_list.options[spin_country_list.selectedIndex].id;
    
//    var currDateRaw = window.localStorage.getItem("current_date_raw");
//	var nextDateRaw = window.localStorage.getItem("next_date_raw");
    
    var chckInDt = window.localStorage.getItem("checkInDatePick");
    var chckOutDt = window.localStorage.getItem("checkOutDatePick");
	
	if(state == ""){
        navigator.notification.alert(
                                     'Please select state you are visiting.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;
        
	}if(city == ""){
        
        navigator.notification.alert(
                                     'Please select city you are visiting.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;
        
	}else if(document.getElementById("et_room_required").value == ""){
        navigator.notification.alert(
                                     'Please enter rooms required.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;
        
	}else if(address == ""){
        navigator.notification.alert(
                                     'Please select country.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;
        
	}else if(roomTypeSelted === undefined || roomTypeSelted === null || roomTypeSelted.length === 0){
        navigator.notification.alert(
                                     'Please select room type.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;
        
	}else if(chckInDt === undefined || chckInDt === null || chckInDt.length === 0){
        navigator.notification.alert(
                                     'Please select check-in date.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;
        
	}else if(chckOutDt === undefined || chckOutDt === null || chckOutDt.length === 0){
        navigator.notification.alert(
                                     'Please select check-out date.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;
        
	}else{
		//remove logs
		window.localStorage.removeItem("BookingPage");
		window.localStorage.removeItem("NotificationPage");
		window.localStorage.removeItem("ProfilePage");
		window.localStorage.removeItem("ChoosePrice");
		window.localStorage.removeItem("EditProfile");
		window.localStorage.removeItem("HotelBook");
		window.localStorage.removeItem("HotelDetail");
		window.localStorage.removeItem("NotificationHotelDetail");
		window.localStorage.removeItem("SearchPage");
		window.localStorage.removeItem("SelectHotel");
		window.localStorage.removeItem("SummaryScreen");
		window.localStorage.removeItem("TermsAndConditionScreen");
		window.localStorage.removeItem("UserBid");
		
		var spin_country_list = document.getElementById("spinner_country_list");
		window.localStorage.setItem("sel_country_id_text", ""+spin_country_list.options[spin_country_list.selectedIndex].id);
		
		var contyId = window.localStorage.getItem("sel_country_id_text");
		
		window.localStorage.setItem("countryVisiting", address);
		window.localStorage.setItem("countryVisitingId", countryId);
		window.localStorage.setItem("stateVisiting", state);
		window.localStorage.setItem("cityVisiting", city);
		window.localStorage.setItem("cityVisitingId", cityId);
		window.localStorage.setItem("stateVisitingId", stateId);
		window.localStorage.setItem("roomRequired", document.getElementById("et_room_required").value);
		window.localStorage.setItem("nightsRequired", document.getElementById("et_no_of_nights").value);
		window.open("select-hotel-test.html");
	}
}

function checkInDatePick(){
					window.localStorage.setItem("checkInDatePick", "12"+"/"+"12"+"/"+"2017");
					window.localStorage.setItem("checkOutDatePick", "13"+"/"+"12"+"/"+"2017");

	var options = {
			date: new Date(),
			mode: 'date',
			allowFutureDates:true,
			titleText :'',
			todayText: '',
			androidTheme: window.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
			};

			datePicker.show(options, function(date){
				
				checkInSelDate = date;
				
				console.log("todaysDate : "+ todaysDate+"  checkInSelDate : "+checkInSelDate);
				
				if(checkInSelDate > todaysDate){
					var selectedMnth = date.getMonth() + 1;

					var nextdate = new Date(date.getTime() + (24 * 60 * 60 * 1000));
					var selectedNxtMnth = nextdate.getMonth() + 1;

					if(selectedMnth == 1){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Jan";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 2){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Feb";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 3){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" March";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 4){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Apr";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 5){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" May";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 6){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" June";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 7){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" July";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 8){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Aug";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 9){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Sep";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 10){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Oct";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 11){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Nov";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 12){
						document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Dec";
						document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
					}
					//Next day
					if(selectedNxtMnth == 1){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" Jan";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}else if(selectedNxtMnth == 2){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" Feb";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}else if(selectedNxtMnth == 3){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" March";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}else if(selectedNxtMnth == 4){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" Apr";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}else if(selectedNxtMnth == 5){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" May";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}else if(selectedNxtMnth == 6){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" June";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}else if(selectedNxtMnth == 7){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" July";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}else if(selectedNxtMnth == 8){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" Aug";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}else if(selectedNxtMnth == 9){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" Sep";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}else if(selectedNxtMnth == 10){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" Oct";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}else if(selectedNxtMnth == 11){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" Nov";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}else if(selectedNxtMnth == 12){
						document.getElementById("check_out_dt_mth").innerHTML = " "+nextdate.getDate()+" Dec";
						document.getElementById("check_out_dt_yr").innerHTML = " "+nextdate.getFullYear();
					}
					
					document.getElementById("et_no_of_nights").value = 1;
					window.localStorage.setItem("checkInDatePick", date.getDate()+"/"+selectedMnth+"/"+date.getFullYear());
					window.localStorage.setItem("checkOutDatePick", nextdate.getDate()+"/"+selectedNxtMnth+"/"+nextdate.getFullYear());
					//window.localStorage.setItem("checkInDatePick", "12"+"/"+"12"+"/"+"2017");
					//window.localStorage.setItem("checkOutDatePick", "13"+"/"+"12"+"/"+"2017");
				}else{
                            navigator.notification.alert(
                                                         "Check-In date cannot be before today's date.",  // message
                                                         function(){},         // callback
                                                         'Alert',            // title
                                                         'OK'                  // buttonName
                                                         );
                            return false;
                            
				}
			});
}

function checkOutDatePick(){
	var isCheckInDate = window.localStorage.getItem("checkInDatePick");
	if(isCheckInDate === undefined || isCheckInDate === null || isCheckInDate.length === 0){
       
        navigator.notification.alert(
                                     "Check-out date cannot be selected before check-in date.",  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;
        
	}else{
		var options = {
			date: new Date(),
			mode: 'date',
			allowFutureDates:true,
			titleText :'',
			todayText: '',
			androidTheme: window.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
				};
		
		datePicker.show(options, function(date){
				
				
				checkOutSelDate = date;
				
				if(checkOutSelDate > checkInSelDate){
					var selectedMnth = date.getMonth() + 1;
					if(selectedMnth == 1){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Jan";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 2){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Feb";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 3){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" March";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 4){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Apr";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 5){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" May";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 6){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" June";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 7){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" July";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 8){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Aug";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 9){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Sep";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 10){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Oct";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 11){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Nov";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}else if(selectedMnth == 12){
						document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Dec";
						document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
					}
					window.localStorage.setItem("checkOutDatePick", date.getDate()+"/"+selectedMnth+"/"+date.getFullYear());
					//window.localStorage.setItem("checkOutDatePick", "13"+"/"+"12"+"/"+"2017");
					sdate = window.localStorage.getItem("checkInDatePick");
					edate = window.localStorage.getItem("checkOutDatePick");
					sdate = sdate.split('/');
					edate = edate.split('/');
					sdatenew = sdate[1]+'/'+sdate[0]+'/'+sdate[2];
					edatenew = edate[1]+'/'+edate[0]+'/'+edate[2];
					var stDate = new Date(sdatenew);
					var endDate = new Date(edatenew);
					var timeDiff = Math.abs(endDate.getTime() - stDate.getTime());
					var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
					document.getElementById("et_no_of_nights").value = diffDays;
				}else{
                        
                        navigator.notification.alert(
                                                     "Check-out date cannot be before check-in date.",  // message
                                                     function(){},         // callback
                                                     'Alert',            // title
                                                     'OK'                  // buttonName
                                                     );
                        return false;
				}
				
				
				
//				}
				
			});
	}		
}

function fetchroomType(){
	$.ajax({
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/roomtype',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		contentType: "application/json",
		data: '{}',
		dataType: "json",
		success: function(val) {
			
			for (var i = 0; i < val.roomTYpeList.length; i++){
				$('#room_type_spinner').append("<option id='"+ val.roomTYpeList[i].roomCatId +"' value='" + val.roomTYpeList[i].roomCategory +"' text='" + val.roomTYpeList[i].roomCatId + "'>"+val.roomTYpeList[i].roomCategory+"</option>");
			}
			
			var spin_room_list1 = document.getElementById("room_type_spinner");
            var roomCat1 = spin_room_list1.options[spin_room_list1.selectedIndex].value;
            var roomId1 = spin_room_list1.options[spin_room_list1.selectedIndex].id;
            
            console.log("selroomid : "+roomId1);
			console.log("selroomcat : "+roomCat1);
			
			window.localStorage.setItem("selroomid", roomId1);
			window.localStorage.setItem("selroomcat", roomCat1);
			
			$("#room_type_spinner").change(function() {
				var spin_room_list = document.getElementById("room_type_spinner");
	            var roomCat = spin_room_list.options[spin_room_list.selectedIndex].value;
	            var roomId = spin_room_list.options[spin_room_list.selectedIndex].id;
	            
	            console.log("selroomid : "+roomId);
				console.log("selroomcat : "+roomCat);
				
				window.localStorage.setItem("selroomid", roomId);
				window.localStorage.setItem("selroomcat", roomCat);
		    });
			
			document.getElementById("loadingimg").style.display = "none";
		},
		error: function(xhr, status, error) { 
			document.getElementById("loadingimg").style.display = "none";
           
           navigator.notification.alert(
                                        'Error !!',  // message
                                        function(){},         // callback
                                        'Alert',            // title
                                        'OK'                  // buttonName
                                        );
		},
		async: true,
		cache: false
	});
}

/*function fetchCountryList(){
	$.ajax({
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/countriesListing',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		contentType: "application/json",
		data: '{}',
		dataType: "json",
		success: function(val) {
			for (var i = 0; i < val.countriesList.length; i++){
				var countryName = val.countriesList[i].countryName;
				$('#spinner_country_list').append("<option value='" + val.countriesList[i].geoName +"' text='" + val.countriesList[i].geoId + "'>"+val.countriesList[i].geoName+"</option>");
			}
			document.getElementById("loadingimg").style.display = "none";
		},
		error: function(xhr) { 
			var jsonResponse = JSON.parse(xhr.responseText);
			document.getElementById("loadingimg").style.display = "none";
			alert(""+jsonResponse.message);
		},
		async: true,
		cache: false
	});
}*/

function openBookingFoot(){
	window.open("bookings.html");
}

function openProfileFoot(){
	window.open("user-profile.html");
}

function bookingFoot(){
	window.open("user-bid.html");
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

// Fetch all Country list
function fetchCountryList(){
	$.ajax({
		type: 'GET',
		url: 'http://ip-api.com/json',
		crossDomain: true,
		data: '{}',
		dataType: "json",
		success: function(val) {
			 country = val.country;
			 loadcountry(country);
		},
		error: function(xhr) { 
			var jsonResponse = JSON.parse(xhr.responseText);
           
           navigator.notification.alert(
                                        jsonResponse,  // message
                                        function(){},         // callback
                                        'Alert',            // title
                                        'OK'                  // buttonName
                                        );
		},
		async: true,
		cache: false
	});
	
}
function loadcountry(country){
	$.ajax({
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/countriesListing',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		contentType: "application/json",
		data: '{}',
		dataType: "json",
		success: function(val) {
			document.getElementById("countryblock").style.display = "block";
			for (var i = 0; i < val.countriesList.length; i++){
				if(val.countriesList[i].geoName == country){
					countryId = val.countriesList[i].geoId;
					select = 'selected = "selected"';
				}
				else{
					select = '';
				}
				$('#spinner_country_list').append("<option id='"+ val.countriesList[i].geoId +"' value='" + val.countriesList[i].geoName +"' text='" + val.countriesList[i].geoId + "' " + select +">"+val.countriesList[i].geoName+"</option>");
			}
			fetchStateList(countryId);
			$("#spinner_country_list").change(function() {
				countryId = $(this).find("option:selected").attr('id');
				fetchStateList(countryId);
			});
			document.getElementById("loadingimg").style.display = "none";
		},
		error: function(xhr) { 
			var jsonResponse = JSON.parse(xhr.responseText);
			document.getElementById("loadingimg").style.display = "none";
           
           navigator.notification.alert(
                                        ""+jsonResponse.message,  // message
                                        function(){},         // callback
                                        'Alert',            // title
                                        'OK'                  // buttonName
                                        );
           
		},
		async: true,
		cache: false
	});
}		
// Fetch state list from selected city
function fetchStateList(countryId){
	$('#spinner_state_list').html('');
	//document.getElementById("cityblock").style.display = "none";
	$.ajax({
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/stateListing',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		contentType: "application/json",
		data: {countryId:countryId},
		dataType: "json",
		success: function(val) {
			document.getElementById("stateblock").style.display = "block";
			$('#spinner_state_list').append("<option>--Select State--</option>");
			for (var i = 0; i < val.stateList.length; i++){
				var stateName = val.stateList[i].geoName;
				$('#spinner_state_list').append("<option id='"+ val.stateList[i].geoId +"' value='" + val.stateList[i].geoName +"' text='" + val.stateList[i].geoId + "'>"+val.stateList[i].geoName+"</option>");
			}
			$("#spinner_state_list").change(function() {
				stateid = $(this).find("option:selected").attr('id');
				fetchcitylist(stateid);
			});
			document.getElementById("loadingimg").style.display = "none";
		},
		error: function(xhr) { 
			var jsonResponse = JSON.parse(xhr.responseText);
			document.getElementById("loadingimg").style.display = "none";
           navigator.notification.alert(
                                        ""+jsonResponse.message,  // message
                                        function(){},         // callback
                                        'Alert',            // title
                                        'OK'                  // buttonName
                                        );
           },
		async: true,
		cache: false
	});
}

// Fetch cities of selected state
function fetchcitylist(stateId){
	$('#spinner_city_list').html('');
	$.ajax({
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/cityListing',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		contentType: "application/json",
		data: {stateId:stateId},
		dataType: "json",
		success: function(val) {
			document.getElementById("cityblock").style.display = "block";
			$('#spinner_city_list').append("<option>--Select City--</option>");
			for (var i = 0; i < val.cityList.length; i++){
				var cityName = val.cityList[i].geoName;
				$('#spinner_city_list').append("<option id='"+ val.cityList[i].geoId +"' value='" + val.cityList[i].geoName +"' text='" + val.cityList[i].geoId + "' " + select +">"+val.cityList[i].geoName+"</option>");
			}
			document.getElementById("loadingimg").style.display = "none";
		},
		error: function(xhr) { 
			var jsonResponse = JSON.parse(xhr.responseText);
			document.getElementById("loadingimg").style.display = "none";
           navigator.notification.alert(
                                        ""+jsonResponse.message,  // message
                                        function(){},         // callback
                                        'Alert',            // title
                                        'OK'                  // buttonName
                                        );
           },
		async: true,
		cache: false
	});		
}
