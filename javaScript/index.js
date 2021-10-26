//var url =  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json"
var dataRequest = new XMLHttpRequest()
const url = "./data.json"

const profileContainer = document.getElementById("profile_container");
var newObject = [];
const content = document.getElementById('nav_tag-main');

//Request data from Json file
dataRequest.open("GET", url);
dataRequest.onload = function () {
  //--Set json data to object in javasrcipt
  var ourData = JSON.parse(dataRequest.responseText);

  //--create new object for array of photographers 
  newObject = ourData.photographers

  newObject.map(function(photographer){
    const  photographers = new Photographer(
     photographer.name,
     photographer.id,
     photographer.city,
     photographer.country,
     photographer.tags,
     photographer.tagline,
     photographer.price,
     photographer.portrait,
      )
      photographers.createProfile()  
  }).join("")
}
dataRequest.send();

class Photographer {
  constructor(name, id, city, country, tags, tagline, price, portrait){
    this.name = name
    this.id = id
    this.city = city
    this.country = country
    this.tags = tags // array of tags
    this.tagline = tagline
    this.price = price
    this.portrait = `./Sample Photos/Photographers ID Photos/${portrait}` 
    }
  //METHOD(): CREATE HTML BLOCK TO CREATE PROFILE BLOCK
  createProfile(){
     let createProfileHTML = ` 
      <article class="photographer" >
        <span class="sr_only">${this.name}</span>
        <a href="./photographer.html?id=${this.id}" id="link_profile" aria-label="Portrait de ${this.name}">
            <figure>
              <div class="avatar"><img src="${this.portrait}"
                        alt="Portrait de  ${this.name}">
              </div>
              <figcaption id="name">${this.name}</figcaption>
            </figure>
          
          <div class="details">
            <h2 class="location" aria-label="Town">${this.city} , ${this.country}</h2>
            <small class="slogan">${this.tagline}</small>
            <p class="price">${this.price}€/jour</p>
          </div>
          ${this.createTags()}
          
          </a>
          </article>
      `;

    profileContainer.innerHTML += createProfileHTML
    }

// METHOD(): CREATE TAGS for "tags" which is array in THIS.TAGS, so use method map()
//      to get the new array for "tags" also use join() to loop for each tags
    createTags(){
      return `
          <ul class="tag_container">
            ${this.tags.map(function(tag){
                return `  
                        <li><a href="#" onclick="filterTag(this)" class="tag_name" aria-label="${tag}"> 
                        ${tag} </a>
                        <span class="sr_only">${tag}</span>
                        </li>                
                        `    
              }).join('')}
          </ul>
          `
    }
  }

  //-- Function for filter the tagsname 
function filterTag(ele){
  
  //-- ele.innerHTML = tagname to be searched : use trim()to have only string ready for search
  let searchText = ele.innerHTML.toLowerCase();
  searchText = searchText.trim();
    var newArray = newObject.filter(function(e){
      //return  newObject.photographers[e].tags.includes(searchText);
    return e.tags.includes(searchText);
        }  
    )
    //-- set profile container =  null add send newArray with Tagname to create
    profileContainer.innerHTML= "";
    newArray.map(function(photographer){
      const  photographers = new Photographer(
       photographer.name,
       photographer.id,
       photographer.city,
       photographer.country,    
       photographer.tags,
       photographer.tagline,
       photographer.price,
       photographer.portrait,
      )

      photographers.createProfile()  
    }).join("")   
}
//--------------------------------------------------------------------------
//--link to content will show when scrolldown the page 
//--window.scrollY > 0 add class "sticky" to DOM content
window.addEventListener("scroll", function(){
   content.classList.toggle("sticky", window.scrollY > 0);
  })