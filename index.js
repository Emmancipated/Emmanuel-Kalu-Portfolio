"use strict";
let footerYear = document.querySelector('#footer-year');
let targets = document.querySelectorAll('.animated-headers');
let date = new Date;
let year = date.getFullYear();
footerYear.innerHTML = year;

//observer api that tracks the movement of the user and determines when they intersect in the viewport.
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => { //loop through all the elements that we are tracking
    if (entry.isIntersecting) {
      let updatingElements = document.getElementsByClassName("updating");
      for(let i = 0; i < updatingElements.length; i++) {
        if(entry.target === updatingElements[i]) {//check if the element intersection is equal to the element in our html markup
          typeWriter(entry.target, text[i], i); //if yes, call the typewriter function and pass the element,its text using the index as well as its index as aurguments
          observer.unobserve(entry.target); //unobserve it afterwards
        }
      }
    }
  });
});

let updatingElements = document.getElementsByClassName("updating"); //the observer function is called here
for(let i = 0; i < updatingElements.length; i++) {
  observer.observe(updatingElements[i]);
}

let text = ['About Me', 'Projects'];

let speed = 150;
let index = 0;

const typeWriter = (element, text, currentIndex) => {
  if (index < text.length) { //to also ensure that the function is called for for the specified elements
    element.innerHTML += text.charAt(index); //this loop ensures that the active text is updated one step at a time 
    index++;
    setTimeout(() => typeWriter(element, text, currentIndex), speed); //recalls the function to update the next character until the above loop is completed, using the specified time
  } else {
    index = 0; //resets the index to zero, once the loop has been completed for the specified word
  }
}