/* Script on scroll
------------------------------------------------------------------------------*/
$(window).scroll(function() {

	let header_height = $('header').outerHeight();
	let annoucement_height = $('.annoucement-block').outerHeight();
	$(document).scrollTop() >= annoucement_height ? $('.header-search').css('top', header_height) : null;
	if($(document).scrollTop() == 0){
		if($('.annoucement-block').is(':visible')){
			$('.header-search').css('top', header_height + annoucement_height);
		}
		else if($('.annoucement-block').is(':hidden')){
			$('.header-search').css('top',header_height);
		}
	}
});

/* Script on resize
------------------------------------------------------------------------------*/
$(window).resize(function() {

	// Dashboard pages Tabs
	let w_dthr = $(window).width() - 15;
	let tab_width = $('.wrapper-list .tab_list').outerWidth();

	if (tab_width == w_dthr) {
		$('.wrapper-list .previous').show();
		$('.wrapper-list .next').show();
		if ($('.wrapper-list .tab_list li.resp-tab-active').is(':last-child')) {
			$('.wrapper-list .next').hide();
		} else {
			$('.wrapper-list .next').show();
		}
		if ($('.wrapper-list .tab_list li.resp-tab-active').is(':first-child')) {
			$('.wrapper-list .previous').hide();
		} else {
			$('.wrapper-list .previous').show();
		}
		$('.wrapper-list .tab_list li').click(function () {
			if ($(this).is(':last-child')) {
				$('.wrapper-list .next').hide();
			} else {
				$('.wrapper-list .next').show();
			}
			if ($(this).is(':first-child')) {
				$('.wrapper-list .previous').hide();
			} else {
				$('.wrapper-list .previous').show();
			}
		});
	}
	else {
		$('.wrapper-list .previous').hide();
		$('.wrapper-list .next').hide();
	}

	var tagMobile = $('.dropdown-menu');
	if (tagMobile.parent().is( ".mobile-nav" )) {
		tagMobile.unwrap();
	}

	// responsive Mobile menu script
	if ($(window).width() < 1024) {

		tagMobile.wrap('<div class="mobile-nav"></div>');

		$('.mobile-mode').removeClass('show');

		$('.hamburger').click(function () {
			$('body').addClass('no-scroll');
			$('.mobile-mode').addClass('show');
			$('.mobile-nav').addClass('open');
			$('.dashboard-menu').addClass('open');
		});


		// mobile menu close to click on close button
		$('.mobile-nav .btn-close').click(function(){
			$('body').removeClass('no-scroll');
			$('.mobile-nav').removeClass('open');
			$('.mobile-mode').removeClass('show');
		});

		// mobile menu backdrop close script
		$('.backdrop').click(function () {
			$('.mobile-nav').addClass('open');;
			$('.mobile-nav').removeClass('open');
			$(this).removeClass('active');
			$(this).css({'opacity':'0', 'z-index':'-1', 'visibility':'hidden'});
		});

		// mobile menu close to click on close button script
		$('.mobile-nav-close').click(function(){
			$('.mobile-nav').removeClass('open');
			$('.backdrop').css({'opacity':'0', 'z-index':'-1', 'visibility':'hidden'});
		});

		// Menu Back button script
		$('body').on('click', '.back-btn', function (e) {
			$(this).parent().removeClass('drawer');
			$(this).parent().removeClass('show');
			$(this).parent().addClass('hide');
			$(this).parents('.back-btn').remove();
			$(this).parent().css({'right':'-350px'});
			e.preventDefault();
		});

		// Menu click script
		$(".list-menu > li").click(function(){
			$(this).addClass('active');
			if($(this).hasClass('active')){
				$(this).siblings().removeClass("active");
				$(this).children('ul').addClass('drawer').removeClass('hide');
				$(this).children('ul').addClass('drawer').addClass('show');

				if(!$(this).children().children('.back-btn').length){
					$(this).children('ul').prepend('<div class="back-btn"><i class="icon-font-arrow-right"></i>Menu</div>');
				}
				$(this).find('ul').first().css({'right':'0'});
			}
		});

		$('li').on('click', function(event) {
			var div_elem = document.createElement('div');
			var text = $(this).children('a').text();
			var txt_node = document.createTextNode(`All ${text}`);
			$(div_elem).attr('class', 'new_li');
			div_elem.appendChild(txt_node);

			if(!$(this).find('.submenu').children('.new_li').length){
				$(this).find('.submenu .back-btn').eq(0).after(div_elem);
			}
		});

	}
	else {
		$('.mobile-nav').removeClass('open');
		$('.mobile-mode').removeClass('show');
		// Menu Desktop script
		$(".list-menu > li").find('ul').css({'display':'none'}); 

		// Menu Hover Script
		$('.dropdown-menu').addClass('desktop');
		if( $('.dropdown-menu').hasClass('desktop')){
			$(".list-menu > li").hover(function(){
				$(this).addClass('active');
				if($(this).hasClass('active')){
					$(this).siblings().children('ul').removeClass('drawerer').hide();
					$(this).siblings().removeClass("active");
					$(this).children('ul').addClass('drawerer').show();
					$(this).children('a').css({'color':'#F06421'});
					$(this).siblings().children('a').css({'color':''});

					if($(this).children('ul').children('li').find('ul').length > 0){
						$(this).children('ul').css({'border-right':'1px solid #E7ECED'});
						$(this).siblings().children('ul').css({'border-right':'1px solid #E7ECED'});
						$(this).children('ul').children('li').find('ul').css({'margin-left':'1px'});
					}
					else{
						$(this).children('ul').css({'border-right':'none'});
						$(this).siblings().children('ul').css({'border-right':'none'});
						$(this).children('ul').children('li').find('ul').css({'margin-left':'0'});
					}
					if ($(this).find('ul').length) {
						$(this).find('.detail:after').css({'background':'#000'});
					}
				}
			},function () {
				$(this).removeClass('active');
				$(this).children('a').css({'color':''});
			});
		}
	}
});

