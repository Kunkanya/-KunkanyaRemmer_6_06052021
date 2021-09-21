//-------------------Page Photograger----------------------------//

//--Variables Global
var dataRequest = new XMLHttpRequest();
const url = "./data.json";

const locationPhotographer = document.querySelector(".location");
const profileContainer = document.getElementById("profile_container");
const linkPage = document.getElementById("link_profile");
//let heart = document.querySelectorAll(".like");

var listGallery = new Object ();
var newObject = [];
var arrListGallery = [];
var countLike = 0;
var passedName =""
//--Request data from Json file
dataRequest.open("GET", url);
dataRequest.onload = function () {
  //--set json data to object in javasrcipt
  var ourData = JSON.parse(dataRequest.responseText);
  newObject = ourData;
    //--for searching for the ID of photographer"
    var link = document.location.search;
    /*--seperate the result from locarion.search with '=' then we will have 2 array
    array[0]= "?id=", array[1]= ID of photographer--*/
    const myArr = link.split("=");
    var  photoId = myArr[1];
    //--convert string to integer for checking ID 
    var passedId = parseInt(photoId);
    
    for(i=0; i<newObject.photographers.length; i++){
      const checkId = newObject.photographers[i].id ;
      var name = "";
      if( passedId == checkId ){
        //--to get only firstname using for the variable for Photos Path
        name= newObject.photographers[i].name;
        name = name.split(' ').slice(0,1);
        passedName = name;
        photographertTemplate(i);
        gallery(passedId, name);
        return i, name;
      }
    }
  return newObject;
//--------------------------------------------------------------------------
}
dataRequest.send();


function photographertTemplate(index){
    var eachTag = [];
    eachTag =  newObject.photographers[index].tags;
  
    photographerPage.innerHTML = ` 
        <header class= "id_header">
          <nav class= "id_header-top">
              <h1 id="id_name">${newObject.photographers[index].name}</h1>
              <h2 class="id_location">${newObject.photographers[index].city} , 
              ${newObject.photographers[index].country}</h2>
              <p class="id_slogan">${newObject.photographers[index].tagline}</p>
              <div class="tag-name">
                  ${tags(eachTag)}
              </div>    
          </nav>
          <div class="id_btn">
              <button class="btn btn-contact"type="submit">Contactez-moi</button>               
          </div>
          <figure class="id_avatar"> 
            <div class="avatar">
              <img src="./Sample Photos/Photographers ID Photos/${newObject.photographers[index].portrait}" 
                alt="Photo of ${newObject.photographers[index].name}">
            </div>
          </figure>
        </header>
      
      <label for="dropdown_menu">Trier par</label>
      <select onchange="loadBySort(this.value)" role="" class="btn dropdown" name="sort_menu" id="sort_menu">
          <option value="popular">Popularité</option>
          <option value="date">Date</option>
          <option value="title">Titre</option>
      </select>

      <div class = "media_container" id="galleryContainer"></div>
      <div class="like_total">
          <div class = "like_box_bottom">
            <p id="total_like"></p>  
            <i class="fas fa-heart"></i>
          </div>
          <span>300euro/jour</span>
      </div>
        `   
}
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
function tags(tags){
  /*--Page 1: Crate HTML block for "tags" which is array in jsonData and object, so use method map()
  to get the new array for "tags" also use join() to loop for each tags
   --*/
  return `
    ${tags.map(function(tags){
      return `  
          <a onclick="filterTag(this)" class="tag_name test"> 
          ${tags}
          </a>          
      `    
    }).join('')}
  `
}
//--------------------------------------------------------------------------


//Function create gallery for each photographer by passing parameter of 
//array of each photographer and the name
  function gallery(photographerId , photographerName){
    var imgPath ="";
    const galleryContainer =document.getElementById("galleryContainer");
    for (j=0; j < newObject.media.length; j++){
          isId = newObject.media[j].photographerId
          if( photographerId == isId){
              listGallery= Object.assign(newObject.media[j]);
              arrListGallery.push(listGallery);
            };  
    };
    createGallery(arrListGallery, photographerName);
  }
