var myFunc = function (){
    var start = $('#start-timepicker2').data("DateTimePicker").date();
    var finish = $('#finish-timepicker2').data("DateTimePicker").date();
    if ( start != null && finish != null ){

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
    $('#start-timepicker2').datetimepicker();
    $('#finish-timepicker1').datetimepicker();
    $('#finish-timepicker2').datetimepicker();


    $("#start-timepicker1").on("dp.change", function (e) {
        $('#finish-timepicker1').data("DateTimePicker").minDate(e.date);
        myFunc();
    });

    $("#start-timepicker1").on("dp.change", function (e) {
        $('#finish-timepicker2').data("DateTimePicker").minDate(e.date);
        myFunc();
    });

    $("#finish-timepicker1").on("dp.change", function (e) {
        $('#start-timepicker1').data("DateTimePicker").maxDate(e.date);
        myFunc();
    });

    $("#finish-timepicker2").on("dp.change", function (e) {
        $('#start-timepicker2').data("DateTimePicker").maxDate(e.date);
        myFunc();
    });


    /*================================================================*/
    // Variable that contains a list of available languages
    var availableLanguages = [
        "Aleman",
        "Arabe",
        "Chino mandarin",
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

    $("#language-textbox").typeahead({source: availableLanguages });

    // This function goes over the list of available languages to verify if the input is in the list
    var isAvailable = function(lang){
        for (i in availableLanguages) {
            if (availableLanguages[i]===lang) return true;
        }
        return false;
    };

    // Button to remove items from selected languages
    $(document).on("click","#languages-list li a",function(){
        $(this).parent().remove();
    });	

    // Verifies if keypress is enter to add a language to the selected list
    $(document).keypress(function(key) {
        if(key.which == 13) {
            var text = $("#language-textbox").val();
            if ( isAvailable(text)===true ){
                var id = "language-"+text;
                var item = "<li id="+id+">"+text+"&nbsp;<a href='#'><img src='../images/icons/language-delete.png'/></a> </li>";
                $("#languages-list").append(item);
            }
            $("#language-textbox").val("");


        }
    });	


    /*====================================================*/
    // Code necesary for the jqvmap

    $('#vmap').vectorMap({
        map: 'world_en',
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
        multiSelectRegion: true

    });

    //manipulate multiple regions in the map using options and an array containig the regions to manipulate.
    var manipulateMultiple = function(option,regionList){
        for (i in regionList){
            $('#vmap').vectorMap(option, regionList[i]);
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
    //$('#vmap').vectorMap('set','selectedRegions',["ca", "ru", "cn", "us", "mx", "sd", "ne", "cd", "mr", "gl"]);

    
    $(".region-options").click(function (){
        manipulateMultiple('deselect',regions['worldRegions']);
        var value = $(this).attr('value');
        manipulateMultiple('select',regions[value]);
    });

});