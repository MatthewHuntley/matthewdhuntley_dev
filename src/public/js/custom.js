$(document).ready(function () {
    $('.navbar-header').click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click()
            .css('background-color', 'background-color: rgba(30,33,31,1)');
        }
    });

    //Disappear navbar more quickly/smoothly
    $('.dropdown-menu').click(function() {
       $('#navbar').hide();
    });

    //Add active state to nav bar options
    $(".navbar").find("a").each(function () {
      //If the url == window.location, add the class "active" to "this" (url)
      this.href == window.location && $(this).addClass("active");
    });
    $(".active").parents(".navbar li").addClass("active-top");

    //Slick carousel
    $('.slick-carousel').slick({
      autoplay: true,
      autoplaySpeed: 3500,
      adaptiveHeight: true,
      dots: true,
      fade: true,
      infinite: true,
      speed: 750,
      slidesToShow: 1,
      slidesToScroll: 1
    });

    //Show current year for footer copyright section
    document.getElementById('copyright-year').appendChild(document.createTextNode(new Date().getFullYear()))
});