import Photographer from "./class/ClassePhotographers.js";
window.Photographer
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

  /*
//Version 11111111111111111111111
    console.log(hashTag)
    //   console.log(hashTag.innerHTML)
    var tag = hashTag.innerHTML
    hashTag.addEventListener('click', (e)=>{
    debugger
    console.log(tag)
    let searchText = tag.toLowerCase();
    searchText = searchText.trim();
     console.log(searchText)

      //return  newObject.photographers[e].tags.includes(searchText);
      var newArray = newObject.filter(function(e){
      return e.tags.includes(searchText);
      })

                  profileContainer.innerHTML=""
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

    })  */
    
    
}

dataRequest.send();
const hashTags = document.querySelectorAll(".tag_name")
console.log(hashTags)
hashTags.forEach(hashTag =>{
  test(hashTag)
})

function test(e){
  e.addEventListener('click' , ()=>{
    let searchText = e.dataset.tag
    console.log(searchText)
    debugger
    console.log(e)
  //  let searchText = tag.toLowerCase();
  //      searchText = searchText.trim();
  //   console.log(searchText)
  
      //return  newObject.photographers[e].tags.includes(searchText);
      var newArray = newObject.filter(function(e){
      return e.tags.includes(searchText);
      })

      console.log(newArray)

      newArray.forEach(arr =>{
        const lll = document.querySelector(`article.photographer[data-id='${arr.id}']`)//.querySelector(`.tag_name[data-tag='${searchText}']`)
        console.log(lll)
        lll.classList.add("hidden")
        lll.style.background ="red"
      
        //lll[0].style.background = "red"
//        const parent = document.querySelectorAll('article.photographer').querySelector(`.tag_name[data-tag = "${searchText}"]`)
  //      console.log(parent)
  
      
      })/*
                  profileContainer.innerHTML=""
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

                  */
    })
  }

//--DOM : ADD EVENTLISENER TO EACH HASHTAGS
/*
function _filterTag(tag){
//let tag= hashTag.innerHTML
 console.log(tag)
  let searchText = tag.toLowerCase();
  searchText = searchText.trim();
  console.log(searchText)
      var newArray = newObject.filter(function(e){
        //return  newObject.photographers[e].tags.includes(searchText);
      return e.tags.includes(searchText);
      })
      
  profileContainer.innerHTML=""
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

    }*/
  
//--------------------------------------------------------------------------
//--link to content will show when scrolldown the page 
//--window.scrollY > 0 add class "sticky" to DOM content
window.addEventListener("scroll", function(){
   content.classList.toggle("sticky", window.scrollY > 0);
  })
 
