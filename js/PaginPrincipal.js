// Datos del menú con precios en pesos chilenos y nuevos productos
const menuItems = [
    {
        id: 1,
        name: "Espresso",
        description: "Café concentrado con un sabor intenso",
        price: 2250,
        category: "cafes",
        image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4c-4.418 0-8 3.582-8 8v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-4.418-3.582-8-8-8z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 18h8M12 4v2M17 7l1-1M7 7L6 6" />
        </svg>`
    },
    {
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
    },
    {
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
    },
    {
        id: 4,
        name: "Tostadas con Aguacate",
        description: "Pan artesanal con aguacate, tomate y semillas",
        price: 5850,
        category: "desayunos",
        image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 6H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V7a1 1 0 00-1-1z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 10c.5-.5 1.5-.5 2 0s1.5.5 2 0 1.5-.5 2 0" />
        </svg>`
    },
    {
        id: 5,
        name: "Huevos Benedictinos",
        description: "Huevos pochados sobre muffin inglés con salsa holandesa",
        price: 7450,
        category: "desayunos",
        image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="6" stroke-width="1" />
            <circle cx="12" cy="12" r="3" stroke-width="1" />
        </svg>`
    },
    {
        id: 6,
        name: "Pancakes con Frutas",
        description: "Torre de pancakes con frutas frescas y miel",
        price: 6750,
        category: "desayunos",
        image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 10h12M6 14h12M8 18h8M8 6h8" />
        </svg>`
    },
    {
        id: 7,
        name: "Tarta de Chocolate",
        description: "Deliciosa tarta con chocolate belga y ganache",
        price: 4750,
        category: "pasteles",
        image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4L4 8v8l8 4 8-4V8l-8-4z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 8l8 4 8-4M12 12v8" />
        </svg>`
    },
    {
        id: 8,
        name: "Cheesecake",
        description: "Tarta de queso cremosa con coulis de frutos rojos",
        price: 5150,
        category: "pasteles",
        image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="8" stroke-width="1" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4v16M4 12h16" />
        </svg>`
    },
    {
        id: 9,
        name: "Croissant",
        description: "Croissant de mantequilla recién horneado",
        price: 2650,
        category: "pasteles",
        image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4-4 4 4 8-8" />
        </svg>`
    },
    {
        id: 10,
        name: "Marraqueta con Palta",
        description: "Tradicional pan marraqueta con palta molida y una pizca de sal",
        price: 3900,
        category: "desayunos",
        image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-4 text-[#5a3e2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h16M4 12h16M4 18h16" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 9c.5-.5 1.5-.5 2 0s1.5.5 2 0" />
        </svg>`
    },
    {
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
    },
    {
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
    },
    {
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
    }
];

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
    invoices = [
        {
            id: 1000,
            name: "Juan Pérez",
            rut: "12345678-9",
            total: 12750,
            
            items: [
                { name: "Cappuccino", price: 3150, quantity: 2 },
                { name: "Tostadas con Aguacate", price: 5850, quantity: 1 },
                { name: "Croissant", price: 2650, quantity: 1 }
            ]
        },
        {
            id: 999,
            name: "María González",
            rut: "98765432-1",
            total: 16350,
            
            items: [
                { name: "Latte", price: 3350, quantity: 1 },
                { name: "Huevos Benedictinos", price: 7450, quantity: 1 },
                { name: "Brownie de Chocolate", price: 4950, quantity: 1 }
            ]
        },
        {
            id: 998,
            name: "Carlos Rodríguez",
            rut: "11223344-5",
            total: 9900,
            
            items: [
                { name: "Espresso", price: 2250, quantity: 2 },
                { name: "Cheesecake", price: 5150, quantity: 1 }
            ]
        }
    ];
}

// Renderizar los productos del menú
function renderMenu() {
    menuContainer.innerHTML = '';
    
    const filteredItems = currentCategory === "todos" 
        ? menuItems 
        : menuItems.filter(item => item.category === currentCategory);
    
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

    // Confirmar pedido
    document.getElementById('confirm-order').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        // Usar el RUT guardado
        const rut = userRut || '-';

        const newInvoice = {
            id: orderNumber,
            name: "Cliente",
            rut: rut,
            total: calculateTotal(),
            notes: "",
            date: new Date().toISOString().split('T')[0],
            items: cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }))
        };

        invoices.unshift(newInvoice);

        checkoutModal.classList.add('hidden');

        document.getElementById('order-number').textContent = `#${orderNumber}`;
        document.getElementById('order-date').textContent = new Date().toLocaleDateString('es-CL');
        document.getElementById('confirmation-total').textContent = `$${calculateTotal().toLocaleString('es-CL')}`;

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
}

// Configurar eventos para las facturas
function setupInvoicesEventListeners() {
    // Botón de facturas
    document.getElementById('invoices-btn').addEventListener('click', () => {
        renderInvoices();
        invoicesModal.classList.remove('hidden');
    });
    
    // Cerrar facturas
    document.getElementById('close-invoices').addEventListener('click', () => {
        invoicesModal.classList.add('hidden');
    });
    
    // Cerrar detalle de factura
    document.getElementById('close-invoice-detail').addEventListener('click', () => {
        invoiceDetailModal.classList.add('hidden');
    });
}

