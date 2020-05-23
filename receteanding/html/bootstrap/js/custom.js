(function($) { "use strict";
    
    /* Animate loader off screen */
    jQuery(window).load(function() {
        //jQuery('body').addClass('loaded');
    });
    
	/* niceScroll */
	jQuery("html").niceScroll({
		scrollspeed: 60,
		mousescrollstep: 38,
		cursorwidth: 6,
		cursorborder: 0,
		cursorcolor: '#6c6c6c', // color
		autohidemode: false,
		zindex: 9999999,
		horizrailenabled: false,
		cursorborderradius: 0,
	});
	
    /* add class sticky in header */
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > 1) {
            jQuery('.sticky header').addClass('sticky')
        } else {
            jQuery('.sticky header').removeClass('sticky')
        }
        return false;
    });
    

    

    /* main menu */
    jQuery('a.open_close').on('click', function() {
        jQuery('#main-menu').toggleClass('show');
        jQuery('.layer').toggleClass('layer-is-visible');
    });
    
    jQuery('a.show-submenu').on('click', function() {
        jQuery(this).next().toggleClass('show_normal');
    });
    
    jQuery('a.show-submenu-mega').on('click', function() {
        jQuery(this).next().toggleClass('show_mega');
    });
    
    jQuery(window).width() <= 600 && jQuery('a.open_close').on('click', function() {
        jQuery('.np-toggle-switch').removeClass('active');
    });
    
	/* Go up */
	jQuery(window).on('scroll', function () {
		if(jQuery(this).scrollTop() > 100 ) {
			jQuery(".go-up").css("right","20px");
		}else {
			jQuery(".go-up").css("right","-60px");
		}
	});
    
	jQuery(".go-up").on('click', function(){
		jQuery("html,body").animate({scrollTop:0},500);
		return false;
	});
    
    /* sticky sidebar */
    jQuery('.sticky-sidebar').theiaStickySidebar({
      // Settings
      additionalMarginTop: 100,
      additionalMarginBottom: 25,
    });
    
    /* slideshow */
	if (jQuery(".tp-banner").length) {
		jQuery('.tp-banner').revolution({
			delay:5000,
			startwidth:1170,
			startheight:700,
			hideThumbs:10,
			fullWidth:"off",
			fullScreen:"off"
		});
	}
	if (jQuery(".tp-banner-2").length) {
		jQuery('.tp-banner-2').revolution({
			delay:5000,
			startwidth:1170,
			startheight:500,
			hideThumbs:10,
			fullWidth:"off",
			fullScreen:"off"
		});
	}
    
    // remove-recipe-col
    jQuery(".remove-recipe-col").on('click', function(){
		jQuery(this).parent().remove();
		return false;
	});
    
    // Products Filter
    $("#range_slider").ionRangeSlider({
        type: "double",
        grid: true,
        min: 1,
        max: 1000,
        from: 250,
        to: 600,
        prefix: "$"
    });
    
    // Check Also Box
	jQuery(function(){
		var $check_also_box = jQuery("#check-also-box");
		if( $check_also_box.length > 0 ){
			var articleHeight   =  jQuery('#the-post').outerHeight();
			var checkAlsoClosed = false ;
			jQuery(window).scroll(function() {
				if( !checkAlsoClosed ) {
					var articleScroll = jQuery(document).scrollTop();
					if ( articleScroll > articleHeight ){ 
					   $check_also_box.addClass('show-check-also');
                    }
					else { 
					   $check_also_box.removeClass('show-check-also');
                    }
				}
			});
		}
		jQuery('#check-also-close').click(function() {
			$check_also_box.removeClass("show-check-also");
			checkAlsoClosed = true ;
			return false;
		});
	});
    
    // Reading Position Indicator
	var reading_content = jQuery('#the-post');
	if( reading_content.length > 0 ){
		reading_content.imagesLoaded(function() {
			var content_height	= reading_content.height();
			var window_height	= jQuery(window).height();
			jQuery(window).scroll(function() {
				var percent 		= 0,
                    content_offset	= reading_content.offset().top,
					window_offest	= jQuery(window).scrollTop();
				if (window_offest > content_offset) {
					percent = 100 * (window_offest - content_offset) / (content_height - window_height);
				}
				jQuery('#reading-position-indicator').css('width', percent + '%');
			});
		});
	}
	
})(jQuery);