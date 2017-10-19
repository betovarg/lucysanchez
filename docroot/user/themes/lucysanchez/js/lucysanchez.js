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
