// 弹出打卡提示
$(function(){
  function pop_signcard(){    
    var flag = false;
    var d=new Date();
    var timestamp = d.toLocaleDateString();//获取当天时间
    //console.log(timestamp)
    var sign_day = getCookie(user_id)//获取当前cookie中的日期
    var widths = $(".pop_tosignbox").width();
    $(".pop_tosignbox").css("right",-widths)
    function pop_show(){
      var html='';
      html +='<div class="pop_tosign">'
                +' <span class="off"></span>'
                +' <div class="line_tit"><span>恭喜您，今日已累积学习超过30分钟！</span></div>'
                +' <div class="torperbtn tc"><a href="'+_centerURL+'course/user/sign-card'+'" class="tosigns">去打卡</a></div>'
                +' <input type="hidden" value="" id="aa">'
            +' </div>'
            
      $('.pop_tosignbox').html(html)
      $(".pop_tosignbox").show(); 
      $(".pop_tosignbox").animate({right:10}, 300)
    }
    function pop_hide(){
      $(".pop_tosignbox").animate({right:-350},300)
    }
    if(sign_day!==timestamp){//当前时间和cookie的值进行比较，相等说明已经弹出过，弹框不在弹出，不相等说明还未打过卡
       //console.log('未弹出过');
       var timer = setInterval(function(){
            if(flag == true){
              clearInterval(timer);
              return false;    
            };//打过一次卡后，不再请求接口
            $.ajax({
              url:_centerURL+'/user/sign/card-heart',
              success:function(data){
                var _data = eval('('+data+')')
                //console.log(_data)
                if(_data.status == 1){  
                    pop_show();             
                    setCookie(user_id,timestamp,3600*24)//弹出后设置下cookie的值
                    setTimeout(function(){
                      pop_hide();
                    }, 10000)
                    flag = true;           
                }         
              }
            })
       },30000);
    }else{
       
    }
    $(".pop_tosignbox").on('click', '.pop_tosignbox .off', function() {
       pop_hide();
    });
  }
  pop_signcard();

});