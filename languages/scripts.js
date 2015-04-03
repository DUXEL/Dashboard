$(document).ready(function(){

    var availableLanguages = [
      "Aleman",
      "Arabe",
      "Chino mandarin",
      "Coreano",
      "Español",
      "Frances",
      "Griego",
      "Holandes",
      "Ingles",
      "Italiano",
      "Japones",
      "Portugues",
      "Rumano",
      "Ruso",
      "Sueco",
      "Vietnamita"
    ];
    $( "#language-textbox" ).autocomplete({
      source: availableLanguages
    });
        
	var isAvailable = function(lang){
		for (i = 0; i < availableLanguages.length; i++) {
			if (availableLanguages[i]===lang) return true;
		}
		return false;
	}    
	
	$(document).on("click","ul li a",function(){
		$(this).parent().remove();
	});	

	$(document).keypress(function(key) {
		if(key.which == 13) {
			var text = $("#language-textbox").val();
			if ( isAvailable(text)===true ){
				var id = "language-"+text;
				var item = "<li id="+id+">"+text+"&nbsp;<a href='#'><img src='delete.png'/></a> </li>";
				$("#languages-list").append(item);
			}
			$("#language-textbox").val("");
			
				
		}
	});	

});






