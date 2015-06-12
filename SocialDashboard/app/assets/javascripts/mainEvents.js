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
        //var wordList2WordCloud = [{"key": "Cat", "value": 20}, {"key": "fish", "value": 20}, {"key": "things", "value": 20}, {"key": "look", "value": 20}, {"key": "two", "value": 20}, {"key": "like", "value": 20}, {"key": "hat", "value": 20}, {"key": "Oh", "value": 20}, {"key": "mother", "value": 20}, {"key": "One", "value": 20}];
        //displayWordCloud("#div2",wordsListWordCloud);

        if (!$("#main-chart").is(':empty')){
            alert(curr_chart);
            $("#main-chart").html("");
            displayGraph(convertJSON(curr_chart), "#div1");
        }

        var wordsListWordCloud = [{"key": "Cat", "value": 26}, {"key": "fish", "value": 19}, {"key": "things", "value": 18}, {"key": "look", "value": 16}, {"key": "two", "value": 15}, {"key": "like", "value": 14}, {"key": "hat", "value": 14}, {"key": "Oh", "value": 13}, {"key": "mother", "value": 12}, {"key": "One", "value": 12}, {"key": "Now", "value": 12}, {"key": "Thing", "value": 12}, {"key": "house", "value": 10}, {"key": "fun", "value": 9}, {"key": "know", "value": 9}, {"key": "good", "value": 9}, {"key": "saw", "value": 9}, {"key": "bump", "value": 8}, {"key": "hold", "value": 7}, {"key": "fear", "value": 6}, {"key": "game", "value": 6}, {"key": "play", "value": 6}, {"key": "Sally", "value": 6}, {"key": "wet", "value": 6}, {"key": "little", "value": 6}, {"key": "box", "value": 6}, {"key": "came", "value": 6}, {"key": "away", "value": 6}, {"key": "sit", "value": 5}, {"key": "ran", "value": 5}, {"key": "big", "value": 5}, {"key": "something", "value": 5}, {"key": "put", "value": 5}, {"key": "fast", "value": 5}, {"key": "go", "value": 5}, {"key": "ball", "value": 5}, {"key": "pot", "value": 5}, {"key": "show", "value": 4}, {"key": "cup", "value": 4}, {"key": "get", "value": 4}, {"key": "cake", "value": 4}, {"key": "pick", "value": 4}, {"key": "went", "value": 4}, {"key": "toy", "value": 4}, {"key": "ship", "value": 4}, {"key": "net", "value": 4}, {"key": "tell", "value": 4}, {"key": "fan", "value": 4}, {"key": "wish", "value": 4}, {"key": "day", "value": 4}, {"key": "new", "value": 4}, {"key": "tricks", "value": 4}, {"key": "way", "value": 4}, {"key": "sat", "value": 4}, {"key": "books", "value": 3}, {"key": "hook", "value": 3}, {"key": "mess", "value": 3}, {"key": "kites", "value": 3}, {"key": "rake", "value": 3}, {"key": "red", "value": 3}, {"key": "shame", "value": 3}, {"key": "bit", "value": 3}, {"key": "hands", "value": 3}, {"key": "gown", "value": 3}, {"key": "call", "value": 3}, {"key": "cold", "value": 3}, {"key": "fall", "value": 3}, {"key": "milk", "value": 3}, {"key": "shook", "value": 3}, {"key": "tame", "value": 2}, {"key": "deep", "value": 2}, {"key": "Sank", "value": 2}, {"key": "head", "value": 2}, {"key": "back", "value": 2}, {"key": "fell", "value": 2}, {"key": "hop", "value": 2}, {"key": "shut", "value": 2}, {"key": "dish", "value": 2}, {"key": "trick", "value": 2}, {"key": "take", "value": 2}, {"key": "tip", "value": 2}, {"key": "top", "value": 2}, {"key": "see", "value": 2}, {"key": "let", "value": 2}, {"key": "shake", "value": 2}, {"key": "bad", "value": 2}, {"key": "another", "value": 2}, {"key": "come", "value": 2}, {"key": "fly", "value": 2}, {"key": "want", "value": 2}, {"key": "hall", "value": 2}, {"key": "wall", "value": 2}, {"key": "Thump", "value": 2}, {"key": "Make", "value": 2}, {"key": "lot", "value": 2}, {"key": "hear", "value": 2}, {"key": "find", "value": 2}, {"key": "lots", "value": 2}, {"key": "bet", "value": 2}, {"key": "dear", "value": 2}, {"key": "looked", "value": 2}, {"key": "gone", "value": 2}, {"key": "sun", "value": 2}, {"key": "asked", "value": 1}, {"key": "shine", "value": 1}, {"key": "mind", "value": 1}, {"key": "bite", "value": 1}, {"key": "step", "value": 1}, {"key": "mat", "value": 1}, {"key": "gave", "value": 1}, {"key": "pat", "value": 1}, {"key": "bent", "value": 1}, {"key": "funny", "value": 1}, {"key": "give", "value": 1}, {"key": "games", "value": 1}, {"key": "high", "value": 1}, {"key": "hit", "value": 1}, {"key": "run", "value": 1}, {"key": "stand", "value": 1}, {"key": "fox", "value": 1}, {"key": "man", "value": 1}, {"key": "string", "value": 1}, {"key": "kit", "value": 1}, {"key": "Mothers", "value": 1}, {"key": "tail", "value": 1}, {"key": "dots", "value": 1}, {"key": "pink", "value": 1}, {"key": "white", "value": 1}, {"key": "kite", "value": 1}, {"key": "bed", "value": 1}, {"key": "bumps", "value": 1}, {"key": "jumps", "value": 1}, {"key": "kicks", "value": 1}, {"key": "hops", "value": 1}, {"key": "thumps", "value": 1}, {"key": "kinds", "value": 1}, {"key": "book", "value": 1}, {"key": "home", "value": 1}, {"key": "wood", "value": 1}, {"key": "hand", "value": 1}, {"key": "near", "value": 1}, {"key": "Think", "value": 1}, {"key": "rid", "value": 1}, {"key": "made", "value": 1}, {"key": "jump", "value": 1}, {"key": "yet", "value": 1}, {"key": "PLOP", "value": 1}, {"key": "last", "value": 1}, {"key": "stop", "value": 1}, {"key": "pack", "value": 1}, {"key": "nothing", "value": 1}, {"key": "got", "value": 1}, {"key": "sad", "value": 1}, {"key": "kind", "value": 1}, {"key": "fishHe", "value": 1}, {"key": "sunny", "value": 1}, {"key": "Yes", "value": 1}, {"key": "bow", "value": 1}, {"key": "tall", "value": 1}, {"key": "always", "value": 1}, {"key": "playthings", "value": 1}, {"key": "picked", "value": 1}, {"key": "strings", "value": 1}, {"key": "Well", "value": 1}, {"key": "lit", "value": 1}];
        curr_chart = wordsListWordCloud;
        displayBubbleChart("#main-chart",wordListBubble);

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
            data: {countries: requestData, type:"phrase", language:language ,start_time:start, end_time: finish},
            async: 'false'
        }).done(function(filterKey){
            console.log(filterKey);
            $.ajax({
                method: "post",
                url: '/charts',
                data: {type: "?", filterKey: filterKey, phrase_type: phraseType},
                async: 'false'
            }).done(function(response){
                console.log(response);
                console.log(filterKey);
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
