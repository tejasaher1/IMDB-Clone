/////////////// --------------------   Favourite Page Script backup   -------------------- \\\\\\\\\\\\\\\\\\\\

window.onload = function(){
    loadFavItems();
 }
 
 // -------------------------------------------------------------------------------------------------------------
 
 // var favouriteItem = document.getElementById('myFav');
 // function loadFavItems(){
 //     var storedItems = localStorage.getItem("myFavItems");
 //     console.log(storedItems);
   
 //     if(storedItems){
 
 //         document.getElementById('myFav').innerHTML = storedItems;
 //     }
 // }
 // -------------------------------------------------------------------------------------------------------------
 
 var myFavElement = document.getElementById('myFav');
 var htmlStrings;
 var storedItems;
 var allFavDivArray = [];
 
 // -------------------------------------------------------------------------------------------------------------
 
 function saveListItems(favArray) {
    // localStorage.setItem("myFavItems", favArray);
    var htmlStrings = favArray.map(function(div) {
        // console.log(div.outerHTML);
        return div.outerHTML;
    });
 
    // Store the array of HTML strings in localStorage
    localStorage.setItem("myFavItems", JSON.stringify(htmlStrings));
 
    location.reload();
 }
 
 // -------------------------------------------------------------------------------------------------------------
 
 
 function checkClickToRemove(){
 
    var infoDives = document.querySelectorAll('.infoDive');
    for(let i=0; i<infoDives.length; i++){
        infoDives[i].addEventListener('click', function(event){
        if(event.target.classList.contains('bookMark')){
           var id1 = infoDives[i].id; 
           var finalArray = [];
           for(let i=0;i<allFavDivArray.length; i++){
                var id = allFavDivArray[i].firstChild.id;
                if(id === id1){
                    alert('Favourite cart remove successfully');
                }else{
                    var tempDiv = allFavDivArray[i].querySelector('.infoDive');
                    finalArray.push(tempDiv);
                }
                
           }
           saveListItems(finalArray);    
        }
        
        })
    }
 
    // var bookMark = document.querySelector('.bookMark');
 
    // bookMark.addEventListener('click', function(event){
    //     event.target.cl
    //     console.log(event.target);
    // })
    
 }
 
 // -------------------------------------------------------------------------------------------------------------
 
 
 function loadFavItems() {
    storedItems = localStorage.getItem("myFavItems");
    if (storedItems) {
        // Parse the stored HTML strings back to an array
        htmlStrings = JSON.parse(storedItems);
        // Create a temporary div to hold the HTML strings
        
        // Append each HTML string to the temporary div
        htmlStrings.forEach(function(htmlString) {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlString;
            allFavDivArray.push(tempDiv);
            myFavElement.append(tempDiv);
        });
        // Append the child nodes of the temporary div to the desired location in the document
        // var myFavElement = document.getElementById('myFav');
        // while (tempDiv.firstChild) {
        //     myFavElement.appendChild(tempDiv.firstChild);
        // }
        checkClick();
        checkClickToRemove();
    }
    
 }
 
 // -------------------------------------------------------------------------------------------------------------
 
 
 
 
 function checkClick(){
    if(allFavDivArray.length > 0){
        var infoDives = document.querySelectorAll('.infoDive');
        for(let i=0; i<infoDives.length; i++){
            infoDives[i].addEventListener('click', function(event){
               if(!event.target.classList.contains('bookMark')){
                    var childDiv = event.target.closest('.infoDive');
                    if (childDiv) {
                        var childDivId = childDiv.id;
                        var dataToSend = {
                            key1: childDivId
                        }
                        var queryString = Object.keys(dataToSend).map(key => key + '=' + encodeURIComponent(dataToSend[key])).join('&');
                        window.location.href = 'info.html?' + queryString;
                }
 
               }
            });
        }
    }
 
 }
 
 // -------------------------------------------------------------------------------------------------------------
 // -------------------------------------------------------------------------------------------------------------
 // -------------------------------------------------------------------------------------------------------------
 // -------------------------------------------------------------------------------------------------------------
 // -------------------------------------------------------------------------------------------------------------
 
                                                // --- End --- \\
 
 