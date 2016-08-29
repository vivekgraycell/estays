document.addEventListener("deviceready", onDeviceReady, true);

var todaysDate, tomorowDate, checkInSelDate, checkOutSelDate; 

function onDeviceReady(){
	
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
	
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	
	//Testing purpose
	var yesterdayDate = new Date();
	yesterdayDate.setDate(currentDate.getDate()-1);
	
	todaysDate = yesterdayDate;
	
//	if(month == 1){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" Jan";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}else if(month == 2){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" Feb";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}else if(month == 3){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" March";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}else if(month == 4){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" Apr";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}else if(month == 5){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" May";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}else if(month == 6){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" June";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}else if(month == 7){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" July";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}else if(month == 8){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" Aug";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}else if(month == 9){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" Sep";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}else if(month == 10){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" Oct";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}else if(month == 11){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" Nov";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}else if(month == 12){
//		document.getElementById("check_in_dt_mth").innerHTML = " "+day+" Dec";
//		document.getElementById("check_in_dt_yr").innerHTML = " "+year;
//	}
	
//	window.localStorage.setItem("checkInDatePick", day+"/"+month+"/"+year); 
	
	var tomorrow = new Date();
	tomorrow.setDate(currentDate.getDate()+1);
	
	tomorowDate = tomorrow; 
	
	var tomDay = tomorrow.getDate();
	var tomMonth = tomorrow.getMonth() + 1;
	var tomYear = tomorrow.getFullYear();
	
//	if(tomMonth == 1){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" Jan";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}else if(tomMonth == 2){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" Feb";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}else if(tomMonth == 3){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" March";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}else if(tomMonth == 4){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" Apr";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}else if(tomMonth == 5){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" May";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}else if(tomMonth == 6){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" June";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}else if(tomMonth == 7){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" July";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}else if(tomMonth == 8){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" Aug";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}else if(tomMonth == 9){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" Sep";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}else if(tomMonth == 10){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" Oct";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}else if(tomMonth == 11){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" Nov";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}else if(tomMonth == 12){
//		document.getElementById("check_out_dt_mth").innerHTML = " "+tomDay+" Dec";
//		document.getElementById("check_out_dt_yr").innerHTML = " "+tomYear;
//	}
	
//	window.localStorage.setItem("checkOutDatePick", tomDay+"/"+tomMonth+"/"+tomYear);
	
	
var selectedLng = window.localStorage.getItem("selectedLanguage");
	
	if (selectedLng == "Eng"){
		window.location.replace("../english/search.html");
	}else{
//		fetchCountryList();
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
	    	fetchroomType();
	    }
		
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

function selecthoteltype(){
//	var checkInDateVal = window.localStorage.getItem("checkInDatePick");
//	var checkOutDateVal = window.localStorage.getItem("country_name");
	
	var roomTypeSelted = window.localStorage.getItem("selroomid");
	
	var spin_country_list = document.getElementById("spinner_country_list");
    var address = spin_country_list.options[spin_country_list.selectedIndex].text;
    
    /*var currDateRaw = window.localStorage.getItem("current_date_raw");
	var nextDateRaw = window.localStorage.getItem("next_date_raw");*/
    
    var chckInDt = window.localStorage.getItem("checkInDatePick");
    var chckOutDt = window.localStorage.getItem("checkOutDatePick");
	
	if(document.getElementById("ci_country_city").value == ""){
		alert("Please select city you are visiting.");
	}else if(document.getElementById("et_room_required").value == ""){
		alert("Please enter rooms required.");
	}else if(address == ""){
		alert("Please select country.");
	}else if(roomTypeSelted === undefined || roomTypeSelted === null || roomTypeSelted.length === 0){
		alert("Please select room type.");
	}else if(chckInDt === undefined || chckInDt === null || chckInDt.length === 0){
		alert("Please select check-in date");
	}else if(chckOutDt === undefined || chckOutDt === null || chckOutDt.length === 0){
		alert("Please select check-out date");
	}else{
		var spin_country_list = document.getElementById("spinner_country_list");
		window.localStorage.setItem("sel_country_id_text", ""+spin_country_list.options[spin_country_list.selectedIndex].id);
		
		
		window.localStorage.setItem("countryVisiting", address);
		window.localStorage.setItem("cityVisiting", document.getElementById("ci_country_city").innerHTML);
		window.localStorage.setItem("roomRequired", document.getElementById("et_room_required").value);
		window.open("select-hotel-test.html");
	}
	
	
}

function checkInDatePick(){
	var options = {
			date: new Date(),
			mode: 'date',
			allowFutureDates:true,
			titleText :'',
			todayText: '',
			androidTheme: window.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
				};

			datePicker.show(options, function(date){
				
				/*var currDateVal = window.localStorage.getItem("current_date_raw");
				var dummyDate = window.localStorage.setItem("dummy_date", date);
				var fthDummyDate = window.localStorage.getItem("dummy_date");
				
				if(fthDummyDate < currDateVal){
					alert("Check-In date cannot be before today's date.");
				}else{*/
				
				checkInSelDate = date;
				
				console.log("todaysDate : "+ todaysDate+"  checkInSelDate : "+checkInSelDate);
				
				if(checkInSelDate > todaysDate){
				
				var selectedMnth = date.getMonth() + 1;
				if(selectedMnth == 1){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Jan";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 2){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Feb";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 3){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" March";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 4){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Apr";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 5){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" May";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 6){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" June";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 7){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" July";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 8){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Aug";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 9){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Sep";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 10){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Oct";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 11){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Nov";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 12){
					document.getElementById("check_in_dt_mth").innerHTML = " "+date.getDate()+" Dec";
					document.getElementById("check_in_dt_yr").innerHTML = " "+date.getFullYear();
				}
				
				
				
				window.localStorage.setItem("checkInDatePick", date.getDate()+"/"+selectedMnth+"/"+date.getFullYear());
				}else{
					alert("Check-In date cannot be before today's date.");
				}
			});
}

function checkOutDatePick(){
	var isCheckInDate = window.localStorage.getItem("checkInDatePick");
	if(isCheckInDate === undefined || isCheckInDate === null || isCheckInDate.length === 0){
		alert("Check-out date cannot be selected before check-in date");
	}else{
	var options = {
			date: new Date(),
			mode: 'date',
			allowFutureDates:true,
			titleText :'',
			todayText: '',
			androidTheme: window.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
				};

			datePicker.show(options, function(date){
				
				/*window.localStorage.setItem("next_date_raw", date);
				
				var currDateRaw = window.localStorage.getItem("current_date_raw");
				var nextDateRaw = window.localStorage.getItem("next_date_raw");
				
				if(nextDateRaw < currDateRaw){
					alert("Checkout date cannot be before Check-In date.");
				}else{
				}*/
				checkOutSelDate = date;
				
				if(checkOutSelDate > checkInSelDate){
				var selectedMnth = date.getMonth() + 1;
				if(selectedMnth == 1){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Jan";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 2){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Feb";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 3){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" March";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 4){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Apr";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 5){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" May";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 6){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" June";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 7){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" July";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 8){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Aug";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 9){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Sep";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 10){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Oct";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 11){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Nov";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}else if(selectedMnth == 12){
					document.getElementById("check_out_dt_mth").innerHTML = " "+date.getDate()+" Dec";
					document.getElementById("check_out_dt_yr").innerHTML = " "+date.getFullYear();
				}
				
				
				
				window.localStorage.setItem("checkOutDatePick", date.getDate()+"/"+selectedMnth+"/"+date.getFullYear());
				}else{
					alert("Check-out date cannot be before check-in date");
				}
//				}
			});
	}
}

function fetchroomType(){
	$.ajax({
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/roomtype',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
//		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		contentType: "application/json",
		data: '{}',
		dataType: "json",
		success: function(val) {
			
			for (var i = 0; i < val.roomTYpeList.length; i++){

//				$('#room_type_spinner').append("<option value='" + val.roomTYpeList[i].roomCategoryArab +"' text='" + val.roomTYpeList[i].geoId + "'>"+val.roomTYpeList[i].roomCategoryArab+"</option>");
				$('#room_type_spinner').append("<option id='"+ val.roomTYpeList[i].roomCatId +"' value='" + val.roomTYpeList[i].roomCategoryArab +"' text='" + val.roomTYpeList[i].roomCatId + "'>"+val.roomTYpeList[i].roomCategoryArab+"</option>");
				}
			
			var spin_room_list1 = document.getElementById("room_type_spinner");
            var roomCat1 = spin_room_list1.options[spin_room_list1.selectedIndex].value;
            var roomId1 = spin_room_list1.options[spin_room_list1.selectedIndex].id;
            
            console.log("selroomid : "+roomId1);
			console.log("selroomcat : "+roomCat1);
			
			window.localStorage.setItem("selroomid", roomId1);
			window.localStorage.setItem("selroomcat", roomCat1);
			
			
			$("#room_type_spinner").change(function() {
				var spin_room_list = document.getElementById("room_type_spinner");
	            var roomCat = spin_room_list.options[spin_room_list.selectedIndex].value;
	            var roomId = spin_room_list.options[spin_room_list.selectedIndex].id;
	            
	            console.log("selroomid : "+roomId);
				console.log("selroomcat : "+roomCat);
				
				window.localStorage.setItem("selroomid", roomId);
				window.localStorage.setItem("selroomcat", roomCat);
		    });
			
			/*var wrapper_div = $("#rrbtns");
			var radioBtnDiv = document.getElementById("rrbtns");
			
			for (var i = 0; i < val.roomTYpeList.length; i++){
				var roomTypeL = val.roomTYpeList[i];
				
				var mainDiv = document.createElement("div");
				mainDiv.className = "radioButton1";
				
				var label = document.createElement("label");
			    var radio = document.createElement("input");
			    radio.type = "radio";
			    radio.className = "roomtyperdbtn";
			    //radio.className = "radioButtons";
			    radio.id = roomTypeL.roomCatId;
			    radio.name = "radio_btn";
			    radio.value = roomTypeL.roomCategoryArab;

			    label.appendChild(radio);	//Working

			    label.appendChild(document.createTextNode(roomTypeL.roomCategory));	//Working
			    
			    mainDiv.appendChild(radio);
			    mainDiv.appendChild(label);
//			    radioBtnDiv.appendChild(label);	//Working
			    radioBtnDiv.appendChild(mainDiv);
			}*/
			
			/*$(".roomtyperdbtn").click(function(){
				$('.roomtyperdbtn').prop('checked', false);
				$(this).prop('checked', true);
				var selroomid = $(this).attr('id');
				var selroomcat = $(this).attr('value');
				
				console.log("selroomid : "+selroomid);
				console.log("selroomcat : "+selroomcat);
				
				window.localStorage.setItem("selroomid", $(this).attr('id'));
				window.localStorage.setItem("selroomcat", $(this).attr('value'));
			});*/
			document.getElementById("loadingimg").style.display = "none";
		},
		error: function(xhr, status, error) { 
			document.getElementById("loadingimg").style.display = "none";
			alert('Error !!'); 
		},
		async: true,
		cache: false
	});
}

//function fetchroomType(){
//	$.ajax({
//		type: 'GET',
//		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/roomtype',
//		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
////		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
//		crossDomain: true,
//		contentType: "application/json",
//		data: '{}',
//		dataType: "json",
//		success: function(val) {
//			
//			var wrapper_div = $("#rrbtns");
//			
//var radioBtnDiv = document.getElementById("rrbtns");
//			
//			for (var i = 0; i < val.roomTYpeList.length; i++){
//				var roomTypeL = val.roomTYpeList[i];
//				
//				var mainDiv = document.createElement("div");
//				mainDiv.className = "radioButton1";
//				
//				var label = document.createElement("label");
//			    var radio = document.createElement("input");
//			    radio.type = "radio";
//			    radio.className = "roomtyperdbtn";
//			    //radio.className = "radioButtons";
//			    radio.id = roomTypeL.roomCatId;
//			    radio.name = "radio_btn";
//			    radio.value = roomTypeL.roomCategoryArab;
//
//			    label.appendChild(radio);	//Working
//
//			    label.appendChild(document.createTextNode(roomTypeL.roomCategory));	//Working
//			    
//			    mainDiv.appendChild(radio);
//			    mainDiv.appendChild(label);
////			    radioBtnDiv.appendChild(label);	//Working
//			    radioBtnDiv.appendChild(mainDiv);
//			}
//			/*for (var i = 0; i < val.roomTYpeList.length; i++){
//				var roomTypeL = val.roomTYpeList[i];
//				// alert(""+roomTypeL.roomCategory);
//				$(wrapper_div).append("<div class='radioButtons'>" + " <input type='radio' class='roomtyperdbtn' id = '"+roomTypeL.roomCatId+"' name='"+roomTypeL.roomCategoryArab+"' /><label for= '"+roomTypeL.roomCatId+"'><span></span>"+roomTypeL.roomCategoryArab+"</label></div>");
//			}*/
//			
//			$(".roomtyperdbtn").click(function(){
//				$('.roomtyperdbtn').prop('checked', false);
//				$(this).prop('checked', true);
//				var selroomid = $(this).attr('id');
//				var selroomcat = $(this).attr('value');
//				
//				console.log("selroomid : "+selroomid);
//				console.log("selroomcat : "+selroomcat);
//				
//				window.localStorage.setItem("selroomid", $(this).attr('id'));
//				window.localStorage.setItem("selroomcat", $(this).attr('value'));
//			});
//			
//			/*$(".roomtyperdbtn").on("click", function(){
//				$('.roomtyperdbtn').prop('checked', false);
//				$(this).prop('checked', true);
//				var selroomid = $(this).attr('id');
//				var selroomcat = $(this).attr('name');
//				
//				console.log("selroomid : "+selroomid);
//				console.log("selroomcat : "+selroomcat);
//				
//				window.localStorage.setItem("selroomid", $(this).attr('id'));
//				window.localStorage.setItem("selroomcat", $(this).attr('name'));
//			});*/
//			document.getElementById("loadingimg").style.display = "none";
//			
////			document.getElementById("loadingimg").style.display = "none";
//
////			hotelTypeRqst();
//		},
//		error: function(xhr, status, error) { 
//			document.getElementById("loadingimg").style.display = "none";
////			document.getElementById("loadingimg").style.display = "none";
//			alert('Error !!'); 
//		},
//		async: true,
//		cache: false
//	});
//}

function fetchCountryList(){
	$.ajax({
//		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		type: 'GET',
		url: 'http://myprojectdemonstration.com/development/estays/demo/api/mobileapi/countriesListing',
		beforeSend: function(){document.getElementById("loadingimg").style.display = "block";},
		crossDomain: true,
		contentType: "application/json",
		data: '{}',
		dataType: "json",
		success: function(val) {
			for (var i = 0; i < val.countriesList.length; i++){
				var countryName = val.countriesList[i].countryName;

				/*$("#spinner_country_list").append($('<option>', {
					value:val.countriesList[i].countryId,
					text: val.countriesList[i].countryName
				}));*/

				$('#spinner_country_list').append("<option value='" + val.countriesList[i].geoName +"' text='" + val.countriesList[i].geoId + "'>"+val.countriesList[i].geoName+"</option>");

				// countryarr.push(val.countriesList[i].countryName);	// adding items in string array
			}
			document.getElementById("loadingimg").style.display = "none";
//			document.getElementById("loadingimg").style.display = "none";

			//displaying string array length
//			alert("country arr length : "+ countryarr.length);


			/*
			$("input[name=countriesls]").focusout(function(){
            //alert($(this).text);
            var opt = $('option[value="'+$(this).val()+'"]');
            if (opt.length > 0) {
                window.localStorage.setItem("sel_country_id_text)", opt.attr('text'));
                alert(""+opt.attr('text'));
            }*/
            
            // alert(opt.length ? opt.attr('text') : '0');
        // });
			/*$( "#ci_country_visiting" ).autocomplete({
				source: countryarr
			});*/
		},
		error: function(xhr) { 
//			document.getElementById("loadingimg").style.display = "none";
			var jsonResponse = JSON.parse(xhr.responseText);
			document.getElementById("loadingimg").style.display = "none";
			alert(""+jsonResponse.message);
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
		window.location.replace("../english/search.html");
	}else{
		//Cancel button clicked.
	}
}

function logoutUser(){
	var lsItem = window.localStorage.getItem("user_user_id");

	if (lsItem === undefined || lsItem === null || lsItem.length === 0) {
		//User not login. Show error dialog.
//		alert("Unable to perform operation as user is not currently loggedIn.");
		window.localStorage.setItem("SearchPage", "Yes");
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

