//var url =  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json"
var dataRequest = new XMLHttpRequest();
const url = "./data.json";
const locationPhotographer = document.querySelector(".location");
const profileContainer = document.getElementById("profile_container");
//Variable for tags
const portrait = document.getElementById("portrait");
const art = document.getElementById("art");
const fashion = document.getElementById("fashion");
const architecture = document.getElementById("architecture");
const travel = document.getElementById("travel");
const sport = document.getElementById("sport");
const animals = document.getElementById("animals");
const events = document.getElementById("events");

dataRequest.open("GET", url);
dataRequest.onload = function () {
  // set json data to objext in javasrcipt
  var ourData = JSON.parse(dataRequest.responseText);
  //console.log(ourData.photographer.name[0]);

  createProfile(ourData);

  //  return ourData;
};
//--------------------------------------------------------------------------
dataRequest.send();

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
  function createProfile(id) {
/*Page 1: Create each photographer profile with the method map() to get the new array of each photographer, 
plus use join() function to loop for each photographer. and return the block of HTML with 
the expression when needed for dynamic data.
 */
profileContainer.innerHTML = `
  ${id.photographers
    .map(function (profileData) {
    return ` 
    <article class="photographer" >
        <a href="" >
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
    .join(" ")}
  `;
}
//--------------------------------------------------------------------------
