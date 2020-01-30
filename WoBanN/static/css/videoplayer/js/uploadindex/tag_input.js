$tag = $('#tags');
$tag.tagsInput({ 
	width: 'auto',
	autocomplete:false,
	placeholderColor: 'rgb(188, 200, 209)',
    minChars:"2",
	onRemoveTag:function(tag){
		ob = $('.up-hot-tag span').length;
        for(var i=0 ;i < ob ;i++){
        	if($('.up-hot-tag span').eq(i).text() == tag){
            	$('.up-hot-tag span').eq(i).parents('.cl').show();
        	}
        }
        total = charcount();
        show_erro(total,30);
    },
    onAddTag:function(tag){
	    ob = $('.up-hot-tag span').length;
        for(var i=0 ;i < ob ;i++){
        if($('.up-hot-tag span').eq(i).text() == tag){
                $('.up-hot-tag span').eq(i).parent('.cl').hide();
            }
        }
        total = charcount();
        show_erro(total,30);

    }

});

function charcount(){
    var total = 0;
     $('#tags_tagsinput span span').each(function(){
            total += parseInt($(this).text().length)-2;
        });
     return total;
}

function show_erro(a,b){
    if(a  > b){
        $('.tags_msg').show();
    }else{
        $('.tags_msg').hide();
    }
}
$(document).on('click','.up-hot-tag a',function(){
    tag = $(this).find('span').text();
        if(!$tag.tagExist(tag)){
            $tag.addTag(tag);
            $(this).hide();
        }else{
            globalTip({msg:"标签已存在"});
        }
});