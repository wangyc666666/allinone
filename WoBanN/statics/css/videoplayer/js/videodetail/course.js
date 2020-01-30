var CID = $("#cID").val()
var PID = $("#pID").val()
var _informationStauts = 1,_fileListStatus =1
//get 推荐专题 小角标 zjf20170614
var specItem = function(e){
  var item = '',url = getUrl(e.special_id, 'spec')
  var act_time;
  item += '<li>';
  item += '<a href="'+url+'" class="pic fl"><img src="'+e.cover_img+'">';
  if( e.small_scale.discount_message != undefined){
    item += '<p class="act_tab"><span class="act_tab_l">'+e.small_scale.startTime+'-'+e.small_scale.endTime+'</span><span class="act_tab_r">'+e.small_scale.discount_message+'</span></p>';
  }
  item += '</a>';
  item += '<div class="fl main">';
  item += '<a href="'+url+'" class="f16 title" title="'+e.title+'">'+e.title+'</a>';
  item += '<div class="clear"></div>';
  item += '<p class="fl">立省<span class="red">￥'+e.save_price+'</span></p>';
  item += '<a href="'+url+'" class="btn fr">去购买</a>';
  item += '<div class="clear"></div>';
  item += '</div>';
  item += '</li>';
  return item
}
$.ajax({
  url:_centerURL+'special/index/course-spec?course_id='+CID,
  dataType:'json',
  success:function(res){
    for(var i=0;i<res.length;i++){
      $("#Spec").append(specItem(res[i]))
      $(".spec,.topic").show()
    }
    $("#Spec").width(395*i)

    if(res.length<4){
      $("#specBtns").remove()
      return false;
    }
    $(".spec>i.prev").click(function(){
      $("#Spec").prepend($("#Spec li").eq(i)).css('margin-left','-395px').stop().animate({'margin-left':0})
    })
    $(".spec>i.next").click(function(){
      $("#Spec").stop().animate({'margin-left':-395},function(){
        $("#Spec").append($("#Spec li").eq(0)).css('margin-left',0)
      })
    })
  }
})


///tabs
$(".tabsTil p").click(function(){
  showTab($(this).index())
})

function showTab(n){
  $(".tabsTil").each(function(){
    $(this).find('p').eq(n).addClass('cur').siblings().removeClass('cur')
  })
  $(".tabsCon .tabsConItem").eq(n).show().siblings().hide()
}
$(".Fixed .tabsTil p").click(function(){
  $(window).scrollTop($("#tabsTil").offset().top)
})

$(window).scroll(function(){
  if($(window).scrollTop()>$("#tabsTil").offset().top){
    $(".Fixed").show()
  }else{
    $(".Fixed").hide()
  }
})

//课程大纲列表
var LoadList = new AutoLoadList('syList',{url:_centerURL+'course/index/lesson-list',size:20,type:'get',field:'lessonList'},{id:CID})
LoadList.listItem = function(e){
  var dom = $('<li class="item '+e.type+'"></li>')
  var item = $('<div class="main"></div>')
  var icon = $('<i class="icon"></i>')
  dom.append(item)
  item.append(icon)
  if(e.type=='chapter'){
    item.append('<p>第'+e.sorted+'章</p>')
    .append('<p>'+e.title+'</p>')
    .append('<span>'+e.video_duration+'</span>')
    .append('<span>'+e.lesson_num+'节</span>')
  }else{
    item.append('<p>'+e.weight+'</p>')
    if(e.is_look==1 || course_price == 0){
      item.append('<p title="'+e.title+'">'+e.title.substr(0,26)+'</p>')
      item.append('<p class="look red">[免费观看]</p>')
    }else{
      item.append('<p>'+e.title+'</p>')
    }
    if(e.lesson_type==1) item.append('<span class="time">'+e.video_duration+'</span>')
    if(e.lesson_type==2) item.append('<span class="time">'+(e.exam_type == 1 ? '作业' : '练习')+'</span>')
    if(e.lesson_type==3) item.append('<span class="time">说明</span>')
    item.append('<a href="'+e.url+'" target="_blank"><span class="look">开始学习</span></a>')
    icon.addClass('type'+e.lesson_type)
  }
  if(e.describe){
    var intro = $('<p>'+(e.describe)+'</p>')
    dom.append(intro)
    item.click(function(e){
      if(e.target.tagName!='SPAN'){
        intro.toggle()
      }
    })
  }
  return dom
}
LoadList.loaded = function(e,v){
  if(e.length==0) return false;
  if(this.list.children('li').eq(0).hasClass('lesson')){
    this.list.addClass('noChapter')
  }
}
LoadList.loadNext()

