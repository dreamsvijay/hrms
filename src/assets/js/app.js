var $sidebarOverlay = $(".sidebar-overlay");
$("#mobile_btn, .task-chat").on("click", function(e) {
	var $target = $($(this).attr("href"));
	if ($target.length) {
		$target.toggleClass("opened");
		$sidebarOverlay.toggleClass("opened");
		$("html").toggleClass("menu-opened");
		$sidebarOverlay.attr("data-reff", $(this).attr("href"))
	}
	e.preventDefault()
});

$sidebarOverlay.on("click", function(e) {
	var $target = $($(this).attr("data-reff"));
	if ($target.length) {
		$target.removeClass("opened");
		$("html").removeClass("menu-opened");
		$(this).removeClass("opened")
		$(".main-wrapper").removeClass("slide-nav");
	}
	e.preventDefault()
});

!function($) {
    "use strict";
    var Sidemenu = function() {
        this.$menuItem = $("#sidebar-menu a")
    };

    Sidemenu.prototype.menuItemClick = function(e) {
        if($(this).parent().hasClass("submenu")) {
			e.preventDefault();
        }   
        if(!$(this).hasClass("subdrop")) {
			$("ul",$(this).parents("ul:first")).slideUp(350);
			$("a",$(this).parents("ul:first")).removeClass("subdrop");
			$(this).next("ul").slideDown(350);
			$(this).addClass("subdrop");
        }else if($(this).hasClass("subdrop")) {
			$(this).removeClass("subdrop");
			$(this).next("ul").slideUp(350);
        }
    },

    Sidemenu.prototype.init = function() {
		var $this  = this;
		$this.$menuItem.on('click', $this.menuItemClick);
		$("#sidebar-menu ul li.submenu a.active").parents("li:last").children("a:first").addClass("active").trigger("click");
    },
    $.Sidemenu = new Sidemenu, $.Sidemenu.Constructor = Sidemenu
    
}(window.jQuery),

function($) {
    "use strict";
    var App = function() {
        this.$body = $("body")
    };
    App.prototype.init = function() {
        var $this = this;
        $(document).ready($this.onDocReady);
        $.Sidemenu.init();
    },
    $.App = new App, $.App.Constructor = App
}(window.jQuery),

function($) {
    "use strict";
    $.App.init();
}(window.jQuery);

$(document).ready(function() {
	if($('.select').length > 0 ){
		$('.select').select2({
			minimumResultsForSearch: -1,
			width: '100%'
		});
	}
});

$(document).ready(function() {
	if($('.modal').length > 0 ){
		var modalUniqueClass = ".modal";
		$('.modal').on('show.bs.modal', function(e) {
			var $element = $(this);
			var $uniques = $(modalUniqueClass + ':visible').not($(this));
			if ($uniques.length) {
				$uniques.modal('hide');
				$uniques.one('hidden.bs.modal', function(e) {
				$element.modal('show');
				});
				return false;
			}
		});
	}
});

$(document).ready(function() {
	if($('.msg-list-scroll').length > 0 ){
		$('.msg-list-scroll').slimscroll({
			height:'100%',
			color: '#878787',
			disableFadeOut : true,
			borderRadius:0,
			size:'4px',
			alwaysVisible:false,
			touchScrollStep : 100
		});
		var h=$(window).height()-124;
		$('.msg-list-scroll').height(h);
		$('.msg-sidebar .slimScrollDiv').height(h);  
		
		$(window).resize(function(){
			var h=$(window).height()-124;
			$('.msg-list-scroll').height(h);
			$('.msg-sidebar .slimScrollDiv').height(h);
		});
	}
});

$(document).ready(function(){
	if($('.slimscroll').length > 0 ){
		$('.slimscroll').slimScroll({
			height: 'auto',
			width: '100%',
			position: 'right',
			size: "7px",
			color: '#ccc',
			wheelStep: 10,
			touchScrollStep : 100
		});
		var h=$(window).height()-60;
		$('.slimscroll').height(h);
		$('.sidebar .slimScrollDiv').height(h);
		
		$(window).resize(function(){
			var h=$(window).height()-60;
			$('.slimscroll').height(h);
			$('.sidebar .slimScrollDiv').height(h);
		});
	}
});

$(document).ready(function(){
	if($('.page-wrapper').length > 0 ){
		var height = $(window).height();	
		$(".page-wrapper").css("min-height", height);
	}
});

$(window).resize(function(){
	if($('.page-wrapper').length > 0 ){
		var height = $(window).height();
		$(".page-wrapper").css("min-height", height);
	}
});
$(document).ready(function(){
	if($('.sec-content').length > 0 ){
		if ($(window).width() > 768) {
			var height = $(window).height()-120;	
			$(".sec-content").css("min-height", height);
		}
	}
});

