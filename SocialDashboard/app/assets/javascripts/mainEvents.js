var curr_chart;
var deleteAllFilters = null;
var en_disableFilterTabs = function(value){
    if (value == "trends"){
        $("#li-time").addClass('disabled');
        $("#li-language").addClass('disabled');
        $('#time-link').removeAttr('data-toggle');
        $('#language-link').removeAttr('data-toggle');
    }else{
        $("#li-time").removeClass('disabled');
        $("#li-language").removeClass('disabled');
        $('#time-link').attr('data-toggle','tab');
        $('#language-link').attr('data-toggle','tab');
    }
};
var ready = function() {

    // Function used to convert the JSON file to the format needed for the graph
    function convertJSON(jsonObject) {
        alert("json object\n"+jsonObject);
        var graphLength = Object.keys(jsonObject).length;
        var newGraph = {};
        var nodesIndex = [];
        var newNodes = [];
        var newLinks = [];

        newGraph["directed"] = "true";
        newGraph["multigraph"] = "false";
        newGraph["graph"] = [];

        for(var node in jsonObject) {
            nodesIndex.push(node);
        }

        for(var property in jsonObject) {
            var currNode = jsonObject[property];
            var newNode = {};
            newNode["id"] = currNode["name"];
            newNode["description"] = currNode["description"];
            newNode["link"] = currNode["link"];
            newNodes.push(newNode);

            var currNodeLinks = currNode["connectsTo"];
            for(var i = 0; i < currNodeLinks.length; i++) {
                currLink = currNodeLinks[i];
                var link = {};
                var source = nodesIndex.indexOf(property);
                var target = nodesIndex.indexOf(currLink);
                link["source"] = source;
                link["target"] = target;
                newLinks.push(link);
            }
        }
        newGraph["links"] = newLinks;
        newGraph["nodes"] = newNodes;
        return newGraph;
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
                console.log(response);
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
        if ( !$("#region-check").is(":visible") &&
             !$('#time-check').is(":visible") &&
             !$('#language-check').is(":visible") ){
            alert("El filtro debe poseer parametros de busqueda");
            return;
        }
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
            }).done(function(response){
                console.log(response);
            });
        });
        $("#main-filters").modal("hide");
    });

    $('body').on("click",".close-button", function() {
        $('.node-info').css('display','none');
    });

    $(".fullscreen-button").on("click",function() {
        $("#div1").html("");
        $("#main-chart").html("");
        if(ct%2 == 0) {
            displayGraph(convertJSON(jsonGraph),"#div1");
            appendGraphButtons("#div1")
            displayWordCloud("#main-chart",wordsListWordCloud);
        }else {
            displayWordCloud("#div1",wordsListWordCloud);
            displayGraph(convertJSON(jsonGraph),"#main-chart");
            appendGraphButtons("#main-chart")
        }
        ct++;
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
        $('#vmap').click();
        for (key in languages){
            if (response.language == languages[key]){
                $('#language-input').val(key);
                $("#language-check").show();
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
                en_disableFilterTabs(response.type);
                chartInfo[1] = response.type;
                loadPhraseFilter(response);
            }else{
                $('#sna-filter-apply').attr('value','edit-filter');
                chartInfo[1] = "graph";
                loadGraphFilter(response);
            }
        });
    });
}

$(document).on('page:load', ready);
$(document).ready(ready);
