//-------------------Page Photograger----------------------------//
//--GLOBAL VARIABLES
var dataRequest = new XMLHttpRequest();
const url = "./data.json";
//--GLOBAL DOM VAR
const body = document.getElementById("body");
const locationPhotographer = document.querySelector(".location");
const profileContainer = document.getElementById("profile_container");
const linkPage = document.getElementById("link_profile");
//const photographerPage = document.getElementById("photographerPage")

//--MODAL

var listGallery = new Object();
var newObject = [];
var arrListGallery = [];
var arrLightbox =[];
var countLike = 0;
var passedName = ""
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

  for (i = 0; i < newObject.photographers.length; i++) {
    const checkId = newObject.photographers[i].id;
    var name = "";
    if (passedId == checkId) {
      //--to get only firstname using for the variable for Photos Path
      name = newObject.photographers[i].name;
      name = name.split(' ').slice(0, 1);
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


function photographertTemplate(index) {
  var eachTag = [];
  eachTag = newObject.photographers[index].tags;

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

      <div id="myModal" class="modal" role="dialog" aria-label="image closeup view">
      <span id="close-btn" class="close curser" role="button" onclick="closeModal()" 
      aria-label="button for close lightbox modal">x</span>
      <div class="previous" onclick="previousSlide()" ><</div>
      <div class="next">>next</div>
         

    
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
function tags(tags) {
  /*--Page 1: Crate HTML block for "tags" which is array in jsonData and object, so use method map()
  to get the new array for "tags" also use join() to loop for each tags
   --*/
  return `
    ${tags.map(function (tags) {
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
function gallery(photographerId, photographerName) {
  var imgPath = "";
  const galleryContainer = document.getElementById("galleryContainer");
  const myModal = document.getElementById("myModal");

  for (j = 0; j < newObject.media.length; j++) {
    isId = newObject.media[j].photographerId
    if (photographerId == isId) {
      listGallery = Object.assign(newObject.media[j]);
      arrListGallery.push(listGallery);
    };
  };
  createGallery(arrListGallery, photographerName);
}
//--------------------------------------------------------------------------
function createGallery(arrGallery, isName) {

  let path = "";
  let source = "";
  let testId= "";
  //--add newarray for create lightbox to arrTest
  arrLightbox = arrGallery;
  for (i = 0; i < arrGallery.length; i++) {
    let likes = arrGallery[i].likes;
    let id = arrGallery[i].id;
//    <a class="media curser" onclick="test(${arrGallery[i].id})">

    var gallery = `
    <figure class="media curser"><a href="#" onclick="launchModal(${id})" >${sourcePath(arrGallery, i)}</a>  
      <figcaption class="figcaption_media">${arrGallery[i].title}     
         <div class"show">${likes}</div>       
         <div data-like="${likes}" class="like" role="button"><i class="fas fa-heart"></i></div>
      </figcaption>
      <p>${arrGallery[i].date}</p>
      <figure>
     `
    //--add number of like from each photo to total-like
    countLike += likes;

    // add html block to the page

    galleryContainer.innerHTML += gallery;
    //Function to check whether media is image or video
      function sourcePath(arrGallery) {
      
        if (arrGallery[i].image == null) {
          path = `"./Sample Photos/${isName}/${arrGallery[i].video}"`
          source = `<video  src=${path} type="video/mp4"> </video>`
          return source;
        } else if (arrGallery[i].video == null) {
          testId = (arrGallery[i].id);
          console.log(testId);
          path = `"./Sample Photos/${isName}/${arrGallery[i].image}"`
          source = `<img  src=${path} alt="Photo of ${arrGallery[i].title}">`
          return source;
        }
    }
  }
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
//--Function for filter the tagsname 
function filterTag(ele) {
  //--set countLike to 0 for not accumulate the like on change event
  countLike = 0;
  //ele.innerHTML = tagname to be searched : use trim()to have only string ready for search
  let searchText = ele.innerHTML;
  console.log(searchText.trim());
  searchText = searchText.trim();
  var newArray = arrListGallery.filter(function (e) {
    //change e.tags which is object to string 
    var x = e.tags.toString();
    console.log("x is= " + x)
    return x == searchText;
  });
  console.log(newArray);
  galleryContainer.innerHTML = "";
  createGallery(newArray, passedName);
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//--FUNCTION FOR MODAL
function launchModal(id) {
  //--check Id which passed from event onlclick to check which array is currentphoto
  var currentPhoto ;
  let indexCurrentSlide = arrLightbox.findIndex(a =>{
    if(a.id === id){
      // currentPhoto is now array with the passed id
      return a.id == id, currentPhoto = a; 
    } 
  })
  console.log(indexCurrentSlide)
  console.log(arrLightbox);
  console.log(currentPhoto);
  myModal.style.display = "block";
  myModal.setAttribute("aria-hidden", "false");

  //--create new object by using Factory method to load lightbox currentphoto.
  const lightboxCurrentPhoto = loadFactoryPhoto(currentPhoto, indexCurrentSlide);
  //--now lightboxCurrentPhoto is ein object with property load() from Factory function "loadFactoryPhoto"
  lightboxCurrentPhoto.load();

  //--AddEventListener to Prev and next button
  const next = document.querySelector(".next");
  const prev = document.querySelector(".previous");
  next.addEventListener('click',nextPhoto);
/**
 * ADD KEYBOARD EVENT ON MODAL
 */
 window.addEventListener("keydown", e => {
  const keyCode = e.keyCode ? e.keyCode : e.which
  console.log(keyCode);
  if (keyCode == 27 && myModal.getAttribute("aria-hidden", "false")) {//27 = escape button
    console.log(keyCode, myModal);
    closeModal();
  } else if (keyCode == 39 && myModal.getAttribute("aria-hidden", "false")) {//39 = arrowright button
    console.log("next", keyCode, myModal);
    nextPhoto();    
  } else if (keyCode == 37 && myModal.getAttribute("aria-hidden", "false")) {//37 = arrowleft button
    console.log("previous", keyCode, myModal);
  }
})
  function nextPhoto() {
    var nextIndex   = parseInt(indexCurrentSlide)
    indexCurrentSlide = nextIndex + 1 ;

    console.log("currentphoto array is"+ arrLightbox.length) 
    console.log(nextIndex)
    if (indexCurrentSlide === arrLightbox.length){
        next.style.display = 'none'
        next.disabled = true
        return;
    }else  { 
        const lightboxCurrentPhotoNext = loadFactoryPhoto(arrLightbox[indexCurrentSlide], indexCurrentSlide);
        lightboxCurrentPhotoNext.load();
        console.log(indexCurrentSlide)
        console.log(arrLightbox[indexCurrentSlide])
      }
    };  
 
 
}
          //prev.addEventListener('click', prevPhoto)   
    //-------------------------------------------------------------------------

  
//-------------------------------------------------------------------------
//--Factory function to return the function load() once the lightbox is open.
function loadFactoryPhoto(arr, index){
  return {  
    load(){
    console.log("lightbox array" + arr.title)
    console.log(index);
  
    var modelHTMLImg = `  
    <div id="modal_content">
      <figure class="lightbox">          
      <img src="./Sample Photos/${passedName}/${arr.image}" alt="">
      <figcaption>${arr.title}</figcaption>
      </figure>
    </div>`
    var modelHTMLVideo = `  
    <div id="modal_content">
      <figure class="lightbox">          
      <video src="./Sample Photos/${passedName}/${arr.video}" type="video/mp4" controls> </video>
      <figcaption>${arr.title + ":Video"}</figcaption>
      </figure>
    </div>  
    `
    //checked if media is video or image
    const modalContent = document.getElementById("modal_content")
    if( modalContent != null){
      modalContent.remove();
    }
    if(arr.image != null){
      myModal.insertAdjacentHTML("beforeend", modelHTMLImg );
        console.log( "img")
      }else if (arr.video != null){
        myModal.insertAdjacentHTML("beforeend", modelHTMLVideo );
        console.log(modelHTMLVideo);
        console.log("Video")
      }
    const closeBtn = document.getElementById("close-btn");
    //--set background modal to aria-hidden = true
    photographerPage.setAttribute("aria-hidden", "true");
    //--add class to hide scrollbar on body and focus at close button 
    closeBtn.focus();
    body.classList.add("no-scroll");
      }
    }
}
//-------------------------------------------------------------------------
//--Function close lightbox modal
function closeModal() {
  myModal.style.display = "none";
  myModal.setAttribute("aria-hidden", "true");
  photographerPage.setAttribute("aria-hidden", "false");
  //--remove class to hide scrollbar on body 
  body.classList.remove("no-scroll");
  //--clear modalContent.innerHTML = null 
  const modalContent = document.getElementById("modal_content");
  if (modalContent != null) {
    modalContent.remove();
  }
}
//------------------------------------------------------------------------