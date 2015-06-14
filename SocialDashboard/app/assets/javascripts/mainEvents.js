var deleteAllFilters;
var ready = function() {

    var chartObjects = {};

    var $mainChart = $("#main-chart");
    var displayChartHash = {
        trends: function(object) {
          displayBubbleChart(fillWordCloudList(object), "#main-chart");
        },
        popular_terms: function(object) {
            displayWordCloud(object, "#main-chart");
        },
        density: function(object) {
            displayGraphChart("Densidad", object);
        },
        distance: function(object) {
            displayGraphChart("Distancia", object);
        },
        centrality: function(object) {
            displayGraphChart("Centralidad", object);
        },
        network: function(object) {
            displayGraphChart("", object);
        }
    };


    function displayGraphChart(type, object) {
        displayGraph(object.graph, "#main-chart");
        $mainChart.prepend("<h3 class='chart-info'>"+type+"  "+object.value+"</h3>");
    }

    $("#sna-filter-apply").click(function(){
        var socialNetwork = $('#social-network .active input').val();
        var depthLevel = $('#depth-level .active input').val();
        var filterUser = $('#filter-user-input').val();
        if (filterUser == "") return;
        var method;
        var currentFilterKey = $("#filter-key").val();
        if ($(this).val() == "new-filter"){
            method = "post";
        }else{
            method = "put";
        }
        $('#loadingDiv').show();
        $.ajax({
            method: method,
            url: '/filters',
            data: {type: chartInfo[1], filter_type:chartInfo[0], user: filterUser, social_network: socialNetwork, depth_level: depthLevel, filter_key: currentFilterKey}
        }).done(function(filterKey){
            console.log(filterKey);
            $.ajax({
                method: "post",
                url: '/charts',
                data: {type: chartInfo[1], key: filterKey},
                async: 'false'
            }).done(function(response){
                displayChart(chartInfo[0], chartInfo[1], response, filterKey);
            });
        });
        $('#data-analysis-filter').modal('hide');
    });



    $("#phrases-filter-apply").click(function() {
        var selectedRegions = $("#vmap").vectorMap("getSelectedRegions");
        var requestData = [];
        var language = $('#language-input').val();
        console.log(language);
        console.log(languages[language]);
        language = languages[language];
        if (selectedRegions.length==0) return;
        for (i in selectedRegions){
            var c = countries[selectedRegions[i]];
            requestData.push(c);
        }
        //startTime, finishTime are defined in filter.js
        var start = undefined;
        var finish = undefined;
        if (startTime.date() != null && finishTime.date() != null){
            start =startTime.date().format("YYYY-MM-DD");
            finish = finishTime.date().format("YYYY-MM-DD");
        }
        var method;
        var currentFilterKey = $("#filter-key").val();
        if ($(this).val() == "new-filter"){
            method = "post";
        }else{
            method = "put";
        }
        $('#loadingDiv').show();
        $.ajax({
            method: method,
            url: '/filters',
            data: {countries: requestData, language:language ,start_time:start, end_time: finish, filter_type:chartInfo[0], filter_key: currentFilterKey},
            async: 'false'
        }).done(function(filterKey){
            $.ajax({
                method: "post",
                url: '/charts',
                data: {type: chartInfo[1], key: filterKey},
                async: 'false'
            }).success(function(response){
                displayChart(chartInfo[0], chartInfo[1], response, filterKey);
            });
        });
        $("#main-filters").modal("hide");
    });

    var displayChart = function(specificType, type, jsonObject, filterKey) {
        if($mainChart.html() == "") {
            $mainChart.attr('type', type);
            $mainChart.attr('specific-type', specificType);
            var chartId = 'chart-'+filterKey;
            $mainChart.attr('chart-id', chartId);
            displayChartHash[type](jsonObject);

        }
        $('#loadingDiv').hide();
    }


    var availableDiv = function() {
       for(var i = 1; i < 5; i++) {
           var divHTML = $('#div'+i).html();
           if(divHTML == "") return '#div'+i;
       }
    }

    var getFirstChartDiv = function() {
        for(var i = 1; i < 5; i++) {
            var divHTML = $('#div'+i).html();
            if(divHTML != "") return '#div'+i;
        }
        return -1;
    }




    $('body').on("click",".close-button", function() {
        $('.node-info').css('display','none');
    });

    var availableFilters = function(){
        for (var i = 1; i<7 ; i++){
            $.ajax({method: 'get', url: '/filters/filter'+i+'/edit', async: false}).done(function (response) {
                //console.log(response);
                if (response != null){
                    $('main').prepend('<button class= "btn btn-default edit-filter" id="filter'+i+'">filter'+i+'</button>');
                }
            });
        }
    }

    $("#delete-all-charts").click(function() {
        for (var i =1; i<7;i++){
            $.ajax({method: 'delete',url:'/filters/filter'+i,async:false}).done(function(response){console.log(response)});
        }
        $mainChart.html("");
        for(var i = 1; i < 5; i++) {
            $("#div"+i).html("");
        }
    });


    deleteAllFilters = function(){
        for (var i =1; i<7;i++){
            $.ajax({method: 'delete',url:'/filters/filter'+i,async:false}).done(function(response){console.log(response)});
        }
    };

    availableFilters();

    var loadPhraseFilter = function(response){
        $('#filters-btn-clear').click();
        startTime.date(moment(response.start_date));
        finishTime.date(moment(response.end_date));
        var country_list = response.country_list;
        for (i in country_list){
            for (key in countries){
                if (countries[key].name == country_list[i].name){
                    $("#vmap").vectorMap('select', key);
                }
            }
        }
        for (key in languages){
            if (response.language == languages[key]){
                $('#language-input').val(key);
            }
        }
        $("#main-filters").modal("show");
    };

    var loadGraphFilter = function(response){
        $('#social-network input').parent().removeClass('active');
        $('#depth-level input').parent().removeClass('active');
        $('#social-network input[value='+response.social_network+']').parent().addClass('active');
        $('#depth-level input[value='+response.depth_level+']').parent().addClass('active');
        $('#filter-user-input').val(response.username);
        $('#data-analysis-filter').modal('show');
    };

    $('body').on('click', '.edit-filter', function() {
        var filter = $(this).attr('id');
        $("#filter-key").val(filter);
        $.ajax({
            method: 'get',
            url: '/filters/'+filter+'/edit',
            async: false
        }).done(function (response) {
            console.log(response);
            chartInfo[0] = response.type;
            if (response.type == "popular_terms" || response.type == "trends"){
                $('#phrases-filter-apply').attr('value','edit-filter');
                chartInfo[1] = response.type;
                loadPhraseFilter(response);
            }else{
                $('#sna-filter-apply').attr('value','edit-filter');
                chartInfo[1] = "graph";
                loadGraphFilter(response);
            }
        });
    });

    function fillWordCloudList(jsonObject) {
        var res = [];
        for(var i = 0; i < jsonObject.length; i++) {
            res.push({text: jsonObject[i].key, count: (jsonObject[i].value + '')});
        }
        return res;
    }
}

$(document).on('page:load', ready);
$(document).ready(ready);
