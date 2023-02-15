import * as THREE from 'three';

// NOTE: three/addons alias or importmap does not seem to be supported by Parcel, use three/examples/jsm/ instead 

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

// add cannon lib
import * as CANNON from 'cannon-es';



// Example of hard link to official repo for data, if needed
// const MODEL_PATH = 'https://raw.githubusercontent.com/mrdoob/three.js/r148/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb';


// INSERT CODE HERE

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

const light = new THREE.AmbientLight(0xFFFFFF); // soft white light
scene.add(light);

const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -0.1, 0), // m/s²
})

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window); // optional

//Cylindres représentant mes quilles
const geometry = new THREE.CylinderGeometry( 0.2, 0.2, 1, 10 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cylinder1 = new THREE.Mesh( geometry, material );
const cylinder2 = new THREE.Mesh( geometry, material );
const cylinder3 = new THREE.Mesh( geometry, material );
scene.add( cylinder1 );
scene.add( cylinder2 );
scene.add( cylinder3 );

const geometry1 = new THREE.SphereGeometry( 0.2, 8, 6 );
const material1 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry1, material1 );
scene.add( sphere );

const radius = 1
const sphereShape = new CANNON.Sphere(radius)
const sphereBody = new CANNON.Body({ mass: 1, shape: sphereShape })
world.addBody( sphereBody );


const radiusTop = 0.2
const radiusBottom = 0.2
const height = 1
const numSegments = 10

const cylinderShape = new CANNON.Cylinder(radiusTop, radiusBottom, height, numSegments)
const cylinderBody1 = new CANNON.Body({ mass: 1, shape: cylinderShape })
world.addBody(cylinderBody1)

const cylinderBody2 = new CANNON.Body({ mass: 1, shape: cylinderShape })
world.addBody(cylinderBody2)

const cylinderBody3 = new CANNON.Body({ mass: 1, shape: cylinderShape })
world.addBody(cylinderBody3)




//instantiation de la grille
var gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({ mass: 0 });
planeBody.addShape(planeShape);
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(planeBody);
  
const Cposition = [new THREE.Vector3(0,0.5,0), new THREE.Vector3(0.5,0.5,0), new THREE.Vector3(1,0.5,0)] 

function loadData() {
 new GLTFLoader()
     .setPath('assets/models/')
     .load('test.glb', gltfReader);
}


function gltfReader(gltf) {
 let testModel = null;

 testModel = gltf.scene;

 if (testModel != null) {
     console.log("Model loaded:  " + testModel);
    //scene.add(gltf.scene);
 } else {
     console.log("Load FAILED.  ");
 }
}

loadData();


camera.position.z = 3;


const clock = new THREE.Clock();


camera.position.set(2,0.4,5)
// setting the cylinder position
cylinderBody1.position.set(Cposition[0].x,Cposition[0].y,Cposition[0].z);
cylinderBody2.position.set(Cposition[1].x,Cposition[1].y,Cposition[1].z);
cylinderBody3.position.set(Cposition[2].x,Cposition[2].y,Cposition[2].z);
sphereBody.position.set(0.5,10,4);

 // Main loop
const animation = () => {

  renderer.setAnimationLoop(animation); // requestAnimationFrame() replacement, compatible with XR 

  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();
  world.step(delta)

  // can be used in shaders: uniforms.u_time.value = elapsed;

  // gridHelper.position.set(
  //   planeBody.position.x,
  //   planeBody.position.y,
  //   planeBody.position.z
  // );
  // gridHelper.quaternion.set(
  //   planeBody.quaternion.x,
  //   planeBody.quaternion.y,
  //   planeBody.quaternion.z,
  //   planeBody.quaternion.w
  // );

  cylinder1.position.set(
    cylinderBody1.position.x,
    cylinderBody1.position.y,
    cylinderBody1.position.z
  );
  cylinder2.position.set(
    cylinderBody2.position.x,
    cylinderBody2.position.y,
    cylinderBody2.position.z
  );
  cylinder3.position.set(
    cylinderBody3.position.x,
    cylinderBody3.position.y,
    cylinderBody3.position.z
  );
  cylinder1.quaternion.set(
    cylinderBody1.quaternion.x,
    cylinderBody1.quaternion.y,
    cylinderBody1.quaternion.z,
    cylinderBody1.quaternion.w
  );
  cylinder2.quaternion.set(
    cylinderBody2.quaternion.x,
    cylinderBody2.quaternion.y,
    cylinderBody2.quaternion.z,
    cylinderBody2.quaternion.w
  );
  cylinder3.quaternion.set(
    cylinderBody3.quaternion.x,
    cylinderBody3.quaternion.y,
    cylinderBody3.quaternion.z,
    cylinderBody3.quaternion.w
  );
  
  sphere.position.set(
    sphereBody.position.x,
    sphereBody.position.y,
    sphereBody.position.z
  );
  sphere.quaternion.set(
    sphereBody.quaternion.x,
    sphereBody.quaternion.y,
    sphereBody.quaternion.z,
    sphereBody.quaternion.w
  );
console.log('sphere position', sphere.position)
  world.fixedStep();
  renderer.render(scene, camera);
};

animation();