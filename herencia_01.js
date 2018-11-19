
/**
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Classes
 */


class Animal {

  constructor(nombre) {
    this.nombre = nombre;
  }

  hablar() {
    console.log(this.nombre + ' hace un ruido.');
  }
}


class Perro extends Animal {
  hablar() {
    console.log(this.nombre + ' ladra.');
  }
}


var perro = new Animal("Doc");
perro.hablar();


var perrico = new Perro("Marti");
perrico.hablar();

console.log("perro es instancia de Animal: ", perro instanceof Animal);  
console.log("perrico es instancia de Animal: ", perrico instanceof Animal);
console.log("perrico es instancia de Perro: ", perrico instanceof Perro);  


/**
 * "Una importante diferencia entre las declaraciones de funciones
 * y las declaraciones de clases es que las declaraciones de funciones
 * son izadas y las declaraciones de clases no lo son. 
 * En primer lugar necesitas declarar tu clase y luego acceder a ella, 
 * de otra modo el ejemplo de código siguiente arrojará un ReferenceError.""
 * 
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Classes
 */

 var perrucho = new Perraco("McFly");

 class Perraco extends Perro {

    saluda() {
      console.log("muevo la pata");
    }
 }