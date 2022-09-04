import * as THREE from "https://unpkg.com/three@0.122.0/build/three.module.js";
import { lista } from "./lista.js";
import { texto } from "./texto.js";
import { cargarModelo } from "./CargarModelo.js";
import { Particula } from "./Particula.js";
let d = 60;
var poss = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(d, d),
  new THREE.Vector2(-d, d),
  new THREE.Vector2(d, -d),
  new THREE.Vector2(-d, -d),
  new THREE.Vector2(d, 0),
  new THREE.Vector2(-d, 0),
  new THREE.Vector2(0, -d),
  new THREE.Vector2(0, d),
  // new THREE.Vector2(125, 0),
  // new THREE.Vector2(-125, 0),
  // new THREE.Vector2(0, -125),
  // new THREE.Vector2(0, 125),
  // new THREE.Vector2(0, 55),
  // new THREE.Vector2(125, 125),
  // new THREE.Vector2(-125, -125),
  // new THREE.Vector2(125, -125),
  // new THREE.Vector2(-125, 125),
  // new THREE.Vector2(155, 0),
  // new THREE.Vector2(-155, 0),
  // new THREE.Vector2(0, -155),
  // new THREE.Vector2(0, 155),
];

let limiteInterno = 15;
let limiteExterno = 40;
let limiteColision = 4;
let tamPanuelo = 6;
let cant = 20;
console.log(lista);
console.log(texto);

function isMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // true for mobile device
    return true;
  }
  return false;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, 2, 0.1, 50000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#canvas1") });
const geom = new THREE.BoxGeometry(1, 1, 1);
const threex = new THREEx.LocationBased(scene, camera);
// You can change the minimum GPS accuracy needed to register a position - by default 1000m
//const threex = new THREEx.LocationBased(scene, camera. { gpsMinAccuracy: 30 } );
const cam = new THREEx.WebcamRenderer(renderer, "#video1");
let orientationControls;
if (isMobile()) {
  orientationControls = new THREEx.DeviceOrientationControls(camera);
}

const oneDegAsRad = THREE.Math.degToRad(1);
// let fake = null;
let first = true;

threex.on("gpsupdate", (pos) => {
  console.log("gpsupdate");
  if (first) {
    setupObjects(pos.coords.longitude, pos.coords.latitude);
    first = false;
  }
});

threex.on("gpserror", (code) => {
  alert(`GPS error: code ${code}`);
});

// Uncomment to use a fake GPS location
//fake = { lat: 51.05, lon : -0.72 };
// if (fake) {
//   threex.fakeGps(fake.lon, fake.lat);
// } else {
threex.startGps();
// }

requestAnimationFrame(render);

let mousedown = false,
  lastX = 0;

// Mouse events for testing on desktop machine
if (!isMobile()) {
  window.addEventListener("mousedown", (e) => {
    mousedown = true;
  });

  window.addEventListener("mouseup", (e) => {
    mousedown = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!mousedown) return;
    if (e.clientX < lastX) {
      camera.rotation.y -= oneDegAsRad;
      if (camera.rotation.y < 0) {
        camera.rotation.y += 2 * Math.PI;
      }
    } else if (e.clientX > lastX) {
      camera.rotation.y += oneDegAsRad;
      if (camera.rotation.y > 2 * Math.PI) {
        camera.rotation.y -= 2 * Math.PI;
      }
    }
    lastX = e.clientX;
  });
}

