import Photographer from './class/ClassePhotographers.js'
import Gallery from './class/Gallery.js';
import ModalContactForm from './class/ContactModal.js';


//import {loadFactoryPhoto} from '../javaScript/class/FactoryMedia.js'
//-------------------Page Photograger----------------------------//
//--GLOBAL VARIABLES
var dataRequest = new XMLHttpRequest();
const url = "./data.json";
//--GLOBAL DOM VAR
const body = document.getElementById("body");
const profileBanner= document.getElementById("profile_banner");
const photographerPage = document.getElementById("photographerPage")
const myModal = document.getElementById("myModal");


var listGallery = new Object();
var newObject = [];
var arrListGallery = [];
var arrLightbox =[];
var countLike = 0;
var passedName = "";
var passedFullName ="";
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
      passedId = parseInt(photoId);
      var photographerBanner = [];
      //--to get only firstname using for the variable for Photos Path
      name = newObject.photographers[i].name;
      passedFullName = name;
      name = name.split(' ').slice(0, 1);
      passedName = name; 
      photographerBanner = newObject.photographers[i]
      
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
     dropdown.addEventListener('change', (e)=>{
       e.preventDefault()
       const value = e.target.value
       loadBySort(value)
     })
         
    //--DOM EVENT --click hashtags
    const myTags = document.querySelectorAll(".tag_name")
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
  body.classList.add("no-scroll");
  myContact = new ModalContactForm(passedFullName)
  myContact.createModalContact()


  const formContainer = document.getElementById("form_container")
  formContainer.style.border = "white 5px solid"
  formContainer.addEventListener('keyup', keyboardContactForm )

  const closeContactBtn = document.getElementById("closeModalForm")
  closeContactBtn.focus()

  //--DOM EVENT --close contact button
  closeContactBtn.addEventListener('click', ()=>{
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
    if (keyCode == 27) {//27 = escape button
      closeModalForm();
    }
  }  
} 
//--Function for filter the tagsname 
function filterTag(tag) {
  const galleryContainer = document.getElementById("galleryContainer");

  //--set countLike to 0 for not accumulate the like on change event
  countLike = 0;
  var searchText = tag
 var newArray = arrListGallery.filter(function (e) {
 // arrListGallery = arrListGallery.filter(function (e) {  
 //change e.tags which is object to string 
    var x = e.tags.toString();
    return x === searchText;
  });
  galleryContainer.innerHTML = "";
  createGallery(newArray, passedName);
}

//-------------------------------------------------------------------------

