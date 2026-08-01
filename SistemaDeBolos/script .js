/*=========================================
    SWEET CAKE
    SCRIPT.JS - PARTE 1
=========================================*/

// ==============================
// ELEMENTOS
// ==============================

const cartButton = document.querySelector(".cart-btn");
const cartSidebar = document.querySelector(".cart-sidebar");
const closeCart = document.querySelector(".close-cart");

const cartItems = document.querySelector(".cart-items");
const cartCount = document.getElementById("cartCount");

const buyButtons = document.querySelectorAll(".buy-btn");

let cart = [];

// ==============================
// ABRIR CARRINHO
// ==============================

if (cartButton && cartSidebar) {

  cartButton.addEventListener("click", () => {

    cartSidebar.classList.add("active");

  });

}

// ==============================
// FECHAR CARRINHO
// ==============================

if (closeCart && cartSidebar) {

  closeCart.addEventListener("click", () => {

    cartSidebar.classList.remove("active");

  });

}

// ==============================
// BOTÕES + E -
// ==============================

document.querySelectorAll(".quantity").forEach(quantity => {

  const minus = quantity.querySelector("button:first-child");

  const plus = quantity.querySelector("button:last-child");

  const input = quantity.querySelector("input");

  plus.addEventListener("click", () => {

    input.value = Number(input.value) + 1;

  });

  minus.addEventListener("click", () => {

    if (Number(input.value) > 1) {

      input.value = Number(input.value) - 1;

    }

  });

});

// ==============================
// ESCOLHER INTEIRO / METADE
// ==============================

document.querySelectorAll(".type-select").forEach(group => {

  const buttons = group.querySelectorAll("button");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      buttons.forEach(btn => {

        btn.classList.remove("active");

      });

      button.classList.add("active");

    });

  });

});

// ==============================
// CONTADOR
// ==============================

function updateCounter() {

  let total = 0;

  cart.forEach(item => {

    total += item.quantity;

  });

  cartCount.textContent = total;

}

// ==============================
// TOTAL
// ==============================

function updateTotal() {

  const totalElement =
    document.querySelector(".total strong");

  if (!totalElement) return;

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.quantity;

  });

  totalElement.textContent =
    `R$ ${total.toFixed(2).replace(".", ",")}`;

}

// ==============================
// ADICIONAR AO CARRINHO
// ==============================

buyButtons.forEach(button => {

  button.addEventListener("click", () => {

    const card = button.closest(".card");

    const title = card.querySelector("h3").textContent;

    const image = card.querySelector("img").src;

    const quantity = Number(
      card.querySelector(".quantity input").value
    );

    const selectedButton =
      card.querySelector(".type-select .active");

    const type = selectedButton.textContent.trim();

    const prices =
      card.querySelectorAll(".price strong");

    let price = 0;

    if (type === "Inteiro") {

      price = Number(
        prices[0].textContent
          .replace("R$", "")
          .replace(",", ".")
          .trim()
      );

    } else {

      price = Number(
        prices[1].textContent
          .replace("R$", "")
          .replace(",", ".")
          .trim()
      );

    }

    cart.push({

      id: Date.now(),

      title,

      image,

      type,

      quantity,

      price

    });

    renderCart();

    cartSidebar.classList.add("active");

  });

});

// ==============================
// RENDERIZAR CARRINHO
// ==============================

