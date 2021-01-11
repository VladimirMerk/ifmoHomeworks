const should = require('should');
const { get } = require('axios');

const cases = arrayRange(-1, 11);

cases.forEach((n) => {
  describe(`${n} there and back api`, () => {
    it (`should respond ${n}`, async () => {
      const urlThere = `http://kodaktor.ru/api2/there/${n}`;
      const { data: dataThere } = await get(urlThere);
      const urlBack = `http://kodaktor.ru/api2/andba/${dataThere}`;
      const { data: dataBack } = await get(urlBack);
      dataBack.should.equal(n);
    });
  });
});

function arrayRange( start, end ) {
  const length = Math.abs(end - start) + 1 ;
  return Array.from({ length }, (_, i) => (i + start));
}
