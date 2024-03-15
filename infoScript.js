/////////////// --------   Information Page Script   ---------- \\\\\\\\\\\\\\\\\\\\


// Extracting movie ID from URL -
var queryString = window.location.search;
var params = new URLSearchParams(queryString);
// var object = Object.fromEntries(params.entries());
// var moviID = moviID.key1;
var moviID = params.get('key1');

// ---------------------------------------------------------------------------------------------------------------------

var movidata;
var imageInfos = document.getElementById('imageInfo');
// var moreInfos = document.getElementById('moreInfo');
var primeInfos = document.getElementById('primeInfo');
var onButtonClick = document.getElementById('backButton');

var directorDetailss = document.getElementById('directorDetails');
var writerDetailss = document.getElementById('writerDetails');
var actorDetailss = document.getElementById('actorDetails');
var releaseDatas = document.getElementById('releaseData');
var BoxOffice = document.getElementById('boxOffice');

// -------------------------------------------------------------------------------------------------------------
   

// Fetching Information from API -
async function fatchInfoUsingMoviID(){
   var data = await fetch(`https://www.omdbapi.com/?i=${moviID}&apikey=a61d3f5d`);
   movidata = await data.json();
   console.log(movidata);
   createImageInfo();
   createPrimeInfo();
   searchVideos();
}

function createImageInfo(){
   var img = document.createElement('img');
   if(movidata.Poster != 'N/A'){
       img.src = movidata.Poster;
   }else{
       img.src = "/default-movie.jpg";
   }    
   img.alt = "";

   var div = document.createElement('div');
   div.id = "moreInfo";
   div.innerHTML = `
           <h4> ${movidata.Year} </h4>
           <h4> ${movidata.Runtime} </h4>
           <h4 style="color:yellow"> IMDB Rating - ${movidata.imdbRating} </h4>
       `
   
   imageInfos.append(img);
   imageInfos.append(div);
}

function createPrimeInfo(){
   // <h1 id="title"> Title - The Avengers </h1>
   var h1 = document.createElement("h1");
   h1.id = 'title';
   h1.innerHTML = `
                       Title - ${movidata.Title}
                   `
   primeInfos.append(h1);
   
   var p = document.createElement("p");
   p.innerText = `${movidata.Plot}`;
   primeInfos.append(p);

   var DirectorSpan = document.createElement("span");
   DirectorSpan.innerText = `${movidata.Director}`;
   directorDetailss.append(DirectorSpan);

   var WriterSpan = document.createElement("span");
   WriterSpan.innerText = `${movidata.Writer}`;
   writerDetailss.append(WriterSpan);

   var ActorSpan = document.createElement("span");
   ActorSpan.innerText = `${movidata.Actors}`;
   actorDetailss.append(ActorSpan);

   var ReleaseDSpan = document.createElement("span");
   ReleaseDSpan.innerText = `${movidata.Released}`;
   releaseDatas.append(ReleaseDSpan);

   var BoxOfficeC = document.createElement("span");
   BoxOfficeC.innerText = `${movidata.BoxOffice}`;
   BoxOffice.append(BoxOfficeC);

}



//------------------------------------------------------------------------------------

// Additional features include showing a trailer for a particular movie using the YouTube API.


// function searchVideos() {
//    var searchQuery = movidata.Title;
//    var apiKey = "AIzaSyAxWElDwxD1D0Bm4Zrn9f4ve3tA-eyUS90"; // Replace with your own API key
//    var trailer = " Trailer";
//    var url = "https://www.googleapis.com/youtube/v3/search?key=" + apiKey + "&q=" + searchQuery  + trailer  + "&part=snippet&type=video";
//    console.log(url);
//    fetch(url)
//    .then(response => response.json())
//    .then(data => {
//        var videoId = data.items[0].id.videoId; // Get the videoId of the first video
//        embedVideo(videoId);
//        console.log(videoId);
//    })
//    .catch(error => console.error('Error:', error));
// }

// function embedVideo(videoId) {
//    var playerDiv = document.getElementById("player");
//    playerDiv.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
// }


//------------------------------------------------------------------------------------


if(moviID){
   fatchInfoUsingMoviID();
}



// -------------------------------------------------------------------------------------------------------------

                                 // --- End --- \\


