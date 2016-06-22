$(document).ready(function () {
    $('.navbar-header').click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click()
            .css('background-color', 'background-color: rgba(30,33,31,1)');
        }
    });

    //START HERE!
    // $(".navbar-toggle").click(function() {
    // 	var clickover = $(event.target);
    // 	if(!($('.navbar-toggle').hasClass("navbar-toggle"))) {
    // 		$(".navbar-toggle").addClass('blah');
    // 		$(".blah").click(function() {
		  //   	console.log("Hello");
		  //   	$(".navbar-toggle").removeClass('blah');
		  //   });
    // 	}
    // });



  //   if($(".navbar-collapse").hasClass("navbar-collapse collapse in")) {
		
		// $('.navbar-toggle').click(function (event) {
		//     		console.log("Hello");
		// 		});


  //   	//$("button.navbar-toggle").css('background-color', 'background-color: rgba(30,33,31,1)');    });
  //   }

  //   $('.in').click(function() {
  //   	console.log("Hello");
  //   });

});