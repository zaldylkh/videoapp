$(document).on("ready", function() {

	toggleMediaPlayer();
	console.log("[ OK ] - JS ToggleMediaPlayer");
	console.log("[ OK ] - JS loadVideos");
	
	
	$("searchbox").keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$("form").submit();
		}
	});
	$("#searchbtn").on("click",loadVideos);
	
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

function setVideo(id) {
	var video = id;
	
	$("#player").html("<iframe src='https://www.youtube.com/embed/"+video+"?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1' class='video-player' frameborder='0' allowfullscreen=''></iframe>");
	
	
	var loadedClass = $("#content").attr('class');
		if ( loadedClass == "content-large") {
		$("#content").addClass("content-small");
		$("#content").removeClass("content-large");
		$("#footer").addClass("footer-large");
		$("#footer").removeClass("footer-small");	
		$("#toggleMPlayer").html('Minimizar');	
	}
}



function splitVideoId(id) {
	var arr = id.split(':');
	return arr[3];
}

function loadVideos(){
                    var texto="";
                    var tag = $("#searchbox").val();
					
					if ( tag == "" ) {
						console.log("[ USER-ERROR ] - El usuario no sabe ni buscar... -> no hay termino de busqueda en el input.");
						return false;
					}
					
					$("#content_music_title").html("Resultados para la busqueda: <em>'"+tag+"'</em>");
                    console.log("http://gdata.youtube.com/feeds/api/videos?q="+tag+"&caption&v=2&alt=json");
                    $.getJSON("http://gdata.youtube.com/feeds/api/videos?q="+tag+"&caption&v=2&alt=json", function(datos){

                            $.each(datos.feed.entry, function(i, item){
                                texto +="<div class='row_music'>";
                                
	                                texto +="<div class='cover_song'>";
										var videoID = splitVideoId(item.id.$t);
										texto += "<embed src="+item.media$group.media$thumbnail[0].url+" class='cover_image'>"				
										texto += "<br><a href=\"#\" onClick=\"setVideo('"+videoID+"')\"><img src='images/search.png'></a>";
										texto += "</div>";

	                                texto += "<div class='cover_title'><span class='letra'>"+item.title.$t+"</span></div>";
									texto +="</div>";
								texto +="<hr />";
                            });
                            $("#content_music_list").html(texto);

                    });
    return false;       
}

function mostPopular() {


}