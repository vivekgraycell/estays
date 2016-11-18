document.addEventListener("deviceready", onDeviceReady, true);
//var db;
var shortName = 'BidInfoDB';
var version = '1.0';
var displayName = 'BidInfoDB';
var maxSize = 150000;

function onDeviceReady(){
    
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng"){
		window.location.replace("../english/summary.html");
	}else{
		var countrySel = window.localStorage.getItem("countryVisiting");
		var areaSel = window.localStorage.getItem("areaVisiting");
		var citySel = window.localStorage.getItem("cityVisiting");
		var stateSel = window.localStorage.getItem("stateVisiting");
		var hotelSel = window.localStorage.getItem("selhotelcat");
		var roomSel = window.localStorage.getItem("selroomcat");
		var checkInDt = window.localStorage.getItem("checkInDatePick");
		var checkOutDt = window.localStorage.getItem("checkOutDatePick");
		var bidAmt = window.localStorage.getItem("bid_amt_val");
		var usrName = window.localStorage.getItem("user_user_acc_name");
		var usrEmail = window.localStorage.getItem("user_user_acc_email");
		
		document.getElementById("summary_country").innerHTML = countrySel;
		document.getElementById("summary_state").innerHTML = stateSel;
		document.getElementById("summary_city").innerHTML = citySel;
		document.getElementById("summary_area").innerHTML = areaSel;
		document.getElementById("summary_hotel").innerHTML = hotelSel;
		document.getElementById("summary_room_type").innerHTML = roomSel;
		document.getElementById("summary_check_in_date").innerHTML = checkInDt;
		document.getElementById("summary_check_out_date").innerHTML = checkOutDt;
		document.getElementById("summary_bid_amt").innerHTML = bidAmt;
		document.getElementById("summary_user_name").value = usrName;
		document.getElementById("summary_user_email").value = usrEmail;
        console.log(new Date(new Date().getTime()).toLocaleTimeString());
        //var currentTime=new Date(new Date().getTime()).toLocaleTimeString();
        //document.getElementById("usr_arvl_time").value="12:15 AM";
	}
	
//	db = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
	
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
function openBookingFoot(){
	window.open("bookings.html");
}

function openProfileFoot(){
	window.open("user-profile.html");
}

function openNotificationFoot(){
	window.open("user-bid.html");
}

function termsandconditionsscreen(){
	window.open("termsandcondition.html");
}

