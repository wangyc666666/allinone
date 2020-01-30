	var _listImgData = {
		author  :   '',
		url     :   'http://m.ui.cn',
		title   :   '',
		pic     :   ''
	};

	function shareSina() {
		var title= '《'+ _listImgData.title +'》 作者：'+ _listImgData.author +' - 更多大图 猛戳: '+_listImgData.url +' (分享来自 @UI中国 - 专业界面交互设计平台)';
		var pic = _listImgData.pic;
		var weibo_url = 'http://service.weibo.com/share/share.php?title='+ encodeURIComponent( title ) +'&source=bookmark&appkey=3664928472&pic='+encodeURIComponent( pic );
		window.open( weibo_url, "_blank", "height=495, width=510, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no" );
	};
	
	
	function shareDouban() {
		var title= '《'+ _listImgData.title +'》 作者：'+ _listImgData.author +' - 更多大图 猛戳: '+_listImgData.url +' (分享来自 @UI中国 - 专业界面交互设计平台)';
		var pic = _listImgData.pic;
		var teng_rul=  'http://www.douban.com/share/service?bm=&image='+ encodeURIComponent( pic ) +'&title='+ encodeURIComponent( title );
		window.open( teng_rul, "_blank", "height=495, width=510, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no" );
	};
	
	$(document).on('touchend','.share-weibo',function(){
		_listImgData.url = location.href;
		_listImgData.author = $('#p-author').text().trim();
		_listImgData.title = $('#p-title').text().trim();
		_listImgData.pic = $('.cont img').attr('src');
		shareSina();
	})
	
	$(document).on('touchend','.share-douban',function(){
		_listImgData.url = location.href;
		_listImgData.author = $('#p-author').text().trim();
		_listImgData.title = $('#p-title').text().trim();
		_listImgData.pic = $('.cont img').attr('src');
		shareDouban();
	});