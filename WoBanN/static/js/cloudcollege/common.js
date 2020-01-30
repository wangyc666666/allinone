function hiden_video_url(){


    $("#video_share_id").hide();
    $("#video_share_2").hide();



};

function show_video_url() {
    $("#video_share_id").show();


}
function video_hidden_url() {
   document.getElementById("video_share_2").style.display="";
}

function video_show_url() {

document.getElementById("video_share_2").style.display="none";
}


function imgPreview(fileDom){
    //判断是否支持FileReader
    if (window.FileReader) {
        var reader = new FileReader();
    } else {
        alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
    }

    //获取文件
    var file = fileDom.files[0];
    var imageType = /^image\//;
    //是否是图片
    if (!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    //读取完成
    reader.onload = function(e) {
        //获取图片dom
        var img = document.getElementById("preview");
        //图片路径设置为读取的图片
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    //上传图片
    var callback = jQuery.parseJSON(callback);
    var imgageFileId = document.getElementById('imgage_file_id').files[0];
    var fd = new FormData();
    fd.append('username','root');
    fd.append('imgage_file_id',imgageFileId);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/uploadimg/',true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            // 接收完毕
            var obj = JSON.parse(xhr.responseText);
            var image_url_now = obj.image_url
            document.getElementById("preview").src=image_url_now;
            console.log(image_url_now);

        }
    };
    xhr.send(fd);

}

function upload_video() {
    var videoFileId = document.getElementById('video_file_id').files[0];
    var fd = new FormData();
    fd.append('username','root');
    fd.append('video_file_id',videoFileId);

    var xhr = new XMLHttpRequest();

	xhr.upload.onprogress = function (evt) {
					if (evt.lengthComputable) {
						var percentComplete = Math.round(evt.loaded * 100 / evt.total);
						document.getElementById('progress').value = percentComplete;
					if(percentComplete == 100){
					    alert('传输完成')
					}

					}
				};

    xhr.open('POST', '/uploadvideo/',true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            // 接收完毕
            var obj = JSON.parse(xhr.responseText);
             var video_url_now = obj.video_url
            document.getElementById("video_file_id").src=video_url_now;
            console.log(video_url_now);


        }
    };

    xhr.send(fd);



}
function add_topic(doc){
        var titleText = $('#title').val();
        var videourlText = $('#videourl_id').val();
        var selectValueTitId = $('#select_value_tit_id').val();
        var uploadCategroryId = $('#upload_categrory_id').val();
        var tagsId = $('#tags').val();
        var coursePriceId = $('#course_price_id').val();
        var createContentId =  CKEDITOR.instances.create_content_id.getData();
        var previewId=document.getElementById("preview").src;
        var introductionsId=$('#introductions').val();
        var videoFileId=document.getElementById("video_file_id").src;


        $.ajax({
                url:'/save/',
                data:{
                    title_text:titleText,
                    videourl_text:videourlText,
                    select_value_tit_id:selectValueTitId,
                    upload_categrory_id:uploadCategroryId,
                    course_price_id:coursePriceId,
                    create_content_id:createContentId,
                    tags_id:tagsId,
                    preview_id:previewId,
                    introductions_id:introductionsId,
                    video_file_id:videoFileId,
                },

                type:'POST',

		success:function(callback) {
            var callback = jQuery.parseJSON(callback);
//           console.log(callback.message);
//           console.log(titleText);
//           console.log(videourlText);
//            console.log(selectValueTitId);
//            console.log(uploadCategroryId);
//           console.log(tagsId);
//            console.log(coursePriceId);
//            console.log(createContentId);
            console.log(previewId);
//            console.log(introductionsId);
            console.log(callback.status)
            if(callback.status==1){

                 alert(callback.message+"信息填写不完整");
                 document.getElementById("preview").src="";


					}
            if(callback.status==0 && callback.message=="Title already exist"){

                 alert("发布标题已存在,请修改标题名称");

					}
             if(callback.status==0 && callback.message=="ok"){

                 alert("发布成功，请等待审核通过，谢谢");
                 window.location.reload();

					}


        }

        });
	}