function backButton(){
    history.go(-1);navigator.app.backHistory();
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

function validationCheck(){
	if(document.getElementById("summary_user_name").value == ""){
        navigator.notification.alert(
                                     "Enter your name.",  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;

	}else if(document.getElementById("summary_user_email").value == ""){
        navigator.notification.alert(
                                     "Enter your email address.",  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;

	}else if(document.getElementById("usr_arvl_time").value == ""){
        navigator.notification.alert(
                                     "Please enter your arrival time.",  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;

        
	}else if(document.getElementById("usr_phn_num").value == ""){
        navigator.notification.alert(
                                     "Please enter your phone number.",  // message
                                     function(){},         // callback
                                     'Alert',            // title
                                     'OK'                  // buttonName
                                     );
        return false;

        
	}else{
		if(document.getElementById("roundedOne").checked){
			//checked
				networkState = checkConnection();
				if (networkState == 'No network connection') {
                    navigator.notification.alert(
                                                 "Please check your internet connection.",  // message
                                                 function(){},         // callback
                                                 'Alert',            // title
                                                 'OK'                  // buttonName
                                                 );
                    return false;
                }else{
		    	
				console.log("countryId : "+window.localStorage.getItem("countryVisitingId")+" city : "+window.localStorage.getItem("cityVisitingId")+" stateId : "+window.localStorage.getItem("stateVisitingId")+" nearByarea : "+window.localStorage.getItem("areaVisiting")+" address : "+window.localStorage.getItem("areaVisiting")+" checkInDate : "+window.localStorage.getItem("checkInDatePick")+" checkOutDate : "+window.localStorage.getItem("checkOutDatePick")+" roomCategoryId : "+window.localStorage.getItem("selroomid")+" numberOfRooms : "+window.localStorage.getItem("roomRequired")+" hotelTypeId : "+window.localStorage.getItem("selhotelid")+" pricerangeId : "+window.localStorage.getItem("hotel_price_range_id")+" actualprice : "+window.localStorage.getItem("bid_amt_val")+" userId : "+window.localStorage.getItem("user_user_id")+" userName: "+document.getElementById("summary_user_name").value+" userEmail : "+document.getElementById("summary_user_email").value+" arrivalTime : "+document.getElementById("usr_arvl_time").value+" phoneNumber : "+document.getElementById("usr_phn_num").value+" creditCardName : "+document.getElementById("crd_name_on_card").value+" creditCardNo : "+document.getElementById("crd_card_num").value+" cvv : "+document.getElementById("crd_security_code").value+" expMonth : "+document.getElementById("crd_expiry_mnth").value+" expYear : "+document.getElementById("crd_expiry_year").value+" gcmId : "+window.localStorage.getItem("user_device_Id"));
		    	
		    	var data = {countryId:window.localStorage.getItem("countryVisitingId"), stateId: window.localStorage.getItem("stateVisitingId"), city:window.localStorage.getItem("cityVisitingId"),nearByarea:window.localStorage.getItem("areaVisiting"), address:window.localStorage.getItem("areaVisiting"), checkInDate:window.localStorage.getItem("checkInDatePick"), checkOutDate:window.localStorage.getItem("checkOutDatePick"), roomCategoryId:window.localStorage.getItem("selroomid"), numberOfRooms:window.localStorage.getItem("roomRequired"), hotelTypeId:window.localStorage.getItem("selhotelid"), pricerangeId:window.localStorage.getItem("hotel_price_range_id"), actualprice:window.localStorage.getItem("bid_amt_val"), userId:window.localStorage.getItem("user_user_id"), name:document.getElementById("summary_user_name").value, email:document.getElementById("summary_user_email").value, arrivalTime:document.getElementById("usr_arvl_time").value, phoneNumber:document.getElementById("usr_phn_num").value, creditCardName:document.getElementById("crd_name_on_card").value, creditCardNo:document.getElementById("crd_card_num").value, cvv:document.getElementById("crd_security_code").value, expMonth:document.getElementById("crd_expiry_mnth").value, expYear:document.getElementById("crd_expiry_year").value, gcmId: window.localStorage.getItem("user_device_Id")};
			$.ajax({
				type : 'POST',
				url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/hotelBid',
				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
				crossDomain : true,
				data : JSON.stringify(data),
				dataType : 'json',
				contentType: "application/json",
				success : function(data){
					window.localStorage.removeItem("sel_country_id_text");
					window.localStorage.removeItem("cityVisiting");
					window.localStorage.removeItem("cityVisiting");
					window.localStorage.removeItem("checkInDatePick");
					window.localStorage.removeItem("checkOutDatePick");
					window.localStorage.removeItem("selroomid");
					window.localStorage.removeItem("roomRequired");
					window.localStorage.removeItem("selhotelid");
					window.localStorage.removeItem("hotel_price_range_id");
					window.localStorage.removeItem("bid_amt_val");
					window.localStorage.removeItem("goingtocheckout");
					document.getElementById("loadingimg").style.display = "none";
					
                   
                   navigator.notification.alert(
                                                data.message,  // message
                                                function(){
                                                
                                                //bidId: data.bidId
                                                window.localStorage.setItem("user_bid_id_gen", data.bidId);
                                                
                                                /*//Start timer here and create notification
                                                 var now = new Date();
                                                 var one_hour_from_now = new Date(now.getTime() + (60.0 * 75));
                                                 alert("notification time : "+one_hour_from_now);*/
                                                
                                                //Start timer here and create notification
                                                var now = new Date();
                                                var one_hour_from_now = new Date(now.getTime() + 1.25*60*60*1000);
                                                
                                                //	    			var ntime = new Date(new Date().getTime() + 1.5*60*60*1000).toLocaleTimeString();
                                                //					alert("notification time : "+one_hour_from_now);
                                                
                                                var ten_sec_from_now = new Date(now.getTime() + 30 * 1000);
                                                
                                                
                                                cordova.plugins.notification.local.schedule({
                                                                                            id: 1,
                                                                                            title: "Estays Request Response",
                                                                                            text: "Your hotel request response is generated. Please check.",
                                                                                            at: ten_sec_from_now,
                                                                                            data: { userId:window.localStorage.getItem("user_user_id") }
                                                                                            }, function(){
                                                                                            console.log("function called.");
                                                                                            });
                                                
                                                
                                                var d1 = new Date();
                                                var d3 = new Date(d1);
                                                d3.setTime(d1.getTime() + 60*60000);
                                                //					d3.setTime(d1.getTime() + 1*60000);
                                                
                                                window.localStorage.setItem("one_hour_past", d3);
                                                console.log(""+data.bidId);
                                                
                                                //Testing code
                                                window.localStorage.setItem("hotelSuccessBidTime", one_hour_from_now);
                                                window.localStorage.setItem("startProcess"+data.bidId, "Some Value");
                                                window.localStorage.setItem("bidSuccessTime"+data.bidId, one_hour_from_now);
                                                window.localStorage.setItem("hotel_bid_id_"+data.bidId,"bidId")
                                                //createDatabse();
                                                //Ends
                                                
                                                /*window.plugin.notification.local.on('click', function (notification, state) {
                                                 console.log("state : "+state);
                                                 window.open("notification.html");
                                                 });
                                                 
                                                 window.plugin.notification.local.on('trigger', function (notification, state) {
                                                 console.log("state : "+state);
                                                 console.log("notification trigger time.");
                                                 });*/
                                                
                                                cordova.plugins.notification.local.on('trigger', function (notification) {
                                                                                      //					    showToast('triggered: ' + notification.id);
                                                                                      }, this);
                                                
                                                cordova.plugins.notification.local.getTriggered(function (notifications) {
                                                                                                //					    alert(notifications.length);
                                                                                                });
                                                
                                                cordova.plugins.notification.local.on("click", function (notification) {
                                                                                      //					    alert(notification.text);
                                                                                      window.open("notification.html");
                                                                                      });
                                                
                                                /*cordova.plugins.notification.local.on("trigger", function (notification) {
                                                 console.log("notification trigger time.");
                                                 });
                                                 
                                                 cordova.plugins.notification.local.on("click", function (notification) {
                                                 window.open("notification.html");
                                                 if (notification.id == 10) {
                                                 joinMeeting(notification.data.meetingId);
                                                 }
                                                 });*/
                                                
                                                window.localStorage.setItem("timerStarted", "yes");
                                                
                                                
                                                window.location.replace("search.html");
                                                
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
		}else{
            
            navigator.notification.alert(
                                         "Please agree to our Terms and Conditions.",  // message
                                         function(){},         // callback
                                         'Alert',            // title
                                         'OK'                  // buttonName
                                         );
            
            return false;

		}
		
		
		
		
	}
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

function errorHandler(transaction, error) {
    
    navigator.notification.alert(
                                 'Error: ' + error.message + ' code: ' + error.code,  // message
                                 function(){},         // callback
                                 'Alert',            // title
                                 'OK'                  // buttonName
                                 );
    
}

//this is called when a successful transaction happens
function successCallBack() {
	insertValueInDB();
    
    navigator.notification.alert(
                                 'Record entered successfully',  // message
                                 function(){},         // callback
                                 'Alert',            // title
                                 'OK'                  // buttonName
                                 );

    
}

function createDatabse(){
//	db = openDatabase(shortName, version, displayName,maxSize);
	var oneHr = window.localStorage.getItem("hotelSuccessBidTime");
	var userLoggedInId = window.localStorage.getItem("user_user_id");
	var user_bid_id = window.localStorage.getItem("user_bid_id_gen");
//	var db = window.sqlitePlugin.openDatabase(shortName, version, displayName,-1);
	
	db.transaction(function(tx){
		/*tx.executeSql( 'CREATE TABLE IF NOT EXISTS User(UserId INTEGER NOT NULL, BidId INTEGER NOT NULL, OneHourDate VARCHAR NOT NULL)',
				[],nullHandler,errorHandler);
				 },errorHandler,successCallBack);*/
		tx.executeSql('CREATE TABLE IF NOT EXISTS User(UserId integer, BidId integer, OneHourDate varchar)');
		tx.executeSql("INSERT INTO User (UserId, BidId, OneHourDate) VALUES (?,?,?)", [userLoggedInId, user_bid_id, oneHr], function(tx, res) {
		      console.log("insertId: " + res.insertId + " -- probably 1");
		      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
		     /* tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
		          console.log("res.rows.length: " + res.rows.length + " -- should be 1");
		          console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
		        });*/
		      tx.executeSql("SELECT * FROM User;", [], function(tx, res) {
		    	  if (res != null && res.rows != null) {
				        for (var i = 0; i < res.rows.length; i++) {
				          var row = res.rows.item(i);
				          console.log("User Id: "+row.UserId+" BidId : "+row.BidId+" OneHour : "+row.OneHourDate);
				        }
					}
		        });
		      }, function(e) {
		        console.log("ERROR: " + e.message);
		      });
		    });
	}

function checkAllValuesStored(){
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM User;', [], function(transaction, result) {
			if (result != null && result.rows != null) {
		        for (var i = 0; i < result.rows.length; i++) {
		          var row = result.rows.item(i);
		          console.log("User Id: "+row.UserId+" BidId : "+row.BidId+" OneHour : "+row.OneHourDate);
		        }
			}
		},errorHandler);
	},errorHandler,nullHandler);
	
	return;
}

function insertValueInDB(){
	var oneHr = window.localStorage.getItem("hotelSuccessBidTime");
	var userLoggedInId = window.localStorage.getItem("user_user_id");
	db.transaction(function(transaction) {
		   transaction.executeSql('INSERT INTO User(UserId, BidId, OneHourDate) VALUES (?,?,?)',[userLoggedInId, 123,oneHr],
		     nullHandler,errorHandler);
		   });
	
	checkAllValuesStored();
	
	return false;
}
