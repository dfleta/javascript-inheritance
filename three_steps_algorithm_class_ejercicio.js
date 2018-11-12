/*
 * Complex.js:
 * This file defines a Complex class to represent complex numbers.
 * Recall that a complex number is the sum of a real number and an
 * imaginary number and that the imaginary number i is the square root of -1.
 * 
 * We can reduce the process of class definition in JavaScript 
 * to a three-step algorithm.
 * - First, write a constructor function that sets instance properties
 * on new objects. 
 * - Second, define instance methods on the prototype object of 
 * the constructor. 
 * - Third, define class fields and class properties 
 * on the constructor itself.
 * 
 *  JavaScript. the Definitive Guide. David Flanagan.
 */


/*
 * This constructor function defines the instance fields r and i on every
 * instance it creates.  These fields hold the real and imaginary parts of
 * the complex number: they are the state of the object.
 * 
 * La funcion se llama Complex(real, imaginary)
 * 
 */


/*
 * The instance methods of a class are defined as function-valued properties
 * of the prototype object.  The methods defined here are inherited by all
 * instances and provide the shared behavior of the class. Note that JavaScript
 * instance methods must use the this keyword to access the instance fields.
 */


// Add a complex number to this one and return the sum in a new object.
// tu codigo aqui

// Multiply this complex number by another and return the product.
// tu codigo aqui

// Return the real magnitude of a complex number. This is defined
// as its distance from the origin (0,0) of the complex plane.
// tu codigo aqui

// Return a complex number that is the negative of this one.
// tu codigo aqui

// Convert a Complex object to a string in a useful way.
// tu codigo aqui

// Test whether this Complex object has the same value as another.
// tu codigo aqui


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
    equals(Complex.ZERO);               // and it will always equal zero
