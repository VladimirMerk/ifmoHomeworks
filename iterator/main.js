class Iterable {
  constructor (length) {
    this.length = length;
    this.current = 0;
  }

  [Symbol.iterator] = () => this;

  next () {
    if (this.current < this.length) {
      this.current++;
      return { done: false, value: this.valueGenerator() }
    } else {
      return { done: true }
    }
  }

  valueGenerator () {
    return (Math.ceil(Math.random() * 100 / 2) / 100 * 4).toFixed(2);
  }
}

const it = new Iterable (3);

console.log([...it]);
