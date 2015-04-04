$(document).ready(function(){
	
	$('.sidebar-content').hide();

	$('.sidebar-button').click(function() {
		var $sidebar = $('.sidebar-content');
		
		if ($sidebar.is(':visible')) {
			$(this).html("&#9666;");
			$(this).attr( "title", "Agregar grafico" );
			
			// Slide away
			$(this).animate({
			  right: "0px"
			}, 200);			
			
			$sidebar.animate({
			  right: "-250px"
			}, 200).fadeOut(0);
			
		}else {
			
			$(this).html("&#9656;");
			$( this ).attr( "title", "Cerrar" );
			
			// Slide in
			$(this).animate({
			  right: "250px"
			}, 200);
						
			$sidebar.animate({
			  right: "0px"
			}, 200).show();
			
		}
	});
	
});  
