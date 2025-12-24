// "use strict";

// /* =========================================
//    1. UTILITIES & DATE
//    ========================================= */
// const footerYear = document.querySelector('#footer-year');
// footerYear.innerHTML = new Date().getFullYear();

// /* =========================================
//    2. TYPEWRITER EFFECT
//    ========================================= */
// const typeSpan = document.querySelector(".typewriter");
// const words = ["Websites", "Applications", "Experiences", "Digital Worlds"];
// let wordIndex = 0;
// let charIndex = 0;
// let isDeleting = false;

// const typeEffect = () => {
//   const currentWord = words[wordIndex];
//   const currentChar = currentWord.substring(0, charIndex);
//   typeSpan.textContent = currentChar;

//   if (!isDeleting && charIndex < currentWord.length) {
//     charIndex++;
//     setTimeout(typeEffect, 100);
//   } else if (isDeleting && charIndex > 0) {
//     charIndex--;
//     setTimeout(typeEffect, 50);
//   } else {
//     isDeleting = !isDeleting;
//     if (!isDeleting) {
//       wordIndex = (wordIndex + 1) % words.length;
//     }
//     setTimeout(typeEffect, 1200);
//   }
// }
// document.addEventListener("DOMContentLoaded", typeEffect);


// /* =========================================
//    3. HIGH-END BABYLON 3D SCENE
//    ========================================= */
// const canvas = document.querySelector("#renderCanvas");

// // Initialize Engine with Stencil/Alpha enabled for transparency and glow
// const engine = new BABYLON.Engine(canvas, true, {
//   preserveDrawingBuffer: true,
//   stencil: true,
//   disableWebGL2Support: false
// });

// const createScene = () => {
//   const scene = new BABYLON.Scene(engine);

//   // 1. Transparent Background
//   scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

//   // 2. Camera (No controls, just a viewer)
//   const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
//   // We don't attach controls because we want the mouse to control rotation manually (parallax)

//   // 3. The Glow Layer (This makes it look expensive)
//   const gl = new BABYLON.GlowLayer("glow", scene);
//   gl.intensity = 1.5;

//   // 4. Create the "Cyber Core" (IcoSphere)
//   const core = BABYLON.MeshBuilder.CreatePolyhedron("core", { type: 2, size: 2.5 }, scene);

//   // Core Material
//   const coreMat = new BABYLON.StandardMaterial("coreMat", scene);
//   coreMat.wireframe = true;
//   coreMat.emissiveColor = new BABYLON.Color3(0.39, 1, 0.85); // Neon Cyan (#64ffda)
//   coreMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
//   core.material = coreMat;

//   // 5. Create the "Inner Core" (Solid sphere inside)
//   const innerCore = BABYLON.MeshBuilder.CreateSphere("inner", { diameter: 2.5 }, scene);
//   const innerMat = new BABYLON.StandardMaterial("innerMat", scene);
//   innerMat.emissiveColor = new BABYLON.Color3(0.1, 0.2, 0.4); // Deep Blue
//   innerMat.alpha = 0.4; // Semi-transparent
//   innerCore.material = innerMat;

//   // 6. Create Floating Particles (Data Cloud)
//   const particleCount = 150;
//   const particles = [];

//   // Material for particles
//   const particleMat = new BABYLON.StandardMaterial("particleMat", scene);
//   particleMat.emissiveColor = new BABYLON.Color3(1, 1, 1); // White hot

//   for (let i = 0; i < particleCount; i++) {
//     // Create tiny box
//     const p = BABYLON.MeshBuilder.CreateBox("p" + i, { size: 0.08 }, scene);
//     p.material = particleMat;

//     // Random Position around the core
//     const angle = Math.random() * Math.PI * 2;
//     const radius = 3.5 + Math.random() * 3; // Distance from center
//     const height = (Math.random() - 0.5) * 6;

//     p.position.x = Math.cos(angle) * radius;
//     p.position.z = Math.sin(angle) * radius;
//     p.position.y = height;

