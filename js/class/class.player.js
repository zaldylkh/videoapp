function Player(div2change, divplaylist ,database, fmusicr) {

	var actSong = 0;
	var playlist = [];
	var layer = document.getElementById(div2change)
	var pllayer = document.getElementById(divplaylist);
	var db = database;
	var musicrec = fmusicr;
	
	
	this.deleteItemPlaylist = function(fhttpUrl) {
		var ind=this.find(fhttpUrl);
		if ( ind > -1 ) {
			playlist.splice(ind,1);
			if ( actSong >= ind ) {
				actSong--;
			}
		}
		this.refreshPlaylist();
	}
	this.addItemPlaylist = function(vidObj) {
		var ind = this.find(vidObj.getHttpUrl());
		if ( ind == -1 ) {
			playlist.push(vidObj);
		}
	}

	this.find = function(fhttpUrl) {
		var index = "-1"
		var len=playlist.length;
		if ( len > 0 ) {
			for ( i=0; i<len; i++ ) {
				if ( playlist[i].getHttpUrl() == fhttpUrl ) {
					console.log("Found in "+i);
					index=i;
					break;
				}
			}
		}
		return index;
	}
	
	this.getPlaylistSize = function() {
		return playlist.length;
	}

	this.clearPlaylist = function() {
		delete playlist;
	}
	
	this.loadNext = function() {
		if ( (actSong+1) < playlist.length ) {
			actSong++;
			this.loadVideo(playlist[actSong]);
		}
	}
	this.loadPrev = function() {
		if ( actSong > 0 ) {
			actSong--;
			this.loadVideo(playlist[actSong]);
		}
	}

	this.loadVideo = function(vidObj) {
	
		$("#player").html(vidObj.getEmbed());
		if ( this.find(vidObj.getHttpUrl()) == -1 ) {
			playlist.push(vidObj);
		}
		actSong = this.find(vidObj.getHttpUrl());
		db.save(vidObj);
		db.get(musicrec.search);
		this.refreshPlaylist();
		
	}
	
	this.getNext = function() {
		if ( (actSong + 1) < playlist.length ) {
			return playlist[actSong+1];
		}
		return -1;
	}

	this.getPrev = function() {
		if ( (actSong-1) >= 0 ) {
			return playlist[actSong-1];
		}
		return -1;
	}
	
	this.loadFirst = function() {
		if ( playlist.length > 0 ) {
			actSong=0;
			this.loadVideo(playlist[actSong]);
			
		}
	}
	
	
	this.populate = function() {
		playlist.push(new Youtube("https://www.youtube.com/watch?v=oSb468V9y4k"));
		playlist.push(new Youtube("https://www.youtube.com/watch?v=WoYOxcAbUuY"));
		playlist.push(new Youtube("https://www.youtube.com/watch?v=FZqrzrOn1C8"));
		playlist.push(new Youtube("https://www.youtube.com/watch?v=TKLvM8myk9k"));
		playlist.push(new Youtube("https://www.youtube.com/watch?v=9iGenHJG7bs"));
		playlist.push(new Youtube("https://www.youtube.com/watch?v=MZOuMaCNEaQ"));
	
	}
	
	this.reloadVideo = function(exturl) {
		var id = this.find(exturl);
		this.loadVideo(playlist[id]);
	}
	
	this.refreshPlaylist = function() {
	
		var arrlen = playlist.length;
			
		var text = "<table id='tbplaylist' cellpadding='3' cellspacing='3' border='0px'>";
		for ( var i = 0; i<arrlen; i++) {

			text += "<tr align='left' valign='top'>";
			if ( i == actSong ) {
				text += "<td><img src='imgs/playing.png'></td>";
			} else {
				text += "<td align='center'><a href='#' onclick='player.reloadVideo(\""+playlist[i].getHttpUrl()+"\")'><img class='icsmall' src='imgs/queue.png'></td>";
			}
		
		
			text += "<td>"+playlist[i].getTitle()+
					"</td><td>"+playlist[i].getArtist()+
					"</td><td>"+playlist[i].getAlbum()+
					"</td><td><a href='#' onclick='player.deleteItemPlaylist(\""+playlist[i].getHttpUrl()+"\")'><img class='icsmall' src='imgs/trash.png'></a></td></tr>";
		
		}
		text += "</table>";
		
		$("#playlist").html(text);
	}
	
	
	// FUNCIONES DE TEST
	this.test = function() {
		var index=3;
		// Limpiamos la playlist
		this.clearPlaylist();
		console.log("Longitud de la playlist: "+playlist.length);
		
		// Rellenamos playlist
		this.populate();
		console.log("Longitud de la playlist: "+playlist.length);
	
		// Eliminamos un item
		var arlen = playlist.length;
		for (i=0;i<playlist.length;i++) {
			console.log("Item "+i+": "+playlist[i].getHttpUrl());
		}
		actSong=3;
		console.log("Actsong = "+actSong+" | Eliminamos el video 2");
		
		for (i=0;i<playlist.length;i++) {
			console.log("Item "+i+": "+playlist[i].getHttpUrl());
		}		
		this.deleteItemPlaylist("http://www.youtube.com/video2");
		console.log("Actsong = "+actSong+" | Eliminamos el video 6");
		this.deleteItemPlaylist("http://www.youtube.com/video6");
		console.log("Actsong = "+actSong);
		for (i=0;i<playlist.length;i++) {
			console.log("Item "+i+": "+playlist[i].getHttpUrl());
		}				
		console.log(this.getNext().getHttpUrl());
		console.log(this.getPrev().getHttpUrl());
		
		
		this.loadVideo(new Youtube("https://www.youtube.com/watch?v=fmI_Ndrxy14"));
		this.loadVideo(new Youtube("https://www.youtube.com/watch?v=7OSGWWKGo2Q"));
		
	
	}

}
console.log("[ OK ] - Class: Player");