const fs = require('fs');
const targetFile = '1.txt';
const BUFFER_SIZE = 1;
const buffer = Buffer.alloc(BUFFER_SIZE);

fs.promises.open(targetFile, 'r+')
  .then(({ fd: fileDescriptor }) => {
    let position = 0;
    let readBytes = 0

    do {
      readBytes = fs.readSync(fileDescriptor, buffer, 0, BUFFER_SIZE, position);
      const bufferMod = buffer.map(bf => bf + 1);
      const writeBytes = fs.writeSync(fileDescriptor, bufferMod, 0, readBytes, position);
      console.log('readBytes', readBytes);
      console.log('writeBytes', writeBytes);
      position += readBytes;
    } while (readBytes);
  })
  .catch(err => {
    console.error(err);
  });
