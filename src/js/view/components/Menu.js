$(document).ready(function() {

    $('.menu-btn').click( function() {
        if ( !$( this ).hasClass( "active" ) ) {
            $('.menu-btn').addClass('active');
        } else {
            $('.menu-btn').removeClass('active');
        }
        var toggleMenu = $(".nav").width() == 0 ? "100%" : "0px";
        var toggleContent = $("section").width() == 0 ? "100%" : "0";
        $('.nav').animate({ width: toggleMenu });
        $('section').animate({ width: toggleContent });
    });

    $('#user-btn').click( function(){
        $('.user-info').toggleClass('hidden');
    });

    $(".nav a").click(function(event) {
        event.preventDefault();
        location.hash = $(this).attr("data-hash");
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        var tab = $(this).attr("data-href");
        $(".content").not(tab).css("display", "none");
        $(tab).fadeIn();

        var mq = window.matchMedia( "(max-width: 480px)" );
        if (mq.matches) {
            $('.nav').css('width','0');
            $('section').css('width','100%');
        }
        if ( !$('.menu-btn').hasClass( "active" ) ) {
            $('.menu-btn').addClass('active');
        } else {
            $('.menu-btn').removeClass('active');
        }
    });
});

$(document).ready( function() {

});