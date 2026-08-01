/*=========================================
    PARTE 1 - CHECKOUT
=========================================*/

// ==============================
// CRIAR MODAL DO CHECKOUT
// ==============================

const checkoutHTML = `
<div class="checkout-modal" id="checkoutModal">

    <div class="checkout-box">

        <h2>Finalizar Pedido</h2>

        <div class="checkout-group">
            <label>Nome Completo</label>
            <input type="text" id="customerName" placeholder="Digite seu nome">
        </div>

        <div class="checkout-group">
            <label>Telefone</label>
            <input type="text" id="customerPhone" placeholder="(83) 99999-9999">
        </div>

        <div class="checkout-group">
            <label>Rua</label>
            <input type="text" id="customerStreet">
        </div>

        <div class="checkout-group">
            <label>Número</label>
            <input type="text" id="customerNumber">
        </div>

        <div class="checkout-group">
            <label>Complemento</label>
            <input type="text" id="customerComplement">
        </div>

        <div class="checkout-group">

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

        <div class="checkout-group">

            <label>Forma de Pagamento</label>

            <select id="paymentMethod">

                <option value="">Selecione</option>

                <option value="pix">PIX</option>

                <option value="money">Dinheiro</option>

                <option value="card">Cartão</option>

            </select>

        </div>

        <div id="paymentArea"></div>

        <div class="checkout-buttons">

            <button id="cancelCheckout">

                Cancelar

            </button>

            <button id="confirmCheckout">

                Confirmar Pedido

            </button>

        </div>

    </div>

</div>
`;

document.body.insertAdjacentHTML("beforeend", checkoutHTML);

// ==============================
// CSS PELO JAVASCRIPT
// ==============================

const style = document.createElement("style");

style.innerHTML = `

.checkout-modal{

position:fixed;

top:0;

left:0;

width:100%;

height:100%;

background:rgba(0,0,0,.6);

display:none;

justify-content:center;

align-items:center;

z-index:9999;

}

.checkout-modal.active{

display:flex;

}

.checkout-box{

background:#fff;

width:95%;

max-width:500px;

padding:20px;

border-radius:10px;

max-height:90vh;

overflow:auto;

}

.checkout-group{

margin-bottom:15px;

}

.checkout-group label{

display:block;

margin-bottom:5px;

font-weight:bold;

}

.checkout-group input,
.checkout-group select{

width:100%;

padding:10px;

font-size:15px;

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

document.head.appendChild(style);

// ==============================
// ELEMENTOS
// ==============================

const checkoutModal =
  document.getElementById("checkoutModal");

const cancelCheckout =
  document.getElementById("cancelCheckout");

// ==============================
// ABRIR CHECKOUT
// ==============================

if (checkout) {

  checkout.removeEventListener("click", () => { });

  checkout.addEventListener("click", () => {

    if (cart.length === 0) {

      alert("Seu carrinho está vazio.");

      return;

    }

    checkoutModal.classList.add("active");

  });

}

// ==============================
// FECHAR CHECKOUT
// ==============================

cancelCheckout.addEventListener("click", () => {

  checkoutModal.classList.remove("active");

});

checkoutModal.addEventListener("click", (e) => {

  if (e.target === checkoutModal) {

    checkoutModal.classList.remove("active");

  }

});

// ==============================
// CONFIRMAR
// ==============================

const confirmCheckout =
  document.getElementById("confirmCheckout");

confirmCheckout.addEventListener("click", () => {

  const name = document.getElementById("customerName").value;

  const phone = document.getElementById("customerPhone").value;

  const street = document.getElementById("customerStreet").value;

  const number = document.getElementById("customerNumber").value;

  const district = document.getElementById("customerDistrict").value;

  const payment = document.getElementById("paymentMethod").value;

  if (!name) {

    alert("Informe seu nome.");

    return;

  }

  if (!phone) {

    alert("Informe o telefone.");

    return;

  }

  if (!street) {

    alert("Informe a rua.");

    return;

  }

  if (!number) {

    alert("Informe o número.");

    return;

  }

  if (!district) {

    alert("Selecione o bairro.");

    return;

  }

  if (!payment) {

    alert("Selecione a forma de pagamento.");

    return;

  }

  alert("Tudo certo! Na Parte 2 será calculada a taxa de entrega.");

});

/*=========================================
    PARTE 2 - ENTREGA
=========================================*/

// ==============================
// TABELA DE TAXAS
// ==============================

const deliveryFees = {

  "Centro": 2,

  "Várzea": 2,

  "Pedra Ferreira": 3,

  "Catolé": 4,

  "Liberdade": 5

};

// ==============================
// CRIAR ÁREA DOS VALORES
// ==============================

const paymentArea =
  document.getElementById("paymentArea");

paymentArea.innerHTML = `

