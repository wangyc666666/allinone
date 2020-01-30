$(function(){

	// 显示作品详情
	var toggle = true;
	$('.hd-user i').click(function(){
		
		if (toggle == true){

			toggle = false;
			$('.hd-info').show();
			$(this).removeClass('icon-down');
			$(this).addClass('icon-up');

		} else if (toggle == false){

			toggle = true;
			$('.hd-info').hide();
			$(this).removeClass('icon-up');
			$(this).addClass('icon-down');
		}
	});
	
	// 判断是否是微信浏览器打开
	function is_weixn(){  
	    var ua = navigator.userAgent.toLowerCase();  
	    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
	        weixin = true;  
	    } else {  
	        weixin = false;  
	    }  
	} 
	// 弹出分享
	$('.ishare').click(function(){
		is_weixn();
		if (weixin == false) {
			$(".share-pop").show();
			$('.shade').show();
		} else {
			$(".share-pop-w").show();
			$('.shade').show();
		}
		
	});

	// 弹出评论框
	$(document).on('touchend', '.reply-btn, .add-com', function() {
		$('.shade').show();
		$('.comment-pop').show();
		$('textarea').focus();
	});

	// 点击取消隐藏评论和分享
	$(document).on('touchend', '.cancel', function() {
		$('textarea').val('');
		$('.shade').hide();
		$('.comment-pop').hide();
		$('.share-pop').hide();
		return false;
	});

	// 点击遮罩隐藏评论和分享
	$(document).on('touchend', '.shade', function() {
		$('textarea').val('');
		$('.shade').hide();
		$('.comment-pop').hide();
		$(".share-pop").hide();
		$(".share-pop-w").hide();
	});
	
	// 关闭登陆框
	// $(".more-comment").click(function(){
	// 	$(".login").show();
	// });
	// $(".icon-close").click(function(){
	// 	$(".login").hide();
	// });

	// 显示首页侧栏

	var $body = $('body');
	function disable(e) {
		e.preventDefault();
	}
    $('#panelSwitch').click(function(){
    		    window.scrollTo(0,0);  
	    $(document).on('touchmove', disable);

	    if($body.hasClass('panel-active')){
		    $body.removeClass('panel-active');
		    $(document).off('touchmove', disable);
	    }
	    else{
	        $body.addClass('panel-active');
	        $(document).on('touchmove', disable);
	    }
    });

    var windowHeight = $(document).height(),
    $body = $("body");
    $body.css("height", windowHeight);
    var startX, startY, moveEndX, moveEndY, X, Y;

	$("body").on("touchstart", function(e) {
	    startX = e.originalEvent.changedTouches[0].pageX,
		startY = e.originalEvent.changedTouches[0].pageY;
	});
	$("body").on("touchmove", function(e) {
		moveEndX = e.originalEvent.changedTouches[0].pageX,
		moveEndY = e.originalEvent.changedTouches[0].pageY,
	    X = moveEndX - startX,
	    Y = moveEndY - startY;

	    if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {  //Math.abs(X) 取X的绝对值
	    	$body.removeClass('panel-active');
	    	$(document).off('touchmove', disable);
	    }

	});

});