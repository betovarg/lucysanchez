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

$(document).ready(function() {
  // show - hide the complete gallery
  $(".show-gal").click(function() {
    $(".gallery-section-aligner").removeClass("section-collapsed");         //add the class to the clicked element
    $(".show-gal").addClass("hide");
  });
  // show - hide the complete store
  $(".show-store").click(function() {
    $(".store-section-aligner").removeClass("section-collapsed");         //add the class to the clicked element
    $(".show-store").addClass("hide");
  });
  // show bank accounts popup
  $(".open-bank-account").click(function() {
    $(".bank-accounts-popup").removeClass("hide");         //add the class to the clicked element
  });
  // hide bank accounts popup
  $(".bank-accounts-close").click(function() {
    $(".bank-accounts-popup").addClass("hide");         //add the class to the clicked element
  });
});

// waypoints
$(function() {
  $('.store').waypoint(function() {
    $(this).addClass("block-active");
  }, { offset: '70%' });
  // $('.epitafio-nav').waypoint(function(direction) {
  //   if (direction === 'down') {
  //     $(this).addClass("nav-sticky");
  //     $('.epitafio-columns-container').addClass("nav-sticky-margin");
  //   }
  //   else {
  //     $(this).removeClass("nav-sticky");
  //     $('.epitafio-columns-container').removeClass("nav-sticky-margin");
  //   }
  // }, { offset: '0' });
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