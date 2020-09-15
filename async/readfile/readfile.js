const { readFile } = require('fs');
const pr = filename => new Promise((resolve, reject) => {
  readFile(filename, (err, data) => {
    if (err) reject(err)
    resolve(data);
  });
});

pr('package.json')
.then(data => console.log('Data:', data.toString()))
.catch(error => console.error('Error:', error));
