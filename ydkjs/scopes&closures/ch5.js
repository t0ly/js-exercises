/**
 * Created by toly on 29.04.17.
 https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md
 */

/* Closure example
function foo() {
  const a = 2;

  function bar() {
    console.log(a);
  }

  return bar;
}

const baz = foo();

// baz();

// Real-life closure example

function wait(message) {
  setTimeout((t => console.log(message)), 1000);
}

wait('Hello, closure!');

*/
/*

for ( var i=1; i<=5; i++) {

  setTimeout( function timer(){
    console.log( i );
  }, i*1000 );
// Notice var behavior

// for (let i = 1; i <= 5; i++) {
//   setTimeout((y => console.log(i)), i * 1000);
// }
//
}

// let is block-scoped in the for loop
for (let j = 1; j < 6; j++) {
  setTimeout(function write() {
    console.log(`j= ${j}`);
  }, j * 1000);
}
*/

// MODULES PATTERN
/*

var foo = (function CoolModule(id) {
  function change() {
    // modifying the public API
    publicAPI.identify = identify2;
  }

  function identify1() {
    console.log( id );
  }

  function identify2() {
    console.log( id.toUpperCase() );
  }

  var publicAPI = {
    change: change,
    identify: identify1
  };

  return publicAPI;
})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE

*/


// Define module manager

const MyModules = (function Manager() {
  const modules = {};

  function define(name, deps, impl) {
    for (let i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define,
    get,
  };
}());

// Use the module manager to create modules

MyModules.define('introduce', [], () => {
  function hello(who) {
    return `Let me introduce:  ${who}`;
  }

  return {
    hello,
  };
});

MyModules.define('identifier', ['introduce'], (introduce) => {
  let identity = 'hippo';

  function upperMe() {
    console.log(introduce.hello(identity).toUpperCase());
  }

  return {
    upperMe,
  };
});

let introMe = MyModules.get('introduce');
let idMe = MyModules.get('identifer');

console.log(introMe.hello('hippo'));

// Let me introduce: hippo

idMe.upperMe(); // LET ME INTRODUCE: HIPPO
