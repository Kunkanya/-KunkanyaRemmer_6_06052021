export default function loadFactoryPhoto(arr, index){
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
//    closeBtn.focus();
    body.classList.add("no-scroll");
      }
    }
  }
//-------------------------------------------------------------------------
