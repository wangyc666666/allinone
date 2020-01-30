var em;
$(function(){
    em = [
        {'id':1,'phrase':'[微笑]','url':'uiem001.svg'},
        {'id':2,'phrase':'[憨笑]','url':'uiem002.svg'},
        {'id':3,'phrase':'[愉快]','url':'uiem003.svg'},
        {'id':4,'phrase':'[可怜]','url':'uiem004.svg'},
        {'id':5,'phrase':'[调皮]','url':'uiem005.svg'},
        {'id':6,'phrase':'[流泪]','url':'uiem006.svg'},
        {'id':7,'phrase':'[悲伤]','url':'uiem007.svg'},
        {'id':8,'phrase':'[偷笑]','url':'uiem008.svg'},
        {'id':9,'phrase':'[坏笑]','url':'uiem009.svg'},
        {'id':10,'phrase':'[难过]','url':'uiem010.svg'},
        {'id':11,'phrase':'[发呆]','url':'uiem011.svg'},
        {'id':12,'phrase':'[发怒]','url':'uiem012.svg'},
        {'id':13,'phrase':'[惊讶]','url':'uiem013.svg'},
        {'id':14,'phrase':'[冷汗]','url':'uiem014.svg'},
        {'id':15,'phrase':'[生气]','url':'uiem015.svg'},
        {'id':16,'phrase':'[擦汗]','url':'uiem016.svg'},
        {'id':17,'phrase':'[晕]','url':'uiem017.svg'},
        {'id':18,'phrase':'[流汗]','url':'uiem018.svg'},
        {'id':19,'phrase':'[再见]','url':'uiem019.svg'},
        {'id':20,'phrase':'[亲吻]','url':'uiem020.svg'},
        {'id':21,'phrase':'[撇嘴]','url':'uiem021.svg'},
        {'id':22,'phrase':'[惊吓]','url':'uiem022.svg'},
        {'id':23,'phrase':'[白眼]','url':'uiem023.svg'},
        {'id':24,'phrase':'[抠鼻]','url':'uiem024.svg'},
        {'id':25,'phrase':'[傲慢]','url':'uiem025.svg'},
        {'id':26,'phrase':'[阴险]','url':'uiem026.svg'},
        {'id':27,'phrase':'[鄙视]','url':'uiem027.svg'},
        {'id':28,'phrase':'[可怜]','url':'uiem028.svg'},
        {'id':29,'phrase':'[发火]','url':'uiem029.svg'},
        {'id':30,'phrase':'[尴尬]','url':'uiem030.svg'},
        {'id':31,'phrase':'[抓狂]','url':'uiem031.svg'},
        {'id':32,'phrase':'[惊恐]','url':'uiem032.svg'},
        {'id':33,'phrase':'[委屈]','url':'uiem033.svg'},
        {'id':34,'phrase':'[害羞]','url':'uiem034.svg'},
        {'id':35,'phrase':'[鼓掌]','url':'uiem035.svg'},
        {'id':36,'phrase':'[咒骂]','url':'uiem036.svg'},
        {'id':37,'phrase':'[色]','url':'uiem037.svg'},
        {'id':38,'phrase':'[疑问]','url':'uiem038.svg'},
        {'id':39,'phrase':'[左哼哼]','url':'uiem039.svg'},
        {'id':40,'phrase':'[右哼哼]','url':'uiem040.svg'},
        {'id':41,'phrase':'[得意]','url':'uiem041.svg'},
        {'id':42,'phrase':'[闭嘴]','url':'uiem042.svg'},
        {'id':43,'phrase':'[睡]','url':'uiem043.svg'},
        {'id':44,'phrase':'[呕吐]','url':'uiem044.svg'},
        {'id':45,'phrase':'[困]','url':'uiem045.svg'},
        {'id':46,'phrase':'[嘘]','url':'uiem046.svg'},
        {'id':47,'phrase':'[打哈欠]','url':'uiem047.svg'},
        {'id':48,'phrase':'[笑哭]','url':'uiem048.svg'},
        {'id':49,'phrase':'[糗大了]','url':'uiem049.svg'},
    ];

    faceHtml = function(obj,opx,textareaid,top,left){

        var faceHtml = '<div id="face" class="uiem-box">';
            faceHtml += '<div id="texttb" class="uiem-nav"></div>';
            faceHtml += '<div id="facebox">';
            faceHtml += '<div id="face_detail" class="cl"><ul class="uiem-cont cl">';

        for( i = 0; i < em.length; i++) {
            faceHtml += '<li text=' + em[i].phrase + ' type=' + i + '><img title=' + em[i].phrase + ' src="http://s9.ui.cn/uiem48/'+ em[i].url + '"  style="cursor:pointer; position:relative;"   /></li>';
        }
        faceHtml += '</ul></div>';

        $(obj).find('#face').remove();
        $(obj).append(faceHtml);

        $(obj).find("#face_detail ul >li").bind("click", function(e) {
            var txt = $(this).attr("text");
            var faceText = txt;

            var tclen = $(opx).val().length;
            
            var tc = document.getElementById(textareaid);
            var pos = 0;
            if(typeof document.selection != "undefined"){
                //IE
                $(opx).focus();
                //设置焦点
                setCursorPosition(tc, cpos);
                document.selection.createRange().text = faceText;
                //计算光标位置
                pos = getPositionForTextArea(tc); 
            }else{
                //火狐
                //计算光标位置
                pos = tc.selectionStart + faceText.length;
                $(opx).val($(opx).val().substr(0, tc.selectionStart) + faceText + $(opx).val().substring(tc.selectionStart, tclen));
            }

            cpos = pos;
            //设置焦点
            setCursorPosition(tc, pos);
            $(obj).find("#face").remove();

        });
            
        var offset = {};
        offset.top = top;
        offset.left = left;
        $(obj).find("#face").css(offset).show();

    }

    //textarea设置光标位置
    function setCursorPosition(ctrl, pos){
        if(ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(pos, pos);
        }else if(ctrl.createTextRange) {
            // IE Support
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    //评论框下的表情
    $("#btn").click(function(){

        faceHtml('#comment','#textarea','textarea',128,0);
        
    })

    //回复框下的表情
    $(document).on('click','.btn_inner',function(){
        faceHtml('#comment_inner','#textarea_inner','textarea_inner',130,0);
    })

    // 隐藏表情框
    $(document).on('click','#btn, .btn_inner', function(event){
        if($(this).hasClass('open')){
            $("#face").remove();
            $(this).removeClass('open');
            return false;
        }
        $(this).addClass('open');
        event.stopPropagation();
    });
     $("#face").click(function(event){
        event.stopPropagation();
    });
    $(document).click(function(){
        $("#face").remove();
        $("#btn").removeClass('open');
        $(".btn_inner").removeClass('open');
    });


        
});