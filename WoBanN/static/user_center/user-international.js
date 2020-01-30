var NetcnUserInternational = {
    init:function(){
        var userIsIntl = $("meta[name='_user_is_intl']").attr("content");
        if( "true" == userIsIntl){
            HichinaConsole.popup.dialog({
                title:'',
                contIcon:'',
                contTitle:'您好，该功能暂未开放给国际站客户，页面将在5秒后跳转到<a href="http://intl.aliyun.com">阿里云国际站</a>',
                width:500,
                btnYes:'',
                btnNo:'',
                contEventHandler:function(dialog,instance,opts){
                    setTimeout(function(){
                        window.location.href = "http://intl.aliyun.com";
                    }, 5000);
                },
                btnYesClick:function(dialog,instance,opts){
                    window.location.href = "http://intl.aliyun.com";
                    instance.close();
                },
                btnNoClick:function(dialog,instance,opts){
                    window.location.href = "http://intl.aliyun.com";
                    instance.close();
                }
            });
        }
    }
}