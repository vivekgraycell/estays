document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady(){
var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng"){
		window.location.replace("../english/select-hotel-test.html");
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
	    	fetchhoteltype();
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

function chooseprice(){
	var selectHtl = window.localStorage.getItem("selhotelid");
	if(selectHtl === undefined || selectHtl === null || selectHtl.length === 0){
		alert("Please select hotel type.");
	}else{
		window.open("choose-price-test.html");
	}
	
}

function backButton(){
    navigator.app.backHistory();
}

function fetchhoteltype(){
	//Hotel type
	$.ajax({
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hoteltype',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
//		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		contentType: "application/json",
		dataType: "json",
		data: '{}',
		success: function(val) {

			var wrapper_div = $("#htrdbtn");

			for (var i = 0; i < val.hotelTYpeList.length; i++){
				var hotelTypeL = val.hotelTYpeList[i];
				
				$(wrapper_div).append("<div class='radioButtons'>" + " <input type='radio' class='hoteltyperdbtn' id = '"+hotelTypeL.hotelTypeId+"' name='"+hotelTypeL.hotelTypeArab+"' /><label for= '"+hotelTypeL.hotelTypeId+"'><span></span>"+hotelTypeL.hotelTypeArab+"</label></div>");

				/*$(wrapper_div).append("<br />" + " <input type='radio' class= 'hotel_type_radio_button' name='"+hotelTypeL.hotelTypeId+"' value='" + hotelTypeL.hotelType + "'>"+" "+ hotelTypeL.hotelType);*/

				// alert(""+hotelTypeL.hotelType);
			}
			
			$(".hoteltyperdbtn").on("click", function(){
				$('.hoteltyperdbtn').prop('checked', false);
				$(this).prop('checked', true);
				var selhotelid = $(this).attr('id');
				var selhotelcat = $(this).attr('name');
				
				console.log("selhotelid : "+selhotelid);
				console.log("selhotelcat : "+selhotelcat);
				
				window.localStorage.setItem("selhotelid", $(this).attr('id'));
				window.localStorage.setItem("selhotelcat", $(this).attr('name'));
			});

			/*$(".hotel_type_radio_button").on("click", function(){
				console.log("hoteltype_rb_clicked"+$(this).val());
				console.log("hoteltype_rb_clicked_name"+$(this).attr('name'));

				var dd_room_type = document.getElementById("ci_room_type");
                var dd_room_type_val = dd_room_type.options[ci_room_type.selectedIndex].value;

                window.localStorage.setItem("sel_hotel_type_id", ""+$(this).attr('name'));
                window.localStorage.setItem("sel_room_type_id", ""+dd_room_type_val);



                window.localStorage.setItem("dd_hotel_type_val", ""+$(this).val());
                window.localStorage.setItem("dd_room_type_val", ""+dd_room_type.options[ci_room_type.selectedIndex].text);

				alert("Hotel type_rb value : "+$(this).val() +"     Name + "+$(this).attr('name')+"     Room Type Value :   "+dd_room_type_val);

				hotelPriceRange();
			});*/
			document.getElementById("loadingimg").style.display = "none";

//			document.getElementById("loadingimg").style.display = "none";
			// hotelPriceRange();
		},
		error: function(xhr, status, error) { 
			document.getElementById("loadingimg").style.display = "none";
//			document.getElementById("loadingimg").style.display = "none";
			alert('Error !!'); 
		},
		async: true,
		cache: false
	});
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
	if(confirm("Change language to English.") == true){
		//Ok button clicked.
		window.localStorage.setItem("selectedLanguage", "Eng");
		window.location.replace("../english/select-hotel-test.html");
	}else{
		//Cancel button clicked.
	}
}

function logoutUser(){
	var lsItem = window.localStorage.getItem("user_user_id");

	if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
		//User not login. Show error dialog.
//		alert("Unable to perform operation as user is not currently loggedIn.");
		window.localStorage.setItem("SelectHotel", "Yes");
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

