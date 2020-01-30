$(function(){
	// 上传列表鼠标经过
	$(document).on('mouseenter', '.up-thumb-item', function(){
	   $(this).find('.thumb-oper')
	       .stop()
	       .animate({
	           'bottom'	:	0
	       },200);
	});
	$(document).on('mouseleave', '.up-thumb-item', function(){
	   $(this).find('.thumb-oper')
	       .stop()
	       .animate({
	           'bottom'	:	-80
	       },150);
	});

	//选择下拉框
	$(".select-box").click(function(){
	    var $this = $(this);
	    $this.blur();
	    var o = $this.find('.select-option').css('display');
	    if( o == 'none' ){
	        $this.find(".select-option").slideDown();
	        $this.find('.select-value > i').addClass('on');
	    }else{
	        $this.find(".select-option").slideUp();
	        $this.find('.select-value > i').removeClass('on');
	    }

	    /*点击任何地方关闭层*/
	    $(document).click(function(event){
	        var tar = $(event.target).attr("class");
	        if( tar != $this ){
	            $this.find(".select-option").slideUp();
	            $this.find('.select-value > i').removeClass('on');
	        }
	    });
	    return false;
	});


    $(".select-option a").click(function(){
       
    	$(this).parents('.select-box').find('input').val($(this).attr('rel'));
    	$(this).parents('.select-box').find('span[class=select-value-tit]').html($(this).text());
        var scatidVal = $(this).attr('rel');
       if($(this).parents('.select-box').attr('id') =='selectBox-attribute'){
       		if ( (scatidVal == 6 || scatidVal == 16 || scatidVal == 29)) {
	        	$('#upSource').show();
	        } else {
	        	$('#upSource').hide();
	        }
       }
       
       if($(this).parents('#selectBox-typeid').length){
       		 $.ajax({
		        	url:'/hotTag',
		        	data:{'type':$(this).attr('rel')},
		        	type:'post',
		        	dataType:'json',
		        	success:function(msg){
		        		var html = '';
		        		$.each(msg,function(i,val){
		        			html += '<a class="cl" href="javascript:;"><i class="icon-tag-mini"></i><span>'+val.tag_name+'</span></a>';
		        		})
		        		$('.up-hot-tag a').remove();
		        		$('.up-hot-tag').append(html);

		        	},error:function(){}
		        });
       }

        $(this).parents('.select-option').find('a').removeClass('on');
        $(this).addClass('on');

    });


	// 本地上传/网盘地址
	$('#upAttaFile').click(function(){
	    $('.up-atta-file').show();
	    $('.up-atta-url').hide();
	});
	
	$('#upAttaUrl').click(function(){
	    $('.up-atta-url').show();
	    $('.up-atta-file').hide();
	});

	//滑过视频帮助显示图片
	$('.up-video-help a').hover(function(){
		$(this).next('img').show();
	},function(){
		$(this).next('img').hide();
	});
	
	var length = $('#title').val().length;
		charcount(length);
		
	// $('#title').on('keyup',function(event){
	// 	length = $(this).val().length < 30 ? $(this).val().length : 30;
	// 	if(event.keyCode != 8){
	// 		if($($(this).val().length > 30))$(this).val($(this).val().substring(0,30));
	// 	}else{
	// 		length = $(this).val().length;
	// 	}
	// 	charcount(length);
	// });;

	function charcount(a,b){
		$('#charcount').text(a+'/30');
	}

});