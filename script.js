import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';


var lista = [
    {lt:-34.9209,lg:-57.9415},
    {lt:-34.9220,lg:-57.9388},
    {lt:-34.9209,lg:-57.9384},
    {lt:-34.9219,lg:-57.9400}
];

var escena = document.querySelector('a-scene');

for(var i=0;i<lista.length;i++){
    var punto = document.createElement('a-entity');//document.getElementById('plaza');
    punto.setAttribute('id','punto'+i);
    //punto.setAttribute('gps-entity-place', 'latitude: '+listap[0].lt+' longitude: '+listap[0].lg+';');
    punto.setAttribute('gps-entity-place', `latitude: ${lista[i].lt}; longitude: ${lista[i].lg};`);
    escena.appendChild(punto);
    var material = new THREE.MeshStandardMaterial( {color:0xffffff*Math.random()} );
    var geometry = new THREE.BoxBufferGeometry( 15, 15, 15 );
    var modelo = new THREE.Mesh( geometry, material );
    punto.object3D.add( modelo );
}

function random(min,max){
    return min+Math.random()*(max-min)
}



var velMax = 0.01;
var poss = [
new THREE.Vector2(),
new THREE.Vector2(random(-250,250),random(-250,250))
];
var pos = new THREE.Vector2();
var vel = new THREE.Vector2(random(-velMax,velMax),random(-velMax,velMax));

function mover() {
      requestAnimationFrame(mover);
  for(let i=0;i<poss.length;i++){
    let vecInfo = alejar(poss[i]);
    if(vecInfo.usable){
        vel.add(vecInfo.vec);
        vel.clampLength(-velMax,velMax);
        pos.add(vel);
    }
 }
}

mover();

function alejar(vec) {
  var desiredseparation = 70;
  var d = vec.distanceTo(pos);
  var usable =  true;
   var diff = new THREE.Vector2();
  if (d!=0 && (d < desiredseparation)) {
      diff.subVectors(pos, vec);
      diff.normalize();
      diff.divideScalar(d);
  }else{
      usable = false
  }

  if (diff.length() > 0 && usable) {
    diff.normalize();
    diff.sub(vel);
    diff.clampLength(-velMax,velMax);
  }
  return {usable:usable, vec:diff};
}
