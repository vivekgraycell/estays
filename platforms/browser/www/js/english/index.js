var pushNotification;
document.addEventListener("deviceready", onDeviceReady, true);

function onDeviceReady(){
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
    	//Registering for push notifications
        // $("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
        if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" || device.platform == "browser" ){
            console.log("registering android/amazon_os for GCM");
			dtype = window.localStorage.getItem("user_device_type");
			if (dtype === undefined || dtype === null || dtype.length === 0) {
				window.localStorage.setItem("user_device_type", "android");
				//initPushService();
			}
			process();
            /*pushNotification.register(
                successHandler,
                errorHandler,
                {
//                    "senderID":"1086878016237",
                	"senderID":"6747841157",
                    "ecb":"onNotification"
                });
				*/
        } else {
            console.log("registering ios app from APNS");
			dtype = window.localStorage.getItem("user_device_type");
			if (dtype === undefined || dtype === null || dtype.length === 0) {			
				window.localStorage.setItem("user_device_type", "ios");
				//initPushService();
			}
			process();
           /* pushNotification.register(
                tokenHandler,
                errorHandler,
                {
                    "badge":"true",
                    "sound":"true",
                    "alert":"true",
                    "ecb":"onNotificationAPN"
                });*/
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

function initPushService(){
	var push = PushNotification.init({
				android: {
					senderID: "6747841157"
				},
				browser: {
					pushServiceURL: 'http://push.api.phonegap.com/v1/push'
				},
				ios: {
					alert: "true",
					badge: "true",
					sound: "true"
				}
			});

	push.on('registration', function(response) {
		onNotification(response);
	});

	push.on('notification', function(data) {
		//handlePushNotification(data)
	});

	push.on('error', function(e) {
		// e.message
		console.log("Push Error: " + e);
	});

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
                                       
                                       navigator.notification.alert(
                                                                    ""+jsonResponse.message,  // message
                                                                    function(){},         // callback
                                                                    'Alert',            // title
                                                                    'OK'                  // buttonName
                                                                    );
                                       
                                       
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
                                       navigator.notification.alert(
                                                                    ""+jsonResponse.message,  // message
                                                                    function(){},         // callback
                                                                    'Alert',            // title
                                                                    'OK'                  // buttonName
                                                                    );
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
//            	    			window.open("htmlfile/english/search.html");
            	    			window.location.replace("htmlfile/english/search.html");	//working
            	    			/*$.mobile.changePage("htmlfile/english/search.html", { transition: "slide"});*/
//            	    			alert("Status : "+data.status+"  Message : "+data.message);
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
//    				Array contains less than 100 items
						networkState = checkConnection();
						if (networkState == 'No network connection') {
                                                navigator.notification.alert(
                                                                             "Please check your internet connection.",  // message
                                                                             function(){},         // callback
                                                                             'Alert',            // title
                                                                             'OK'                  // buttonName
                                                                             );
                                                
                                                
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
                               navigator.notification.alert(
                                                            ""+jsonResponse.message,  // message
                                                            function(){},         // callback
                                                            'Alert',            // title
                                                            'OK'                  // buttonName
                                                            );
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
//              				window.open("htmlfile/english/search.html");
                    			window.location.replace("htmlfile/english/search.html");	//working
                    			/*$.mobile.changePage("htmlfile/english/search.html", { transition: "slide"});*/
//                    			alert("Status : "+data.status+"  Message : "+data.message);
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
    			}
    		}, function(error){
                                                navigator.notification.alert(
                                                                             ""+error,  // message
                                                                             function(){},         // callback
                                                                             'Alert',            // title
                                                                             'OK'                  // buttonName
                                                                             );
    		});
    	}else{
    		//Cancel button clicked.
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
//    	    			window.open("htmlfile/english/search.html");
    	    			window.location.replace("htmlfile/english/search.html");	//working
    	    			/*$.mobile.changePage("htmlfile/english/search.html", { transition: "slide"});*/
//    	    			alert("Status : "+data.status+"  Message : "+data.message);
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
    	}
    }else{
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
//        			window.open("htmlfile/english/search.html");
        			window.location.replace("htmlfile/english/search.html");	//working
        			/*$.mobile.changePage("htmlfile/english/search.html", { transition: "slide"});*/
//        			alert("Status : "+data.status+"  Message : "+data.message);
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
  
    navigator.notification.alert(
                                 'GCM Error : ' + error,  // message
                                 function(){},         // callback
                                 'Alert',            // title
                                 'OK'                  // buttonName
                                 );
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
	if (e.registrationId === undefined || e.registrationId === null || e.registrationId.length === 0) {
		//do nothing
	}
	else{
		window.localStorage.setItem("user_device_Id", ""+e.regid);
	}
}


