import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import {cargarModelo} from './CargarModelo.js';
import {Particula} from './Particula.js';


var particulas = [];
var panuelo = new THREE.Object3D();
var cant = 15;
var radio = 70;
var lista = [
    {lt:-34.9275039,lg:-57.9371359},
    {lt:-34.903582,lg:-57.969758},
    {lt:-34.53778008717742,lg:-58.49837191472498},  
    //{lt:-42.762936720431135,lg: -65.03450371862945},
    //{lt:-42.784705116470974,lg: -65.00860162317883},
    {lt:-42.78600319251691,lg:-65.00757861584869}
    
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

var objeto = new THREE.Object3D();
console.log("version 3 con varios puntos nuevitaaa con sistema mejorado por distancia ")
for (let i=0; i<poss.length; i++) {
    let luz1 = new THREE.PointLight( 0xffffff, 3, 100 );
    luz1.position.set(poss[i].x,50,poss[i].y);
    objeto.add( luz1 );
}

//let ambiental = new THREE.AmbientLight( 0x404040 ); // soft white light
//objeto.add( ambiental );
for (let i=0; i<cant; i++) {
  particulas[i] = new Particula();
  objeto.add(particulas[i].modelo);
}  


var texto =  document.createElement("div");
var titulo = document.createElement("h1");
var subtitulo = document.createElement("h2");
titulo.style.position = "absolute";
titulo.style.top = "10px";
titulo.style.color = "#ffffff";
subtitulo.style.color = "#ffffff";
titulo.innerText = "Espere un momento";
subtitulo.innerText = "Cargando ubicacion"
texto.append(titulo);
texto.append(subtitulo);
document.body.append(texto);

var imprimirD = true;
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
    if(imprimirD){
        var imprimir = true;
        for(var i=0;i<puntos.length;i++){
            if(puntos[i].getAttribute('distance')==undefined){
                imprimir=false;
            }
        }
        if(imprimir){
            var menor = parseFloat(puntos[0].getAttribute('distance'))
            var indice = 0;
            for(var i=1;i<puntos.length;i++){                
                console.log(puntos[i].getAttribute('distance'));
                if(parseFloat(puntos[i].getAttribute('distance'))<menor){
                    indice = i
                    menor = parseFloat(puntos[i].getAttribute('distance'));
                }
            }            
            console.log(puntos[indice]);
            puntos[indice].object3D.add( objeto );
            texto.remove();
            imprimirD = false;
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
