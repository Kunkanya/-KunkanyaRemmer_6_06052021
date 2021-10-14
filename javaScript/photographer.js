import Photographer from './class/ClassePhotographers.js'
import Gallery from './class/Gallery.js';
import ModalContactForm from './class/ContactModal.js';
import validation from './class/validation.js'


//import {loadFactoryPhoto} from '../javaScript/class/FactoryMedia.js'
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
      //--CREATE GALLERY OF THE PHOTOGRAPHER
      gallery(passedId, passedName);  
      //--first sort by popularity 
      loadBySort("popular")   
      }
    }      
     //--DOM EVENT --dropdown menu
     const dropdown = document.getElementById("sort_menu")
     console.log(dropdown)
     dropdown.addEventListener('change', (e)=>{
       e.preventDefault()
       const value = e.target.value
       loadBySort(value)
     })
            
    //--DOM EVENT --click hashtags
    const myTags = document.querySelectorAll(".tag_name")
    console.log(myTags)
     myTags.forEach(myTag => 
        myTag.addEventListener('click', (el)=>{
          el.preventDefault()
          //--get value attribute from data-tag when clicked
          const tag = el.target.getAttribute("data-tag")
          //--call function filterTag with parameter (tag)
          filterTag(tag)
        })
        )


      //--DOM EVENT -- open modal_contact
      var myContact = document.querySelector("#contact")
      myContact.addEventListener('click', (e)=>{
        e.preventDefault()
        launchContactModal()
      })

    return newObject;
  //--------------------------------------------------------------------------
}

dataRequest.send();

function launchContactModal(){
  var myContact = document.querySelector("#contact")
  myContact.setAttribute("aria-hidden", "false")
  photographerPage.setAttribute("aria-hidden", "true")
  photographerPage.style.disabled = "true"
  body.classList.add("no-scroll");
  myContact = new ModalContactForm(passedFullName)
  myContact.createModalContact()


  const formContainer = document.getElementById("form_container")
  formContainer.style.border = "white 5px solid"
  formContainer.addEventListener('keyup', keyboardContactForm )

  const closeContactBtn = document.getElementById("closeModalForm")
  closeContactBtn.focus()
  console.log(window)

  //--DOM EVENT --close contact button
  closeContactBtn.addEventListener('click', (e)=>{
  closeModalForm()
  
  })

  function closeModalForm(){
    var myContact = document.querySelector("#contact")
    const contactModal = document.getElementById("form_modal")
    contactModal.style.display ="none"
    myContact.setAttribute("aria-hidden", "true")
    photographerPage.setAttribute("aria-hidden", "false")
    body.classList.remove ("no-scroll");
    formContainer.removeEventListener("keyup", keyboardContactForm);
    location.reload()
  }
  
 // window.addEventListener('keydown',keyboardContactForm)
    function keyboardContactForm(e){  
      const keyCode = e.keyCode ? e.keyCode : e.which
      e.preventDefault();
    console.log(keyCode);
    if (keyCode == 27) {//27 = escape button
      console.log(keyCode);
      closeModalForm();
    }
  }  
} 
//--Function for filter the tagsname 
function filterTag(tag) {
  //--set countLike to 0 for not accumulate the like on change event
  countLike = 0;
  console.log(tag)
  var searchText = tag
  var newArray = arrListGallery.filter(function (e) {
    //change e.tags which is object to string 
    var x = e.tags.toString();
    return x === searchText;
  });
  console.log(newArray);
  galleryContainer.innerHTML = "";
  createGallery(newArray, passedName);

}

