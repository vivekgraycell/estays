document.addEventListener("deviceready", onDeviceReady, true);

var imagePath;

function onDeviceReady(){
	
	
	
	var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Arb"){
		window.location.replace("../arabic/user-profile.html");
	}else{
		var lsItem = window.localStorage.getItem("user_user_id");

		if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
			//User not login. Show error dialog.
//			alert("Unable to perform operation as user is not currently loggedIn.");
			
			window.localStorage.setItem("ProfilePage", "Yes");
			window.open("register.html");
		}else{
			//User is login. Continue login
			
			var prflImgPath = window.localStorage.getItem("profileImgPath");
			if(prflImgPath === undefined || prflImgPath === null || prflImgPath.length === 0){
				
			}else{
				var smallImage = document.getElementById('profile_image');
			    smallImage.style.display = 'block';
			    // smallImage.src = "data:image/jpeg;base64," + imageURI;
			    smallImage.src = prflImgPath;
			}
			
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
		    	var data = {appuserId:window.localStorage.getItem("user_user_id")};
			$.ajax({
				type : 'POST',
				url : 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/appUserDetail',
				beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
				crossDomain : true,
				data : JSON.stringify(data),
				dataType : 'json',
				contentType: "application/json",
				success : function(data){
//					alert(JSON.stringify(data));
					$.each(data.userdetail, function(index, userdetail) {
						document.getElementById("up_first_name").innerHTML = userdetail.username;
//						document.getElementById("up_last_name").innerHTML = "";
						document.getElementById("up_email_id").innerHTML = userdetail.useremail;
						document.getElementById("up_phone_number").innerHTML = userdetail.usermobile;
						
						document.getElementById("up_country_name").innerHTML = userdetail.userCountry;
						
						//Profile image
						//userdetail.userimage;
						var smallImage = document.getElementById('profile_image');
					    smallImage.style.display = 'block';
					    smallImage.src = userdetail.userimage;
					    
					    $('#profile_image')
						.error(function(){
							document.getElementById("profile_image").src = '../../img/no_image.jpg';
						});
						
					});
					
					document.getElementById("loadingimg").style.display = "none";
				},error : function(xhr) {
					var jsonResponse = JSON.parse(xhr.responseText);
					document.getElementById("loadingimg").style.display = "none";
					alert(""+jsonResponse.message);
				}
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

function opensearchfoot(){
//	window.location.replace("search.html");
	window.open("search.html");
}

function openbookingfoot(){
//	window.location.replace("bookings.html");
	window.open("bookings.html");
}

function editprofilepage(){
	window.open("edit-user-profile.html");
}

function notificationFoot(){
	window.open("user-bid.html");
}

function backButton(){
    navigator.app.backHistory();
}

function changeLanguageBtn(){
	if(confirm("Change language to Arabic.") == true){
		//Ok button clicked.
		window.localStorage.setItem("selectedLanguage", "Arb");
		window.location.replace("../arabic/user-profile.html");
	}else{
		//Cancel button clicked.
	}
}

function logoutUser(){
	var lsItem = window.localStorage.getItem("user_user_id");

	if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
		//User not login. Show error dialog.
//		alert("Unable to perform operation as user is not currently loggedIn.");
		window.localStorage.setItem("ProfilePage", "Yes");
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
					document.getElementById("logoutbtn").innerHTML = "Login";
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

function selectImage(){
    navigator.camera.getPicture(onSuccess, onFailure, {
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
}

function onSuccess(imageURI) {
	//Testing code starts
	
	imagePath = imageURI;
	
	var options = new FileUploadOptions();
	options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";
    
    /*var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;*/
    
    options.params = {
    		appuserId: window.localStorage.getItem("user_user_id"),
    		appuserImage: imageURI.substr(imageURI.lastIndexOf('/')+1)
        }
    
    options.chunkedMode = false;

    var ft = new FileTransfer();
    
    ft.onprogress = function(progressEvent) {
    	document.getElementById("image_progress").style.display = 'block';
		if (progressEvent.lengthComputable) {
			var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
			document.getElementById("image_progress").style.width = perc +'px';
//			statusDom.innerHTML = perc + "% loaded...";
		} else {
		}
	};
    
	ft.upload(imageURI, "http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/updateUserImage", win, fail, options);
    
    
	//code ends

    

    /*var canvas = document.createElement('canvas');
    canvas.id = "CursorLayer";
    canvas.width = 180;
    canvas.height = 180;

    canvas.style.position = "absolute";

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);

    var c = document.getElementById("CursorLayer");
    var ctx = c.getContext("2d");
    ctx.drawImage(smallImage, 10, 10);

    alert(""+c.toDataURL());

    document.getElementById("img_fname").value =  ""+c.toDataURL();
    window.localStorage.setItem("profile_pic", ""+c.toDataURL());*/

}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    //alert("Response =" + r.response);
    console.log("Sent = " + r.bytesSent);
    
    var image_progress = document.getElementById("image_progress");
    image_progress.style.display = 'none';
    
    var smallImage = document.getElementById('profile_image');
    smallImage.style.display = 'block';
    // smallImage.src = "data:image/jpeg;base64," + imageURI;
    smallImage.src = imagePath;
    
    window.localStorage.setItem("profileImgPath", smallImage.src);
    
    var jsonResponse = JSON.parse(r.response);
    
    alert(jsonResponse.message);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

function onFailure(message) {
	alert(message);
}