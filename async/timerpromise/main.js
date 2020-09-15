import Timer from 'timerpromise';

(async () => {
  console.time('Total time')
  
  console.time('First time')
  await (new Timer(2)).start;
  console.timeEnd('First time')
  
  console.time('Second time')
  await (new Timer(3)).start;
  console.timeEnd('Second time')
  
  console.timeEnd('Total time')
})();
