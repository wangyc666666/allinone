/**
 * 51CTO视频播放器
 * @version 0.2 测试版
 *
 * 
 * ------------------播放器参数说明---------------
 * 视频播放器初始化参数
 * 1  player_id   视频容器的ID
 * 2  width       视频的宽度
 * 3  height      视频的高度
 * 4  autoplay    是否自动播放

 * ---------------------------------------------------------
 */

/**
 * 定义全局的Syplayer变量，用户保存所有的实例
 */
var Syplayer;
var HTTP_ROOT = document.getElementById('HTTP_ROOT').value;
/**
 * 播放器类
 */
Syplayer = function(options){
	var settings ={
		config_url:'',				//播放器容器id
		player_id:'',				//播放器容器id
		lesson_id:'',				//课时id
		width  :859,				//播放器的宽度
		height :481,				//播放器的高度
		autoplay :1,				//是否自动播放
		callbackJs:'SyPlayerStatus',
		conf:'',
		part:'0', //use part
		hlsPD : 600 //缓存时间 （单位s）
	};
	settings = $.extend({}, settings, options);
	this.settings = settings;
	/**
	 * 插入播放器
	 */
	player_array = new Array();
	player_array.push('<object width="100%" height="'+settings.height+'" align="middle" name="ckplayer_a1" id="'+settings.player_id+'_msie'+'" allowScriptAccess="always" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" pluginspage="http://www.macromedia.com/go/getflashplayer" >');
	player_array.push('<param value="always" name="allowScriptAccess">');
	player_array.push('<param name="movie" value="'+HTTP_ROOT+'static/js/Player.swf?v=1.3&hlsPD='+settings.hlsPD+'&autoplay='+settings.autoplay+'&callbackJs='+settings.callbackJs+'&infotip='+settings.infotip+'" /> ');
	player_array.push('<param name="quality" value="high" />');
	player_array.push('<param name="flashvars" value="part='+settings.part+'&playid='+settings.player_id+'&id='+settings.lesson_id+'&playerconf='+settings.conf+'" />');
	player_array.push('<param name="wmode" value="transparent" />');
	player_array.push('<param name="allowFullScreen" value="true"/>');
	player_array.push('<embed width="100%" height="'+settings.height+'" align="middle" wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer"type="application/x-shockwave-flash" id="'+settings.player_id+'_other'+'" name="ckplayer000" flashvars="part='+settings.part+'&playid='+settings.player_id+'&id='+settings.lesson_id+'&playerconf='+settings.conf+'" src="'+HTTP_ROOT+'static/js/Player.swf?v=1.3&hlsPD='+settings.hlsPD+'&autoplay='+settings.autoplay+'&callbackJs='+settings.callbackJs+'&infotip='+settings.infotip+'" bgcolor="#000000" quality="high" allowfullscreen="true" allowscriptaccess="always" >');
	player_array.push('</object>');
	player_str = player_array.join("\n");
	$('#'+settings.player_id).html(player_str);
}
/**
 * 保存所有播放器实例
 */
Syplayer.instances = {};

Syplayer.prototype.isIE = function(){
	var ua = navigator.userAgent.toLowerCase();
	return ua.match(/msie ([\d.]+)/);
};
/**
 * 视频播放器jq插件
 */
(function($){
	/**
	 * 播放器生成函数 
	 */
	var syplayer = function(options){
		var tmp = new Syplayer(options);
		
		Syplayer.instances[tmp.settings.player_id] = tmp;
		return tmp;
	}
	$.syplayer = syplayer;
})(jQuery);

