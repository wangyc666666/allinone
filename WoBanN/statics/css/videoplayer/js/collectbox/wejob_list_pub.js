var ajaxOptions = {url:_centerURL,size:20,type:'get',field:'data'}
$.extend(ajaxOptions,options)

LoadList = new AutoLoadList('PubList',ajaxOptions,typeof(_parms)=='undefined'?{}:_parms)
LoadList.listItem = listItem
if(typeof listItemEvents !='undefined') LoadList.listItemEvents = listItemEvents
if(typeof listSuccess !='undefined') LoadList.success = listSuccess
if(typeof listLoaded =='undefined'){
  LoadList.loaded = function(){
    var tdNum = this.list.children().eq(0).children().length
    this.list.children().each(function(i,e){
      if(!$(e).prev().hasClass('bg')&&i!=0){$(e).addClass('bg')}
      if($(e).children().length!=tdNum && $(e).prev().hasClass('bg')){
          $(e).addClass('bg')
      }
    })
  }
}else{
  LoadList.loaded = listLoaded
}
LoadList.loadNext()

$("#SS").click(function(){
  if(LoadList.getAjaxStatus>0) return false
  reLoad()
})
$(".Conditional input").keyup(function(e){
  if(e.keyCode==13) reLoad()
})

function reLoad(){
  var ps = {}
  $(".Conditional input[name]").each(function(i,e){
    ps[e.name] = e.value.substr(0,32)
  })
  LoadList.resetParm(ps)
  LoadList.loadNext()
}