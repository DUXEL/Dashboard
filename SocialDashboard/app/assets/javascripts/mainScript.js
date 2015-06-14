var ready = function() {
    $(document).on("click", ".delete-button", function () {
        //It has to make an ajax request to delete the cookie filter and then delete graph from the view.
        $(this).parent().parent().remove();
    });


    var slider = $('#charts-slider').bxSlider({
        adaptiveHeight: true,
        minSlides: 3,
        maxSlides: 3,
        slideWidth: 270,
        slideMargin: 30,
        pager:false
    });

    $(".bx-next,.bx-prev").click(function(){
        slider.reloadSlider();
    });

    $(document).on("click", ".fullscreen-button", function () {
        var $mainContent = $('.main-container');

        var childrenRow1 = $("#row-1").children();
        var childrenRow2 = $("#row-2").children();

        var graphsToLoad = [];
        var graph;

        for (i = 0; i < childrenRow1.length; i++) {
            graph = childrenRow1[i].id;
            graphsToLoad.push(graph);
        }
        for (i = 0; i < childrenRow2.length; i++) {
            graph = childrenRow2[i].id;
            graphsToLoad.push(graph);
        }

        loadGraphsToModal(graphsToLoad);
    });


    var tabContent = {
        'popular-terms-section': "<li class='active'>\
        <a href='#popular-terms-tab' data-toggle='tab'>\
            <img class='img-responsive tab-img inline' src='images/charts/cloud-chart-tabs.png' alt='Terminos populares'>\
            <h6 class='inline'>Terminos populares</h6>\
        </a>\
    </li>",

        "trends-section": "<li>\
        <a href='#tendency-tab' data-toggle='tab'>\
            <img class='img-responsive tab-img inline' src='images/charts/bubble-chart-tabs.png' alt='Terminos populares'>\
            <h6 class='inline'>Tendencias</h6>\
        </a>\
    </li>",

        'network-section': "<li>\
        <a href='#network-tab' data-toggle='tab'>\
            <img class='img-responsive tab-img inline' src='images/charts/network-tabs.png' alt='Terminos populares'>\
            <h6 class='inline'>Red</h6>\
        </a>\
    </li>",

        'density-section': "<li>\
        <a href='#density-tab' data-toggle='tab'>\
            <img class='img-responsive tab-img inline' src='images/charts/density-tabs.png' alt='Terminos populares'>\
            <h6 class='inline'>Densidad</h6>\
        </a>\
    </li>",

        'distance-section': "<li>\
        <a href='#distance-tab' data-toggle='tab'>\
            <img class='img-responsive tab-img inline' src='images/charts/distance-tabs.jpg' alt='Terminos populares'>\
            <h6 class='inline'>Distancia</h6>\
        </a>\
    </li>",

        'centrality-section': "<li>\
        <a href='#centrality-tab' data-toggle='tab'>\
            <img class='img-responsive tab-img inline' src='images/charts/centrality-tabs.png' alt='Terminos populares'>\
            <h6 class='inline'>Centralidad</h6>\
        </a>\
    </li>"
    }


    function loadGraphsToModal(graphs) {
        var $tabList = $("#tabs-for-graphs-modal");
        $tabList.empty();
        for (i = 0; i < graphs.length; i++) {
            $tabList.append(tabContent [graphs[i]]);
        }
    }


}


$(document).on('page:load', ready);
$(document).ready(ready);