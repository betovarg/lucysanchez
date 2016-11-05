// Scroll Anclas
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
})

$(document).ready(function() {

  //executes flexslider
  $('.flexslider').flexslider({
    animation: "slide",
    slideshowSpeed: 4000,
    animationSpeed: 1000,
    useCSS: true, 
    touch: true,
    pauseOnAction: true,
    controlNav: false,
    easing: 'easeInOutCubic',
  });

	//hero container to window height
	//https://j.eremy.net/set-element-height-to-viewport/
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.hero-container').css('height', windowHeight);
  };
  
  setHeight();
  $('.flexslider').resize();
  // $('.slide-image').resizeToParent();

  /*$(window).resize(function() {
    setHeight();
  });*/

  $(window).trigger('resize');


  // show - hide the complete gallery
  $(".show-gal").click(function() {
    $(".gallery").removeClass("section-collapsed");         //add the class to the clicked element
    $(".show-gal").addClass("hide");
  });
});


// hides slideshow next button on click
$(function() {                       					//run when the DOM is ready
  $(".slides-go-down a").click(function() {  	//use a class, since your ID gets mangled
    $(".flex-next").addClass("hide");      		//add the class to the clicked element
  });
});

// back to top
$(document).scroll(function () {
    //Show element after user scrolls 800px
    var y = $(this).scrollTop();
    if (y > 500) {
        $('.back-to-top').addClass("visible");
    } else {
        $('.back-to-top').removeClass("visible");
    }
    if (y > 500) {
			$('.flexslider').flexslider("pause");
    //else {
    //  $('.flexslider').flexslider("play");
    }
		if (y < 1) {
			$(".flex-next").removeClass("hide");
		}
});

// on window resize... do this... 
$(window).on('resize', function() {
  //cover style images in slides
  //https://github.com/levymetal/jquery-resize-image-to-parent
  $('.slide-image').resizeToParent();
}).trigger('resize'); /// ( but also... trigger that event once... right when page loads.)

//Lightbox added to desktop, no lilghtbox on mobile
var lightboxOnResize = function lightboxOnResize() {
    if ($(window).width() > 599) {
        $('a.nolightbox')
            .attr('data-lightbox', 'gallery')
            .removeClass('nolightbox');
    }
}

$(document).ready(lightboxOnResize);
$(window).resize(lightboxOnResize);

// waypoints
$(function() {
  $('.store').waypoint(function() {
    $(this).addClass("block-active");
  }, { offset: '70%' });
});

//products
$(document).ready(function(){
  // abre info de envios
  $(".open-shipping").click(function(){
    $(".shipping-info").addClass("visible-item");
  });
  $(".shipping-info .close").click(function(){
    $(".shipping-info").removeClass("visible-item");
  });

});