(function(window){
	var imgLoad = imagesLoaded("body");

	imgLoad.on( 'done', function( instance ) {
		$('#preloader').delay(1000).fadeOut('slow');
	});
})(window);

// Check for if block 7 is used
if(document.getElementById("block-7") != null){
	new Photostack(document.getElementById('block-7'));
}


// Fade effect for testimonials block
(function($) {
    var default_config = {
        fadeIn: 100,
        stay: 1000,
        fadeOut: 100
		
    };

    function fade(index, $elements, config) {
        $elements.eq(index)
          .fadeIn(config.fadeIn)
          .delay(config.stay)
          .fadeOut(config.fadeOut, function() {
              fade((index + 1) % $elements.length, $elements, config);
          });
    }

    $.fn.fadeLoop = function(config) {     
        fade(0, this, $.extend({}, default_config, config));
        return this;
    };

}(jQuery));

$(document).ready(function(){
	$('a').smoothScroll();
	//Opening the navbar style 4 when toggle button is clicked
	$('#navbar-style-4-toggle').click(function(){
		$(this).toggleClass('active');
		$('#navbar-style-4-overlay').toggleClass('open');
	});
  
	//Closing of navbar-style-4 and navbar-style-3 when ESC is pressed
	$(document).keyup(function(e) {
		if (e.keyCode == 27){
			if($("#navbar-style-4-overlay").hasClass("open")){
				$("#navbar-style-4-overlay").removeClass("open");
				$(".navbar-style-4-button-container").removeClass("active");
			}
			if($("#navbar-style-3-menu").hasClass("navbar-style-3-open")){
				$("#navbar-style-3-menu").removeClass("navbar-style-3-open");
			}
		}
	});
	

	//Navbar style 3 toggle
	$('#navbar-style-3-toggle, .navbar-style-3-close').on('click', function(){
		$('#navbar-style-3-toggle').toggleClass('active');
		$('#navbar-style-3-menu').toggleClass('navbar-style-3-open');
	});

	$("#navbar-style-4-overlay > nav > ul > li").click(function(){
		if($("#navbar-style-4-overlay").hasClass("open")){
			$("#navbar-style-4-overlay").removeClass("open");
			$(".navbar-style-4-button-container").removeClass("active");
		}
	});
	$("html").niceScroll({zindex:999,cursorborder:"",cursorborderradius:"8px",cursorcolor:"#191919",cursoropacitymin:.5,horizrailenabled:false});
	
	
	//Transparent navbar effect when at heaader
	$(window).scroll(function(){
		if ($(window).scrollTop() > 5){
				if($(".navbar-default:not(.not-transparent)").hasClass("navbar-at-header")){
					$(".navbar-default:not(.not-transparent)").removeClass("navbar-at-header");
				}
		}else{
			$(".navbar-default:not(.not-transparent)").addClass("navbar-at-header");
		}
	});
	
	
	//When navbar menu toggle is clicked when the navbar is tranparent, add a background for better viewing
	$(".navbar-at-header .navbar-toggle").click(function(e){
		$(".navbar-default").removeClass("navbar-at-header");
	});

	
	//Headerwrap pattern move effect
	var value1 = $(".overlay").attr("effect-value-1"), value2 = $(".overlay").attr("effect-value-2");

	$('#headerwrap').mousemove(function(e){
			
			if(value1 == undefined){
				value1 = 1;
			}
			
			if(value2 == undefined){
				value2 = 20;
			}
			
		var amountMovedX = (e.pageX * value1 / value2);
		var amountMovedY = (e.pageY * value1 / value2);
		bgmove = 'background-position:' + amountMovedX + 'px ' + amountMovedY + 'px';	
		$(".thumb-vid").hover(function(e){
			$(e.currentTarget).addClass("video-thumb-hovered");
		});
	
	
		$(".thumb-vid").mouseleave(function(e){
			$(e.currentTarget).removeClass("video-thumb-hovered");
		});
	
		if($('#header-pt-interact').length <= 0){
			$('head').append('<style id="header-pt-interact">.overlay:after{' + bgmove + '}</style>');
		}else{
			$('#header-pt-interact').replaceWith('<style id="header-pt-interact">.overlay:after{' + bgmove + '}</style>');
		}

	});
	
	if($("#headerwrap").hasClass("overlay")){
		patternName = $("#headerwrap").attr("pattern-name");
		bgProperty = "background-image: url('voskan-assets/patterns/" + patternName + "');";
		$('head').append('<style>.overlay:after{' + bgProperty + '}</style>');
	}
	
	if($(".block-8").length){
		var block8Id = 0;
		$( ".block-8" ).each(function() {
			patternName = $(this).attr("pattern-name");
			block8Id++;
			blockId = "block8SytemId" + block8Id;
			$(this).addClass(blockId);
			
			bgProperty = "background-image: url('voskan-assets/patterns/" + patternName + "');";
			$('head').append('<style>.' + blockId + ':after{' + bgProperty + '}</style>');
		
			if($(this).attr("pattern-opacity") != undefined){
				opacityProperty = "opacity:" + $(this).attr("pattern-opacity") + ";";
				$('head').append('<style>.' + blockId + ':after{' + opacityProperty + '}</style>');
			}
			
			if($(this).attr("pattern-color") != undefined){
				backgroundProperty = "background:" + $(this).attr("pattern-color") + ";";
				$('head').append('<style>.' + blockId + '{' + backgroundProperty + '}</style>');
			}
			
	});
	}
	
	//Activate waypoint dependency for block 1
	$('.line').each(function(i, obj) {
		var waypoint = new Waypoint({
			element: document.getElementById("block1-" + i),
			handler: function(direction) {
				$("#block1-" + i).css("width", $(obj).attr("lwidth"));
			},
			offset: "bottom-in-view"
		});
	});

	
	//Use the fade effect on the block
	$('#block-5-style-2 > div').fadeLoop({fadeIn: 6000, stay: 3000, fadeOut: 6000});
	
	// Activate stellar
	$(window).stellar({
		horizontalScrolling: false,
		responsive: true
	});

});