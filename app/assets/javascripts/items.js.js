
$(document).ready(function(){
	loadCompletedTotal();
});

function loadCompletedTotal(){
	$('#footer-completed-items').html('100');
}


function item_complete(id,row){
	$.ajax({
		type:'PUT',
		url:'/items/'+id,
		data: { item: {
				complete:1,
			}
		},
		dataType:'json',
		success:function(data){
			//$('#item_row_'+row).css('background-color','green');
			$('#item_row_'+row).css('text-decoration','line-through');
			$('#item_row_'+row).fadeOut(1000);
		},
		error:function(data){
			alert('Problem!:'+data.responseText);
			$('#error-box').html(data.responseText);
		}
	})
}