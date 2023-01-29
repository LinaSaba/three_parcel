   // Example of hard link to official repo for data, if needed
   //const MODEL_PATH = 'https://raw.githubusercontent.com/mrdoob/three.js/r148/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb';

   import * as THREE from 'three'

   import {
     OrbitControls
   } from 'three/examples/jsm/controls/OrbitControls.js';

   import {
     GLTFLoader
   } from 'three/examples/jsm/loaders/GLTFLoader.js';

   // INSERT CODE HERE

   const scene = new THREE.Scene();
   const aspect = window.innerWidth / window.innerHeight;
   const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
   const renderer = new THREE.WebGLRenderer();
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);

   const geometry = new THREE.BoxGeometry(1, 1, 1);
   const material = new THREE.MeshNormalMaterial();
   const cube = new THREE.Mesh(geometry, material);
   scene.add(cube);
   camera.position.z = 3;


   const render = () => {
     requestAnimationFrame(render);
     cube.rotation.x += 0.1;
     cube.rotation.y += 0.1;
     renderer.render(scene, camera);
   };

   render();
