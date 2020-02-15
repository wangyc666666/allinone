$('i[class=icon-ok]').click(function(){
		// alert('删除');
		$.ajax({
			type:'post',
			url:'/filedel',
			data:{'filename':$(this).prev('a').find('span').html(),'acl':acl},
			dataType:'json',
			success:function(msg){
				if(msg.statu){
					$('p[class=finish]').hide();
				}
				globalTip(msg);
			},
			error:function(){
				globalTip({'msg':'请求失败'});
			}
		})
});