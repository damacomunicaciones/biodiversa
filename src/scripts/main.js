// Google Fonts
WebFont.load({
  google: {
    families: ['Lato:100,100i,300,300i,400,400i,700,700i,900,900i']
  }
});

// Header scroll color

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
    if (scroll >= 500) {
        $("#headerMain").addClass("headerScroll");
    } else {
      $("#headerMain").removeClass("headerScroll");
    }
});

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
    if (scroll <= 500) {
      $(".up-arrow").fadeOut(500);
    } else {
      $(".up-arrow").fadeIn(500);
    }
});

// Nav mobile
$('#toggle').click(function() {
  $(this).toggleClass('active');
  $('#headerFullScreen').toggleClass('open');
});
$('.headerFullScreen nav ul li a').click(function() {
  $('#toggle').toggleClass('active');
  $('.headerFullScreen').toggleClass('open');
});

// Wow js
var wow = new WOW(
  {
    boxClass: 'a',
    // animated element css class (default is wow)
    animateClass: 'animated',
    // animation css class (default is animated)
    offset: 0,
    // distance to the element when triggering the animation (default is 0)
    mobile: true,
    // trigger animations on mobile devices (default is true)
    live: true,
    // act on asynchronously loaded content (default is true)
    callback: function(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null,
    // optional scroll container selector, otherwise use window,
    resetAnimation: true,
    // reset animation on end (default is true)
  }
);

wow.init();

// Smooth scroll
// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
    &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

// Validate form
$("#form").validate({
  rules: {
    name: {
      required: true,
    },
    email: {
      required: true,
      email: true,
    },
    tel: {
      required: true,
    },
    message: {
      required: true,
    }
  },
  messages: {
    name: "Por favor ingresa tu nombre.",
    email: "Por favor ingresa tu correo electrónico.",
    tel: "Por favor ingresa tu teléfono de contacto.",
    message: "Por favor escribe tu mensaje."
  }
});
