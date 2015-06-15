var $loading;

var editingFilter = false;

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

    $("#main-chart").hover(function() {
        $(this).children(".delete-button").show();
        $(this).children(".fullscreen-button").show();
        $(this).children(".settings-button").show();
    }, function() {
        $(this).children(".delete-button").hide();
        $(this).children(".fullscreen-button").hide();
        $(this).children(".settings-button").hide();
    });

    $('.modal').on('hidden.bs.modal', function () {
        editingFilter = false;
    });

};


$(document).on('page:load', ready);
$(document).ready(ready);