//-------------------------------------------------------------------------

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
  arrLightbox = arrListGallery
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
        path = `"./Sample Photos/${photographerName}/${arr.video}"`
        source = `<video  src=${path} type="video/mp4" 
                  class="modal_lightbox" data-id="${arr.id}"> </video>`
        return source;
      } else if (arr.image != null) {
        path = `"./Sample Photos/${photographerName}/${arr.image}"`
        source = `<img  src=${path} alt="Photo of ${arr.title}"
        class="modal_lightbox" data-id="${arr.id}">`
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

  //--DOM EVENT -- open LIGHTBOX
  const myLightbox = document.querySelectorAll(".modal_lightbox")
  console.log(myLightbox)
  myLightbox.forEach(lightbox =>
    lightbox.addEventListener('click', (el)=>{
      el.preventDefault()
      //--get arrtibute "data-id" to obtain the id of the photo
      const currentIdMedia = el.target.getAttribute("data-id")
      //--call function launchModal()
      launchModal(currentIdMedia)
      })
  )
  
  //--DOM KEYBOARD EVENT --keyboard keyup once enter image to open lightbox
  const medias = document.querySelectorAll(".media")
  medias.forEach(media =>{
    media.addEventListener('keyup', (e)=>{
      const keyCode = e.keyCode ? e.keyCode : e.which
      e.preventDefault();
    console.log(keyCode);
    if (keyCode == 13) {//27 = escape button
      console.log(e.target);
      //--get arrtibute "data-id" to obtain the id of the photo
      const currentIdMedia = e.target.getAttribute("data-id")
      //--call function launchModal()
      launchModal(currentIdMedia)
        }  
      })
    })
  return;
}
//--------------------------------------------------------------------------
//--Function for sort when choose the option in dropdown list.
function loadBySort(option) {
  //--set countLike to 0 eachtime onchange for not accumulate the likes
  countLike = 0;
  if (option == "popular") {
    const sortByLike = arrListGallery.sort(function (a, b) {
      return  b.likes -a.likes ;
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
//-------------------------------------------------------------------------
//--FUNCTION LIGHTBOX
function launchModal(id) {
  const next = document.querySelector(".next");
  const prev = document.querySelector(".previous");
  const close = document.querySelector(".close")
  //--check Id which passed from event onlclick to check which array is currentphoto
  var currentPhoto = [];
  let idTarget = parseInt(id)    
  //--find the ID of currentphoto once click by passing "id"
  let indexCurrentSlide = arrLightbox.findIndex(a =>{
    if(a.id === idTarget){
      // currentPhoto is now array with the passed id
      return a.id === id, currentPhoto = a; 
    } 
  }); 
      indexCurrentSlide = parseInt(indexCurrentSlide);
      myModal.style.display = "block";
      myModal.setAttribute("aria-hidden", "false");

      //--if the first or the last photo of array are clicked the previos or next button will be disabled accordingly.
      if(indexCurrentSlide === 0){
        prev.style.display = 'none';
        prev.disabled = true;
        next.style.display = 'block';
        next.disabled = false;
      }else if(indexCurrentSlide  === arrLightbox.length - 1){
        next.style.display = 'none';
        next.disabled = true;
        prev.style.display = 'block';
        prev.disabled = false;
      }
      //--create new object by using Factory method to load lightbox currentphoto.
      const lightboxCurrentPhoto = loadFactoryPhoto(currentPhoto, indexCurrentSlide);
      console.log(currentPhoto)
      console.log(indexCurrentSlide)
      //--now lightboxCurrentPhoto is ein object with property load() from Factory function "loadFactoryPhoto"
      lightboxCurrentPhoto.load();

      //--AddEventListener to Prev , next and close button
      next.addEventListener('click',nextPhoto);
      prev.addEventListener('click',prevPhoto);
      close.addEventListener('click', closeModal)
/**
 * ADD KEYBOARD EVENT ON MODAL
 */
      window.addEventListener("keydown", keyboardLightbox);

      function keyboardLightbox(e){
        const keyCode = e.keyCode ? e.keyCode : e.which
          e.preventDefault();
        console.log(keyCode);
        if (keyCode == 27 && myModal.getAttribute("aria-hidden", "false")) {//27 = escape button
          console.log(keyCode, myModal);
          closeModal();
        } else if (keyCode == 39 && myModal.getAttribute("aria-hidden", "false")) {//39 = arrowright button
          console.log("next", keyCode, myModal);
          next.focus()
          nextPhoto();    
        } else if (keyCode == 37 && myModal.getAttribute("aria-hidden", "false")) {//37 = arrowleft button
          console.log("previous", keyCode, myModal);
          prev.focus();
          prevPhoto();
        } else if (keyCode == 40 && myModal.getAttribute("aria-hidden", "false")) {//40 = arrowdown button
          next.focus();
        }else if (keyCode == 27) {//40 = arrowdown button
          const logo = document.querySelector(".logo")
          alert(e.focus)
          logo.focus();
        }
      }
    //-------------------------------------------------------------------------
    //-- Function to call next photo
    function nextPhoto() {
        var nextIndex = indexCurrentSlide + 1
        console.log("currentphoto array is"+ arrLightbox.length) 
        console.log(nextIndex)
        //disable next button when the last photo of array 
        if (nextIndex === arrLightbox.length-1 || nextIndex >= arrLightbox.length){
          const lightboxCurrentPhotoPrev = loadFactoryPhoto(arrLightbox[arrLightbox.length -1], arrLightbox.length-1);
          lightboxCurrentPhotoPrev.load();
          next.style.display = 'none'
          next.disabled = false
          prev.style.display = 'block'
          prev.disabled = true
          // set indexcurrentSlide always to the last array.lenght-1
          indexCurrentSlide = arrLightbox.length - 1
          return
        }else  { 
          next.style.display = 'block'
          next.disabled = false
          prev.style.display = 'block'
          prev.disabled = false
          const lightboxCurrentPhotoNext = loadFactoryPhoto(arrLightbox[nextIndex], nextIndex);
            lightboxCurrentPhotoNext.load();
            indexCurrentSlide = nextIndex ;
            return
          }
        };  
    //-------------------------------------------------------------------------
    //-- Function to call previous photo
    function prevPhoto() {
      var prevIndex = indexCurrentSlide - 1;
      if (prevIndex === 0 || indexCurrentSlide <=0){
        prev.style.display = 'none';
        prev.disabled = true;
        next.style.display = 'block';
        next.disabled = false;
        const lightboxCurrentPhotoPrev = loadFactoryPhoto(arrLightbox[0], 0);
          indexCurrentSlide = 0;
          lightboxCurrentPhotoPrev.load();
        return
      }else  { 
        prev.style.display = 'block';
        prev.disabled = false
        next.style.display = 'block';
        next.disabled = false
        const lightboxCurrentPhotoPrev = loadFactoryPhoto(arrLightbox[prevIndex], prevIndex);
          lightboxCurrentPhotoPrev.load();
        indexCurrentSlide = prevIndex
        return
        }
      };  
      //--Function close lightbox modal
    function closeModal() {
    //--remove keyboardEvent for lightbox when close
   window.removeEventListener("keydown", keyboardLightbox);
   myModal.style.display = "none";
   myModal.setAttribute("aria-hidden", "true");
   photographerPage.style.display="block";
   photographerPage.setAttribute("aria-hidden", "false");
   //--remove class to hide scrollbar on body 
   body.classList.remove("no-scroll");
   //--clear modalContent.innerHTML = null 
   const modalContent = document.getElementById("modal_content");
   if (modalContent != null) {
     modalContent.remove();
     location.reload()
   };
//   location.href="photographer.html";
  };
    }
/**END LAUNCHMODAL FUNCTION */
//-------------------------------------------------------------------------
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
      <figcaption>${arr.title}</figcaption>
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
//    closeBtn.focus();
    body.classList.add("no-scroll");
      }
    }
  }
//-------------------------------------------------------------------------

