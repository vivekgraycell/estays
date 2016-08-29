document.addEventListener("deviceready", onDeviceReady, true);

var minimumPrc, maximumPrc;

function onDeviceReady(){
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng"){
		window.location.replace("../english/choose-price-test.html");
	}else{
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
	    	fetchpricerange();
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


function registeruser(){
	var htlMinPrice = window.localStorage.getItem("hotel_min_price_val");
	var htlMaxPrice = window.localStorage.getItem("hotel_max_price_val");
	
	console.log("register_user_min_price", window.localStorage.getItem("hotel_min_price_val"));
	console.log("register_user_max_price", window.localStorage.getItem("hotel_max_price_val"));
	
	if(document.getElementById("choosepriceval").value == ""){
		alert("Please enter bid amount.");
	}else if(document.getElementById("choosepriceval").value < minimumPrc){
		alert("Bid amount cannot be less than minimum price.")
	}else if(document.getElementById("choosepriceval").value > maximumPrc){
		alert("Bid amount cannot be greater than maximum price.")
	}else{
		window.localStorage.setItem("bid_amt_val", document.getElementById("choosepriceval").value);
		
		var lsItem = window.localStorage.getItem("user_user_id");
		if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
			window.open("register.html");
		}else{
			window.open("summary.html");
		}
	}
}

//function registeruser(){
//	
//	var htlMinPrice = window.localStorage.getItem("hotel_min_price_val");
//	var htlMaxPrice = window.localStorage.getItem("hotel_max_price_val");
//	
//	if(document.getElementById("choosepriceval").value == ""){
//		alert("Please enter bid amount.");
//	}else if(document.getElementById("choosepriceval").value < minimumPrc){
//		alert("Bid amount cannot be less than minimum price.")
//	}else if(document.getElementById("choosepriceval").value > maximumPrc){
//		alert("Bid amount cannot be greater than maximum price.")
//	}else{
//		window.localStorage.setItem("bid_amt_val", document.getElementById("choosepriceval").value);
//		
//		var lsItem = window.localStorage.getItem("user_user_id");
//		if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
//			window.open("register.html");
//		}else{
//			window.open("summary.html");
//		}
//		/*var roomrqd = window.localStorage.getItem("roomRequired");
//		if(roomrqd == 1){
//			window.localStorage.setItem("bid_amt_val", document.getElementById("choosepriceval").value);
//			
//			var lsItem = window.localStorage.getItem("user_user_id");
//			if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
//				window.open("register.html");
//			}else{
//				window.open("summary.html");
//			}
//			if(document.getElementById("choosepriceval").value < htlMinPrice){
//				alert("Bid amount must be in price range showing");
//			}else if(document.getElementById("choosepriceval").value > htlMaxPrice){
//				alert("Bid amount must be in price range showing");
//			}else{
//				var enteredBidAmt = document.getElementById("choosepriceval").value;
//				
//				console.log("register_user_enter_price", enteredBidAmt);
//				
//				
//						window.localStorage.setItem("bid_amt_val", document.getElementById("choosepriceval").value);
//						
//						var lsItem = window.localStorage.getItem("user_user_id");
//						if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
//							window.open("register.html");
//						}else{
//							window.open("summary.html");
//						}
//			}
//		}else{
//			if(document.getElementById("choosepriceval").value < htlMinPrice){
//				alert("Bid amount cannot be less than minimum price.");
//			}else if(document.getElementById("choosepriceval").value > htlMaxPrice){
//				alert("Bid amount cannot be greater than maximum price.");
//			}else{
//				var enteredBidAmt = document.getElementById("choosepriceval").value;
//				
//				console.log("register_user_enter_price", enteredBidAmt);
//				
//				
//						window.localStorage.setItem("bid_amt_val", document.getElementById("choosepriceval").value);
//						
//						var lsItem = window.localStorage.getItem("user_user_id");
//						if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
//							window.open("register.html");
//						}else{
//							window.open("summary.html");
//						}
//			}
//		}*/
//		
//		
//		
//		
//		
//		/*var enteredBidAmt = document.getElementById("choosepriceval").value;
//		
//		if(enteredBidAmt < htlMinPrice){
//			//Error entered amount is less than min amount
//			alert("Bid amount cannot be less than than minimum price.");
//		}else{
//			if(enteredBidAmt > htlMaxPrice){
//				alert("Bid amount cannot be greater than than maximum price.");
//			}else{
//				window.localStorage.setItem("bid_amt_val", document.getElementById("choosepriceval").value);
//				
//				var lsItem = window.localStorage.getItem("user_user_id");
//				if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
//					window.open("register.html");
//				}else{
//					window.open("summary.html");
//				}
//			}
//		}*/
////		window.open("register.html");
//	}
//	
//}