<hr>

<h3>Resumo do Pedido</h3>

<div style="margin:10px 0;">
    Subtotal:
    <strong id="subtotalValue">
        R$ 0,00
    </strong>
</div>

<div style="margin:10px 0;">
    Entrega:
    <strong id="deliveryValue">
        R$ 0,00
    </strong>
</div>

<div style="margin:10px 0;font-size:20px;">
    Total:
    <strong id="totalValue">
        R$ 0,00
    </strong>
</div>

<hr>

<div id="paymentInfo"></div>

`;

const districtSelect =
  document.getElementById("customerDistrict");

// ==============================
// CALCULAR TOTAL
// ==============================

function updateCheckoutTotal() {

  let subtotal = 0;

  cart.forEach(item => {

    subtotal += item.price * item.quantity;

  });

  const district =
    districtSelect.value;

  const delivery =
    deliveryFees[district] || 0;

  const total =
    subtotal + delivery;

  document
    .getElementById("subtotalValue")
    .textContent =
    `R$ ${subtotal.toFixed(2).replace(".", ",")}`;

  document
    .getElementById("deliveryValue")
    .textContent =
    `R$ ${delivery.toFixed(2).replace(".", ",")}`;

  document
    .getElementById("totalValue")
    .textContent =
    `R$ ${total.toFixed(2).replace(".", ",")}`;

}

// ==============================
// QUANDO MUDAR O BAIRRO
// ==============================

districtSelect.addEventListener("change", () => {

  updateCheckoutTotal();

});

// ==============================
// QUANDO ABRIR CHECKOUT
// ==============================

if (checkout) {

  checkout.addEventListener("click", () => {

    updateCheckoutTotal();

  });

}

// ==============================
// TAMBÉM ATUALIZA AO RENDERIZAR
// ==============================

const oldRenderCart = renderCart;

renderCart = function () {

  oldRenderCart();

  updateCheckoutTotal();

};

/*=========================================
    PARTE 3 - FORMAS DE PAGAMENTO
=========================================*/

// ==============================
// ELEMENTOS
// ==============================

const paymentMethod =
  document.getElementById("paymentMethod");

const paymentInfo =
  document.getElementById("paymentInfo");

// ==============================
// ALTERAR PAGAMENTO
// ==============================

paymentMethod.addEventListener("change", showPaymentFields);

function showPaymentFields() {

  const method = paymentMethod.value;

  paymentInfo.innerHTML = "";

  // ==========================
  // PIX
  // ==========================

  if (method === "pix") {

    paymentInfo.innerHTML = `

        <hr>

        <h3>Pagamento via PIX</h3>

        <p>
            Escaneie o QR Code abaixo ou utilize a chave PIX.
        </p>

        <div style="text-align:center;margin:20px 0;">

            <img
                src="img/qrcode-pix.png"
                alt="QR Code PIX"
                style="width:220px;max-width:100%;">

        </div>

        <div style="text-align:center;">

            <strong>Chave PIX</strong>

            <br><br>

            <input
                type="text"
                value="83999999999"
                readonly
                style="
                    width:100%;
                    padding:10px;
                    text-align:center;
                    font-weight:bold;
                ">

            <br><br>

            <button
                id="copyPix">

                Copiar Chave PIX

            </button>

        </div>

        <br>

        <p style="color:green;">
            Após realizar o pagamento clique em
            Confirmar Pedido.
        </p>

        `;

    setTimeout(() => {

      const copy =
        document.getElementById("copyPix");

      if (copy) {

        copy.onclick = () => {

          navigator.clipboard.writeText("83999999999");

          alert("Chave PIX copiada!");

        }

      }

    }, 100);

  }

  // ==========================
  // DINHEIRO
  // ==========================

  if (method === "money") {

    paymentInfo.innerHTML = `

        <hr>

        <h3>Pagamento em Dinheiro</h3>

        <p>

            Precisa de troco?

        </p>

        <label>

            <input
                type="radio"
                name="troco"
                value="nao"
                checked>

            Não

        </label>

        <br><br>

        <label>

            <input
                type="radio"
                name="troco"
                value="sim">

            Sim

        </label>

        <div
            id="changeArea"
            style="
                display:none;
                margin-top:15px;
            ">

            <label>

                Troco para quanto?

            </label>

            <input
                type="number"
                id="changeValue"
                placeholder="Ex.: 100">

        </div>

        `;

    setTimeout(() => {

      document
        .querySelectorAll('input[name="troco"]')
        .forEach(radio => {

          radio.onchange = () => {

            const area =
              document
                .getElementById("changeArea");

            area.style.display =
              radio.value === "sim"
                ? "block"
                : "none";

          };

        });

    }, 100);

  }

  // ==========================
  // CARTÃO
  // ==========================

  if (method === "card") {

    paymentInfo.innerHTML = `

        <hr>

        <h3>Pagamento com Cartão</h3>

        <p>

            O pagamento será realizado
            na entrega.

        </p>

        <div style="
            background:#f5f5f5;
            padding:15px;
            border-radius:10px;
            margin-top:15px;
        ">

            ✔ Levaremos a maquininha.

            <br><br>

            Aceitamos:

            <ul>

                <li>Crédito</li>

                <li>Débito</li>

                <li>Pix na maquininha</li>

            </ul>

        </div>

        `;

  }

}

/*=========================================
    PARTE 4 - GERAR PEDIDO
=========================================*/

// ==============================
// GERAR NÚMERO DO PEDIDO
// ==============================

function generateOrderNumber() {

  return Math.floor(100000 + Math.random() * 900000);

}

// ==============================
// SALVAR PEDIDO
// ==============================

function saveOrder() {

  // --------------------------
  // Dados do Cliente
  // --------------------------

  const name =
    document.getElementById("customerName").value;

  const phone =
    document.getElementById("customerPhone").value;

  const street =
    document.getElementById("customerStreet").value;

  const number =
    document.getElementById("customerNumber").value;

  const complement =
    document.getElementById("customerComplement").value;

  const district =
    document.getElementById("customerDistrict").value;

  const payment =
    document.getElementById("paymentMethod").value;

  // --------------------------
  // Troco
  // --------------------------

  let needChange = false;

  let changeValue = "";

  if (payment === "money") {

    const selected =
      document.querySelector('input[name="troco"]:checked');

    if (selected) {

      needChange =
        selected.value === "sim";

    }

    if (needChange) {

      const field =
        document.getElementById("changeValue");

      if (field) {

        changeValue = field.value;

      }

    }

  }

  // --------------------------
  // Calcular Valores
  // --------------------------

  let subtotal = 0;

  cart.forEach(item => {

    subtotal += item.price * item.quantity;

  });

  const delivery =
    deliveryFees[district] || 0;

  const total =
    subtotal + delivery;

  // --------------------------
  // Criar Pedido
  // --------------------------

  const order = {

    id: Date.now(),

    number: generateOrderNumber(),

    date: new Date().toLocaleString(),

    customer: {

      name,

      phone,

      street,

      number,

      complement,

      district

    },

    payment: {

      method: payment,

      needChange,

      changeValue

    },

    products: [...cart],

    subtotal,

    delivery,

    total,

    status: "Aguardando"

  };

  // --------------------------
  // Salvar no LocalStorage
  // --------------------------

  const orders =
    JSON.parse(
      localStorage.getItem("sweetcake_orders")
    ) || [];

  orders.push(order);

  localStorage.setItem(

    "sweetcake_orders",

    JSON.stringify(orders)

  );

  return order;

}

// ==============================
// BOTÃO CONFIRMAR
// ==============================

confirmCheckout.onclick = () => {

  // --------------------------
  // Validações
  // --------------------------

  if (customerName.value === "") {

    alert("Informe seu nome.");

    return;

  }

  if (customerPhone.value === "") {

    alert("Informe o telefone.");

    return;

  }

  if (customerStreet.value === "") {

    alert("Informe a rua.");

    return;

  }

  if (customerNumber.value === "") {

    alert("Informe o número.");

    return;

  }

  if (customerDistrict.value === "") {

    alert("Selecione o bairro.");

    return;

  }

  if (paymentMethod.value === "") {

    alert("Escolha uma forma de pagamento.");

    return;

  }

  // --------------------------
  // Gerar Pedido
  // --------------------------

  const order =
    saveOrder();

  console.log(order);

  alert(

    "Pedido Nº " +

    order.number +

    " criado com sucesso!"

  );

  // --------------------------
  // Limpar Carrinho
  // --------------------------

  cart = [];

  renderCart();

  checkoutModal.classList.remove("active");

};

/*=========================================
    PARTE 5 - COMPROVANTE
=========================================*/

// ==============================
// GERAR COMPROVANTE
// ==============================

function showReceipt(order) {

  let productsHTML = "";

  order.products.forEach(item => {

    productsHTML += `

        <tr>

            <td>${item.title}</td>

            <td>${item.type}</td>

            <td>${item.quantity}</td>

            <td>
                R$ ${(item.price * item.quantity)
        .toFixed(2)
        .replace(".", ",")}
            </td>

        </tr>

        `;

  });

  let paymentName = "";

  switch (order.payment.method) {

    case "pix":

      paymentName = "PIX";

      break;

    case "money":

      paymentName = "Dinheiro";

      break;

    case "card":

      paymentName = "Cartão";

      break;

  }

  let changeHTML = "";

  if (order.payment.method === "money") {

    if (order.payment.needChange) {

      changeHTML = `

            <p>

                <strong>

                    Troco para:

                </strong>

                R$ ${order.payment.changeValue}

            </p>

            `;

    } else {

      changeHTML = `

            <p>

                <strong>

                    Troco:

                </strong>

                Não precisa

            </p>

            `;

    }

  }

  const receipt = `

    <div
        id="receiptModal"
        style="
            position:fixed;
            inset:0;
            background:rgba(0,0,0,.7);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:99999;
        ">

        <div
            style="
                background:#fff;
                width:95%;
                max-width:700px;
                border-radius:10px;
                padding:25px;
                max-height:90vh;
                overflow:auto;
            ">

            <h2
                style="text-align:center;">

                SWEET CAKE

            </h2>

            <hr>

            <h3>

                Pedido Nº ${order.number}

            </h3>

            <p>

                <strong>Data:</strong>

                ${order.date}

            </p>

            <hr>

            <h3>

                Cliente

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

            <h3>

                Produtos

            </h3>

            <table
                border="1"
                width="100%"
                cellpadding="8">

                <tr>

                    <th>Produto</th>

                    <th>Tipo</th>

                    <th>Qtd</th>

                    <th>Total</th>

                </tr>

                ${productsHTML}

            </table>

            <hr>

            <p>

                <strong>

                    Subtotal

                </strong>

                R$

                ${order.subtotal
      .toFixed(2)
      .replace(".", ",")}

            </p>

            <p>

                <strong>

                    Entrega

                </strong>

                R$

                ${order.delivery
      .toFixed(2)
      .replace(".", ",")}

            </p>

            <h2>

                TOTAL

                R$

                ${order.total
      .toFixed(2)
      .replace(".", ",")}

            </h2>

            <hr>

            <p>

                <strong>

                    Pagamento

                </strong>

                ${paymentName}

            </p>

            ${changeHTML}

            <hr>

            <p>

                Status:

                <strong>

                    ${order.status}

                </strong>

            </p>

            <div
                style="
                    display:flex;
                    gap:10px;
                    margin-top:20px;
                ">

                <button
                    id="printReceipt">

                    Imprimir

                </button>

                <button
                    id="closeReceipt">

                    Fechar

                </button>

            </div>

        </div>

    </div>

    `;

  document.body.insertAdjacentHTML(

    "beforeend",

    receipt

  );

  document
    .getElementById("closeReceipt")
    .onclick = () => {

      document
        .getElementById("receiptModal")
        .remove();

    };

  document
    .getElementById("printReceipt")
    .onclick = () => {

      window.print();

    };

}
/*=========================================
    PARTE 6 - PAINEL ADMINISTRADOR
=========================================*/

// ==============================
// CRIAR PAINEL
// ==============================

document.body.insertAdjacentHTML("beforeend", `

