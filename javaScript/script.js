//var url =  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json"
var dataRequest = new XMLHttpRequest();
const url = "./data.json";

const locationPhotographer = document.querySelector(".location");
const profileContainer = document.getElementById("profile_container");
const linkPage = document.getElementById("link_profile");
const photographerPage =document.getElementById("photographerPage");
var newObject = [];

//Request data from Json file
dataRequest.open("GET", url);
dataRequest.onload = function () {
  //--Set json data to object in javasrcipt
  var ourData = JSON.parse(dataRequest.responseText);
  //--Select photographer section
  newObject = ourData.photographers;

  // run function createProfile dynamically 
  createProfile(newObject);  
  return newObject;
  //index.html : run function createProfile once body in index.html on load
};
//--------------------------------------------------------------------------
dataRequest.send();

//--------------------------------------------------------------------------
  function createProfile(id) {
/*Page 1: Create each photographer profile with the method map() to get the new array of each photographer, 
plus use join() function to loop for each photographer. and return the block of HTML with 
the expression when needed for dynamic data.*/
      profileContainer.innerHTML = `
        ${id.map(function (profileData) {
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
//--Function to create HTML blovk for tags in each Photographer profile 
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
//-- Function for filter the tagsname 
function filterTag(ele){
  //-- ele.innerHTML = tagname to be searched : use trim()to have only string ready for search
  let searchText = ele.innerHTML.toLowerCase();
      searchText = searchText.trim();
      console.log(searchText);
      console.log(newObject)
    var newArray = newObject.filter(function(e){
        console.log(e.tags +"----is in-----" + e.tags.includes(searchText));
      //return  newObject.photographers[e].tags.includes(searchText);
    return e.tags.includes(searchText);
        }  
    );
    console.log(newArray);
    //-- set profile container =  null add send newArray with Tagname to create
    profileContainer.innerHTML= "";
    createProfile(newArray);    
}
//--------------------------------------------------------------------------
