document.addEventListener("deviceready", onDeviceReady, true);

//var db;
var mins;
var secs;
var currentMinutes = 0;
var currentSeconds = 0;

function onDeviceReady(){
//	db = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng"){
		window.location.replace("../english/new-notification-page.html");
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
//	    	newNotificationCheck();
//	    	getNotificationFromServer();
	    	checkBidInfoNotification();
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


function Decrement(){
	currentMinutes = Math.floor(secs / 60);
    currentSeconds = secs % 60;
    if(currentSeconds <= 9) currentSeconds = "0" + currentSeconds;
    secs--;
    var bidid = window.localStorage.getItem("clicked_booked_id");
    window.localStorage.setItem("currentMin"+bidid, currentMinutes);
    document.getElementById("countdown").innerHTML = "00:"+ currentMinutes + ":" + currentSeconds; //Set the element id you need the time put into.
    if(secs !== -1) setTimeout('Decrement()',1000);
}

function startTimer(duration, display) {
	var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        var oldMin = window.localStorage.getItem("countdownMin");
        var oldSec = window.localStorage.getItem("countdownSec");
        
        if(oldMin === undefined || oldMin === null || oldMin.length === 0){
        	minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
        }else{
        	minutes = oldMin;
        	seconds = oldSec;
        	minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
        }

        /*minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;*/
        
        console.log("min "+minutes+" sec "+seconds);
        
        display.textContent = "00:"+ minutes + ":" + seconds;
    	
    	window.localStorage.setItem("countdownMin", minutes);
        window.localStorage.setItem("countdownSec", seconds);
        
        
       /* console.log("oldMin "+oldMin+" oldSec "+oldSec);
        
        if(oldMin === undefined || oldMin === null || oldMin.length === 0){
        	display.textContent = "00:"+ minutes + ":" + seconds;
        	
        	window.localStorage.setItem("countdownMin", minutes);
            window.localStorage.setItem("countdownSec", seconds);
        }else{
        	display.textContent = "00:"+ oldMin + ":" + oldSec;
        	
        	window.localStorage.setItem("countdownMin", oldMin);
            window.localStorage.setItem("countdownSec", oldSec);
        }*/
        
        
        

        if (--timer < 0) {
            timer = duration;
            
        }
    }, 1000);
}

