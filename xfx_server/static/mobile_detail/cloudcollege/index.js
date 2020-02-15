function public_course(course) {
     $.ajax({
        url: '/public_course/',
        type: 'POST',
		success:function(callback) {
            var obj = jQuery.parseJSON(callback);
            console.log(obj)
            var data = obj

        }
    });
}



function setCookie(key, value) {
        document.cookie = key + "=" + escape(value);
}
//获取cookie的值
    function getCookie(key) {
        if (document.cookie.length) {
            var cookies = ' ' + document.cookie;
            var start = cookies.indexOf(' ' + key + '=');
            if (start == -1) { return null; }
            var end = cookies.indexOf(";", start);
            if (end == -1) { end = cookies.length; }
            end -= start;
            var cookie = cookies.substr(start,end);
            return unescape(cookie.substr(cookie.indexOf('=') + 1, cookie.length - cookie.indexOf('=') + 1));
        }
        else { return null; }
    }

function userlogin(){
    $.ajax({
        url: '/userlogin/',
        type: 'POST',
		success:function(callback) {
            var obj = jQuery.parseJSON(callback);
            $('#info-show ul').empty();
            console.log(obj.username);
            if (obj.username!==''){
	    	$('#userlogin').toggle();
	    	$('#login-id').toggle();


              }
        }
    });
	}
window.onload = userlogin;//不要括号
