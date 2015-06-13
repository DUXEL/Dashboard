var curr_chart;
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
        if (!$("#main-chart").is(':empty')) {
            alert(curr_chart);
            $("#main-chart").html("");
            displayGraph(convertJSON([curr_chart]), "#div1");
        }
        curr_chart = jsonGraph;
        displayGraph(convertJSON(jsonGraph), "#main-chart");
        $("#data-analysis-filter").modal("hide");
        appendGraphButtons("#main-chart");

    });



    $("#phrases-filter-apply").click(function() {
        // SD modifications
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
        var start = null;
        var finish = null;
        if (startTime.date() != null && finishTime.date() != null){
            start =startTime.date().format("YYYY-MM-DD");
            finish = finishTime.date().format("YYYY-MM-DD");
        }
        var phraseType;
        $.ajax({
            method: 'post',
            url: '/filters',
            data: {countries: requestData, language:language ,start_time:start, end_time: finish, phrase_type:chartInfo[0]},
            async: 'false'
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
                console.log(response);
                if (response != null){
                    $('main').prepend('<button class= "btn btn-default edit-filter" id="filter'+i+'">filter'+i+'</button>');
                }
            });
        }
    }

    availableFilters();
    $('body').on('click', '.edit-filter', function() {
        $('#filters-btn-clear').click();
        var filter = $(this).attr('id');
        $.ajax({
            method: 'get',
            url: '/filters/'+filter+'/edit',
            async: false
        }).done(function (response) {

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
        });

    });

    function appendGraphButtons(div) {
        $(div).append("                        \
        <div class='control-zoom'>\
        <a class='control-zoom-in' href='#' title='Zoom in'></a>\
            <a class='control-zoom-out' href='#' title='Zoom out'></a>\
            </div>\
            <div class='node-info'>\
            <div class='close-button'></div>\
            <div class='node-link-container'><a class='node-link' href='#'></a></div>\
        <textarea readonly class='node-description'></textarea>\
            </div>");
    }
/* HTML For graph.
*/
}

$(document).on('page:load', ready);
$(document).ready(ready);