function render(time) {
  if (panuelo.children.length > 0) {
    for (let i = 0; i < particulas.length; i++) {
      if (particulas[i].sinModelo) {
        particulas[i].modelo.add(panuelo.clone());
        let escala = particulas[i].random(0.7, 1.2);
        particulas[i].modelo.scale.set(escala, escala, escala);
        particulas[i].sinModelo = false;
      }
    }
  }
  mover();
  resizeUpdate();
  if (orientationControls) orientationControls.update();
  cam.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

function mover() {
  for (let i = 0; i < particulas.length; i++) {
    let acc = particulas[i].alejar(poss[0], limiteInterno);
    let acc2 = particulas[i].acercar(poss[0], limiteExterno);
    particulas[i].vel.add(acc);
    particulas[i].vel.add(acc2);
    for (let j = 0; j < particulas.length; j++) {
      if (i != j) {
        let acc3 = particulas[i].alejar(particulas[j].pos, limiteColision);
        particulas[i].vel.add(acc3);
      }
    }
    /*for (let j=0; j<4; j++) {
      let acc3 =  particulas[i].alejar(poss[j+1], radio*0.5);
      particulas[i].vel.add(acc3);
    }*/
    particulas[i].vel.clampLength(-particulas[i].velMax, particulas[i].velMax);
    particulas[i].irAlFrente();
    particulas[i].pos.add(particulas[i].vel);
    particulas[i].actualizar();
  }
}

function resizeUpdate() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth,
    height = canvas.clientHeight;
  if (width != canvas.width || height != canvas.height) {
    renderer.setSize(width, height, false);
  }
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

let particulas = [];
let panuelo = new THREE.Object3D();
function setupObjects(longitude, latitude) {
  // Use position of first GPS update (fake or real)
  if (first) {
    // let t = "";
    // t += "Longitud: " + longitude + "\n";
    // t += "Laditude: " + latitude + "\n";
    // texto.setSubtitulo(t);
    texto.remove();
  }
  cargarModelo("./modelo/panredu2.glb", panuelo);
  panuelo.scale.set(tamPanuelo, tamPanuelo, tamPanuelo);

  let objeto = new THREE.Object3D();
  // for (let i = 0; i < poss.length; i++) {
  //   let luz1 = new THREE.PointLight(0xffffff, 4, 40);
  //   let luz2 = new THREE.PointLight(0xffffff, 4, 40);
  //   luz1.position.set(poss[i].x, 30, poss[i].y);
  //   luz2.position.set(poss[i].x, -30, poss[i].y);
  //   const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  //   const material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
  //   let punto = new THREE.Mesh(geom, material);
  //   let punto2 = new THREE.Mesh(geom, material2);
  //   punto.position.set(poss[i].x, 30, poss[i].y);
  //   punto2.position.set(poss[i].x, -30, poss[i].y);
  //   objeto.add(luz1);
  //   objeto.add(luz2);
  //   objeto.add(punto);
  //   objeto.add(punto2);
  // }

  for (let i = 0; i < 360; i += 60) {
    let luz1 = new THREE.PointLight(0xffffff, 4, 35);
    let luz2 = new THREE.PointLight(0xffffff, 4, 35);
    let luz3 = new THREE.PointLight(0xffffff, 4, 35);
    let luz4 = new THREE.PointLight(0xffffff, 4, 35);
    let x = 60 * Math.cos(THREE.MathUtils.degToRad(i));
    let y = 60 * Math.sin(THREE.MathUtils.degToRad(i));
    let x2 = 30 * Math.cos(THREE.MathUtils.degToRad(i));
    let y2 = 30 * Math.sin(THREE.MathUtils.degToRad(i));
    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    // const material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    luz1.position.set(x, 30, y);
    luz2.position.set(x, -30, y);
    luz3.position.set(x2, 30, y2);
    luz4.position.set(x2, -30, y2);
    // let punto = new THREE.Mesh(geom, material);
    // let punto2 = new THREE.Mesh(geom, material2);
    // let punto3 = new THREE.Mesh(geom, material2);
    // let punto4 = new THREE.Mesh(geom, material);
    // punto.position.set(x, 30, y);
    // punto2.position.set(x, -30, y);
    // punto3.position.set(x2, 30, y2);
    // punto4.position.set(x2, -30, y2);
    objeto.add(luz1);
    objeto.add(luz2);
    objeto.add(luz3);
    objeto.add(luz4);
    // objeto.add(punto);
    // objeto.add(punto2);
    // objeto.add(punto3);
    // objeto.add(punto4);
  }

  // const light = new THREE.AmbientLight(0x909090); // soft white light
  // objeto.add(light);
  const lightHemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8);
  objeto.add(lightHemi);
  // let cant = 10;
  for (let i = 0; i < cant; i++) {
    particulas[i] = new Particula();
    objeto.add(particulas[i].modelo);
  }

  let distMin = -1;
  let indice = -1;
  for (let i = 0; i < lista.length; i++) {
    let distancia = Math.sqrt(Math.pow(lista[i].lt - latitude, 2) + Math.pow(lista[i].lg - longitude, 2));
    if (distMin < 0 || distancia < distMin) {
      distMin = distancia;
      indice = i;
    }
  }
  threex.add(objeto, lista[indice].lg, lista[indice].lt); // slightly north
  // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  // const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  // const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  // const material4 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // threex.add(new THREE.Mesh(geom, material), lista[indice].lg, lista[indice].lt); // slightly south
  // threex.add(new THREE.Mesh(geom, material3), -58.004916, -34.887014); // slightly west
  // threex.add(new THREE.Mesh(geom, material4), longitude + 0.001, latitude); // slightly east
}
