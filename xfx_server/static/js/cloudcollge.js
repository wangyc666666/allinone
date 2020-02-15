//点赞功能
	function Favor(doc,id){

	    if(getCookie(id)==null){
                				setCookie(id,"www.askeds.com");
                				//alert("设置cookie成功");
          					}else{
           						if(getCookie(id)=="www.askeds.com"){
               						alert("请勿重复点赞");
               						return ;
           						 }
						}
		$.ajax({
			url:'/addfavor/',
			data:{nid:id},
			type:'POST',

			success:function(callback){

				var obj = jQuery.parseJSON(callback);
				if (obj.status==1){
				    if (obj.username=='None'){
					location.href = "/login/";
                                   	alert("请先登入再点赞");
                                	}else{

				   	var temp =  obj.data;
				   	$('#favnum').text(temp);
					}
				}else{
					alert(obj.message);
				}
			}
		});
	}


function doc_collect(doc_col,id) {

     var doc_new_id = id;

    $.ajax({
            url:'/doc_collection/',
            data:{
                docNewid:doc_new_id,


            },

            type:'POST',

    success:function(callback) {
        var callback = jQuery.parseJSON(callback);
        console.log(callback.message);
        if (callback.message=='ok'){
            alert('收藏成功');

        };
        if(callback.message=='already focus'){

             alert('已收藏');
        };
        if(callback.message=='not login'){

             alert('请先登入');
        };




    }

    });

}