<div id="adminPanel" style="
position:fixed;
top:0;
right:-100%;
width:450px;
height:100%;
background:#fff;
box-shadow:-5px 0 20px rgba(0,0,0,.2);
transition:.4s;
z-index:999999;
overflow:auto;
padding:20px;
">

<div style="
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:20px;
">

<h2>Painel de Pedidos</h2>

<button id="closeAdmin">
X
</button>

</div>

<input
id="searchOrder"
placeholder="Pesquisar pedido..."
style="
width:100%;
padding:10px;
margin-bottom:20px;
">

<div id="ordersList"></div>

</div>

<button id="openAdmin" style="
position:fixed;
bottom:20px;
left:20px;
padding:15px 25px;
background:#ff5a5f;
color:#fff;
border:none;
border-radius:8px;
cursor:pointer;
z-index:999998;
">

Pedidos

</button>

`);

// ==============================
// ELEMENTOS
// ==============================

const adminPanel =
  document.getElementById("adminPanel");

document
  .getElementById("openAdmin")
  .onclick = () => {

    adminPanel.style.right = "0";

    renderOrders();

  };

document
  .getElementById("closeAdmin")
  .onclick = () => {

    adminPanel.style.right = "-100%";

  };

// ==============================
// RENDERIZAR PEDIDOS
// ==============================

function renderOrders() {

  const list =
    document.getElementById("ordersList");

  const orders =
    JSON.parse(
      localStorage.getItem("sweetcake_orders")
    ) || [];

  list.innerHTML = "";

  if (orders.length === 0) {

    list.innerHTML = "<p>Nenhum pedido.</p>";

    return;

  }

  orders.reverse().forEach(order => {

    list.innerHTML += `

