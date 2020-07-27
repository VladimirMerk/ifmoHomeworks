const { ReadStream, WriteStream, promises: fs } = require('fs');
const StreamIncrement = require('./StreamIncrement.js');
const targetFile = '1.txt';
const tmpFile = '2.txt';

// Создаём поток чтения с размером буфера 1 байт
const reader = new ReadStream(targetFile, { highWaterMark: 1 });
const writer = new WriteStream(tmpFile);
const incrementer = new StreamIncrement();

reader.pipe(incrementer).pipe(writer);

writer.on('close', () => {
  console.log('writer end');
  fs.unlink(targetFile)
  .then(fs.rename(tmpFile, targetFile))
  .then(() => {
    console.log('All done!');
  });
});
