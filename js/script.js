'use strict';

//LOADER/SPINNER
$(window).bind('load', function() {
	$('.spn_hol').fadeOut(1000);
});

$(document).ready(function() {

	// MENU APPEAR AND HIDE
	$(window).scroll(function() {
		if ($(window).scrollTop() > 80) {
			$('.navbar').css({
				'margin-top': '0px',
				'opacity': '1'
			})
			$('.navbar-nav>li>a').css({
				'padding-top': '15px'
			});
			$('.navbar-brand img').css({
				'height': '35px'
			});
			$('.navbar-brand img').css({
				'padding-top': '0px'
			});
			$('.navbar-default').css({
				'background-color': 'rgba(59, 59, 59, 0.7)'
			});
		} else {
			$('.navbar').css({
				'margin-top': '-100px',
				'opacity': '0'
			})
			$('.navbar-nav>li>a').css({
				'padding-top': '45px'
			});
			$('.navbar-brand img').css({
				'height': '45px'
			});
			$('.navbar-brand img').css({
				'padding-top': '20px'
			});
			$('.navbar-default').css({
				'background-color': 'rgba(59, 59, 59, 0)'
			});
		}
	});

	// MENU SECTION ACTIVE
	$('.navbar-nav li a').click(function() {
		$('.navbar-nav li a').parent().removeClass('active');
		$(this).parent().addClass('active');
	});

	// Hilight MENU on SCROLl
	$(window).scroll(function() {
		$('.page').each(function() {
			var bb = $(this).attr('id');
			var hei = $(this).outerHeight();
			var grttop = $(this).offset().top - 70;
			if ($(window).scrollTop() > grttop - 1 && $(window).scrollTop() < grttop + hei - 1) {
				$('.navbar-nav li a[href=\'#' + bb + '\']').parent().addClass('active');
			} else {
				$('.navbar-nav li a[href=\'#' + bb + '\']').parent().removeClass('active');
			}
		});
	});

	// SMOOTH MENU SCROOL
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	// FIX HOME SCREEN HEIGHT
	setInterval(function() {
		var widnowHeight = $(window).height();
		var containerHeight = $('.home-container').height();
		var padTop = widnowHeight - containerHeight;
		$('.home-container').css({
			'padding-top': Math.round(padTop / 2) + 'px',
			'padding-bottom': Math.round(padTop / 2) + 'px'
		});
	}, 10);

	// PARALLAX
	$(window).bind('load', function() {
		'use strict';
		parallaxInit();
	});

	function parallaxInit() {
		'use strict';
		$('.home-parallax').parallax('30%', 0.1);
		$('.subscribe-parallax').parallax('30%', 0.1);
		$('.testimonial').parallax('10%', 1);
		/*add as necessary*/
	}

	// OWL CAROSEL for TECHNOLOGIES
	$('#owl-technologies').owlCarousel({
		autoPlay: 3000,
		autoplay: true,
		autoplayTimeout: 1500,
		loop: true,
		margin: 10,
		responsiveClass: true,
		items: 1
	});

	// OWL CAROSEL for TEAM
	$('#the-team-carousel').owlCarousel({
		autoPlay: 3000,
		autoplay: true,
		navigation: true,
		pagination: false,
		dots: false,
		loop: true,
		responsive: {
			0: {
				items: 1,
				nav: false,
				autoplay: true,
				autoplayTimeout: 2500,
				autoplayHoverPause: true
			},
			600: {
				items: 2,
				nav: false,
				autoplay: true,
				autoplayTimeout: 2500,
				autoplayHoverPause: true
			},
			1000: {
				items: 2,
				nav: false
			}
		}
	});

	// PRETTYPHOTO
	$('a[rel^=\'prettyPhoto\']').prettyPhoto({
		show_title: false,
		/* true/false */
	});

	//WOW JS
	new WOW().init();

	// RESPONSIVE VIDEO
	// Basic FitVids Test
	$('.video').fitVids();

	// MAILCHIMP
	$('#mc-form').ajaxChimp({
		callback: mailchimpCallback,
		url: 'https://themerocks.us9.list-manage.com/subscribe/post?u=f04c804868966b1b4509daa9b&amp;id=ad7b6aba65'
	});

	function mailchimpCallback(resp) {
		if (resp.result === 'success') {
			$('.subscription-success').html('<i class="pe-7s-check"></i><br/>' + resp.msg).fadeIn(1000);
			$('.subscription-error').fadeOut(500);
		} else if (resp.result === 'error') {
			$('.subscription-error').html('<i class="pe-7s-close-circle"></i><br/>' + resp.msg).fadeIn(1000);
		}
	}

	// CONTACT FORM VALIDATION
	$('.form_submit').click(function() {
		var name = $('#name').val();
		var emaild = $('#email').val();
		var subject = $('#subject').val();
		var message = $('#message').val();
		var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
		if (!name) {
			$('.form_error .name_error').addClass('show').removeClass('hide');
			return false;
		} else {
			$('.form_error .name_error').addClass('hide').removeClass('show');
		}
		if (!emaild) {
			$('.form_error .email_error').addClass('show').removeClass('hide');
			return false;
		} else {
			$('.form_error .email_error').addClass('hide').removeClass('show');
			if (testEmail.test(emaild)) {
				$('.form_error .email_val_error').addClass('hide').removeClass('show');
			} else {
				$('.form_error .email_val_error').addClass('show').removeClass('hide');
				return false;
			}
		}
		if (!message) {
			$('.form_error .message_error').addClass('show').removeClass('hide');
			return false;
		} else {
			$('.form_error .message_error').addClass('hide').removeClass('show');
		}
		if (name && emaild && message) {
			$.ajax({
				url: 'https://postmail.invotes.com/send',
				data: {
					access_token: 'e30yotw8h2k7muu24d2emfg9',
					subject: subject,
					text: 'Message: \n' + message + '\n\n Sender: ' + name + ' ' + emaild
				},

				type: 'POST',
				success: function() {
					$('.Sucess').show();
					$('.Sucess').fadeIn(2000);
					$('.Sucess').html('<i class=\'fa fa-check\'></i> Beste <b>' + name + '</b> Dank je wel voor je informatie verzoek we nemen zo snel mogelijk contact met je op!');
					$('#Name').val('');
					$('#Email').val('');
					$('#Subject').val('');
					$('#Message').val('');
					$('.form_error .name_error, .form_error .email_error, .form_error .email_val_error, .form_error .message_error').addClass('hide').removeClass('show');
					$('#name').val('');
					$('#email').val('');
					$('#subject').val('');
					$('#message').val('');
				}
			});
		}
		return false;
	});

	// SMOOTH SCROLL
	var scrollAnimationTime = 1200,
		scrollAnimation = 'easeInOutExpo';
	$('a.scrollto').bind('click.smoothscroll', function(event) {
		event.preventDefault();
		var target = this.hash;
		$('html, body').stop().animate({
			'scrollTop': $(target).offset().top
		}, scrollAnimationTime, scrollAnimation, function() {
			window.location.hash = target;
		});
	});

	// COUNTER
	$('.counter_num').counterUp({
		delay: 10,
		time: 2000
	});

	// ZOOMABLE IMAGES
	$('.modal').on('shown.bs.modal', function() {
		$('.zoomable-image').elevateZoom({
			zoomType: 'inner',
			cursor: 'crosshair'
		});
	});

	$('.modal').on('hide.bs.modal', function() {
		$('.zoomWindow').remove();
		$('.zoomContainer').remove();
	});
});
