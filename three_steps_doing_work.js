/*
 * Complex.js:
 * This file defines a Complex class to represent complex numbers.
 * Recall that a complex number is the sum of a real number and an
 * imaginary number and that the imaginary number i is the square root of -1.
 * 
 *  JavaScript. the Definitive Guide. David Flanagan.
 */


/*
 * This constructor function defines the instance fields r and i on every
 * instance it creates.  These fields hold the real and imaginary parts of
 * the complex number: they are the state of the object.
 */
function Complex(real, imaginary) {
    if (isNaN(real) || isNaN(imaginary)) // Ensure that both args are numbers.
        throw new TypeError();           // Throw an error if they are not.
    this.r = real;                       // The real part of the complex number.
    this.i = imaginary;                  // The imaginary part of the number.

    // objeto mutable en Complex
    this.representation = {
        x: this.r,
        y: this.y,
    };
}


/*
 * The instance methods of a class are defined as function-valued properties
 * of the prototype object.  The methods defined here are inherited by all
 * instances and provide the shared behavior of the class. Note that JavaScript
 * instance methods must use the this keyword to access the instance fields.
 */


// Add a complex number to this one and return the sum in a new object.
Complex.prototype.add = function(that) {
    return new Complex(this.r + that.r, this.i + that.i);
};

// Multiply this complex number by another and return the product.
Complex.prototype.mul = function(that) {
    return new Complex(this.r * that.r - this.i * that.i,
                       this.r * that.i + this.i * that.r);
};

// Return the real magnitude of a complex number. This is defined
// as its distance from the origin (0,0) of the complex plane.
Complex.prototype.mag = function() {
    return Math.sqrt(this.r*this.r + this.i*this.i);
};

// Return a complex number that is the negative of this one.
Complex.prototype.neg = function() { return new Complex(-this.r, -this.i); };

// Convert a Complex object to a string in a useful way.
Complex.prototype.toString = function() {
    return "{" + this.r + "," + this.i + "}";
};

// Test whether this Complex object has the same value as another.
Complex.prototype.equals = function(that) {
    return that != null &&                      // must be defined and non-null
        that.constructor === Complex &&         // and an instance of Complex 
        this.r === that.r && this.i === that.i; // and have the same values.
};


/*
 * Class fields (such as constants) and class methods are defined as 
 * properties of the constructor. Note that class methods do not 
 * generally use the this keyword: they operate only on their arguments.
 */

// Here are some class fields that hold useful predefined complex numbers.
// Their names are uppercase to indicate that they are constants.
// (In ECMAScript 5, we could actually make these properties read-only.)
Complex.ZERO = new Complex(0,0);
Complex.ONE = new Complex(1,0);
Complex.I = new Complex(0,1);

// This class method parses a string in the format returned by the toString
// instance method and returns a Complex object or throws a TypeError.
Complex.parse = function(s) {
    try {          // Assume that the parsing will succeed
        var m = Complex._format.exec(s);  // Regular expression magic
        return new Complex(parseFloat(m[1]), parseFloat(m[2]));
    } catch (x) {  // And throw an exception if it fails
        throw new TypeError("Can't parse '" + s + "' as a complex number.");
    }
};

// A "private" class field used in Complex.parse() above.
// The underscore in its name indicates that it is intended for internal
// use and should not be considered part of the public API of this class.
Complex._format = /^\{([^,]+),([^}]+)\}$/;


/**
 * "Testing"
 */

var c = new Complex(2, 3);              // Create a new object with the constructor
var d = new Complex(c.i, c.r);          // Use instance properties of c
c.add(d).toString();                    // => "{5,5}": use instance methods
// A more complex expression that uses a class method and field
Complex.parse(c.toString()).            // Convert c to a string and back again,
    add(c.neg()).                       // add its negative to it,
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

// creamos dinamicamente un metodo en el prototipo
Complex.prototype.action = function() {     
    return "a tope desde el prototipo";
};
console.log("en d " + d.action());        // prototype chain: vence la propiedad local de d
console.log("en c " + c.action());        // c tiene el nuevo metodo
