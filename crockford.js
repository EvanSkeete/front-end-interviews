/*
  Javascript the Good Parts: Notes
*/

/*
  Object.create creates a new oject with its prototype specified 
*/
if (typeof Object.create !== 'function'){
  Object.create = function(o){

    var F = function () {};
    F.prototype = o;
    return new F();

  };
}

/*
  typeof 
*/
var myObject = {
  prop : 'val'
};

typeof 1 == 'number';
typeof 'abc' == 'string';
typeof myObject == 'object';
typeof undefined == 'undefined';

/*
  hasOwnProperty checks object for property, does not check prototype chain 
*/
myObject.hasOwnProperty('prop') //true
myObject.hasOwnProperty('constructor') //false

/*
  delete 
*/
delete myObject.prop

/*
  function invocation 
*/
function add(a,b){
  return a+b;
}

add(2,3) // function invocation pattern

var Obj = function(param){
  this.prop = param;
};

var myObj = new Obj('val'); //constructor invocation pattern

add.apply(null, [2,3]) //apply

/*
  Arguments
*/
function write(){
  document.writeln.apply(document, arguments);
  // Slice arguments - arguments are not truly arrays 
  // but we can apply the slice method of arrays to them to 
  // turn them into arrays
  Array.prototype.slice.apply(arguments);
}

/*
  Exceptions
*/
try {
  throw {
    name : 'MadeUpError',
    message : 'this is a made up error'
  }
} catch (e) {
  console.error(e.name, e.message);
}

/*
  Recursion - tower of hanoi
*/
function hanoi (disc, src, aux, dst) {
  if (disc > 0) {
    hanoi (disc - 1, src, dst, aux);
    console.log('Move disc ' + disc + 'from ' + src + 'to' + dst);
    hanoi (disc - 1, aux, src, dst);
  }
}

/*
  Scope - javascript has no block scope but has function scope
  - might as well put all var statements at top of function
*/

/*
  Closure - inner functions have access to the variables and parameters of an 
  outer function even when the outer function has returned
*/
function addTo (a) {
  return function (b) {
    return a + b;
  }
}

var addToTwo = addTo(2);

/*
  Currying
*/
function curry (context, func) {
  var args = Array.prototype.slice.call(arguments,2);
  console.log(args);
  return function () {
    return func.apply(context, args.concat(Array.prototype.slice.call(arguments)));
  }
}

/*
  Memoization - use a closure
*/
var fibonacci = (function(){
  var memo = [0,1];
  var fib = function(n){

    if (typeof memo[n] !== 'number') {
      result = fib(n-1) + fib(n-2);
      memo[n] = result;
    }

    return result;

  };

  return fib;
})();

/*
  Array.prototype
*/

Array.prototype.concat; //concat two arrays
Array.prototype.entries; //iterator
Array.prototype.every;
Array.prototype.forEach;
Array.prototype.filter;
Array.prototype.indexOf;
Array.prototype.lastIndexOf;
Array.prototype.join; //opposite of split, joins array into string
Array.prototype.sort;
Array.prototype.map;
Array.prototype.pop;
Array.prototype.reduce;
Array.prototype.reduceRight;
Array.prototype.some;
Array.prototype.split;
Array.prototype.splice;
Array.prototype.slice;
Array.prototype.shift;
Array.prototype.unshift;

Number.prototype.toExponential() //Num to string in exp form
Number.prototype.toFixed(n) //Num to string with n decimal points
Number.prototype.toPrecision(n) //Num to string with n sig figs
Number.prototype.toString(radix) //Num to string with base = radix

String.prototype.indexOf(substr);
String.prototype.lastIndexOf(substr);
String.prototype.localCompare(substr); //Used for sorting
String.prototype.slice();
String.prototype.split();

/*
  Notes:
  minimize global vars to prevent collisions with other scripts on the page
*/


/* Bad Parts */
typeof null === 'object' //true, use x === null instead
NaN === NaN // false, use isNaN
typeof [] === 'object' // true, use Array.isArray

/*Falsy Values*/
0
NaN
''
false
null
undefined