//收藏
$("#fav").click(function(){
  if(user_id==''){
    goLoginPage()
    return false;
  }
  var num = parseInt($("#favNum").html()),
  s = 'add'
  if($(this).hasClass('faved')){
    s='del'
  }
  $.ajax({
    url:_centerURL+'collection/index/'+s,
    type:'post',
    data:{good_id:CID,type:1,source:1},
    dataType:'json',
    success:function(res){
      if(res.status == 1){
        $("#fav").toggleClass('faved','fav')
        $("#favNum").html(s=='add'?num+1:num-1)
        $("#favFont").html(s=='add'?'已收藏':'收藏')
        new AutoBox({content:(s=='add'?'收藏':'取消收藏')+'成功',autoClose:2,mask:"#000"});
      }
    }
  })
})

//文件列表
var fileList = new AutoLoadList('fileList',{url:_centerURL+'course/index/file-list',size:20,type:'get'},{id:CID})
fileList.listItem = function(e){
  var item = $('<tr></tr>')
  .append('<td title="'+e.title+'">'+e.weight+'</td>')
  .append('<td style="width:320px;">'+e.file_name+'.'+e.file_ext+'</td>')
  .append('<td>'+e.file_size+'</td>')
  if(e.is_url==1){
    item.append('<td><a href="'+e.url+'">点击下载</a></td>')
  }else{
    item.append('<td class="color81">'+e.text+'</td>')
  }
  
  return item
}

fileList.loaded = function(e){
  this.list.children().each(function(i,e){
    if(i%2!=0) $(e).addClass('bg')
  })
  if(e.length==0){
    this.list.parent().remove()
    _fileListStatus = 0;
  }
  if(_informationStauts===0 && _fileListStatus === 0) $("#fileEmpty").show()
}
fileList.loadNext()



//评论列表
var appraiseList = new AutoLoadList('arList',{url:_centerURL+'appraise/index/get-appraise-list',size:20,type:'get'},{course_id:CID,level:'',category:0})
appraiseList.listItem = function(e){
  var item = $('<li class="item"></li>')
  .append('<div class="pic fl"><a href="'+(e.user_name=='匿名'?'javascript:void(0)':getUrl(e.user_id,'user'))+'" '+(e.user_name=='匿名'?'':'target="_blank"')+'><img src="'+_ucUrl+'avatar.php?uid='+e.user_id+'&size=middle" class="avatar"></a>'+(e.is_vip?'<i class="vipBig"></i>':'')+'<p class="nickName">'+(e.user_name?e.user_name:'--')+'</p></div>')
  var main = $('<div class="main color81"></div>'),
  stars = $('<div class="stars fl"></div>')
  for(var i=0;i<5;i++){
    stars.append('<i class="icon star '+(i<Math.round(e.rate)?'full':'')+'"></i>')
  }
  main.append(stars)
  if(e.is_essence==1){
    main.append('<p class="ess">精</p>')
  }
  var reply = $('<ul class="reply"></ul>')
  main.append('<div class="clear"></div>')
  .append('<p class="fl mr20">课程内容('+e.lesson_consistent+')</p><p class="fl mr20">讲解表达('+e.lecturer_Interpretation+')</p><p class="fl">答疑服务('+e.lecturer_answer+')</p>')
  .append('<p class="fr">'+getDateNow(e.create_time)+'</p><div class="clear"></div>')
  .append('<p class="color42 mt5">'+e.content+'</p>')
  if(e.reply.length>0){
    main.append(reply)
    for(var i=0;i<e.reply.length;i++){
      var ss = e.reply[i].additional_content?('追加评论 : <span class="color42">'+e.reply[i].additional_content+'</span>'):(e.reply[i].user_name+'回复 <span class="color42">'+e.reply[i].reply_content+'</span>')
      reply.append('<li>'+ss+'</li>')
    }
  }

  item.append(main)
  //$.get(_centerURL+'user/index/get-user-face?user_id='+e.user_id+'&size=middle',function(res){item.find('.avatar').attr('src',res)})
  return item
}
appraiseList.success=function(e){
  if(this.parm.level!='') return false;
  if(e.data.length<5 && this.parm.page==2 && this.parm.level=='' && $("#ArrraiseBtn").is(":visible")){
    this.noMore.show().html('说说你对课程的看法，前5条评价，每条奖励5学分哦~')
  }else{

  }
}
appraiseList.loadNext()

