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

//executes flexslider
$(window).load(function() {
  $('.flexslider').flexslider({
    animation: "slide"
  });

  //cover style images in slides
  $('.slide-image').resizeToParent();

});

//hero container to window height
$(document).ready(function() {
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.hero-container').css('height', windowHeight);
  };
  setHeight();
  
  $(window).resize(function() {
    setHeight();
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
});