//     // Store custom animation data on the mesh
//     p.customData = {
//       angle: angle,
//       radius: radius,
//       speed: (Math.random() * 0.01) + 0.005,
//       yOffset: Math.random() * 100
//     };

//     particles.push(p);
//   }

//   // 7. Mouse Interaction Variables
//   let mouseX = 0;
//   let mouseY = 0;
//   let targetRotationX = 0;
//   let targetRotationY = 0;

//   // Track mouse movement
//   window.addEventListener("mousemove", (e) => {
//     // Normalize mouse position (-1 to 1)
//     mouseX = (e.clientX / window.innerWidth) * 2 - 1;
//     mouseY = (e.clientY / window.innerHeight) * 2 - 1;
//   });

//   // 8. Animation Loop
//   scene.registerBeforeRender(() => {
//     const time = performance.now() * 0.001;

//     // Animate Core (Rotate slowly)
//     core.rotation.y += 0.005;
//     core.rotation.x += 0.002;

//     // Pulse the core size
//     const scale = 1 + Math.sin(time * 2) * 0.02;
//     core.scaling = new BABYLON.Vector3(scale, scale, scale);

//     // Animate Particles
//     particles.forEach(p => {
//       p.customData.angle += p.customData.speed;

//       // Orbit logic
//       p.position.x = Math.cos(p.customData.angle) * p.customData.radius;
//       p.position.z = Math.sin(p.customData.angle) * p.customData.radius;

//       // Gentle floating up/down
//       p.position.y += Math.sin(time + p.customData.yOffset) * 0.01;

//       // Make particles look at camera/center
//       p.rotation.x += 0.02;
//       p.rotation.y += 0.02;
//     });

//     // Parallax Effect (Smoothly interpolate camera or object rotation based on mouse)
//     // We act on a root transform or just rotate the camera alpha/beta slightly
//     targetRotationX = mouseY * 0.5;
//     targetRotationY = mouseX * 0.5;

//     // Smooth damping (Lerp)
//     core.rotation.x += (targetRotationX - core.rotation.x) * 0.05;
//     core.rotation.z += (-targetRotationY - core.rotation.z) * 0.05; // Note: rotating Z gives a cool tilt
//   });

//   return scene;
// };

// const scene = createScene();

// engine.runRenderLoop(() => {
//   scene.render();
// });

// window.addEventListener("resize", () => {
//   engine.resize();
// });




// import * as THREE from 'three';



// // ============================================================================
// // THREE.JS 3D EFFECTS SCRIPT
// // A comprehensive collection of visually stunning 3D effects
// // ============================================================================

// // DOM Utility Functions
// const setupDOM = () => {
//   const footerYear = document.querySelector("#footer-year")
//   const targets = document.querySelectorAll(".animated-headers")
//   const date = new Date()
//   const year = date.getFullYear()

//   if (footerYear) {
//     footerYear.innerHTML = year
//   }

//   // IntersectionObserver for animated headers with typewriter effect
//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         const updatingElements = document.getElementsByClassName("updating")
//         for (let i = 0; i < updatingElements.length; i++) {
//           if (entry.target === updatingElements[i]) {
//             typeWriter(entry.target, text[i], i)
//             observer.unobserve(entry.target)
//           }
//         }
//       }
//     })
//   })

//   const updatingElements = document.getElementsByClassName("updating")
//   for (let i = 0; i < updatingElements.length; i++) {
//     observer.observe(updatingElements[i])
//   }

//   const text = ["About Me", "Featured Projects"]
//   const speed = 100
//   let index = 0

//   const typeWriter = (element, text, currentIndex) => {
//     if (index < text.length) {
//       element.innerHTML = text.slice(0, index + 1) + '<span class="cursor">|</span>'
//       index++
//       setTimeout(() => typeWriter(element, text, currentIndex), speed)
//     } else {
//       element.innerHTML = text
//       index = 0
//     }
//   }
// }

// // ============================================================================
// // THREE.JS SCENE SETUP
// // ============================================================================

// const initThreeJS = () => {
//   // Import Three.js
//   // const THREE = window.THREE

