/* Script on scroll
------------------------------------------------------------------------------*/
$(window).scroll(function () {
  let header_height = $("header").outerHeight();
  let annoucement_height = $(".annoucement-block").outerHeight();
  if ($(document).scrollTop() >= annoucement_height) {
    $(".header-search").css("top", header_height);
    $(".mobile-header-new").css("top", header_height);
  } else {
    $(".header-search").css("top", header_height + annoucement_height);
    $(".mobile-header-new").css("top", header_height + annoucement_height);
  }
});

/* Script on resize
------------------------------------------------------------------------------*/
$(window).resize(function () {
  // Dashboard pages Tabs
  let w_dthr = $(window).width() - 15;
  let tab_width = $(".wrapper-list .tab_list").outerWidth();

  if (tab_width == w_dthr) {
    $(".wrapper-list .previous").show();
    $(".wrapper-list .next").show();
    if ($(".wrapper-list .tab_list li.resp-tab-active").is(":last-child")) {
      $(".wrapper-list .next").hide();
    } else {
      $(".wrapper-list .next").show();
    }
    if ($(".wrapper-list .tab_list li.resp-tab-active").is(":first-child")) {
      $(".wrapper-list .previous").hide();
    } else {
      $(".wrapper-list .previous").show();
    }
    $(".wrapper-list .tab_list li").click(function () {
      if ($(this).is(":last-child")) {
        $(".wrapper-list .next").hide();
      } else {
        $(".wrapper-list .next").show();
      }
      if ($(this).is(":first-child")) {
        $(".wrapper-list .previous").hide();
      } else {
        $(".wrapper-list .previous").show();
      }
    });
  } else {
    $(".wrapper-list .previous").hide();
    $(".wrapper-list .next").hide();
  }
});

// ppc banner------------------------------------------------------------------
if (document.querySelector(".exclusive-banner") !== null) {
  /* timer in prices-going-banner
  ------------------------------------------------------------------------------*/
  var endTime = new Date("10 June 2023 11:00:00 GMT+5:30");
  endTime = Date.parse(endTime) / 1000;

  var now = new Date();
  now = Date.parse(now) / 1000;

  var timeLeft = endTime - now;

  let days = 9;
  // let days = Math.floor(timeLeft / 86400);
  let hours = Math.floor((timeLeft - days * 86400) / 3600);
  let minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
  let seconds = Math.floor(timeLeft - days * 86400 - hours * 3600 - minutes * 60);

  let totalSeconds = days * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds;

  let tempSeconds = totalSeconds;

  const convert = (value, inSeconds) => {
    if (value > inSeconds) {
      let x = value % inSeconds;
      tempSeconds = x;
      return (value - x) / inSeconds;
    } else {
      return 0;
    }
  };

  const setSeconds = (s) => {
    if(document.querySelector("#ppcsec") != null)
    {
      document.querySelector("#ppcsec").textContent = s + "";
    }
  };

  const setMinutes = (m) => {
    if(document.querySelector("#ppcmin") !=null)
    {
      document.querySelector("#ppcmin").textContent = m + "";
    }
   
  };

  const setHours = (h) => {
    if(document.querySelector("#ppchou") != null)
    {
      document.querySelector("#ppchou").textContent = h + "";
    }
  };

  const setDays = (d) => {
    if(document.querySelector("#ppcday") !=null)
    {
      document.querySelector("#ppcday").textContent = d + "";
    }
  
  };

  var x = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(x);
    }
    setDays(convert(tempSeconds, 24 * 60 * 60));
    setHours(convert(tempSeconds, 60 * 60));
    setMinutes(convert(tempSeconds, 60));
    setSeconds(tempSeconds == 60 ? 59 : tempSeconds);
    totalSeconds--;
    tempSeconds = totalSeconds;
  }, 1000);
}

