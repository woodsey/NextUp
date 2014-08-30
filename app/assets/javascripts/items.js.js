
var global_store=[
	current_menu='Now',
	
];

$(document).ready(function(){
	load_items();
	loadCompletedTotal();
});

function load_menu(){
	var str="<ul class=\"nav nav-tabs\" role=\"tablist\">";
	global_store.current_menu=='Now' ? str+=("<li class=\"active\"><a onclick=\"return false;\">Now</a></li>") : str+=("<li><a href=\"javascript:load_items('Now');\">Now</a></li>");
	global_store.current_menu=='Next' ? str+=("<li class=\"active\"><a onclick=\"return false;\">Next</a></li>") : str+=("<li><a href=\"javascript:load_items('Next');\">Next</a></li>");
	global_store.current_menu=='Collect' ? str+=("<li class=\"active\"><a onclick=\"return false;\">Collect</a></li>") : str+=("<li><a href=\"javascript:load_items('Collect');\">Collect</a></li>");
	global_store.current_menu=='Ideas' ? str+=("<li class=\"active\"><a onclick=\"return false;\">Ideas</a></li>") : str+=("<li><a href=\"javascript:load_items('Ideas');\">Ideas</a></li>");
	global_store.current_menu=='Archive' ? str+=("<li class=\"active\"><a onclick=\"return false;\">Archive</a></li>") : str+=("<li><a href=\"javascript:load_items('Archive');\">Archive</a></li>");
	str+=("</ul>");
	$('#items-menu').html( str );
}

function load_items( t ){
	$('#items-table').html("<p></p>");	/* add a loading message perhaps */
	var tab=t;
	if( tab=='' || !tab ){ tab="Next"; }
	global_store.current_menu=tab;
	load_menu();
	
	$.get("/items.json?list="+tab, function(data){
		var results=data;		
		var str="<table class=\"table table-condensed\">";
		str+="<thead>";
		str+="	<tr>";
		str+="	  <th>Title</th>";
		str+="	  <th>Category</th>";
		str+="	  <th>Notes</th>";
		str+="	  <th>Created</th>";
		global_store.current_menu=='Archive' ? str+=("    <th>Completed</th>") : str+=("	  <th>Actions</th>");
		global_store.current_menu=='Archive' ? str+=("    <th></th>") : str+="	  <th>Move To</th>";
		str+="	</tr>";
		str+="  </thead>";
		str+="  <tbody>";
		for (i=0; i<results.length; i++ ){
			str+=("<tr id=\"item_row_"+i+"\"><td class=\"item_row_title\">"+results[i].title+"</td>");
			str+=("<td class=\"item_row_category\">"+results[i].category+"</td>");
			str+=("<td class=\"item_row_notes\">"+results[i].notes+"</td>");
			str+=("<td class=\"item_row_created\">"+results[i].created_on_txt+" ago</td>");
			var act_dne=" <a href=\"javascript:item_complete('"+results[i].id+"','"+i+"')\">Done</a>";
			var act_del=" <a href=\"javascript:item_delete('"+results[i].id+"','"+i+"')\">Del</a>";
			global_store.current_menu=='Archive' ? "" : str+=("<td class=\"item_row_actions\">"+act_dne+act_del+"</td>");
			
			str+=("<td class=\"item_row_move\">");
			if ( !(global_store.current_menu=='Archive') ) {
				str+=("<select id=\"move_to_"+i+"\" onchange=\"item_move_to('"+results[i].id+"','"+i+"')\" class=\"move_to_select\">");
				str+=("<option value=\"\"></option>");
				str+=("<option value=\"Now\">Now</option>");
				str+=("<option value=\"Next\">Next</option>");
				str+=("<option value=\"Collect\">Collect</option>");
				str+=("<option value=\"Ideas\">Ideas</option>");
				str+=("</select>");
			}else{
				str+=( results[i].completed_on_txt+ " ago" );
			}
			str+=("</td></tr>");
			
		}
		str+="  </tbody>";
		str+="</table>";
		$('#items-table').html( str );
		
	})
}

function loadCompletedTotal(){
	$('#footer-completed-items').html('100');
}

function item_delete(id,row){
	if(!window.confirm("Sure you want to delete this item?")){return;}
	$.ajax({
		type:'PUT',
		url:'/items/'+id,
		data: { item: {
				deleted:1
			}
		},
		dataType:'json',
		success:function(data){
			$('#item_row_'+row).css('text-decoration','line-through');
			$('#item_row_'+row).fadeOut(1000);
		},
		error:function(data){
			alert('Problem!:'+data.responseText);
			$('#error-box').html(data.responseText);
		}
	})	
}

function item_move_to(id,row){
	var v=$('#move_to_'+row).val();
	$.ajax({
		type:'PUT',
		url:'/items/'+id,
		data: { item: {
				listed_in:v
			}
		},
		dataType:'json',
		success:function(data){
			$('#item_row_'+row).css('text-decoration','line-through');
			$('#item_row_'+row).fadeOut(1000);
		},
		error:function(data){
			alert('Problem!:'+data.responseText);
			$('#error-box').html(data.responseText);
		}
	})	
}

function item_complete(id,row){
	$.ajax({
		type:'PUT',
		url:'/items/'+id,
		data: { item: {
				complete:1,
				listed_in:"Archive"
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