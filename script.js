import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import {cargarModelo} from './CargarModelo.js';
import {Particula} from './Particula.js';


var particulas = [];
var panuelo = new THREE.Object3D();
var cant = 15;
var radio = 70;
var lista = [
    {lt:-34.903582,lg:-57.969758},
    {lt:-34.53778008717742,lg:-58.49837191472498},
    {lt:-34.9275039,lg:-57.9371359},
   
    
    //{lt:-34.903582,lg:-57.969758},
    //{lt:-34.914454,lg:-57.946792}//,
           
];
var poss = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(105, 0),
  new THREE.Vector2(-105, 0),
  new THREE.Vector2(0, -105),
  new THREE.Vector2(0, 105)
];

var escena = document.querySelector('a-scene');
var puntos = [];
for(var i=0;i<3;i++){
    puntos[i] = document.createElement('a-entity');//document.getElementById('plaza');
    puntos[i].setAttribute('id','punto'+i);
    console.log("creando "+`latitude: ${lista[i].lt}; longitude: ${lista[i].lg};`);
    puntos[i].setAttribute('gps-entity-place', `latitude: ${lista[i].lt}; longitude: ${lista[i].lg};`);
    escena.appendChild(puntos[i]);
}
//cargarModelo('./modelo/panredu.glb',modelo[i]);
//modelo[i].scale.set(15,15,15);
    //escena.appendChild(punto);

cargarModelo('./modelo/panredu2.glb',panuelo);
panuelo.scale.set(15,15,15);

var objetos = []
for(var p=0;p<puntos.length;p++){
    console.log("version 2 con varios puntos "+p)
    objetos[p] = new THREE.Object3D();
    for (let i=0; i<poss.length; i++) {
        let luz1 = new THREE.PointLight( 0xffffff, 3, 100 );
        luz1.position.set(poss[i].x,50,poss[i].y);
        objetos[p].add( luz1 );
    }

//let ambiental = new THREE.AmbientLight( 0x404040 ); // soft white light
//objeto.add( ambiental );
    for (let i=0; i<cant; i++) {
      particulas[p*cant+i] = new Particula();
      objetos[p].add(particulas[p*cant+i].modelo);
    }
    puntos[p].object3D.add( objetos[p] );
    
}

console.log(puntos[0]);

function animar(){
    requestAnimationFrame(animar);
    if(panuelo.children.length > 0){
        for (let i=0; i<cant; i++) {
            if(particulas[i].sinModelo){
                particulas[i].modelo.add(panuelo.clone());
                particulas[i].sinModelo = false;
            }
        }
    }
    mover();
}

animar();


function mover() {
  for (let i=0; i<particulas.length; i++) {
    let acc =  particulas[i].alejar(poss[0], 30);
    let acc2 =  particulas[i].acercar(poss[0], 140);
    particulas[i].vel.add(acc);
    particulas[i].vel.add(acc2);
    for (let j=0; j<cant; j++) {
      if (i!=j) {
        let acc3 =  particulas[i].alejar(particulas[j].pos, 15);
        particulas[i].vel.add(acc3);
      }
    }
    /*for (let j=0; j<4; j++) {
      let acc3 =  particulas[i].alejar(poss[j+1], radio*0.5);
      particulas[i].vel.add(acc3);
    }*/
    particulas[i].vel.clampLength(-particulas[i].velMax,particulas[i].velMax);
    particulas[i].pos.add(particulas[i].vel);
    particulas[i].actualizar();
  }
}