// -------------------------------------------------------------------------------
/* Script on load
------------------------------------------------------------------------------*/
$(window).on("load",function () {
  // catagory page fancy scroll
  // $(".modal-preview-course .course-content").mCustomScrollbar({
  //   axis: "y",
  //   autoHideScrollbar: true,
  // });

  // $(".modal-select-course .modal-content").mCustomScrollbar({
  //   axis: "y",
  //   autoHideScrollbar: true,
  // });

  // $(".modal-online-course-preview .video-list .list-block").mCustomScrollbar({
  //   axis: "y",
  //   autoHideScrollbar: true,
  // });

  /*// Dashboard Connections page (tab Message) chat-bar scroll script
  $(".dashboard-page .chat-sidebar .contact-list").mCustomScrollbar({
    axis:"y",
    autoHideScrollbar: true
  });

  // Dashboard Connections page (tab Message) scroll script
  $(".dashboard-page .connection-page .chat-area").mCustomScrollbar({
    axis:"y",
    autoHideScrollbar: true
  });*/

  // write a review page get left-column-height and set into right-column
  let left_height = $(".write-review-page .left-column").outerHeight();
  $(".write-review-page .right-column").css("max-height", left_height);

  // Dashboard pages Tabs
  let w_dthr = $(window).width();
  let tab_width = $(".wrapper-list .tab_list").outerWidth(true);
  if (tab_width == w_dthr) {
    $(".wrapper-list .previous").hide();

    if ($(".wrapper-list .tab_list li.resp-tab-active").is(":last-child")) {
      $(".wrapper-list .next").hide();
    } else {
      $(".wrapper-list .next").show();
    }
    if ($(".wrapper-list .tab_list li.resp-tab-active").is(":first-child")) {
      $(".wrapper-list .previous").hide();
    } else {
      $(".wrapper-list .previous").show();
    }

    $(".wrapper-list .tab_list li").click(function () {
      if ($(this).is(":last-child")) {
        $(".wrapper-list .next").hide();
      } else {
        $(".wrapper-list .next").show();
      }
      if ($(this).is(":first-child")) {
        $(".wrapper-list .previous").hide();
      } else {
        $(".wrapper-list .previous").show();
      }
    });
  } else {
    $(".wrapper-list .previous").hide();
    $(".wrapper-list .next").hide();
  }

  // hide all contents accept from the first div
  $(".wrapper-list .tab_list li").click(function () {
    var position = $(this).position();
    var corresponding = $(this).data("id");

    // scroll to clicked tab with a little gap left to show previous tabs
    scroll = $(".wrapper-list .tab_list").scrollLeft();
    $(".wrapper-list .tab_list").animate(
      {
        scrollLeft: scroll + position.left - 130,
      },
      600
    );

    // remove active class from currently not active tabs
    $(".wrapper-list .tab_list li").removeClass("active");

    // add active class to clicked tab
    $(this).addClass("active");
  });

  $(".wrapper-list .next").click(function (e) {
    e.preventDefault();
    $(".tab_list li.resp-tab-active").next("li").trigger("click");
  });
  $(".wrapper-list .previous").click(function (e) {
    e.preventDefault();
    $(".tab_list li.resp-tab-active").prev("li").trigger("click");
  });
});

