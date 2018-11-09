/**
 * range.js: A class representing a range of values.  
 * This is a factory function that returns a new range object.
 * 
 * JavaScript. the Definitive Guide. David Flanagan.
 */


// inherit() returns a newly created object that inherits properties from the
// prototype object p.  It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
function inherit(p) {
    if (p == null) throw TypeError(); // p must be a non-null object
    if (Object.create)                // If Object.create() is defined...
        return Object.create(p);      //    then just use it.
    var t = typeof p;                 // Otherwise do some more type checking
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {};                  // Define a dummy constructor function.
    f.prototype = p;                  // Set its prototype property to p.
    return new f();                   // Use f() to create an "heir" of p.
}


function range(from, to) {
    // Use the inherit() function to create an object that inherits from the
    // prototype object defined below.  The prototype object is stored as
    // a property of this function, and defines the shared methods (behavior)
    // for all range objects.
    var r = inherit(range.methods); // lo crea con Object.create()

    // Store the start and end points (state) of this new range object.
    // These are noninherited properties that are unique to this object.
    r.from = from;
    r.to = to;

    // Finally return the new object
    return r;
}


// This prototype object defines methods inherited by all range objects.
range.methods = {
    // Return true if x is in the range, false otherwise
    // This method works for textual and Date ranges as well as numeric.
    includes: function(x) { return this.from <= x && x <= this.to; },
    // Invoke f once for each integer in the range.
    // This method works only for numeric ranges.
    foreach: function(f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    // Return a string representation of the range
    toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};


// Here are example uses of a range object.
var r = range(1,3);      // Create a range object
r.includes(2);           // => true: 2 is in the range
r.foreach(console.log);  // Prints 1 2 3
console.log(r);          // Prints (1...3)

// instanceOf y isPrototypeOf permiten chequear si
// el prototipo especificado esta en la cadena de herencia
// pero no sirven para obtener la clase del objeto 
console.log(r instanceof range);
console.log(range.methods.isPrototypeOf(r));
console.log(Object.prototype.isPrototypeOf(r));

console.log(r.constructor.toString());


// Para acceder al atributo class de un objeto: de manera indirecta con toString
// instanceOf funciona de facto como el operador para obtener la clase de un objeto
/**
 * Objects created through object literals or by Object.create 
 * have a class attribute of “Object”. If you define your own
 * constructor function, any objects you create with it 
 * will have a class attribute of “Object”: 
 * there is no way to specify the class attribute for your own classes of objects
 */
console.log(Object.prototype.toString.call(r).slice(8, -1));