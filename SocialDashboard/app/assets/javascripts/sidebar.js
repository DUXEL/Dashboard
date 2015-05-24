$(document).ready(function(){

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

    // Arrays that holds html for adding 
    // the graphs to the index page.
    var graphsForIndex = { 
        'popularTerms':
"<div class='col-md-4 box-container' id='popular-terms-section'>\
    <h4>Terminos populares</h4>\
    <a>\
        <section class='chart-container' >\
            <img class='img-responsive popular-terms-img' src='images/charts/popular-terms.png' alt=''>\
            <a href='#' class='delete-button' id='delete-popular-terms'></a>\
            <a href='#' class='settings-button' id='configure-popular-terms' data-toggle='modal' data-target='#main-filters'></a>\
            <a href='#' class='fullscreen-button' id='fullscreen-popular-terms' data-toggle='modal' ></a>\             </section>\
    </a>\
</div>",
        
        
        'trends':
"<div class='col-md-4 box-container' id='trends-section'>\
    <h4>Tendencias</h4>\
    <a>\
        <section class='chart-container' >\
            <img class='img-responsive trending-topics-img' src='images/charts/trending-topics.png' alt=''>\
            <a href='#' class='delete-button' id='delete-popular-terms'></a>\
            <a href='#' class='settings-button' id='configure-popular-terms' data-toggle='modal' data-target='#main-filters'></a>\
            <a href='#' class='fullscreen-button' id='fullscreen-tendencies' data-toggle='modal' data-target='#fullscreen-modal'></a>\             </section>\
    </a>\
</div>",
        
        
        'network':
"<div class='col-md-4 box-container' id='network-section'>\
    <h4>Red</h4>\
    <a>\
        <section class='chart-container'>\
            <img class='img-responsive popular-terms-img' src='images/charts/network.png' alt=''>\
            <a href='#' class='delete-button' id='delete-popular-terms'></a>\
            <a href='#' class='settings-button' id='configure-popular-terms' data-toggle='modal' data-target='#data-analysis-filter'></a>\
            <a href='#' class='fullscreen-button' id='fullscreen-network' data-toggle='modal' data-target='#fullscreen-modal'></a>\
        </section>\
    </a>\
</div>",
        
        
        'density':
"<div class='col-md-4 box-container' id='density-section'>\
    <h4>Densidad</h4>\
    <a>\
        <section class='chart-container' >\
            <img class='img-responsive popular-terms-img' src='images/charts/density.png' alt=''>\
            <a href='#' class='delete-button' id='delete-popular-terms'></a>\
            <a href='#' class='settings-button' id='configure-popular-terms' data-toggle='modal' data-target='#data-analysis-filter'></a>\                 <a href='#' class='fullscreen-button' id='fullscreen-density' data-toggle='modal' data-target='#fullscreen-modal'></a>\
        </section>\
    </a>\
</div>",
        
        
        'distance':
"<div class='col-md-4 box-container' id='distance-section'>\
    <h4>Distancia</h4>\
    <a>\
        <section class='chart-container' >\
            <img class='img-responsive popular-terms-img' src='images/charts/distance.jpg' alt=''>\
            <a href='#' class='delete-button' id='delete-popular-terms'></a>\
            <a href='#' class='settings-button' id='configure-popular-terms' data-toggle='modal' data-target='#distance-filter'></a>\                     <a href='#' class='fullscreen-button' id='fullscreen-distance' data-toggle='modal' data-target='#fullscreen-modal'></a>\                </section>\
    </a>\
</div>",
        
        'centrality': 
"<div class='col-md-4 box-container' id='centrality-section'> \
    <h4>Centralidad</h4> \
    <a> \
        <section class='chart-container' >\
            <img class='img-responsive popular-terms-img' src='images/charts/centrality.png' alt=''>\
            <a href='#' class='delete-button' id='delete-popular-terms'></a>\
            <a href='#' class='settings-button' id='configure-popular-terms' data-toggle='modal' data-target='#data-analysis-filter'></a>\         <a href='#' class='fullscreen-button' id='fullscreen-centrality' data-toggle='modal' data-target='#fullscreen-modal'></a>\
        </section>\
    </a>\
</div>"
        
    };
    
    
    // Event to handle when a graph's type is clicked 
    // in orden to add it to the page(main container).
    $(".graph-type").click(function (){
        var value = $(this).attr('value'); // Value holds the name of the graph for gettting the html from the graphsForIndex map.
        var graph = graphsForIndex[value];
        
        var $mainContent = $('.main-container');
        
		if ( $('.main-container').children().length == 0) { // Has nothing
            $mainContent.html("<div class='row' id='row-1'></div> <div class='row' id='row-2'></div>");
            $mainContent.css("background-image","none");
        }
        var cntChildrenRow1 = $("#row-1").children().length;
        var cntChildrenRow2 = $("#row-2").children().length;
        
        if (cntChildrenRow1<3){ // Max 3 graphs per row.
            $("#row-1").append(graph);
        }else if(cntChildrenRow2<3){
            $("#row-2").append(graph);
        }
        
    });    
	
});


