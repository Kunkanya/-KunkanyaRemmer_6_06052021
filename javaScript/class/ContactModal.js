import validation from "./validation.js";
export default class ModalContactForm{
    constructor(name){
        this.name = name
    }
    createModalContact(){
        var contactHTML= `   
        <div id="form_modal">
          <div id="form_container">   
          <header>
               <h1>Contactez-moi</h1>
               <h2>${this.name}</h2>
           </header>
           <button id="closeModalForm" class="close_form curser">
             X
           </button>
           
           <form name="myForm" action="#" id= "contact_modal_content" onsubmit="return validation()" method="GET">
               <div class="input">
                 <label for="firstname">Prénom</label>
                 <input type="text" name="firstname" id="firstname" minlength="2">
                 <small></small>
               </div>
               <div class="input">
                 <label for="lastname">Nom</label>
                 <input type="text" name="lastname" id="lastname" minlength="2">
                 <small></small>
               </div>
               <div class="input">
                 <label for="email">Email</label>
                 <input type="email" name="email" id="email" required>
                 <small></small>
               </div>
     
               <div class="input">
               <label for="message">Votre message</label>
               <textarea name="message" id="message"></textarea>
               </div>
               <input type="submit" id="validate" class="btn btn-submit" value="Envoyer">        
           </form>
           
           </div>
         </div>
     `
         body.insertAdjacentHTML("beforeend", contactHTML);

       
         const validationBtn = document.getElementById("validate")
         validationBtn.addEventListener('click', (e)=>{
             e.preventDefault()
             validation(e)
         })
     
     //-- EVENT VALADATION FORM
    }
   
}