$(document).ready(function() {
	 $('.navbtn').click(function() {
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('.navOuter').animate({right:-250},1000);	
		}
		else{
			$(this).addClass('active');	
			$('.navOuter').animate({right:0},1000);
		}
	});
});	
    
	
function checkbidstatus(){
	window.open("checkbidstatus.html");
}