//   // Get canvas element
//   const canvas = document.querySelector("#renderCanvas")
//   if (!canvas) {
//     console.error("Canvas element #renderCanvas not found")
//     return
//   }

//   // Scene setup
//   const scene = new THREE.Scene()
//   scene.background = new THREE.Color(0x080d17) // Dark blue background
//   scene.fog = new THREE.Fog(0x080d17, 10, 50)

//   // Camera setup
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
//   camera.position.z = 8

//   // Renderer setup
//   const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true,
//     alpha: true,
//   })
//   renderer.setSize(window.innerWidth, window.innerHeight)
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//   // ============================================================================
//   // LIGHTING SETUP
//   // ============================================================================

//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
//   scene.add(ambientLight)

//   const pointLight1 = new THREE.PointLight(0x6366f1, 2, 50)
//   pointLight1.position.set(5, 5, 5)
//   scene.add(pointLight1)

//   const pointLight2 = new THREE.PointLight(0x10b981, 2, 50)
//   pointLight2.position.set(-5, -5, 5)
//   scene.add(pointLight2)

//   const pointLight3 = new THREE.PointLight(0xf59e0b, 1.5, 50)
//   pointLight3.position.set(0, 5, -5)
//   scene.add(pointLight3)

//   // ============================================================================
//   // PARTICLE SYSTEM
//   // ============================================================================

//   const particlesGeometry = new THREE.BufferGeometry()
//   const particleCount = 2000
//   const positions = new Float32Array(particleCount * 3)
//   const colors = new Float32Array(particleCount * 3)
//   const sizes = new Float32Array(particleCount)

//   for (let i = 0; i < particleCount; i++) {
//     // Positions in a sphere
//     const theta = Math.random() * Math.PI * 2
//     const phi = Math.acos(Math.random() * 2 - 1)
//     const radius = 15 + Math.random() * 10

//     positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
//     positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
//     positions[i * 3 + 2] = radius * Math.cos(phi)

//     // Random colors (blue, purple, teal palette)
//     const colorChoice = Math.random()
//     if (colorChoice < 0.33) {
//       colors[i * 3] = 0.39 // R
//       colors[i * 3 + 1] = 0.4 // G
//       colors[i * 3 + 2] = 0.95 // B (Indigo)
//     } else if (colorChoice < 0.66) {
//       colors[i * 3] = 0.06 // R
//       colors[i * 3 + 1] = 0.73 // G
//       colors[i * 3 + 2] = 0.51 // B (Teal)
//     } else {
//       colors[i * 3] = 0.96 // R
//       colors[i * 3 + 1] = 0.62 // G
//       colors[i * 3 + 2] = 0.04 // B (Amber)
//     }

//     sizes[i] = Math.random() * 3 + 1
//   }

//   particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
//   particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
//   particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

//   const particlesMaterial = new THREE.PointsMaterial({
//     size: 0.1,
//     vertexColors: true,
//     transparent: true,
//     opacity: 0.8,
//     blending: THREE.AdditiveBlending,
//     sizeAttenuation: true,
//   })

//   const particles = new THREE.Points(particlesGeometry, particlesMaterial)
//   scene.add(particles)

//   // ============================================================================
//   // CENTRAL GEOMETRIC SHAPES
//   // ============================================================================

//   const geometries = []

//   // Main central sphere with wireframe
//   const mainGeometry = new THREE.IcosahedronGeometry(1.5, 1)
//   const mainMaterial = new THREE.MeshStandardMaterial({
//     color: 0x6366f1,
//     wireframe: false,
//     metalness: 0.7,
//     roughness: 0.3,
//     emissive: 0x6366f1,
//     emissiveIntensity: 0.3,
//   })
//   const mainMesh = new THREE.Mesh(mainGeometry, mainMaterial)
//   scene.add(mainMesh)
//   geometries.push({ mesh: mainMesh, rotationSpeed: { x: 0.003, y: 0.005 } })

