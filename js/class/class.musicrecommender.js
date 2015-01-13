function MusicRecommender() {
    
    var query="";
    
    var text=[];


    list = function(response) {
        
        $("#results").html(response);


    }

    this.search = function(youtubearray) {
       var k;
       
        if (youtubearray.length>0){
              
            query=youtubearray[youtubearray.length-1].getArtist();  //le paso el nombre del ultimo artista escuchado de la lista          
            //query="rihanna";
            var suggestions = "";

            $.getJSON("https://api.spotify.com/v1/search?query=artist:"+query+"&offset=0&limit=4&type=album&market=US", function(datos){
              
                $.each(datos.albums.items, function(i, item){
                                       
                    suggestions += "<img style='width:80px; z-index:1;'src='"+item.images[0].url+"'>";
                
                });
                list(suggestions);
             });

        }
    
    }
        
}





