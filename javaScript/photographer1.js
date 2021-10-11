import Photographer from '../javaScript/class/ClassePhotographers.js'
import Gallery from './class/Gallery.js';
//-------------------Page Photograger----------------------------//
//--GLOBAL VARIABLES
var dataRequest = new XMLHttpRequest();
const url = "./data.json";
//--GLOBAL DOM VAR
const body = document.getElementById("body");
const locationPhotographer = document.querySelector(".location");
const profileContainer = document.getElementById("profile_container");
const linkPage = document.getElementById("link_profile");
//const btnContact = document.querySelector(".btn-contact");
const btnContact = document.getElementById("contact");
const logo= document.getElementById("back_index");

//const photographerPage = document.getElementById("photographerPage")

//--MODAL

var listGallery = new Object();
var newObject = [];
var arrListGallery = [];
var arrLightbox =[];
var countLike = 0;
var passedName = "";
var passedFullName ="";
var currentSlideIndex = 0;
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
  var photoId = myArr[1];
  //--convert string to integer for checking ID 
  var passedId = parseInt(photoId);

  for (let i = 0; i < newObject.photographers.length; i++) {
    const checkId = newObject.photographers[i].id;
    if (passedId == checkId) {
      var name = "";
        //--convert string to integer for checking ID 
      var passedId = parseInt(photoId);
      var photographerBanner = [];
      //--to get only firstname using for the variable for Photos Path
      name = newObject.photographers[i].name;
      passedFullName = name;
      name = name.split(' ').slice(0, 1);
      passedName = name; 
      photographerBanner = newObject.photographers[i]
      console.log (photographerBanner)
      
      //--DEFINE CLASS FOR CREATE BANNER OF PHOTOGRAPHER
      const photoBanner = new Photographer(
        photographerBanner.name,
        photographerBanner.id,
        photographerBanner.city,
        photographerBanner.country,
        photographerBanner.tags,
        photographerBanner.tagline,
        photographerBanner.price,
        photographerBanner.portrait,
      )

      photoBanner.createBanner()
      gallery(passedId, passedName);


      //--CREATE GALLERY OF THE PHOTOGRAPHER
      }
    }      
  return newObject;
  //--------------------------------------------------------------------------
}
dataRequest.send();

function gallery(photographerId, photographerName) {

  var imgPath = "";
  const galleryContainer = document.getElementById("galleryContainer");
  const myModal = document.getElementById("myModal");

  //--Select the media of th photographer and add to arrListGallery
  for (let j = 0; j < newObject.media.length; j++) {
    let isId = newObject.media[j].photographerId
    if (photographerId == isId) {
      listGallery = Object.assign(newObject.media[j]);
      arrListGallery.push(listGallery);
    };
  };
  createGallery(arrListGallery, photographerName)
  
  return arrListGallery;
}

//--------------------------------------------------------------------------
//--Function create gallery ba passing param an array of gallery and photographer's name
function createGallery(arrListGallery,photographerName){
  arrListGallery.map(function(arr){  
    const photographerGallery = new Gallery(
      photographerName,
      arr.id,
      arr.photographerId,
      arr.title,
      sourcePath(),
      arr.tag,
      arr.likes,
      arr.date,
      arr.price
    )
    photographerGallery.createGallery();
      //--add number of like from each photo to total-like
      countLike += arr.likes;

    //--Funciton to check Video and image then return the path of media
    function sourcePath() {
      var path = "";
      var source = "";
      var countLike = 0;
      if (arr.video != null) {
        debugger
        path = `"./Sample Photos/${photographerName}/${arr.video}"`
        source = `<video  src=${path} type="video/mp4"> </video>`
        return source;
      } else if (arr.image != null) {
        path = `"./Sample Photos/${photographerName}/${arr.image}"`
        source = `<img  src=${path} alt="Photo of ${arr.title}">`
        return source;
      }    
    }

  }).join('');

  //--add the total likes for each photographer  
  const total_like = document.querySelector("#total_like");
  total_like.innerText = countLike;

  //-- increment like when click
  const heart = document.querySelectorAll(".like");
  for (let i = 0; i < heart.length; i++) {
    //-- access dataset from class likeand pass it to integer
    let x = parseInt(heart[i].dataset.like);
    //--addEventlistener to each heart
    heart[i].addEventListener("click", () => {
      x++;
      //-- add each like-click to total like
      countLike++;
      //--select previousElementSibling from heart[i]to change the value to (X)
      const show = heart[i].previousElementSibling;
      show.innerText = x;
      total_like.innerText = countLike;
    }, false);
  } 
 return;
}
//--------------------------------------------------------------------------

const dropdown = document.getElementById("sort_menu")
console.log(dropdown)
const sss = document.getElementById("sort_menu")
sss.addEventListener('change', alert('1'))
dropdown.addEventListener('change', (e)=>{
  const value = e.target.value
  console.log(value)
  loadBySort(value)
})
//--Function for sort when choose the option in dropdown list.
function loadBySort(option) {
  //--set countLike to 0 eachtime onchange for not accumulate the likes
  countLike = 0;
  if (option == "popular") {
    const sortByLike = arrListGallery.sort(function (a, b) {
      return a.likes - b.likes;
    });
    console.log(sortByLike);
    // set container for gallery = "" and call the function to create a new gallery sorted by likes
    galleryContainer.innerHTML = "";
    createGallery(sortByLike, passedName);
    return;
  } else if (option == "date") {
    const sortByDate = arrListGallery.sort(function (a, b) {
      return new Date(a.date).valueOf() - new Date(b.date).valueOf(); //timestamps      
    });
    galleryContainer.innerHTML = "";
    createGallery(sortByDate, passedName);
    return;
  } else if (option == "title") {
    const sortByName = arrListGallery.sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1; // a comes first
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1; // b comes first
      if (a.title.toLowerCase() = b.title.toLowerCase()) return 0; // nothing change
    });
    galleryContainer.innerHTML = "";
    createGallery(sortByName, passedName);
    return;
  }
}
//--------------------------------------------------------------------------
