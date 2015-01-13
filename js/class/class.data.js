function Data(fdbname,fdbdesc) {

	
	var dbname 	= fdbname;
	var dbdesc	= fdbdesc;
	
	var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	
	if ( isFirefox ) {
		var db		= [];
		
	} else {
		var db 		= openDatabase(dbname, '1.0', dbdesc, 2 * 1024 * 1024);
	}


	
	this.create = function() {
		if ( !isFirefox ) {

			db.transaction( function(tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS playedsongs (id unique, objtype, title, artist, album, url, thumbnail, timesplayed)');	
			});
		}
	}
	
	this.clean = function() {
		if ( !isFirefox ) {
			db.transaction( function(tx) {
				tx.executeSql('DELETE FROM playedsongs');
			});
		} else {
			db = [];
		}
	}
	
	
	this.populate = function() {
		this.save(new Youtube("https://www.youtube.com/watch?v=jiwuQ6UHMQg"));
		this.save(new Youtube("https://www.youtube.com/watch?v=Li9Vi_-Nufk"));
		this.save(new Youtube("https://www.youtube.com/watch?v=quyGgIIItCM"));
		this.save(new Youtube("https://www.youtube.com/watch?v=06H_6oI4EK4"));
		this.save(new Youtube("https://www.youtube.com/watch?v=06H_6oI4EK4"));
		this.save(new Youtube("https://www.youtube.com/watch?v=06H_6oI4EK4"));
		this.save(new Youtube("https://www.youtube.com/watch?v=06H_6oI4EK4"));
		this.save(new Youtube("https://www.youtube.com/watch?v=06H_6oI4EK4"));
		this.save(new Youtube("https://www.youtube.com/watch?v=06H_6oI4EK4"));
		this.save(new Youtube("https://www.youtube.com/watch?v=06H_6oI4EK4"));
		this.save(new Youtube("https://www.youtube.com/watch?v=06H_6oI4EK4"));
	}
	
	this.get = function(callback) {
		if ( !isFirefox ) {
			var queryGET = 'SELECT * FROM playedsongs ORDER BY timesplayed DESC'
			db.transaction(
				function(tx) {
				tx.executeSql(queryGET, [], function(tx,rs) {
					var result = [];
					var arlen = rs.rows.length;
					
					for ( var i=0; i<arlen; i++ ) {
						var row = rs.rows.item(i);
						var tmpVid;
						switch ( row.objtype ) {
							case "Youtube":
								tmpVid = new Youtube(row.url);
							break;
							case "Vimeo":
								console.log("Objeto Vimeo");
							break;
						}
						tmpVid.setArtist(row.artist);
						tmpVid.setAlbum(row.album);
						tmpVid.setTitle(row.title);
						
						// Rellenamos el objeto Youtube.
						
						result.push(tmpVid);
					}
					
					callback(result);
				});
			});
		} else {
			callback(db);
		}
	}
	
	this.save = function(vidObj) {
		
		if ( !isFirefox ) {
			var query = 'SELECT count(id) AS lines FROM playedsongs WHERE id="'+vidObj.getVideoID()+'"';
			//console.log(query);
			db.transaction(
			
				function(tx) {
					tx.executeSql(query, [], function(tx,rs) {
		
					if ( rs.rows.item(0).lines == 1 ){
						query = 'UPDATE playedsongs SET timesplayed=timesplayed+1 WHERE id="'+vidObj.getVideoID()+'"';
						console.log(query);
					} else {
						var query = 'INSERT INTO playedsongs (id, objtype, title, artist, album, url, thumbnail, timesplayed) VALUES ("'+
						vidObj.getVideoID()+'","'+
						vidObj.getType()+'","'+
						vidObj.getTitle()+'","'+
						vidObj.getArtist()+'","'+
						vidObj.getAlbum()+'","'+
						vidObj.getHttpUrl()+'","'+
						vidObj.getThumbnail()+'","1")';
						tx.executeSql(query);
					}
				});
			
			});
		} else {
			
			if ( this.find(vidObj.getHttpUrl()) == -1 ) {
				db.push(vidObj);
			}
		}
	}
	
	this.find = function(httpurl) {
		var id = -1;
		
		for ( var i=0; i<db.length; i++) {
			if ( httpurl == db[i].getHttpUrl() ) {
				id = i;
			}
		}
		return id;
	}
	
	// CONSTRUCTOR
	this.clean();
	this.create();
	//this.populate(); // FUNCION para testear la base de datos

}
console.log("[ OK ] - Class: Data");