<div style="

border:1px solid #ddd;

padding:15px;

margin-bottom:15px;

border-radius:8px;

">

<h3>

Pedido #${order.number}

</h3>

<p>

<b>Cliente:</b>

${order.customer.name}

</p>

<p>

<b>Telefone:</b>

${order.customer.phone}

</p>

<p>

<b>Total:</b>

R$

${order.total
        .toFixed(2)
        .replace(".", ",")}

</p>

<p>

<b>Pagamento:</b>

${order.payment.method}

</p>

<p>

<b>Status:</b>

</p>

<select
class="statusSelect"
data-id="${order.id}">

<option
${order.status == "Aguardando" ? "selected" : ""}>
Aguardando
</option>

<option
${order.status == "Em preparo" ? "selected" : ""}>
Em preparo
</option>

<option
${order.status == "Saiu para entrega" ? "selected" : ""}>
Saiu para entrega
</option>

<option
${order.status == "Entregue" ? "selected" : ""}>
Entregue
</option>

</select>

<br><br>

<button
class="viewOrder"
data-id="${order.id}">

Ver Comprovante

</button>

<button
class="deleteOrder"
data-id="${order.id}">

Excluir

</button>

</div>

`;

  });

  statusEvents();

  viewEvents();

  deleteEvents();

}

// ==============================
// ALTERAR STATUS
// ==============================

function statusEvents() {

  document
    .querySelectorAll(".statusSelect")
    .forEach(select => {

      select.onchange = () => {

        const id =
          Number(select.dataset.id);

        let orders =
          JSON.parse(
            localStorage.getItem("sweetcake_orders")
          ) || [];

        orders = orders.map(order => {

          if (order.id === id) {

            order.status =
              select.value;

          }

          return order;

        });

        localStorage.setItem(

          "sweetcake_orders",

          JSON.stringify(orders)

        );

      };

    });

}

// ==============================
// VER COMPROVANTE
// ==============================

function viewEvents() {

  document
    .querySelectorAll(".viewOrder")
    .forEach(button => {

      button.onclick = () => {

        const id =
          Number(button.dataset.id);

        const orders =
          JSON.parse(
            localStorage.getItem("sweetcake_orders")
          ) || [];

        const order =
          orders.find(o => o.id === id);

        showReceipt(order);

      };

    });

}

// ==============================
// EXCLUIR
// ==============================

function deleteEvents() {

  document
    .querySelectorAll(".deleteOrder")
    .forEach(button => {

      button.onclick = () => {

        if (!confirm("Excluir pedido?")) {

          return;

        }

        const id =
          Number(button.dataset.id);

        let orders =
          JSON.parse(
            localStorage.getItem("sweetcake_orders")
          ) || [];

        orders =
          orders.filter(o => o.id !== id);

        localStorage.setItem(

          "sweetcake_orders",

          JSON.stringify(orders)

        );

        renderOrders();

      };

    });

}

// ==============================
// PESQUISA
// ==============================

document
  .getElementById("searchOrder")
  .onkeyup = (e) => {

    const value =
      e.target.value
        .toLowerCase();

    document
      .querySelectorAll("#ordersList > div")
      .forEach(card => {

        const text =
          card.innerText
            .toLowerCase();

        card.style.display =
          text.includes(value)
            ? "block"
            : "none";

      });

  };