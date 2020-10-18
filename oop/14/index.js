const { o3: obj } = require('./protochain.js');

function getPrototypes(object) {
  const result = []
  const prototype = Object.getPrototypeOf(object);
  
  if (prototype) {
    result.push(prototype.name);
    result.push(...getPrototypes(prototype));
  }

  return result;
}

console.log('getPrototypes(obj)', getPrototypes(obj));
