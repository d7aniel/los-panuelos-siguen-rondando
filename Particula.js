import * as THREE from "https://unpkg.com/three@0.122.0/build/three.module.js";

export class Particula {
  constructor(geo, mat) {
    this.velMax = 0.07;
    this.pos = new THREE.Vector2(this.random(-6.5, 6.5), this.random(-6.5, 6.5));
    this.vel = new THREE.Vector2(this.random(-this.velMax, this.velMax), this.random(-this.velMax, this.velMax));
    this.modelo = new THREE.Object3D();
    this.sinModelo = true;
    this.altura = this.random(-3, 6);
    this.rot = 0;
    //this.modelo =  new THREE.Mesh( geo,mat );
  }

  alejar(vec, radio) {
    var desiredseparation = radio;
    var d = vec.distanceTo(this.pos);

    if (d != 0 && d < desiredseparation) {
      var diff = new THREE.Vector2();
      diff.subVectors(this.pos, vec);
      diff.normalize();
      diff.divideScalar(d);
      diff.normalize();
      diff.sub(this.vel);
      diff.clampLength(-this.velMax, this.velMax);
      return diff;
    } else {
      return new THREE.Vector2(0, 0);
    }
  }
  irAlFrente() {
    let anguloFrente = THREE.MathUtils.lerp(this.rot, Math.atan2(this.vel.y, this.vel.x), 0.1);
    let anguloCentro = Math.atan2(this.pos.y, this.pos.x);
    let distCentro = Math.sqrt(Math.pow(this.pos.y, 2) + Math.pow(this.pos.x, 2));
    let x = distCentro * Math.cos(anguloCentro + 0.01);
    let y = distCentro * Math.sin(anguloCentro + 0.01);
    let vec = new THREE.Vector2(x, y);
    var diff = new THREE.Vector2();
    diff.subVectors(vec, this.pos);
    diff.normalize();
    diff.multiplyScalar(this.velMax);
    var steer = new THREE.Vector2();
    steer.subVectors(diff, this.vel);
    let acc = steer.clampLength(-0.1, 0.1);
    if (this.random(100) < 70) {
      this.vel.add(acc);
    }
  }
  actualizar() {
    if (this.modelo != undefined) {
      this.rot = THREE.MathUtils.lerp(this.rot, Math.atan2(this.vel.y, this.vel.x), 0.05);
      this.modelo.rotation.set(0, this.rot, 0);
      // - Math.PI * 0.25
      this.modelo.position.set(this.pos.x, this.altura, this.pos.y);
    }
  }

  acercar(vec, radio) {
    var neighbordist = radio;
    var diff = new THREE.Vector2();
    var d = vec.distanceTo(this.pos);
    if (d > neighbordist) {
      diff.subVectors(vec, this.pos);
      diff.normalize();
      diff.multiplyScalar(this.velMax);
      var steer = new THREE.Vector2();
      steer.subVectors(diff, this.vel);
      return steer.clampLength(-this.velMax, this.velMax);
    } else {
      return new THREE.Vector2();
    }
  }

  random(min, max) {
    return min + Math.random() * (max - min);
  }
}