function backButton(){
    history.go(-1);navigator.app.backHistory();
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

function checkBidInfoNotification(){
	/**
	 * Sequence of conditions to be checked
	 * User login status
	 * Get clicked notification id
	 * get all bids stored in database
	 * check one hour date of clicked bid id
	 */
		window.localStorage.setItem("UserBid", "Yes");
		var clickedBidIdFrmList = window.localStorage.getItem("clicked_booked_id");
		if(clickedBidIdFrmList === undefined || clickedBidIdFrmList === null || clickedBidIdFrmList.length === 0){
			/**
			 * User is logged In but, clicked bid id from list is empty
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
			 * Clicked bid id is available, now find date of clicked bid id from database.
			 * Calculate fetched time is greater than current time or not. 
			 */
			var bidddId = ""+clickedBidIdFrmList;
			var intfrmtBidId = parseInt(bidddId);
			
			//Testing code starts
			
			var findUserBidById = window.localStorage.getItem("hotel_bid_id_"+clickedBidIdFrmList);
			if(findUserBidById === undefined || findUserBidById === null || findUserBidById.length === 0){
				//Clicked bid id not available in localStorage
				var timerDiv = document.getElementById("notification_timer_div");
				timerDiv.style.display = 'none';
				var notificationSecondRow = document.getElementById("notification_second_row");
				notificationSecondRow.style.display = 'none';
				var notificationTopRow = document.getElementById("notification_top_row");
				notificationTopRow.style.display = 'none';
				document.getElementById("emptylistTV").innerHTML = "No Records Found";
			}else{
				var bidSuccessTime = window.localStorage.getItem("bidSuccessTime"+clickedBidIdFrmList);
				if(bidSuccessTime === undefined || bidSuccessTime === null || bidSuccessTime.length === 0){
					//Bid time not available
					console.log("bid time not available");
				}else{
					
					var bidPlacedTimeFrmtd = new Date(bidSuccessTime).getTime();
					var currentSysTime = new Date().getTime();
					if(currentSysTime < bidPlacedTimeFrmtd){
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
						console.log("Current time is less than hotelSuccessBidTimeFormatted");
			          }else{
			        	  /**
			        	   * Current time is greater than hotelSuccessBidTimeFormatted.
			        	   * Check 30 minute timer. If 30 minute completed or not.
			        	   */
			        	  var thirtyMinTimer = window.localStorage.getItem("currentMin"+clickedBidIdFrmList);
			        	  if(thirtyMinTimer === undefined || thirtyMinTimer === null || thirtyMinTimer.length === 0){
			        		  /**
								 * Thirty minute timer is not available
								 */
			        		  var startProcessExists = window.localStorage.getItem("startProcess"+clickedBidIdFrmList);
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
									
									var data = {bidId:clickedBidIdFrmList};
									$.ajax({
										type : 'POST',
										url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/inactiveABid',
										beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
										crossDomain : true,
										data : JSON.stringify(data),
										dataType : 'json',
										contentType: "application/json",
										success : function(data){
											console.log("Inactive bid successfull");
											window.localStorage.removeItem("currentMin"+clickedBidIdFrmList);
											window.localStorage.removeItem("startProcess"+clickedBidIdFrmList);
											document.getElementById("loadingimg").style.display = "none";
											window.localStorage.removeItem("bidSuccessTime"+clickedBidIdFrmList);
											window.localStorage.removeItem("hotel_bid_id_"+clickedBidIdFrmList);
										},error : function(xhr) {
//											var jsonResponse = JSON.parse(xhr.responseText);
											document.getElementById("loadingimg").style.display = "none";
//											alert(""+jsonResponse.message);
											console.log("Error occurred while inactive bid");
										}
									});
									
									
									var timerDiv = document.getElementById("notification_timer_div");
									timerDiv.style.display = 'none';
									var notificationSecondRow = document.getElementById("notification_second_row");
									notificationSecondRow.style.display = 'none';
									var notificationTopRow = document.getElementById("notification_top_row");
									notificationTopRow.style.display = 'none';
									document.getElementById("emptylistTV").innerHTML = "No Records Found";
								}else{
									console.log("code else section intValueOfThirtyMinTimer == 0");
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
			//Testing code ends
		}
	
}

function getNotificationFromServer(){
	var lsItem = window.localStorage.getItem("user_user_id");
	var bidid = window.localStorage.getItem("clicked_booked_id");
	var data = {bidId:bidid, offset:'0'};
	console.log("user_id", lsItem);
	$.ajax({
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hotelBidInfo',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		data: data,
		dataType : 'json',
		contentType: "application/json",
		success: function(data){
			$('#notificationlisthotel li').remove();
			hotels = data.hotelBidInfo;
			var firstOffset = data.offset;
			var countNotif = 0;
			$.each(hotels, function(index, hotelBidInfo) {
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
					
					var date = new Date(hotelBidInfo.dateCreated);
					var day = date.getDate();
					var monthIndex = date.getMonth();
					var year = date.getFullYear();
					var finalDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
					//Code Ends
					
					document.getElementById("notificDate").innerHTML = finalDate;
					window.localStorage.setItem("notification_hotel_date", hotelBidInfo.dateCreated);
					document.getElementById("num_rooms").innerHTML = hotelBidInfo.numberOfRooms;
					
					for(var i = 0; i < hotelBidInfo.roomType.length; i++){
						document.getElementById("ntfication_room_type").innerHTML = hotelBidInfo.roomType[0].roomCategory;
					}
					
					for(var j = 0; j < hotelBidInfo.hotelType.length; j++){
						document.getElementById("ntfication_hotel_type").innerHTML = hotelBidInfo.hotelType[0].hotelType;
					}
					
					var noImge = '../../img/no_image.jpg';
					$("#notificationlisthotel").append("<li data-hotelid="+ hotelBidInfo.hotelId +" id="+ hotelBidInfo.bidid + "><div class='boderBottom notifiationB'><div class='col-xs-12'><div class='image'><img style='width: 90px;height:90px;' src="+ hotelBidInfo.hotelMainpic +" alt=''></div><div class='desc'><div class='title'>"+hotelBidInfo.hotelName+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/book.png' alt=''></a></div></div></div></li>");
					
					$('img')
					.error(function(){
						this.src = '../../img/no_image.jpg';
					});
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
					var lsItem = window.localStorage.getItem("user_user_id");
					var bidid = window.localStorage.getItem("clicked_booked_id");
					var data = {bidId:bidid, offset:firstOffset};
//					var data = {userId:lsItem, offset:firstOffset};
					$.ajax({
						type: 'GET',
						url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hotelBidInfo',
						beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
						crossDomain: true,
						data: data,
						dataType : 'json',
						contentType: "application/json",
						success: function(data){
//							$('#notificationlisthotel li').remove();
							hotels = data.hotelBidInfo;
							firstOffset = data.offset;
							$.each(hotels, function(index, hotelBidInfo) {
									var noImge = '../../img/no_image.jpg';
									
									$("#notificationlisthotel").append("<li data-hotelid="+ hotelBidInfo.hotelId +" id="+ hotelBidInfo.bidid + "><div class='boderBottom notifiationB'><div class='col-xs-12'><div class='image'><img style='width: 90px;height:90px;' src="+ hotelBidInfo.hotelMainpic +" alt=''></div><div class='desc'><div class='title'>"+hotelBidInfo.hotelName+"</div><div class='text'>"+ hotelBidInfo.linkstatus+"</div></div><div class='linkarrow'><a href='javascript:void(0)'><img src='../../img/book.png' alt=''></a></div></div></div></li>");
									
									$('img')
									.error(function(){
										this.src = '../../img/no_image.jpg';
									});
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
			var previousMins = window.localStorage.getItem("currentMin"+bidid);
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
