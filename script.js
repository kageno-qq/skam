const productsData = [
    { id: 1, name: "Наушники", price: 1990, category: "electronics", image: "https://via.placeholder.com/300x200/1e90ff/ffffff?text=%D0%9D%D0%B0%D1%83%D1%88%D0%BD%D0%B8%D0%BA%D0%B8" },
    { id: 2, name: "Смартфон", price: 15990, category: "electronics", image: "https://via.placeholder.com/300x200/1e90ff/ffffff?text=%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD" },
    { id: 3, name: "Клавиатура", price: 2990, category: "accessories", image: "https://via.placeholder.com/300x200/1e90ff/ffffff?text=%D0%9A%D0%BB%D0%B0%D0%B2%D0%B8%D0%B0%D1%82%D1%83%D1%80%D0%B0" },
    { id: 4, name: "Мышка", price: 1290, category: "accessories", image: "https://via.placeholder.com/300x200/1e90ff/ffffff?text=%D0%9C%D1%8B%D1%88%D0%BA%D0%B0" },
    { id: 5, name: "Ноутбук", price: 69990, category: "electronics", image: "https://via.placeholder.com/300x200/1e90ff/ffffff?text=%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA" },
  ];
  
  let cart = [];
  
  function displayProducts(products) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Цена: ${product.price} ₽</p>
        <button onclick="addToCart(${product.id})">Купить</button>
      `;
      productsContainer.appendChild(productElement);
    });
  }
  
  function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    
    document.getElementById("cart-count").innerText = cart.reduce((total, item) => total + item.quantity, 0);
    updateCart();
  }
  
  function updateCart() {
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartItemsList.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        ${item.name} - ${item.price} ₽ x ${item.quantity}
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <button onclick="removeFromCart(${item.id})">Удалить</button>
      `;
      cartItemsList.appendChild(listItem);
      totalPrice += item.price * item.quantity;
    });
    
    totalPriceElement.innerText = `Итого: ${totalPrice} ₽`;
  }
  
  function changeQuantity(productId, amount) {
    const product = cart.find(item => item.id === productId);
    if (product) {
      product.quantity += amount;
      if (product.quantity <= 0) {
        product.quantity = 1;
      }
    }
    updateCart();
  }
  
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }
  
  function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
  }
  
  function checkout() {
    if (cart.length === 0) {
      alert("Корзина пуста! Добавьте товары.");
      return;
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const confirmOrder = confirm(`Вы уверены, что хотите оформить заказ на сумму ${totalPrice} ₽?`);
    
    if (confirmOrder) {
      cart = [];
      document.getElementById("cart-count").innerText = 0;
      updateCart();
      toggleCart();
      alert("Спасибо за заказ! Мы свяжемся с вами.");
    }
  }
  
  // Инициализация страницы
  displayProducts(productsData);
  