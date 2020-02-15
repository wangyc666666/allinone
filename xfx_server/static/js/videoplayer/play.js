//zeroTime
var zeroTime =  function(t){
  return (Math.floor(t/60)<10?'0':'') + Math.floor(t/60) + ':' + (t%60<10?'0':'') + t%60;
}
//是否IE
var isIE = function(){
  return navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/);;
}
//获取播放时间
var getVideoTime = function (){
  var player = isIE() ? 'player_msie' : 'player_other';
  var obj = $('#'+player)[0];
  return parseInt(obj.getVideoTime());
}

//设置视频
var setVideoTime = function (t){
  var player = isIE() ? 'player_msie' : 'player_other';
  var obj = $('#'+player)[0];
  t = parseInt(t);
  return obj.seekTo(t);
}
function SyPlayerStatus(type, info) {
  if(type == 'videoStop') {
    var nextUrl = $("#nextUrl").attr('href');
    if(nextUrl != '') {
      window.location.href = nextUrl;
    }
  }
  //指定播放点
  if(type == 'videoStart' && playTime > 0){
    //setTimeout("setVideoTime(playTime)",500,function(){playTime = 0;});
    setTimeout(function(){
      setVideoTime(playTime);
      playTime = 0;
    },500);
  }
}

if($("#player").length>0){
  var sy = $.syplayer({
    player_id :'player',
    width :'100%',
    height:'100%',
    lesson_id:_lid,
    callbackJs:'SyPlayerStatus',
    infotip : 0,
    config_url : SERVICE_URL,
    conf: CONF, 
    part: part, 
  });
}

$(".lessonList").niceScroll().doScrollTop($("li.cur").index()*36);
$(".singlePage").niceScroll()
var ContinuedVideoTime;
$(".RecordTime").click(function(){
  $(this).toggleClass('on')
  setVideoTimeOnSend($(this))
})

function setVideoTimeOnSend(e){
  var t = getVideoTime(),h = zeroTime(t)
  if($(e).hasClass('on')){
    $(e).next().removeClass('disp-n').attr('time',t).find('.nowPlayingTime').html(h)
    ContinuedVideoTime = setInterval(function(){
      var t = getVideoTime()
      $(".RecordTime").each(function(){
        if($(this).hasClass('on')) $(this).next().attr('time',t).find('.nowPlayingTime').html(zeroTime(t))
      })
    },1000)
  }else{
    $(e).next().addClass('disp-n').attr('time',0).find('.nowPlayingTime').html('00:00')
    clearInterval(ContinuedVideoTime)
  }
}


var liItem = function(e){
  var u = _centerURL+'user/user-index/index?user_id='
  var con = e.content.length>36?(e.content.substr(0,36)+'<span class="lookAll_Con disp-n">'+e.content.substr(36)+'</span><span class="lookAll blue ml10" style="cursor:pointer;">展开↓</span>'):e.content
  var item = $('<li class="item"></li>')
  .append('<img src="'+e.face_url+'">')
  .append('<p><a href="'+u+e.user_id+'" class="blue" target="_blank">'+(e.username?e.username:e.user_name)+'</a></p>')
  .append('<p class="date">'+fomatDate((e.add_time?e.add_time:e.create_time)*1000,true)+'</p>')
  .append('<p class="content">'+con+'</p>')
  .append(  e.play_time > 0 ? '<p class="playingTime fl"><i class="icon play fl"></i><span>'+zeroTime(e.play_time)+'</span></p>' : '')

  if(e.is_vip) item.append('<i class="vipSmall"></i>')

  if(this.ajaxOptions.itemType=='quest'){
    var replyBtn = $('<p class="fr blue">回复</p>'),replyList = $('<ul class="replyList"></ul>'),
    reply = $('<div class="reply"><input type="hidden"><textarea placeholder="请输入回复内容" maxlength="300"></textarea><button class="fr">发布</button><div class="sendLoading fr"></div></div>')
    item.append(replyBtn).append('<div class="clear"></div>').append(replyList)
    if(e.user_id == userId) replyBtn.remove()

    var replyItem = function(e){
      console.log(e)
      var rItem = $('<li class="replyItem"></li>')
      .append('<img src="'+e.face_url+'">')
      .append('<p><a href="'+u+e.user_id+'" class="blue" target="_blank">'+e.user_name+'</a> 回复了 <a href="'+u+e.parent_user_id+'" class="blue" target="_blank">'+e.parent_user_name+'</a></p>')
      .append('<p class="date">'+fomatDate(e.add_time*1000,true)+'</p>')
      .append('<p class="content">'+e.content+'</p>')
      if(e.user_id != userId) rItem.append('<p class="fr blue">回复</p>')
      if(e.is_lecturer){
        rItem.append('<p class="isLec">专家讲师</p>')
      }
      if(e.is_vip) rItem.append('<i class="vipSmall"></i>')
      return rItem
    }
    item.append(reply.hide())
    this.listItemEvents(item,e,replyBtn,reply,replyList,replyItem)
  }
  item.find('.lookAll').click(function(){
    if($(this).prev().is(':visible')){
      $(this).html('展开↓').prev().hide()
    }else{
      $(this).html('收起↑').prev().show()
    }
  })

  return item;
}

