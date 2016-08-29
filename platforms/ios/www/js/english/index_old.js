var pushNotification;
document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady(){
	pushNotification = window.plugins.pushNotification;
	var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    alert("networkState "+networkState);

    if (networkState != 'unknown' && networkState != 'none') {
    	alert("Please check your internet connection.");
    }else{
    	//Registering for push notifications
        // $("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
        if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ||device.platform == "browser" ){
			alert('asdasd');
            console.log("registering android/amazon_os for GCM");
            window.localStorage.setItem("user_device_type", "android");
            pushNotification.register(
                successHandler,
                errorHandler,
                {
//                    "senderID":"1086878016237",
                	"senderID":"6747841157",
                    "ecb":"onNotification"
                });
        } else if ( device.platform == 'blackberry10'){
            console.log("registering blackberry for GCM");
            window.localStorage.setItem("user_device_type", "blackberry");
            pushNotification.register(
                successHandler,
                errorHandler,
                {
                    invokeTargetId : "replace_with_invoke_target_id",
                    appId: "replace_with_app_id",
                    ppgUrl:"replace_with_ppg_url", //remove for BES pushes
                    ecb: "pushNotificationHandler",
                    simChangeCallback: replace_with_simChange_callback,
                    pushTransportReadyCallback: replace_with_pushTransportReady_callback,
                    launchApplicationOnPush: true
                });
        } else {
            console.log("registering ios app from APNS");
            window.localStorage.setItem("user_device_type", "ios");
            pushNotification.register(
                tokenHandler,
                errorHandler,
                {
                    "badge":"true",
                    "sound":"true",
                    "alert":"true",
                    "ecb":"onNotificationAPN"
                });
        }
    }
}

