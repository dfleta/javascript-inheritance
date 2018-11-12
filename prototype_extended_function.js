/**
 * range2.js: Another class representing a range of values.
 * 
 * This is a constructor function that initializes new Range objects.
 * Note that it does not create or return the object. It just initializes this.
 * 
 * JavaScript. the Definitive Guide. David Flanagan.
 */

  

// This is a constructor function that initializes new Range objects.
// Note that it does not create or return the object. It just initializes this.

// El nombre de la funcion ahora va en mayusculas por convencion
// Indica al programador/a que esta funcion se invoca con new
function Range(from, to) {
    // Store the start and end points (state) of this new range object.
    // These are noninherited properties that are unique to this object.
    this.from = from;
    this.to = to;
}


// All Range objects inherit from this object.
// Note that the property name must be "prototype" for this to work. =>
// Cuando invocamos a Range() con new automaticamente se usa 
// Range.prototype como prototipo del nuevo objeto

// Ahora no sobreescribimos el prototipo de Range
Range.prototype.includes = function(x) { return this.from <= x && x <= this.to; };

Range.prototype.foreach = function(f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
};
Range.prototype.toString = function() { return "(" + this.from + "..." + this.to + ")"; };


// Here are example uses of a range object
var r = new Range(1,3);   // Create a range object
r.includes(2);            // => true: 2 is in the range
r.foreach(console.log);   // Prints 1 2 3
console.log(r);           // Prints (1...3)


// Range es el contructor de r => r es instancia de Range
console.log(r instanceof Range);

// Pero Range no es el prototipo de r
console.log(Range.isPrototypeOf(r));

// la propiedad constructor es un objeto, no un string
console.log(Range.constructor.toString());

// Como no hemos sobreescrito la propiedad constructor de la funcion Range
// ya que hemos extendido el prototipo
// la propiedad constructor de r sera Range
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