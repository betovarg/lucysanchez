//Falta:
// despausar el slider al volver arriba
// recalcular imagen cuando se carga por primera vez, no se ve bien cuando carga en monitores pequeños
// js para carga condicional de imagenes

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
    animationSpeed: 1500,
    useCSS: true, 
    touch: true,
    pauseOnAction: true,
    controlNav: false,
  });

	//lazy loading thumbnails
	//$(".gallery img").unveil(1, function() {
	//  $(this).load(function() {
	//    this.style.opacity = 1;
	//  });
	//});

	//hero container to window height
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.hero-container').css('height', windowHeight);
  };
  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });

  //cover style images in slides
  $('.slide-image').resizeToParent();


});

// hides slideshow next button on click
$(function() {                       //run when the DOM is ready
  $(".slides-go-down a").click(function() {  //use a class, since your ID gets mangled
    $(".flex-next").addClass("hide");      //add the class to the clicked element
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