var NoteListDate = false,QuestListDate = false;

var NoteList = new AutoLoadList('NoteList',{url:_centerURL+'note/index/get-note-by-lesson-id',type:'get',itemType:'note'},{lesson_id:_lid,size:20})
NoteList.listItem = liItem
NoteList.listItemEvents = function(e,v){
  e.find('.playingTime').click(function(){
    setVideoTime(e.play_time);
  })
}
NoteList.loaded = function(e){
  this.list.parent().unbind().niceScroll()
  var me = this;
  if(e.length==this.parm.size){
    $("#NoteList_getMote").unbind().show().click(function(){
      me.loadNext()
    })
  }else{
    $("#NoteList_getMote").remove()
  }
  NoteListDate = this.datas
  this.loading.hide()

  var me=this,btn = $("#sendNote"),con = $("#noteText")
  btn.unbind().click(function(){
    var _val = $.trim(con.val())
    if(_val.length==0){
      new AutoBox({content:'请输入内容后再进行提交',img:'remind',autoClose:2,mask:"#000",parent:$(".tabsCon")})
      return false
    }
    if(_val.length >1000){
      new AutoBox({content:'内容最多1000字',img:'remind',autoClose:2,mask:"#000",parent:$(".tabsCon")})
      return false
    }
    var is_record = $('.noteCon .RecordTime').hasClass('on');
    var ps = {
      content:_val,
      lesson_id:_lid,
      play_time: is_record ? $(this).prev().attr('time') : 0,
      note_type:_noteType,
      module_id:_moduleId,
      train_id:_trainId
    }
    me.Loading()
    $.post(_centerURL+'note/index/add-note',ps,function(res){
      me.Loading(true)
      if(res.status==1){
        $("#success").show()
        setTimeout(function(){
          $("#success").fadeOut(200)
        },2000)
        con.val('')
        ps.create_time = Math.floor(new Date().getTime()/1000)
        ps.face_url = UFU+'?uid='+userId+'&size=middle'
        ps.user_id = userId
        ps.username = userName
        if(me.list.children().length==0){
          NoteList.reload()
        }else{
          me.list.prepend(me.listItem(ps))
        }
      }
    },'json')
    //success:
  })
}
NoteList.Loading = function(v){
  if(v){
    $("#sending").hide()
    $(".noteCon").find('.mask').hide()
  }else{
    $("#sending").show()
    $(".noteCon").find('.mask').show()
  }
}
//