// Renderizar la tabla de facturas
function renderInvoices() {
    invoicesTableBody.innerHTML = '';
    
    invoices.forEach(invoice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">#${invoice.id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${invoice.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${invoice.rut || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap">$${invoice.total.toLocaleString('es-CL')}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button class="view-invoice bg-[#e67e22] text-white px-3 py-1 rounded hover:bg-[#d35400] transition-colors" data-id="${invoice.id}">
                    Ver detalle
                </button>
            </td>
        `;
        invoicesTableBody.appendChild(row);
    });
    
    // Add event listeners for view invoice buttons
    document.querySelectorAll('.view-invoice').forEach(button => {
        button.addEventListener('click', () => {
            const invoiceId = parseInt(button.dataset.id);
            showInvoiceDetail(invoiceId);
        });
    });
}

// Mostrar detalle de la factura
function showInvoiceDetail(invoiceId) {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    // Obtener hora de compra (si no existe, usar hora actual)
    let hora = invoice.hora || new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    // Obtener RUT (si no existe, mostrar '-')
    let rut = invoice.rut || '-';

    invoiceDetailContent.innerHTML = `
<div class="space-y-4">
    <div class="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
            <h3 class="text-xl font-bold text-[#5a3e2b]">Factura #${invoice.id}</h3>
            <p class="text-gray-600">${new Date(invoice.date).toLocaleDateString('es-CL')}</p>
        </div>
        <div class="bg-[#e67e22] text-white px-3 py-1 rounded-lg">
            $${invoice.total.toLocaleString('es-CL')}
        </div>
    </div>
    
    <div>
        <h4 class="font-medium text-gray-700 mb-2">Datos del cliente:</h4>
        <p><span class="font-medium">RUT:</span> ${rut}</p>
        <p><span class="font-medium">Hora de compra:</span> ${hora}</p>
    </div>
    
    <div>
        <h4 class="font-medium text-gray-700 mb-2">Productos:</h4>
        <div class="space-y-2">
            ${invoice.items.map(item => `
                <div class="flex justify-between">
                    <span>${item.quantity}x ${item.name}</span>
                    <span>$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                </div>
            `).join('')}
        </div>
    </div>
    
    <div class="border-t border-gray-200 pt-4 flex justify-between font-bold">
        <span>Total:</span>
        <span>$${invoice.total.toLocaleString('es-CL')}</span>
    </div>
</div>
`;
    
    invoiceDetailModal.classList.remove('hidden');
}

// Agregar producto al carrito
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }
    
    updateCartCount();
    showAddedToCartNotification(item.name);
}

// Actualizar el contador del carrito
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Enable/disable checkout button
    checkoutBtn.disabled = totalItems === 0;
}

// Mostrar notificación de producto agregado
function showAddedToCartNotification(itemName) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out';
    notification.textContent = `${itemName} añadido al carrito`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Actualizar el carrito
function updateCart() {
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartItems.innerHTML = '';
    } else {
        emptyCartMessage.classList.add('hidden');
        
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'flex justify-between items-center mb-4 pb-4 border-b border-gray-200';
            cartItem.innerHTML = `
                <div>
                    <h3 class="font-medium">${item.name}</h3>
                    <div class="flex items-center mt-1">
                        <button class="decrease-quantity bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center" data-id="${item.id}">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="increase-quantity bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-medium">$${(item.price * item.quantity).toLocaleString('es-CL')}</div>
                    <button class="remove-item text-red-500 text-sm mt-1" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners for cart item buttons
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.dataset.id);
                decreaseQuantity(itemId);
            });
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.dataset.id);
                increaseQuantity(itemId);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.dataset.id);
                removeFromCart(itemId);
            });
        });
    }
    
    cartTotal.textContent = `$${calculateTotal().toLocaleString('es-CL')}`;
}

// Calcular el total del carrito
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Disminuir cantidad de un producto en el carrito
function decreaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCart();
            updateCartCount();
        }
    }
}

// Aumentar cantidad de un producto en el carrito
function increaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += 1;
        updateCart();
        updateCartCount();
    }
}

// Eliminar producto del carrito
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    updateCartCount();
}

// Configurar eventos del asistente virtual
function setupAssistantEventListeners() {
    assistantButton.addEventListener('click', () => {
        assistantChat.classList.toggle('active');
        assistantNotification.classList.add('hidden');
    });
    
    closeAssistant.addEventListener('click', () => {
        assistantChat.classList.remove('active');
    });
    
    sendMessage.addEventListener('click', sendUserMessage);
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
}

