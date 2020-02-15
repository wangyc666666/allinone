
function setCookie(key, value) {
        document.cookie = key + "=" + escape(value);
}
//获取cookie的值
    function getCookie(key) {
        if (document.cookie.length) {
            var cookies = ' ' + document.cookie;
            var start = cookies.indexOf(' ' + key + '=');
            if (start == -1) { return null; }
            var end = cookies.indexOf(";", start);
            if (end == -1) { end = cookies.length; }
            end -= start;
            var cookie = cookies.substr(start,end);
            return unescape(cookie.substr(cookie.indexOf('=') + 1, cookie.length - cookie.indexOf('=') + 1));
        }
        else { return null; }
    }


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
        url:'/video_addfavor/',
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
                $('#favorNum').text(temp);
                }
            }else{
                alert(obj.message);
            }
        }
    });
}


function buy_now(add,new_id ) {
    newId = new_id
    $.ajax({
        url: '/add_to_cart/',
        data: {
            newId: newId,

        },

        type:'POST',

    success:function(callback) {
        var callback = jQuery.parseJSON(callback);
        console.log(callback.message);
        if (callback.message=='ok'){
            window.location.href='/my_shopping_cart';

        };
        if(callback.message=='already add to cart'){

             window.location.href='/my_shopping_cart';

        };
        if(callback.message=='not login'){

             alert('请先登入');
        };

    }

    });

}



function add_to_cart(add,new_id ) {
    newId = new_id
    $.ajax({
        url: '/add_to_cart/',
        data: {
            newId: newId,

        },

        type:'POST',

    success:function(callback) {
        var callback = jQuery.parseJSON(callback);
        console.log(callback.message);
        if (callback.message=='ok'){
            alert('加入购物车成功');

        };
        if(callback.message=='already add to cart'){

             alert('已加入购物车');
        };
        if(callback.message=='not login'){

             alert('请先登入');
        };

    }

    });

}


function collection_video_news(video_news) {
     //var video_new_id = $('#videoplayer_new_id').href.val();
     //var video_new_id = document.getElementById('videoplayer_new_id').href;
     var video_new_id = video_news

    $.ajax({
            url:'/collection/',
            data:{
                videoNewid:video_new_id,


            },

            type:'POST',


    success:function(callback) {
        var callback = jQuery.parseJSON(callback);
        console.log(callback.message);
        if (callback.message=='ok'){
            var favNum =  callback.data;
            $('#favNum').text(favNum);
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


function mobile_video_saerch(doc){
var search_content = $('#mobile_video_saerch_id').val();

    $.ajax({
        url:'/mobile_search/?keywords='+search_content+'&type=video',
        data:{search_content:search_content},
        type:'POST',

        success:function(callback){

            var obj = jQuery.parseJSON(callback);
            if (obj.status==1){
                if (obj.username=='None'){
                location.href = "/mobile_login/";
                                alert("请先登入再查询");
                                }else{

                var temp =  obj.data;
                $('#favorNum').text(temp);
                }
            }else{
                alert(obj.message);
            }
        }
    });
}