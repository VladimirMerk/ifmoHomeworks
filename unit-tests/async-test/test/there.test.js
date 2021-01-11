const should = require('should');
const { get } = require('axios');

const cases = [
  { n: 0, xn: 15 },
  { n: 1, xn: 99 },
  { n: 99, xn: 357603 },
  { n: 357603, xn: 4603693766883 }
];

cases.forEach(({ n , xn }) => {
  describe(`${n} there api`, () => {
    it (`should respond ${xn}`, async () => {
      const url = `http://kodaktor.ru/api2/there/${n}`;
      const { data } = await get(url);
      data.should.equal(xn);
    });
  });
});
