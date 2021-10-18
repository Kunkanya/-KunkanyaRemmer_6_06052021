
export default class Gallery {
    constructor( name,id, photographerId, title, media, tag, likes, date, price){
      this.name = name
      this.id = id,
      this.photographerId = photographerId,
      this.title= title,
      this.media = media,
      this.tag =tag,
      this.likes = likes,
      this.date = date,
      this.price = price
    }


    createGallery(){
      const galleryContainer = document.getElementById("galleryContainer");

      var gallery = `
      <figure class="media curser"><a href="#" data-id="${this.id}" role="le lien vers lightbox">${this.media}</a>  
        <figcaption class="figcaption_media">${this.title}
          <div class="show">     
           <p>${this.likes}</p>       
           <div data-like="${this.likes}" class="like" role="button">
            <i class="fas fa-heart"></i>
           </div>
          </div>    
        </figcaption>
        <p>${this.date}</p>
      </figure>
       `
       galleryContainer.innerHTML += gallery
      }

}
