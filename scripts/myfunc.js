function toggleMediaPlayer() {
	$("#toggleMPlayer").on("click", function() {
		var loadedClass = $("#content").attr('class');
	
		
		if ( loadedClass == "content-large") {
			$("#content").addClass("content-small");
			$("#content").removeClass("content-large");
			$("#footer").addClass("footer-large");
			$("#footer").removeClass("footer-small");	
			$("#toggleMPlayer").html('Minimizar');
			
			
		} else {
			$("#content").addClass("content-large");
			$("#content").removeClass("content-small");
			$("#footer").addClass("footer-small");
			$("#footer").removeClass("footer-large");
			$("#toggleMPlayer").html('Maximizar');
		}
	});
}