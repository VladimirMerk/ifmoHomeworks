'use strict'
{
  class Product {
    constructor({ id, name, price } = {}) {
      this.id = id;
      this.name = name;
      this.price = Number(price);
    }
  }

  class CartItem {
    constructor({ product, count = 0 } = {}) {
      this.id = product.id;
      this.product = product;
      this.count = count;
    }
    increase(num = 1) {
      this.count += num;
    }
    decrease(num = 1) {
      this.count -= num;
    }
  }

  class ShopController {
    static DATA_URL = 'https://kodaktor.ru/cart_data.json';
    static MSG = {
      overLimit: `Ваша кредитная карта не расчитана на сумму больше {budgetLimit}`,
      lessBudget: `Бюджет не может быть меньше чем сумма товаров в корзине`
    }
    constructor({ productPlace, cartPlace, productTemplate } = {}) {
      this.products = [];
      this.cart = [];
      this.budgetLimit = this.loadBudget() || 0;

      this.elements = {
        products: {
          main: document.querySelector('[data-products]'),
          list: document.querySelector('[data-products] [data-products-list]'),
        },
        cart: {
          main: document.querySelector('[data-cart]'),
          list: document.querySelector('[data-cart] [data-products-list]'),
        },
        budget: {
          main: document.querySelector('[data-budget]'),
          form: document.querySelector('[data-budget] form'),
          input: document.querySelector('[data-budget] input[type=number]'),
        }
      }

      this.productMainTemplate = document.getElementById('product-main-tempate');
      this.productCartTemplate = document.getElementById('product-cart-tempate');

      this.setListeners();
      this.displayBudget();
      this.displayProductsInCart();
      this.loadProducts();
    }

    setListeners() {
      document.addEventListener('click', this.onClick.bind(this));
      document.addEventListener('dragstart', this.onDragStart.bind(this));
      document.addEventListener('dragover', this.onDragOver.bind(this));
      document.addEventListener('drop', this.onDrop.bind(this));
      this.elements.budget.form.addEventListener('submit', this.changeBudget.bind(this));
    }

    onClick(event) {
      const element = event.target;
      switch (element.tagName) {
        case 'BUTTON':
          switch (element.dataset.action) {
            case 'add-to-cart':
              this.addToCart(element.dataset.pid);
            break;
            case 'remove-from-cart':
              this.removeFromCartById(element.dataset.pid);
            break;
            case 'increase-amount':
              this.increaseAmountInCart(element.dataset.pid);
            break;
            case 'decrease-amount':
              this.decreaseAmountInCart(element.dataset.pid);
            break;
            case 'clean-cart':
              this.cleanCart();
            break;
            case 'budget-edit':
              this.enableBudgetEdit();
            break;
          }

        break;
      }
    }

    onDragStart(event) {
      const productElement = event.target.closest('[draggable=true][data-pid]');
      const cartElement = this.elements.cart.main;
      if (productElement) {
        productElement.classList.add('grabbing');
        cartElement.classList.add('dragging');
        event.dataTransfer.setData('text/plain', productElement.dataset.pid);
        const image = productElement.querySelector('[data-image]');
        if (image) {
          event.dataTransfer.setDragImage(
            image,
            image.width / 2,
            image.height / 2
          );
        }
      }
    }

    onDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
      event.target.closest('[data-cart]')
      const cartElement = event.target.closest('[data-cart]');
      if (cartElement) {
        this.elements.cart.main.classList.add('highlight')
      } else {
        this.elements.cart.main.classList.remove('highlight');
      }
      return false;
    }

    onDrop(event) {
      event.preventDefault();

      this.elements.cart.main.classList.remove('dragging');
      this.elements.cart.main.classList.remove('highlight');
      this.elements.products.main.querySelectorAll('.grabbing').forEach(element => {
        element.classList.remove('grabbing');
      })

      const cartElement = event.target.closest('[data-cart]');
      const pid = event.dataTransfer.getData('text/plain');
      if (cartElement && pid) {
        this.addToCart(pid);
      }
    }

    loadProducts() {
      this.startLoading()
      .then(this.loadRemoteProducts.bind(this))
      .catch(this.networkErrorHandler.bind(this))
      .then(this.registerProducts.bind(this))
      .then(this.displayProducts.bind(this))
      .then(this.endLoading.bind(this))
      .then(this.loadCart.bind(this));
    }

    startLoading() {
      this.elements.products.main.classList.add('loading');
      return Promise.resolve();
    }

    endLoading() {
      this.elements.products.main.classList.remove('loading');
      return Promise.resolve();
    }

    enableBudgetEdit() {
      this.elements.budget.main.dataset.editMode = 1
    }

    disableBudgetEdit() {
      this.elements.budget.main.dataset.editMode = 0
    }

    increaseAmountInCart (productId) {
      const cartItem = this.getProductFromCartById(productId);
      if (! cartItem) {
        return;
      }

      cartItem.increase();

      if (this.budgetLimit > 0 && this.getTotalPriceCart() > this.budgetLimit) {
        this.decreaseAmountInCart(productId);
        this.message(ShopController.MSG.overLimit, { budgetLimit: this.budgetLimit })
        return;
      }

      this.saveCart();
      this.displayProductsInCart();
    }

    decreaseAmountInCart (productId) {
      const cartItem = this.getProductFromCartById(productId);
      if (! cartItem) {
        return;
      }

      cartItem.decrease()

      if (cartItem.count < 1) {
        this.removeFromCartById(productId);
      }

      this.saveCart();
      this.displayProductsInCart();
    }

    addToCart(productId, count = 0) {
      const product = this.getProductById(productId);
      if (! product) {
        return;
      }

      let cartItem = this.getProductFromCartById(productId);
      if (! cartItem) {
        cartItem = new CartItem({ product, count });
        this.cart.push(cartItem);
      }

      if (! count) this.increaseAmountInCart(productId);

      this.displayProductsInCart();
    }

    cleanCart () {
      this.cart = [];
      this.saveCart();
      this.displayProductsInCart();
    }

    getTotalPriceCart () {
      return this.cart.reduce((count, cartItem) => {
        return count += cartItem.product.price * cartItem.count
      }, 0)
    }

    getTotalCountCart () {
      return this.cart.reduce((count, cartItem) => {
        return count += cartItem.count
      }, 0)
    }

    removeFromCartById(productId) {
      const index = this.cart.findIndex(cartItem => cartItem.id == +productId)
      if (index >= 0) {
        this.cart.splice(index, 1)
      }
      this.saveCart();
      this.displayProductsInCart();
    }

    loadRemoteProducts() {
      const url = new URL(ShopController.DATA_URL);
      return fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
    }

    getProductById(productId) {
      return this.products.find(product => product.id == +productId)
    }


    getProductFromCartById(productId) {
      return this.cart.find(cartItem => cartItem.id == +productId)
    }

    /**
     * @param  {Object} rawProducts {name: price}
     */
    registerProducts(rawProducts) {
      this.products = Array.from(Object.entries(rawProducts), ([name, price], i) => {
        const id = i + 1;
        return new Product({ id, name, price });
      })
      return Promise.resolve();
    }

    changeBudget(event) {
      if (event) {
        event.preventDefault()
      }
      const input = this.elements.budget.input
      let newBudget = +input.value;

      if (isNaN(newBudget) || newBudget < 0) {
        newBudget = 0;
      }
      if (newBudget > 1000000) {
        newBudget = 1000000;
      }

      const totalPrice = this.getTotalPriceCart()
      if (totalPrice > 0 && newBudget > 0 && totalPrice > newBudget) {
        this.message(ShopController.MSG.lessBudget)
        return;
      }

      this.budgetLimit = newBudget;

      this.saveBudget();
      this.displayBudget();
      this.disableBudgetEdit();
    }

    displayProducts() {
      const productsTemplate = this.productMainTemplate.content;
      const productElements = this.products.map((product) => {
        const fragment = productsTemplate.cloneNode(true)
        fragment.querySelectorAll('[data-title]').forEach(element => {
          element.innerText = product.name
        })
        fragment.querySelectorAll('[data-price]').forEach(element => {
          element.innerText = product.price
        })
        fragment.querySelectorAll('[data-pid]').forEach(element => {
          element.dataset.pid = product.id
        })
        return fragment
      })

      this.elements.products.list.innerHTML = '';
      this.elements.products.list.append(...productElements);

      return Promise.resolve();
    }

    displayProductsInCart() {
      const productCartTemplate = this.productCartTemplate.content;
      const cartElements = this.cart.map((cartItem) => {
        const product = cartItem.product;
        const fragment = productCartTemplate.cloneNode(true)
        fragment.querySelectorAll('[data-title]').forEach(element => {
          element.innerText = product.name
        })
        fragment.querySelectorAll('[data-price]').forEach(element => {
          element.innerText = product.price
        })
        fragment.querySelectorAll('[data-pid]').forEach(element => {
          element.dataset.pid = product.id
        })
        fragment.querySelectorAll('[data-count]').forEach(element => {
          element.innerText = cartItem.count
        })
        fragment.querySelectorAll('[data-count]').forEach(element => {
          element.innerText = cartItem.count
        })
        fragment.querySelectorAll('[data-total-price]').forEach(element => {
          element.innerText = product.price * cartItem.count
        })
        return fragment
      })

      this.elements.cart.list.innerHTML = '';
      this.elements.cart.list.append(...cartElements);

      this.elements.cart.main.querySelectorAll('[data-total-count]').forEach(element => {
        element.dataset.totalCount = this.getTotalCountCart()
      })

      this.elements.cart.main.querySelectorAll('[data-total-price]').forEach(element => {
        element.dataset.totalPrice = this.getTotalPriceCart()
      })

      return Promise.resolve();
    }

    displayBudget() {
      const budgetElement = this.elements.budget.main;
      const input = this.elements.budget.input;

      input.value = this.budgetLimit;
      budgetElement.dataset.value = this.budgetLimit;
      budgetElement.querySelectorAll('[data-value]').forEach(element => {
        element.dataset.value = this.budgetLimit;
      });
    }

    saveCart() {
      sessionStorage.setItem('cart',
        JSON.stringify(
          this.cart.map(cartItem => {
            return { id: cartItem.id, count: cartItem.count }
          })
        )
      );
    }

    saveBudget() {
      sessionStorage.setItem('budget', this.budgetLimit);
    }

    loadCart() {
      let loadedCartInfo = [];
      try {
        loadedCartInfo = JSON.parse(sessionStorage.getItem('cart')) || []
      } catch {

      }
      return loadedCartInfo.map(cartData => {
        this.addToCart(...Object.values(cartData))
      });
    }

    loadBudget() {
      return +sessionStorage.getItem('budget');
    }

    networkErrorHandler(error) {
      setTimeout(this.loadProducts.bind(this), 3000);
      return Promise.reject(error);
    }

    message(msg, variables = {}) {
      Object.keys(variables).forEach(key => {
        const pattern = new RegExp(`\{${key}\}`, 'g');
        msg = msg.replace(pattern, variables[key]);
      })
      alert(msg);
    }
  }

  const shop = new ShopController();
}