$(window).resize(function(){
	if($('.sec-content').length > 0 ){
		if ($(window).width() > 768) {
			var height = $(window).height()-120;
			$(".sec-content").css("min-height", height);
		}
	}
});

$(function () {
	if($('.datetimepicker').length > 0 ){
		$('.datetimepicker').datetimepicker({
			format: 'DD/MM/YYYY'
		});
	}
});

$(document).ready(function() {
	if($('.datatable').length > 0 ){
		$('.datatable').DataTable();
	}
});

$(document).ready(function() {
	if($('[data-toggle="tooltip"]').length > 0 ){
		$('[data-toggle="tooltip"]').tooltip();
	}
});

$(document).ready(function(){
	if($('.btn-toggle').length > 0 ){
		 $('.btn-toggle').click(function() {
			$(this).find('.btn').toggleClass('active');  
			if ($(this).find('.btn-success').size()>0) {
				$(this).find('.btn').toggleClass('btn-success');
			}
		});
	} 
});

$(document).ready(function() {
	if($('.main-wrapper').length > 0 ){
	var $wrapper = $(".main-wrapper");
		$(document).on('click', '#mobile_btn', function (e) {
			$(".dropdown.open > .dropdown-toggle").dropdown("toggle");
			return false;
		});
		$(document).on('click', '#mobile_btn', function (e) {
			$wrapper.toggleClass('slide-nav');
			$('#chat_sidebar').removeClass('opened');
			return false;
		});
		$(document).on('click', '#open_msg_box', function (e) {
			$wrapper.toggleClass('open-msg-box');
			$('.themes').removeClass('active');
			$('.dropdown').removeClass('open');
			return false;
		});
	}
});

$(document).ready(function() {
	if($('.clickable-row').length > 0 ){
		$(".clickable-row").click(function() {
			window.location = $(this).data("href");
		});
	}
});

$(document).ready(function() {
	if($('.proimage-thumb li a').length > 0 ){
		$(".proimage-thumb li a").click(function() {
			full_image = $(this).attr("href");
			$(".pro-image img").attr("src", full_image);
			return false;
		});
	}
});

$(document).ready(function() {
	if($('#pro_popup').length > 0 ){
		$('#pro_popup').lightGallery({
			thumbnail: true,
			selector: 'a'
		});
	}
});

$(document).ready(function() {
	if($('.summernote').length > 0 ){
		$('.summernote').summernote({
			height: 200,
			minHeight: null,
			maxHeight: null,
			focus: false
		});
	}
});

$( document ).ready(function() {
	if($('.checkbox-all').length > 0 ){
		$('.checkbox-all').click(function () {
			$('.checkmail').click();
		});
	}
	if($('.checkmail').length > 0 ){
		$('.checkmail').each(function() {
			$(this).click(function() {
				if($(this).closest('tr').hasClass("checked")){
					$(this).closest('tr').removeClass('checked');
				} else {
					$(this).closest('tr').addClass('checked');
				}
			});
		});
	}
	if($('.mail-important').length > 0 ){
		$(".mail-important").click(function(){
			$(this).find('i.fa').toggleClass("fa-star");
			$(this).find('i.fa').toggleClass("fa-star-o");
		});
	}
});
$(document).ready(function(){
	if($('.dropdown-toggle').length > 0 ){
		 $('.dropdown-toggle').click(function() {
			if ($('.main-wrapper').hasClass('open-msg-box')){
				$('.main-wrapper').removeClass('open-msg-box');
			}
		});
	} 
	if($('.expand-icon').length > 0 ){
		$(".expand-icon").click(function(){
			$('.page-wrapper').toggleClass("expanded");
		});
	}
});

$( document ).ready(function() {
	$('.table-responsive').on('shown.bs.dropdown', function (e) {
    var $table = $(this),
        $dropmenu = $(e.target).find('.dropdown-menu'),
        tableOffsetHeight = $table.offset().top + $table.height(),
        menuOffsetHeight = $dropmenu.offset().top + $dropmenu.outerHeight(true);

    if (menuOffsetHeight > tableOffsetHeight)
      $table.css("padding-bottom", menuOffsetHeight - tableOffsetHeight);
	});
	$('.table-responsive').on('hide.bs.dropdown', function () {
		$(this).css("padding-bottom", 0);
	});
	
	$('a[data-toggle="modal"]').on('click',function(){
		setTimeout(function(){ if($(".modal.custom-modal").hasClass('in')){ 
		$(".modal-backdrop").addClass('custom-backdrop');
		
		} },500);
	});
});