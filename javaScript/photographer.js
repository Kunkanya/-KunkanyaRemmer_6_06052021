//var url =  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json"
var dataRequest = new XMLHttpRequest();
const url = "./data.json";

const locationPhotographer = document.querySelector(".location");
const profileContainer = document.getElementById("profile_container");
const linkPage = document.getElementById("link_profile");
//Variable for tags
const portrait = document.getElementById("portrait");
const art = document.getElementById("art");
const fashion = document.getElementById("fashion");
const architecture = document.getElementById("architecture");
const travel = document.getElementById("travel");
const sport = document.getElementById("sport");
const animals = document.getElementById("animals");
const events = document.getElementById("events");
const index = document.getElementById("indexPage");
const photographerPage =document.getElementById("photographerPage");
var newObject = [];
//Request data from Json file
dataRequest.open("GET", url);
dataRequest.onload = function () {
  // set json data to object in javasrcipt
  var ourData = JSON.parse(dataRequest.responseText);
  newObject = ourData;
    //for searching for the ID of photographer"
    var link = document.location.search;
    /*seperate the result from locarion.search with '=' then we will have 2 array
    array[0]= "?id=", array[1]= ID of photographer*/
    const myArr = link.split("=");
    var  photoId = myArr[1];
    //convert string to integer for checking ID 
    var passedId = parseInt(photoId);
    
    for(i=0; i<newObject.photographers.length; i++){
      const checkId = newObject.photographers[i].id ;
      var name = "";
      if( passedId == checkId ){
        name= newObject.photographers[i].name;
        console.log (name);
        name = name.split(' ').slice(0,1);
        photographertTemplate(i);
        gallery(passedId, name);
        return i, name;
      }
    }
  return newObject;
//--------------------------------------------------------------------------
}
dataRequest.send();

//--------------------------------------------------------------------------
function tags(tags){
  /*Page 1: Crate HTML block for "tags" which is array in jsonData and object, so use method map()
  to get the new array for "tags" also use join() to loop for each tags
   */
  return `
  <span class="tag-name">
    ${tags.map(function(tags){
      return `  
          <a href="" class="tag_name"> 
          ${tags}
          </a>          
      `    
    }).join('')}
  </span>
  `
}
//--------------------------------------------------------------------------


function photographertTemplate(index){
    var eachTag = [];
    eachTag =  newObject.photographers[index].tags;
  
    photographerPage.innerHTML = ` 
        <header class= "id_header">
          <div class= "id_header-top">
              <h1 id="id_name">${newObject.photographers[index].name}</h1>
              <p class="id_location">${newObject.photographers[index].city} , ${newObject.photographers[index].country}</p>
              <p class="id_slogan">${newObject.photographers[index].tagline}</p>
              <div class="tag-name">
                  ${tags(eachTag)}
              </div>    
          </div>
          <div class="id_btn">
              <button class="btn btn-contact"type="submit">Contactez-moi</button>               
          </div>
          <figure class="id_avatar"> 
          <div class="avatar "><img src="./Sample Photos/Photographers ID Photos/${newObject.photographers[index].portrait}" 
          alt="Photo of ${newObject.photographers[index].name}">
          </div>
          </figure>
        </header>
      

      <label for="dropdown_menu">Trier par</label>
      <select class="btn dropdown" name="sort_menu" id="dropdown_menu">
          <option value="popular">Popularité</option>
          <option value="date">Date</option>
          <option value="title">Titre</option>
      </select>

      <div id="galleryContainer">

      </div>

        `   

      }
  
  function gallery(photographerId , photographerName){
    var listGallery = {};
    var listGalleryContainer =[];
    var imgPath ="";
    const galleryContainer =document.getElementById("galleryContainer");
    for (j=0; j < newObject.media.length; j++){
          isId= newObject.media[j].photographerId
          if( photographerId == isId){
              listGallery = newObject.media[j];
              listGalleryContainer.push(listGallery);
              if(listGallery.image != null){
              console.log(listGallery.title);
              console.log(listGalleryContainer);
              gallery(listGalleryContainer);
          }

        };  

    };
    function gallery(x){
      x.map(function(){
          console.log(x[0].title);
          galleryContainer.innerHTML =  `<div class="imgGallery"> 
          <img  
          src="${imgPath}" alt="test"> </div>
        `
              
        }).join( 'and');
  
    }
  
  };



  
