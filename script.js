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
  //check if the page is index.html or photographer.html
  if(document.URL.includes("index.html")){
    alert("index.html");
    console.log(newObject);
    createProfile(newObject);
  }else if(document.URL.includes("photographer.html")){
    //crateIdProfile();
    //for searching for the ID of photographer"
    var link = document.location.search;
    /*seperate the result from locarion.search with '=' then we will have 2 array
    array[0]= "?id=", array[1]= ID of photofrapher*/
    const myArr = link.split("=");
    var  photoId = myArr[1];
    //convert string to integer for checking ID 
    var passedId = parseInt(photoId);
    
    for(i=0; i<newObject.photographers.length; i++){
      const checkId = newObject.photographers[i].id ;
      if( passedId == checkId ){
        photographertTemplate(i);
        return i;
      }
    }
    
  }
  return newObject;
  //index.html : run function createProfile once body in index.html on load
};
//--------------------------------------------------------------------------
dataRequest.send();

//--------------------------------------------------------------------------
  function createProfile(id) {
/*Page 1: Create each photographer profile with the method map() to get the new array of each photographer, 
plus use join() function to loop for each photographer. and return the block of HTML with 
the expression when needed for dynamic data.
 */
profileContainer.innerHTML = `
  ${id.photographers.map(function (profileData) {
    return ` 
    <article class="photographer" >
      <a href="./photographer.html?id=${profileData.id}" id="link_profile">
          <figure>
            <div class="avatar"><img src="./Sample Photos/Photographers ID Photos/${profileData.portrait}"
                       alt="Photo of${profileData.portrait}">
            </div>
            <figcaption id="name">${profileData.name}</figcaption>
          </figure>
        </a>
        <div class="details">
          <p class="location">${profileData.city} , ${profileData.country}</P>
          <small class="slogan">${profileData.tagline}</small>
          <p class="price">${profileData.price}€/jour</p>
        </div>
        ${tags(profileData.tags)}
        </article>
    `;
    })
    .join("")}
  `;
  return;
}


//--------------------------------------------------------------------------
function tags(tags){
  /*Page 1: Crate HTML block for "tags" which is array in and object, so use method map()
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


function loadProfile(y){
  alert(y);
  photographerPage.innerHTML = y;
  console.log(newObject);
  return;
}
//-------------------------------------------------------------------
function photographertTemplate(index){
  var eachTag = [];
  eachTag =  newObject.photographers[index].tags.join("");

  photographerPage.innerHTML = ` 
      <header class= "id_header">
        <div class= "id_header-top">
            <h1 id="id_name">${newObject.photographers[index].name}</h1>
            <p class="id_location">${newObject.photographers[index].city} , ${newObject.photographers[index].country}</p>
            <p class="id_slogan">${newObject.photographers[index].tagline}</p>
            <div class="tag-name">
                ${eachTag}
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
`   
}