//   // Wireframe overlay
//   const wireframeGeo = new THREE.IcosahedronGeometry(1.52, 1)
//   const wireframeMat = new THREE.MeshBasicMaterial({
//     color: 0x10b981,
//     wireframe: true,
//     transparent: true,
//     opacity: 0.3,
//   })
//   const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat)
//   scene.add(wireframeMesh)
//   geometries.push({ mesh: wireframeMesh, rotationSpeed: { x: -0.002, y: 0.004 } })

//   // Torus Knot
//   const torusKnotGeo = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16)
//   const torusKnotMat = new THREE.MeshStandardMaterial({
//     color: 0xf59e0b,
//     metalness: 0.8,
//     roughness: 0.2,
//     emissive: 0xf59e0b,
//     emissiveIntensity: 0.2,
//   })
//   const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat)
//   torusKnot.position.set(-3, 2, -2)
//   scene.add(torusKnot)
//   geometries.push({ mesh: torusKnot, rotationSpeed: { x: 0.01, y: 0.01, z: 0.005 } })

//   // Octahedron
//   const octaGeo = new THREE.OctahedronGeometry(0.8)
//   const octaMat = new THREE.MeshStandardMaterial({
//     color: 0xec4899,
//     metalness: 0.6,
//     roughness: 0.4,
//     emissive: 0xec4899,
//     emissiveIntensity: 0.2,
//   })
//   const octahedron = new THREE.Mesh(octaGeo, octaMat)
//   octahedron.position.set(3, -2, -3)
//   scene.add(octahedron)
//   geometries.push({ mesh: octahedron, rotationSpeed: { x: 0.008, y: -0.006, z: 0.004 } })

//   // Dodecahedron
//   const dodecaGeo = new THREE.DodecahedronGeometry(0.7)
//   const dodecaMat = new THREE.MeshStandardMaterial({
//     color: 0x8b5cf6,
//     metalness: 0.7,
//     roughness: 0.3,
//     emissive: 0x8b5cf6,
//     emissiveIntensity: 0.2,
//   })
//   const dodecahedron = new THREE.Mesh(dodecaGeo, dodecaMat)
//   dodecahedron.position.set(-4, -3, 1)
//   scene.add(dodecahedron)
//   geometries.push({ mesh: dodecahedron, rotationSpeed: { x: -0.007, y: 0.009, z: -0.003 } })

//   // Rings/Torus
//   const ring1Geo = new THREE.TorusGeometry(3, 0.05, 16, 100)
//   const ring1Mat = new THREE.MeshStandardMaterial({
//     color: 0x6366f1,
//     emissive: 0x6366f1,
//     emissiveIntensity: 0.5,
//     transparent: true,
//     opacity: 0.6,
//   })
//   const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
//   ring1.rotation.x = Math.PI / 3
//   scene.add(ring1)
//   geometries.push({ mesh: ring1, rotationSpeed: { z: 0.02 } })

//   const ring2Geo = new THREE.TorusGeometry(3.5, 0.03, 16, 100)
//   const ring2Mat = new THREE.MeshStandardMaterial({
//     color: 0x10b981,
//     emissive: 0x10b981,
//     emissiveIntensity: 0.5,
//     transparent: true,
//     opacity: 0.4,
//   })
//   const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
//   ring2.rotation.y = Math.PI / 2
//   scene.add(ring2)
//   geometries.push({ mesh: ring2, rotationSpeed: { y: -0.015 } })

//   // Floating cubes
//   for (let i = 0; i < 8; i++) {
//     const size = Math.random() * 0.3 + 0.2
//     const cubeGeo = new THREE.BoxGeometry(size, size, size)
//     const cubeMat = new THREE.MeshStandardMaterial({
//       color: Math.random() * 0xffffff,
//       metalness: 0.5,
//       roughness: 0.5,
//       emissive: Math.random() * 0xffffff,
//       emissiveIntensity: 0.1,
//     })
//     const cube = new THREE.Mesh(cubeGeo, cubeMat)

//     cube.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)

