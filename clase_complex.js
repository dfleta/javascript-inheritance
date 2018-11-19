/*
 * Complex.js:
 * This file defines a Complex class to represent complex numbers.
 * 
 * Echarle un ojo a:
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Classes
 *  
 *  JavaScript. the Definitive Guide. David Flanagan.
 */


class Complex {

    constructor(real, imaginary) {

        if (isNaN(real) || isNaN(imaginary))
            throw new TypeError();
        this.r = real;
        this.i = imaginary;
        // objeto mutable en Complex
        this.representation = {
            x: this.r,
            y: this.y,
        };      
    }

    // Class declarations currently allow only methods—properties 
    // that hold functions—to be added to the prototype.

    // El nombre de la funcion seguido de los argumentos, sin function
    // Usamos this keyword para acceder a las propiedades de instancia

    add(that) {
        return new Complex(this.r + that.r, this.i + that.i);
    }
    
    muliply(that) {
        return new Complex(this.r * that.r - this.i * that.i,
                           this.r * that.i + this.i * that.r);
    }

    magnitude() {
        return Math.sqrt(this.r*this.r + this.i*this.i);
    }
    
    negative() { return new Complex(-this.r, -this.i); }

    toString() {
        return "{" + this.r + "," + this.i + "}";
    }

    equals(that) {
        return that != null &&                   
            that.constructor === Complex && 
            this.r === that.r && this.i === that.i; 
    }

    // metodo estatico se comportan como se espera:
    // son llamados sin instanciar la clase
    static parse(s) {
        try {
            var m = Complex._format.exec(s);
            return new Complex(parseFloat(m[1]), parseFloat(m[2]));
        } catch (x) {
            throw new TypeError("Can't parse '" + s + "' as a complex number.");
        }
    }
}

// Class fields
Complex.ZERO = new Complex(0,0);
Complex.ONE = new Complex(1,0);
Complex.I = new Complex(0,1);

// A "private" class field used in Complex.parse() above.
// The underscore in its name indicates that it is intended for internal
// use and should not be considered part of the public API of this class.
Complex._format = /^\{([^,]+),([^}]+)\}$/;


/**
 * "Testing"
 */

var c = new Complex(2, 3);
var d = new Complex(c.i, c.r);
c.add(d).toString();                    // => "{5,5}": use instance methods
// A more complex expression that uses a class method and field
Complex.parse(c.toString()).            // Convert c to a string and back again,
    add(c.negative()).                       // add its negative to it,
    equals(Complex.ZERO);                // and it will always equal zero


/**
 * Segun lo visto en el carnero, los ejercicos a hacer
 * deberian demostrar la copia y mutacion de propiedades
 * del prototipo.
 */

console.log("c es instancia de Complex: ", c instanceof Complex);
console.log("d es instancia de Complex: ", d instanceof Complex);

d.r = 10;                   // modificamos copia en la instancia
console.log("valor propiedad no cambia en prototipo: ", d.r != c.r);    // true

d.i = {                     // sobreescribimos propiedad en la instancia
    value: 10,
    identifier: 'i',
};

console.log("identifier en la instancia: " + d.i.identifier);    // 'i'
console.log("identifier en el prototipo: " + c.i.identifier);
// undefined , la propiedad sobreescrita no se propaga al prototipo

d.propia = "numero complejo";
console.log("d tiene nueva propiedad propia: " + d.propia);      
console.log("pero el prototipo no: ", c.propia);      
// undefined, la propiedad de instancia de d no se propaga al prototipo

// aunque mutemos una propiedad objeto, no se propaga al prototipo
console.log("representacion en d: " + d.representation.x);    
d.representation.x = 100;           // no estamos usando Object.create sino new
console.log("representacion en c: " + c.representation.x);

// los metodos añadidos en una instancia solo viven en la instancia
d.action = function() {     
    return "a tope desde la instancia";
};
console.log("action vive en d: " + d.action());
// console.log(c.action());     // error: action no existe en c

// creamos dinamicamente un metodo en el prototipo de la clase
Complex.prototype.action = function() {     
    return "a tope desde el prototipo";
};
console.log("en d " + d.action());        // prototype chain: vence la propiedad local de d
console.log("en c " + c.action());        // c tiene el nuevo metodo
