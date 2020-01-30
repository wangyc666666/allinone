$('#teach').click(function(){
	$('.teachlist').show();

	$('#roul').show();
});

$('#teach_close').click(function(){
	$('.teachlist').hide();
	$('#roul').hide();
});

$(function () {
    var sel_typeid = $("#selectBox-typeid .select-value-tit"),
        sel_attribute = $("#selectBox-attribute .select-value-tit"),
        sel_strong = $("#p-title strong"),
        sel_right = $("#selectBox-copyrig .select-value-tit"),
        info_title = $("input[name='title']").val(),
        info_type1 = sel_typeid.text(),
        info_type2 = sel_attribute.text(),
        info_type3 = sel_right.text(),str;
    if(info_title==""){
        sel_strong.text("请在上面输入标题");
        sel_strong.css("color","#b8c4ce")
    }else{
        sel_strong.text(info_title);
        sel_strong.css("color","black")
    }
    $(".txt-primary").text(info_type1);
    $(".tag").text(info_type2);
    if(info_type3 == "不使用原创授权"){
        str ='<div class="copyright pos">'
            +'<i class="icon-copyright1"></i>'
            +'<span class="text">不使用原创授权</span>'
            +'</div>'
    }else if(info_type3=="署名"){
        str = '<div class="copyright pos">'
            +'<i class="icon-copyright2"></i>'
            +'<span class="text">保留作者信息</span>'
            +'</div>'
    }else if(info_type3 =="署名-非商业性使用"){
        str = '<div class="copyright pos">'
            +'<i class="icon-copyright2"></i>'
            +'<span class="text">保留作者信息</span>'
            +'</div>'
            +'<div class="copyright pos">'
            +'<i class="icon-copyright3"></i>'
            +'<span class="text">禁止商业使用</span>'
            +'</div>'
    }else if(info_type3=="署名-禁止演绎"){
        str = '<div class="copyright pos">'
            +'<i class="icon-copyright2"></i>'
            +'<span class="text">保留作者信息</span>'
            +'</div>'
            +'<div class="copyright pos">'
            +'<i class="icon-copyright4"></i>'
            +'<span class="text">禁止修改作品</span>'
            +'</div>'
    }else if(info_type3=="署名-相同方式共享"){
        str = '<div class="copyright pos">'
            +'<i class="icon-copyright2"></i>'
            +'<span class="text">保留作者信息</span>'
            +'</div>'
            +'<div class="copyright pos">'
            +'<i class="icon-copyright5"></i>'
            +'<span class="text">修改作品禁止更改版权信息</span>'
            +'</div>'
    }else if(info_type3=="署名-非商业性使用-禁止演绎"){
        str = '<div class="copyright pos">'
            +'<i class="icon-copyright2"></i>'
            +'<span class="text">保留作者信息</span>'
            +'</div>'
            +'<div class="copyright pos">'
            +'<i class="icon-copyright3"></i>'
            +'<span class="text">禁止商业使用</span>'
            +'</div>'
            +'<div class="copyright pos">'
            +'<i class="icon-copyright4"></i>'
            +'<span class="text">禁止修改作品</span>'
            +'</div>'
    }else if(info_type3=="署名-非商业性使用-相同方式共享"){
        str = '<div class="copyright pos">'
            +'<i class="icon-copyright2"></i>'
            +'<span class="text">保留作者信息</span>'
            +'</div>'
            +'<div class="copyright pos">'
            +'<i class="icon-copyright3"></i>'
            +'<span class="text">禁止商业使用</span>'
            +'</div>'
            +'<div class="copyright pos">'
            +'<i class="icon-copyright5"></i>'
            +'<span class="text">修改作品禁止更改版权信息</span>'
            +'</div>'
    }
    $(".cont_z .det").append(str);
	$(".control-input").on("keyup",function () {
		var info = $(this).val();
        if(info==""){
            sel_strong.text("请在上面输入标题");
            sel_strong.css("color","#b8c4ce")
        }else{
            sel_strong.text(info);
            sel_strong.css("color","black")
        }
    });
    sel_typeid.bind('DOMNodeInserted', function () {
		$(".txt-primary").text($(this).text())
    });
    sel_attribute.bind('DOMNodeInserted', function () {
        $(".tag").text($(this).text())
    });
    sel_right.bind("DOMNodeInserted",function () {
        var info = $(this).text().trim()
        if(info == "不使用原创授权"){
            str ='<div class="copyright pos">'
                +'<i class="icon-copyright1"></i>'
                +'<span class="text">不使用原创授权</span>'
                +'</div>'
        }else if(info=="署名"){
            str = '<div class="copyright pos">'
                +'<i class="icon-copyright2"></i>'
                +'<span class="text">保留作者信息</span>'
                +'</div>'
        }else if(info =="署名-非商业性使用"){
            str = '<div class="copyright pos">'
                 +'<i class="icon-copyright2"></i>'
                 +'<span class="text">保留作者信息</span>'
                 +'</div>'
                 +'<div class="copyright pos">'
                 +'<i class="icon-copyright3"></i>'
                 +'<span class="text">禁止商业使用</span>'
                 +'</div>'
        }else if(info=="署名-禁止演绎"){
            str = '<div class="copyright pos">'
                 +'<i class="icon-copyright2"></i>'
                 +'<span class="text">保留作者信息</span>'
                 +'</div>'
                 +'<div class="copyright pos">'
                 +'<i class="icon-copyright4"></i>'
                 +'<span class="text">禁止修改作品</span>'
                 +'</div>'
        }else if(info=="署名-相同方式共享"){
            str = '<div class="copyright pos">'
                 +'<i class="icon-copyright2"></i>'
                 +'<span class="text">保留作者信息</span>'
                 +'</div>'
                 +'<div class="copyright pos">'
                 +'<i class="icon-copyright5"></i>'
                 +'<span class="text">修改作品禁止更改版权信息</span>'
                 +'</div>'
        }else if(info=="署名-非商业性使用-禁止演绎"){
            str = '<div class="copyright pos">'
                 +'<i class="icon-copyright2"></i>'
                 +'<span class="text">保留作者信息</span>'
                 +'</div>'
                 +'<div class="copyright pos">'
                 +'<i class="icon-copyright3"></i>'
                 +'<span class="text">禁止商业使用</span>'
                 +'</div>'
                 +'<div class="copyright pos">'
                 +'<i class="icon-copyright4"></i>'
                 +'<span class="text">禁止修改作品</span>'
                 +'</div>'
        }else if(info=="署名-非商业性使用-相同方式共享"){
            str = '<div class="copyright pos">'
                 +'<i class="icon-copyright2"></i>'
                 +'<span class="text">保留作者信息</span>'
                 +'</div>'
                 +'<div class="copyright pos">'
                 +'<i class="icon-copyright3"></i>'
                 +'<span class="text">禁止商业使用</span>'
                 +'</div>'
                 +'<div class="copyright pos">'
                 +'<i class="icon-copyright5"></i>'
                 +'<span class="text">修改作品禁止更改版权信息</span>'
                 +'</div>'
        }
        $(".copyright").remove();
        $(".cont_z .det").append(str);
    })
});