//     scene.add(cube)
//     geometries.push({
//       mesh: cube,
//       rotationSpeed: {
//         x: (Math.random() - 0.5) * 0.02,
//         y: (Math.random() - 0.5) * 0.02,
//         z: (Math.random() - 0.5) * 0.02,
//       },
//       floatSpeed: Math.random() * 0.5 + 0.5,
//       floatOffset: Math.random() * Math.PI * 2,
//     })
//   }

//   // ============================================================================
//   // MOUSE INTERACTION
//   // ============================================================================

//   const mouse = { x: 0, y: 0 }
//   const targetRotation = { x: 0, y: 0 }

//   window.addEventListener("mousemove", (event) => {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

//     targetRotation.y = mouse.x * 0.5
//     targetRotation.x = mouse.y * 0.5
//   })

//   // ============================================================================
//   // SCROLL INTERACTION
//   // ============================================================================

//   let scrollY = 0

//   window.addEventListener("scroll", () => {
//     scrollY = window.scrollY
//   })

//   // ============================================================================
//   // ANIMATION LOOP
//   // ============================================================================

//   const clock = new THREE.Clock()

//   const animate = () => {
//     requestAnimationFrame(animate)

//     const elapsedTime = clock.getElapsedTime()

//     // Rotate particles
//     particles.rotation.y = elapsedTime * 0.05
//     particles.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1

//     // Animate particle positions (wave effect)
//     const particlePositions = particles.geometry.attributes.position.array
//     for (let i = 0; i < particleCount; i++) {
//       const i3 = i * 3
//       const x = particlePositions[i3]
//       const y = particlePositions[i3 + 1]
//       const z = particlePositions[i3 + 2]

//       particlePositions[i3 + 1] = y + Math.sin(elapsedTime + x * 0.1) * 0.01
//     }
//     particles.geometry.attributes.position.needsUpdate = true

//     // Animate lights
//     pointLight1.position.x = Math.sin(elapsedTime * 0.7) * 5
//     pointLight1.position.z = Math.cos(elapsedTime * 0.7) * 5

//     pointLight2.position.x = Math.cos(elapsedTime * 0.5) * 5
//     pointLight2.position.z = Math.sin(elapsedTime * 0.5) * 5

//     pointLight3.position.y = Math.sin(elapsedTime * 0.8) * 3 + 5

//     // Animate geometries
//     geometries.forEach((item, index) => {
//       const { mesh, rotationSpeed, floatSpeed, floatOffset } = item

//       // Rotation
//       if (rotationSpeed.x) mesh.rotation.x += rotationSpeed.x
//       if (rotationSpeed.y) mesh.rotation.y += rotationSpeed.y
//       if (rotationSpeed.z) mesh.rotation.z += rotationSpeed.z

//       // Floating animation
//       if (floatSpeed) {
//         mesh.position.y += Math.sin(elapsedTime * floatSpeed + floatOffset) * 0.003
//       }
//     })

//     // Mouse parallax effect
//     camera.rotation.y += (targetRotation.y - camera.rotation.y) * 0.05
//     camera.rotation.x += (targetRotation.x - camera.rotation.x) * 0.05

//     // Scroll effect
//     camera.position.y = -(scrollY * 0.002)

//     renderer.render(scene, camera)
//   }

//   animate()

//   // ============================================================================
//   // RESPONSIVE RESIZE
//   // ============================================================================

//   window.addEventListener("resize", () => {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//   })
// }

// // ============================================================================
// // INITIALIZATION
// // ============================================================================

// window.addEventListener("DOMContentLoaded", () => {
//   setupDOM()
//   initThreeJS()
// })












"use strict";
import { projects } from "./constants/projects.js";

/* =========================================
   1. UTILITIES & DATE
   ========================================= */
const footerYear = document.querySelector('#footer-year');
if (footerYear) {
  footerYear.innerHTML = new Date().getFullYear();
}

/* =========================================
   2. TYPEWRITER EFFECT
   ========================================= */
const typeSpan = document.querySelector(".typewriter");
const words = ["Websites", "Applications", "Experiences", "Digital Worlds"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  // Safety check in case element doesn't exist
  if (!typeSpan) return;

  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  typeSpan.textContent = currentChar;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeEffect, 1200);
  }
}
document.addEventListener("DOMContentLoaded", typeEffect);