function backButton(){
    navigator.app.backHistory();
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

function fetchpricerange(){
	var hotelTypeId = window.localStorage.getItem("selhotelid");
	var roomTypeId = window.localStorage.getItem("selroomid");

	// var data = {hotelType:window.localStorage.getItem("sel_hotel_type_id"), roomType:window.localStorage.getItem("sel_room_type_id"), currencyType:'SAR'};

	console.log("hotelTypeId : "+hotelTypeId+ "      roomTypeId     :  "+roomTypeId);

	/*var dd_currency_type = document.getElementById("ci_currency_type");
	var dd_currency_type_val = dd_currency_type.options[dd_currency_type.selectedIndex].text;*/
	
	var selcurrncytyp = window.localStorage.getItem("currencyType");
	if(selcurrncytyp === undefined || selcurrncytyp === null || selcurrncytyp.length === 0){
		window.localStorage.setItem("currencyType", "USD");
		alert("Default currency type is USD.");
	}else{
		alert("Current currency type is  : "+window.localStorage.getItem("currencyType"));
	}
	
	var minPrcLS = window.localStorage.getItem("hotel_min_price_val");
	var maxPrcLS = window.localStorage.getItem("hotel_max_price_val");
	
	if (minPrcLS === undefined || minPrcLS === null || minPrcLS.length === 0) {
		//Do nothing
	}else{
		window.localStorage.removeItem("hotel_min_price_val");
	}
	
	if (maxPrcLS === undefined || maxPrcLS === null || maxPrcLS.length === 0) {
		// Do nothing
	}else{
		window.localStorage.removeItem("hotel_max_price_val");
	}

	$.ajax({
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/pricerange',
		crossDomain: true,
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
//		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		data: {hotelType:window.localStorage.getItem("selhotelid"), roomType:window.localStorage.getItem("selroomid"), currencyType:window.localStorage.getItem("currencyType")},
		dataType : 'json',
		contentType: "application/json",
		success: function(data){
			
//			document.getElementById("loadingimg").style.display = "none";
			for (var i = 0; i < data.priceRange.length; i++){
				var prcRng = data.priceRange[i];
				var roomrqd = window.localStorage.getItem("roomRequired");
				var minprice = roomrqd * prcRng.minPrice;
				var maxprice = roomrqd * prcRng.maxPrice;
				
				document.getElementById("minpricerng").innerHTML = ""+window.localStorage.getItem("currencyType")+" "+ minprice;
				document.getElementById("maxpricerng").innerHTML = ""+window.localStorage.getItem("currencyType")+" "+ maxprice;
				
				minimumPrc = minprice;
				maximumPrc = maxprice;
				
				window.localStorage.setItem("hotel_min_price_val", minprice);
				window.localStorage.setItem("hotel_max_price_val", maxprice);

				window.localStorage.setItem("hotel_price_range_id", prcRng.pricerangeId);
			}
			document.getElementById("loadingimg").style.display = "none";

		},
		error: function(xhr){
			document.getElementById("loadingimg").style.display = "none";
//			document.getElementById("loadingimg").style.display = "none";
			console.log(xhr.responseText);
			var jsonResponse = JSON.parse(xhr.responseText);
				alert("Error  : "+jsonResponse.message + " Please try again.");
		},
		async: true,
		cache: false
	});
}

function changeLanguageBtn(){
	if(confirm("Change language to English.") == true){
		//Ok button clicked.
		window.localStorage.setItem("selectedLanguage", "Eng");
		window.location.replace("../english/choose-price-test.html");
	}else{
		//Cancel button clicked.
	}
}

function logoutUser(){
	var lsItem = window.localStorage.getItem("user_user_id");

	if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
		//User not login. Show error dialog.
//		alert("Unable to perform operation as user is not currently loggedIn.");
		window.localStorage.setItem("ChoosePrice", "Yes");
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
					document.getElementById("logoutbtn").innerHTML = "تسجيل الدخول";
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
