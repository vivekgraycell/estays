document.addEventListener("deviceready", onDeviceReady, true);

var mins;
var secs;
var currentMinutes = 0;
var currentSeconds = 0;

function onDeviceReady(){
var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng"){
		window.location.replace("../english/notification.html");
	}else{
		newNotificationCheck();
//		var networkState = navigator.network.connection.type;
//
//	    var states = {};
//	    states[Connection.UNKNOWN]  = 'Unknown connection';
//	    states[Connection.ETHERNET] = 'Ethernet connection';
//	    states[Connection.WIFI]     = 'WiFi connection';
//	    states[Connection.CELL_2G]  = 'Cell 2G connection';
//	    states[Connection.CELL_3G]  = 'Cell 3G connection';
//	    states[Connection.CELL_4G]  = 'Cell 4G connection';
//	    states[Connection.NONE]     = 'No network connection';
//
////	    alert("networkState "+networkState);
//
//	    if (networkState == 'unknown' || networkState == 'none') {
//	    	alert("Please check your internet connection.");
//	    }else{
//	    	var oneHourTime = window.localStorage.getItem("one_hour_past");
//			
//			if(oneHourTime === undefined || oneHourTime === null || oneHourTime.length === 0){
//				
//				var lsItem = window.localStorage.getItem("user_user_id");
//				if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
////					alert("Unable to perform operation as user is not currently loggedIn.");
//					window.localStorage.setItem("NotificationPage", "Yes");
//					window.open("register.html");
//				}else{
//					var timerDiv = document.getElementById("notification_timer_div");
//					timerDiv.style.display = 'none';
//					var notificationSecondRow = document.getElementById("notification_second_row");
//					notificationSecondRow.style.display = 'none';
//					var notificationTopRow = document.getElementById("notification_top_row");
//					notificationTopRow.style.display = 'none';
//					document.getElementById("emptylistTV").innerHTML = "No record available";
//				}
//			}else{
//				var oneHourTimeFormat = new Date(oneHourTime).getTime();
//				
//				var currentTime = new Date().getTime();
//				
//				console.log("oneHourTimeFormat : "+oneHourTimeFormat+"   currentTime : "+currentTime);
//				
//				if(currentTime < oneHourTimeFormat){
//					//Current time is less than one hour time
//					var lsItem = window.localStorage.getItem("user_user_id");
//					if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
////						alert("Unable to perform operation as user is not currently loggedIn.");
//						window.localStorage.setItem("NotificationPage", "Yes");
//						window.open("register.html");
//					}else{
//						var timerDiv = document.getElementById("notification_timer_div");
//						timerDiv.style.display = 'none';
//						var notificationSecondRow = document.getElementById("notification_second_row");
//						notificationSecondRow.style.display = 'none';
//						var notificationTopRow = document.getElementById("notification_top_row");
//						notificationTopRow.style.display = 'none';
//						document.getElementById("emptylistTV").innerHTML = "No Record Found";
//					}
//				}else{
//					//Current time is greater than one hour time
//					var previousMins = window.localStorage.getItem("currentMin");
//					if(previousMins === undefined || previousMins === null || previousMins.length === 0){
//						sampleNotificationHit();
//					}else{
//						var intpm = parseInt(previousMins);
//						
//						if(intpm > 29){
//							
//							var lsItem = window.localStorage.getItem("user_user_id");
//							if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
////								alert("Unable to perform operation as user is not currently loggedIn.");
//								window.localStorage.setItem("NotificationPage", "Yes");
//								window.open("register.html");
//							}else{
//								var timerDiv = document.getElementById("notification_timer_div");
//								timerDiv.style.display = 'none';
//								var notificationSecondRow = document.getElementById("notification_second_row");
//								notificationSecondRow.style.display = 'none';
//								var notificationTopRow = document.getElementById("notification_top_row");
//								notificationTopRow.style.display = 'none';
//								document.getElementById("emptylistTV").innerHTML = "No Record Found";
//								window.localStorage.removeItem("notification_count_int");
//							}
//						}else{
//							sampleNotificationHit();
//						}
//					}
//				}
//			}
			
	    	/*var previousMins = window.localStorage.getItem("currentMin");
			if(previousMins === undefined || previousMins === null || previousMins.length === 0){
				sampleNotificationHit();
			}else{
				var intpm = parseInt(previousMins);
				
				if(intpm > 29){
					var timerDiv = document.getElementById("notification_timer_div");
					timerDiv.style.display = 'none';
					var notificationSecondRow = document.getElementById("notification_second_row");
					notificationSecondRow.style.display = 'none';
					var notificationTopRow = document.getElementById("notification_top_row");
					notificationTopRow.style.display = 'none';
					document.getElementById("emptylistTV").innerHTML = "No Record Found";
				}else{
					sampleNotificationHit();
				}
			}*/
	    	
	    	
//	    	sampleNotificationHit();
//	    }
		
		/*var lsItem = window.localStorage.getItem("user_user_id");

		if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
			//User not login. Show error dialog.
			alert("Unable to perform operation as user is not currently loggedIn.");
		}else{
		
			var data = {userId:lsItem, offset:'0'};
		$.ajax({
			type: 'POST',
			url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hotelNotifications',
			beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
			crossDomain: true,
			data: JSON.stringify(data),
			dataType : 'json',
			contentType: "application/json",
			success: function(data){
				$('#notificationlisthotel li').remove();
				hotels = data.hotelNotifications;
				$.each(hotels, function(index, hotelNotifications) {
					if(hotelNotifications.status == "Approve"){
						document.getElementById("notificDate").innerHTML = hotelNotifications.date;
						document.getElementById("num_rooms").innerHTML = hotelNotifications.numberOfRooms;
						$("#notificationlisthotel").append("<li data-hotelid="+ hotelNotifications.hotelId +" id="+ hotelNotifications.bidid + "><div class='boderBottom notifiationB'><div class='col-xs-12'><div class='image'><img src="+ hotelNotifications.hotelMainpic +" alt=''></div><div class='desc'><div class='title'>"+hotelNotifications.hotelNameArabic+"</div><div class='text'>"+ hotelNotifications.status+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/book.png' alt=''></a></div></div></div></li>");
						$.each(hotels.roomType, function(index, roomType){
							document.getElementById("ntfication_room_type").innerHTML = roomType.roomCategoryArab;
						});
						$.each(hotels.hotelType, function(index, hotelType){
							document.getElementById("ntfication_hotel_type").innerHTML = hotelType.hotelTypeArab;
						});													
																																																																		
//					$("#notificationlisthotel").append("<li data-hotelid="+ hotelNotifications.hotelId +"><div class='boderBottom'><div class='col-xs-12'><div class='image'><img src='../../img/img01.jpg' alt=''></div><div class='desc'> <a href='javascript:void(0)' class='yellowLink'>"+ "Double room"+"</a><div class='clearfix'></div><div class='title margbot'>"+hotelNotifications.DateCreated+"</div><div class='text'>"+hotelNotifications.hotelName+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/arrow.png' alt=''></a></div></div></div></li>");
					}
					"hotelNotifications": [4]
					0:  {
					"notificationId": "12"
					"bidId": "8"
					"hotelId": "1"
					"hotelName": null
					"status": "Approve"
					"date": "2016-04-13 11:44:52"
					}
					
					
					
					$('#hotelList').append('<li><a href="hoteldetailpage.html?id=' + summary.hotelId + '">' +
						'<h4>' + summary.hotelName + '</h4>' +
						'<h5>City : ' + summary.city + '</h5>' +
						'<p>' + summary.DateCreated + '</p>' +'</a></li>');
					$('#hotelList').append('<li><a href="employeedetails.html?id=' + summary.id + '">' +
						'<img src="pics/' + employee.picture + '"/>' +
						'<h4>' + employee.firstName + ' ' + employee.lastName + '</h4>' +
						'<p>' + employee.title + '</p>' +
						'<span class="ui-li-count">' + employee.reportCount + '</span></a></li>');
				// <li data-hotelid="3"><a href="#"><h5>First Hotel</h5><p>India, New Delhi</p><p>dd/mm/yyyy</p></a></li>
//					$('#hotelList').append('<li data-hotelid='+ summary.hotelId +'><a href="#"><h5>'+ summary.hotelName + '</h5><p>' + summary.city + '</p><p>' +summary.DateCreated + '</p></a></li>');
				});
				$('#notificationlisthotel').listview('refresh');
				$("#notificationlisthotel").on("click", "li", function(){
	                //get hotel id
	                var idi = $(this).jqmData("hotelid");
	                window.localStorage.setItem("hotel_book_id", idi);
	                var selbidid = $(this).attr('id');
	                window.localStorage.setItem("hotel_bid_id", selbidid);
	                window.open("notification-hotel-detail.html");
	            });
				
				var fiveMinutes = 60.0 * 30, display = document.querySelector('#countdown');
				startTimer(fiveMinutes, display);
				document.getElementById("loadingimg").style.display = "none";
				$('#hotelList').listview('refresh');
				document.getElementById("loadingimg").style.display = "none";
				

				$("#hotelList").on("click", "li", function(){
	                    //get hotel id
	                    var id = $(this).jqmData("hotelid");
	                    alert(""+id);
	                    window.localStorage.setItem("clicked_hotel_id", id);
	                    window.open("hoteldetailpage.html");
	                });
			},
			error: function(xhr){
				console.log(xhr.responseText);
				var jsonResponse = JSON.parse(xhr.responseText);
				document.getElementById("loadingimg").style.display = "none";
				alert("Error  : "+jsonResponse.message);
				
				document.getElementById("emptylistTV").innerHTML = jsonResponse.message;
				
				var wrapper_div = $("#pstbookingdiv");
				$(wrapper_div).append("<span style='vertical-align: middle;width:100%;color: #000000;'>"+jsonResponse.message+"</span>");
			},
			async: true,
			cache: false
		});
		}*/
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
}

