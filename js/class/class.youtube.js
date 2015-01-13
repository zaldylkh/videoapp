function Youtube(furl) {
	
	var videoID = "";
	var type	= "Youtube";
	var title 	= "";
	var artist 	= "";
	var album 	= "";
	var url		= furl;
	var image	= ""
	

	// Metodos
	this.setTitle = function(newtitle) {
		title = newtitle;
	}
	this.getTitle = function() {
		return title;
	}	

	this.setArtist = function(newartist) { 
		artist = newartist;
	}
	this.getArtist = function() {
		return artist;
	}

	this.setAlbum = function(newalbum) {
		album = newalbum;
	}
	this.getAlbum = function() {
		return album;
	}
	this.getHttpUrl = function() {
		return url;
	}
	this.setHttpUrl = function(newurl) {
		url = newurl;
	}
	
	this.getVideoID = function() {
		return videoID;
	}	
	
	this.setVideoID = function(url) {

		var str = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
		videoID=str[1];
	}
	this.setVideoIDManual = function(fid) {
		videoID=fid;
		console.log("ID del video: "+videoID);
	}
			
	this.getEmbed 	= function() {
		if ( videoID != "" ) {
			return "<iframe src='https://www.youtube.com/embed/"+videoID+"?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1&rel=0' class='video-player' frameborder='0' allowfullscreen=''></iframe>";
		} 
		
		return "ERROR";
	}
	this.setThumbnail = function(previewURL) {
		image = previewURL;
	}
		
	this.getThumbnail = function() {
		return image;
	}
	
	this.getType = function() {
		return type;
	}
	
	
	// Constructor
	this.setVideoID(furl);
	

}
// Metodos estaticos

Youtube.extractVideoIDFromAPI = function(id) {
	var arr = id.split(':');
	return arr[3];	
}

console.log("[ OK ] - Class: Youtube");

