var myFunc = function (){
    var start = $('#start-timepicker1').data("DateTimePicker").date();
    var finish = $('#finish-timepicker1').data("DateTimePicker").date();
    if ( start != null && finish != null ){
        $("#time-check").show();
        $("#li-region").addClass('disabled');
        $("#region-link").attr('href','#');
        var years  = finish.diff(start,'years');
        var month  = finish.subtract(years,'years').diff(start,'months');
        var days = finish.subtract(month,'months').diff(start,'days');

        $('#filter-resume-day').html("<span>"+days+"</span>");
        $('#filter-resume-month').html("<span>"+month+"</span>");
        $('#filter-resume-year').html("<span>"+years+"</span>");

    }
};

$(function () {

    $('#start-timepicker1').datetimepicker();
    $('#finish-timepicker1').datetimepicker();


    $("#start-timepicker1").on("dp.change", function (e) {
        var start = $('#start-timepicker1').data("DateTimePicker").date();
        if ( start != null ){
            $('#finish-timepicker1').data("DateTimePicker").minDate(e.date);
        }
        myFunc();
    });

    $("#finish-timepicker1").on("dp.change", function (e) {
        var finish = $('#finish-timepicker1').data("DateTimePicker").date();
        if ( finish != null ){
            $('#start-timepicker1').data("DateTimePicker").maxDate(e.date);
        }
        myFunc();
    });


    /* Simulate clicking the addon-icon */
    $("#finish-timepicker2").click(function(){
        $("#finish-timepicker3").click();

    });

    $("#start-timepicker2").click(function(){
        $("#start-timepicker3").click();

    });

    /*================================================================*/
    // Variable that contains a list of available languages
    var availableLanguages = [
        "Aleman",
        "Arabe",
        "Mandarin",
        "Coreano",
        "Español",
        "Frances",
        "Griego",
        "Holandes",
        "Ingles",
        "Italiano",
        "Japones",
        "Portugues",
        "Rumano",
        "Ruso",
        "Sueco",
        "Vietnamita"
    ];

    var selectedLanguages = [];

    $("#language-textbox").typeahead({source: availableLanguages });

    // This function goes over the list of available languages to verify if the input is in the list
    var contains = function(array,value){
        for (i in array) {
            if (array[i]===value){
                return true;
            }    
        }
        return false;
    };

    var switcAvailability = function(array,lang){
        var newArray = [];
        for (cc in array){
            if ( array[cc]!=lang ){
                newArray.push(array[cc]);
            }
        }
        if (contains(availableLanguages,lang)){
            availableLanguages = newArray;
            selectedLanguages.push(lang);
        }else{
            selectedLanguages = newArray;
            availableLanguages.push(lang);
        }

    };

    var isItValid = function(lang){
        return (contains(availableLanguages,lang) && !contains(selectedLanguages,lang))  
    };

    // Button to remove items from selected languages
    $(document).on("click","#languages-list li a",function(){
        var lang = $(this).attr('id');
        switcAvailability(selectedLanguages,lang);
        $("#language-textbox").typeahead('destroy');
        $("#language-textbox").typeahead({source: availableLanguages });
        $(this).parent().remove();
        if (selectedLanguages.length == 0 ){
            $('#language-check').hide();
        }
    });	

    // Verifies if keypress is enter to add a language to the selected list
    $(document).keypress(function(key) {
        if(key.which == 13) {
            var text = $("#language-textbox").val();
            if ( isItValid(text)===true ){
                switcAvailability(availableLanguages,text);
                $("#language-textbox").typeahead('destroy');
                $("#language-textbox").typeahead({source: availableLanguages });
                var id = "language-"+text;
                var item = "<li id="+id+">"+text+"&nbsp;<a id="+text+" href='#'><img src='../images/icons/language-delete.png'/></a> </li>";
                $("#languages-list").append(item);
                $('#language-check').show();
            }
            $("#language-textbox").val("");


        }
    });	


    /*====================================================*/
    // Code necesary for the jqvmap

    $('#vmap').vectorMap({
        map: 'world_en',
        locale: 'es',
        backgroundColor:'#b5c9d1',
        color: '#C8F7C6',
        hoverColor: '#83C792',
        selectedColor: '#2D8C2A',
        scaleColors: ['#567', '#000'],
        enableZoom: true,
        showTooltip: true,
        borderColor: '#000',
        borderWidth: 1,
        borderOpacity: 0.25,
        selectedRegions: null,
        multiSelectRegion: true,
        onRegionClick: function(element, code, region)
        {
            $("#region-check").show();
            $("#li-time").addClass('disabled');
            $("#time-link").attr('href','#');
        }

    });

    //manipulate multiple regions in the map using options and an array containig the regions to manipulate.
    var manipulateMultiple = function(option,regionList){
        for (i in regionList){
            if( $('#vmap').vectorMap("isSelected", regionList[i]) && option=="deselect"){
                $('#vmap').vectorMap(option, regionList[i]);
            }else if(option=="select"){
                $('#vmap').vectorMap(option, regionList[i]);
            }
        }
    };

    //posible options select,deselect,highlight,unhighlight;
    var regions = { 
        'worldRegions':
        ["ae","af","ag","al","am","ao","ar","at","au","az","ba","bb","bd","be","bf","bg","bi","bj","bn","bo","br","bs","bt","bw","by","bz","ca","cd","cf","cg","ch","ci","cl","cm","cn","co","cr","cu","cv","cy","cz","de","dj","dk","dm","do","dz","ec","ee","eg","er","es","et","fi","fj","fk","fr","ga","gb","gd","ge","gf","gh","gl","gm","gn","gq","gr","gt","gw","gy","hn","hr","ht","hu","id","ie","il","in","iq","ir","is","it","jm","jo","jp","ke","kg","kh","km","kn","kp","kr","kw","kz","la","lb","lc","lk","lr","ls","lt","lv","ly","ma","md","mg","mk","ml","mm","mn","mr","mt","mu","mv","mw","mx","my","mz","na","nc","ne","ng","ni","nl","no","np","nz","om","pa","pe","pf","pg","ph","pk","pl","pt","py","qa","re","ro","rs","ru","rw","sa","sb","sc","sd","se","si","sk","sl","sn","so","sr","st","sv","sy","sz","td","tg","th","tj","tl","tm","tn","tr","tt","tw","tz","ua","ug","us","uy","uz","ve","vn","vu","ye","za","zm","zw"],
        'europeRegion':[],
        'americaRegion':["ar", "cl", "co", "cr", "cu", "ec", "sv", "gt", "hn", "mx", "ni", "pa", "py", "pe", "do", "uy", "ve", "us", "br", "ca", "gy", "sr", "gf", "ag", "lc", "tt", "bb", "ht", "bs", "jm", "dm", "kn", "gd", "fk", "bo"],
        'latamRegion': ["ar","bo","cl","co","cr","cu","ec","sv","es","gt","hn","mx","ni","pa","py","pe","do","uy","ve"],
        'nortAmericaRegion': [],
        'southAmericRegion':[]


    };

    $("#vmap").click(function(){

    });

    $(".region-options").click(function (){
        manipulateMultiple('deselect',regions['worldRegions']);
        var value = $(this).attr('value');
        manipulateMultiple('select',regions[value]);

    });


    /* Buttons for clear each filter also have to enable or disable time or region
     * tabs deppendig which is selected first (modified first)
     */
    $("#region-btn-clear").click(function(){
        manipulateMultiple('deselect', regions['worldRegions']);
        $("#region-check").hide(); 
        $("#time-link").attr('href','#time');
        $("#li-time").removeClass('disabled');

    });
    

    $("#time-btn-clear").click(function(){
        manipulateMultiple('deselect', regions['worldRegions']);
        $("#time-check").hide(); 
        $("#region-link").attr('href','#region');
        $("#li-region").removeClass('disabled');
        //$('#finish-timepicker2').val('');
        //$('#start-timepicker2').val('');
        $('#finish-timepicker1').data("DateTimePicker").minDate(false);
        $('#start-timepicker1').data("DateTimePicker").maxDate(false);
        $("#start-timepicker1").data("DateTimePicker").clear();
        $("#finish-timepicker1").data("DateTimePicker").clear();
        $('#filter-resume-day').html("<span>"+0+"</span>");
        $('#filter-resume-month').html("<span>"+0+"</span>");
        $('#filter-resume-year').html("<span>"+0+"</span>");

    });

    $("#language-btn-clear").click(function(){
        var temp = selectedLanguages;
        for (cc in temp){
            switcAvailability(selectedLanguages,temp[cc]);
        }
        $("#language-textbox").typeahead('destroy');
        $("#language-textbox").typeahead({source: availableLanguages });
        $("#languages-list").html('');
        $('#language-check').hide();

    });
    $("#filters-btn-clear").click(function(){
        $("#language-btn-clear").click();
        $("#time-btn-clear").click();
        $("#region-btn-clear").click();
        
    });

});
