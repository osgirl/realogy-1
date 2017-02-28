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
    $(this).parent().addClass("active");
    $(this).parent().siblings().removeClass("active");
    var tab = $(this).attr("href");
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
    $('#accordion').accordion({
        heightStyle: "content",
        collapsible:true,
        beforeActivate: function(event, ui) {
             // The accordion believes a panel is being opened
            if (ui.newHeader[0]) {
                var currHeader  = ui.newHeader;
                var currContent = currHeader.next('.ui-accordion-content');
             // The accordion believes a panel is being closed
            } else {
                var currHeader  = ui.oldHeader;
                var currContent = currHeader.next('.ui-accordion-content');
            }
             // Since we've changed the default behavior, this detects the actual status
            var isPanelSelected = currHeader.attr('aria-selected') == 'true';
            
             // Toggle the panel's header
            currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));
            
            // Toggle the panel's icon
            currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);
            
             // Toggle the panel's content
            currContent.toggleClass('accordion-content-active',!isPanelSelected)    
            if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }

            return false; // Cancels the default action
        }
    });
});