const profileContainer = document.getElementById("profile_container");


export default class Photographer {
    constructor(name, id, city, country, tags, tagline, price, portrait){
      this.name = name
      this.id = id
      this.city = city
      this.country = country
      this.tags = tags // array of tags
      this.tagline = tagline
      this.price = price
      this.portrait = `./Sample Photos/Photographers ID Photos/${portrait}` 
 console.log(this)  
    }
  
    createBanner(){    
      const photographerPage = document.getElementById("photographerPage")

      photographerPage.innerHTML = ` 
      <header class= "id_header">
        <nav class= "id_header-top">
            <h1 id="id_name">${this.name}</h1>
            <h2 class="id_location">${this.city} , 
            ${this.country}</h2>
            <p class="id_slogan">${this.tagline}</p>
            <div class="tag-name">
                ${this.createTags()}
            </div>    
        </nav>
        <div class="id_btn">
            <button id="contact" class="btn btn-contact curser" type="submit">Contactez-moi</button>               
        </div>
        <figure class=" avatar"> 
            <img src="${this.portrait}" 
              alt="Photo of ${this.name}">
        </figure>
      </header>

      <div class="dropdown_container">
        <label for="sort_menu">Trier par</label>
        <select class="btn dropdown" name="sort_menu" id="sort_menu">
          <option value="popular" selected>Popularité</option>
          <option value="date">Date</option>
          <option value="title">Titre</option>
        </select>
      </div>


        <div class = "media_container" id="galleryContainer"></div>
        <div class="like_total">
            <div class = "like_box_bottom">
              <p id="total_like"></p>  
              <i class="fas fa-heart"></i>
            </div>
            <span>${this.price}/jour</span>
        </div>

        <div id="myModal" class="modal" role="dialog" aria-label="image closeup view">
        <button id="close-btn" class="close curser"  
        aria-label="button for close lightbox modal">Fermer</button>
        <button class="previous curser"  >Précédent</button>
        <button class="next curser" >Suivant</button>
  `
}

createTags(){
  return `
      <ul class="tag_container">
        ${this.tags.map(function(tag){
            return `  
                    <li><a href="#" class="tag_name" data-tag="${tag}"> 
                    ${tag}</a>
                    <span class="sr_only">${tag}</span>
                    </li>                
                    `    
          }).join('')}
      </ul>
      `
}

dropdown(){

}
dropdown_select(){
  /*
  <div class="dropdown_container">
  <label for="sort_menu">Trier par</label>
  <select class="btn dropdown" name="sort_menu" id="sort_menu">
    <option value="popular" selected>Popularité</option>
    <option value="date">Date</option>
    <option value="title">Titre</option>
  </select>
  <i class="fas fa-angle-up dropdown_arrow"></i>
</div>


      <div class="dropdown_container">
        <h2>Trier par</h2>
        <ul class="dropdown" role="button">
            <li class="btn">Populatrité</li>
            <li>Date</li>
            <li>Title</li>
        </ul>
      </div >


*/

}
    }
    


    
  