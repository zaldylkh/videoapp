$(document).on("ready", main);

        function idAlbum(href){
            var data = href;
            var arr = data.split(":");
            return arr[2];
        }

        function splitSearchAlbum(album){
            var data = album;
            var arr = data.split("-");
            return arr[0];
        }

        function splitSearchArtist(album){
            var data = album;
            var arr = data.split("-");
            return arr[1];
        }


        function get_XMLHttpRequest(id){

                var xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.spotify.com/v1/albums/"+id+"", false);
                xhr.send();
                console.log(xhr.statusText);
                var json_response = xhr.responseText;
                var response = JSON.parse(json_response);
                return response;

            }
        function getIdAlbumArtist(album, artista){
                var id = "";
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.spotify.com/v1/search?q=album:"+album+"+artist:"+artista+"&type=album", false);
                xhr.send();
                console.log(xhr.statusText);
                var json_response = xhr.responseText;
                var response = JSON.parse(json_response);
                return response;
        }    

       function main(){
        $("#title").html("<h4>Most popular Pop songs in Spain</h4>");
        var mostpopularSongs = "";

        $.getJSON("https://api.spotify.com/v1/search?type=track&q=genre:pop+year:1980-2015&market=ES", function(datos){
            $("#pop").html("<h4>Pop</h4>");
            $.each(datos.tracks.items, function(i, item){
                mostpopularSongs += "<div class='row-fluid panel-body well vertical-center transparent_color row_list'>";
                mostpopularSongs +=     "<div class='col-xs-4 col-lg-2 panel-body' >";
                mostpopularSongs +=         "<img class='imageSize' src="+item.album.images[1].url+">";
                mostpopularSongs +=     "</div>";
                
                mostpopularSongs += "<div class='col-xs-5 col-lg-6 panel-body vertical-center songTextColor'>";
                mostpopularSongs +=     "<p style='font-size:1em;'>"+item.artists[0].name+" - "+item.name+"</p>"
                mostpopularSongs += "</div>";
                
                mostpopularSongs += "<div id='buttons' class='col-xs-1 col-lg-2'>";
                mostpopularSongs +=        "<input id='info"+i+"' value='"+item.album.images[1].url+"@ @"+item.artists[0].name+"@"+item.name+"' type='text' hidden>";
                //mostpopularSongs +=        "<button id='play' class='input-sm' type='button' onclick='startPlay(info"+i+")'>Play</button>";
                mostpopularSongs +=         "<input type='image' id='play' src='imgs/playing.png' border='0px' onclick='startPlay(info"+i+")'>";
                mostpopularSongs += "</div>";
                
                mostpopularSongs += "<div id='buttons' class='col-xs-1 col-lg-2 panel-body sizeDivButton'>";
                mostpopularSongs +=         "<input type='image' style='width:15px; height:15px;' class='icsmall' id='addToPlayList' src='imgs/add_orange.png' border='0px' onclick='addPlayList(info"+i+")'>";     
                //mostpopularSongs +=        "<button id='addToPlayList' class='input-sm' type='button' onclick='addPlayList(info"+i+")'>Add</button>";
                
                mostpopularSongs += "</div>";


                /*
                mostpopularSongs += "<div id='buttons' class='col-xs-1 col-lg-2 panel-body sizeDivButton'>";
                mostpopularSongs +=        "<input id='info"+i+"' value='"+item.album.images[1].url+"@ @"+item.artists[0].name+"@"+item.name+"' type='text' hidden>";
                //mostpopularSongs +=        "<button id='play' class='input-sm' type='button' onclick='startPlay(info"+i+")'><img class='icsmall' src='imgs/playing.png'></button>";
                mostpopularSongs +=         "<input type='image' style='width:15px; height:15px;' id='play' src='imgs/playing.png' border='0px' onclick='startPlay(info"+i+")'>";
                mostpopularSongs += "</div>";
                mostpopularSongs += "<div id='buttons' class='col-xs-1 col-lg-2 panel-body sizeDivButton text-right'>";
                mostpopularSongs +=         "<input type='image' style='width:15px; height:15px;' class='icsmall' id='addToPlayList' src='imgs/add_orange.png' border='0px' onclick='addPlayList(info"+i+")'>";     
                mostpopularSongs += "</div>";*/
                mostpopularSongs += "</div>";
                

            });
            document.getElementById('content_body').innerHTML += mostpopularSongs;

        });

        
        $("#searchbtn").on("click",function(){

            var searchText = document.getElementById('busqueda').value;
            if (searchText == ""){
                alert("Please, fill in the textbox!");
            }else{

                var texto = "";
                var option = $("#options").prop('value');
                console.log(option);

                if (option == "artist"){
                var j = 0;
                var texto = "";
                $("#title").html("<h4>Search list music</h4>");
                var tag = $("#busqueda").val();
                $.getJSON("http://ws.spotify.com/search/1/track.json?q=artist:"+tag+"", function(datos){

                $.each(datos.tracks, function(i, item){
                    //Obtenemos el id de cada uno de los albumes, para sacar la imagen correspondiente!
                        var id = idAlbum(item.album.href);
                        //console.log(id);
                        //Obtenemos la url de la imagen correspondiente!
                        
                        //var hrefImageAlbum = 'https://i.scdn.co/image/491d79d7a8f80d46f6473beef2860da45475c018';
                        //console.log(hrefImageAlbum);
                        //urlImage(id);
                        var imageObj = get_XMLHttpRequest(id);
                        imageURL = imageObj.images[1].url;              

                        texto +="<div class='row panel-body well vertical-center transparent_color row_list'>";            
                        
                        texto +=    "<div  id='imagen"+j+"' class='col-xs-4 col-lg-2 panel-body'>";
                        texto +=        "<img class='imageSize' src ='"+imageURL+"'>";
                        texto +=    "</div>";
                        
                        texto +=    "<div class='col-xs-5 col-lg-7 panel-body vertical-center songTextColor' >";
                        texto +=        "<p><h6>"+item.artists[0].name+"</h6> <h7>"+item.album.name+"</h7></p>";
                        texto +=    "</div>";
                        
                        texto += "<div id='buttons' class='col-xs-1 col-lg-2 panel-body sizeDivButton'>";
                        texto +=        "<input id='info"+i+"' value='"+imageURL+"@ @"+item.artists[0].name+"@"+item.album.name+"' type='text' hidden>";
                        //texto +=        "<button id='play' class='input-sm' type='button' onclick='startPlay(info"+i+")'><img class='icsmall' src='imgs/playing.png'></button>";
                        texto +=         "<input type='image' id='play' src='imgs/playing.png' border='0px' onclick='startPlay(info"+i+")'>";
                        texto += "</div>";
                        
                        texto += "<div id='buttons' class='col-xs-1 col-lg-2 panel-body sizeDivButton text-right'>";       
                        //texto +=         "<button style='height:40px;' id='addToPlayList' class='input-sm' type='button' onclick='addPlayList(info"+i+")'><img style='width:20px;'src='imgs/add_orange.png'></button>";
                        texto +=         "<input type='image' style='width:15px; height:15px;' class='icsmall' id='addToPlayList' src='imgs/add_orange.png' border='0px' onclick='addPlayList(info"+i+")'>";
                        texto += "</div>";
                        
                        texto += "</div>";
                        $("#content_body").html(texto);
                        j++;

                    });
                    

                });                    
                    
                    
                }else if(option == "album"){
                    var texto = "";
                    $("#title").html("<h4>Search list music</h4>");
                    var tag = $("#busqueda").val();
                    var searchAlbum = splitSearchAlbum(tag);
                    var searchArtist = splitSearchArtist(tag);
                    var search1 = $.trim(searchAlbum);
                    var search2 = $.trim(searchArtist);  
                    console.log(search1);
                    console.log(search2);
                    if (search1 == "" || search2 == ""){
                        $("#busqueda").val("Name Album - Name Artist");
                    }else{
                        var responseObj = getIdAlbumArtist(search1, search2);
                        var j = 0; 
                        for ( var i=0; i<responseObj.albums.items.length; i++){
                            var id = responseObj.albums.items[i].id;
                            console.log(id);
                        }
                            
                            $.getJSON("https://api.spotify.com/v1/albums/"+id+"", function(datos){
                                
                            $.each(datos, function(i, item){                                    

                                    texto +="<div class='row panel-body well vertical-center transparent_color row_list'>";            
                                    texto +=    "<div  id='imagen"+i+"' class='col-xs-4 col-lg-2 panel-body'>";
                                    texto +=        "<img class='imageSize' src ="+datos.images[1].url+">";
                                    texto +=    "</div>";
                                    texto +=    "<div class='col-xs-5 col-lg-7 panel-body vertical-center songTextColor' >";
                                    texto +=        "<p style='font-size:1em;>"+datos.artists[0].name+"</p>";
                                    

                                    texto +=        "<p style='font-size:1em;>"+datos.tracks.items[j].name+"</p>";
                                    
                                    

                                    texto +=    "</div>";
                                
                                    texto += "<div id='buttons' class='col-xs-1 col-lg-2 panel-body sizeDivButton'>";
                                    texto +=        "<input id='info"+i+"' value='"+datos.images[1].url+"@ @"+datos.artists[0].name+"@"+datos.tracks.items[j].name+"' type='text' hidden>";
                                    //texto +=        "<button id='play' class='input-sm' type='button' onclick='startPlay(info"+i+")'><img class='icsmall' src='imgs/playing.png'></button>";
                                    texto +=         "<input type='image' id='play' src='imgs/playing.png' border='0px' onclick='startPlay(info"+i+")'>";
                                    texto += "</div>";
                                    texto += "<div id='buttons' class='col-xs-1 col-lg-2 panel-body sizeDivButton text-right'>";       
                                    //texto +=         "<button style='height:40px;' id='addToPlayList' class='input-sm' type='button' onclick='addPlayList(info"+i+")'><img style='width:20px;'src='imgs/add_orange.png'></button>";
                                    texto +=         "<input type='image' style='width:15px; height:15px;' class='icsmall' id='addToPlayList' src='imgs/add_orange.png' border='0px' onclick='addPlayList(info"+i+")'>";
                                    texto += "</div>";
                                    texto += "</div>";
                                   $("#content_body").html(texto);
                                   j++;
                                

                            });
                            

                        });
                            
                        
                        

                    }
                    
                    //https://api.spotify.com/v1/search?q=album:arrival%20artist:abba&type=album
         
                }else if(option == "song"){
                    $("#title").html("<h4>Search list music</h4>");
                    var tag = $("#busqueda").val();

                    $.getJSON("https://api.spotify.com/v1/search?q="+tag+"&type=track", function(datos){

                            $.each(datos.tracks.items, function(i, item){
                                texto +="<div class='row panel-body well vertical-center transparent_color row_list'>";            
                                texto +=    "<div  id='imagen"+i+"' class='col-xs-4 col-lg-2 panel-body'>";
                                texto +=        "<img class='imageSize' src ="+item.album.images[1].url+">";
                                texto +=    "</div>";
                                texto +=    "<div class='col-xs-5 col-lg-7 panel-body vertical-center songTextColor' >";
                                texto +=        "<p><h5>"+item.artists[0].name+"</h5> <h6>"+item.album.name+"</h6></p>";
                                texto +=    "</div>";
                                texto += "<div id='buttons' class='col-xs-1 col-lg-2 panel-body sizeDivButton'>";
                                texto +=        "<input id='info"+i+"' value='"+item.album.images[1].url+"@ @"+item.artists[0].name+"@"+item.album.name+"' type='text' hidden>";
                                //texto +=        "<button id='play' class='input-sm' type='button' onclick='startPlay(info"+i+")'><img class='icsmall' src='imgs/playing.png'></button>";
                                texto +=         "<input type='image' id='play' src='imgs/playing.png' border='0px' onclick='startPlay(info"+i+")'>";
                                texto += "</div>";
                                texto += "<div id='buttons' class='col-xs-1 col-lg-2 panel-body sizeDivButton text-right'>";       
                                //texto +=         "<button style='height:40px;' id='addToPlayList' class='input-sm' type='button' onclick='addPlayList(info"+i+")'><img style='width:20px;'src='imgs/add_orange.png'></button>";
                                texto +=         "<input type='image' style='width:15px; height:15px;' class='icsmall' id='addToPlayList' src='imgs/add_orange.png' border='0px' onclick='addPlayList(info"+i+")'>";
                                texto += "</div>";
                                texto += "</div>";
                                

                            });
                            $("#content_body").html(texto);

                        });
                }               

            }
            

        });

//http://ws.spotify.com/search/1/track.json?q=artist:David%20Guetta

        
        
    }

