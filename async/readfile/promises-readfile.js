const { promises: { readFile: pr } } = require('fs');

pr('package.json')
.then(data => console.log('Data:', data.toString()))
.catch(error => console.error('Error:', error));
