const { Transform } = require('stream');

/**
 * Модифицирует элементы буфера добавляя к ним единицу
 */
class StreamIncrement extends Transform {
  _transform(chunk, encoding, callback) {
    console.log('chunk', chunk);
    try {
      callback(null, chunk.toString().split().map(char => ++char).join());
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = StreamIncrement;