/* Script on ready
------------------------------------------------------------------------------*/
$(document).ready(function () {
  // If body have a 'header-search-open' class then disable body scroll
  $("body").on("click", function () {
    if ($("body").hasClass("header-search-open")) {
      $("body").addClass("no-scroll");
    }
  });

  // moreless-button in index-page brands-block section
  $(".moreless-button").click(function () {
    $(".more-slide").slideToggle();
    if ($(".moreless-button").text() == "View More") {
      $(this).text("View less");
    } else {
      $(this).text("View More");
    }
  });

  $(".moreless-button").on("click", function () {
    $(".more-logo").toggleClass("space");
  });

  // no-scroll class remove
  var no_scroll = $(
    ".hamburger, .dropdown-menu, .dashboard-menu, .user-block, .user-profile-menu, .cart-list-menu, .icon-search, .header-search"
  );
  $("#wrapper").click(function (e) {
    if (no_scroll[0] != e.target && !no_scroll.has(e.target).length) {
      $("body").removeClass("no-scroll");
      $(".user-block").removeClass("open");
    }
  });

  // annoucement-block script
  $(".annoucement-block .icon-font-cross").click(function () {
    $(this).parent().parent().slideUp(300);
    $("header").css("top", "0");

    // find 'header' height and put 'header-search' Top
    let header_height = $("header").outerHeight();
    $(".header-search").css("top", header_height);
  });

  /* ------ Modal Scripts ------ */
  // Modal close when click close icon or cancel-button
  $(".modal .icon-close, .modal .cancel").on("click", function () {
    var bodyClass = $("body").attr("class");
    $("body").attr("class", "");
    var classArr = bodyClass.split(" ");
    for (var i = 0; i < classArr.length; i++) {
      if (classArr[i].substr(0, 10) != "open-modal") {
        $("body").addClass(classArr[i]);
      }
    }
    if ($(".modal .modal-inner .modal-container").css("transform", "translateY(0)")) {
      $(".modal .modal-inner .modal-container").css("transform", "translateY(-10px)");
      setTimeout(() => {
        $(".modal .modal-inner .modal-container").css("transform", "translateY(10px)");
      }, 500);
    }

    // video pause script
    $("#video").attr("src", $("#video").attr("src"));
  });

  // Modal closed when click outside the modal
  $(".modal").on("click", function (e) {
    if ($(e.target).closest(".modal-container").length === 0) {
      var bodyClass = $("body").attr("class");
      $("body").attr("class", "");
      // console.log($("body").attr("class"),'$("body").attr("class")')
      var classArr = bodyClass.split(" ");
      for (var i = 0; i < classArr.length; i++) {
        if (classArr[i].substr(0, 10) != "open-modal") {
          $("body").addClass(classArr[i]);
        }
      }
      if ($(".modal .modal-inner .modal-container").css("transform", "translateY(0)")) {
        $(".modal .modal-inner .modal-container").css("transform", "translateY(-10px)");
        setTimeout(() => {
          $(".modal .modal-inner .modal-container").css("transform", "translateY(10px)");
        }, 500);
      }

      // video pause script
      $("#video").attr("src", $("#video").attr("src"));
    }
  });

  // Body have a class starting with 'open-modal' then animate and disable body scroll
  $("body").on("click", function () {
    if ($("body").is('*[class^="open-modal"]')) {
      if ($(".modal .modal-inner .modal-container").css("transform", "translateY(10px)")) {
        $(".modal .modal-inner .modal-container").css("transform", "translateY(0)");
      }
    }
  });

  // notify modal open script
  // $(".btn-notify").on("click", function () {
  //   $("body").addClass("open-modal-notify");
  // });

  //signup modal open script
  $("header .link-signup").on("click", function () {
    $("body").addClass("open-modal-signup");
  });
  $(".dropdown-menu .btn-signup").on("click", function () {
    $("body").removeClass("no-scroll");
    $(".mobile-mode").removeClass("show");
    $(".mobile-nav").removeClass("open");
    $("body").addClass("open-modal-signup");
  });

  //login modal open script
  $("header .link-signin").on("click", function () {
    $("body").addClass("open-modal-login");
  });
  $(".dropdown-menu .btn-login").on("click", function () {
    $("body").removeClass("no-scroll");
    $(".mobile-mode").removeClass("show");
    $(".mobile-nav").removeClass("open");
    $("body").addClass("open-modal-login");
  });

  //in modal-account click 'signup-link' then open 'signup-modal' script
  $(".modal-account .link-signup").on("click", function () {
    $("body").removeClass("open-modal-login");
    $("body").removeClass("open-modal-pass-saved");
    $("body").addClass("open-modal-signup");
  });

  //in modal-account click 'signin-link' then open 'signin-modal' script
  $(".modal-account .link-login").on("click", function () {
    $("body").removeClass("open-modal-signup");
    $("body").removeClass("open-modal-pass-reset");
    $("body").addClass("open-modal-login");
  });

  //in modal-account click 'forgot-password' then open 'pass-reset' modal script
  $(".modal-account .forgot-password").on("click", function () {
    $("body").removeClass("open-modal-login");
    $("body").removeClass("open-modal-pass-saved");
    $("body").addClass("open-modal-pass-reset");
  });

  // modal-preview-course in categoty-page script
  $(".course-listing .course-preview").on("click", function () {
    $("body").addClass("open-modal-preview-course");
  });

  // modal-preview-course in product-page script
  $(".product-banner .course-img").on("click", function () {
    if(this.classList.contains("blank")) {
      return
    }
    $("body").addClass("open-modal-preview-course");
  });


  // modal-review-video on product page script
  $(".product-page .video-review figure").on("click", function () {
    $("body").addClass("open-modal-review-video");
  });

  // modal-review-video on product page script
  $(".product-page .benifits-block .btn-preview").on("click", function () {
    $("body").addClass("open-modal-online-course-preview");
  });

  // modal-reccomend in cart-page script
  $(".reccomend-click").on("click", function () {
    $("body").addClass("open-modal-recommend-frnd");
  });

  // modal-download-whizcard in product-page script
  $(".CSAA-whizCardsBlock .right .btn-downloadWhizCard").on("click", function () {
    $("body").addClass("open-modal-download-whizcard");
  });

  // modal-review-video in review-page script
  $(".review-page .video-review figure").on("click", function () {
    $("body").addClass("open-modal-review-video");
  });

  // modal-review-video in review-page script
  $(".review-banner .img-block").on("click", function () {
    $("body").addClass("open-modal-review-video");
  });

  // modal-aws-certificate in review-page script
  // $(".review-banner .btn-write-review").on("click", function () {
  //   $("body").addClass("open-modal-select-course");
  // });

  // modal-aws-certificate in review-page script
  $(".review-page .certificate-img").on("click", function () {
    $("body").addClass("open-modal-aws-certificate");
  });

  // modal-aws-consulting in aws-consulting-page script
  $(".banner-aws-consulting .btn-consultation").on("click", function () {
    $("body").addClass("open-modal-request-consultation");
  });

  // modal-report in Dashboard(training) page script
  $(".dashboard-page .tranning-page .certificate-block figure").on("click", function () {
    $("body").addClass("open-modal-certificate");
  });
  $(".dashboard-page .tranning-page .certificate-block .name").on("click", function () {
    $("body").addClass("open-modal-certificate");
  });

  //  modal-order-details in Dashboard(Account-setting) page script
  $(".dashboard-page .acc-setting-page .link-view").on("click", function () {
    $("body").addClass("open-modal-order-details");
  });

  // modal-connection-first in Dashboard(connection-first-time) page script
  $(".dashboard-page .connection-first-page .btn-update").on("click", function () {
    $("body").addClass("open-modal-change-preference");
  });
  $(".dashboard-page .modal-change-preference .btn-next").on("click", function () {
    $("body").addClass("open-modal-update-profile");
    $("body").removeClass("open-modal-change-preference");
  });
  $(".dashboard-page .modal-update-profile .btn-back").on("click", function () {
    $("body").addClass("open-modal-change-preference");
    $("body").removeClass("open-modal-update-profile");
  });

  // modal-change-preference in Dashboard(connection) page tab(newtwork) script
  $(".dashboard-page .user-connections .change-preference").on("click", function () {
    $("body").addClass("open-modal-change-preference");
  });

  // modal-report in Dashboard(connection) page script
  $(".dashboard-page .user-connections .more-details .report").on("click", function () {
    $("body").addClass("open-modal-report");
  });

  // modal-report in Dashboard(connection) page script
  $(".dashboard-page .chat-box .report").on("click", function () {
    $("body").addClass("open-modal-report");
  });

  // modal-person-blocked in Dashboard(connection) page script
  $(".modal-report .report-content .blocked-link").on("click", function () {
    $("body").addClass("open-modal-person-blocked");
    $("body").removeClass("open-modal-report");
  });

  // modal-person-blocked in Dashboard(connection) page script
  $(".modal-report .report-content .report-profile-link").on("click", function () {
    $("body").addClass("open-modal-report-profile");
    $("body").removeClass("open-modal-report");
  });

  // modal-person-blocked in Dashboard(connection) page script
  $(".modal-person-blocked .modal-footer .btn-back").on("click", function () {
    $("body").removeClass("open-modal-person-blocked");
    $("body").addClass("open-modal-report");
  });

  // modal-person-blocked in Dashboard(connection) page script
  $(".modal-report-profile .modal-footer .btn-back").on("click", function () {
    $("body").removeClass("open-modal-report-profile");
    $("body").addClass("open-modal-report");
  });

  // modal-report in Dashboard(connection) page script
  $(".dashboard-page .wallet-page .btn-withdraw").on("click", function () {
    $("body").addClass("open-modal-withdrow-earnings");
  });

  // modal-auto-renew in Dashboard(Account Settings) page script
  $(".modal-auto-renew button.submit").on("click", function () {
    $("body").removeClass("open-modal-auto-renew");
    $(".dashboard-subscription .renewCancel-block .toggle-btn input:checked").removeAttr("checked");
    $(".dashboard-subscription .renewCancel-block .toggle-btn").addClass("desabled");
    $(".modal .modal-inner .modal-container").css("transform", "translateY(-10px)");
    setTimeout(() => {
      $(".modal .modal-inner .modal-container").css("transform", "translateY(10px)");
    }, 500);
  });

  // modal-cancel-subscription in Dashboard(Account Settings) page script
  $(".dashboard-subscription .btn-cancelSubscription").on("click", function () {
    $("body").addClass("open-modal-cancel-subscription");
  });

  /* ------ End Modal Scripts ------ */

  //---- cookies msg close script ----//

  $(".cookies-msg").addClass("open");
  $(".cookies-msg .icon-close").click(function () {
    $(".cookies-msg").addClass("close");
    $(".cookies-msg").removeClass("open");
  });
  //---- End cookies msg close script ----//

  // <----- timer script of black-friday-banner----->
  function dateTimerb() {
    //		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");
    var endTimeb = new Date("11 June 2023 11:00:00 GMT+05:30");
    endTimeb = Date.parse(endTimeb) / 1000;

    var nowb = new Date();
    nowb = Date.parse(nowb) / 1000;

    var timeLeftb = endTimeb - nowb;

    var daysb = Math.floor(timeLeftb / 86400);
    var hoursb = Math.floor((timeLeftb - daysb * 86400) / 3600);
    var minutesb = Math.floor((timeLeftb - daysb * 86400 - hoursb * 3600) / 60);
    var secondsb = Math.floor(timeLeftb - daysb * 86400 - hoursb * 3600 - minutesb * 60);

    if (hoursb < "10") {
      hoursb = "0" + hoursb;
    }
    if (minutesb < "10") {
      minutesb = "0" + minutesb;
    }
    if (secondsb < "10") {
      secondsb = "0" + secondsb;
    }

    $(".daytime2").html(daysb + "");
    $(".hourtime2").html(hoursb + "");
    $(".minutetime2").html(minutesb + "");
    $(".secondtime2").html(secondsb + "");
  }
  setInterval(function () {
    dateTimerb();
  }, 1000);

  // <----- timer script of bottom-black-friday-banner----->
  function dateTimers() {
    // day/hou/min/sec
    var endTime = new Date("30 May 2022 11:00:00 GMT+05:30");
    endTime = Date.parse(endTime) / 1000;

    var now = new Date();
    now = Date.parse(now) / 1000;

    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - days * 86400) / 3600);
    var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
    var seconds = Math.floor(timeLeft - days * 86400 - hours * 3600 - minutes * 60);

    if (hours < "10") {
      hours = "0" + hours;
    }
    if (minutes < "10") {
      minutes = "0" + minutes;
    }
    if (seconds < "10") {
      seconds = "0" + seconds;
    }

    $("#day").html(days + "");
    $("#hou").html(hours + "");
    $("#min").html(minutes + "");
    $("#sec").html(seconds + "");
  }
  setInterval(function () {
    dateTimers();
  }, 1000);

  // <----- timer script of bottom-life-time-banner----->
  function dateTimersLifeTimeBanner() {
    //		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");
    var endTime = new Date("29 April 2022 11:00:00 GMT+05:30");
    endTime = Date.parse(endTime) / 1000;

    var now = new Date();
    now = Date.parse(now) / 1000;

    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - days * 86400) / 3600);
    var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
    var seconds = Math.floor(timeLeft - days * 86400 - hours * 3600 - minutes * 60);

    if (hours < "10") {
      hours = "0" + hours;
    }
    if (minutes < "10") {
      minutes = "0" + minutes;
    }
    if (seconds < "10") {
      seconds = "0" + seconds;
    }

    $("#daytime3").html(days + "");
    $("#hourtime3").html(hours + "");
    $("#minutetime3").html(minutes + "");
    $("#secondtime3").html(seconds + "");
  }
  setInterval(function () {
    dateTimersLifeTimeBanner();
  }, 1000);

  $(".subscription-banner .btn-close").on("click", function () {
    $(".subscription-banner").fadeOut(300);
  });

  /* ------ Category page Scripts ------ */
  // Filterbar scripts
  // open-filterbar
  $(".category-page .course-listing .btn-filter").on("click", function () {
    $(".category-page .two-column .left-column").addClass("show");
    $(".category-page .two-column .right-part").addClass("overlay-show");
  });
  $(".category-page .filter-bar .icon-close").on("click", function () {
    $(".category-page .two-column .left-column").removeClass("show");
    $(".category-page .two-column .right-part").removeClass("overlay-show");
  });

  var filter = $(".filter-bar, .btn-filter");
  $("#wrapper").click(function (e) {
    if (filter[0] != e.target && !filter.has(e.target).length) {
      $(".category-page .two-column .left-column").removeClass("show");
      $(".category-page .two-column .right-part").removeClass("overlay-show");
    }
  });

  // First item is open default
  $(".category-page .filter-bar .item").first().addClass("open");
  if ($(".category-page .filter-bar .item").first().hasClass("open")) {
    $(".category-page .filter-bar .item").first().children(".item-content").slideDown();
  }

  $(".category-page .filter-bar .filter-name").on("click", function (event) {
    $(this).parent().toggleClass("open");
    if ($(this).parent().hasClass("open")) {
      $(this).siblings(".item-content").slideDown();
    } else {
      $(this).siblings(".item-content").slideUp();
    }
  });

  // Accordian script
  $(".accordian-block .accordian-list").on("click", ".item-head", function () {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open").next().slideUp();
    } else {
      $(this)
        .addClass("open")
        .next()
        .slideDown()
        .parents(".item")
        .siblings()
        .find(".item-head")
        .removeClass("open")
        .next()
        .slideUp();
    }
  });
  /* ------ End Category page Scripts ------ */

  /* ------ Product page Scripts ------ */
  // Messages
  $(".msg-box .icon-close").on("click", function () {
    $("body").removeClass("open-success-msg");
    $("body").removeClass("open-error-msg");
    $("body").removeClass("open-alert-msg");
  });

  // whishlist
  $(".add-whishlist").on("click", function () {
    $(this).toggleClass("active");
  });

  // training-options visa-versa script
  $(".training-options .option input").change(function () {
    let vare = $(this).parents(".option").index();
    if (this.checked) {
      $(this).parents(".option").addClass("active");
      $("#sidebar .option").eq(vare).addClass("active").children().children("input").click();
    } else {
      $(this).parents(".option").removeClass("active");
      $("#sidebar .option").eq(vare).removeClass("active").children().children("input").click();
    }
  });

  $("#sidebar .option input").change(function () {
    let vare = $(this).parents(".option").index();
    if (this.checked) {
      $(this).parents(".option").addClass("active");
      $(".training-options .option")
        .eq(vare)
        .addClass("active")
        .children()
        .children("input")
        .click();
    } else {
      $(this).parents(".option").removeClass("active");
      $(".training-options .option")
        .eq(vare)
        .removeClass("active")
        .children()
        .children("input")
        .click();
    }
  });

  // sticky sidebar
  $(function () {
    var header_height = $("header").outerHeight();
    var scroll_nav = $(".scroll-nav").outerHeight();
    if ($("#sidebar").length) {
      $("#sidebar").stick_in_parent({
        offset_top: header_height + scroll_nav + 10,
      });
    }
  });

  /* ------ End Product page Scripts ------ */

  /* ------ cart page Scripts ------ */
  // increment and decrement value
  $(".value-button").on("click", function () {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    $button.blur();
    if ($button.hasClass("btn-increase")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
  });
  /* ------ End cart page Scripts ------ */

  /* ------ checkout page Scripts ------ */
  // card tabination script
  $(".checkout-page .payment-card li").click(function () {
    if ($(this).hasClass("active")) {
      $(".payment-info .tab").removeClass("current");
    } else {
      $(this).addClass("active").siblings().removeClass("active");
      $(".payment-info .tab").addClass("current").siblings().removeClass("current");
    }

    var tab_id = $(this).attr("data-target");
    $("#" + tab_id).addClass("current");
  });

  // card number in fourletter group script
  $(".checkout-page #cardNumber").on("keyup", function (e) {
    var val = $(this).val();
    var newval = "";
    val = val.replace(/\s/g, "");
    for (var i = 0; i < val.length; i++) {
      if (i % 4 == 0 && i > 0) newval = newval.concat(" ");
      newval = newval.concat(val[i]);
    }
    $(this).val(newval);
  });
  /* ------ End checkout page Scripts ------ */

  /* ------ review page Scripts ------ */
  // click on btn 'add-comment' open comment-section script
  $(".students-review-block .total-comments").on("click", function () {
    $(this).parents(".review-content").find(".comment-section").slideToggle();
  });

  // rating filter script
  $(".review-page .review-filter ul li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  // like btn script
  $(".review-page .review-post .icon-thumb").on("click", function () {
    $(this).toggleClass("active");
  });

  // custom select box script
  var x, i, j, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName("custom-selectbox");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    if (selElmnt) {
      /*for each element, create a new DIV that will act as the selected item:*/
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /*for each element, create a new DIV that will contain the option list:*/
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < selElmnt.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
          /*when an item is clicked, update the original select box,
            and the selected item:*/
          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
  }
  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x,
      y,
      i,
      arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  /*if the user clicks anywhere outside the select box,then close all select boxes:*/
  document.addEventListener("click", closeAllSelect);
  /* ------ End review page Scripts ------ */

  /* ------ write a review page Scripts ------ */
  // Dropzone box script
  $('.drag-form input[type="file"]').change(function (e) {
    if ($("#dropzone")[0].files.length > 0) {
      var File_name = e.target.files[0].name;
      $(".upload-block .min-requirement .file-name span").text(File_name);
      $(".upload-block .min-requirement .file-name .icon").css("opacity", "1");
      $(".how-work-block .upload-block .min-requirement").show();
    }
  });
  /* ------ End write a review page Scripts ------ */

  /* -------- Aws-consulting page Scripts -------- */
  // $(".consulting-faq-block .accordian-list .item-head").on("click", function () {
  //   $(this)
  //     .parents(".accordian-block")
  //     .siblings()
  //     .find(".item-head")
  //     .removeClass("open")
  //     .next(".item-content")
  //     .slideUp();
  // });
  /* ------ End aws-consulting page Scripts ------ */

  /* ------ Dashboard page Scripts ------ */
  // Dashboard menu script
  $(".dashboard-menu .btn-close").on("click", function () {
    $(".dashboard-menu").removeClass("open");
    $("body").removeClass("no-scroll");
    $(".mobile-mode").removeClass("show");
  });
  $(".dashboard-menu .accordian-list > ul > li span").on("click", function () {
    $(this).parent().toggleClass("open").find(".sub-links").slideToggle();
    $(this).parent().siblings().removeClass("open").find(".sub-links").slideUp();
  });

  // search-filter-block script
  $(".dashboard-page .filter-options").hide();
  $(".dashboard-page .filter-block").on("click", function () {
    $(".dashboard-page .filter-options").slideToggle();
  });

  // Catagory-list heart image on off script
  $(".dashboard-page .couser-img .icon-font-heart").on("click", function () {
    $(this).toggleClass("active");
  });

  /* ------ Dashboard Account Setting page Scripts ------ */
  // datepicker script
  function drawArrow(input) {
    var $input = $(input),
      widget = $input.datepicker("widget"),
      direction;
  }
  $(".js-datepicker").datepicker({
    format: "dd.mm.yyyy",
    beforeShow: function (input, inst) {
      drawArrow(input);
    },
    onChangeMonthYear: function (a, b) {
      var $input = $(this),
        widget = $(this).datepicker("widget");
      drawArrow(this);
    },
    minDate: 0,
  });
  /* ------ End Dashboard Account page Scripts ------ */

  /* ------ Dashboard Connections page Scripts ----------*/
  // connection page preference modal script
  $(".modal-change-preference .input-box-group").hide();
  $(".modal-change-preference .anyuser").addClass("active");
  $(".modal-change-preference .anyuser").on("click", function () {
    $(this).addClass("active").siblings(".userfrom").removeClass("active");
    if ($(this).hasClass("active")) {
      $(".modal-change-preference .input-box-group").slideUp();
    }
  });
  $(".modal-change-preference .userfrom").on("click", function () {
    $(this).addClass("active").siblings(".anyuser").removeClass("active");
    if ($(this).hasClass("active")) {
      $(".modal-change-preference .input-box-group").slideDown();
    }
  });

  // connection page Message-tab script
  $(".dashboard-page .chat-sidebar .contact-list .item").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    if ($(window).width() < 641) {
      window.setTimeout(function () {
        $("body").css("overflow", "hidden");
      }, 300);
      $(".dashboard-page .chat-box")
        .addClass("open")
        .find(".btn-back")
        .on("click", function () {
          $(this).parents(".chat-box").removeClass("open");
          $("body").css("overflow", "auto");
        });
    }
  });
  /* ------ End  Dashboard Connections page Scripts ------ */

  // monthly/yearly plan toggole in subscription-page
  // ------------------------------------------------------------------------------*/

  $(".choose-plans .toggle span").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".block-group").addClass("monthly-plan").removeClass("yearly-plan");
  });

  $(".choose-plans .toggle label").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".block-group").addClass("yearly-plan").removeClass("monthly-plan");
  });

  /* ------- Dashboard Wallet page Scripts ------------*/
  $(".modal-withdrow-earnings .other-amount").on("click", function () {
    $(".modal-withdrow-earnings .amount-box").css("display", "flex");
  });
  $(".modal-withdrow-earnings .custom-radiobutton.amount").on("click", function () {
    $(".modal-withdrow-earnings .amount-box").hide();
  });
  $(".modal-withdrow-earnings .payment-options .option.paypal").on("click", function () {
    $(this).children(".input-box-group").css("display", "flex");
    $(this).siblings(".option").children(".input-box-group").hide();
  });
  $(".modal-withdrow-earnings .payment-options .option.bank").on("click", function () {
    $(this).children(".input-box-group").css("display", "flex");
    $(this).siblings(".option").children(".input-box-group").hide();
  });
  /* ------ End Dashboard Wallet page Scripts ----------*/

  /* ------ All Resposnive Tabs Scripts ------ */
  // Default Tabs script
  $("#default-tab").easyResponsiveTabs({
    type: "default", //Types: default, vertical, accordion
    width: "auto", //auto or any width like 600px
    fit: true, // 100% fit in a container
    tabidentify: "hor_1", // The tab groups identifier
    activate: function (event) {
      var $tab = $(this);
      var $info = $("#nested-tabInfo");
      var $name = $("span", $info);
      $name.text($tab.text());
      $info.show();
    },
  });

  // Product Page Faq Tabs script
  // $("#faq-tab").easyResponsiveTabs({
  //   type: "default",
  //   width: "auto",
  //   fit: true,
  //   tabidentify: "hor_1",
  //   activate: function (event) {
  //     var $tab = $(this);
  //     var $info = $("#nested-tabInfo");
  //     var $name = $("span", $info);
  //     $name.text($tab.text());
  //     $info.show();
  //   },
  // });

  // dashboard-page Tabs script
  $("#dashboard-tab").easyResponsiveTabs({
    type: "default",
    width: "auto",
    fit: true,
    tabidentify: "hor_1",
    activate: function (event) {
      var $tab = $(this);
      var $info = $("#nested-tabInfo");
      var $name = $("span", $info);
      $name.text($tab.text());
      $info.show();
    },
  });

  /* ------ Dashboard Connections page Scripts ------ */
  $(".multi-filled").tokenfield();

  //----- choosen multi-select script----- //
  $(".chosen-select").chosen();
  /* ------ End Dashboard Connections page Scripts ------ */

  /* ------ carousel slider Scripts ------ */
  // explore-catogary slider
  $(".explore-category .owl-carousel").owlCarousel({
    loop: false,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      480: {
        items: 2,
      },
      641: {
        items: 3,
      },
      700: {
        items: 3,
      },
      1024: {
        items: 4,
        margin: 15,
      },
      1140: {
        items: 5,
        margin: 15,
      },
    },
  });

  // testimonial-slider in affiliate-program-page
  $(".affiliate-program .testimonial-block .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    rewind: false,
    autoHeight: true,
    responsive: {
      0: {
        items: 1,
      },
      641: {
        items: 1,
        margin: 15,
      },
      768: {
        items: 1,
        margin: 15,
      },
      1024: {
        items: 1,
        margin: 15,
      },
      1230: {
        items: 1,
        margin: 70,
      },
    },
  });

  // testimonial-slider in aws-consulting-page
  $(".aws-consulting-page .testimonial-block .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    rewind: false,
    autoHeight: true,
    responsive: {
      0: {
        items: 1,
      },
      641: {
        items: 1,
        margin: 15,
      },
      768: {
        items: 1,
        margin: 15,
      },
      1024: {
        items: 1,
        margin: 15,
      },
      1230: {
        items: 1,
        margin: 70,
      },
    },
  });

  // testimonial-slider
  $(".testimonial-block .owl-carousel").owlCarousel({
    stagePadding: 110,
    loop: false,
    margin: 30,
    nav: true,
    dots: false,
    rewind: false,
    responsive: {
      0: {
        items: 1,
        margin: 10,
        stagePadding: 0,
      },
      641: {
        items: 1,
        margin: 10,
      },
      768: {
        items: 2,
        margin: 10,
        stagePadding: 20,
      },
      1024: {
        items: 2,
        margin: 15,
        stagePadding: 60,
      },
      1230: {
        items: 2,
      },
    },
  });

  // product-page review-slider
  $(".product-page .review-block .owl-carousel").owlCarousel({
    items: 3,
    loop: false,
    margin: 12,
    nav: true,
    dots: false,
    mouseDrag: false,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      400: {
        items: 2,
        margin: 5,
      },
      641: {
        items: 3,
        margin: 5,
      },
      1024: {
        items: 3,
        margin: 8,
      },
    },
  });

  // review-page review-slider
  $(".review-page .review-block .owl-carousel").owlCarousel({
    items: 4,
    loop: false,
    margin: 10,
    nav: true,
    dots: false,
    mouseDrag: false,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      400: {
        items: 2,
        margin: 5,
      },
      641: {
        items: 3,
        margin: 5,
      },
      1024: {
        items: 4,
      },
    },
  });

  // review-page review-slider
  setTimeout(function () {
    $(".popular-course-slider.owl-carousel").owlCarousel({
      items: 5,
      loop: false,
      margin: 10,
      nav: true,
      dots: false,
      mouseDrag: false,
      responsive: {
        0: {
          items: 1,
          margin: 0,
        },
        400: {
          items: 2,
          margin: 5,
        },
        641: {
          items: 3,
          margin: 5,
        },
        1024: {
          items: 5,
        },
      },
    });
  }, 4000);

  // product-page course-slider
  $(".course-slider .owl-carousel").owlCarousel({
    items: 5,
    loop: false,
    margin: 20,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      480: {
        items: 2,
        margin: 10,
      },
      641: {
        items: 3,
        margin: 8,
      },
      768: {
        items: 3,
        margin: 8,
      },
      900: {
        items: 4,
        margin: 8,
      },
      1024: {
        items: 4,
        margin: 10,
      },
      1120: {
        items: 5,
        margin: 10,
      },
      1240: {
        items: 5,
      },
    },
  });

  // product-page course-slider
  setTimeout(function () {
    $(".blogs-block.owl-carousel").owlCarousel({
      items: 2,
      loop: false,
      margin: 0,
      autoHeight: true,
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 1,
        },
        641: {
          items: 1,
        },
        768: {
          items: 2,
        },
      },
    });
  }, 4000);

  // aws-consulting-page consulting slider
  // $(".consulting-block .owl-carousel").owlCarousel({
  //   slideBy: 4,
  //   loop: false,
  //   margin: 20,
  //   nav: true,
  //   dots: false,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     480: {
  //       margin: 10,
  //       items: 2,
  //     },
  //     641: {
  //       margin: 10,
  //       items: 2,
  //     },
  //     767: {
  //       items: 3,
  //       margin: 10,
  //     },
  //     1000: {
  //       items: 4,
  //     },
  //   },
  // });

  // write-review-page reviewer vertical slider scipt
  // $(".reviewer-slider").tinycarousel({
  //   axis: "y",
  // });

  // Dashboaard Connections page pending invitation slider script
  $(".user-list-group.owl-carousel").owlCarousel({
    loop: false,
    margin: 8,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
        margin: 5,
      },
      641: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
      1240: {
        items: 5,
      },
    },
  });
  	//* ------ After Signup-Stepper Scripts in modal-after-signup ------ */
  const nextBtns = document.querySelectorAll(".btnNext");
	const progress = document.getElementById("progress");
	const formSteps = document.querySelectorAll(".formStep");
	let formStepsNum = 0;
	nextBtns.forEach((btn) => {
	  btn.addEventListener("click", () => {
	    formStepsNum++;
	    updateFormSteps();
	    // updateProgressbar();
	  });
	});
	function updateFormSteps() {
	  formSteps.forEach((formStep) => {
	    formStep.classList.contains("formStep-active") &&
	      formStep.classList.remove("formStep-active");
	  });

	  formSteps[formStepsNum].classList.add("formStep-active");
	}
  // testimonial-slider-employees-page
  $(".unlimited-access .owl-carousel").owlCarousel({
    center: true,
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    rewind: false,
    autoHeight: true,
    responsive: {
      0: {
        items: 1,
      },
      641: {
        items: 1,
        margin: 15,
      },
      768: {
        items: 1,
        margin: 15,
      },
      1024: {
        items: 2,
        margin: 15,
      },
      1230: {
        items: 2,
        margin: 70,
      },
    },
  });

  // ft-web-page review-slider
  $(".ft-web-page .review-block .owl-carousel").owlCarousel({
    items: 4,
    loop: false,
    margin: 10,
    nav: true,
    dots: false,
    mouseDrag: false,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      400: {
        items: 2,
        margin: 5,
      },
      641: {
        items: 3,
        margin: 5,
      },
      1024: {
        items: 4,
      },
    },
  });

  // new-review-block-slider in life-time-membership-page
  $(".new-review-block .owl-carousel").owlCarousel({
    items: 4,
    loop: false,
    margin: 10,
    nav: true,
    dots: false,
    mouseDrag: false,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      400: {
        items: 2,
        margin: 5,
      },
      641: {
        items: 3,
        margin: 5,
      },
      1024: {
        items: 4,
      },
    },
  });

  // ft-page course-slider
  $(".course-slider.learners .owl-carousel").owlCarousel({
    items: 4,
    loop: false,
    margin: 20,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      480: {
        items: 2,
        margin: 10,
      },
      641: {
        items: 3,
        margin: 10,
      },
      768: {
        items: 3,
        margin: 10,
      },
      900: {
        items: 4,
        margin: 10,
      },
      1024: {
        items: 4,
        margin: 20,
        nav: false,
      },
    },
  });

  /* ------ End carousel slider Scripts ------ */
});

