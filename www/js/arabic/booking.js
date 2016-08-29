document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady(){
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng")
    {
		window.location.replace("../english/bookings.html");
    }else{
    	var lsItem = window.localStorage.getItem("user_user_id");

		if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
			//User not login. Show error dialog.
//			alert("Unable to perform operation as user is not currently loggedIn.");
			window.localStorage.setItem("BookingPage", "Yes");
			window.open("register.html");
		}else{
			//User is login. Continue login
			
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
		    	$.ajax({
				type: 'GET',
				url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/pastBookings',
				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
				crossDomain: true,
				data: {userId:lsItem, offset:'0'},
				dataType : 'json',
				contentType: "application/json",
				success: function(data){
					$('#pstbookingdiv li').remove();
					hotels = data.summary;
					var firstOffset = data.offset;
					$.each(hotels, function(index, summary) {
						
						var monthNames = [
						                  "January", "February", "March",
						                  "April", "May", 'June', "July",
						                  "August", "September", "October",
						                  "November", "December"
						                ];

						                var date = new Date(summary.DateCreated);
						                var day = date.getDate();
						                var monthIndex = date.getMonth();
						                var year = date.getFullYear();

						                var finalDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
						                var noImge = '../../img/no_image.jpg';
						$("#pstbookingdiv").append("<li data-hotelid="+ summary.hotelId +"><div class='boderBottom'><div class='col-xs-12'><div class='image'><img id="+ summary.hotelId +" style='width: 115px;height:115px;' src="+ summary.hotelMainpic +" alt=''></div><div class='desc'> <a href='javascript:void(0)' class='yellowLink'>"+ summary.hotelType+"</a><div class='clearfix'></div><div class='title margbot'>"+finalDate+"</div><div class='text'>"+summary.hotelNameArabic+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/arrow.png' alt=''></a></div></div></div></li>");
						$('img')
						.error(function(){
							this.src = '../../img/no_image.jpg';
						});
					});
					$('#pstbookingdiv').listview('refresh');
					$("#pstbookingdiv").on("click", "li", function(){
	                    //get hotel id
	                    var id = $(this).jqmData("hotelid");
	                    window.localStorage.setItem("clicked_hotel_id", id);
	                    window.open("hotel-detail.html");
	                });
					
					
					var win = $(window);
					win.scroll(function (){
						//End of document reached?
						if($(document).height() - win.height() == win.scrollTop()){
							$.ajax({
								type: 'GET',
								url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/pastBookings',
								beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
								crossDomain: true,
								data: {userId:lsItem, offset:firstOffset},
								dataType : 'json',
								contentType: "application/json",
								success: function(data){
//									$('#pstbookingdiv li').remove();
									hotels = data.summary;
									
									firstOffset = data.offset;
									$.each(hotels, function(index, summary) {
										
										var monthNames = [
										                  "January", "February", "March",
										                  "April", "May", 'June', "July",
										                  "August", "September", "October",
										                  "November", "December"
										                ];

										                var date = new Date(summary.DateCreated);
										                var day = date.getDate();
										                var monthIndex = date.getMonth();
										                var year = date.getFullYear();

										                var finalDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
										
										var noImge = '../../img/no_image.jpg';
										
										$("#pstbookingdiv").append("<li data-hotelid="+ summary.hotelId +"><div class='boderBottom'><div class='col-xs-12'><div class='image'><img id="+ summary.hotelId +" style='width: 115px;height:115px;' src="+ summary.hotelMainpic +" alt=''></div><div class='desc'> <a href='javascript:void(0)' class='yellowLink'>"+ summary.hotelType+"</a><div class='clearfix'></div><div class='title margbot'>"+finalDate+"</div><div class='text'>"+summary.hotelName+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/arrow.png' alt=''></a></div></div></div></li>");
										
										$('img')
										.error(function(){
											this.src = '../../img/no_image.jpg';
										});
										
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
//										$('#hotelList').append('<li data-hotelid='+ summary.hotelId +'><a href="#"><h5>'+ summary.hotelName + '</h5><p>' + summary.city + '</p><p>' +summary.DateCreated + '</p></a></li>');
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
					
					document.getElementById("loadingimg").style.display = "none";
					
				},
				error: function(xhr){
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

function openDetailPage(id){
	alert(id);
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
	window.open("user-bid.html");
}

function changeLanguageBtn(){
	if(confirm("Change language to English.") == true){
		//Ok button clicked.
		window.localStorage.setItem("selectedLanguage", "Eng");
		window.location.replace("../english/bookings.html");
	}else{
		//Cancel button clicked.
	}
}

function logoutUser(){
	var lsItem = window.localStorage.getItem("user_user_id");

	if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
		//User not login. Show error dialog.
//		alert("Unable to perform operation as user is not currently loggedIn.");
		window.localStorage.setItem("BookingPage", "Yes");
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