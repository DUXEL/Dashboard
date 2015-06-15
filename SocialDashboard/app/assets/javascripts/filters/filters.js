var startTime = null;
var finishTime = null;
var languages = {
    'Français': 'fr',
    'English': 'en',
    'Arabic': 'ar',
    '日本人': 'ja',
    'Español': 'es',
    'Deutsch': 'de',
    'Italiano': 'it',
    'Indonesia': 'id',
    'Português': 'pt',
    '한국의': 'ko',
    'Türk': 'tr',
    'Pусский': 'ru',
    'Nederlands': 'nl',
    '中國傳統': 'zh-tw',
    '简体中国':'zh-cn',
    'हिन्दी': 'hi',
    'Norsk': 'no',
    'Svenska': 'sv',
    'Suomalainen': 'fi',
    'Dansk': 'da',
    'Polski': 'pl',
    'Magyar': 'hu',
    'Urdu': 'ur',
    'ไทย': 'th',
    'English UK': 'en-gb'};

var ready = function() {

    //Hide checks
    $("#region-check").hide();
    $("#time-check").hide();
    $("#language-check").hide();
    $('#start-timepicker1').datetimepicker({
        format: 'YYYY-MM-DD',
        icons:{
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            clear: 'fa fa-trash-o'}
    });

    $('#finish-timepicker1').datetimepicker({
        format: 'YYYY-MM-DD',
        icons:{
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            clear: 'fa fa-trash-o'}
    });
    startTime = $('#start-timepicker1').data("DateTimePicker");
    finishTime = $('#finish-timepicker1').data("DateTimePicker");
    var myFunc = function (){
         var start = $('#start-timepicker1').data("DateTimePicker").date();
         var finish = $('#finish-timepicker1').data("DateTimePicker").date();
         if ( start != null && finish != null ){
            $("#time-check").show();
         var years  = finish.diff(start,'years');
         var month  = finish.subtract(years,'years').diff(start,'months');
         var days = finish.subtract(month,'months').diff(start,'days');

         $('#filter-resume-day').html("<span>"+days+"</span>");
         $('#filter-resume-month').html("<span>"+month+"</span>");
         $('#filter-resume-year').html("<span>"+years+"</span>");

         }else{
             $("#time-check").hide();
         }
     };


    $("#start-timepicker1").on("dp.change", function (e) {
        var start = $('#start-timepicker1').data("DateTimePicker").date();
        var finish = $('#finish-timepicker1').data("DateTimePicker").date();
        if ( start != null && finish != null ){
            $('#finish-timepicker1').data("DateTimePicker").minDate(e.date);
        }
        myFunc();
    });

    $("#finish-timepicker1").on("dp.change", function (e) {
        var start = $('#start-timepicker1').data("DateTimePicker").date();
        var finish = $('#finish-timepicker1').data("DateTimePicker").date();
        if ( start != null && finish != null ){
            $('#start-timepicker1').data("DateTimePicker").maxDate(e.date);
        }
        myFunc();
    });


     //Simulate clicking the addon-icon
    $("#finish-timepicker2").click(function(){
        $("#finish-timepicker3").click();

    });

    $("#start-timepicker2").click(function(){
        $("#start-timepicker3").click();

    });

   //Languages autocomplete.
    var input = document.getElementById("language-input");
    new Awesomplete(input, {
        list: ['Español', 'English', 'English UK', 'Français', 'Arabic', '日本人', 'Deutsch', 'Italiano',
            'Indonesia', 'Português', '한국의', 'Türk', 'Pусский', 'Nederlands', '中國傳統', '简体中国',' हिन्दी',
            'Norsk', 'Svenska', 'Suomalainen', 'Dansk', 'Polski', 'Magyar', 'Urdu', 'ไทย']
    });


    $("#language-input").on("input", function (e) {
        if($(this).val() == "") {
            $("#language-check").hide();
        }else {
            $("#language-check").show();
        }
    });


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
        'worldRegion':
            ["ae","af","ag","al","am","ao","ar","at","au","az","ba","bb","bd","be","bf","bg","bi","bj","bn","bo","br","bs","bt","bw","by","bz","ca","cd","cf","cg","ch","ci","cl","cm","cn","co","cr","cu","cv","cy","cz","de","dj","dk","dm","do","dz","ec","ee","eg","er","es","et","fi","fj","fk","fr","ga","gb","gd","ge","gf","gh","gl","gm","gn","gq","gr","gt","gw","gy","hn","hr","ht","hu","id","ie","il","in","iq","ir","is","it","jm","jo","jp","ke","kg","kh","km","kn","kp","kr","kw","kz","la","lb","lc","lk","lr","ls","lt","lv","ly","ma","md","mg","mk","ml","mm","mn","mr","mt","mu","mv","mw","mx","my","mz","na","nc","ne","ng","ni","nl","no","np","nz","om","pa","pe","pf","pg","ph","pk","pl","pt","py","qa","re","ro","rs","ru","rw","sa","sb","sc","sd","se","si","sk","sl","sn","so","sr","st","sv","sy","sz","td","tg","th","tj","tl","tm","tn","tr","tt","tw","tz","ua","ug","us","uy","uz","ve","vn","vu","ye","za","zm","zw"],
        'naRegion':["ca","us","mx","gl"],
        'saRegion':["ve","co","pe","ec","br","gy","sr","gf","bo","py","uy","cl","ar","fk"],
        'caRegion': ["bz","gt","hn","sv", "ni","cr","pa"],
        'euwRegion':["se","fi","no","is","gb","ie","fr","es","pt","ch","de","nl","dk","it","mt","be","at"],
        'carRegion':["cr", "ni", "cu","bs", "ht","jm", "ag","kn","lc","dm","bb", "tt", "gd","do", "bz","gt","hn","co","ve", "gy","sr","gf","pa"],
        'eueRegion':["ru","pl","cz","sk","hu","ro","si","hr","ba","mk","bg","rs","al","ua","ee","lt","lv","by","md","gr"],
        'afRegion':["ly","dz","ma","mr","ml","gn","sn","gm","gw","lr","sl","ci","gh","bf","bj","ne","tg","ng","sd","eg","td","et","er","so","ke","ug","cd","cf","cm","ga","cg","st","gq","tz","mz","mw","zm","rw","bi","mg","zw","bw","na","ao","ls","sz","za","tn","dj"],
        'asRegion':["ru","mn","cn","kp","kr","jp","kz","bd","np","in","bt","th","la","mm","vn","kh","my","ph","tw","lk","id","pk","af","tm","kg","uz","tj","sa","ye","om","ir","iq","jo","sy","ae","kw","qa","tr","az","am","ge"],
        'oceRegion':["au","nz","pg","sb","nc","vu","fj","id","tl"],
        'lataRegion': ["ve","co","ec","pe","bo","py","gf","br","ar","uy","cl","fk","mx","gt","hn","ni","cr","pa","bz","sv"],

};

    $("#vmap").on('click', function(){
            if (  $(this).vectorMap("getSelectedRegions").length == 0){
                $("#region-check").hide();
            }else {
                $("#region-check").show();
            }
    });

    $(".region-options").click(function (){
        manipulateMultiple('deselect',regions['worldRegion']);
        var value = $(this).attr('value');
        manipulateMultiple('select',regions[value]);
        $("#region-check").show();
    });


    /*
     * Buttons for clear each filter also have to enable or disable time or region
     * tabs deppendig which is selected first (modified first)
     */
    $("#region-btn-clear").click(function(){
        manipulateMultiple('deselect', regions['worldRegion']);
        $("#region-check").hide();
        $("#time-link").attr('href','#time');

    });

    $("#time-btn-clear").click(function(){
        $("#time-check").hide();
        $('#language-check').hide();
        $('#finish-timepicker2').val('');
        $('#start-timepicker2').val('');
        $("#start-timepicker1").data("DateTimePicker").date(null);
        $("#finish-timepicker1").data("DateTimePicker").date(null);
        $("#start-timepicker1").data("DateTimePicker").clear();
        $("#finish-timepicker1").data("DateTimePicker").clear();
        $('#finish-timepicker1').data("DateTimePicker").minDate(false);
        $('#start-timepicker1').data("DateTimePicker").maxDate(false);
        $('#filter-resume-day').html("<span>"+0+"</span>");
        $('#filter-resume-month').html("<span>"+0+"</span>");
        $('#filter-resume-year').html("<span>"+0+"</span>");
    });

    $("#language-btn-clear").click(function(){
        $("#language-check").hide();
        $("#language-input").val("");
    });

    $("#filters-btn-clear").click(function(){
        $("#language-btn-clear").click();
        $("#time-btn-clear").click();
        $("#region-btn-clear").click();
    });
};

$(document).on('page:load', ready);
$(document).ready(ready);