document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady(){
	
	
	
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Arb"){
		window.location.replace("../arabic/login.html");
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

function opensignuppage(){
	window.open("inapp-registration.html");
}

function forgotPassword(){
	var nwPass = prompt("Please enter your email");
    if (nwPass != null) {
    	
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
        	var fpdata = {userEmail:nwPass};
        console.log(""+fpdata);
		$.ajax({
			type : 'POST',
			url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/forgotPass',
			beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
			crossDomain : true,
			data : JSON.stringify(fpdata),
			dataType : 'json',
			contentType: "application/json",
			success : function(data){
				document.getElementById("loadingimg").style.display = "none";

               navigator.notification.alert(
                                            ""+data.message,  // message
                                            function(){},         // callback
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
}

function validationCheck(){
	if(document.getElementById("login_user_email").value == ""){
		
        navigator.notification.alert(
                                     'Email address cannot be left blank.',  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        
        return false;
	}else if(document.getElementById("login_password").value == ""){
    
        navigator.notification.alert(
                                     'Password cannot be left blank.',  // message
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
	    	var data = {userEmail:document.getElementById("login_user_email").value , userPassword:document.getElementById("login_password").value, deviceId:window.localStorage.getItem("user_device_Id"), deviceType:window.localStorage.getItem("user_device_type"), loginType:"applogin"};
		$.ajax({
			type : 'POST',
			url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/login',
			beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
			crossDomain : true,
			data : JSON.stringify(data),
			dataType : 'json',
			contentType: "application/json",
			success : function(data){
				document.getElementById("loadingimg").style.display = "none";
//				alert(""+data.userId);
				window.localStorage.setItem("user_user_id", data.userId);
				window.localStorage.setItem("user_user_acc_email", document.getElementById("login_user_email").value);
				
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
																	window.localStorage.removeItem("UserBid");
																	window.open("user-bid.html");
																}
															}else{
																window.localStorage.removeItem("TermsAndConditionScreen");
																window.open("termsandcondition.html");
															}
														}else{
															window.localStorage.removeItem("SummaryScreen");
															window.open("summary.html");
														}
													}else{
														window.localStorage.removeItem("SelectHotel");
														window.open("select-hotel-test.html");
													}
												}else{
													window.localStorage.removeItem("SearchPage");
													window.open("search.html");
												}
											}else{
												window.localStorage.removeItem("NotificationHotelDetail");
												window.open("notification-hotel-detail.html");
											}
										}else{
											window.localStorage.removeItem("HotelDetail");
											window.open("hotel-detail.html");
										}
									}else{
										window.localStorage.removeItem("HotelBook");
										window.open("hotel-book.html");
									}
								}else{
									window.localStorage.removeItem("EditProfile");
									window.open("edit-user-profile.html");
								}
							}else{
								window.localStorage.removeItem("ChoosePrice");
								window.open("choose-price-test.html");
							}
						}else{
							window.localStorage.removeItem("ProfilePage");
							window.open("user-profile.html");
						}
					}else{
						window.localStorage.removeItem("NotificationPage");
						window.open("notification.html");
					}
				}else{
					window.localStorage.removeItem("BookingPage");
					window.open("bookings.html");
				}
				
//				window.open("summary.html");
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
                                   'Change language to Arabic.',  // message
                                   function(buttonIndex){
                                   
                                   switch (buttonIndex)
                                   {
                                   case 0:
                                   break;
                                   case 1:
                                   window.localStorage.setItem("selectedLanguage", "Arb");
                                   window.location.replace("../arabic/search.html");
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
                                              document.getElementById("logoutbtn").innerHTML = "Login";
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