function Decrement(){
	currentMinutes = Math.floor(secs / 60);
    currentSeconds = secs % 60;
    if(currentSeconds <= 9) currentSeconds = "0" + currentSeconds;
    secs--;
    
    window.localStorage.setItem("currentMin", currentMinutes);
    document.getElementById("countdown").innerHTML = "00:"+ currentMinutes + ":" + currentSeconds; //Set the element id you need the time put into.
    if(secs !== -1) setTimeout('Decrement()',1000);
}

function startTimer(duration, display) {
	var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "00:"+ minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function backButton(){
    navigator.app.backHistory();
}

function logoutUser(){
	var lsItem = window.localStorage.getItem("user_user_id");

	if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
		//User not login. Show error dialog.
//		alert("Unable to perform operation as user is not currently loggedIn.");
		window.localStorage.setItem("NotificationPage", "Yes");
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
					window.location.replace("search.html");
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

function fetchnotificationlist(){
	var lsItem = window.localStorage.getItem("user_user_id");

	if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
		//User not login. Show error dialog.
		alert("Unable to perform operation as user is not currently loggedIn.");
	}else{
	$.ajax({
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hotelNotifications',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		data: {userId:'1', offset:'0'},
		dataType : 'json',
		contentType: "application/json",
		success: function(data){
			$('#notificationlisthotel li').remove();
			hotels = data.hotelNotifications;
			$.each(hotels, function(index, hotelNotifications) {
				if(hotelNotifications.status == "Approve"){
					document.getElementById("notificDate").innerHTML = hotelNotifications.date;
					$("#notificationlisthotel").append("<li><div class='boderBottom notifiationB'><div class=col-xs-12'><div class='image'><img src='../../img/img01.jpg' alt=''></div><div class='desc'><div class='title'>"+hotelNotifications.hotelName+"</div><div class='text>"+ hotelNotifications.status+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img data-hotelid="+ hotelNotifications.hotelId +"src='../../img/book.png' alt=''></a></div></div></div></li>");
//				$("#notificationlisthotel").append("<li data-hotelid="+ hotelNotifications.hotelId +"><div class='boderBottom'><div class='col-xs-12'><div class='image'><img src='../../img/img01.jpg' alt=''></div><div class='desc'> <a href='javascript:void(0)' class='yellowLink'>"+ "Double room"+"</a><div class='clearfix'></div><div class='title margbot'>"+hotelNotifications.DateCreated+"</div><div class='text'>"+hotelNotifications.hotelName+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/arrow.png' alt=''></a></div></div></div></li>");
				}
				/*"hotelNotifications": [4]
				0:  {
				"notificationId": "12"
				"bidId": "8"
				"hotelId": "1"
				"hotelName": null
				"status": "Approve"
				"date": "2016-04-13 11:44:52"
				}*/
				
				
				
				/*$('#hotelList').append('<li><a href="hoteldetailpage.html?id=' + summary.hotelId + '">' +
					'<h4>' + summary.hotelName + '</h4>' +
					'<h5>City : ' + summary.city + '</h5>' +
					'<p>' + summary.DateCreated + '</p>' +'</a></li>');*/
				/*$('#hotelList').append('<li><a href="employeedetails.html?id=' + summary.id + '">' +
					'<img src="pics/' + employee.picture + '"/>' +
					'<h4>' + employee.firstName + ' ' + employee.lastName + '</h4>' +
					'<p>' + employee.title + '</p>' +
					'<span class="ui-li-count">' + employee.reportCount + '</span></a></li>');*/
			// <li data-hotelid="3"><a href="#"><h5>First Hotel</h5><p>India, New Delhi</p><p>dd/mm/yyyy</p></a></li>
//				$('#hotelList').append('<li data-hotelid='+ summary.hotelId +'><a href="#"><h5>'+ summary.hotelName + '</h5><p>' + summary.city + '</p><p>' +summary.DateCreated + '</p></a></li>');
			});
			$('#notificationlisthotel').listview('refresh');
			$("#notificationlisthotel").on("click", "img", function(){
                //get hotel id
                var id = $(this).jqmData("hotelid");
                window.localStorage.setItem("hotel_book_id", id);
                window.open("hotel-detail.html");
            });
			document.getElementById("loadingimg").style.display = "none";
			/*$('#hotelList').listview('refresh');
			document.getElementById("loadingimg").style.display = "none";

			$("#hotelList").on("click", "li", function(){
                    //get hotel id
                    var id = $(this).jqmData("hotelid");
                    alert(""+id);
                    window.localStorage.setItem("clicked_hotel_id", id);
                    window.open("hoteldetailpage.html");
                });*/
		},
		error: function(xhr){
			console.log(xhr.responseText);
			var jsonResponse = JSON.parse(xhr.responseText);
			document.getElementById("loadingimg").style.display = "none";
			alert("Error  : "+jsonResponse.message);
			
			var wrapper_div = $("#pstbookingdiv");
			$(wrapper_div).append("<span style='vertical-align: middle;width:100%;color: #000000;'>"+jsonResponse.message+"</span>");
		},
		async: true,
		cache: false
	});
	}
}

function changeLanguageBtn(){
	if(confirm("Change language to English.") == true){
		//Ok button clicked.
		window.localStorage.setItem("selectedLanguage", "Eng");
		window.location.replace("../english/notification.html");
	}else{
		//Cancel button clicked.
	}
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


function sampleNotificationHit(){
	var isTimerStarted = window.localStorage.getItem("timerStarted");
	
	if(isTimerStarted === undefined || isTimerStarted === null || isTimerStarted.length === 0){
		//No need to show 30 minute timer
		//No need to hit notification api
		var lsItem = window.localStorage.getItem("user_user_id");
		if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
//			alert("Unable to perform operation as user is not currently loggedIn.");
			window.localStorage.setItem("NotificationPage", "Yes");
			window.open("register.html");
		}else{
			var timerDiv = document.getElementById("notification_timer_div");
			timerDiv.style.display = 'none';
			var notificationSecondRow = document.getElementById("notification_second_row");
			notificationSecondRow.style.display = 'none';
			var notificationTopRow = document.getElementById("notification_top_row");
			notificationTopRow.style.display = 'none';
			document.getElementById("emptylistTV").innerHTML = "Nothing to show.";
		}
	}else{
		//Hotel bid response is available
		//Show 30 minute timer to user to book hotel.
		//Hit notification api to get hotel bid response.
		
		var lsItem = window.localStorage.getItem("user_user_id");
		if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
			//User not login. Show error dialog.
//			alert("Unable to perform operation as user is not currently loggedIn.");
			window.localStorage.setItem("NotificationPage", "Yes");
			window.open("register.html");
		}else{
			var data = {userId:lsItem, offset:'0'};
			$.ajax({
				type: 'POST',
				url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hotelNotifications',
				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
				crossDomain: true,
				data: JSON.stringify(data),
				dataType : 'json',
				contentType: "application/json",
				success: function(data){
					$('#notificationlisthotel li').remove();
					hotels = data.hotelNotifications;
					var firstOffset = data.offset;
					var countNotif = 0;
					$.each(hotels, function(index, hotelNotifications) {
						if(hotelNotifications.status == "Approve"){
							countNotif++;
							var timerDiv = document.getElementById("notification_timer_div");
							timerDiv.style.display = 'block';
							var notificationSecondRow = document.getElementById("notification_second_row");
							notificationSecondRow.style.display = 'block';
							var notificationTopRow = document.getElementById("notification_top_row");
							notificationTopRow.style.display = 'block';
							
							var monthNames = [
							                  "January", "February", "March",
							                  "April", "May", 'June', "July",
							                  "August", "September", "October",
							                  "November", "December"
							                ];

							                var date = new Date(hotelNotifications.date);
							                var day = date.getDate();
							                var monthIndex = date.getMonth();
							                var year = date.getFullYear();

							                var finalDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
							                var noImge = '../../img/no_image.jpg';
							document.getElementById("notificDate").innerHTML = finalDate;
							document.getElementById("num_rooms").innerHTML = hotelNotifications.numberOfRooms;
							
							window.localStorage.setItem("notification_hotel_date", hotelNotifications.date);
							$("#notificationlisthotel").append("<li data-hotelid="+ hotelNotifications.hotelId +" id="+ hotelNotifications.bidid + "><div class='boderBottom notifiationB'><div class='col-xs-12'><div class='image'><img style='width: 90px;height:90px;' src="+ hotelNotifications.hotelMainpic +" alt=''></div><div class='desc'><div class='title'>"+hotelNotifications.hotelNameArabic+"</div><div class='text'>"+ hotelNotifications.status+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/book.png' alt=''></a></div></div></div></li>");
							
							$('img')
							.error(function(){
								this.src = '../../img/no_image.jpg';
							});
							
							for(var i = 0; i < hotelNotifications.roomType.length; i++){
								document.getElementById("ntfication_room_type").innerHTML = hotelNotifications.roomType[0].roomCategoryArab;
							}
							
							for(var j = 0; j < hotelNotifications.hotelType.length; j++){
								document.getElementById("ntfication_hotel_type").innerHTML = hotelNotifications.hotelType[0].hotelTypeArab;
							}
							
							
							/*$.each(data.hotelNotifications.roomType, function(index, roomType){
								document.getElementById("ntfication_room_type").innerHTML = roomType.roomCategoryArab;
							});
							$.each(data.hotelNotifications.hotelType, function(index, hotelType){
								document.getElementById("ntfication_hotel_type").innerHTML = hotelType.hotelTypeArab;
							});*/
//							$("#notificationlisthotel").append("<li data-hotelid="+ hotelNotifications.hotelId +"><div class='boderBottom'><div class='col-xs-12'><div class='image'><img src='../../img/img01.jpg' alt=''></div><div class='desc'> <a href='javascript:void(0)' class='yellowLink'>"+ "Double room"+"</a><div class='clearfix'></div><div class='title margbot'>"+hotelNotifications.DateCreated+"</div><div class='text'>"+hotelNotifications.hotelName+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/arrow.png' alt=''></a></div></div></div></li>");
						}else{
							document.getElementById("emptylistTV").innerHTML = "No hotel accept your bid amount. Please check website for more information."
						}
					});
					
					var notificationSecondRow = document.getElementById("notification_count");
					notificationSecondRow.style.display = 'block';
					document.getElementById("notification_count").innerHTML = countNotif;
					window.localStorage.setItem("notification_count_int", countNotif);
					
					$('#notificationlisthotel').listview('refresh');
					$("#notificationlisthotel").on("click", "li", function(){
						//get hotel id
						var idi = $(this).jqmData("hotelid");
						window.localStorage.setItem("hotel_book_id", idi);
						var selbidid = $(this).attr('id');
						window.localStorage.setItem("hotel_bid_id", selbidid);
						
//						alert("hotel id : "+idi+" Bid Id : "+selbidid);
						
						window.open("notification-hotel-detail.html");
			
					});
					
					var win = $(window);
					win.scroll(function (){
						//End of document reached?
						if($(document).height() - win.height() == win.scrollTop()){
							var data = {userId:lsItem, offset:firstOffset};
							$.ajax({
								type: 'POST',
								url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hotelNotifications',
								beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
								crossDomain: true,
								data: JSON.stringify(data),
								dataType : 'json',
								contentType: "application/json",
								success: function(data){
//									$('#notificationlisthotel li').remove();
									hotels = data.hotelNotifications;
									firstOffset = data.offset;
									$.each(hotels, function(index, hotelNotifications) {
										if(hotelNotifications.status == "Approve"){
											var noImge = '../../img/no_image.jpg';
											
											$("#notificationlisthotel").append("<li data-hotelid="+ hotelNotifications.hotelId +" id="+ hotelNotifications.bidid + "><div class='boderBottom notifiationB'><div class='col-xs-12'><div class='image'><img style='width: 90px;height:90px;' src="+ hotelNotifications.hotelMainpic +" alt=''></div><div class='desc'><div class='title'>"+hotelNotifications.hotelName+"</div><div class='text'>"+ hotelNotifications.status+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/book.png' alt=''></a></div></div></div></li>");
											$('img')
											.error(function(){
												this.src = '../../img/no_image.jpg';
											});	
										
										}
									});
									
									document.getElementById("loadingimg").style.display = "none";
								},
								error: function(xhr){
									
									console.log(xhr.responseText);
									var jsonResponse = JSON.parse(xhr.responseText);
									document.getElementById("loadingimg").style.display = "none";
//									alert("Error  : "+jsonResponse.message);
								},
								async: true,
								cache: false
								});
						}
					});
					
					var timerDiv = document.getElementById("notification_timer_div");
					timerDiv.style.display = 'block';
					
					/*var fiveMinutes = 60.0 * 30, display = document.querySelector('#countdown');
					startTimer(fiveMinutes, display);*/
					
					mins = 30;
					var previousMins = window.localStorage.getItem("currentMin");
					if(previousMins === undefined || previousMins === null || previousMins.length === 0){
						
						secs = mins * 60;
					}else{
						var intpm = parseInt(previousMins);
						mins = intpm; 
						secs = mins * 60;
					}
					
					console.log("mins : "+mins+"  secs : "+secs);
					
					setTimeout(Decrement,1000);
					
					document.getElementById("loadingimg").style.display = "none";
					
					//Get current device time.
					//Add 28 minutes to current device time.
					//Show notification to user at above time with message - 5 minutes left to book hotel.
					//Remove local storage
					//window.localStorage.removeItem("timerStarted");
				},
				error: function(xhr){
					var timerDiv = document.getElementById("notification_timer_div");
					timerDiv.style.display = 'none';
					var notificationSecondRow = document.getElementById("notification_second_row");
					notificationSecondRow.style.display = 'none';
					var notificationTopRow = document.getElementById("notification_top_row");
					notificationTopRow.style.display = 'none';
					console.log(xhr.responseText);
					var jsonResponse = JSON.parse(xhr.responseText);
					document.getElementById("loadingimg").style.display = "none";
//					alert("Error  : "+jsonResponse.message);
					document.getElementById("emptylistTV").innerHTML = jsonResponse.message;
				},
				async: true,
				cache: false
				});
			}
		}
}

function newNotificationCheck(){
	/**
	 * Conditions to check according to following sequence
	 * User login status
	 * hotelSuccessBidTime
	 * If hotelSuccessBidTime is greater than current time
	 * If 30 minute timer completed or not
	 */
	
	var userLoggedInId = window.localStorage.getItem("user_user_id");
	if (userLoggedInId === undefined || userLoggedInId === null || userLoggedInId.length === 0) {
		//User is not logged In, open login screen
		window.localStorage.setItem("NotificationPage", "Yes");
		window.open("register.html");
	}else{
		//User is logged In check next condition
		var hotelSuccessBidTime = window.localStorage.getItem("hotelSuccessBidTime");
		if (hotelSuccessBidTime === undefined || hotelSuccessBidTime === null || hotelSuccessBidTime.length === 0) {
			/**
			 * User is loggedIn but hotelSuccessBidTime is not available
			 * Hide timer and header
			 * Show 'No record found' message
			 */
			var timerDiv = document.getElementById("notification_timer_div");
			timerDiv.style.display = 'none';
			var notificationSecondRow = document.getElementById("notification_second_row");
			notificationSecondRow.style.display = 'none';
			var notificationTopRow = document.getElementById("notification_top_row");
			notificationTopRow.style.display = 'none';
			document.getElementById("emptylistTV").innerHTML = "No Records Found";
		}else{
			/**
			 * User is logged in and hotelSuccessBidTime is also available
			 * Calculate current time and check whether it's greater than hotelSuccessBidTime or not
			 */
			var hotelSuccessBidTimeFormatted = new Date(hotelSuccessBidTime).getTime();
			var currentSystemTime = new Date().getTime();
			
			if(currentSystemTime < hotelSuccessBidTimeFormatted){
				/**
				 * Current time is less than hotelSuccessBidTimeFormatted
				 * Hide timer and screen header
				 * Show 'No record found' message
				 */
				var timerDiv = document.getElementById("notification_timer_div");
				timerDiv.style.display = 'none';
				var notificationSecondRow = document.getElementById("notification_second_row");
				notificationSecondRow.style.display = 'none';
				var notificationTopRow = document.getElementById("notification_top_row");
				notificationTopRow.style.display = 'none';
				document.getElementById("emptylistTV").innerHTML = "No Records Found";
			}else{
				/**
				 * Current time is greater than hotelSuccessBidTimeFormatted.
				 * Check 30 minute timer. If 30 minute completed or not.
				 */
				var thirtyMinTimer = window.localStorage.getItem("currentMin");
				if(thirtyMinTimer === undefined || thirtyMinTimer === null || thirtyMinTimer.length === 0){
					/**
					 * Thirty minute timer is not available
					 */
					var startProcessExists = window.localStorage.getItem("startProcess");
					if(startProcessExists === undefined || startProcessExists === null || startProcessExists.length === 0){
						/**
						 * Start process is not available. It's removed after user successfully booked hotel.
						 * Remove timer and header and display 'No record found' message
						 */
						var timerDiv = document.getElementById("notification_timer_div");
						timerDiv.style.display = 'none';
						var notificationSecondRow = document.getElementById("notification_second_row");
						notificationSecondRow.style.display = 'none';
						var notificationTopRow = document.getElementById("notification_top_row");
						notificationTopRow.style.display = 'none';
						document.getElementById("emptylistTV").innerHTML = "No Records Found";
					}else{
						/**
						 * Start process is available. Fetch notification from server.
						 */
						getNotificationFromServer();
					}
					
				}else{
					/**
					 * Thirty minute timer is available. Check whether it's completed or not
					 * If completed, hide timer and header. Display 'No record found' Message
					 */
					var intValueOfThirtyMinTimer = parseInt(thirtyMinTimer);
					if(intValueOfThirtyMinTimer == 0){
						console.log("code if intValueOfThirtyMinTimer == 0");
						/**
						 * 30 min is over
						 * Hider timer and screen header. Display 'No record found' Message
						 */
						window.localStorage.removeItem("notification_count_int");
						window.localStorage.removeItem("currentMin");
						window.localStorage.removeItem("startProcess");
						var timerDiv = document.getElementById("notification_timer_div");
						timerDiv.style.display = 'none';
						var notificationSecondRow = document.getElementById("notification_second_row");
						notificationSecondRow.style.display = 'none';
						var notificationTopRow = document.getElementById("notification_top_row");
						notificationTopRow.style.display = 'none';
						document.getElementById("emptylistTV").innerHTML = "No Records Found";
					}else{
						console.log("code else section intValueOfThirtyMinTimer == 09");
						/**
						 * 30 minute timer is not completed.
						 * Call notification api and display remaining time
						 */
						getNotificationFromServer();
						
					}
				}
			}
		}
	}
}

function getNotificationFromServer(){
	var lsItem = window.localStorage.getItem("user_user_id");
	var data = {userId:lsItem, offset:'0'};
	console.log("user_id", lsItem);
	$.ajax({
		type: 'POST',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hotelNotifications',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		data: JSON.stringify(data),
		dataType : 'json',
		contentType: "application/json",
		success: function(data){
			$('#notificationlisthotel li').remove();
			hotels = data.hotelNotifications;
			var firstOffset = data.offset;
			var countNotif = 0;
			$.each(hotels, function(index, hotelNotifications) {
				if(hotelNotifications.status == "Approve"){
					var timerDiv = document.getElementById("notification_timer_div");
					timerDiv.style.display = 'block';
					var notificationSecondRow = document.getElementById("notification_second_row");
					notificationSecondRow.style.display = 'block';
					var notificationTopRow = document.getElementById("notification_top_row");
					notificationTopRow.style.display = 'block';
					countNotif++;
					
					//Convert date in readable format code start.
					var monthNames = [
					                  "January", "February", "March",
					                  "April", "May", 'June', "July",
					                  "August", "September", "October",
					                  "November", "December"
					                ];
					
					var date = new Date(hotelNotifications.date);
					var day = date.getDate();
					var monthIndex = date.getMonth();
					var year = date.getFullYear();
					var finalDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
					//Code Ends
					
					document.getElementById("notificDate").innerHTML = finalDate;
					window.localStorage.setItem("notification_hotel_date", hotelNotifications.date);
					document.getElementById("num_rooms").innerHTML = hotelNotifications.numberOfRooms;
					
					for(var i = 0; i < hotelNotifications.roomType.length; i++){
						document.getElementById("ntfication_room_type").innerHTML = hotelNotifications.roomType[0].roomCategory;
					}
					
					for(var j = 0; j < hotelNotifications.hotelType.length; j++){
						document.getElementById("ntfication_hotel_type").innerHTML = hotelNotifications.hotelType[0].hotelType;
					}
					
					var noImge = '../../img/no_image.jpg';
					$("#notificationlisthotel").append("<li data-hotelid="+ hotelNotifications.hotelId +" id="+ hotelNotifications.bidid + "><div class='boderBottom notifiationB'><div class='col-xs-12'><div class='image'><img style='width: 90px;height:90px;' src="+ hotelNotifications.hotelMainpic +" alt=''></div><div class='desc'><div class='title'>"+hotelNotifications.hotelName+"</div><div class='text'>"+ hotelNotifications.status+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/book.png' alt=''></a></div></div></div></li>");
					$('img')
					.error(function(){
						this.src = '../../img/no_image.jpg';
					});
				}
				else{
					document.getElementById("emptylistTV").innerHTML = "Sorry no user accepted your bid! Please make another bidding or make a reservation via the website i.e. http://estays-sa.com";
				}
			});
			
			var notificationSecondRow = document.getElementById("notification_count");
			notificationSecondRow.style.display = 'block';
			document.getElementById("notification_count").innerHTML = countNotif;
			window.localStorage.setItem("notification_count_int", countNotif);
			
			$('#notificationlisthotel').listview('refresh');
			$("#notificationlisthotel").on("click", "li", function(){
				//get hotel id
				var idi = $(this).jqmData("hotelid");
				window.localStorage.setItem("hotel_book_id", idi);
				var selbidid = $(this).attr('id');
				window.localStorage.setItem("hotel_bid_id", selbidid);
				
//				alert("hotel id : "+idi+" Bid Id : "+selbidid);
				
				window.open("notification-hotel-detail.html");
	
			});
			
			var win = $(window);
			win.scroll(function (){
				//End of document reached?
				if($(document).height() - win.height() == win.scrollTop()){
					var data = {userId:lsItem, offset:firstOffset};
					$.ajax({
						type: 'POST',
						url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hotelNotifications',
						beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
						crossDomain: true,
						data: JSON.stringify(data),
						dataType : 'json',
						contentType: "application/json",
						success: function(data){
//							$('#notificationlisthotel li').remove();
							hotels = data.hotelNotifications;
							firstOffset = data.offset;
							$.each(hotels, function(index, hotelNotifications) {
								if(hotelNotifications.status == "Approve"){
									var noImge = '../../img/no_image.jpg';
									
									$("#notificationlisthotel").append("<li data-hotelid="+ hotelNotifications.hotelId +" id="+ hotelNotifications.bidid + "><div class='boderBottom notifiationB'><div class='col-xs-12'><div class='image'><img style='width: 90px;height:90px;' src="+ hotelNotifications.hotelMainpic +" alt=''></div><div class='desc'><div class='title'>"+hotelNotifications.hotelName+"</div><div class='text'>"+ hotelNotifications.status+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/book.png' alt=''></a></div></div></div></li>");
									
									$('img')
									.error(function(){
										this.src = '../../img/no_image.jpg';
									});	
								}
							});
							
							document.getElementById("loadingimg").style.display = "none";
						},
						error: function(xhr){
							
							console.log(xhr.responseText);
							var jsonResponse = JSON.parse(xhr.responseText);
							document.getElementById("loadingimg").style.display = "none";
//							alert("Error  : "+jsonResponse.message);
						},
						async: true,
						cache: false
						});
				}
			});
			
			var timerDiv = document.getElementById("notification_timer_div");
			timerDiv.style.display = 'block';
			
			/*var minCovered = window.localStorage.getItem("min_covered");
			
			var newMinCovered;
			
			if(minCovered === minCovered || minCovered === null || minCovered.length === 0){
				newMinCovered = 0;
			}else{
				newMinCovered = minCovered;
			}*/
			
			
			mins = 30;
			var previousMins = window.localStorage.getItem("currentMin");
			if(previousMins === undefined || previousMins === null || previousMins.length === 0){
				secs = mins * 60;
			}else{
				var intpm = parseInt(previousMins);
				mins = intpm; 
				secs = mins * 60;
			}
			
			console.log("mins : "+mins+"  secs : "+secs);
			
			setTimeout(Decrement,1000);
			document.getElementById("loadingimg").style.display = "none";
		},
		error: function(xhr){
			var timerDiv = document.getElementById("notification_timer_div");
			timerDiv.style.display = 'none';
			var notificationSecondRow = document.getElementById("notification_second_row");
			notificationSecondRow.style.display = 'none';
			var notificationTopRow = document.getElementById("notification_top_row");
			notificationTopRow.style.display = 'none';
			console.log(xhr.responseText);
			var jsonResponse = JSON.parse(xhr.responseText);
			document.getElementById("loadingimg").style.display = "none";
//			alert("Error  : "+jsonResponse.message);
			document.getElementById("emptylistTV").innerHTML = jsonResponse.message;
		},
		async: true,
		cache: false
		});
}