// Datos del menú con precios en pesos chilenos y nuevos productos
const menuItems = [{
    id: 1,
    name: "Espresso",
    description: "Café concentrado con un sabor intenso",
    price: 2250,
    category: "cafes",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4c-4.418 0-8 3.582-8 8v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-4.418-3.582-8-8-8z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 18h8M12 4v2M17 7l1-1M7 7L6 6" />
        </svg>`
}, {
    id: 2,
    name: "Cappuccino",
    description: "Espresso con leche vaporizada y espuma",
    price: 3150,
    category: "cafes",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4c-4.418 0-8 3.582-8 8v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-4.418-3.582-8-8-8z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 18h8M12 4v2M17 7l1-1M7 7L6 6" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 10c2 0 4 1 4 1s2-1 4-1" />
        </svg>`
}, {
    id: 3,
    name: "Latte",
    description: "Espresso con abundante leche vaporizada",
    price: 3350,
    category: "cafes",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4c-4.418 0-8 3.582-8 8v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-4.418-3.582-8-8-8z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 18h8M12 4v2M17 7l1-1M7 7L6 6" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 10c2 0 4 1 4 1s2-1 4-1M8 13c2 0 4 1 4 1s2-1 4-1" />
        </svg>`
}, {
    id: 4,
    name: "Tostadas con Aguacate",
    description: "Pan artesanal con aguacate, tomate y semillas",
    price: 5850,
    category: "desayunos",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 6H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V7a1 1 0 00-1-1z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 10c.5-.5 1.5-.5 2 0s1.5.5 2 0 1.5-.5 2 0" />
        </svg>`
}, {
    id: 5,
    name: "Huevos Benedictinos",
    description: "Huevos pochados sobre muffin inglés con salsa holandesa",
    price: 7450,
    category: "desayunos",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="6" stroke-width="1" />
            <circle cx="12" cy="12" r="3" stroke-width="1" />
        </svg>`
}, {
    id: 6,
    name: "Pancakes con Frutas",
    description: "Torre de pancakes con frutas frescas y miel",
    price: 6750,
    category: "desayunos",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 10h12M6 14h12M8 18h8M8 6h8" />
        </svg>`
}, {
    id: 7,
    name: "Tarta de Chocolate",
    description: "Deliciosa tarta con chocolate belga y ganache",
    price: 4750,
    category: "pasteles",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4L4 8v8l8 4 8-4V8l-8-4z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 8l8 4 8-4M12 12v8" />
        </svg>`
}, {
    id: 8,
    name: "Cheesecake",
    description: "Tarta de queso cremosa con coulis de frutos rojos",
    price: 5150,
    category: "pasteles",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="8" stroke-width="1" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4v16M4 12h16" />
        </svg>`
}, {
    id: 9,
    name: "Croissant",
    description: "Croissant de mantequilla recién horneado",
    price: 2650,
    category: "pasteles",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4-4 4 4 8-8" />
        </svg>`
}, {
    id: 10,
    name: "Marraqueta con Palta",
    description: "Tradicional pan marraqueta con palta molida y una pizca de sal",
    price: 3900,
    category: "desayunos",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h16M4 12h16M4 18h16" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 9c.5-.5 1.5-.5 2 0s1.5.5 2 0" />
        </svg>`
}, {
    id: 11,
    name: "Completo Italiano",
    description: "Hot-dog chileno con palta, tomate y mayonesa casera",
    price: 4500,
    category: "desayunos",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h16M4 18h16" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 12h12" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 9c.5-.5 1.5-.5 2 0s1.5.5 2 0 1.5-.5 2 0" />
        </svg>`
}, {
    id: 12,
    name: "Café Orgánico",
    description: "Café de origen único, cultivado de forma sostenible y certificado orgánico",
    price: 3950,
    category: "cafes",
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4c-4.418 0-8 3.582-8 8v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-4.418-3.582-8-8-8z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 18h8M12 4v2" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 8c.5-.5 1.5-.5 2 0s1.5.5 2 0" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 12c0-3 3-5 6-5s6 2 6 5" />
        </svg>`
}, {
    id: 13,
    name: "Brownie de Chocolate",
    description: "Brownie casero con trozos de chocolate y nueces, servido con helado de vainilla",
    price: 4950,
    category: "pasteles",
    isStarProduct: true, // Marcamos este producto como estrella
    image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke-width="1" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 8l2 2M14 8l2 2M8 14l2 2M14 14l2 2" />
        </svg>`
}];

// Carrito de compras
let cart = [];
let currentCategory = "todos";
let orderNumber = 1001;
let invoices = []; // Array para almacenar las facturas
let userRut = ''; // Variable global para guardar el RUT

// Elementos del DOM
const menuContainer = document.getElementById('menu-container');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const emptyCartMessage = document.getElementById('empty-cart-message');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const confirmationModal = document.getElementById('confirmation-modal');
const categoryButtons = document.querySelectorAll('.category-btn');
const invoicesModal = document.getElementById('invoices-modal');
const invoicesTableBody = document.getElementById('invoices-table-body');
const invoiceDetailModal = document.getElementById('invoice-detail-modal');
const invoiceDetailContent = document.getElementById('invoice-detail-content');

// Nuevos elementos del DOM para el cálculo del vuelto
const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
const cashAmountGroup = document.getElementById('cash-amount-group');
const cashAmountInput = document.getElementById('cash-amount');
const changeDueElement = document.getElementById('change-due');

// Elementos del Asistente Virtual
const assistantButton = document.getElementById('assistant-button');
const assistantChat = document.getElementById('assistant-chat');
const closeAssistant = document.getElementById('close-assistant');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendMessage = document.getElementById('send-message');
const typingIndicator = document.getElementById('typing-indicator');
const assistantNotification = document.getElementById('assistant-notification');

// Inicializar la aplicación
function initializeApp() {
    renderMenu();
    setupEventListeners();
    setupAssistantEventListeners();
    setupInvoicesEventListeners();

    // Mostrar notificación del asistente después de 5 segundos
    setTimeout(() => {
        assistantNotification.classList.remove('hidden');
    }, 5000);

    // Agregar algunas facturas de ejemplo
    addSampleInvoices();
}

// Agregar facturas de ejemplo
function addSampleInvoices() {
    invoices = [{
        id: 1000,
        name: "Juan Pérez",
        rut: "12345678-9",
        total: 12750,

        items: [{
            name: "Cappuccino",
            price: 3150,
            quantity: 2
        }, {
            name: "Tostadas con Aguacate",
            price: 5850,
            quantity: 1
        }, {
            name: "Croissant",
            price: 2650,
            quantity: 1
        }]
    }, {
        id: 999,
        name: "María González",
        rut: "98765432-1",
        total: 16350,

        items: [{
            name: "Latte",
            price: 3350,
            quantity: 1
        }, {
            name: "Huevos Benedictinos",
            price: 7450,
            quantity: 1
        }, {
            name: "Brownie de Chocolate",
            price: 4950,
            quantity: 1
        }]
    }, {
        id: 998,
        name: "Carlos Rodríguez",
        rut: "11223344-5",
        total: 9900,

        items: [{
            name: "Espresso",
            price: 2250,
            quantity: 2
        }, {
            name: "Cheesecake",
            price: 5150,
            quantity: 1
        }]
    }];
}

// Renderizar los productos del menú
function renderMenu() {
    menuContainer.innerHTML = '';

    const filteredItems = currentCategory === "todos" ?
        menuItems :
        menuItems.filter(item => item.category === currentCategory);

    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300';

        // Contenido HTML del elemento del menú
        let menuItemHTML = `
            <div class="p-6">
        `;

        // Añadir etiqueta de producto estrella si corresponde
        if (item.isStarProduct) {
            menuItemHTML += `
                <div class="star-product">
                    <span class="star-icon">★</span>
                    Producto Estrella
                </div>
            `;
        }

        menuItemHTML += `
                ${item.image}
                <h3 class="text-xl font-bold text-[#5a3e2b] mb-2">${item.name}</h3>
                <p class="text-gray-600 mb-4">${item.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-[#7c5a2c]">$${item.price.toLocaleString('es-CL')}</span>
                    <button class="add-to-cart bg-[#5a3e2b] text-white px-4 py-2 rounded-lg hover:bg-[#7c5a2c] transition-colors" data-id="${item.id}">
                        Agregar
                    </button>
                </div>
            </div>
        `;

        menuItem.innerHTML = menuItemHTML;
        menuContainer.appendChild(menuItem);
    });
}

// Configurar los event listeners principales
function setupEventListeners() {
    // Botones de categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            renderMenu();
        });
    });

    // Icono del carrito
    document.getElementById('cart-icon').addEventListener('click', () => {
        cartModal.classList.remove('hidden');
        updateCart();
    });

    // Cerrar carrito
    document.getElementById('close-cart').addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    // Botones para agregar al carrito
    menuContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const itemId = parseInt(e.target.dataset.id);
            addToCart(itemId);
        }
    });

    // Botón para ir a pagar
    checkoutBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden');
        // Ya no se pide el RUT, solo se asigna por defecto si está vacío
        if (!userRut) {
            userRut = '-';
        }
        checkoutModal.classList.remove('hidden');
    });

    // Cerrar modal de pago
    document.getElementById('close-checkout').addEventListener('click', () => {
        checkoutModal.classList.add('hidden');
    });

    // Ocultar/mostrar el campo de monto en efectivo según el método de pago
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'efectivo') {
                cashAmountGroup.classList.remove('hidden');
            } else {
                cashAmountGroup.classList.add('hidden');
                cashAmountInput.value = '';
                changeDueElement.textContent = '';
            }
        });
    });

    // Calcular el vuelto en tiempo real
    cashAmountInput.addEventListener('input', () => {
        const total = calculateTotal();
        const cashPaid = parseFloat(cashAmountInput.value);
        if (isNaN(cashPaid) || cashPaid < total) {
            changeDueElement.textContent = 'Monto insuficiente';
            changeDueElement.classList.remove('text-green-600');
            changeDueElement.classList.add('text-red-600');
        } else {
            const change = cashPaid - total;
            changeDueElement.textContent = `Vuelto: $${change.toLocaleString('es-CL')}`;
            changeDueElement.classList.remove('text-red-600');
            changeDueElement.classList.add('text-green-600');
        }
    });

    // Confirmar pedido
    document.getElementById('confirm-order').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const total = calculateTotal();

        if (selectedPaymentMethod === 'efectivo') {
            const cashPaid = parseFloat(cashAmountInput.value);
            if (isNaN(cashPaid) || cashPaid < total) {
                alert('El monto en efectivo es insuficiente.');
                return;
            }
        }

        // Usar el RUT guardado
        const rut = userRut || '-';
        const newInvoice = {
            id: orderNumber,
            name: "Cliente",
            rut: rut,
            total: total,
            notes: "",
            date: new Date().toISOString().split('T')[0],
            items: cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }))
        };

        // Guardar la información del cliente en localStorage
        saveClientPurchase(newInvoice);

        invoices.unshift(newInvoice);
        checkoutModal.classList.add('hidden');
        document.getElementById('order-number').textContent = `#${orderNumber}`;
        document.getElementById('order-date').textContent = new Date().toLocaleDateString('es-CL');
        document.getElementById('confirmation-total').textContent = `$${total.toLocaleString('es-CL')}`;
        confirmationModal.classList.remove('hidden');
        orderNumber++;
    });

    // Cerrar confirmación y mostrar boleta
    document.getElementById('close-confirmation').addEventListener('click', () => {
        confirmationModal.classList.add('hidden');
        // Mostrar la boleta recién creada
        showInvoiceDetail(orderNumber - 1);
        cart = [];
        updateCartCount();
    });

    // Función para guardar o actualizar el historial de compra del cliente en localStorage
    function saveClientPurchase(invoice) {
        let clients = JSON.parse(localStorage.getItem('clients')) || [];
        const today = new Date().toISOString().split('T')[0];

        // Reemplazar los puntos y guiones del RUT para una búsqueda consistente
        const cleanRut = invoice.rut.replace(/\./g, '').replace(/-/g, '');

        const existingClientIndex = clients.findIndex(client => client.rut.replace(/\./g, '').replace(/-/g, '') === cleanRut);

        if (existingClientIndex !== -1) {
            // Actualizar cliente existente
            clients[existingClientIndex].totalCompra += invoice.total;
            clients[existingClientIndex].ultimaCompra = today;
        } else {
            // Crear nuevo cliente
            clients.push({
                nombre: invoice.name,
                rut: invoice.rut,
                ultimaCompra: today,
                totalCompra: invoice.total
            });
        }

        localStorage.setItem('clients', JSON.stringify(clients));
    }
}

// Configurar eventos del modal de facturas
function setupInvoicesEventListeners() {
    // Abrir el modal de facturas
    document.getElementById('invoices-btn').addEventListener('click', () => {
        renderInvoices();
        invoicesModal.classList.remove('hidden');
    });

    // Cerrar el modal de facturas
    document.getElementById('close-invoices').addEventListener('click', () => {
        invoicesModal.classList.add('hidden');
    });

    // Delegar eventos para los botones de "Ver Detalle"
    invoicesTableBody.addEventListener('click', (e) => {
        if (e.target.closest('.view-invoice-btn')) {
            const invoiceId = parseInt(e.target.closest('.view-invoice-btn').dataset.id);
            showInvoiceDetail(invoiceId);
        }
    });
}

// Renderizar las facturas en el modal
function renderInvoices() {
    invoicesTableBody.innerHTML = '';

    invoices.forEach(invoice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${invoice.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${invoice.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${invoice.rut}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${invoice.total.toLocaleString('es-CL')}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="view-invoice-btn text-[#e67e22] hover:text-[#c0681e]" data-id="${invoice.id}">Ver Detalle</button>
            </td>
        `;
        invoicesTableBody.appendChild(row);
    });
}

// Mostrar los detalles de una factura
function showInvoiceDetail(invoiceId) {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
        let itemsHtml = invoice.items.map(item => `
            <div class="flex justify-between">
                <span>${item.quantity}x ${item.name}</span>
                <span>$${(item.quantity * item.price).toLocaleString('es-CL')}</span>
            </div>
        `).join('');

        invoiceDetailContent.innerHTML = `
            <div class="border-b pb-4 mb-4">
                <p class="text-sm text-gray-600"><strong>N° Factura:</strong> #${invoice.id}</p>
                <p class="text-sm text-gray-600"><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-CL')}</p>
                <p class="text-sm text-gray-600"><strong>Cliente:</strong> ${invoice.name}</p>
                <p class="text-sm text-gray-600"><strong>RUT:</strong> ${invoice.rut}</p>
            </div>
            ${itemsHtml}
            <div class="border-t pt-4 mt-4 font-bold text-lg flex justify-between">
                <span>Total:</span>
                <span>$${invoice.total.toLocaleString('es-CL')}</span>
            </div>
        `;
        invoiceDetailModal.classList.remove('hidden');
    }
}

// Cerrar modal de detalles de factura
document.getElementById('close-invoice-detail').addEventListener('click', () => {
    invoiceDetailModal.classList.add('hidden');
});

// Funciones del carrito
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item,
            quantity: 1
        });
    }
    updateCartCount();
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
    } else {
        emptyCartMessage.classList.add('hidden');
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'flex justify-between items-center mb-4';
            cartItem.innerHTML = `
                <div>
                    <h4 class="font-bold text-[#5a3e2b]">${item.name}</h4>
                    <p class="text-sm text-gray-600">$${item.price.toLocaleString('es-CL')}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="cart-remove-item text-red-500 hover:text-red-700" data-id="${item.id}">-</button>
                    <span class="font-bold">${item.quantity}</span>
                    <button class="cart-add-item text-green-500 hover:text-green-700" data-id="${item.id}">+</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    updateCartTotal();
}

// Delegación de eventos para los botones del carrito
cartItems.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('cart-remove-item')) {
        const itemId = parseInt(target.dataset.id);
        removeFromCart(itemId);
    } else if (target.classList.contains('cart-add-item')) {
        const itemId = parseInt(target.dataset.id);
        addToCart(itemId);
    }
});

function removeFromCart(itemId) {
    const existingItemIndex = cart.findIndex(item => item.id === itemId);
    if (existingItemIndex !== -1) {
        if (cart[existingItemIndex].quantity > 1) {
            cart[existingItemIndex].quantity--;
        } else {
            cart.splice(existingItemIndex, 1);
        }
    }
    updateCartCount();
    updateCart();
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    checkoutBtn.disabled = totalItems === 0;
}

function updateCartTotal() {
    const total = calculateTotal();
    cartTotal.textContent = `$${total.toLocaleString('es-CL')}`;

    // Recalcular el vuelto si el método de pago es efectivo
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (selectedPaymentMethod && selectedPaymentMethod.value === 'efectivo') {
        const cashPaid = parseFloat(cashAmountInput.value);
        if (!isNaN(cashPaid)) {
            const change = cashPaid - total;
            changeDueElement.textContent = `Vuelto: $${change.toLocaleString('es-CL')}`;
            if (cashPaid < total) {
                changeDueElement.classList.add('text-red-600');
                changeDueElement.classList.remove('text-green-600');
            } else {
                changeDueElement.classList.remove('text-red-600');
                changeDueElement.classList.add('text-green-600');
            }
        }
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Asistente Virtual
const assistantMessages = [
    "¡Hola! Soy tu asistente virtual de Capuchin Mountain. ¿En qué puedo ayudarte hoy?",
    "¡Hola! Soy tu asistente virtual. Estoy aquí para ayudarte con cualquier pregunta sobre nuestro menú o servicios. ¿Tienes alguna duda?",
    "¿Buscas una recomendación? ¡Puedo ayudarte con eso!",
    "¿Necesitas saber algo sobre los productos o promociones? ¡Solo pregunta!",
];

function setupAssistantEventListeners() {
    assistantButton.addEventListener('click', () => {
        assistantChat.classList.remove('hidden');
        assistantNotification.classList.add('hidden');
    });

    closeAssistant.addEventListener('click', () => {
        assistantChat.classList.add('hidden');
    });

    sendMessage.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
}

function handleUserMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    appendMessage('user', message);
    userInput.value = '';

    // Mostrar indicador de "escribiendo"
    typingIndicator.classList.remove('hidden-assistant');

    // Simular una respuesta del asistente después de un breve retraso
    setTimeout(() => {
        const assistantResponse = getAssistantResponse(message);
        appendMessage('assistant', assistantResponse);
        typingIndicator.classList.add('hidden-assistant');
        chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazarse al final
    }, 1500); // 1.5 segundos de retraso
}

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
}

function getAssistantResponse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hola")) {
        return "¡Hola! ¿En qué puedo ayudarte hoy?";
    } else if (lowerCaseMessage.includes("menu") || lowerCaseMessage.includes("productos")) {
        return "Puedes ver nuestro menú completo desplazándote hacia abajo. Tenemos cafés, desayunos y repostería.";
    } else if (lowerCaseMessage.includes("gracias")) {
        return "De nada. ¡Que tengas un buen día!";
    } else if (lowerCaseMessage.includes("precio")) {
        return "Los precios están indicados junto a cada producto en el menú.";
    } else {
        const randomResponse = assistantMessages[Math.floor(Math.random() * assistantMessages.length)];
        return randomResponse;
    }
}

// Iniciar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initializeApp);