$('.Ar_Tab p').click(function(){
  ThisCur($(this))
  var n = $(this).index()
  level = (n==0?'':n==1?'good':n==2?'center':'poor')
  appraiseList.resetParm({level:level}).loadNext()
})

//获取评价
function getCount(){
  $.ajax({
    url:_centerURL+'appraise/index/get-count',
    data:{resource_id:CID,category:0},
    dataType:'json',
    success:function(res){
      for(var v in res.data){
        $("#"+v).html(res.data[v])
      }
      if(parseInt(res.data.better_than)<50){
        $("#better_than").parent().remove()
      }
      $("#totalScore i").each(function(i,e){
        if(i<Math.round(res.data.score)) $(e).addClass('full')
      })
      $("#lesson_consistent_msg,#lecturer_Interpretation_msg,#lecturer_answer_msg").each(function(i,e){
        $(e).hide()
        var score = $(e).prev().text()
        if(score>0) $(e).text( scoreText(score) ).show()
      })
      $("#totalNum,#all_number").html(res.data.numbers ? res.data.numbers : 0)

      if(res.data.numbers==0){
        $("#noNumbers").show()
        $("#hasNumbers").hide()
      }else{
        $("#hasNumbers").show()
        $("#noNumbers").hide()
      }
    }
  })
}
getCount()


function getDateNow(unix) {
    var t = unix?new Date(unix*1000):new Date();
    var y = t.getFullYear();
    var m = t.getMonth()>8?t.getMonth()+1:'0'+(t.getMonth()+1);
    var d = t.getDate()>9?t.getDate():'0'+t.getDate();
    var H = t.getHours()>9?t.getHours():'0'+t.getHours();
    var M = t.getMinutes()>9?t.getMinutes():'0'+t.getMinutes();
    return y+'-'+m+'-'+d+' '+H+':'+M;
}

function scoreText(n){
  n = Math.floor(n)
  var t = ['较差','一般','比较满意','满意','非常满意','非常满意']
  return t[n]
}

setTimeout(function(){
  if(location.hash!='') showTab(parseInt(location.hash.replace('#tab','')))
},500)

$(".check").click(function(){
  $("i.check").toggleClass('ed')
})

///////////////////////////////////

$.get(_centerURL+'appraise/index/get-qualification', {resource_id:CID,category:0}, function(res){
  if(res.data>0){
    $("#ArrraiseBtn").show();
    if(parseInt($("#all_number").html())<5){
      $("#arList_Empty").show().html('说说你对课程的看法，前5条评价，每条奖励5学分哦~')
    }
  }else{
    $("#ArrraiseBtn").remove();
  }
},'json')
$("#ArrraiseBtn").click(function(){
  $("#Evaluate,#EvaluateMask").show()
})
$("#closeEvaluate").click(function(){
  $("#Evaluate,#EvaluateMask").hide()
})
$("#saveEvaluate").click(function(){
  var ps = {user_id:user_id,resource_id:CID,user_name:user_name,category:0,is_additional:0,resource_title:$("#CourseTitle").html()}
  ps['is_anonymous'] = $("i.check").hasClass('ed')?'1':'0'
  ps['lesson_consistent'] = $("#stars1").find('i.full').length
  ps['lecturer_Interpretation'] = $("#stars2").find('i.full').length
  ps['lecturer_answer'] = $("#stars3").find('i.full').length
  ps['content'] = $("#appContent").val()

  if(ps['content'].length==0){
    new AutoBox({content:'评价内容不能为空',img:'remind',autoClose:2,mask:"#000"})
    return false
  }
  Introduce.show()
  $.ajax({
    url:_centerURL+'appraise/index/add-appraise',
    type:'post',
    data:ps,
    dataType:'json',
    success:function(res){
      Introduce.hide()
      var img ='remind'
      if(res.status==1){
        img = 'ok'
        $("#Evaluate,#EvaluateMask,#ArrraiseBtn").remove()
        appraiseList.reload()
        getCount()
        $("#noNumbers").hide()
      }
      new AutoBox({content:res.msg,img:img,autoClose:2,mask:"#000"})
    }
  })
})

