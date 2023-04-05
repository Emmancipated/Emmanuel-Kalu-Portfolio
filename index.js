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



// 3D Rendering codes
const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true); //creates a Babylon 3d engine

const createScene = () => {
  const scene = new BABYLON.Scene(engine); //creates a scene where all the 3d models are displayed
  scene.clearColor = new BABYLON.Color3((190/255), (255/255), (230/255)); //background colour of the scene

  // camera
  const camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 2.2, 5, new BABYLON.Vector3(0, 0, 0), scene); //creates camera and postions it on the x, y, and z axis.
  camera.attachControl(canvas, true);

  //sets the zoom in and out limits of the camera
  camera.lowerRadiusLimit = 5;
  camera.upperRadiusLimit = 5;

  const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene); //creates light and places it on its x, y and z axis 
  light.intensity = 0.7;

  const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, 0), scene);
  light1.intensity = 0.5;

  const pl = new BABYLON.PointLight("pl", BABYLON.Vector3.Zero(), scene);
  pl.intensity = 2;

  const mat = new BABYLON.StandardMaterial("mat", scene); //creates a material
  const texture = new BABYLON.Texture("img/image-collage.jpg", scene); //creates texture of the material, we used image as the texture here.
  mat.diffuseTexture = texture; //appends the texture to the material e created.

  //Appends a part of the image on one side face of the box
  const faceUV = [
    {x: 0, y: 0, z: 0.25, w: 1},//rear face
    {x: 0, y: 0, z: 0.25, w: 1},//front face
    {x: 0.5, y: 0, z: 0.75, w: 1},//right face
    {x: 0.5, y: 0, z: 0.75, w: 1},//left face
    {x: 0.76, y: 0, z: 1.0, w: 1},//top face
    {x: 0.76, y: 0, z: 1.0, w: 1},//bottom face
  ];

  //options for the box model/mesh
  const options = {
      faceUV: faceUV,
      wrap: true,
      size: 2.4,
  };


  const box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
  box.material = mat;

    //create a Center of Transformation
  const centerofTransformation = new BABYLON.TransformNode("root"); 
  box.parent = centerofTransformation;  //apply to Box
  
  centerofTransformation.rotation.y = Math.PI/4;

  //Animation
  let angle = 0;
  scene.registerBeforeRender(() => {
    centerofTransformation.rotation.y = angle;
        angle +=0.002;
    });

  return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(() => {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", () => {
  engine.resize();
});