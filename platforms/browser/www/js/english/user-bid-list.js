document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady(){
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Arb"){
		window.location.replace("../arabic/user-bid.html");
	}else{
			window.localStorage.setItem("UserBid", "Yes");
			//User is login. Continue login
			//Check internet connection
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
		    	var data = {userId:window.localStorage.getItem("user_user_id"),gcmId:window.localStorage.getItem("user_device_Id")};
		    	$.ajax({
				type: 'GET',
				url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/userBidsInfo',
				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
				crossDomain: true,
				data : data,
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

						               
						               
                           
                           var s = userBids.date;
                           var a = s.split(/[^0-9]/);
                           //for (i=0;i<a.length;i++) { alert(a[i]); }
                           var date=new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5] );
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
							var data = {userId:window.localStorage.getItem("user_user_id"),gcmId:window.localStorage.getItem("user_device_Id"), offset:firstOffset};
							$.ajax({
								type: 'GET',
								url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/userBidsInfo',
								beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
								crossDomain: true,
								data : data,
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
    history.go(-1);navigator.app.backHistory();
}

function bookingFoot(){
	window.open("bookings.html");
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