/* Script all functions
------------------------------------------------------------------------------*/

//---- product page smooth scroll script ----//
// $(document).on("ready",function () {
//   var scrollLink = $(".nav-list .scroll");
//   let header_height = $("header").outerHeight();
//   let scroll_nav = $(".scroll-nav").outerHeight();

//   // Smooth scrolling
//   scrollLink.click(function (e) {
//     e.preventDefault();
//     $("body,html").animate(
//       {
//         scrollTop: $(this.hash).offset().top - (header_height + scroll_nav - 1),
//       },
//       0
//     );
//   });

//   // Active link switching
//   $(window).scroll(function () {
//     var scrollbarLocation = $(this).scrollTop();

//     scrollLink.each(function () {
//       var sectionOffset = $(this.hash).offset().top - 180;
//       if (sectionOffset <= scrollbarLocation) {
//         $(this).parent().addClass("active");
//         $(this).parent().siblings().removeClass("active");
//       }
//     });
//   });

//   // $("*").each(function () {
//   //   $(this).attr("data-automation-id", makeToken(4));
//   // });
// });

function makeToken(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// var mybutton = document.getElementById("myBtn");
// window.onscroll = function () {
//   scrollFunction();
// };

// function scrollFunction() {
//   if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// modal-review-video in lifetime-subscription-page script
$(".life-time-membership-page .video-review figure").on("click", function () {
  $("body").addClass("open-modal-review-video");
});
  function toggleDelbox() {
    var elems = document.querySelectorAll('.showSelectItem');
    var shouldShowList = false;
    elems.forEach(function(elem) {
      if (elem.checked) {
        shouldShowList = true;
      }
    });
    document.querySelector('#showSelectTxt').style.display = shouldShowList ? '' : 'none';
  }