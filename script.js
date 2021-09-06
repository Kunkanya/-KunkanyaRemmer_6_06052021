// set variables
var ourRequest = new XMLHttpRequest();
var url =  "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json"

ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json');
ourRequest.send;
//request.open('GET', "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.jsonurlRequest");
ourRequest.onload= function(){
    console.log("success");
};


fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));

//fetch data from JSON url
/*
async function getData(){
    const response = await fetch(urlRequest);
    const data = await response.json();
    console.log(data);
}

getData()*/