function gallery(photographerId, photographerName) {
  //const myModal = document.getElementById("myModal");

  //--Select the media of th photographer and add to arrListGallery
  for (let j = 0; j < newObject.media.length; j++) {
    let isId = newObject.media[j].photographerId
    if (photographerId == isId) {
      listGallery = Object.assign(newObject.media[j]);
      arrListGallery.push(listGallery);
    }
  }
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
    //--Call the class Gallery.createGallery()
    photographerGallery.createGallery();
      //--add number of like from each photo to total-like
      countLike += arr.likes;

    //--Funciton to check Video and image then return the path of media
    function sourcePath() {
      var path = "";
      var source = "";
      //var countLike = 0;
      if (arr.video != null) {
        path = `"./Sample Photos/${photographerName}/${arr.video}"`
        source = `<video  src=${path} type="video/mp4" 
                  title= "Video de ${arr.title}"
                  class="modal_lightbox" data-id="${arr.id}" aria-label="video de ${arr.title}"></video>`
        return source;
      } else if (arr.image != null) {
        path = `"./Sample Photos/${photographerName}/${arr.image}"`
        source = `<img  src=${path} alt="Photo de ${arr.title}"
        class="modal_lightbox" data-id="${arr.id}">`
        return source;
      }    
    }
  }).join('');

  //--add the total likes for each photographer  
  const total_like = document.querySelector("#total_like");
  total_like.innerText = countLike;

  //-- increment like when click and unlike when click
  const hearts = document.querySelectorAll(".heart");
  hearts.forEach(heart =>{
  heart.addEventListener('click', ()=>{
    const show = heart.previousElementSibling;
    var x = parseInt(heart.dataset.like);

    if(heart.classList.contains('like')){
      heart.classList.remove('like');
      heart.classList.add('unlike');
      show.innerText = x;
      countLike--;
      total_like.innerText = countLike;
      

    }else{
    heart.classList.remove ("unlike");
    heart.classList.add('like');
    x++
    show.innerText = x;
    countLike++
    total_like.innerText = countLike;
  }
  })
})
 

  //--DOM EVENT -- open LIGHTBOX
  const myLightbox = document.querySelectorAll(".modal_lightbox")
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
    if (keyCode == 13) {//13 = Enter button
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
  const galleryContainer = document.getElementById("galleryContainer");

  //--set countLike to 0 eachtime onchange for not accumulate the likes
  countLike = 0;
  if (option == "popular") {
    const sortByLike = arrListGallery.sort(function (a, b) {
        return  b.likes -a.likes ;
    });
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
      if (a.title.toLowerCase() == b.title.toLowerCase()) return 0; // nothing change
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
      //--set photographerPage to hidden from screen reader
      profileBanner.style.display ="none";
      profileBanner.setAttribute("aria-hidden", "true");
      
      photographerPage.style.display = "none";
      photographerPage.setAttribute("aria-hidden", "true");
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
      //--now lightboxCurrentPhoto is an object with property load() from Factory function "loadFactoryPhoto"
      lightboxCurrentPhoto.load();

      //--AddEventListener to Prev , next and close button
      next.addEventListener('click',nextPhoto);
      prev.addEventListener('click',prevPhoto);
      close.addEventListener('click', closeModal)
/**
 * ADD KEYBOARD EVENT ON MODAL
 */
      window.addEventListener("keyup", keyboardLightbox);

      function keyboardLightbox(e){
        const keyCode = e.keyCode ? e.keyCode : e.which
          e.preventDefault();
        if (keyCode == 27 && myModal.getAttribute("aria-hidden", "false")) {//27 = escape button
          closeModal();
        } else if (keyCode == 39 && myModal.getAttribute("aria-hidden", "false")) {//39 = arrowright button
          next.focus()
          nextPhoto();    
        } else if (keyCode == 37 && myModal.getAttribute("aria-hidden", "false")) {//37 = arrowleft button
          prev.focus();
          prevPhoto();
        } 
      }
    //-------------------------------------------------------------------------
    //-- Function to call next photo
    function nextPhoto() {
        var nextIndex = indexCurrentSlide + 1;
        //disable next button when the last photo of array 
        if (nextIndex === arrLightbox.length-1 || nextIndex >= arrLightbox.length){
          const lightboxCurrentPhotoPrev = loadFactoryPhoto(arrLightbox[arrLightbox.length -1], arrLightbox.length-1);
          lightboxCurrentPhotoPrev.load();
          next.style.display = 'none'
          next.disabled = true
          prev.style.display = 'block'
          prev.disabled = false
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
        }
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
      }  
      //--Function close lightbox modal
    function closeModal() {
    //--remove keyboardEvent for lightbox when close
   window.removeEventListener("keydown", keyboardLightbox);
   //--disable lightboxmodal
   myModal.style.display = "none";
   myModal.setAttribute("aria-hidden", "true");
    //--activate logo and main section
   profileBanner.style.display="block";
   profileBanner.setAttribute("aria-hidden", "false");
   photographerPage.style.display="block";
   photographerPage.setAttribute("aria-hidden", "false");
   //--remove class to hide scrollbar on body 
   body.classList.remove("no-scroll");
   //--clear modalContent.innerHTML = null 
   const modalContent = document.getElementById("modal_content");
   if (modalContent != null) {
     modalContent.remove();
     location.reload()
   }
//   location.href="photographer.html";
  }
}
/**END LAUNCHMODAL FUNCTION */
//-------------------------------------------------------------------------
function loadFactoryPhoto(arr, index){
  return {  
    load(){  
    var modelHTMLImg = `  
    <div id="modal_content" tabindex="0">
      <figure class="lightbox" >          
      <img src="./Sample Photos/${passedName}/${arr.image}" alt="image de ${arr.title}">
      <figcaption>${arr.title}</figcaption>
      </figure>
    </div>`
    var modelHTMLVideo = `  
    <div id="modal_content" tabindex="0">
      <figure class="lightbox">          
      <video src="./Sample Photos/${passedName}/${arr.video}"title="video de ${arr.title}" type="video/mp4" controls> </video>
      <figcaption>${arr.title}</figcaption>
      </figure>
    </div>  
    `
    //checked if media is video or image
    const modalContent = document.getElementById("modal_content")
      index == index
    if( modalContent != null){
      modalContent.remove();
    }
    if(arr.image != null){
      myModal.insertAdjacentHTML("beforeend", modelHTMLImg );
      }else if (arr.video != null){
        myModal.insertAdjacentHTML("beforeend", modelHTMLVideo );
      }
      }
    }
  }
//-------------------------------------------------------------------------


