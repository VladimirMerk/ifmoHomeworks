customElements.whenDefined('time-formatted').then(() => {
  console.log('time-formatted is defined', customElements.get('time-formatted'))
})

class TimeFormatted extends HTMLElement {
  constructor() {
    super();
    console.log('TimeFormatted constructor');
  }
  render() {
    let date = new Date(this.getAttribute('datetime') || Date.now());
    this.innerHTML = new Intl.DateTimeFormat('default', {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined
    }).format(date)
  }
  static get observedAttributes() {
    return [
      'datetime', 'year', 'month', 'day', 'hour', 'minute', 'second',
      'time-zone-name'
    ];
  }
  attributeChangedCallback() {
    this.render();
  }
  connectedCallback() {
    console.log('TimeFormatted connected')
    if (! this.renderred) {
      this.renderred = true;
      this.render();
    }
  }
}

class LiveTimer extends TimeFormatted {
  constructor() {
    super();
  }
  connectedCallback() {
    if (! this.timer) {
      this.timer = setInterval(() => {
        this.render()
        const event = new CustomEvent('tick', { 'detail': this.date });
        this.dispatchEvent(event)
      }, 1000)
    }
  }
  disconnectedCallback() {
    if (this.timer) { // Обязательно удаляем таймер при удалении элемента
      clearInterval(this.timer)
      this.timer = null
    }
  }
}

class HelloButton extends HTMLButtonElement {
  constructor() {
    super()
    this.addEventListener('click', () => alert('Привет'))
  }
}

class MyElement extends HTMLElement {
  constructor() {
    super();
    console.log('MyElement create')
  }

  connectedCallback() {
    // Вызывается при добавлении элемента
    // innerHTML здесь ещё не доступен, т.к. браузер сначала вставляет этот
    // элемент, вызываея connected, а уже затем вставляет дочерние эелементы,
    // включая text nodes
    //
    // Можно включить setTimeout с нулевой задержкой. Он выполнится уже после
    // парсинга HTML
    //
    // Если у дочерних тоже применяется этот способ, то в начале завершится
    // таймер родительского элемента
  }

  disconnectedCallback() {
    // Вызывается при удалении элемента
  }

  static get observedAttributes() {
    return [/* массив аттрибутов для отслеживания их изменений */]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Вызывается для аттрибутов указанных в observedAttributes
  }

  adoptedCallback() {
    // вызывается при перемещении в новый документ. (document.adoptNode)
  }
}

customElements.define('my-element', MyElement);

setTimeout(() => {
  customElements.define('time-formatted', TimeFormatted);
}, 1000)
customElements.define('live-timer', LiveTimer)

customElements.define('hello-button', HelloButton, {extends: 'button'});
