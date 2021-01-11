const { get } = require('axios');

(async () => {
  const url = `http://kodaktor.ru/api2/there/1`;
  const { data } = await get(url);
  console.log('data', data)
})();


(async () => {
  const url = `http://kodaktor.ru/api2/andba/99;
  const { data } = await get(url);
  console.log('data', data)
})();
