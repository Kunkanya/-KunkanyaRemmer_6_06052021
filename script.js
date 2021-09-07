//var url =  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json"
var dataRequest = new XMLHttpRequest;
const url = "./data.json"
const name = document.getElementById("name");

dataRequest.open('GET',url);
dataRequest.onload = function(){
  // set json data to objext in javasrcipt
  var ourData = JSON.parse(dataRequest.responseText);
  //console.log(ourData.photographer.name[0]);

  var nameTest = ourData.photographers[2].name;
  name.innerText = nameTest;
  console.log(nameTest);

    
//  return ourData;
}
dataRequest.send();
//call the function add content for each photograp when the page reloaded 
window.addEventListener('load', (event) =>{
  });


  
