const profileContainer = document.getElementById("profile_container");

class Photographer {
    constructor(name, id, city, country, tags, tagline, price, portrait){
      this.name = name
      this.id = id
      this.city = city
      this.country = country
      this.tags = tags // array of tags
      this.tagline = tagline
      this.price = price
      this.portrait = `../Sample Photos/Photographers ID Photos/${portrait}` 
    
      console.log (this.portrait)
    }
  
    //METHOD(): CREATE HTML BLOCK TO CREATE PROFILE BLOCK
    createProfile(){
       let createProfileHTML = ` 
        <article class="photographer" >
          <a href="./photographer.html?id=${this.id}" id="link_profile">
              <figure>
                <div class="avatar"><img src="${this.portrait}"
                          alt="Photo of${this.portrait}">
                </div>
                <figcaption id="name">${this.name}</figcaption>
              </figure>
            </a>
            <div class="details">
              <p class="location">${this.city} , ${this.country}</P>
              <small class="slogan">${this.tagline}</small>
              <p class="price">${this.price}€/jour</p>
            </div>
            ${this.createTags()}
            </article>
        `;
  
      profileContainer.innerHTML += createProfileHTML
      }
  
  // METHOD(): CREATE TAGS for "tags" which is array in THIS.TAGS, so use method map()
  //      to get the new array for "tags" also use join() to loop for each tags
      createTags(){
        return `
            <ul>
              ${this.tags.map(function(tag){
                  return `  
                          <li><a href="#" class="tag_name"> 
                          ${tag}
                          <span class="screen_reader_only">${tag}</span>
                          </a></li>                
                          `    
                }).join('')}
            </ul>
            `
      }
    
    }
  