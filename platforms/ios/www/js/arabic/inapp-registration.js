document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady(){
	
	
	
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng"){
		window.location.replace("../english/inapp-registration.html");
	}else{
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


function validationCheck(){
	if(document.getElementById("registration_user_name").value == ""){
        
        navigator.notification.alert(
                                     'Username cannot be left blank.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        
        return false;
        
	}else if(document.getElementById("registration_user_email").value == ""){
        navigator.notification.alert(
                                     'Email address cannot be left empty.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        
        return false;
	}else if(document.getElementById("registration_password").value == ""){
        navigator.notification.alert(
                                     'Password cannot be left blank.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        
        return false;
        
	}else if(document.getElementById("registration_confirm_password").value == ""){
        
        navigator.notification.alert(
                                     'Confirm password cannot be left blank.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        
        return false;
        
	}else if(document.getElementById("registration_phone").value == ""){
        
        navigator.notification.alert(
                                     'Phone number cannot be left blank.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        
        return false;
        
	}else if(document.getElementById("registration_phone").value.length > 10){
        navigator.notification.alert(
                                     'Phone number needs to be of 10 digits only.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        
        return false;
        
	}else if (document.getElementById("registration_password").value != document.getElementById("registration_confirm_password").value){
        navigator.notification.alert(
                                     'Password does not match.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        
        return false;
        
	}else{
		var deviceid = window.localStorage.getItem("user_device_Id");
		var devicetype = window.localStorage.getItem("user_device_type");
		
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
	    	var data = {userName:document.getElementById("registration_user_name").value , userEmail:document.getElementById("registration_user_email").value , userPassword:document.getElementById("registration_password").value, userMobile:document.getElementById("registration_phone").value, deviceId:window.localStorage.getItem("user_device_Id"), deviceType:window.localStorage.getItem("user_device_type")};
		$.ajax({
			type : 'POST',
			url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/register',
			beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
			crossDomain : true,
			data : JSON.stringify(data),
			dataType : 'json',
			contentType: "application/json",
			success : function(data){
				document.getElementById("loadingimg").style.display = "none";
//				alert(""+data.userId);
				window.localStorage.setItem("user_user_id", data.userId);
				window.localStorage.setItem("user_user_acc_email", document.getElementById("registration_user_email").value);
				window.localStorage.setItem("user_user_acc_name", document.getElementById("registration_user_name").value);
				
				var bookingVal = lsItem = window.localStorage.getItem("BookingPage");
				var notificationVal = lsItem = window.localStorage.getItem("NotificationPage");
				var profileVal = lsItem = window.localStorage.getItem("ProfilePage");
				var choosePrice = window.localStorage.getItem("ChoosePrice");	//choose-price-test.html
				var editProfile = window.localStorage.getItem("EditProfile");
				var hotelBook = window.localStorage.getItem("HotelBook");
				var hotelDetail = window.localStorage.getItem("HotelDetail");
				var notificationHotelDetail = window.localStorage.getItem("NotificationHotelDetail");
				var searchPager = window.localStorage.getItem("SearchPage");
				var selectHotel = window.localStorage.getItem("SelectHotel");
				var summaryScreen = window.localStorage.getItem("SummaryScreen");
				var termsAndConditionScreen = window.localStorage.getItem("TermsAndConditionScreen");
				var userBidList = window.localStorage.getItem("UserBid");
				
				if(bookingVal === undefined || bookingVal === null || bookingVal.length === 0){
					if(notificationVal === undefined || notificationVal === null || notificationVal.length === 0){
						if(profileVal === undefined || profileVal === null || profileVal.length === 0){
							if(choosePrice === undefined || choosePrice === null || choosePrice.length === 0){
								if(editProfile === undefined || editProfile === null || editProfile.length === 0){
									if(hotelBook === undefined || hotelBook === null || hotelBook.length === 0){
										if(hotelDetail === undefined || hotelDetail === null || hotelDetail.length === 0){
											if(notificationHotelDetail === undefined || notificationHotelDetail === null || notificationHotelDetail.length === 0){
												if(searchPager === undefined || searchPager === null || searchPager.length === 0){
													if(selectHotel === undefined || selectHotel === null || selectHotel.length === 0){
														if(summaryScreen === undefined || summaryScreen === null || summaryScreen.length === 0){
															if(termsAndConditionScreen === undefined || termsAndConditionScreen === null || termsAndConditionScreen.length === 0){
																if(userBidList === undefined || userBidList === null || userBidList.length === 0){
																	window.open("summary.html");
																}else{
																	window.open("user-bid.html");
																	window.localStorage.removeItem("UserBid");
																}
																
															}else{
																window.open("termsandcondition.html");
																window.localStorage.removeItem("TermsAndConditionScreen");
															}
														}else{
															window.open("summary.html");
															window.localStorage.removeItem("SummaryScreen");
														}
													}else{
														window.open("select-hotel-test.html");
														window.localStorage.removeItem("SelectHotel");
													}
												}else{
													window.open("search.html");
													window.localStorage.removeItem("SearchPage");
												}
											}else{
												window.open("notification-hotel-detail.html");
												window.localStorage.removeItem("NotificationHotelDetail");
											}
										}else{
											window.open("hotel-detail.html");
											window.localStorage.removeItem("HotelDetail");
										}
									}else{
										window.open("hotel-book.html");
										window.localStorage.removeItem("HotelBook");
									}
								}else{
									window.open("edit-user-profile.html");
									window.localStorage.removeItem("EditProfile");
								}
							}else{
								window.open("choose-price-test.html");
								window.localStorage.removeItem("ChoosePrice");
							}
						}else{
							window.open("user-profile.html");
							window.localStorage.removeItem("ProfilePage");
						}
					}else{
						window.open("notification.html");
						window.localStorage.removeItem("NotificationPage");
					}
				}else{
					window.open("bookings.html");
					window.localStorage.removeItem("BookingPage");
				}
				
//				window.open("summary.html");
			},
			error : function(xhr) {
				document.getElementById("loadingimg").style.display = "none";
				var jsonResponse = JSON.parse(xhr.responseText);
               
               navigator.notification.alert(
                                            jsonResponse.message,  // message
                                            function(){},         // callback
                                            'Alert',            // title
                                            'OK'                  // buttonName
                                            );
               
			}
		});
	    }

		
	}
}

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


