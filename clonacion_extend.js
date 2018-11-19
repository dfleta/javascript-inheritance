/**
 * The primary difference between cloning and delegation (Object.create)
 * is that cloning will copy the value of each property 
 * for every object instance, whereas delegation is 
 * more memory efficient. It stores only one copy of each
 * default property setting until you need to override properties
 * at the instance level.
 * 
 * It’s often a good idea to employ a mix of both techniques
 * Delegation => shared methods
 * Cloning => datos unicos en cada instancia
 * 
 * Programming JavaScript Applications. Eric Elliot.
 */


// funcion extend del tema anterior revisitada
var extend = function extender(p, o) {
    var names = Object.getOwnPropertyNames(o);
                for(var i = 0; i < names.length; i++) {
                    if (names[i] in p) continue;
                    var desc = Object.getOwnPropertyDescriptor(o,names[i]);
                    Object.defineProperty(p, names[i], desc);
                }
    return p;
};


var o = {
            x: 1,
            y: 1, 
            z: 1,
            get r() { return Math.sqrt(this.x*this.x + this.y*this.y); },
            meta: {
                name: "delorean",
            },
        };


var p = extend({}, o);
var q = extend({}, o);

console.log("x se ha copiado en p: " + p.x);
console.log("x se ha copiado en q: " + p.x);

console.log("o no es prototipo de p: ", o.isPrototypeOf(p));    // false
console.log("Object es prototipo de p: " + Object.prototype.isPrototypeOf(p));     // true
console.log("Propiedad class del objeto p: " + Object.prototype.toString.call(p).slice(8, -1));

p.x = 2;
// los datos son propios de cada instancia (igual que con Object.create)
console.log(q.x);

// las mutaciones en objetos se comparten (igual que con Object.create)
console.log("name en p: " + p.meta.name);
q.meta.name = "doc";
console.log("name en p ha cambiado: " + p.meta.name);
console.log("name en o ha cambiado: " + o.meta.name);

// reemplazar una propiedad es especifico de la instancia

p.meta = {
    name: "mcfly",
};
console.log("en q meta.name sigue siendo doc: " + q.meta.name);



    