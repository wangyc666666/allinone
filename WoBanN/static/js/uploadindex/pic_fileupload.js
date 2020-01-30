
	function update_file_progress(id) {
	    var progressHtml;
	        progressHtml = '<li id="uploadFile'+id+'" class="up-thumb-item up-thumb-add up-thumb-bar"><div class="bar-border"><p class="bar-cont"></p></div></li>';
	        $('#picfile').before(progressHtml);
	}
		    
    function upload_full_show(id, data){
        // 文件上传进度
        if ( data.status) {
        	ob = $('#uploadFile'+id);
           	ob.find('.bar-cont').width('100%');
			ob.html('');
            ob.html = $('<img style="width:280px;height:210px" src="'+data.link+'" alt=""><div class="thumb-oper" rel="'+data.picid+'"><a class="set cov" href="javascript:;"><i class="icon-pic-round"></i><span class="">封面</span></a><a class="set del" href="javascript:;"><i class="icon-error-thin"></i><span class="">删除</span></a></div>').appendTo(ob).show();
           	ob.removeClass('up-thumb-add up-thumb-bar');
        }else{
        	if(data.code==0){
        		globalTip(data);
        	}else{
        		alert('文件:"'+data.file+"' "+data.msg);
        	}
        	$('#uploadFile'+id).remove();
        }
    }
	
	$(function(){
		    $('#picupload').dmUploader({
		        url: 'upload',
		        dataType: 'json',
		        extFilter : 'jpg;png;gif;jpeg',
		        maxFileSize : 10485760,
		        extraData:{'acl':acl},
		        onNewFile: function(id, file){
		         	update_file_progress(id);
		        }, 
		        onFileSizeError : function(file){
		            alert('文件:"'+file.name+'" 超过10M规定大小');
		        },
		        onFileExtError:function(file){
		        	alert('文件:"'+file.name+'" 类型错误,请重新上传');
		        },
		        onUploadProgress: function(id, percent){
		            var percentStr = percent + '%';
		            $('#uploadFile'+id).find('.bar-cont').width(percentStr);
		        },
		        onUploadSuccess: function(id, data){
		        	if(data.status){
		        		upload_full_show(id, data);
		        	}else{
		        		errorTip(data.msg, data.setTime);
		        		$('#uploadFile'+id).remove();
		        		return false;
		        	}
		        },
		        onUploadError:function(id, message){
		        	alert('上传请求失败');
		        	$('#uploadFile'+id).remove();
		        }
		    });

		    $('#fontcover').dmUploader({
		    	url:'/uploadimg/',
		    	dataType: 'json',
		        extFilter : 'jpg;png;gif;jpeg',
		        maxFileSize : 10485760,
		        extraData:{'acl':acl},
		    	onBeforeUpload:function(file){
		    		this.find('span').text('正在上传封面');
		    	},
		    	onFileSizeError : function(file){
		            alert('封面文件:"'+file.name+'" 超过规定大小10M');
		        },
		         onFileExtError:function(file){
		        	alert('文件:"'+file.name+'" 类型错误,请重新上传');
		        },
		    	onUploadProgress: function(id, percent){
		    		var percentStr = percent + '%';
		            this.find('.up-cover-bar').width(percentStr);
		        },
		        onComplete: function(){
		      		this.find('.up-cover-bar').width(0);
		      	},
		        onUploadSuccess: function(id, data){
		        	if(data.code){
		        		errorTip(data.msg, data.setTime);
		        		coverfile = false;
		        		this.find('span').text('编辑封面(560*420)');
		        		return false;
		        	}

		        	$('.up-cover-pic img').attr('src',data.link).width('280px').height('210px');
		        	this.find('span').text('编辑封面(560*420)');
		        },
		        onUploadError:function(id, message){
		        	alert('操作失败');
		        	$('#uploadFile'+id).remove();
		        	this.find('span').text('编辑封面(560*420)');
		        }
		    });
			
			$('#zippro').dmUploader({
		    	url:'upfile',
		    	dataType  :'json',
		    	extFilter : 'zip;rar;7z',
		    	maxFileSize : 31457280,
		    	extraData:{'acl':acl},
		    	onUploadProgress: function(id, percent){
		    		var percentStr = percent + '%';
		    		this.find('.up-file-bar').width(percentStr);	
		        },
		        onComplete: function(){
		      		this.find('.up-file-bar').width(0);
		      	},
		      	onFileSizeError : function(file){
		            alert('文件:"'+file.name+'" 超过规定大小30M');
		        },
		        onUploadSuccess: function(id, data){
		        	if(data.code){
		        		data.time = 5;
		        		errorTip(data.msg);
		        		return false;
		        	}
		        	this.find('.finish').show();
		        	this.find('.finish a').attr('href',data.file_path+'?attname='+data.filename);

		        	this.find('.finish span').text(data.filename);

		        }
		    });
});

