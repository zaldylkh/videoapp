$(document).on("ready", function() {

	toggleMediaPlayer();
	console.log("[ OK ] - JS ToggleMediaPlayer");
	loadVideos();
	console.log("[ OK ] - JS loadVideos");
	
});
 	
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

function loadVideos(){
                
                $("#searchbtn").on("click",function(){

                    var texto="";
                    var tag = $("#searchbox").val();
                    console.log("http://gdata.youtube.com/feeds/api/videos?q="+tag+"&caption&v=2&alt=json");
                    $.getJSON("http://gdata.youtube.com/feeds/api/videos?q="+tag+"&caption&v=2&alt=json", function(datos){

                            $.each(datos.feed.entry, function(i, item){
                                texto +="<div class='cuadro'>";
                                texto += "<embed src="+item.content.src+">";
                                texto +="<p id='letra'>"+item.title.$t+"</p>";
                                //texto +="<div>"+item.description+"</div>";
                                texto +="</div>";

                            });
                            $("#content_music_list").html(texto);

                        });

                });
                
            
}