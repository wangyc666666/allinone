// window.onload = function(){
//
//  var sendinfor = document.getElementById('sendinfor');
// var action = document.getElementById('action');
// var Sty = document.getElementById('Sty');
// var collpse = document.getElementById('collpse');
//
//  action.onclick = function(){
// 	alltuijian.style.width="25%";
//   Sty.style.display="block";
//
//   startMov(sendinfor,110,'height');
//  };
//  collpse.onclick = function(){
//
//   startMov(sendinfor,80,'height');
//    Sty.style.display="none";
//    alltuijian.style.display="none";
//    //alltuijian.style.width="25px";
//  }
//
//  sendinfor.timer = null;
//  function startMov(sendinforname,heightvalue,height){
//
//   clearInterval(sendinforname.timer);
//
//   sendinforname.timer = setInterval(function(){
//    var icur = 0;
//
//
//    icur = parseInt(getStyle(sendinforname,height));
//
//    var speed =0;
//    speed = (heightvalue - icur)/8;
//    speed = speed>0?Math.ceil(speed):Math.floor(speed);
//    if(icur == heightvalue){
//    clearInterval(sendinforname.timer);
//    }
//    else{
//
//     sendinforname.style[height] = icur+speed+'px';
//     }
//
//   },30);
//  }
//  function getStyle(sendinforname,height)
//  {
//   if(sendinforname.currentStyle){
//   return sendinforname.currentStyle[height];
//   }
//   else{
//   return getComputedStyle(sendinforname,false)[height];
//   }
//  }
//
//    Sty.style.display="block";
//   startMov(sendinfor,110,'height');
//
// }