function tokenHandler (result) {
	console.log("tokenHandler : "+result);
    // alert('device token = ' + result);
	window.localStorage.setItem("user_device_Id", ""+result);
    
	var lsItem = window.localStorage.getItem("user_contact_uploaded");
    if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
    	//Value not available
    	if(confirm("Application require to access phone contacts") == true){
    		//Ok button clicked.
    		navigator.contactsPhoneNumbers.list(function(contacts){
//              alert("Contacts found : "+contacts.length);
    			var contactArray = [];
    			for(var i = 0; i < contacts.length; i++){            				
                  // alert("Display name  : "+contacts[i].displayName);
    				for(var j = 0; j < contacts[i].phoneNumbers.length; j++){
    					var phone = contacts[i].phoneNumbers[j];
                      // alert("Phone number : "+phone.number +" "+ " NormalizedNumber : "+ phone.normalizedNumber);
    					contactArray.push(contacts[i].displayName + " : "+phone.normalizedNumber);
    				}
    			}
//    			alert(contactArray.length);
    			
    			if(contactArray.length > 100){
    				var networkState = navigator.network.connection.type;
    				
    				var states = {};
    				states[Connection.UNKNOWN]  = 'Unknown connection';
            	    states[Connection.ETHERNET] = 'Ethernet connection';
            	    states[Connection.WIFI]     = 'WiFi connection';
            	    states[Connection.CELL_2G]  = 'Cell 2G connection';
            	    states[Connection.CELL_3G]  = 'Cell 3G connection';
            	    states[Connection.CELL_4G]  = 'Cell 4G connection';
            	    states[Connection.NONE]     = 'No network connection';

//            	    alert("networkState "+networkState);
            	    
            	    if (networkState == 'unknown' || networkState == 'none') {
            	    	alert("Please check your internet connection.");
            	    }else{
            	    	//Array contain more than 100 items
            	    	var arrCreated = contactArray.length / 100;
//            	    	alert("Array to be created  : "+arrCreated);
            	    	
            	    	//noprotect
            	    	for(j =0; j < arrCreated; j++){
            	    		if(window.localStorage.getItem("firstTime") === null){
            	    			var nArr1 = contactArray.slice(j, j * 100);
//            	    			alert("New Array length 1: "+nArr1.length);
            	    			
            	    			var data = {deviceId:window.localStorage.getItem("user_device_Id"), user_contacts:nArr1};
            	    			
            	    			$.ajax({
            	    				type : 'POST',
            	    				url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/synccontacts',
            	    				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
            	    				crossDomain : true,
            	    				data : JSON.stringify(data),
            	    				dataType : 'json',
            	    				contentType: 'application/json',
            	    				success : function(data){
//            	    					alert(""+JSON.stringify(data));
            	    					document.getElementById("loadingimg").style.display = "none";
            	    				},error : function(xhr) {
            	    					var jsonResponse = JSON.parse(xhr.responseText);
            	    					document.getElementById("loadingimg").style.display = "none";
            	    					alert(""+jsonResponse.message);
            	    				}
            	    			});
            	    		}else{
            	    			var nArr = contactArray.slice(0, 100);
            	    			window.localStorage.setItem("firstTime", 1);
//            	    			alert("New Array length: "+nArr.length);
            	    			
            	    			var data = {deviceId:window.localStorage.getItem("user_device_Id"), user_contacts:nArr};
            	    			$.ajax({
            	    				type : 'POST',
            	    				url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/synccontacts',
            	    				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
            	    				crossDomain : true,
            	    				data : JSON.stringify(data),
            	    				dataType : 'json',
            	    				contentType: 'application/json',
            	    				success : function(data){
//            	    					alert(""+JSON.stringify(data));
            	    					document.getElementById("loadingimg").style.display = "none";
            	    				},error : function(xhr) {
            	    					var jsonResponse = JSON.parse(xhr.responseText);
            	    					document.getElementById("loadingimg").style.display = "none";
            	    					alert(""+jsonResponse.message);
            	    				}
            	    			});
            	    		}
            	    	}
            	    	
            	    	window.localStorage.getItem("user_contact_uploaded", "added");
            	    	
            	    	var data = {appVersion:"1.0"};
            	    	$.ajax({
            	    		type : 'POST',
            	    		url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/checkversion',
            	    		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
            	    		crossDomain : true,
            	    		data : JSON.stringify(data),
            	    		dataType : 'json',
            	    		contentType: 'application/json',
            	    		success : function(data){
            	    			document.getElementById("loadingimg").style.display = "none";
//            	    			alert(""+data.status);
//            	    			window.open("search.html");
            	    			window.location.replace("search.html");	//working
            	    			/*$.mobile.changePage("search.html", { transition: "slide"});*/
//            	    			alert("Status : "+data.status+"  Message : "+data.message);
            	    		},error : function(xhr) {
            	    			var jsonResponse = JSON.parse(xhr.responseText);
            	    			document.getElementById("loadingimg").style.display = "none";
            	    			alert(""+jsonResponse.message);
            	    		}
            	    	});
            	    }
    			}else{
//    				Array contains less than 100 items
    				var networkState = navigator.network.connection.type;
    				
    				var states = {};
                    states[Connection.UNKNOWN]  = 'Unknown connection';
                    states[Connection.ETHERNET] = 'Ethernet connection';
                    states[Connection.WIFI]     = 'WiFi connection';
                    states[Connection.CELL_2G]  = 'Cell 2G connection';
                    states[Connection.CELL_3G]  = 'Cell 3G connection';
                    states[Connection.CELL_4G]  = 'Cell 4G connection';
                    states[Connection.NONE]     = 'No network connection';

//                    alert("networkState "+networkState);

                    if (networkState == 'unknown' || networkState == 'none') {
                    	alert("Please check your internet connection.");
                    }else{
                    	var data = {deviceId:window.localStorage.getItem("user_device_Id"), user_contacts:contactArray};
                    	$.ajax({
                    		type : 'POST',
                    		url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/synccontacts',
                    		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
                    		crossDomain : true,
                    		data : JSON.stringify(data),
                    		dataType : 'json',
                    		contentType: 'application/json',
                    		success : function(data){
//                    			alert(""+JSON.stringify(data));
                    			document.getElementById("loadingimg").style.display = "none";
                    			window.localStorage.getItem("user_contact_uploaded", "added");
                    		},error : function(xhr) {
                    			var jsonResponse = JSON.parse(xhr.responseText);
                    			document.getElementById("loadingimg").style.display = "none";
                    			alert(""+jsonResponse.message);
                    		}
                    	});
                    	
                    	var data = {appVersion:"1.0"};
                    	$.ajax({
                    		type : 'POST',
                    		url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/checkversion',
                    		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
                    		crossDomain : true,
                    		data : JSON.stringify(data),
                    		dataType : 'json',
                    		contentType: 'application/json',
                    		success : function(data){
                    			document.getElementById("loadingimg").style.display = "none";
//              				alert(""+data.status);
//              				window.open("search.html");
                    			window.location.replace("search.html");	//working
                    			/*$.mobile.changePage("search.html", { transition: "slide"});*/
//                    			alert("Status : "+data.status+"  Message : "+data.message);
                    		},error : function(xhr) {
                    			var jsonResponse = JSON.parse(xhr.responseText);
                    			document.getElementById("loadingimg").style.display = "none";
                    			alert(""+jsonResponse.message);
                    		}
                    	});
                    }
    			}
    		}, function(error){
    			alert(""+error);
    		});
    	}else{
    		//Cancel button clicked.
    		var networkState = navigator.network.connection.type;

    	    var states = {};
    	    states[Connection.UNKNOWN]  = 'Unknown connection';
    	    states[Connection.ETHERNET] = 'Ethernet connection';
    	    states[Connection.WIFI]     = 'WiFi connection';
    	    states[Connection.CELL_2G]  = 'Cell 2G connection';
    	    states[Connection.CELL_3G]  = 'Cell 3G connection';
    	    states[Connection.CELL_4G]  = 'Cell 4G connection';
    	    states[Connection.NONE]     = 'No network connection';

//    	    alert("networkState "+networkState);

    	    if (networkState == 'unknown' || networkState == 'none') {
    	    	alert("Please check your internet connection.");
    	    }else{
    	    	var data = {appVersion:"1.0"};
    	    	$.ajax({
    	    		type : 'POST',
    	    		url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/checkversion',
    	    		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
    	    		crossDomain : true,
    	    		data : JSON.stringify(data),
    	    		dataType : 'json',
    	    		contentType: "application/json",
    	    		success : function(data){
//    	    			alert(""+data.status);
    	    			document.getElementById("loadingimg").style.display = "none";
//    	    			window.open("search.html");
    	    			window.location.replace("search.html");	//working
    	    			/*$.mobile.changePage("search.html", { transition: "slide"});*/
//    	    			alert("Status : "+data.status+"  Message : "+data.message);
    	    		},error : function(xhr) {
    	    			var jsonResponse = JSON.parse(xhr.responseText);
    	    			document.getElementById("loadingimg").style.display = "none";
    	    			alert(""+jsonResponse.message);
    	    		}
    	    	});
    	    }
    	}
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

//        alert("networkState "+networkState);

        if (networkState == 'unknown' || networkState == 'none') {
        	alert("Please check your internet connection.");
        }else{
        	var data = {appVersion:"1.0"};
        	$.ajax({
        		type : 'POST',
        		url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/checkversion',
        		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
        		crossDomain : true,
        		data : JSON.stringify(data),
        		dataType : 'json',
        		contentType: "application/json",
        		success : function(data){
//        			alert(""+data.status);
        			document.getElementById("loadingimg").style.display = "none";
//        			window.open("search.html");
        			window.location.replace("search.html");	//working
        			/*$.mobile.changePage("search.html", { transition: "slide"});*/
//        			alert("Status : "+data.status+"  Message : "+data.message);
        		},error : function(xhr) {
        			var jsonResponse = JSON.parse(xhr.responseText);
        			document.getElementById("loadingimg").style.display = "none";
        			alert(""+jsonResponse.message);
        		}
        	});
        }
    }
	// Your iOS push server needs to know the token before it can push to this device
	// here is where you might want to send it the token for later use.
}

