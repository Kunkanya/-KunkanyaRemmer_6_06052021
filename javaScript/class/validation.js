
export default function validation(e){
        
  e.preventDefault()
        const formContainer = document.getElementById("contact_modal_content")
        const closeContactBtn = document.getElementById("closeModalForm")

        let firstname = document.forms["myForm"]["firstname"]
        let lastname  = document.forms["myForm"]["lastname"]
        let email = document.forms["myForm"]["email"]
        let message = document.forms["myForm"]["message"]
        let fn = false
        let ln = false
        let em = false

        //-- Error messages for function validate()
        const nameErrorMessage = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        const emailErrorMessage = "Veuillez entrer valid E-mail address.";
        if(firstname.value === null|| firstname.value.length <2 ){
          setInputError(firstname, nameErrorMessage)
          return false
        }else{
          setInputSuccess(firstname)
          fn= true
        }
    
        if(lastname.value === null|| lastname.value.length <2 ){
          setInputError(lastname, nameErrorMessage)
          return false
        }else{
          setInputSuccess(lastname)
          ln = true
        }
    
        if(validateEmail(email.value)){
          setInputSuccess(email)
          em= true
        }else{
          setInputError(email, emailErrorMessage)
          return false
        }
    
      function validateEmail(email){
       const reg2= new RegExp(/@+[a-zA-Z0-9]+\./) //pattern: myemail@hotmail.com
       console.log(reg2.test(email))
       return reg2.test(email);
        }

        function setInputError(input, errMessage){
          input.style.border = "red 3px solid"
          input.style.content =""
          input.className ="text_control "
          input.className ="text_control error"
          let parent = input.parentElement
          let err = parent.querySelector("small")
          err.style.display= "block"
          err.style.fontWeight="bold"
          err.innerText= errMessage
          input.focus()
      }
      function setInputSuccess(input){
        input.style.border = "green 3px solid"
        input.className ="text_control "
        input.className ="text_control success"
        let parent = input.parentElement
        let err = parent.querySelector("small")
        err.style.display = "none"
      }

        if( fn && ln &&em){

        console.log("Prénom : " + firstname.value)
        console.log("Nom : " + lastname.value)
        console.log("Email : " + email.value)
        console.log("Message : " + message.value)
        closeContactBtn.focus()
        formContainer.innerText = "Merci!  Votre message est bien registré"
        formContainer.style.color = "white"
        }

}
 