$(".stars.set i.star").click(function(e){
  $(this).siblings().removeClass('full')
  $(this).addClass('full').prevAll().addClass('full')
})



//推荐图书
var bookList = new AutoLoadList('bookList',{url:_centerURL+'course/index/get-related',type:'get',field:'books'},{id:CID})
bookList.listItem = function(e){
  var item = $('<div class="item"></div>')
  .append('<div class="pic fl"><a href="'+e.url+'" target="_blank"><img src="'+e.thumb+'"></a></div>')
  .append('<div class="main fr"><p class="name"><a href="'+e.url+'" target="_blank">'+e.title+'</a></p><p class="author">作者：'+e.author+'</p><p class="author">'+(e.publich?e.publich:'')+'</p><p class="price red">￥<span>'+e.price+'</span></p></div>')
  .append('<div class="clear"></div>')
  return item
}
bookList.success = function(res){
  if(res.data.books.length==0){
    $("#bookListPack").remove()
  }else{
    $("#bookListPack").show()
  }
  var rd = res.data.relatedData
  if(rd.length>0){
    $(".information").show()
    for(var i=0;i<rd.length;i++){
      $("#information").append('<a href="http://down.51cto.com/data/'+rd[i].tid+'" target="_blank">'+rd[i].title+'</a>')
    }
  }else{
    _informationStauts=0
    if(_informationStauts===0 && _fileListStatus === 0) $("#fileEmpty").show()
  }
  
}
bookList.loadNext()

//
function studentsItem(e){
  var item = $('<div class="item"></div>')
  var avatar = $('<div class="avatar"><a href="'+e.url+'" target="_blank"><img src="'+e.img_url+'"></a></div>')
  if(e.is_vip==1) avatar.append('<i class="vipSmall"></i>')
    item.append(avatar).append('<p class="name"><a href="'+e.url+'" target="_blank">'+e.username+'</a></p>')
  return item
}
function studentsTopItem(e,isme){
  var item = $('<div class="item"></div>')
  if(isme){
    item.append('<div>我的排名：'+e.sort+'</div>')
    .css({
      'margin-bottom':'10px',
      'border-bottom':'1px solid #DDD',
      'padding-bottom':'10px'
    })
  }
  if(!isme) item.append('<p class="Sort s'+e.sort+'">'+e.sort+'</p>')
  var avatar = $('<div class="avatar"><a href="'+e.url+'" target="_blank"><img src="'+e.img_url+'"></a></div>')
  if(e.is_vip==1) avatar.append('<i class="vipSmall"></i>')
  item.append(avatar)
  .append('<p class="name fl"><a href="'+e.url+'" target="_blank">'+e.username+'</a></p>')
  .append('<p class="studyed fr">已学习'+e.count+'节</p>')
  return item
}
function interestItem(e){
  var item = $('<li class="cList_Item"></li>')
  .append('<div class="pic"><a href="'+e.url+'" target="_blank"><img src="'+e.img_url+'"></a></div>')
  .append('<div class="main"><h3><a href="'+e.url+'" title="'+e.title+'" target="_blank">'+e.title+'</a></h3></div>')
  return item
}
$.get(_centerURL+'course/index/course-study-info',{id:CID},function(res){
  if(res.status!=1){
    new AutoBox({content:res.msg,img:'remind',autoClose:2,mask:"#000"})
    return false
  }
  if(res.data && res.data.courseStudyTop && res.data.courseStudyTop.userInfo && res.data.courseStudyTop.userInfo.length>0){
    $("#studentsTop").show()
    if(res.data.courseStudyTop.userNow.length!=0){
      $("#studentsTopList").append(studentsTopItem(res.data.courseStudyTop.userNow,true))
    }
    var datas = res.data.courseStudyTop.userInfo
    for(var v in datas){
      $("#studentsTopList").append(studentsTopItem(datas[v]))
    }
    $("#studentsTopList").append('<div class="clear"></div>')
  }
  if(res.data.courseStudyInfo && res.data.courseStudyInfo.length>0){
    $("#students").show()
    var datas = res.data.courseStudyInfo
    for(var i=0;i<datas.length;i++){
      $("#studentsList").append(studentsItem(datas[i]))
    }
    $("#studentsList").append('<div class="clear"></div>')
  }
  if(res.data.studyCourseRelevant.length>0){
    $("#Interested").show()
    var datas = res.data.studyCourseRelevant
    for(var i=0;i<datas.length;i++){
      $("#InterestedList").append(interestItem(datas[i]))
    }
  }
},'json')
/////////////
$(".addCart").click(function(){
  if(user_id==''){
    goLoginPage()
    return false;
  }
  $.post(_centerURL+'cart/add',{id:CID},function(res){
    if(res.status==1){
      var pushCart = $('<div></div>');
      var pc1 = $('<div><p class="tl">课程已经成功加入购物车！</p><p class="tl">购物车共有<span class="red">'+res.data.total+'</span>套课程，合计<span class="red">￥'+res.data.price+'</span></p></div>');
      pc1.css({
        'background':'url('+imgpath+'mbox/ok.png) no-repeat 20px center',
        'padding-left':'80px'
      });
      pushCart.append(pc1);
      //$("#cart_total").addClass("red").html(parseInt($("#cart_total").html())+1);
      new AutoBox({
        'noCon':true,
        'ADD':pushCart,
        'Yes':'去结算',
        'No':'再逛逛',
        'mask':'#000',
        'W':350,
        'yc':function(){
          location.href=_centerURL+"cart/index"
        },
        'nc':function(){
          location.href=_centerURL+"course/index/list"
        }
      })

      $('#addCart').html('已加入购物车');
      $('#addCart').unbind('click');

      //数据分析 加入购物车 begin
      // if(typeof(cartTract)!='undefined')cartTract(data.data.price,data.data.cartCourseId,user_id,0);
      //数据分析 加入购物车 end

    }else{
      new AutoBox({
        content:res.msg,
        Yes:'去结算',
        No:'再逛逛',
        mask:'#000',
        img:'remind',
        yc:function(){
          location.href=_centerURL+"cart/index"
        },
        nc:function(){
          location.href=_centerURL+"course/index/list"
        }
      })
    }
  },'json')
})

