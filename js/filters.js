var myFunc = function (){
    var start = $('#start-timepicker2').data("DateTimePicker").date();
    var finish = $('#finish-timepicker2').data("DateTimePicker").date();
    if ( start != null && finish != null ){

        var years  = finish.diff(start,'years');
        var month  = finish.subtract(years,'years').diff(start,'months');
        var days = finish.subtract(month,'months').diff(start,'days');
        
        $('#filter-resume-day').html(days);
        $('#filter-resume-month').html(month);
        $('#filter-resume-year').html(years);

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
        
        $("#finish-timepicker1").on("dp.change", function (e) {
            $('#start-timepicker2').data("DateTimePicker").maxDate(e.date);
            myFunc();
        });
});
