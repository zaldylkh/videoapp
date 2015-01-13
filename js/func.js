var database = new Data("ROARLA","Streaming multimedia");
var mrecom = new MusicRecommender();
//var mrecom = "";
var player = new Player("player","playlist",database,mrecom);

$(document).on("ready", function() {
	toggleMediaPlayer();
});


function splitVideoId(id) {
	var arr = id.split(':');
	return arr[3];
}
function toggleMediaPlayer() {
	$("#toggleMPlayer").on("click", function() {
		var loadedClass = $("#futer").attr('class');
	
		if ( loadedClass == "footer-small") {
			//$("#content_body").addClass("content-small");
			//$("#content_body").removeClass("content-large");
			$("#futer").addClass("footer-large");
			$("#futer").removeClass("footer-small");	
			$("#toggleMPlayer").attr("src", "imgs/show.png");
			
			
		} else {
			//$("#content_body").addClass("content-large");
			//$("#content_body").removeClass("content-small");
			$("#futer").addClass("footer-small");
			$("#futer").removeClass("footer-large");
			$("#toggleMPlayer").attr("src", "imgs/hide.png");
		}
	});
}
function MPlayerUP() {
	
	$("#futer").addClass("footer-large");
	$("#futer").removeClass("footer-small");	
	$("#toggleMPlayer").attr("src", "imgs/show.png");
	

}

function startPlay(identifier) {
	console.log(identifier.value);
	var arr = identifier.value.split("@");
	
	var image = arr[0];
	var album = arr[1];
	var artist = arr[2];
	var title = arr[3];
	
	$.getJSON("http://gdata.youtube.com/feeds/api/videos?q="+title+" - "+artist+"&v=2&alt=json", function(datos){

		$.each(datos.feed.entry, function(i, item){
			if ( i == 0 ) {
				var idvid = splitVideoId(item.id.$t);
				var string = "https://www.youtube.com/watch?v="+idvid;
				var tmpYoutube = new Youtube(string);
				
				tmpYoutube.setThumbnail(image);
				tmpYoutube.setAlbum(album);
				tmpYoutube.setArtist(artist);
				tmpYoutube.setTitle(item.title.$t);
				
				
				player.loadVideo(tmpYoutube);
			}
		});


	});
	if ( player.getPlaylistSize() == 0 ) {
		MPlayerUP();
	}


}
function verReproduccionesUsuario(arrVid) {
	
	if ( arrVid.length == 0 ) {
		alert("Aun no se ha reproducido ninguna canción.");
	} else {
		var text = "Roarla: Canciones reproducidas por el usuario\n\n";
		for ( var i = 0; i<arrVid.length; i++ ) { 
			text += arrVid[i].getTitle()+"\n";
		}
		alert(text);
	}

}

function addPlayList(identifier) {
	console.log(identifier.value);
	var arr = identifier.value.split("@");
	
	var image = arr[0];
	var album = arr[1];
	var artist = arr[2];
	var title = arr[3];
	
	$.getJSON("http://gdata.youtube.com/feeds/api/videos?q="+title+" - "+artist+"&v=2&alt=json", function(datos){

		$.each(datos.feed.entry, function(i, item){
			if ( i == 0 ) {
				var idvid = splitVideoId(item.id.$t);
				var string = "https://www.youtube.com/watch?v="+idvid;
				var tmpYoutube = new Youtube(string);
				
				tmpYoutube.setThumbnail(image);
				tmpYoutube.setAlbum(album);
				tmpYoutube.setArtist(artist);
				tmpYoutube.setTitle(item.title.$t);
				

				
				player.addItemPlaylist(tmpYoutube);
				player.refreshPlaylist();
			}
		});

		
	});
}

function selectedOption(opcion) {

	var capOpt = opcion.charAt(0).toUpperCase() + opcion.slice(1);
	var prSTR = capOpt+" <span class='caret'> ";
	$("#options").prop("value", opcion);
	$("#options").html(prSTR);
}

console.log("[ OK ] - Func");