///////
if(_price>0){
  var coupon = new AutoLoadList('couponList',{url:_centerURL+'discount/index/course-coupon',type:'get',field:'couponLists'},{lecturerId:lecID})
  coupon.listItem = function(e){
    var item = $('<div class="cp '+ (e.is_receive == 2 ? 'lock' : '')+'"></div>')
    .append('<div class="fl"><h2 title="'+e.batch_name+'">'+e.batch_name+'</h2><p>'+(e.scope_type==1?'全场通用':'仅限 '+e.scope_desc+' 的课程使用')+'</p></div>')
    .append('<div class="fr"><p class="red">￥<span>'+e.price+'</span></p><span class="txt">'+ (e.is_receive == 2 ? '已领取' : '点击领取') +'</span></div>')
    this.listItemEvents(item,e)
    return item;
  }
  coupon.listItemEvents = function(e,v){
    e.click(function(){
      Introduce.show()
      $.get(_centerURL+'lec/info/ajax-receive-coupon',{batch_id:v.batch_id,user_id:lecID},function(res){
        Introduce.hide()
        var m = 'remind'
        if(res.status==1){
          e.addClass('lock').find('span.txt').html('已领取');
          m = 'ok'
          e.unbind()
        }
        new AutoBox({content:res.msg,img:m,mask:"#000",autoClose:2})
      },'json')
    })
  }
  coupon.loaded=function(e){
    $(".getCoupon").show()
  }
  coupon.loadNext()
}else{
  $("#couponList").parent().remove()
}

(function(){
  var s = 400,jsq;
  $("#buyBtns").mouseenter(function(){
    if(s==400 || s<0) getImg()
    s--;
  })
  function getImg(){
    $.post(_centerURL+'/course/index/get-qr-url',{id:CID},function(e){
      $("#payQrcode").attr('src',e.data.url);
      jsq = setInterval(function(){s--;if(s<0)clearInterval(jsq)},1000)
    },'json')
  }
  function checkPay(){
    if(!$(".quickPay").is(':visible')) return false;
    $.post(_centerURL+'/course/index/check-buy',{id:CID},function(e){
      if(e.status==0) return false;
      new AutoBox({content:'支付成功',autoClose:2,mask:"#000",ok:function(){location.reload()}})
    },'json')
  }
  setInterval(function(){
    checkPay()
  },3000)
})()
