const should = require('should');
const { get } = require('axios');

const cases = [
  { n: 15, xn: 0, },
  { n: 99, xn: 1 },
  { n: 357603, xn: 99 },
  { n: 4603693766883, xn: 357603 }
];

cases.forEach(({ n , xn }) => {
  describe(`${n} andba api`, () => {
    it (`should respond ${xn}`, async () => {
      const url = `http://kodaktor.ru/api2/andba/${n}`;
      const { data } = await get(url);
      data.should.equal(xn);
    });
  });
});
