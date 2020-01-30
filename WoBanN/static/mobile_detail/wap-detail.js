(function(){

	//赞
	$(document).on('touchend', '#like', function() {

		var data = $(this).attr('data'), 
			$this = $(this);
		var pid = $this.attr('rel');
		var owneid = $this.attr('_rel');
		var likenum = parseInt($('#likenum').find('span').text());

		$.ajax({
			type:'post',
            url:'/edlike',
            data:{'pid':pid,'ownerid':owneid,'type':data},
            dataType:'json',
            success:function(msg){
            	//登录
            	if(msg.code==1){
            		globalTip(msg);
            		num = likenum+1;
            		$('#likenum').find('span').text(num);
            		$('.iheart').addClass('on');
            		$this.attr('data','unlike');

            	}else{

            		globalTip(msg);
            	}

            	//未登陆
            	if(msg.code == 2){
					globalTip(msg);
					
					num = likenum+1;
            		$('#likenum').find('span').text(num);
            		$('.iheart').addClass('on');

            	}else{
            		globalTip(msg);
            	}

            	//取消
            	if(msg.code == 3){

            		globalTip(msg);

					num = likenum-1;
            		$('#likenum').find('span').text(num);
            		$('.iheart').removeClass('on');
            		$this.attr('data','like');
            	}else{
            		globalTip(msg);
            	}
                
				return false;
            }
		})

		return false;
	
	});

	//收藏
	$(document).on('touchend', '#fav', function() {
		
		var data = $('.istar').attr('data');
		var pid = $(this).attr('rel');
		var ownerid = $(this).attr('_rel');

		//登录了
		if(uid){

			// 添加收藏
			if(data == 'addfav'){

				$.ajax({
					type:'post',
		            url:'/edfav',
		            data:{'pid':pid,'ownerid':ownerid,'act':'addfav'},
		            dataType:'json',
		            success:function(msg){

		            	if(msg.code){

		            		globalTip(msg);
		            		$('.istar').addClass('on');
		                	$('.istar').attr('data','unfav');
		            	}else{

		            		globalTip(msg);
		            	}
		                
						return false;
		            }
				})
			}

			// 取消收藏
			if(data == 'unfav'){

				$.ajax({
					type:'post',
		            url:'/edfav',
		            data:{'pid':pid,'ownerid':ownerid,'act':'unfav'},
		            dataType:'json',
		            success:function(msg){

		            	if(msg.code){

		            		globalTip(msg);
		            		$('.istar').removeClass('on');
		                	$('.istar').attr('data','addfav');
		            	}else{

		            		globalTip(msg);
		            	}
		                
						return false;
		            }
				})
			}
			

		}else{

			globalTip({'msg':'登录后才能收藏！','setTime':3,'URL':'http://ui.cn/login.html','jump':true});
			return false;
		}
	
	});


	var replayid = '';
	var	pid = '';
	var cid = '';
	//添加评论
	$(document).on('touchend', '.add-com', function() {

		pid = $(this).attr('id');

	})

	//回复评论
	$(document).on('touchend','.reply-btn',function(){


		replayid = $(this).attr('_rel');
		pid = $(this).attr('rel');
		cid = $(this).attr('id');
		var replayname = $('#com-'+cid).find('.comm-info h3').text();
		var replayString = '@'+replayname+':  ';

		$('textarea').focus().val(replayString);

	})


	//评论和回复提交
	$(document).on('touchend','#c-submit',function(){
		var newContent = $('textarea').val();
		var mat = /[\u4E00-\u9FA5]/g;

		if(uid){

			//如果有回复者ID就是回复
			if(replayid){

				// 将中文冒号换成英文冒号
				newContent = newContent.replace('：', ':');
				var replayRep = /^@.*?:/

				// 匹配出@用户名
				var atName = newContent.match(replayRep);

				// 如果匹配为空时
				if ( atName == null ) {

					replayid = 0;

				}

				//把@用户名替换成空
				newContent = newContent.replace(atName, '');
				//将没有@用户名的去空格
				newContent = newContent.trim();

			}

			if(newContent.match(mat) == null){

				globalTip({'msg':'评论内容不能为空','setTime':3});
				return false;
			}


				$.ajax({
					type:'post',
		            url:'/addcom',
		            data:{'pid':pid,'replayid':replayid,'ownerid':ownerid,'comid':cid,'content':newContent},
		            dataType:'json',
		            success:function(msg){

		            	if(msg.code == 1){

		            		globalTip(msg);
		            		$('.shade').hide();
							$('.comment-pop').hide();
							$('textarea').val('');

		            		cnum = parseInt($('.comnum:last').text())+1;

		            		$('.comnum').empty().append(cnum);

		            		var replayHtml;
								replayHtml  = '<li class="pos cl" id="com-'+msg.commentid+'">';
								replayHtml += '<a class="avatar" href="http://i.ui.cn/ucenter/'+msg.id+'" target="_blank"><img src="'+msg.head+'" /></a>';
								replayHtml += '<div class="comm-info">';
								replayHtml += '<h3><a href="http://i.ui.cn/ucenter/'+msg.id+'" target="_blank">'+msg.username+'</h3><span>'+msg.time+'</span>';
								replayHtml += '<p>';
								
								if(msg.replayname){

									replayHtml += '<a href="http://i.ui.cn/ucenter/'+msg.replyto+'" target="_blank">@'+msg.replayname+'</a>: ';
								}
								
								replayHtml += msg.content;
								replayHtml += '</p></div>';

								replayHtml += '<a class="reply-btn" href="javascript:;" id="'+msg.commentid+'" rel="'+msg.pid+'" _rel="'+msg.uid+'">回复</a><a class="replaydel" href="javascript:;" id="'+msg.commentid+'" rel="'+msg.pid+'" _rel="'+msg.uid+'">删除</a>';

								replayHtml += '</li>';

							$('#c-comlist').prepend(replayHtml).slideDown();
							

		            	}else{

		            		globalTip(msg);
		            	}
		                
						return false;
		            }
				})

			

		}else{

			//未登录，直接跳转到登录页
			globalTip({'msg':'登录后才能评论！','setTime':3,'URL':'http://ui.cn/login.html','jump':true});
			return false;
		}
		
		return false;
	});



	//删除评论
	$(document).on('touchend', '.replaydel', function() {
		var cid = $(this).attr('id');
		var pid = $(this).attr('rel');
		var uid = $(this).attr('_rel');

		if(confirm("确定要删除评论吗？")){

			$.ajax({
				type:'post',
	            url:'/delcom',
	            data:{'cid':cid,'pid':pid,'uid':uid,'act':'addcom'},
	            dataType:'json',
	            success:function(msg){

	            	if(msg.code == 1){

	            		globalTip(msg);
	            		
	            		cnum = parseInt($('.comnum:last').text())-1;
	            		$('.comnum').empty().append(cnum);

	            		$('#com-'+cid).slideUp('slow', function(){
							$(this).remove();
						});
	            	}else{

	            		globalTip(msg);
	            	}
	            }
			})

		}

		return false;
	});


	//更多评论
	$(document).on('touchend','.more-comment',function(){
		var id = $(this).attr('id');
		var nomore = 1;

		if(nomore){

			$.ajax({

				type:'post',
	            url:'/morecom',
	            data:{'pid':id},
	            dataType:'json',
	            success:function(msg){

	            	if(msg.stat){

	            		nomore = 0;

	            		$('#c-comlist').empty().append(msg.html);
	            		$('.more-comment').hide();
	            	}else{

	            		globalTip({'msg':'没有评论了','setTime':3});
						return false;
	            	}
	            	
	            }
			})
		}else{

			globalTip({'msg':'没有评论了','setTime':3});
			return false;
		}
		

	});
})();