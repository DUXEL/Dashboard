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

    var chartObjects = {};
    var $mainChart = $("#main-chart");

    var displayChartHash = {
        trends: function (object, div) {
            displayBubbleChart(fillWordCloudList(object), div);
        },
        popular_terms: function (object, div) {
            displayWordCloud(object, div);
        },
        density: function (object, div) {
            displayGraphChart("Densidad", object, div);
        },
        distance: function (object, div) {
            displayGraphChart("Distancia", object, div);
        },
        centrality: function (object, div) {
            displayGraphChart("Centralidad", object, div);
        },
        network: function (object, div) {
            displayGraphChart("", object, div);
        },
        error: function (object, div) {
            displayErrorMessage("Las opciones especificadas no permitieron generar el grafico.\n" +
                "Se pudo haber superado el limite de consultas.", div);
        }
    };

    function displayErrorMessage(msg, div) {
        $(div).html("<h3 id='error-message'>" + msg + "</h3>");
    }


    function displayGraphChart(type, object, div) {
        console.log("--------------");
        console.log(object);
        console.log("--------------");
        displayGraph(object.graph, div);
        if (div == "#main-chart") {
            $(div).prepend("<h5 class='chart-info'>" + type + "  " + object.value + "</h5>");
            $(div).prepend("<div class='node-info'> <div class='close-button'></div> <h5 class='node-info-username'></h5><img class='node-img' src='' /></div>");
        }
    }

    $("#sna-filter-apply").click(function () {
        var socialNetwork = $('#social-network .active input').val();
        var depthLevel = $('#depth-level .active input').val();
        var filterUser = $('#filter-user-input').val();
        if (filterUser == "") {
            alert("Debe poner un nombre de usuario");
            return;
        }
        var method;
        var currentFilterKey = $("#filter-key").val();
        if (editingFilter) {
            deleteChartAjax(currentFilterKey);
            editingFilter = false;
            $mainChart.html("");
            chartObjects['chart-' + currentFilterKey] = null;
        }
        $('#loadingDiv').show();
        $.ajax({
            method: 'post',
            url: '/filters',
            data: {
                type: chartInfo[1],
                filter_type: chartInfo[0],
                user: filterUser,
                social_network: socialNetwork,
                depth_level: depthLevel,
                filter_key: currentFilterKey
            }
        }).done(function (filterKey) {
            createChartAjax(filterKey, true);
        });
        $('#data-analysis-filter').modal('hide');
    });


    $("#phrases-filter-apply").click(function () {
        var selectedRegions = $("#vmap").vectorMap("getSelectedRegions");
        var requestData = [];
        var language = $('#language-input').val();
        language = languages[language];
        for (var i in selectedRegions) {
            var c = countries[selectedRegions[i]];
            requestData.push(c);
        }
        //startTime, finishTime are defined in filter.js
        var start = undefined;
        var finish = undefined;
        if (startTime.date() != null && finishTime.date() != null) {
            start = startTime.date().format("YYYY-MM-DD");
            finish = finishTime.date().format("YYYY-MM-DD");
        }
        var method;
        var currentFilterKey = $("#filter-key").val();
        if (editingFilter) {
            deleteChartAjax(currentFilterKey);
            editingFilter = false;
            $mainChart.html("");
            chartObjects['chart-' + currentFilterKey] = null;
        }
        $('#loadingDiv').show();
        if (!$("#region-check").is(":visible") && !$('#time-check').is(":visible") && !$('#language-check').is(":visible")) {
            alert("El filtro debe poseer parametros de busqueda!");
            return;
        }
        $.ajax({
            method: 'post',
            url: '/filters',
            data: {
                countries: requestData,
                language: language,
                start_time: start,
                end_time: finish,
                filter_type: chartInfo[0],
                filter_key: currentFilterKey
            },
            async: false
        }).done(function (filterKey) {
            createChartAjax(filterKey);
        });
        $("#main-filters").modal("hide");
    });

    function createChartAjax(filterKey, async) {
        if (filterKey == -1) {
            alert("No se pueden crear más gráficos!");
            $('#loadingDiv').hide();
        } else {
            $.ajax({
                method: "post",
                url: '/charts',
                data: {type: chartInfo[1], key: filterKey},
                async: async,
                statusCode: {
                    500: function () {
                        displayChart("error", chartInfo[1], "", filterKey);
                    }
                }
            }).done(function (response) {
                displayChart(chartInfo[0], chartInfo[1], response, filterKey);
            });
        }
    }


    var displayChart = function (specificType, type, jsonObject, filterKey) {
        if ($mainChart.html().length != 0) {
            var newDiv = availableDiv();
            var oldSpecificType = $mainChart.attr("specific-type");
            var oldChartId = $mainChart.attr("chart-id");
            addChartAttributes(newDiv, $mainChart.attr("type"), oldSpecificType, oldChartId);
            displayChartHash[oldSpecificType](chartObjects[oldChartId], newDiv);
            $mainChart.html("");
            addChartButtons(newDiv);
        }
        var chartId = 'chart-' + filterKey;
        addChartAttributes("#main-chart", type, specificType, chartId);
        displayChartHash[specificType](jsonObject, "#main-chart");
        chartObjects[chartId] = jsonObject;
        addChartButtons("#main-chart");
        $('#loadingDiv').hide();
    };

    function addChartAttributes(element, type, specificType, chartId) {
        var $element = $(element);
        $element.attr('type', type);
        $element.attr('specific-type', specificType);
        $element.attr('chart-id', chartId);
    }

    function addChartButtons(div) {
        $(div).prepend("<div class='delete-button'></div>");
        if (div == "#main-chart") $(div).prepend("<div class='settings-button'></div>");
        else $(div).prepend("<div class='fullscreen-button'></div>");
    }

    var availableDiv = function () {
        for (var i = 1; i < 5; i++) {
            var divHTML = $('#div' + i).html();
            if (divHTML == "") return '#div' + i;
        }
    };


    $('body').on("click", ".close-button", function () {
        $('.node-info').css('display', 'none');
    });


    $("#delete-all-charts").click(function () {
        for (var i = 1; i < 6; i++) {
            deleteChartAjax('filter' + i);
        }
        $mainChart.html("");
        for (var i = 1; i < 5; i++) {
            $("#div" + i).html("");
        }
        chartObjects = {};
    });

    function deleteChartAjax(filterKey) {
        $.ajax({
            method: 'delete',
            url: '/filters/' + filterKey,
            async: false
        }).done(function (response) {
            console.log(response)
        });
        ;
    }


    var loadPhraseFilter = function (response) {
        $('#filters-btn-clear').click();
        startTime.date(moment(response.start_date));
        finishTime.date(moment(response.end_date));
        var country_list = response.country_list;
        for (i in country_list) {
            for (key in countries) {
                if (countries[key].name == country_list[i].name) {
                    $("#vmap").vectorMap('select', key);
                }
            }
        }
        $('#vmap').click();
        for (key in languages) {
            if (response.language == languages[key]) {
                $('#language-input').val(key);
                $("#language-check").show();
            }
        }
        $("#main-filters").modal("show");
    };

    var loadGraphFilter = function (response) {
        $('#social-network input').parent().removeClass('active');
        $('#depth-level input').parent().removeClass('active');
        $('#social-network input[value=' + response.social_network + ']').parent().addClass('active');
        $('#depth-level input[value=' + response.depth_level + ']').parent().addClass('active');
        $('#filter-user-input').val(response.username);
        $('#data-analysis-filter').modal('show');
    };

    function fillWordCloudList(jsonObject) {
        var res = [];
        for (var i = 0; i < jsonObject.length; i++) {
            res.push({text: jsonObject[i].key, count: (jsonObject[i].value + '')});
        }
        return res;
    }


    $("body").on('click', '.delete-button', function () {
        var div = $(this).parent("div");
        var filter = div.attr("chart-id").substring(6);
        deleteChartAjax(filter);
        div.html("");
        chartObjects[div.attr("chart-id")] = null;
    });


    $("body").on('click', '.fullscreen-button', function () {
        $('#loadingDiv').show();
        var emptyMainChart = $mainChart.html() == "";
        var div = $(this).parent(".small-chart-div");

        var tempDiv = "#" + div.attr("id");
        var tempSpecificType = div.attr("specific-type");
        var tempChartId = div.attr("chart-id");
        var tempType = div.attr("type");


        if (!emptyMainChart) addChartAttributes(tempDiv, $mainChart.attr("type"), $mainChart.attr("specific-type"), $mainChart.attr("chart-id"));
        addChartAttributes("#main-chart", tempType, tempSpecificType, tempChartId);

        div.html("");
        $mainChart.html("");
        displayChartHash[tempSpecificType](chartObjects[tempChartId], "#main-chart");
        if (!emptyMainChart) {
            displayChartHash[div.attr("specific-type")](chartObjects[div.attr("chart-id")], tempDiv);
            addChartButtons(tempDiv);
        }
        addChartButtons("#main-chart");
        $('#loadingDiv').hide();
    });


    var availableFilters = function () {
        $('#loadingDiv').show();
        for (var i = 1; i < 6; i++) {
            $.ajax({
                method: 'get',
                url: '/filters/filter' + i + '/edit',
                async: false
            }).done(function (response) {
                if (response != null) {
                    chartInfo[0] = response.type;
                    if (response.type == "popular_terms" || response.type == "trends") {
                        chartInfo[1] = response.type;
                    } else {
                        chartInfo[1] = "graph";
                    }
                    createChartAjax("filter" + i, false); //async type
                }
            });
        }

    };

    $('body').on('click', '.settings-button', function () {
        var filter = $mainChart.attr('chart-id').substring(6);
        $("#filter-key").val(filter);
        $.ajax({
            method: 'get',
            url: '/filters/' + filter + '/edit',
            async: false
        }).done(function (response) {
            chartInfo[0] = response.type;
            if (response.type == "popular_terms" || response.type == "trends") {
                en_disableFilterTabs(response.type);
                chartInfo[1] = response.type;
                loadPhraseFilter(response);
            } else {
                chartInfo[1] = "graph";
                loadGraphFilter(response);
            }
            editingFilter = true;
        });
    });

    var areAvailableFilters = function () {
        var cnt = 0;
        for (var i = 1; i < 6; i++) {
            $.ajax({
                method: 'get',
                url: '/filters/filter' + i + '/edit',
                async: false
            }).done(function (response) {
                if (response != null) {
                    cnt++;
                }
            });
        }
        return cnt > 0;
    };

    // checks if there're filters on cookies, if yes it shows the charts.
    if (areAvailableFilters()) {
        $("#confirm").modal({backdrop: 'static', keyboard: false});
        $("#confirm").modal("show");
    }

    $("#accept-filters").click(function () {
        $("#confirm").modal("hide");
        funcInADifferentThread();
    });

    var funcInADifferentThread = MT.process(
        function () {
            $('#loadingDiv').show()
        },
        function () {
            availableFilters()
        }
    );


    $("#reject-filters").click(function () {
        $("#delete-all-charts").click();
        $("#confirm").modal("hide");
    });

};

$(document).on('page:load', ready);
$(document).ready(ready);