// Enviar mensaje del usuario al asistente
function sendUserMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'message user';
    userMessageElement.textContent = message;
    chatMessages.appendChild(userMessageElement);
    
    // Clear input
    userInput.value = '';
    
    // Show typing indicator
    typingIndicator.classList.remove('hidden-assistant');
    chatMessages.appendChild(typingIndicator);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate bot response after a delay
    setTimeout(() => {
        typingIndicator.classList.add('hidden-assistant');
        
        // Generate bot response
        const botResponse = generateBotResponse(message);
        
        // Add bot message to chat
        const botMessageElement = document.createElement('div');
        botMessageElement.className = 'message bot';
        botMessageElement.textContent = botResponse;
        chatMessages.appendChild(botMessageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000 + Math.random() * 1000);
}

// Generar respuesta del bot
function generateBotResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas tardes') || message.includes('buenas noches')) {
        return '¡Hola! ¿En qué puedo ayudarte hoy?';
    } else if (message.includes('menú') || message.includes('carta') || message.includes('qué ofrecen')) {
        return 'Ofrecemos una variedad de cafés, desayunos y repostería. Puedes ver todo nuestro menú en la página principal. ¿Buscas algo en específico?';
    } else if (message.includes('café') || message.includes('cafes')) {
        return 'Tenemos espresso, cappuccino, latte y café orgánico. Todos preparados con granos de la mejor calidad.';
    } else if (message.includes('desayuno') || message.includes('desayunos')) {
        return 'Para desayunar ofrecemos tostadas con aguacate, huevos benedictinos, pancakes con frutas, marraqueta con palta y completo italiano.';
    } else if (message.includes('pastel') || message.includes('pasteles') || message.includes('repostería')) {
        return 'En nuestra repostería tenemos tarta de chocolate, cheesecake, croissant y nuestro producto estrella: brownie de chocolate con helado.';
    } else if (message.includes('precio') || message.includes('cuánto cuesta') || message.includes('valor')) {
        return 'Los precios varían según el producto. Puedes ver el precio de cada ítem en nuestro menú. ¿Te interesa algo en particular?';
    } else if (message.includes('ubicación') || message.includes('dirección') || message.includes('dónde están')) {
        return 'Estamos ubicados en Avenida Montaña 123, en el centro de la ciudad. Abrimos todos los días de 8:00 a 20:00 hrs.';
    } else if (message.includes('factura') || message.includes('facturas') || message.includes('boleta')) {
        return 'Puedes ver todas tus facturas haciendo clic en el botón "Facturas" en la parte superior de la página. Allí encontrarás el historial de tus pedidos.';
    } else if (message.includes('gracias')) {
        return '¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?';
    } else if (message.includes('adiós') || message.includes('chao') || message.includes('hasta luego')) {
        return '¡Hasta pronto! Esperamos verte en Capuchin Mountain. ¡Que tengas un excelente día!';
    } else {
        return 'Lo siento, no entendí tu consulta. ¿Puedes reformularla? Puedo ayudarte con información sobre nuestro menú, precios, ubicación y horarios.';
    }
}

// Inicializar la app cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initializeApp);

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'952aad35972bb519',t:'MTc1MDQxNjMyNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();

// ...dentro de la función que confirma el pedido...
function guardarFactura(factura) {
    let facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    facturas.push(factura);
    localStorage.setItem('facturas', JSON.stringify(facturas));
}

// Ejemplo de uso al confirmar pedido:
const factura = {
    id: Date.now(),
    nombre: document.getElementById('customer-name').value,
    rut: document.getElementById('customer-rut').value,
    total: calcularTotalCarrito(), // tu función de total
    detalle: obtenerDetalleCarrito(), // tu función para detalle
};
guardarFactura(factura);

    // ... (código existente) ...

    document.getElementById('confirm-order').addEventListener('click', async () => {
        const customerName = document.getElementById('customer-name').value;
        const customerRut = document.getElementById('customer-rut').value;
        const totalAmount = parseFloat(document.getElementById('cart-total').textContent.replace('$', ''));
        const cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Obtener los items del carrito

        // Validar que el nombre del cliente no esté vacío
        if (!customerName.trim()) {
            alert('Por favor, ingresa tu nombre para finalizar el pedido.');
            return;
        }

        const invoiceData = {
            customerName: customerName,
            customerRut: customerRut,
            totalAmount: totalAmount,
            items: cartItems // Incluir los detalles de los productos
        };

        try {
            const response = await fetch('http://localhost/CapuchinMountain/api/save_invoice.php', { // Ajusta la ruta a tu archivo PHP
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(invoiceData)
            });

            const result = await response.json();

            if (result.success) {
                // Mostrar modal de confirmación
                document.getElementById('checkout-modal').classList.add('hidden');
                document.getElementById('order-number').textContent = `#${result.invoiceId}`; // Usar el ID de la factura de la DB
                document.getElementById('order-date').textContent = new Date().toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                document.getElementById('confirmation-total').textContent = `$${totalAmount.toFixed(2)}`;
                document.getElementById('confirmation-modal').classList.remove('hidden');

                // Limpiar el carrito y actualizar la UI
                localStorage.removeItem('cart');
                updateCartDisplay();
                updateCartCount();
            } else {
                alert('Error al guardar la factura: ' + result.message);
            }
        } catch (error) {
            console.error('Error al enviar la factura:', error);
            alert('Hubo un problema al procesar tu pedido. Inténtalo de nuevo.');
        }
    });

    // ... (resto del código) ...
    