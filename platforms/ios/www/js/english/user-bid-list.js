document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady(){
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Arb"){
		window.location.replace("../arabic/user-bid.html");
	}else{
		var lsItem = window.localStorage.getItem("user_user_id");

		if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
			//User not login. Show error dialog.
//			alert("Unable to perform operation as user is not currently loggedIn.");
			
			window.localStorage.setItem("UserBid", "Yes");
			window.open("register.html");
		}else{
			//User is login. Continue login
			//Check internet connection
			var networkState = navigator.network.connection.type;
			var states = {};
		    states[Connection.UNKNOWN]  = 'Unknown connection';
		    states[Connection.ETHERNET] = 'Ethernet connection';
		    states[Connection.WIFI]     = 'WiFi connection';
		    states[Connection.CELL_2G]  = 'Cell 2G connection';
		    states[Connection.CELL_3G]  = 'Cell 3G connection';
		    states[Connection.CELL_4G]  = 'Cell 4G connection';
		    states[Connection.NONE]     = 'No network connection';
		    
		    if (networkState == 'unknown' || networkState == 'none') {
		    	alert("Please check your internet connection.");
		    }else{
		    	var data = {userId:window.localStorage.getItem("user_user_id")};
		    	$.ajax({
				type: 'POST',
				url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/userBidsInfo',
				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
				crossDomain: true,
				data : JSON.stringify(data),
				dataType : 'json',
				contentType: "application/json",
				success: function(data){
					$('#userbidsdiv li').remove();
					hotels = data.userBids;
					
					var firstOffset = data.offset;
					$.each(hotels, function(index, userBids) {
						var monthNames = [
						                  "January", "February", "March",
						                  "April", "May", 'June', "July",
						                  "August", "September", "October",
						                  "November", "December"
						                ];

						                var date = new Date(userBids.date);
						                var day = date.getDate();
						                var monthIndex = date.getMonth();
						                var year = date.getFullYear();

						                var finalDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
						                var noImge = '../../img/no_image.jpg';
						$("#userbidsdiv").append("<li data-bidid="+ userBids.bidid +"><div class='boderBottom'><div class='col-xs-12'><div class='desc'><div class='text'> Bid Id : "+userBids.bidid+"</div><a href='javascript:void(0)' class='yellowLink'>"+ userBids.hotelType+"</a><div class='clearfix'></div><div class='title margbot'>"+finalDate+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/arrow.png' alt=''></a></div></div></div></li>");
					});
					$('#userbidsdiv').listview('refresh');
					$("#userbidsdiv").on("click", "li", function(){
	                    //get hotel id
	                    var id = $(this).jqmData("bidid");
	                    window.localStorage.setItem("clicked_booked_id", id);
	                    console.log("Bid Id : "+id);
	                    window.open("new-notification-page.html");
	                });
					
					var win = $(window);
					win.scroll(function (){
						//End of document reached?
						if($(document).height() - win.height() == win.scrollTop()){
							var data = {userId:window.localStorage.getItem("user_user_id"), offset:firstOffset};
							$.ajax({
								type: 'POST',
								url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/userBidsInfo',
								beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
								crossDomain: true,
								data : JSON.stringify(data),
								dataType : 'json',
								contentType: "application/json",
								success: function(data){
//									$('#pstbookingdiv li').remove();
									hotels = data.userBids;
									
									firstOffset = data.offset;
									$.each(hotels, function(index, userBids) {
										
										var monthNames = [
										                  "January", "February", "March",
										                  "April", "May", 'June', "July",
										                  "August", "September", "October",
										                  "November", "December"
										                ];

										                var date = new Date(userBids.date);
										                var day = date.getDate();
										                var monthIndex = date.getMonth();
										                var year = date.getFullYear();

										                var finalDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
										                var noImge = '../../img/no_image.jpg';
										                $("#userbidsdiv").append("<li data-bidid="+ userBids.bidid +"><div class='boderBottom'><div class='col-xs-12'><div class='desc'><div class='text'> Bid Id : "+userBids.bidid+"</div><a href='javascript:void(0)' class='yellowLink'>"+ userBids.hotelType+"</a><div class='clearfix'></div><div class='title margbot'>"+finalDate+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/arrow.png' alt=''></a></div></div></div></li>");
									});
									document.getElementById("loadingimg").style.display = "none";
								},
								error: function(xhr){
									console.log(xhr.responseText);
									var jsonResponse = JSON.parse(xhr.responseText);
									document.getElementById("loadingimg").style.display = "none";
//									alert("Error  : "+jsonResponse.message);
									
//									document.getElementById("emptylistTV").innerHTML = jsonResponse.message;
									
									/*var wrapper_div = $("#pstbookingdiv");
									$(wrapper_div).append("<span style='vertical-align: middle;width:100%;color: #000000;'>"+jsonResponse.message+"</span>");*/
								},
								async: true,
								cache: false
							});
						}
					});
					/*$('#hotelList').listview('refresh');
					document.getElementById("loadingimg").style.display = "none";

					$("#hotelList").on("click", "li", function(){
		                    //get hotel id
		                    var id = $(this).jqmData("hotelid");
		                    alert(""+id);
		                    window.localStorage.setItem("clicked_hotel_id", id);
		                    window.open("hoteldetailpage.html");
		                });*/
					document.getElementById("loadingimg").style.display = "none";
				},
				error: function(xhr){
					console.log(xhr.responseText);
					var jsonResponse = JSON.parse(xhr.responseText);
					document.getElementById("loadingimg").style.display = "none";
//					alert("Error  : "+jsonResponse.message);
					
					document.getElementById("emptylistTV").innerHTML = jsonResponse.message;
					
					/*var wrapper_div = $("#pstbookingdiv");
					$(wrapper_div).append("<span style='vertical-align: middle;width:100%;color: #000000;'>"+jsonResponse.message+"</span>");*/
				},
				async: true,
				cache: false
			});
		    }
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

function openDetailPage(id){
//	alert(id);
}

function openprofilefoot(){
//	window.location.replace("user-profile.html");
	window.open("user-profile.html");
}

function opensearchfoot(){
	window.open("search.html");
}

function backButton(){
    navigator.app.backHistory();
}

function bookingFoot(){
	window.open("bookings.html");
}

function changeLanguageBtn(){
	if(confirm("Change language to Arabic.") == true){
		//Ok button clicked.
		window.localStorage.setItem("selectedLanguage", "Arb");
		
		window.location.replace("../arabic/user-bid.html");
	}else{
		//Cancel button clicked.
	}
}

function logoutUser(){
	var lsItem = window.localStorage.getItem("user_user_id");

	if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
		//User not login. Show error dialog.
//		alert("Unable to perform operation as user is not currently loggedIn.");
		window.localStorage.setItem("UserBid", "Yes");
		window.open("register.html");
	}else{
		//User is login. Continue login
		
		if(confirm("Are you sure you want to logout?") == true){
			//Ok button clicked
			
			//Check internet connection
			var networkState = navigator.network.connection.type;
			var states = {};
		    states[Connection.UNKNOWN]  = 'Unknown connection';
		    states[Connection.ETHERNET] = 'Ethernet connection';
		    states[Connection.WIFI]     = 'WiFi connection';
		    states[Connection.CELL_2G]  = 'Cell 2G connection';
		    states[Connection.CELL_3G]  = 'Cell 3G connection';
		    states[Connection.CELL_4G]  = 'Cell 4G connection';
		    states[Connection.NONE]     = 'No network connection';
		    
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
					window.localStorage.removeItem("user_user_id");
					document.getElementById("loadingimg").style.display = "none";
					var prflImgPath = window.localStorage.getItem("profileImgPath");
					if(prflImgPath === undefined || prflImgPath === null || prflImgPath.length === 0){
					}else{
						window.localStorage.removeItem("profileImgPath");
					}
//					alert(""+data.message);
//					window.location.replace("search.html");
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