function process(){
	window.localStorage.setItem("user_device_Id", ""+device.uuid);
	lsItem = window.localStorage.getItem("user_contact_uploaded");
	allowContacts = window.localStorage.getItem("user_contact_allow");
	if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
		if (allowContacts === undefined || allowContacts === null || allowContacts.length === 0) {
            
            navigator.notification.confirm(
                                           'Application require to access phone contacts',  // message
                                           function(buttonIndex){
                                           switch (buttonIndex)
                                           {
                                           case 2:
                                           
                                           window.localStorage.setItem("user_contact_allow", 0);
                                           checkappversion();
                                           
                                           break;
                                           case 1:
                                           
                                           window.localStorage.setItem("user_contact_allow", 1);
                                           fetchcontact();
                                           checkappversion();
                                           
                                           break;
                                           
                                           }
                                           
                                           },         // callback
                                           'Alert',            // title
                                           ['Confirm'  ,'Cancel']
                                           // buttonName
                                           );
		}
		else{
			if(allowContacts == 1){
				fetchcontact();
				checkappversion();
				
			}else{
				checkappversion();
			}
		}
	}else{
			checkappversion();
	}	
}

//fetch and sync contacts
function fetchcontact(){
		navigator.contactsPhoneNumbers.list(function(contacts){
		//alert("Contacts found : "+contacts.length);
		var contactArray = [];
		for(var i = 0; i < contacts.length; i++){            				
		  // alert("Display name  : "+contacts[i].displayName);
			for(var j = 0; j < contacts[i].phoneNumbers.length; j++){
				var phone = contacts[i].phoneNumbers[j];
				//alert("Phone number : "+phone.number +" "+ " NormalizedNumber : "+ phone.normalizedNumber);
				contactArray.push(contacts[i].displayName + " : "+phone.normalizedNumber);
			}
		}
		if(contactArray.length > 100){
				//Array contain more than 100 items
				var arrCreated = contactArray.length / 100;
				//noprotect
				for(j =0; j < arrCreated; j++){
					if(window.localStorage.getItem("firstTime") === null){
						var nArr1 = contactArray.slice(j, j * 100);
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
							document.getElementById("loadingimg").style.display = "none";
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
					}else{
						var nArr = contactArray.slice(0, 100);
						window.localStorage.setItem("firstTime", 1);
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
								document.getElementById("loadingimg").style.display = "none";
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
				}
				
				window.localStorage.setItem("user_contact_uploaded", "added");

		}
		else{
		// Array contains less than 100 items
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
							document.getElementById("loadingimg").style.display = "none";
							window.localStorage.setItem("user_contact_uploaded", "added");
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
		}, function(error){
                                            navigator.notification.alert(
                                                                         ""+ error,  // message
                                                                         function(){},         // callback
                                                                         'Alert',            // title
                                                                         'OK'                  // buttonName
                                                                         );
		});	
	
}

// Check app version
function checkappversion(){
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
			document.getElementById("loadingimg").style.display = "none";
			window.location.replace("htmlfile/english/search.html");	//working
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