/* Script on load
------------------------------------------------------------------------------*/
$(window).load(function() {
	// catagory page fancy scroll
	$(".modal-preview-course .course-content").mCustomScrollbar({
		axis:"y",
		autoHideScrollbar: true
	});

	$(".modal-select-course .modal-content").mCustomScrollbar({
		axis:"y",
		autoHideScrollbar: true
	});

	$(".modal-online-course-preview .video-list .list-block").mCustomScrollbar({
		axis:"y",
		autoHideScrollbar: true
	});

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
	let left_height = $('.write-review-page .left-column').outerHeight();
	$('.write-review-page .right-column').css('max-height', left_height);

	// Dashboard pages Tabs
	let w_dthr = $(window).width();
	let tab_width = $('.wrapper-list .tab_list').outerWidth(true);
	if (tab_width == w_dthr) {
		$('.wrapper-list .previous').hide();

		if ($('.wrapper-list .tab_list li.resp-tab-active').is(':last-child')) {
			$('.wrapper-list .next').hide();
		} else {
			$('.wrapper-list .next').show();
		}
		if ($('.wrapper-list .tab_list li.resp-tab-active').is(':first-child')) {
			$('.wrapper-list .previous').hide();
		} else {
			$('.wrapper-list .previous').show();
		}

		$('.wrapper-list .tab_list li').click(function () {
			if ($(this).is(':last-child')) {
				$('.wrapper-list .next').hide();
			} else {
				$('.wrapper-list .next').show();
			}
			if ($(this).is(':first-child')) {
				$('.wrapper-list .previous').hide();
			} else {
				$('.wrapper-list .previous').show();
			}
		});
	}
	else {
		$('.wrapper-list .previous').hide();
		$('.wrapper-list .next').hide();
	}

	// hide all contents accept from the first div
	$('.wrapper-list .tab_list li').click(function () {
		var position = $(this).position();
		var corresponding = $(this).data("id");

        // scroll to clicked tab with a little gap left to show previous tabs
        scroll = $('.wrapper-list .tab_list').scrollLeft();
        $('.wrapper-list .tab_list').animate({
        	'scrollLeft': scroll + position.left - 130
        }, 600);


        // remove active class from currently not active tabs
        $('.wrapper-list .tab_list li').removeClass('active');

        // add active class to clicked tab
        $(this).addClass('active');
    });

	$('.wrapper-list .next').click(function(e){
		e.preventDefault();
		$('.tab_list li.resp-tab-active').next('li').trigger('click');
	});
	$('.wrapper-list .previous').click(function(e){
		e.preventDefault();
		$('.tab_list li.resp-tab-active').prev('li').trigger('click');
	});
});

