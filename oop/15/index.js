class Father {
  constructor (name = 'Darth') {
    this.name = name.toUpperCase();
  }
  get myName() {
    return this.name;
  }
}

class Son extends Father {
  constructor (name) {
    super();
    this.fatherName = this.name;
    this.name = name;
  }
  get myName() {
    return `${this.name} ${this.fatherName}'s son`;
  }
}

const father1 = new Father();
console.log('father1.myName', father1.myName);

const son1 = new Son('Luke');
console.log('son1.myName', son1.myName); // Luke DARTH's son
