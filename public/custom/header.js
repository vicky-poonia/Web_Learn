// /* Script on resize
// ------------------------------------------------------------------------------*/
$(window).on("resize",function () {
  var tagMobile = $(".dropdown-menu");
  if (tagMobile.parent().is(".mobile-nav")) {
    tagMobile.unwrap();
  }

//   // responsive Mobile menu script
  if ($(window).width() < 1024) {
    // tagMobile.wrap('<div class="mobile-nav"></div>');

    // $(".mobile-mode").removeClass("show");

    // $(".hamburger").on("click",function () {
    //   $("body").addClass("no-scroll");
    //   $(".mobile-mode").addClass("show");
    //   $(".mobile-nav").addClass("open");
    //   $(".dashboard-menu").addClass("open");
    // });

    // mobile menu close to click on close button
    // $(".mobile-nav .btn-close").on("click",function () {
    //   $("body").removeClass("no-scroll");
    //   $(".mobile-nav").removeClass("open");
    //   $(".mobile-mode").removeClass("show");
    // });

    // mobile menu backdrop close script
    $(".backdrop").on("click",function () {
      $(".mobile-nav").addClass("open");
      $(".mobile-nav").removeClass("open");
      $(this).removeClass("active");
      $(this).css({ opacity: "0", "z-index": "-1", visibility: "hidden" });
    });

    // mobile menu close to click on close button script
    $(".mobile-nav-close").on("click",function () {
      $(".mobile-nav").removeClass("open");
      $(".backdrop").css({ opacity: "0", "z-index": "-1", visibility: "hidden" });
    });

    // Menu Back button script
    $("body").on("click", ".back-btn", function (e) {
      $(this).parent().removeClass("drawer");
      $(this).parent().removeClass("show");
      $(this).parent().addClass("hide");
      $(this).parents(".back-btn").remove();
      $(this).parent().css({ right: "-350px" });
      e.preventDefault();
    });
  }

//     // Menu click script
//     $(".list-menu > li").on("click",function () {
//       $(this).addClass("active");
//       if ($(this).hasClass("active")) {
//         $(this).siblings().removeClass("active");
//         $(this).children("ul").addClass("drawer").removeClass("hide");
//         $(this).children("ul").addClass("drawer").addClass("show");

//         if (!$(this).children().children(".back-btn").length) {
//           $(this).children("ul").prepend('<div class="back-btn"><i class="icon-font-arrow-right"></i>Menu</div>');
//         }
//         $(this).find("ul").first().css({ right: "0" });
//       }
//     });

//     $("li").on("click", function (event) {
//       var div_elem = document.createElement("div");
//       var text = $(this).children("a").text();
//       var txt_node = document.createTextNode(`All ${text}`);
//       $(div_elem).attr("class", "new_li");
//       div_elem.appendChild(txt_node);

//       if (!$(this).find(".submenu").children(".new_li").length) {
//         $(this).find(".submenu .back-btn").eq(0).after(div_elem);
//       }
//     });
//   } else {
//     setTimeout(() => {
//       $(".mobile-nav").removeClass("open");
//       $(".mobile-mode").removeClass("show");
//       // Menu Desktop script
//       $(".list-menu > li").find("ul").css({ display: "none" });

//       // Menu Hover Script
//       $(".dropdown-menu").addClass("desktop");
//       if ($(".dropdown-menu").hasClass("desktop")) {
//         $(".list-menu > li").on("hover",
//           function () {
//             $(this).addClass("active");
//             if ($(this).hasClass("active")) {
//               $(this).siblings().children("ul").removeClass("drawerer").hide();
//               $(this).siblings().removeClass("active");
//               $(this).children("ul").addClass("drawerer").show();
//               $(this).children("a").css({ color: "#F06421" });
//               $(this).siblings().children("a").css({ color: "" });

//               if ($(this).children("ul").children("li").find("ul").length > 0) {
//                 $(this).children("ul").css({ "border-right": "1px solid #E7ECED" });
//                 $(this).siblings().children("ul").css({ "border-right": "1px solid #E7ECED" });
//                 $(this).children("ul").children("li").find("ul").css({ "margin-left": "1px" });
//               } else {
//                 $(this).children("ul").css({ "border-right": "none" });
//                 $(this).siblings().children("ul").css({ "border-right": "none" });
//                 $(this).children("ul").children("li").find("ul").css({ "margin-left": "0" });
//               }
//               if ($(this).find("ul").length) {
//                 $(this).find(".detail:after").css({ background: "#000" });
//               }
//             }
//           },
//           function () {
//             $(this).removeClass("active");
//             $(this).children("a").css({ color: "" });
//           }
//         );
//       }
//     }, 1000);
//   }

// });


// $(document).on("ready",function(){
//   $(function () {
// 		$("header .btn-dropdown").on("click", function (e) {
// 			$('body').removeClass('header-search-open');
// 			$('body').removeClass('no-scroll');
// 			$(".icon-font-search").removeClass("active");
// 			$('.header-search').removeClass('active');
// 			$('.header-search').removeClass('show-content');
// 			$('.dropdown-platform').removeClass('open');

// 			if ($('.dropdown-menu').hasClass('open')) {
// 				$('.dropdown-menu').removeClass('open');
// 			}
// 			else {
// 				$('.dropdown-menu').addClass('open');
// 			}

// 			e.stopPropagation();
// 		});

// 		var result = $(".dropdown-menu, .btn-dropdown");
// 		$(document).on("click", function (e) {
// 			if ((result[0] != e.target) && (!result.has(e.target).length)) {
// 				$(".dropdown-menu").removeClass("open");
// 				$(".dropdown-menu div, .dropdown-menu ul").removeClass("current");
// 				$('.dropdown-menu ul li').children('a').removeClass('active');
// 			}
// 		});
// 	});

// 	// btn-dropdown-plate Desktop and Mobile Both 
// 	$(function () {
// 		$("header .btn-dropdown-plate").on("click", function (e) {
// 			$('body').removeClass('header-search-open');
// 			$('body').removeClass('no-scroll');
// 			$(".icon-font-search").removeClass("active");
// 			$('.header-search').removeClass('active');
// 			$('.header-search').removeClass('show-content');
// 			$('.dropdown-menu').removeClass('open');

// 			if ($('.dropdown-platform').hasClass('open')) {
// 				$('.dropdown-platform').removeClass('open');
// 			}
// 			else {
// 				$('.dropdown-platform').addClass('open');
// 			}

// 			e.stopPropagation();
// 		});

// 		var result = $(".dropdown-platform, .btn-dropdown-plate");
// 		$(document).on("click", function (e) {
// 			if ((result[0] != e.target) && (!result.has(e.target).length)) {
// 				$(".dropdown-platform").removeClass("open");
// 				$(".dropdown-platform div, .dropdown-menu ul").removeClass("current");
// 				$('.dropdown-platform ul li').children('a').removeClass('active');
// 			}
// 		});
// 	});
// })


// $(document).on("ready",function () {
//   /* ------ header Scripts ------ */
//   // user-login-block open backdrop
//   if ($(window).width() < 1023) {
//     $(".user-block figure").on("click",function () {
//       $(this).parents(".user-block").addClass("open");
//       $("body").addClass("no-scroll");
//     });
//     $(".user-block .btn-close").on("click",function () {
//       $(this).parents(".user-block").removeClass("open");
//       $("body").removeClass("no-scroll");
//     });
//   }

//   // Notification-menu script
//   $(".user-login-block .icon-notification").on("click", function () {
//     $(".notification-menu").toggleClass("open");
//   });
//   //when click outside user-login-block
//   var notification = $(".notification-menu, .icon-notification");
//   $("#wrapper").click(function (e) {
//     if (notification[0] != e.target && !notification.has(e.target).length) {
//       $(".notification-menu").removeClass("open");
//     }
//   });

//   //'search result' will show only 8 search items elements
//   $(".header-search ul li").hide();
//   $(".header-search .content ul").each(function () {
//     $(this).children("li:lt(8)").show();
//   });

//   // seach-box closed when click close-button
//   $(".header-search .icon-close").on("click", function () {
//     $(".header-search").removeClass("active");
//     $(".icon-search").removeClass("active");
//     $("body").removeClass("header-search-open");
//     $("body").removeClass("no-scroll");
//   });

//   // search-box will open when click search icon
//   // $('header .icon-search').on('click', function(){
//   // 	if($(this).hasClass("active")){
//   // 		$(this).removeClass("active");
//   // 		$('.header-search').removeClass('active');
//   // 		$('.header-search').removeClass('show-content');
//   // 		$('body').removeClass('header-search-open');
//   // 		$('body').removeClass('no-scroll');
//   // 	}
//   // 	else{
//   // 		$(this).addClass("active");
//   // 		$('.header-search').addClass('active');
//   // 		$('body').addClass('header-search-open');
//   // 		$('body').addClass('no-scroll');
//   // 		// add any text in 'inputbox' then show a search content
//   // 		$('.header-search input[type="text"]').keyup(function(){
//   // 			if ($(this).val().length == 0) {
//   // 				$('.header-search').removeClass('show-content');
//   // 			}
//   // 			else{
//   // 				$('.header-search').addClass('show-content');
//   // 			}
//   // 		});
//   // 	}
//   // });

//   //when click outside icon-search
//   var search = $(".icon-search, .header-search");
//   $("#wrapper").on("click",function (e) {
//     if (search[0] != e.target && !search.has(e.target).length) {
//       $(".icon-search").removeClass("active");
//       $(".header-search").removeClass("active");
//       $(".header-search").removeClass("show-content");
//       $("body").removeClass("header-search-open");
//     }
//   });

//   // All course menu script
//   // click couse btn and open course-dropdown, click outside dropdown to close this
//   // close the mobile menu and overlay on click outside the box
//   var hamburger = $(".hamburger, .dropdown-menu, .dashboard-menu ");
//   $("#wrapper").on("click",function (e) {
//     if (hamburger[0] != e.target && !hamburger.has(e.target).length) {
//       $(".mobile-mode").removeClass("show");
//       $(".mobile-nav").removeClass("open");
//       $(".dashboard-menu").removeClass("open");
//     }
//   });

  // $(".list-menu > li").each(function (i, obj) {
  //   if ($(this).children("ul").length > 0) {
  //     $(this).find(".list-title").children(".icon-font-submenu-arrow").show();
  //   } else {
  //     $(this).find(".list-title").children(".icon-font-submenu-arrow").hide();
  //   }
  // });

//   // responsive Mobile menu script
//   var tagMobile = $(".dropdown-menu");

//   if ($(window).width() < 1024) {
//     tagMobile.wrap('<div class="mobile-nav"></div>');

//     $(".hamburger").on("click",function () {
//       $("body").addClass("no-scroll");
//       $(".mobile-mode").addClass("show");
//       $(".mobile-nav").addClass("open");
//       $(".dashboard-menu").addClass("open");
//     });

//     // mobile menu close to click on close button
//     $(".mobile-nav .btn-close").on("click",function () {
//       $("body").removeClass("no-scroll");
//       $(".mobile-nav").removeClass("open");
//       $(".mobile-mode").removeClass("show");
//     });

//     // mobile menu backdrop close script
//     $(".backdrop").on("click",function () {
//       $(".mobile-nav").addClass("open");
//       $(".mobile-nav").removeClass("open");
//       $(this).removeClass("active");
//       $(this).css({ opacity: "0", "z-index": "-1", visibility: "hidden" });
//     });

//     // mobile menu close to click on close button script
//     $(".mobile-nav-close").on("click",function () {
//       $(".mobile-nav").removeClass("open");
//       $(".backdrop").css({ opacity: "0", "z-index": "-1", visibility: "hidden" });
//     });

//     // Menu Back button script
//     $("body").on("click", ".back-btn", function (e) {
//       $(this).parent().removeClass("drawer");
//       $(this).parent().removeClass("show");
//       $(this).parent().addClass("hide");
//       $(this).parents(".back-btn").remove();
//       $(this).parent().css({ right: "-350px" });
//       e.preventDefault();
//     });

//     // Menu click script
//     $(".list-menu > li .icon-font-submenu-arrow").click(function () {
//       $(this).parent(".list-title").parent().addClass("active");
//       if ($(this).parent(".list-title").parent().hasClass("active")) {
//         $(this).siblings().removeClass("active");
//         $(this).children("ul").addClass("drawer").removeClass("hide");
//         $(this).children("ul").addClass("drawer").addClass("show");

//         if (!$(this).parent(".list-title").parent().children().children(".back-btn").length) {
//           $(this).parent(".list-title").parent().children("ul").prepend('<div class="back-btn"><i class="icon-font-arrow-right"></i>Menu</div>');
//         }
//         $(this).parent(".list-title").parent().find("ul").first().css({ right: "0" });
//       }
//     });

//     $("li").on("click", function (event) {
//       var div_elem = document.createElement("div");
//       var text = $(this).children(".list2-title a").text();
//       var txt_node = document.createTextNode(`All ${text}`);
//       $(div_elem).attr("class", "new_li");
//       div_elem.appendChild(txt_node);

//       if (!$(this).find(".submenu").children(".new_li").length) {
//         $(this).find(".submenu .back-btn").eq(0).after(div_elem);
//       }
//     });
//   } else {
//     // Menu Desktop script
//     $(".list-menu > li").find("ul").css({ display: "none" });

//     // Menu Hover Script
//     $(".dropdown-menu").addClass("desktop");
//     if ($(".dropdown-menu").hasClass("desktop")) {
//       $(".list-menu > li").on("hover",
//         function () {
//           $(this).addClass("active");
//           if ($(this).hasClass("active")) {
//             $(this).siblings().children("ul").removeClass("drawerer").hide();
//             $(this).siblings().removeClass("active");
//             $(this).children("ul").addClass("drawerer").show();
//             $(this).children("a").css({ color: "#F06421" });
//             $(this).siblings().children("a").css({ color: "" });

//             if ($(this).children("ul").children("li").find("ul").length > 0) {
//               $(this).children("ul").css({ "border-right": "1px solid #E7ECED" });
//               $(this).siblings().children("ul").css({ "border-right": "1px solid #E7ECED" });
//               $(this).children("ul").children("li").find("ul").css({ "margin-left": "1px" });
//             } else {
//               $(this).children("ul").css({ "border-right": "none" });
//               $(this).siblings().children("ul").css({ "border-right": "none" });
//               $(this).children("ul").children("li").find("ul").css({ "margin-left": "0" });
//             }
//             if ($(this).find("ul").length) {
//               $(this).find(".detail:after").css({ background: "#000" });
//             }
//           }
//         },
//         function () {
//           $(this).removeClass("active");
//           $(this).children("a").css({ color: "" });
//         }
//       );
//     }
//   }
//   /* ------ End header Scripts ------ */
});