const projectsContainer = document.querySelector(".projects-container");
projects.forEach(project => {
  const projectCard = document.createElement("div");
  projectCard.classList.add("project-card");
  const tools = project.tools.map(tool => `<span class="pill">${tool}</span>`).join("");
  projectCard.innerHTML = `
    <div class="content">
      <div class="front" style="background-image: url('${project.image}')">
        <div class="overlay"></div>
                <div class="inner-floating">
                  <h2 class="project-title">${project.name}</h2>
                  <div class="tools">
                    ${tools}
                  </div>
                </div>
              </div>
              <div class="back">
                <div class="inner-floating">
                  <div class="description">
                    <p>${project.description}</p>
                  </div>
                  <div class="project-links">
                    <a target="_blank" href="${project.link}" class="link-btn github">
                      <i class="icon ion-logo-github"></i> Code
                    </a>
                    <a target="_blank" href="${project.live}" class="link-btn live">
                      <i class="icon ion-md-open"></i> Live
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;
  projectsContainer.appendChild(projectCard);
});

/* =========================================
   3. HIGH-END BABYLON 3D SCENE
   ========================================= */
const canvas = document.querySelector("#renderCanvas");

// Initialize Engine with specific hardware scaling for sharpness
const engine = new BABYLON.Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
  disableWebGL2Support: false,
  antialias: false // We will handle AA in the pipeline for better control
});

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  // 1. Transparent Background
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  // 2. Camera
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
  camera.minZ = 0.1;

  // 3. LIGHTING (Crucial for realism)
  // A. Ambient Light (Soft base)
  const hemiLight = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
  hemiLight.intensity = 0.3;

  // B. Moving Point Light (Creates specular highlights)
  const pointLight = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(5, 5, 5), scene);
  pointLight.intensity = 0.8;
  pointLight.diffuse = new BABYLON.Color3(0.39, 1, 0.85); // Cyan tint

  // 4. RENDERING PIPELINE (The "Pro" Polish)
  // This adds Image Processing, Anti-Aliasing, Bloom, and Camera Lens effects

  const pipeline = new BABYLON.DefaultRenderingPipeline(
    "defaultPipeline",
    true, // HDR
    scene,
    [camera]
  );

  pipeline.samples = 4; // 4x MSAA Anti-Aliasing (Smooth edges)
  pipeline.fxaaEnabled = true; // Fast Approximate Anti-Aliasing

  // Bloom (Glow) settings - cleaner than standard GlowLayer
  pipeline.bloomEnabled = true;
  pipeline.bloomThreshold = 0.6; // Only bright things glow
  pipeline.bloomWeight = 0.4;
  pipeline.bloomKernel = 64;
  pipeline.bloomScale = 0.5;

  // Chromatic Aberration (Simulates a real camera lens imperfection at edges)
  pipeline.chromaticAberrationEnabled = true;
  pipeline.chromaticAberration.aberrationAmount = 15; // Subtle shift
  pipeline.chromaticAberration.radialIntensity = 0.8;

  // Film Grain (Adds texture, removes "CGI plastic" look)
  pipeline.grainEnabled = true;
  pipeline.grain.intensity = 8;
  pipeline.grain.animated = true;

  // 5. THE CYBER CORE (Wireframe with Fresnel)
  const core = BABYLON.MeshBuilder.CreatePolyhedron("core", { type: 2, size: 2.5 }, scene);

  const coreMat = new BABYLON.StandardMaterial("coreMat", scene);
  coreMat.wireframe = true;
  coreMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
  coreMat.emissiveColor = new BABYLON.Color3(0.39, 1, 0.85); // Base Cyan

  // Fresnel Parameters: Edges are brighter than center
  coreMat.emissiveFresnelParameters = new BABYLON.FresnelParameters();
  coreMat.emissiveFresnelParameters.bias = 0.2;
  coreMat.emissiveFresnelParameters.power = 4; // Sharpness of rim
  coreMat.emissiveFresnelParameters.leftColor = BABYLON.Color3.Black(); // Center
  coreMat.emissiveFresnelParameters.rightColor = new BABYLON.Color3(0.6, 1, 1); // Edge

  core.material = coreMat;

  // 6. THE INNER CORE (Glass/Energy Sphere)
  const innerCore = BABYLON.MeshBuilder.CreateSphere("inner", { diameter: 2.2, segments: 32 }, scene);
  const innerMat = new BABYLON.StandardMaterial("innerMat", scene);

  innerMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
  innerMat.specularColor = new BABYLON.Color3(1, 1, 1); // Shiny highlights
  innerMat.emissiveColor = new BABYLON.Color3(0.1, 0.2, 0.4);
  innerMat.alpha = 0.8;

  // Opacity Fresnel (Ghostly look)
  innerMat.opacityFresnelParameters = new BABYLON.FresnelParameters();
  innerMat.opacityFresnelParameters.bias = 0.5;
  innerMat.opacityFresnelParameters.power = 2;
  innerMat.opacityFresnelParameters.leftColor = BABYLON.Color3.White(); // Opaque at edges
  innerMat.opacityFresnelParameters.rightColor = BABYLON.Color3.Black(); // Transparent at center

  innerCore.material = innerMat;

  // 7. FLOATING PARTICLES (Data Cloud)
  const particleCount = 200;
  const particles = [];

  const particleMat = new BABYLON.StandardMaterial("particleMat", scene);
  particleMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
  particleMat.disableLighting = true; // Pure emission

  for (let i = 0; i < particleCount; i++) {
    // Using very low segments for performance since they are tiny
    const p = BABYLON.MeshBuilder.CreatePolyhedron("p" + i, { type: 1, size: 0.05 }, scene);
    p.material = particleMat;

    // Spherical distribution
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 3.5 + Math.random() * 2;

    p.position.x = radius * Math.sin(phi) * Math.cos(theta);
    p.position.y = radius * Math.sin(phi) * Math.sin(theta);
    p.position.z = radius * Math.cos(phi);

    // Store animation data
    p.customData = {
      theta: theta,
      phi: phi,
      radius: radius,
      speed: (Math.random() * 0.005) + 0.002,
      opacityOffset: Math.random() * 100
    };

    particles.push(p);
  }

  // 8. MOUSE INTERACTION
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  });

  // 9. ANIMATION LOOP
  scene.registerBeforeRender(() => {
    const time = performance.now() * 0.001;

    // Move Light
    pointLight.position.x = Math.sin(time) * 6;
    pointLight.position.z = Math.cos(time) * 6;

    // Rotate Core
    core.rotation.y += 0.002;
    core.rotation.x += 0.001;
    innerCore.rotation.y -= 0.003;

    // Pulse Inner Core
    const scale = 1 + Math.sin(time * 1.5) * 0.03;
    innerCore.scaling = new BABYLON.Vector3(scale, scale, scale);

    // Animate Particles
    particles.forEach(p => {
      // Orbit
      p.customData.theta += p.customData.speed;

      p.position.x = p.customData.radius * Math.sin(p.customData.phi) * Math.cos(p.customData.theta);
      p.position.y = p.customData.radius * Math.sin(p.customData.phi) * Math.sin(p.customData.theta);
      p.position.z = p.customData.radius * Math.cos(p.customData.phi);

      // Twinkle effect (Scale/Visibility)
      const twinkle = 0.5 + Math.abs(Math.sin(time * 3 + p.customData.opacityOffset)) * 0.5;
      p.scaling = new BABYLON.Vector3(twinkle, twinkle, twinkle);
    });

    // Parallax Damping
    targetRotationX = mouseY * 0.3;
    targetRotationY = mouseX * 0.3;

    // Smooth Lerp (Linear Interpolation)
    core.rotation.x += (targetRotationX - core.rotation.x) * 0.05;
    core.rotation.z += (-targetRotationY - core.rotation.z) * 0.05;

    // Slight camera sway for realism
    camera.alpha += Math.sin(time * 0.5) * 0.001;
  });

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