/* Script on ready
------------------------------------------------------------------------------*/	
$(document).ready(function(){

	// If body have a 'header-search-open' class then disable body scroll
	$('body').on('click', function () {
		if ($('body').hasClass('header-search-open')){
			$('body').addClass('no-scroll');
		}
	});

	// no-scroll class remove
	var no_scroll = $('.hamburger, .dropdown-menu, .dashboard-menu, .user-block, .user-profile-menu, .cart-list-menu, .icon-search, .header-search');
	$('#wrapper').click(function (e) {
		if ((no_scroll[0] != e.target) && (!no_scroll.has(e.target).length)) {
			$('body').removeClass('no-scroll');
			$('.user-block').removeClass('open');
		}
	});
	
	// annoucement-block script
	$('.annoucement-block .icon-font-cross').click(function() {
		$(this).parent().parent().slideUp(300);

		let header_height = $('header').outerHeight();
		$('.header-search').css('top', header_height);
	});

	/* ------ Modal Scripts ------ */	
	// Modal close when click close icon or cancel-button
	$(".modal .icon-close, .modal .cancel").on('click', function() {
		var bodyClass = $("body").attr("class");
		$("body").attr("class", "");
		var classArr = bodyClass.split(" ")
		for(var i = 0; i < classArr.length; i ++) {
			if(classArr[i].substr(0, 10) != "open-modal") {
				$("body").addClass(classArr[i]);
			}
		}
		if ($('.modal .modal-inner .modal-container').css('transform', 'translateY(0)')) {
			$(".modal .modal-inner .modal-container").css('transform', 'translateY(-10px)');
			setTimeout(() => {
				$(".modal .modal-inner .modal-container").css('transform', 'translateY(10px)');
			}, 500);
		}

		// video pause script
		$(".myvideo").attr("src", $(".myvideo").attr("src"));
	});

	
	// Modal closed when click outside the modal
	$('.modal').on('click', function (e) {
		if ($(e.target).closest(".modal-container").length === 0) {
			var bodyClass = $("body").attr("class");
			$("body").attr("class", "");
			var classArr = bodyClass.split(" ")
			for(var i = 0; i < classArr.length; i ++) {
				if(classArr[i].substr(0, 10) != "open-modal") {
					$("body").addClass(classArr[i]);
				}
			}
			if ($('.modal .modal-inner .modal-container').css('transform', 'translateY(0)')) {
				$(".modal .modal-inner .modal-container").css('transform', 'translateY(-10px)');
				setTimeout(() => {
					$(".modal .modal-inner .modal-container").css('transform', 'translateY(10px)');
				}, 500);
			}

			// video pause script
			$(".myvideo").attr("src", $(".myvideo").attr("src"));
		}
	});

	// Body have a class starting with 'open-modal' then animate and disable body scroll
	$('body').on('click', function() {
		if ($('body').is('*[class^="open-modal"]')) {
			if ($('.modal .modal-inner .modal-container').css('transform', 'translateY(10px)')) {
				$(".modal .modal-inner .modal-container").css('transform', 'translateY(0)');
			}		
		}
	});

	// notify modal open script
	// $('.btn-notify').on('click', function() {
	// 	$('body').addClass("open-modal-notify");
	// }); 

	// modal-share-course
	$('.product-page .buy-box .share-course .btn-share').on('click', function(){
		$('body').addClass('open-modal-share-course')
	});

	//signup modal open script
	$('header .link-signup').on('click', function () {
		$('body').addClass("open-modal-signup");
	});
	$('.dropdown-menu .btn-signup').on('click', function () {
		$('body').removeClass('no-scroll');
		$('.mobile-mode').removeClass('show');
		$('.mobile-nav').removeClass('open');
		$('body').addClass("open-modal-signup");
	});

	//login modal open script
	$('header .link-signin').on('click', function () {
		$('body').addClass("open-modal-login");	
	});
	$('.dropdown-menu .btn-login').on('click', function () {
		$('body').removeClass('no-scroll');
		$('.mobile-mode').removeClass('show');
		$('.mobile-nav').removeClass('open');
		$('body').addClass("open-modal-login");
	});

	//in modal-account click 'signup-link' then open 'signup-modal' script
	$('.modal-account .link-signup').on('click', function () {
		$('body').removeClass("open-modal-login");
		$('body').removeClass("open-modal-pass-saved");
		$('body').addClass("open-modal-signup");
	});

	//in modal-account click 'signin-link' then open 'signin-modal' script
	$('.modal-account .link-login').on('click', function () {
		$('body').removeClass("open-modal-signup");
		$('body').removeClass("open-modal-pass-reset");
		$('body').addClass("open-modal-login");
	});

	//in modal-account click 'forgot-password' then open 'pass-reset' modal script
	$('.modal-account .forgot-password').on('click', function(){
		$('body').removeClass("open-modal-login");
		$('body').removeClass("open-modal-pass-saved");
		$('body').addClass("open-modal-pass-reset");
	});

	// modal-preview-course in categoty-page script
	$('.course-listing .course-preview').on('click', function() {
		$('body').addClass('open-modal-preview-course');
	});

	// modal-preview-course in product-page script
	$('.product-banner .course-img').on('click', function() {
		$('body').addClass('open-modal-preview-course');
	});

	// modal-review-video on product page script
	$('.product-page .video-review figure').on('click', function() {
		$('body').addClass('open-modal-review-video');
		$('#myvideo').attr('src', src);
	});

	// modal-review-video on product page script
	$('.product-page .benifits-block .btn-preview').on('click', function() {
		$('body').addClass('open-modal-online-course-preview');
	});

	// modal-reccomend in cart-page script
	$('.reccomend-click').on('click', function () {
		$('body').addClass("open-modal-recommend-frnd");
	});

	// modal-review-video in review-page script
	$('.review-page .video-review figure').on('click', function() {
		$('body').addClass('open-modal-review-video');
	});

	// modal-review-video in review-page script
	$('.review-banner .img-block').on('click', function() {
		$('body').addClass('open-modal-review-video');
	});

	// modal-aws-certificate in review-page script
	// $('.review-banner .btn-write-review').on('click', function() {
	// 	$('body').addClass('open-modal-select-course');
	// });
	
	// modal-aws-certificate in review-page script
	$('.review-page .certificate-img').on('click', function() {
		$('body').addClass('open-modal-aws-certificate');
	});

	// modal-aws-consulting in aws-consulting-page script
	$('.banner-aws-consulting .btn-consultation').on('click', function() {
		$('body').addClass('open-modal-request-consultation');
	});

	// modal-report in Dashboard(training) page script
	$('.dashboard-page .tranning-page .certificate-block figure').on('click', function() {
		$('body').addClass('open-modal-certificate');
	});
	$('.dashboard-page .tranning-page .certificate-block .name').on('click', function() {
		$('body').addClass('open-modal-certificate');
	});

	//  modal-order-details in Dashboard(Account-setting) page script
	$('.dashboard-page .acc-setting-page .link-view').on('click', function() {
		$('body').addClass('open-modal-order-details');
	});

	// modal-connection-first in Dashboard(connection-first-time) page script
	$('.dashboard-page .connection-first-page .btn-update').on('click', function() {
		$('body').addClass('open-modal-change-preference');
	});
	$('.dashboard-page .modal-change-preference .btn-next').on('click', function() {
		$('body').addClass('open-modal-update-profile');
		$('body').removeClass('open-modal-change-preference');
	});
	$('.dashboard-page .modal-update-profile .btn-back').on('click', function() {
		$('body').addClass('open-modal-change-preference');
		$('body').removeClass('open-modal-update-profile');
	});

	// modal-change-preference in Dashboard(connection) page tab(newtwork) script
	$('.dashboard-page .user-connections .change-preference').on('click', function() {
		$('body').addClass('open-modal-change-preference');
	});

	// modal-report in Dashboard(connection) page script
	$('.dashboard-page .user-connections .more-details .report').on('click', function() {
		$('body').addClass('open-modal-report');
	});

	// modal-report in Dashboard(connection) page script
	$('.dashboard-page .chat-box .report').on('click', function() {
		$('body').addClass('open-modal-report');
	});

	// modal-person-blocked in Dashboard(connection) page script
	$('.modal-report .report-content .blocked-link').on('click', function() {
		$('body').addClass('open-modal-person-blocked');
		$('body').removeClass('open-modal-report');
	});

	// modal-person-blocked in Dashboard(connection) page script
	$('.modal-report .report-content .report-profile-link').on('click', function() {
		$('body').addClass('open-modal-report-profile');
		$('body').removeClass('open-modal-report');
	});

	// modal-person-blocked in Dashboard(connection) page script
	$('.modal-person-blocked .modal-footer .btn-back').on('click', function() {
		$('body').removeClass('open-modal-person-blocked');
		$('body').addClass('open-modal-report');
	});

	// modal-person-blocked in Dashboard(connection) page script
	$('.modal-report-profile .modal-footer .btn-back').on('click', function() {
		$('body').removeClass('open-modal-report-profile');
		$('body').addClass('open-modal-report');
	});

	// modal-report in Dashboard(connection) page script
	$('.dashboard-page .wallet-page .btn-withdraw').on('click', function() {
		$('body').addClass('open-modal-withdrow-earnings');
	});

	// modal-auto-renew in Dashboard(Account Settings) page script
	$('.dashboard-subscription .toggle-btn').on('click', function(event) {
		event.preventDefault();
		$('body').addClass('open-modal-auto-renew');
	});
	$('.modal-auto-renew button.submit').on('click', function() {
		$('body').removeClass('open-modal-auto-renew');
		$('.dashboard-subscription .renewCancel-block .toggle-btn input:checked').removeAttr('checked');
		$('.dashboard-subscription .renewCancel-block .toggle-btn').addClass('desabled');
		$(".modal .modal-inner .modal-container").css('transform', 'translateY(-10px)');
		setTimeout(() => {
			$(".modal .modal-inner .modal-container").css('transform', 'translateY(10px)');
		}, 500);
	});

	// modal-cancel-subscription in Dashboard(Account Settings) page script
	$('.dashboard-subscription .btn-cancelSubscription').on('click', function() {
		$('body').addClass('open-modal-cancel-subscription');
	});

	/* ------ End Modal Scripts ------ */

	/* ------ header Scripts ------ */
	// user-login-block open backdrop
	if ($(window).width() < 1023) {
		$('.user-block figure').click(function(){
			$(this).parents('.user-block').addClass('open');
			$('body').addClass('no-scroll');
		});
		$('.user-block .btn-close').click(function(){
			$(this).parents('.user-block').removeClass('open');
			$('body').removeClass('no-scroll');
		});
	}

	// Notification-menu script
	$('.user-login-block .icon-notification').on('click', function() {
		$('.notification-menu').toggleClass('open');	
	});
	//when click outside user-login-block
	var notification = $('.notification-menu, .icon-notification');
	$('#wrapper').click(function (e) {
		if ((notification[0] != e.target) && (!notification.has(e.target).length)) {
			$('.notification-menu').removeClass('open');
		}
	});

	//'search result' will show only 8 search items elements
	$(".header-search ul li").hide();
	$(".header-search .content ul").each(function() {
		$(this).children("li:lt(8)").show();
	});

	// seach-box closed when click close-button
	$('.header-search .icon-close').on('click', function () {
		$('.header-search').removeClass('active');
		$('.icon-search').removeClass('active');
		$('body').removeClass('header-search-open');
		$('body').removeClass('no-scroll');
	});

	// search-box will open when click search icon
	$('header .icon-search').on('click', function(){	
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$('.header-search').removeClass('active');
			$('.header-search').removeClass('show-content');
			$('body').removeClass('header-search-open');
			$('body').removeClass('no-scroll');
		}
		else{
			$(this).addClass("active");
			$('.header-search').addClass('active');
			$('body').addClass('header-search-open');
			$('body').addClass('no-scroll');
			// add any text in 'inputbox' then show a search content
			$('.header-search input[type="text"]').keyup(function(){
				if ($(this).val().length == 0) {
					$('.header-search').removeClass('show-content');
				}
				else{
					$('.header-search').addClass('show-content');
				}
			});
		}		
	});

	//when click outside icon-search
	var search = $('.icon-search, .header-search');
	$('#wrapper').click(function (e) {
		if ((search[0] != e.target) && (!search.has(e.target).length)) {
			$(".icon-search").removeClass("active");
			$('.header-search').removeClass('active');
			$('.header-search').removeClass('show-content');
			$('body').removeClass('header-search-open');
		}
	});

	// All course menu script
	// click couse btn and open course-dropdown, click outside dropdown to close this
	// close the mobile menu and overlay on click outside the box 
	var hamburger = $('.hamburger, .dropdown-menu, .dashboard-menu');
	$('#wrapper').click(function (e) {
		if ((hamburger[0] != e.target) && (!hamburger.has(e.target).length)) {
			$('.mobile-mode').removeClass('show');
			$('.mobile-nav').removeClass('open');
			$('.dashboard-menu').removeClass('open');
		}
	});

	// Dropdown Menu Desktop and Mobile Both 
	$(function () {
		$("header .btn-dropdown").on("click", function (e) {
			$('body').removeClass('header-search-open');
			$('body').removeClass('no-scroll');
			$(".icon-font-search").removeClass("active");
			$('.header-search').removeClass('active');
			$('.header-search').removeClass('show-content');

			if ($('.dropdown-menu').hasClass('open')) {
				$('.dropdown-menu').removeClass('open');
			}
			else {
				$('.dropdown-menu').addClass('open');
			}

			e.stopPropagation();
		});

		var result = $(".dropdown-menu, .btn-dropdown");
		$(document).on("click", function (e) {
			if ((result[0] != e.target) && (!result.has(e.target).length)) {
				$(".dropdown-menu").removeClass("open");
				$(".dropdown-menu div, .dropdown-menu ul").removeClass("current");
				$('.dropdown-menu ul li').children('a').removeClass('active');
			}
		});
	});

	$(".list-menu > li").each(function(i, obj) {
		if($(this).children('ul').length > 0){
			$(this).find('.list-title').children('.icon-font-submenu-arrow').show();
		}
		else{
			$(this).find('.list-title').children('.icon-font-submenu-arrow').hide();	
		}
	});


    // responsive Mobile menu script
    var tagMobile = $('.dropdown-menu');

    if ($(window).width() < 1024) {
    	tagMobile.wrap('<div class="mobile-nav"></div>');
    	
    	$('.hamburger').click(function () {
    		$('body').addClass('no-scroll');
    		$('.mobile-mode').addClass('show');
    		$('.mobile-nav').addClass('open');
    		$('.dashboard-menu').addClass('open');
    	});

		// mobile menu close to click on close button
		$('.mobile-nav .btn-close').click(function(){
			$('body').removeClass('no-scroll');
			$('.mobile-nav').removeClass('open');
			$('.mobile-mode').removeClass('show');
		});

		// mobile menu backdrop close script
		$('.backdrop').click(function () {
			$('.mobile-nav').addClass('open');;
			$('.mobile-nav').removeClass('open');
			$(this).removeClass('active');
			$(this).css({'opacity':'0', 'z-index':'-1', 'visibility':'hidden'});
		});

		// mobile menu close to click on close button script
		$('.mobile-nav-close').click(function(){
			$('.mobile-nav').removeClass('open');
			$('.backdrop').css({'opacity':'0', 'z-index':'-1', 'visibility':'hidden'});
		});

		// Menu Back button script
		$('body').on('click', '.back-btn', function (e) {
			$(this).parent().removeClass('drawer');
			$(this).parent().removeClass('show');
			$(this).parent().addClass('hide');
			$(this).parents('.back-btn').remove();
			$(this).parent().css({'right':'-350px'});
			e.preventDefault();
		});

		// Menu click script
		$(".list-menu > li .icon-font-submenu-arrow").click(function(){
			$(this).parent('.list-title').parent().addClass('active');
			if($(this).parent('.list-title').parent().hasClass('active')){
				$(this).siblings().removeClass("active");
				$(this).children('ul').addClass('drawer').removeClass('hide');
				$(this).children('ul').addClass('drawer').addClass('show');

				if(!$(this).parent('.list-title').parent().children().children('.back-btn').length){
					$(this).parent('.list-title').parent().children('ul').prepend('<div class="back-btn"><i class="icon-font-arrow-right"></i>Menu</div>');
				}
				$(this).parent('.list-title').parent().find('ul').first().css({'right':'0'});
			}
		});

		$('li').on('click', function(event) {
			var div_elem = document.createElement('div');
			var text = $(this).children('.list2-title a').text();
			var txt_node = document.createTextNode(`All ${text}`);
			$(div_elem).attr('class', 'new_li');
			div_elem.appendChild(txt_node);

			if(!$(this).find('.submenu').children('.new_li').length){
				$(this).find('.submenu .back-btn').eq(0).after(div_elem);
			}
		});
	}

	else {
		// Menu Desktop script
		$(".list-menu > li").find('ul').css({'display':'none'}); 

		// Menu Hover Script
		$('.dropdown-menu').addClass('desktop');
		if( $('.dropdown-menu').hasClass('desktop')){
			$(".list-menu > li").hover(function(){
				$(this).addClass('active');
				if($(this).hasClass('active')){
					$(this).siblings().children('ul').removeClass('drawerer').hide();
					$(this).siblings().removeClass("active");
					$(this).children('ul').addClass('drawerer').show();
					$(this).children('a').css({'color':'#F06421'});
					$(this).siblings().children('a').css({'color':''});

					if($(this).children('ul').children('li').find('ul').length > 0){
						$(this).children('ul').css({'border-right':'1px solid #E7ECED'});
						$(this).siblings().children('ul').css({'border-right':'1px solid #E7ECED'});
						$(this).children('ul').children('li').find('ul').css({'margin-left':'1px'});
					}
					else{
						$(this).children('ul').css({'border-right':'none'});
						$(this).siblings().children('ul').css({'border-right':'none'});
						$(this).children('ul').children('li').find('ul').css({'margin-left':'0'});
					}
					if ($(this).find('ul').length) {
						$(this).find('.detail:after').css({'background':'#000'});
					}
				}
			},function () {
				$(this).removeClass('active');
				$(this).children('a').css({'color':''});
			});
		}

	}
	/* ------ End header Scripts ------ */

	//---- cookies msg close script ----//
	
	$(".cookies-msg").addClass("open");
	$(".cookies-msg .icon-close").click(function(){
		$(".cookies-msg").addClass("close");
		$(".cookies-msg").removeClass("open");
	});
	//---- End cookies msg close script ----//


	// ------ subscription-banner --------//
	$(".subscription-banner .btn-close").on('click', function(){
		$('.subscription-banner').fadeOut(300)
	});

	/* ------ Category page Scripts ------ */
	// toggle whishlist scripts
	$('.category-page .couser-img .icon-font-heart').on('click', function() {
		$(this).toggleClass('active');
	});

	// Filterbar scripts
	// open-filterbar
	$('.category-page .course-listing .btn-filter').on('click', function() {
		$('.category-page .two-column .left-column').addClass('show');		
		$('.category-page .two-column .right-part').addClass('overlay-show');		
	});
	$('.category-page .filter-bar .icon-close').on('click', function(){
		$('.category-page .two-column .left-column').removeClass('show');
		$('.category-page .two-column .right-part').removeClass('overlay-show');
	});

	var filter = $('.filter-bar, .btn-filter');
	$('#wrapper').click(function (e) {
		if ((filter[0] != e.target) && (!filter.has(e.target).length)) {
			$('.category-page .two-column .left-column').removeClass('show');
			$('.category-page .two-column .right-part').removeClass('overlay-show');
		}
	});


	// First item is open default
	$('.category-page .filter-bar .item').first().addClass('open');
	if($('.category-page .filter-bar .item').first().hasClass('open')){
		$('.category-page .filter-bar .item').first().children('.item-content').slideDown();
	}

	$('.category-page .filter-bar .filter-name').on('click', function(event){
		$(this).parent().toggleClass('open');
		if($(this).parent().hasClass('open')){
			$(this).siblings('.item-content').slideDown();
		}
		else{
			$(this).siblings('.item-content').slideUp();
		}
	});

	// Accordian script
	$('.accordian-block .accordian-list .item-head').on('click', function() {
		if($(this).hasClass('open')){
			$(this).removeClass('open').next().slideUp();
		}
		else{
			$(this).addClass('open').next().slideDown().parents('.item').siblings().find('.item-head').removeClass('open').next().slideUp();
			
		}
	});
	/* ------ End Category page Scripts ------ */

	/* ------ Product page Scripts ------ */
	// Messages
	$('.msg-box .icon-close').on('click', function() {
		$('body').removeClass('open-success-msg');
		$('body').removeClass('open-error-msg');
		$('body').removeClass('open-alert-msg');
	});

	// whishlist
	$('.add-whishlist').on('click', function() {
		$(this).toggleClass('active');
	});

	// training-options visa-versa script
	$(".training-options .option input").change(function() {
		let vare = $(this).parents('.option').index();
		if(this.checked) {
			$(this).parents('.option').addClass('active');
			$('#sidebar .option').eq(vare).addClass('active').children().children('input').click();
		}
		else{
			$(this).parents('.option').removeClass('active');
			$('#sidebar .option').eq(vare).removeClass('active').children().children('input').click();
		}
	});

	$("#sidebar .option input").change(function() {
		let vare =$(this).parents('.option').index();
		if(this.checked) {
			$(this).parents('.option').addClass('active');
			$('.training-options .option').eq(vare).addClass('active').children().children('input').click();
		}
		else{
			$(this).parents('.option').removeClass('active');
			$('.training-options .option').eq(vare).removeClass('active').children().children('input').click();
		}
	});

	// sticky sidebar
	$(function() {
		var header_height = $('header').outerHeight();
		var scroll_nav = $('.scroll-nav').outerHeight();
		if($("#sidebar").length) {
			$("#sidebar").stick_in_parent({
				offset_top: header_height + scroll_nav + 10
			});
		}
	});

	/* ------ End Product page Scripts ------ */

	/* ------ cart page Scripts ------ */
	// increment and decrement value
	$(".value-button").on("click", function() {
		var $button = $(this);
		var oldValue = $button.parent().find("input").val();
		$button.blur();
		if ($button.hasClass("btn-increase")) {
			var newVal = parseFloat(oldValue) + 1;
		} 
		else {
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
	$('.checkout-page .payment-card li').click(function(){
		if ($(this).hasClass('active')) {
			$('.payment-info .tab').removeClass('current');
		}
		else {
			$(this).addClass('active').siblings().removeClass('active');
			$('.payment-info .tab').addClass('current').siblings().removeClass('current');
		}

		var tab_id = $(this).attr('data-target');
		$("#"+tab_id).addClass('current');
	});

	// card number in fourletter group script
	$('.checkout-page #cardNumber').on('keyup', function(e){
		var val = $(this).val();
		var newval = '';
		val = val.replace(/\s/g, '');
		for(var i=0; i < val.length; i++) {
			if(i%4 == 0 && i > 0) newval = newval.concat(' ');
			newval = newval.concat(val[i]);
		}
		$(this).val(newval);
	});
	/* ------ End checkout page Scripts ------ */

	/* ------ review page Scripts ------ */
	// click on btn 'add-comment' open comment-section script
	$('.students-review-block .total-comments').on('click', function(){
		$(this).parents('.review-content').find('.comment-section').slideToggle();
	});

	// rating filter script
	$('.review-page .review-filter ul li').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

	// like btn script
	$('.review-page .review-post .icon-thumb').on('click', function() {
		$(this).toggleClass('active');
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
		    c.addEventListener("click", function(e) {
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
		a.addEventListener("click", function(e) {
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
		var x, y, i, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		for (i = 0; i < y.length; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i)
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
	$('.drag-form input[type="file"]').change(function(e) {
		if($('#dropzone')[0].files.length > 0){
			var File_name = e.target.files[0].name;
			$('.upload-block .min-requirement .file-name span').text(File_name);
			$('.upload-block .min-requirement .file-name .icon').css('opacity', '1');
			$('.how-work-block .upload-block .min-requirement').show();
		}
	});
	/* ------ End write a review page Scripts ------ */

	/* -------- Aws-consulting page Scripts -------- */
	$('.consulting-faq-block .accordian-list .item-head').on('click', function() {
		$(this).parents('.accordian-block').siblings().find('.item-head').removeClass('open').next('.item-content').slideUp();
	});
	/* ------ End aws-consulting page Scripts ------ */

	/* ------ Dashboard page Scripts ------ */
	// Dashboard menu script
	$('.dashboard-menu .btn-close').on('click', function() {
		$('.dashboard-menu').removeClass('open');
		$('body').removeClass('no-scroll');
		$('.mobile-mode').removeClass('show');
	});
	$('.dashboard-menu .accordian-list > ul > li span').on('click', function() {
		$(this).parent().toggleClass('open').find('.sub-links').slideToggle();
		$(this).parent().siblings().removeClass('open').find('.sub-links').slideUp();;
	});

	// search-filter-block script
	$('.dashboard-page .filter-options').hide();
	$('.dashboard-page .filter-block').on('click', function() {
		$('.dashboard-page .filter-options').slideToggle();
	});

	// Catagory-list heart image on off script
	$('.dashboard-page .couser-img .icon-whishlist').on('click', function() {
		$(this).toggleClass('active');
	});

	// my-wishlist-page heart image on off script
	$('.my-wishlist-page .couser-img .icon-whishlist').on('click', function() {
		$(this).toggleClass('active');
	});

	// category-page heart image on off script
	$('.category-page .couser-img .icon-whishlist').on('click', function() {
		$(this).toggleClass('active');
	});

	// category-page01 heart image on off script
	$('.category-page01 .couser-img .icon-whishlist').on('click', function() {
		$(this).toggleClass('active');
	});

	/* ------ Dashboard Account Setting page Scripts ------ */
	// datepicker script
	function drawArrow(input) {
		var $input = $(input),
		widget = $input.datepicker('widget'),
		direction;
	}
	$('.js-datepicker').datepicker({
		format: 'dd.mm.yyyy', 
		beforeShow: function(input, inst) {	 
			drawArrow(input);
		},	  
		onChangeMonthYear: function(a,b) {	    
			var $input = $(this),
			widget = $(this).datepicker('widget');
			drawArrow(this);
		},
		minDate: 0
	});
	/* ------ End Dashboard Account page Scripts ------ */

	/* ------ Dashboard Connections page Scripts ----------*/
	// connection page preference modal script
	$('.modal-change-preference .input-box-group').hide();
	$('.modal-change-preference .anyuser').addClass('active');
	$('.modal-change-preference .anyuser').on('click', function() {
		$(this).addClass('active').siblings('.userfrom').removeClass('active');
		if ($(this).hasClass('active')) {
			$('.modal-change-preference .input-box-group').slideUp();
		}
	});
	$('.modal-change-preference .userfrom').on('click', function() {
		$(this).addClass('active').siblings('.anyuser').removeClass('active');
		if ($(this).hasClass('active')) {
			$('.modal-change-preference .input-box-group').slideDown();
		}
	});

	// connection page Message-tab script
	$('.dashboard-page .chat-sidebar .contact-list .item').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
		if($(window).width() < 641){
			window.setTimeout(function(){
				$('body').css('overflow', 'hidden');
			}, 300);
			$('.dashboard-page .chat-box').addClass('open').find('.btn-back').on('click', function() {
				$(this).parents('.chat-box').removeClass('open');
				$('body').css('overflow', 'auto');
			});
		}
	});
	/* ------ End  Dashboard Connections page Scripts ------ */

	/* ------- Dashboard Wallet page Scripts ------------*/
	$('.modal-withdrow-earnings .other-amount').on('click', function() {
		$('.modal-withdrow-earnings .amount-box').css('display', 'flex');
	});
	$('.modal-withdrow-earnings .custom-radiobutton.amount').on('click', function() {
		$('.modal-withdrow-earnings .amount-box').hide();
	});
	$('.modal-withdrow-earnings .payment-options .option.paypal').on('click', function() {
		$(this).children('.input-box-group').css('display', 'flex');
		$(this).siblings('.option').children('.input-box-group').hide();
	});
	$('.modal-withdrow-earnings .payment-options .option.bank').on('click', function() {
		$(this).children('.input-box-group').css('display', 'flex');
		$(this).siblings('.option').children('.input-box-group').hide();
	});
	/* ------ End Dashboard Wallet page Scripts ----------*/

	/* ------ All Resposnive Tabs Scripts ------ */
	// Default Tabs script
	$('#default-tab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        tabidentify: 'hor_1', // The tab groups identifier
        activate: function(event) {
        	var $tab = $(this);
        	var $info = $('#nested-tabInfo');
        	var $name = $('span', $info);
        	$name.text($tab.text());
        	$info.show();
        }
    });

    // Product Page Faq Tabs script
    $('#faq-tab').easyResponsiveTabs({
    	type: 'default',
    	width: 'auto',
    	fit: true,
    	tabidentify: 'hor_1',
    	activate: function(event) {
    		var $tab = $(this);
    		var $info = $('#nested-tabInfo');
    		var $name = $('span', $info);
    		$name.text($tab.text());
    		$info.show();
    	}
    });
	$('#faq-tab-popular').easyResponsiveTabs({
    	type: 'default',
    	width: 'auto',
    	fit: true,
    	tabidentify: 'hor_1',
    	activate: function(event) {
    		var $tab = $(this);
    		var $info = $('#nested-tabInfo');
    		var $name = $('span', $info);
    		$name.text($tab.text());
    		$info.show();
    	}
    });
	

    // dashboard-page Tabs script
    $('#dashboard-tab').easyResponsiveTabs({
    	type: 'default',
    	width: 'auto',
    	fit: true,
    	tabidentify: 'hor_1',
    	activate: function(event) {
    		var $tab = $(this);
    		var $info = $('#nested-tabInfo');
    		var $name = $('span', $info);
    		$name.text($tab.text());
    		$info.show();
    	}
    });

    /* ------ Dashboard Connections page Scripts ------ */
    $('.multi-filled').tokenfield();

	//----- choosen multi-select script----- //
	$(".chosen-select").chosen();
	/* ------ End Dashboard Connections page Scripts ------ */

	/* ------ carousel slider Scripts ------ */
	// explore-catogary slider
	$('.explore-category .owl-carousel').owlCarousel({
		loop: false,
		margin:10,
		nav:false,
		dots: true,
		responsive:{
			0:{
				items: 1,
				margin: 0
			},
			480:{
				items: 2
			},
			641:{
				items: 3
			},
			700:{
				items: 3
			},
			1024:{
				items: 4,
				margin: 15
			},
			1140:{
				items: 5,
				margin: 15
			}
		}
	});

	// testimonial-slider in affiliate-program-page
	$('.affiliate-program .testimonial-block .owl-carousel').owlCarousel({
		loop:true,
		margin:30,
		nav:false,
		dots: true,
		rewind: false,
		autoHeight:true,
		responsive:{
			0:{
				items:1
			},
			641:{
				items: 1,
				margin: 15
			},
			768:{
				items:1,
				margin: 15
			},
			1024:{
				items:1,
				margin:15
			},
			1230:{
				items:1,
				margin:70
			}
		}
	});

	// testimonial-slider in aws-consulting-page
	$('.aws-consulting-page .testimonial-block .owl-carousel').owlCarousel({
		loop:true,
		margin:30,
		nav:false,
		dots: true,
		rewind: false,
		autoHeight:true,
		responsive:{
			0:{
				items:1
			},
			641:{
				items: 1,
				margin: 15
			},
			768:{
				items:1,
				margin: 15
			},
			1024:{
				items:1,
				margin:15
			},
			1230:{
				items:1,
				margin:70
			}
		}
	});

	// testimonial-slider-employees-page
	$('.unlimited-access .owl-carousel').owlCarousel({
		center: true,
		loop:true,
		margin:30,
		nav: true,
		dots: false,
		rewind: false,
		autoHeight:true,
		responsive:{
			0:{
				items:1
			},
			641:{
				items: 1,
				margin: 15
			},
			768:{
				items:1,
				margin: 15
			},
			1024:{
				items:2,
				margin:15
			},
			1230:{
				items:2,
				margin:70
			}
		}
	});

	// testimonial-slider
	$('.testimonial-block .owl-carousel').owlCarousel({
		stagePadding: 110,
		loop:false,
		margin:30,
		nav:true,
		dots: false,
		rewind: false,
		responsive:{
			0:{
				items:1,
				margin: 10,
				stagePadding: 0
			},
			641:{
				items: 1,
				margin: 10,
			},
			768:{
				items:2,
				margin: 10,
				stagePadding: 20
			},
			1024:{
				items:2,
				margin:15,
				stagePadding: 60
			},
			1230:{
				items:2
			}
		}
	});	

	// product-page review-slider
	$('.product-page .review-block .owl-carousel').owlCarousel({
		items:3,
		loop:false,
		margin:12,
		nav:true,
		dots: false,
		mouseDrag: false,
		responsive:{
			0:{
				items:1,
				margin: 0
			},
			400:{
				items:2,
				margin: 5
			},
			641:{
				items:3,
				margin: 5
			},
			1024:{
				items:3,
				margin: 8
			}
		}
	});

	// review-page review-slider
	$('.review-page .review-block .owl-carousel').owlCarousel({
		items:4,
		loop:false,
		margin:10,
		nav:true,
		dots: false,
		mouseDrag: false,
		responsive:{
			0:{
				items:1,
				margin: 0
			},
			400:{
				items:2,
				margin: 5
			},
			641:{
				items:3,
				margin: 5
			},
			1024:{
				items:4
			}
		}
	});

	// product-page course-slider
	$('.course-slider .owl-carousel').owlCarousel({
		items:5,
		loop:false,
		margin:20,
		nav:true,
		dots: false,
		responsive:{
			0:{
				items: 1,
				margin: 0
			},
			480:{
				items: 2,
				margin: 10
			},
			641:{
				items: 3,
				margin: 8	
			},
			768:{
				items: 3,
				margin: 8	
			},
			900:{
				items: 4,
				margin: 8
			},
			1024:{
				items: 4,
				margin: 10
			},
			1120:{
				items: 5,
				margin: 10
			},
			1240:{
				items: 5
			}
		}
	});

	// product-page course-slider
	$('.blogs-block.owl-carousel').owlCarousel({
		items:2,
		loop:false,
		margin: 0,
		autoHeight: true,
		nav:true,
		dots: false,
		responsive:{
			0:{
				items: 1
			},
			641:{
				items: 1
			},
			768:{
				items: 2
			}
		}
	});

	// aws-consulting-page consulting slider
	$('.consulting-block .owl-carousel').owlCarousel({
		slideBy: 4,
		loop: false,
		margin: 20,
		nav: true,
		dots: false,
		responsive:{
			0:{
				items:1
			},
			480:{
				margin: 10,
				items: 2
			},
			641:{
				margin: 10,
				items:2
			},
			767:{
				items: 3,
				margin: 10
			},
			1000:{
				items:4
			}
		}
	});

	// write-review-page reviewer vertical slider scipt
	$(".reviewer-slider").slick({
		dots: false,
		vertical: true,
		centerMode: false,
		slidesToShow: 10,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 10000,
		cssEase: 'linear'
	});

	// Dashboaard Connections page pending invitation slider script
	$('.user-list-group.owl-carousel').owlCarousel({
		loop:false,
		margin:8,
		nav:true,
		dots: false,
		responsive:{
			0:{
				items:1
			},
			480:{
				items:2,
				margin:5
			},
			641:{
				items:2
			},
			768:{
				items:3
			},
			1024:{
				items:4
			},
			1240:{
				items:5
			}
		}
	});

	/* ------ End carousel slider Scripts ------ */


});

/* Script all functions
------------------------------------------------------------------------------*/	


//---- product page smooth scroll script ----//
$(document).ready(function() {

	var scrollLink = $('.nav-list .scroll');
	let header_height = $('header').outerHeight();
	let scroll_nav = $('.scroll-nav').outerHeight();

  // Smooth scrolling
  scrollLink.click(function(e) {
  	e.preventDefault();
  	$('body,html').animate({
  		scrollTop: $(this.hash).offset().top - (header_height + scroll_nav - 1)
  	}, 0 );
  });
  
  // Active link switching
  $(window).scroll(function() {
  	var scrollbarLocation = $(this).scrollTop();

  	scrollLink.each(function() {
  		var sectionOffset = $(this.hash).offset().top - 180; 
  		if ( sectionOffset <= scrollbarLocation ) {     
  			$(this).parent().addClass('active');
  			$(this).parent().siblings().removeClass('active');
  		}
  	});

  });
  
});	

