const Protochain = require('./protochain.js');

function prototypesCounter(object) {
  let result = 0
  const prototype = Object.getPrototypeOf(object);
  if (prototype !== null) {
    result += 1;
    console.log('prototype', prototype.name);
    result += prototypesCounter(prototype);
  }
  return result;
}

console.log(
  'Number of prototypes: ',
  prototypesCounter(Protochain.o3)
);