var QuestList = new AutoLoadList('questList',{url:_centerURL+'question/index/get-answer-by-lesson-id',type:'post',itemType:'quest'},{lesson_id:_lid,is_me:1,size:20})
QuestList.listItem = liItem
QuestList.listItemEvents = function(e,v,btn,reply,replyList,replyItem){
  e.find('.playingTime').click(function(){
    setVideoTime(e.play_time);
  })
  var ps = {
    lesson_id:_lid,
    parent_id:v.question_id,
    user_id:userId,
    user_name:userName,
    face_url: UFU+'?uid='+userId+'&size=middle'
  }
  btn.click(function(){
    reply.show().find('textarea').focus()
    ps.parent_user_id=v.user_id,
    ps.parent_user_name=v.user_name
  })
  var me=this,rbtn = reply.find('button'),con = reply.find('textarea')
  if(v.reply_number!='0'){
    $.each(v.reply,function(i,e){
      var rItem = replyItem(e)
      replyList.append(rItem)
      rItem.find('p.blue.fr').click(function(){
        ps.parent_user_id=e.user_id
        ps.parent_user_name=e.user_name
        ps.user_id = userId
        ps.username = userName
        reply.show().find('textarea').focus()
      })
    })
  }

  rbtn.click(function(){
    var _val = $.trim(con.val())
    if(_val.length==0){
      new AutoBox({content:'请输入内容后再进行提交',img:'remind',autoClose:2,mask:"#000",parent:$(".tabsCon")})
      return false
    }
    if(_val.length >300){
      new AutoBox({content:'内容最多300字',img:'remind',autoClose:2,mask:"#000",parent:$(".tabsCon")})
      return false
    }
    ps.content = _val
    ps.add_time = Math.floor(new Date().getTime()/1000)
    me.Loading()
    $.post(_centerURL+'question/index/add-answer-question',ps,function(res){
      me.Loading(true)
      if(res.status==1){
        $("#success").show()
        setTimeout(function(){
          $("#success").fadeOut(200)
        },2000)
        con.val('')
        var rItem = replyItem(res.data)
        replyList.append(rItem)
        reply.hide()
        rItem.find('p.blue.fr').click(function(){
          ps.parent_user_id=ps.user_id
          ps.parent_user_name=ps.user_name
          reply.show().find('textarea').focus()
        })
      }else{
        new AutoBox({content:res.msg,img:'remind',autoClose:2,mask:"#000",parent:$(".tabsCon")})
      }
    },'json')

  })
}
QuestList.loaded = function(e){
  this.list.parent().unbind().niceScroll()
  QuestListDate = this.datas
  var me=this,btn = $("#sendQuest"),con = $("#questText")
  btn.unbind().click(function(){
    var _val = $.trim(con.val())
    if(_val.length==0){
      new AutoBox({content:'请输入内容后再进行提交',img:'remind',autoClose:2,mask:"#000",parent:$(".tabsCon")})
      return false
    }
    if(_val.length >300){
      new AutoBox({content:'内容最多300字',img:'remind',autoClose:2,mask:"#000",parent:$(".tabsCon")})
      return false
    }
    var is_record = $('.questCon .RecordTime').hasClass('on');
    var ps = {
      content:_val,
      lesson_id:_lid,
      play_time: is_record ?  $(this).prev().attr('time') : 0,
      category:0,
      is_buy:isBuy
    }
    me.Loading()
    $.post(_centerURL+'question/index/add-answer-question',ps,function(res){
      me.Loading(true)
      if(res.status==1){
        $("#success").show()
        setTimeout(function(){
          $("#success").fadeOut(200)
        },2000)
        con.val('')
        ps.add_time = Math.floor(new Date().getTime()/1000)
        ps.face_url = UFU+'?uid='+userId+'&size=middle'
        ps.user_id = userId
        ps.username = userName
        ps.reply=[]
        me.list.prepend(me.listItem(res.data))
        if(me.datas.length==0) QuestList.reload()
      }else{
        new AutoBox({content:res.msg,img:'remind',autoClose:2,mask:"#000",parent:$(".tabsCon")})
      }
    },'json')
  })
  if(e.length==this.parm.size){
    $("#questList_getMote").unbind().show().click(function(){
      me.loadNext()
    })
  }else{
    $("#questList_getMote").remove()
  }
}
QuestList.Loading = function(v){
  if(v){
    $("#sending").hide()
    $(".questCon").find('.mask').hide()
  }else{
    $("#sending").show()
    $(".questCon").find('.mask').show()
  }
}

$(".tabs p").click(function(){
  ThisCur($(this))
  showTab($(this).index())
})
function showTab(n,isstu){
  var con = $(".tabsCon").children('div').eq(n)
  con.fadeIn(200).siblings('.cc').hide()
  if(userId=='') return false;
  if(n==1){
    if(!NoteListDate){
      NoteList.loadNext()
    }
  }
  if(n==2){
    if(!QuestListDate){
      if(isstu) QuestList.resetParm({is_me:0})
      QuestList.loadNext()
    }
  }
}

$(".listTitle p.fl").click(function(){
  ThisCur($(this))
  var n = $(this).index()
  QuestList.resetParm({is_me:n}).loadNext()
})

setTimeout(function(){
  if(location.hash!=''){
    showTab(parseInt(location.hash.replace('#tab','')),true)
    ThisCur($(".listTitle p.fl").eq(0))
  }
},500)
