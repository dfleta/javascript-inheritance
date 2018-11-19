/**
 * También se pueden extender las clases 
 * tradicionales basadas en funciones
 * 
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Classes
 * */


function Animal (nombre) {
    this.nombre = nombre;
  }
  
Animal.prototype.hablar = function () {
    console.log(this.nombre + ' hace un ruido.');
}
  
class Perro extends Animal {
    hablar() {
        // super funciona como se espera
        super.hablar();
        console.log(this.nombre + ' ladra.');
    }
  }
  
var p = new Perro('Mitzie');
p.hablar();