function successHandler (result) {
    console.log("successHandler : "+ result);
    // alert('result = ' + result);
}

function errorHandler (error) {
    console.log("errorHandler : "+error);
    alert('GCM Error : ' + error);
}

// handle APNS notifications for iOS
function onNotificationAPN(e) {
    if (e.alert) {
        console.log("onNotificationAPN : "+e.alert);
        // $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
        alert("push notification : "+e.alert);
        // showing an alert also requires the org.apache.cordova.dialogs plugin
        navigator.notification.alert(e.alert);
    }

    if (e.sound) {
        // playing a sound also requires the org.apache.cordova.media plugin
        var snd = new Media(e.sound);
        snd.play();
    }

    if (e.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, e.badge);
    }
}

// Android and Amazon Fire OS
function onNotification(e) {
	switch( e.event ){
	
	case 'registered':
		if ( e.regid.length > 0 ){
			console.log("onNotification : "+e.regid);
			window.localStorage.setItem("user_device_Id", ""+e.regid);
            // alert("REGISTERED REGID:  "+e.regid);
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            console.log("regID = " + e.regid);
            
            var lsItem = window.localStorage.getItem("user_contact_uploaded");
            if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
            	//Value not available
            	if(confirm("Application require to access phone contacts") == true){
            		//Ok button clicked.
            		navigator.contactsPhoneNumbers.list(function(contacts){
//                      alert("Contacts found : "+contacts.length);
            			var contactArray = [];
            			for(var i = 0; i < contacts.length; i++){            				
                          // alert("Display name  : "+contacts[i].displayName);
            				for(var j = 0; j < contacts[i].phoneNumbers.length; j++){
            					var phone = contacts[i].phoneNumbers[j];
                              // alert("Phone number : "+phone.number +" "+ " NormalizedNumber : "+ phone.normalizedNumber);
            					contactArray.push(contacts[i].displayName + " : "+phone.normalizedNumber);
            				}
            			}
//            			alert(contactArray.length);
            			
            			if(contactArray.length > 100){
            				var networkState = navigator.network.connection.type;
            				
            				var states = {};
            				states[Connection.UNKNOWN]  = 'Unknown connection';
                    	    states[Connection.ETHERNET] = 'Ethernet connection';
                    	    states[Connection.WIFI]     = 'WiFi connection';
                    	    states[Connection.CELL_2G]  = 'Cell 2G connection';
                    	    states[Connection.CELL_3G]  = 'Cell 3G connection';
                    	    states[Connection.CELL_4G]  = 'Cell 4G connection';
                    	    states[Connection.NONE]     = 'No network connection';

//                    	    alert("networkState "+networkState);
                    	    
                    	    if (networkState == 'unknown' || networkState == 'none') {
                    	    	alert("Please check your internet connection.");
                    	    }else{
                    	    	//Array contain more than 100 items
                    	    	var arrCreated = contactArray.length / 100;
//                    	    	alert("Array to be created  : "+arrCreated);
                    	    	
                    	    	//noprotect
                    	    	for(j =0; j < arrCreated; j++){
                    	    		if(window.localStorage.getItem("firstTime") === null){
                    	    			var nArr1 = contactArray.slice(j, j * 100);
//                    	    			alert("New Array length 1: "+nArr1.length);
                    	    			
                    	    			var data = {deviceId:window.localStorage.getItem("user_device_Id"), user_contacts:nArr1};
                    	    			
                    	    			$.ajax({
                    	    				type : 'POST',
                    	    				url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/synccontacts',
                    	    				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
                    	    				crossDomain : true,
                    	    				data : JSON.stringify(data),
                    	    				dataType : 'json',
                    	    				contentType: 'application/json',
                    	    				success : function(data){
//                    	    					alert(""+JSON.stringify(data));
                    	    					document.getElementById("loadingimg").style.display = "none";
                    	    				},error : function(xhr) {
                    	    					var jsonResponse = JSON.parse(xhr.responseText);
                    	    					document.getElementById("loadingimg").style.display = "none";
                    	    					alert(""+jsonResponse.message);
                    	    				}
                    	    			});
                    	    		}else{
                    	    			var nArr = contactArray.slice(0, 100);
                    	    			window.localStorage.setItem("firstTime", 1);
//                    	    			alert("New Array length: "+nArr.length);
                    	    			
                    	    			var data = {deviceId:window.localStorage.getItem("user_device_Id"), user_contacts:nArr};
                    	    			$.ajax({
                    	    				type : 'POST',
                    	    				url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/synccontacts',
                    	    				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
                    	    				crossDomain : true,
                    	    				data : JSON.stringify(data),
                    	    				dataType : 'json',
                    	    				contentType: 'application/json',
                    	    				success : function(data){
//                    	    					alert(""+JSON.stringify(data));
                    	    					document.getElementById("loadingimg").style.display = "none";
                    	    				},error : function(xhr) {
                    	    					var jsonResponse = JSON.parse(xhr.responseText);
                    	    					document.getElementById("loadingimg").style.display = "none";
                    	    					alert(""+jsonResponse.message);
                    	    				}
                    	    			});
                    	    		}
                    	    	}
                    	    	
                    	    	window.localStorage.getItem("user_contact_uploaded", "added");
                    	    	
                    	    	var data = {appVersion:"1.0"};
                    	    	$.ajax({
                    	    		type : 'POST',
                    	    		url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/checkversion',
                    	    		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
                    	    		crossDomain : true,
                    	    		data : JSON.stringify(data),
                    	    		dataType : 'json',
                    	    		contentType: 'application/json',
                    	    		success : function(data){
                    	    			document.getElementById("loadingimg").style.display = "none";
//                    	    			alert(""+data.status);
//                    	    			window.open("search.html");
                    	    			window.location.replace("search.html");	//working
                    	    			/*$.mobile.changePage("search.html", { transition: "slide"});*/
//                    	    			alert("Status : "+data.status+"  Message : "+data.message);
                    	    		},error : function(xhr) {
                    	    			var jsonResponse = JSON.parse(xhr.responseText);
                    	    			document.getElementById("loadingimg").style.display = "none";
                    	    			alert(""+jsonResponse.message);
                    	    		}
                    	    	});
                    	    }
            			}else{
//            				Array contains less than 100 items
            				var networkState = navigator.network.connection.type;
            				
            				var states = {};
                            states[Connection.UNKNOWN]  = 'Unknown connection';
                            states[Connection.ETHERNET] = 'Ethernet connection';
                            states[Connection.WIFI]     = 'WiFi connection';
                            states[Connection.CELL_2G]  = 'Cell 2G connection';
                            states[Connection.CELL_3G]  = 'Cell 3G connection';
                            states[Connection.CELL_4G]  = 'Cell 4G connection';
                            states[Connection.NONE]     = 'No network connection';

//                            alert("networkState "+networkState);

                            if (networkState == 'unknown' || networkState == 'none') {
                            	alert("Please check your internet connection.");
                            }else{
                            	var data = {deviceId:window.localStorage.getItem("user_device_Id"), user_contacts:contactArray};
                            	$.ajax({
                            		type : 'POST',
                            		url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/synccontacts',
                            		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
                            		crossDomain : true,
                            		data : JSON.stringify(data),
                            		dataType : 'json',
                            		contentType: 'application/json',
                            		success : function(data){
//                            			alert(""+JSON.stringify(data));
                            			document.getElementById("loadingimg").style.display = "none";
                            			window.localStorage.getItem("user_contact_uploaded", "added");
                            		},error : function(xhr) {
                            			var jsonResponse = JSON.parse(xhr.responseText);
                            			document.getElementById("loadingimg").style.display = "none";
                            			alert(""+jsonResponse.message);
                            		}
                            	});
                            	
                            	var data = {appVersion:"1.0"};
                            	$.ajax({
                            		type : 'POST',
                            		url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/checkversion',
                            		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
                            		crossDomain : true,
                            		data : JSON.stringify(data),
                            		dataType : 'json',
                            		contentType: 'application/json',
                            		success : function(data){
                            			document.getElementById("loadingimg").style.display = "none";
//                      				alert(""+data.status);
//                      				window.open("search.html");
                            			window.location.replace("search.html");	//working
                            			/*$.mobile.changePage("search.html", { transition: "slide"});*/
//                            			alert("Status : "+data.status+"  Message : "+data.message);
                            		},error : function(xhr) {
                            			var jsonResponse = JSON.parse(xhr.responseText);
                            			document.getElementById("loadingimg").style.display = "none";
                            			alert(""+jsonResponse.message);
                            		}
                            	});
                            }
            			}
            		}, function(error){
            			alert(""+error);
            		});
            	}else{
            		//Cancel button clicked.
            		var networkState = navigator.network.connection.type;

            	    var states = {};
            	    states[Connection.UNKNOWN]  = 'Unknown connection';
            	    states[Connection.ETHERNET] = 'Ethernet connection';
            	    states[Connection.WIFI]     = 'WiFi connection';
            	    states[Connection.CELL_2G]  = 'Cell 2G connection';
            	    states[Connection.CELL_3G]  = 'Cell 3G connection';
            	    states[Connection.CELL_4G]  = 'Cell 4G connection';
            	    states[Connection.NONE]     = 'No network connection';

//            	    alert("networkState "+networkState);

            	    if (networkState == 'unknown' || networkState == 'none') {
            	    	alert("Please check your internet connection.");
            	    }else{
            	    	var data = {appVersion:"1.0"};
            	    	$.ajax({
            	    		type : 'POST',
            	    		url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/checkversion',
            	    		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
            	    		crossDomain : true,
            	    		data : JSON.stringify(data),
            	    		dataType : 'json',
            	    		contentType: "application/json",
            	    		success : function(data){
//            	    			alert(""+data.status);
            	    			document.getElementById("loadingimg").style.display = "none";
//            	    			window.open("search.html");
            	    			window.location.replace("search.html");	//working
            	    			/*$.mobile.changePage("search.html", { transition: "slide"});*/
//            	    			alert("Status : "+data.status+"  Message : "+data.message);
            	    		},error : function(xhr) {
            	    			var jsonResponse = JSON.parse(xhr.responseText);
            	    			document.getElementById("loadingimg").style.display = "none";
            	    			alert(""+jsonResponse.message);
            	    		}
            	    	});
            	    }
            	}
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

//                alert("networkState "+networkState);

                if (networkState == 'unknown' || networkState == 'none') {
                	alert("Please check your internet connection.");
                }else{
                	var data = {appVersion:"1.0"};
                	$.ajax({
                		type : 'POST',
                		url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/checkversion',
                		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
                		crossDomain : true,
                		data : JSON.stringify(data),
                		dataType : 'json',
                		contentType: "application/json",
                		success : function(data){
//                			alert(""+data.status);
                			document.getElementById("loadingimg").style.display = "none";
//                			window.open("search.html");
                			window.location.replace("search.html");	//working
                			/*$.mobile.changePage("search.html", { transition: "slide"});*/
//                			alert("Status : "+data.status+"  Message : "+data.message);
                		},error : function(xhr) {
                			var jsonResponse = JSON.parse(xhr.responseText);
                			document.getElementById("loadingimg").style.display = "none";
                			alert(""+jsonResponse.message);
                		}
                	});
                }
            }
		}
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
            // $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

            // on Android soundname is outside the payload.
            // On Amazon FireOS all custom attributes are contained within payload
            var soundfile = e.soundname || e.payload.sound;
            // if the notification contains a soundname, play it.
            var my_media = new Media("/android_asset/www/"+ soundfile);
            my_media.play();
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {

                // $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
            }
            else
            {
                // $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
        }

        console.log("onNotification-message : "+e.payload.message);

        alert("Message message : "+e.payload.message);

       // $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
           //Only works for GCM
        alert("Message CNT : "+e.payload.msgcnt);
       // $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
       //Only works on Amazon Fire OS
       alert("Message time  : "+e.payload.timeStamp);
       // $status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
    break;

    case 'error':
    console.log("onNotification-error : "+e.msg);
        alert("Error Message :  "+e.msg);

        // $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
    break;

    default:
    console.log("onNotification - Unknown error");
        alert("Error : "+"Unknown, an event was received and we do not know what it is");

        // $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
    break;
  }
}



/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};*/