function renderCart() {

  cartItems.innerHTML = "";

  cart.forEach(item => {

    cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.title}">

            <div class="cart-info">

                <h4>${item.title}</h4>

                <span>${item.type}</span>

                <span>Quantidade: ${item.quantity}</span>

                <strong>
                    R$ ${(item.price * item.quantity)
        .toFixed(2)
        .replace(".", ",")}
                </strong>

                <br>

                <button
                    class="remove-item"
                    data-id="${item.id}">

                    Remover

                </button>

            </div>

        </div>

        `;

  });

  updateCounter();

  updateTotal();

  removeEvents();

}

// ==============================
// REMOVER ITEM
// ==============================

function removeEvents() {

  document.querySelectorAll(".remove-item")
    .forEach(button => {

      button.addEventListener("click", () => {

        const id =
          Number(button.dataset.id);

        cart = cart.filter(item => item.id !== id);

        renderCart();

      });

    });

}

// ==============================
// FINALIZAR PEDIDO
// ==============================

const checkout =
  document.querySelector(".checkout-btn");

if (checkout) {

  checkout.addEventListener("click", () => {

    if (cart.length === 0) {

      alert("Seu carrinho está vazio!");

      return;

    }

    alert("Pedido realizado com sucesso!");

    cart = [];

    renderCart();

    cartSidebar.classList.remove("active");

  });

}

// ==============================
// PESQUISA
// ==============================

const search =
  document.querySelector(".search-box input");

if (search) {

  search.addEventListener("keyup", () => {

    const value =
      search.value.toLowerCase();

    document.querySelectorAll(".card")
      .forEach(card => {

        const title =
          card.querySelector("h3")
            .textContent
            .toLowerCase();

        if (title.includes(value)) {

          card.style.display = "flex";

        } else {

          card.style.display = "none";

        }

      });

  });

}

// ==============================
// PAGAMENTO
// ==============================

document.querySelectorAll(".payment-options button")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".payment-options button")
        .forEach(btn => {

          btn.classList.remove("active");

        });

      button.classList.add("active");

    });

  });

// ==============================
// INICIAR
// ==============================

updateCounter();
updateTotal();
renderCart();

console.log("Sweet Cake iniciado!");


/*=========================================
    PARTE 2 - CHECKOUT
=========================================*/

// ==============================
// MODAL DO CHECKOUT
// ==============================

const checkoutModal = document.createElement("div");

checkoutModal.className = "checkout-modal";

checkoutModal.innerHTML = `

<div class="checkout-content">

<h2>Finalizar Pedido</h2>

<div class="field">

<label>Nome</label>

<input type="text" id="customerName">

</div>

<div class="field">

<label>Telefone</label>

<input type="text" id="customerPhone">

</div>

<div class="field">

<label>Rua</label>

<input type="text" id="customerStreet">

</div>

<div class="field">

<label>Número</label>

<input type="text" id="customerNumber">

</div>

<div class="field">

<label>Complemento</label>

<input type="text" id="customerComplement">

</div>

<div class="field">

<label>Bairro</label>

<select id="customerDistrict">

<option value="">Selecione</option>

<option value="Centro">Centro</option>

<option value="Várzea">Várzea</option>

<option value="Pedra Ferreira">Pedra Ferreira</option>

<option value="Catolé">Catolé</option>

<option value="Liberdade">Liberdade</option>

</select>

</div>

<div class="field">

<label>Pagamento</label>

<select id="paymentMethod">

<option value="">Selecione</option>

<option value="pix">PIX</option>

<option value="money">Dinheiro</option>

<option value="card">Cartão</option>

</select>

</div>

<div id="paymentExtra"></div>

<hr>

<div class="resume">

<p>

Subtotal:

<strong id="checkoutSubtotal">

R$ 0,00

</strong>

</p>

<p>

Entrega:

<strong id="checkoutDelivery">

R$ 0,00

</strong>

</p>

<h3>

Total:

<strong id="checkoutTotal">

R$ 0,00

</strong>

</h3>

</div>

<div class="checkout-buttons">

<button id="cancelCheckout">

Cancelar

</button>

<button id="finishCheckout">

Confirmar Pedido

</button>

</div>

</div>

`;

document.body.appendChild(checkoutModal);

// ==============================
// ESTILO
// ==============================

const checkoutStyle = document.createElement("style");

checkoutStyle.innerHTML = `

.checkout-modal{

position:fixed;

left:0;

top:0;

width:100%;

height:100%;

display:none;

justify-content:center;

align-items:center;

background:rgba(0,0,0,.6);

z-index:99999;

}

.checkout-content{

background:white;

width:500px;

max-width:95%;

padding:25px;

border-radius:10px;

max-height:90vh;

overflow:auto;

}

.field{

margin-bottom:15px;

}

.field label{

display:block;

margin-bottom:5px;

font-weight:bold;

}

.field input,

.field select{

width:100%;

padding:10px;

box-sizing:border-box;

}

.checkout-buttons{

display:flex;

justify-content:space-between;

margin-top:20px;

}

.checkout-buttons button{

padding:12px 20px;

cursor:pointer;

}

`;

document.head.appendChild(checkoutStyle);

// ==============================
// TAXAS
// ==============================

const deliveryFees = {

  Centro: 2,

  "Várzea": 2,

  "Pedra Ferreira": 3,

  Catolé: 4,

  Liberdade: 5

};

// ==============================
// CALCULAR TOTAL
// ==============================

function updateCheckoutValues() {

  let subtotal = 0;

  cart.forEach(item => {

    subtotal += item.price * item.quantity;

  });

  const district =

    document.getElementById("customerDistrict").value;

  const delivery =

    deliveryFees[district] || 0;

  const total =

    subtotal + delivery;

  document.getElementById("checkoutSubtotal").textContent =

    `R$ ${subtotal.toFixed(2).replace(".", ",")}`;

  document.getElementById("checkoutDelivery").textContent =

    `R$ ${delivery.toFixed(2).replace(".", ",")}`;

  document.getElementById("checkoutTotal").textContent =

    `R$ ${total.toFixed(2).replace(".", ",")}`;

}

// ==============================
// ALTERAÇÃO DO BAIRRO
// ==============================

document

  .getElementById("customerDistrict")

  .addEventListener("change", updateCheckoutValues);

// ==============================
// ABRIR CHECKOUT
// ==============================

// Remove o evento antigo

checkout.replaceWith(checkout.cloneNode(true));

const newCheckout = document.querySelector(".checkout-btn");

newCheckout.addEventListener("click", () => {

  if (cart.length === 0) {

    alert("Seu carrinho está vazio!");

    return;

  }

  updateCheckoutValues();

  checkoutModal.style.display = "flex";

});

// ==============================
// CANCELAR
// ==============================

document

  .getElementById("cancelCheckout")

  .addEventListener("click", () => {

    checkoutModal.style.display = "none";

  });

// ==============================
// FECHAR AO CLICAR FORA
// ==============================

checkoutModal.addEventListener("click", (e) => {

  if (e.target === checkoutModal) {

    checkoutModal.style.display = "none";

  }

});

console.log("Checkout carregado.");


/*=========================================
    CONTINUAÇÃO - FINALIZAR PEDIDO
=========================================*/

const finishButton = document.getElementById("finishCheckout");

if (finishButton) {

  finishButton.addEventListener("click", () => {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const street = document.getElementById("customerStreet").value.trim();
    const number = document.getElementById("customerNumber").value.trim();
    const complement = document.getElementById("customerComplement").value.trim();
    const district = document.getElementById("customerDistrict").value;
    const payment = document.getElementById("paymentMethod").value;

    if (!name || !phone || !street || !number || !district || !payment) {

      alert("Preencha todos os campos.");

      return;

    }

    let subtotal = 0;

    cart.forEach(item => {

      subtotal += item.price * item.quantity;

    });

    const delivery = deliveryFees[district] || 0;

    const total = subtotal + delivery;

    const order = {

      id: Date.now(),

      number: Math.floor(Math.random() * 900000 + 100000),

      date: new Date().toLocaleString(),

      customer: {

        name,

        phone,

        street,

        number,

        complement,

        district

      },

      payment,

      products: cart,

      subtotal,

      delivery,

      total,

      status: "Aguardando"

    };

    const orders = JSON.parse(localStorage.getItem("sweetcake_orders")) || [];

    orders.push(order);

    localStorage.setItem(

      "sweetcake_orders",

      JSON.stringify(orders)

    );

    showReceipt(order);

    cart = [];

    renderCart();

    checkoutModal.style.display = "none";

  });

}

/*=========================================
    COMPROVANTE
=========================================*/

function showReceipt(order) {

  let items = "";

  order.products.forEach(item => {

    items += `

        <tr>

            <td>${item.title}</td>

            <td>${item.type}</td>

            <td>${item.quantity}</td>

            <td>

                R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}

            </td>

        </tr>

        `;

  });

  const modal = document.createElement("div");

  modal.style.position = "fixed";
  modal.style.left = "0";
  modal.style.top = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.background = "rgba(0,0,0,.7)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "999999";

  modal.innerHTML = `

    <div style="background:#fff;padding:25px;border-radius:10px;width:650px;max-width:95%;max-height:90vh;overflow:auto;">

        <h2 style="text-align:center;">

            SWEET CAKE

        </h2>

        <hr>

        <h3>

            Pedido Nº ${order.number}

        </h3>

        <p>

            <strong>Nome:</strong>

            ${order.customer.name}

        </p>

        <p>

            <strong>Telefone:</strong>

            ${order.customer.phone}

        </p>

        <p>

            <strong>Endereço:</strong>

            ${order.customer.street},

            ${order.customer.number}

        </p>

        <p>

            <strong>Complemento:</strong>

            ${order.customer.complement || "-"}

        </p>

        <p>

            <strong>Bairro:</strong>

            ${order.customer.district}

        </p>

        <hr>

        <table border="1" width="100%" cellpadding="8">

            <tr>

                <th>Produto</th>

                <th>Tipo</th>

                <th>Qtd</th>

                <th>Total</th>

            </tr>

            ${items}

        </table>

        <hr>

        <p>

            <strong>Pagamento:</strong>

            ${order.payment}

        </p>

        <p>

            <strong>Subtotal:</strong>

            R$ ${order.subtotal.toFixed(2).replace(".", ",")}

        </p>

        <p>

            <strong>Entrega:</strong>

            R$ ${order.delivery.toFixed(2).replace(".", ",")}

        </p>

        <h2>

            Total: R$ ${order.total.toFixed(2).replace(".", ",")}

        </h2>

        <br>

        <button id="printOrder">

            Imprimir

        </button>

        <button id="closeReceipt">

            Fechar

        </button>

    </div>

    `;

  document.body.appendChild(modal);

  document.getElementById("closeReceipt").onclick = () => {

    modal.remove();

  };

  document.getElementById("printOrder").onclick = () => {

    window.print();

  };

}