//--------------------------------------------------------------------------
function createGallery(arrGallery,isName) {

  let path = ""
  let source = ""
  for(i=0; i< arrGallery.length; i++){
    let  likes = arrGallery[i].likes;
    var gallery = `
    <figure class="media">${sourcePath(arrGallery, i)}  
      <figcaption class="figcaption_media">${arrGallery[i].title}     
         <div class"show">${likes}</div>       
         <div data-like="${likes}" class="like" role="button"><i class="fas fa-heart"></i></div>
      </figcaption>
      <p>${arrListGallery[i].date}</p>
    <figure>
     `
countLike += likes;
// add html block to the page
galleryContainer.innerHTML  += gallery;
              //Function to check whether media is image or video
            function sourcePath(arrGallery){
                if( arrGallery[i].image == null){
                  path = `"./Sample Photos/${isName}/${arrGallery[i].video}"`
                  source = `<video src=${path} type="video/mp4"> </video>`
                  return source
                } else if(arrGallery[i].video == null) {
                  path = `"./Sample Photos/${isName}/${arrGallery[i].image}"`
                  source = `<img src=${path} alt="Photo of ${arrGallery[i].title}">`
                  return source
                }    
            }
  }

  //--add the total likes for each photographer  
  const total_like = document.querySelector("#total_like");
  total_like.innerText = countLike;

  //-- increment like when click
  const heart = document.querySelectorAll(".like");
  for (let i=0; i < heart.length ; i++ ){
    //-- access dataset from class likeand pass it to integer
    let x = parseInt(heart[i].dataset.like);
    //--addEventlistener to each heart
    heart[i].addEventListener("click", () => {
      x++;
      //-- add each like-click to total like
      countLike ++;
      //--select previousElementSibling from heart[i]to change the value to (X)
      const show  = heart[i].previousElementSibling;
      show.innerText = x;
      total_like.innerText = countLike;
    },false);
  }
  return; 
}

//--------------------------------------------------------------------------

// Function for sort when choose the option in dropdown list.
function loadBySort(option){
  //--set countLike to 0 eachtime onchange for not accumulate the likes
  countLike = 0;
  if(option == "popular"){
      const sortByLike = arrListGallery.sort(function(a,b){
      return a.likes-b.likes;
    });   
    console.log(sortByLike);
    // set container for gallery = "" and call the function to create a new gallery sorted by likes
    galleryContainer.innerHTML="";
    createGallery(sortByLike,passedName);
    return;
  } else if(option == "date"){
      const sortByDate = arrListGallery.sort(function(a,b){
      return new Date(a.date).valueOf() - new Date(b.date).valueOf() ; //timestamps      
    });
    galleryContainer.innerHTML="";
    createGallery(sortByDate,passedName);
    return;
  } else if(option == "title"){
      const sortByName = arrListGallery.sort(function(a,b){
      if(a.title.toLowerCase() < b.title.toLowerCase()) return -1; // a comes first
      if(a.title.toLowerCase() > b.title.toLowerCase()) return 1; // b comes first
      if(a.title.toLowerCase() = b.title.toLowerCase()) return 0; // nothing change
    });
    galleryContainer.innerHTML="";
    createGallery(sortByName,passedName);
    return;
  }
}
//--------------------------------------------------------------------------
// Function for filter the tagsname 
function filterTag(ele){
  //--set countLike to 0 for not accumulate the like on change event
  countLike=0;
  //ele.innerHTML = tagname to be searched : use trim()to have only string ready for search
  let searchText = ele.innerHTML;
    console.log(searchText.trim());
    searchText = searchText.trim();
    var newArray = arrListGallery.filter(function(e){
      //change e.tags which is object to string 
      var x = e.tags.toString();
      console.log("x is= " + x )
            return x == searchText;
    });
console.log(newArray) ;
galleryContainer.innerHTML="";
createGallery(newArray,passedName);
}
//-------------------------------------------------------------------------