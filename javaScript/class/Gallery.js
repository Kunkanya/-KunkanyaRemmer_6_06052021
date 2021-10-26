
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
      <figure class="media curser" data-id="${this.id}" tabindex="0" role="le lien vers lightbox de ${this.title}">
      ${this.media}
        <figcaption class="figcaption_media">${this.title}
          <div class="show">     
           <p>${this.likes}</p>       
                <svg class="heart curser unlike" data-like="${this.likes}" width="20px" xmlns="http://www.w3.org/2000/svg" role="button" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
          </div>    
          </figcaption>
      </figure>
       `
       galleryContainer.innerHTML += gallery
      }
    }
