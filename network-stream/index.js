const http = require('http');

const nSize = 33;
const options = {
  hostname: 'kodaktor.ru',
  port: 80,
  path: `/api2/buffer2/${nSize}`
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let count = 0;
  let receivedBytes = 0;
  let receivedBytesBeforeString = 0;
  let receivedString = '';
  
  res.on('data', (chunk) => {
    const bytesArray = new Uint8Array(chunk);

    const filtered = bytesArray.filter((byte) => byte);
    if (filtered.length) {
      receivedBytesBeforeString = receivedBytes;
      receivedString = new TextDecoder('utf-8').decode(filtered);
      // console.log('\x1b[31m', 'Break stream', '\x1b[0m');
      // res.destroy();
    }

    count         += 1;
    receivedBytes += bytesArray.length;
  });

  res.on('end', () => {
    console.log('_________________________');
    console.log('');
    if (!res.complete) {
      console.error('The connection was terminated while the message was still being sent');
    } else {
      console.log('No more data in response.');
    }
    console.log(
      `Received \x1b[33m${receivedBytes}\x1b[0m bytes` +
      ` in \x1b[33m${count}\x1b[0m chunks`
    );
    
    console.log(`Size bytes of N: `, receivedBytes / nSize);

    console.log(
      `Received \x1b[33m${receivedBytesBeforeString}\x1b[0m bytes` +
      ` before string`
    );

    console.log(`Received string: \x1b[33m${receivedString}\x1b[0m`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
