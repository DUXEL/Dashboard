var ready = function(){
    // Hide sidebar when page loads.
	$('.sidebar-content').hide();

    // Control click in the sidebar button 
    // to show and hide the options(types of graphs)
	$('.sidebar-button').click(function() {
		var $sidebar = $('.sidebar-content');
		
        // Hide it when visible
		if ($sidebar.is(':visible')) {
			$("#arrow-char").html("&#9666;");
			$(this).attr( "title", "Agregar grafico" );
			
			// Slide away
			$(this).animate({
			  right: "0px"
			}, 200);			
			
			$sidebar.animate({
			  right: "-250px"
			}, 200).fadeOut(0);
			
		}else{ // Show it
			
			$("#arrow-char").html("&#9656;");
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
    
    // Event to handle when a graph's type is clicked 
    // in orden to add it to the page(main container).
    $(".graph-type").click(function (){

        var id = $(this).attr('id'); // Value holds the name of the graph for gettting the html from the graphsForIndex map.
        var value = $(this).attr('value');

        if (value=="phrase"){
            var modalName = "#main-filters";
        }else if (value=="sna"){
            var modalName = "#data-analysis-filter";
        }


        var $bigChart = $('#big-chart');
		if ( $bigChart.children().length == 0) { // Has nothing

            $.ajax({
                method: 'get',
                url: "/graph/create",
                data: {type: id, category: value},
                async: false
            }).done(function(response){
                $("#modal-container").html(response);
                $(modalName).modal('show');
            }).fail(function(jqXHR, textStatus){
                alert("Ups accion no disponible.");
            });

        }else{

        }


        
    });    
	
}

$(document).on('page:load', ready);
$(document).ready(ready);