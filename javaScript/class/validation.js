
export default function validation(e){
        e.preventDefault()
        const form = document.forms["myform"]
        let firstname = document.forms["myForm"]["firstname"]
        let lastname  = document.forms["myForm"]["lastname"]
        let email = document.forms["myForm"]["email"]
        let message = document.forms["myForm"]["message"]
        //-- Error messages for function validate()
        const nameErrorMessage = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        const emailErrorMessage = "Veuillez entrer valid E-mail address.";
        if(firstname.value === null|| firstname.value.length <2 ){
          setInputError(firstname, nameErrorMessage)
          return false
        }else{
          setInputSuccess(firstname)
        }
    
        if(lastname.value === null|| lastname.value.length <2 ){
          setInputError(lastname, nameErrorMessage)
          return false
        }else{
          setInputSuccess(lastname)
        }
    
        if(!validateEmail(email)){
          setInputError(email, emailErrorMessage)
          return false
        }else{
          setInputSuccess(email)
        }
    
    function validateEmail(email){
        const reg =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
      }

    
    function setInputError(input, errMessage){
        input.style.border = "black 3px solid"
        input.className ="text control "
        input.className ="text control error"
        let parent = input.parentElement
        let err = parent.querySelector("small")
        err.style.display= "block"
        err.innerText= errMessage
        input.focus()
    }
    function setInputSuccess(input){
      input.style.border = "green 3px solid"
      input.className ="text control "
      input.className ="text control success"
      let parent = input.parentElement
      let err = parent.querySelector("small")
      err.style.display = "none"
    }
    
        console.log("Prénom : " + firstname.value)
        console.log("Nom : " + lastname.value)
        console.log("Email : " + email.value)
        console.log("Message : " + message.value)
        
        alert ("close contac_form")
 


}
 