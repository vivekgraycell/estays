document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady(){
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	if (selectedLng == "Arb"){
		window.location.replace("../arabic/register.html");
	}else{
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

function opensummary(){
	window.open("summary.html");
}

//Method for google plus login
function googlePlusLogin(){
	
		networkState = checkConnection();
		if (networkState == 'No network connection') {
			alert("Please check your internet connection.");
		}else{
    	window.plugins.googleplus.login({
		'iOSApiKey': '6747841157-e9np87eko1avl53qjvgise91ngv6u0c2.apps.googleusercontent.com'
	},
	function (obj){
		// alert(JSON.stringify(obj));
//		alert("user email : "+obj.email+" user name : "+obj.displayName);
		socialmedialogin(obj.email, obj.displayName);
	},
	function (msg){
		alert('error : ' + msg);
	});
    }
	
	
}

//Method to logout from google plus account
function googlePlusLogout(){
	window.plugins.googleplus.logout(function (msg){
		alert(msg);
	});
}

//Method for facebook login
function facebookLogin(){
	
		networkState = checkConnection();
		if (networkState == 'No network connection') {
			alert("Please check your internet connection.");
		}else{
    	facebookConnectPlugin.login(["email"], 
            function (response) {
            	console.log("facebookLogin : "+JSON.stringify(response));
//             alert(JSON.stringify(response));
             console.log(""+response.authResponse.userID);

             facebookConnectPlugin.api('/me?fields=name,email', null, function(response){
             	console.log(""+response.email +"  "+response.name);
             	socialmedialogin(response.email, response.name);
             });
         },
         function (response) { alert(JSON.stringify(response)) });
    }
}

//Method to disconnect from google plus account.
//Calling this method will disconnect user from current login account.
function googlePlusDisconnect(){
	window.plugins.googleplus.disconnect(function (msg){
		alert(msg);
	});
}

//Method to login via twitter
function twitterLogin(){
		networkState = checkConnection();
		if (networkState == 'No network connection') {
			alert("Please check your internet connection.");
		}else{
    	TwitterConnect.login(function(result){
//		alert("Login Successfull "+ " "+ JSON.stringify(result));
		console.log(""+JSON.stringify(result));
		socialmedialogin(result.email, result.userName);

		// window.open("customerinfosummary.html");
	}, function(error){
		console.log("error occurred : "+error);
		alert("Error occurred "+" "+error);
	});
    }
	
	
// window.open("twitterpage.html");
}

//Method for twitter logout
function twitterLogout(){
	TwitterConnect.logout(
		function(){
			alert("Successful logout");
		}, function(){
			alert("Error occurred.");
		});
}

function socialmedialogin(email, username){
	
		networkState = checkConnection();
		if (networkState == 'No network connection') {
			alert("Please check your internet connection.");
		}else{
    	var data = {userEmail:email, userName:username, deviceId:window.localStorage.getItem("user_device_Id"), deviceType:window.localStorage.getItem("user_device_type"), loginType:"socialMedialogin"};
	$.ajax({
		type: 'POST',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/login',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: "application/json",
		success: function(data){
			document.getElementById("loadingimg").style.display = "none";
//			alert(""+data.userId);
			window.localStorage.setItem("user_user_id", data.userId);
			window.localStorage.setItem("user_user_acc_email", email);
			window.localStorage.setItem("user_user_acc_name", username);
//			window.open("customerinfosummary.html");
			
			var bookingVal = window.localStorage.getItem("BookingPage");
			var notificationVal = window.localStorage.getItem("NotificationPage");
			var profileVal = window.localStorage.getItem("ProfilePage");
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
		},error: function(xhr){
			var jsonResponse = JSON.parse(xhr.responseText);
			document.getElementById("loadingimg").style.display = "none";
			alert(""+jsonResponse.message);
		}
	});
    }
	
	
}

function openLoginPage(){
	window.open("login.html");
}

