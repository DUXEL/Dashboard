var $loading;
var ready = function() {

    $loading = $('#loadingDiv').hide();
    jQuery.fn.center = function () {
        this.css("position","absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
        return this;
    }

    $('#loadingDiv').center();

    $(".small-chart-div").hover(function() {
        $(this).children(".delete-button").show();
        $(this).children(".fullscreen-button").show();
    }, function() {
        $(this).children(".delete-button").hide();
        $(this).children(".fullscreen-button").hide();
    });


}


$(document).on('page:load', ready);
$(document).ready(ready);