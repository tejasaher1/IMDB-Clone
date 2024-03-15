// https://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96
// API Key = fc1fef96

var arrayInfoDivs = [];
var favArray = [];

function saveListItems(favArray) {
   // localStorage.setItem("myFavItems", favArray);
   var htmlStrings = favArray.map(function(div) {
       // console.log(div.outerHTML);
       return div.outerHTML;
   });

   // Store the array of HTML strings in localStorage
   localStorage.setItem("myFavItems", JSON.stringify(htmlStrings));
}

// -------------------------------------------------------------------------------------------------------------
var typeData = document.getElementById('movieName');
var mainDiv = document.querySelector('#mainDiv');
var favouriteMark =  document.getElementById('bookMark');
var infoDives;
var reloadOnTitleClick = document.querySelector('#title');

// Clicking on logo, the site will reload.
reloadOnTitleClick.addEventListener('click', function(event){
    location.reload();
})

// -------------------------------------------------------------------------------------------------------------

// Adding movies after fetching data from API.
function addSearchMovie(data){
   arrayInfoDivs = [];
   data.Search.forEach(movie => {
       // console.log(movie);
       var div = document.createElement('div');
       div.className = 'infoDive';
       div.id = movie.imdbID;
       if(movie.Poster != 'N/A'){       // Here we are checking movie poster is present for perticular movie
           div.innerHTML =  `
                               <img src="${movie.Poster}" alt="">
                               <h4> ${movie.Title} </h4>
                               <h5> ${movie.Year} </h5>  
                               <i class="bookMark fa-solid fa-shield-heart fa-xl" id="${movie.imdbID}"></i>

                               `
       }else{    // If movie poster is not present then we use default poster.
           div.innerHTML =  `
                               <img src="https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg" alt="">
                               <h4> ${movie.Title} </h4>
                               <h5> ${movie.Year} </h5>  
                               <i class="bookMark fa-solid fa-shield-heart fa-xl" id="${movie.imdbID}"></i>
                            `
       }

       mainDiv.append(div);     
       arrayInfoDivs.push(data.Search[0]);
   });
}

// -------------------------------------------------------------------------------------------------------------

// Fetching data from API.
async function fetchData(typeInfo){   // typerInfo is a search result pass as a parameter to fetchData func.
   var fetching = await fetch(`https://www.omdbapi.com/?s=${typeInfo}&apikey=a61d3f5d`)
   let data = await fetching.json();     //Converting data into json format.
   mainDiv.innerHTML = "";
   if(data.Search){
       addSearchMovie(data);
       checkClick();
   }else{
       console.log('Error to find movie');
   }
};

// -------------------------------------------------------------------------------------------------------------

// mainDiv.addEventListener('click', function(event) {
//     // Find the closest ancestor div with an ID
//     var childDiv = event.target.closest('.infoDive');
//     if (childDiv) {
//         console.log(event.target);
//         var childDivId = childDiv.id;
//         var dataToSend = {
//             key1: childDivId
//         }
//         var queryString = Object.keys(dataToSend).map(key => key + '=' + encodeURIComponent(dataToSend[key])).join('&');


//         // window.location.href = 'info.html?' + queryString;
//     }
// });

// -------------------------------------------------------------------------------------------------------------

// This function is use to check 
function checkClick(){
    if(arrayInfoDivs.length > 0){    //Checking is div is not empty
        var infoDives = document.querySelectorAll('.infoDive');
        for(let i=0; i<infoDives.length; i++){
            infoDives[i].addEventListener('click', function(event){
                if(!event.target.classList.contains('bookMark')){
                   var childDiv = event.target.closest('.infoDive');
                   if (childDiv) {
                       var childDivId = childDiv.id;
                       var dataToSend = {    //Creating a object for storing information
                           key1: childDivId
                       }
                       var queryString = Object.keys(dataToSend).map(key => key + '=' + encodeURIComponent(dataToSend[key])).join('&');
                       window.location.href = 'info.html?' + queryString;
                    }   
                }else{
                   favourite(event);    //If click is bookmark
              }
           });
       }
   }

}

// -------------------------------------------------------------------------------------------------------------


function favourite(event){
   if(arrayInfoDivs.length > 0){
       var favDiv = event.target.closest('.infoDive');
       event.target.style.color = "red";
       if(favArray.length <= 0){
           var checkIsfav = localStorage.getItem('myFavItems');
           if(checkIsfav !== null){
               var afterParse = JSON.parse(checkIsfav);
               afterParse.forEach(function(div){
                   var tempDiv = document.createElement('div');
                   tempDiv.innerHTML = div;
                   tempDiv.id = tempDiv.querySelector('.infoDive').id;
                   tempDiv = tempDiv.querySelector('.infoDive');     // lots of div are bing creating thats why we use this line so that we can specificly find the main div.
                   favArray.push(tempDiv);
               })
           }else{
               alert('Movie added in Favourite cart');
               favArray.push(favDiv);
           }
       }
       let isPresent = false;
       for(let i=0; i<favArray.length; i++){
           if(favArray[i].id === favDiv.id){
               alert('Movie is already in Favourite cart');
               isPresent = true;
           }
               
       }
       if (!isPresent) {
           alert('Movie added in Favourite cart');
           favArray.push(favDiv);
       }
       saveListItems(favArray);     
   
   }
}

// -------------------------------------------------------------------------------------------------------------

function startApp(){
   typeData.addEventListener('input', (e) => {     //Here we get the keystroke on every click
       fetchData(typeData.value);
   });
}


startApp();


// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
                                    // --- End --- \\



