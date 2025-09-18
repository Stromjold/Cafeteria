document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const cartToggle = document.getElementById('cart-toggle');
    const closeCart = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    let productosData = {
        success: true,
        productos: []
    };

    // Carga los productos guardados en localStorage
    const cargarProductosDesdeLocalStorage = () => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos'));
        
        if (!productosGuardados) {
            productosData.productos = [
                {
                    id_producto: 1,
                    nombre: "Café Premium Colombiano",
                    proveedor: "Café del Valle",
                    precio_unitario: 8590,
                    enlace_imagen: "https://cafesluthier.es/wp-content/uploads/2021/03/Historia-del-cafe-en-Colombia-cafemalist-1.jpg"
                },
                {
                    id_producto: 2,
                    nombre: "Chocolate Artesanal",
                    proveedor: "Dulces Tradición",
                    precio_unitario: 8990,
                    enlace_imagen: "https://www.shutterstock.com/image-photo/european-artisan-chocolate-celebrated-meticulous-600nw-2490524899.jpg"
                },
                {
                    id_producto: 3,
                    nombre: "Té Verde Orgánico",
                    proveedor: "Hierbas Naturales",
                    precio_unitario: 12500,
                    enlace_imagen: "https://image.tuasaude.com/media/article/yp/dt/beneficios-del-te-verde_17350.jpg"
                },
                {
                    id_producto: 4,
                    nombre: "Miel de Abeja Pura",
                    proveedor: "Apiarios del Sur",
                    precio_unitario: 10900,
                    enlace_imagen: "https://m.media-amazon.com/images/I/71rdTMsqEvL._UF350,350_QL80_.jpg"
                },
                {
                    id_producto: 5,
                    nombre: "Galletas Chocolatada",
                    proveedor: "Panadería Artesanal",
                    precio_unitario: 6990,
                    enlace_imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5GW-kpWv8Exjkj8Ux4UepGLYZX4y80esvyw&s"
                },
                {
                    id_producto: 6,
                    nombre: "Cafe Ristretto",
                    proveedor: "Coffe Premium",
                    precio_unitario: 12990,
                    enlace_imagen: "https://primerocafe.com.mx/wp-content/uploads/2019/10/receta-para-preparar-cafe-ristretto-1200x500.jpg"
                }
            ];
            // Guarda la lista por defecto en localStorage solo si no existía
            localStorage.setItem('productos', JSON.stringify(productosData.productos));
        } else {
            // Si hay productos en localStorage, los asigna a productosData
            productosData.productos = productosGuardados;
        }
    };
    
    // Función principal para cargar y renderizar los productos
    const cargarYRenderizarProductos = () => {
        cargarProductosDesdeLocalStorage(); // Esto llena `productosData` con los datos del localStorage
        productosContainer.innerHTML = ''; // Limpia el contenedor de productos

        const data = productosData;
        if (data.success && data.productos.length > 0) {
            data.productos.forEach(producto => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 relative group';
                productCard.innerHTML = `
                    <img src="${producto.enlace_imagen}" alt="${producto.nombre}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-[#5a3e2b] mb-2">${producto.nombre}</h3>
                        <p class="text-gray-600 mb-4">${producto.proveedor}</p>
                        <p class="text-2xl font-bold text-gray-800">$${producto.precio_unitario.toLocaleString('es-ES', { minimumFractionDigits: 0 })}</p>
                        <button class="mt-4 w-full bg-[#7c5d4b] text-white py-2 rounded-lg font-semibold hover:bg-[#5a3e2b] transition-colors">Añadir al Carrito</button>
                    </div>
                    <button class="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delete-product-btn" data-product-id="${producto.id_producto}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                `;
                productosContainer.appendChild(productCard);

                const addButton = productCard.querySelector('button');
                addButton.addEventListener('click', () => {
                    const productToAdd = {
                        id: producto.id_producto,
                        nombre: producto.nombre,
                        // Al añadir al carrito, el precio debe ser un número
                        precio: producto.precio_unitario
                    };
                    addToCart(productToAdd);
                });
                
                const deleteButton = productCard.querySelector('.delete-product-btn');
                deleteButton.addEventListener('click', (event) => {
                    const productId = event.currentTarget.getAttribute('data-product-id');
                    
                    // 1. Filtra los productos para eliminar el que coincide con el ID
                    productosData.productos = productosData.productos.filter(p => p.id_producto !== parseInt(productId));

                    // 2. Guarda la nueva lista de productos en localStorage para que el cambio sea permanente
                    localStorage.setItem('productos', JSON.stringify(productosData.productos));
                    
                    // 3. Elimina visualmente el elemento del DOM directamente
                    const productElement = event.currentTarget.closest('.bg-white.rounded-lg.shadow-md');
                    if (productElement) {
                        productElement.remove();
                    }                    
                    // Muestra una notificación de confirmación
                    showNotification(`Producto eliminado.`);
                });
            });
        } else {
            productosContainer.innerHTML = '<p class="text-center text-gray-500">No hay productos disponibles en este momento.</p>';
        }
    };

    const updateCartCount = () => {
        const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        checkoutBtn.disabled = totalItems === 0;
    };

    const formatPrice = (price) => {
    // Convierte el número a una cadena de texto con formato de miles
    return price.toLocaleString('es-ES', { minimumFractionDigits: 0 });
    };

    const addToCart = (product) => {
        if (cart[product.id]) {
            cart[product.id].quantity++;
        } else {
            cart[product.id] = { ...product, quantity: 1 };
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
        
        // Mostrar notificación
        showNotification(`${product.nombre} se ha añadido al carrito.`);
    };

    const removeFromCart = (productId) => {
        if (cart[productId]) {
            if (cart[productId].quantity > 1) {
                cart[productId].quantity--;
            } else {
                delete cart[productId];
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
        }
    };

    const updateCartDisplay = () => {
        const cartItemsArray = Object.values(cart);
        
        if (cartItemsArray.length === 0) {
            cartItems.innerHTML = '<p class="text-center text-gray-500">Tu carrito está vacío</p>';
            cartTotal.textContent = '$0';
            return;
        }

        let total = 0;
        cartItems.innerHTML = cartItemsArray.map(item => {
            const itemTotal = item.precio * item.quantity;
            total += itemTotal;
            
            return `
                <div class="flex items-center justify-between p-4 border-b">
                    <div class="flex-1">
                        <h4 class="font-semibold text-[#5a3e2b]">${item.nombre}</h4>
                        <p class="text-gray-600">$${formatPrice(item.precio)} c/u</p>
                    </div>
                    <div class="flex items-center space-x-3">
                        <button onclick="removeFromCart(${item.id})" class="bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-colors">-</button>
                        <span class="font-semibold min-w-[2rem] text-center">${item.quantity}</span>
                        <button onclick="addToCart({id: ${item.id}, nombre: '${item.nombre}', precio: ${item.precio}})" class="bg-green-500 text-white w-8 h-8 rounded-full hover:bg-green-600 transition-colors">+</button>
                    </div>
                    <div class="ml-4 font-bold text-[#5a3e2b]">
                        $${formatPrice(itemTotal)}
                    </div>
                </div>
            `;
        }).join('');

        cartTotal.textContent = `$${formatPrice(total)}`;
    };

    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    };

    // 💡 NUEVO: Escucha el evento 'productosActualizados' y vuelve a renderizar los productos
    window.addEventListener('productosActualizados', cargarYRenderizarProductos);

    // Inicialización
    cargarYRenderizarProductos(); // Llama a la nueva función al cargar la página
    updateCartCount();
    updateCartDisplay();

    // Event listeners para el modal del carrito
    cartToggle.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
        updateCartDisplay();
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.add('hidden');
        }
    });

    // Variables para los nuevos modales
    const paymentModal = document.getElementById('payment-modal');
    const debitModal = document.getElementById('debit-modal');
    const receiptModal = document.getElementById('receipt-modal');
    const closePayment = document.getElementById('close-payment');
    const closeDebit = document.getElementById('close-debit');
    const closeReceipt = document.getElementById('close-receipt');
    const payCash = document.getElementById('pay-cash');
    const payDebit = document.getElementById('pay-debit');
    const debitForm = document.getElementById('debit-form');
    const debitTotal = document.getElementById('debit-total');
    const receiptContent = document.getElementById('receipt-content');
    const printReceipt = document.getElementById('print-receipt');

    let currentPurchase = null;

    const generateReceiptNumber = () => {
        return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        return {
            date: now.toLocaleDateString('es-CL'),
            time: now.toLocaleTimeString('es-CL')
        };
    };

    const generateReceipt = (paymentMethod, customerData = null) => {
        const cartItemsArray = Object.values(cart);
        const total = cartItemsArray.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
        const { date, time } = getCurrentDateTime();
        const receiptNumber = generateReceiptNumber();

        let customerInfo = '';
        if (paymentMethod === 'debito' && customerData) {
            customerInfo = `
                <div class="mb-4 p-3 bg-gray-50 rounded">
                    <p><strong>Cliente:</strong> ${customerData.name}</p>
                    <p><strong>RUT:</strong> ${customerData.rut}</p>
                </div>
            `;
        }

        const itemsList = cartItemsArray.map(item => `
            <div class="flex justify-between py-1">
                <span>${item.nombre} x${item.quantity}</span>
                <span>$${formatPrice(item.precio * item.quantity)}</span>
            </div>
        `).join('');

        return `
            <div class="text-center mb-4">
                <h3 class="text-xl font-bold text-[#5a3e2b]">MI TIENDA</h3>
                <p class="text-sm text-gray-600">Boleta Electrónica</p>
                <p class="text-sm text-gray-600">N° ${receiptNumber}</p>
            </div>
            
            <div class="mb-4 text-sm">
                <p><strong>Fecha:</strong> ${date}</p>
                <p><strong>Hora:</strong> ${time}</p>
                <p><strong>Método de Pago:</strong> ${paymentMethod === 'efectivo' ? 'Efectivo' : 'Débito'}</p>
            </div>

            ${customerInfo}

            <div class="border-t border-b py-3 mb-4">
                <h4 class="font-semibold mb-2">Detalle de Compra:</h4>
                ${itemsList}
            </div>

            <div class="text-right">
                <div class="text-2xl font-bold text-[#5a3e2b]">
                    Total: $${formatPrice(total)}
                </div>
            </div>

            <div class="mt-6 text-center text-sm text-gray-500">
                <p>¡Gracias por su compra!</p>
                <p>Conserve esta boleta</p>
            </div>
        `;
    };

    const completePurchase = (paymentMethod, customerData = null) => {
        // Generar la boleta
        receiptContent.innerHTML = generateReceipt(paymentMethod, customerData);
        
        // Limpiar el carrito
        cart = {};
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
        
        // Cerrar modales anteriores
        cartModal.classList.add('hidden');
        paymentModal.classList.add('hidden');
        debitModal.classList.add('hidden');
        
        // Mostrar boleta
        receiptModal.classList.remove('hidden');
    };

    checkoutBtn.addEventListener('click', () => {
        if (Object.keys(cart).length > 0) {
            const total = Object.values(cart).reduce((sum, item) => sum + (item.precio * item.quantity), 0);
            debitTotal.textContent = `$${formatPrice(total)}`;
            cartModal.classList.add('hidden');
            paymentModal.classList.remove('hidden');
        }
    });

    // Event listeners para opciones de pago
    payCash.addEventListener('click', () => {
        completePurchase('efectivo');
    });

    payDebit.addEventListener('click', () => {
        const total = Object.values(cart).reduce((sum, item) => sum + (item.precio * item.quantity), 0);
        debitTotal.textContent = `$${formatPrice(total)}`;
        paymentModal.classList.add('hidden');
        debitModal.classList.remove('hidden');
    });

    // Formulario de débito
    debitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rut = document.getElementById('rut-input').value.trim();
        const name = document.getElementById('name-input').value.trim();
        
        if (rut && name) {
            completePurchase('debito', { rut, name });
            // Limpiar formulario
            debitForm.reset();
        }
    });

    // Event listeners para cerrar modales
    closePayment.addEventListener('click', () => {
        paymentModal.classList.add('hidden');
        cartModal.classList.remove('hidden');
    });

    closeDebit.addEventListener('click', () => {
        debitModal.classList.add('hidden');
        paymentModal.classList.remove('hidden');
    });

    closeReceipt.addEventListener('click', () => {
        receiptModal.classList.add('hidden');
    });

    // Cerrar modales al hacer clic fuera
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.classList.add('hidden');
            cartModal.classList.remove('hidden');
        }
    });

    debitModal.addEventListener('click', (e) => {
        if (e.target === debitModal) {
            debitModal.classList.add('hidden');
            paymentModal.classList.remove('hidden');
        }
    });

    receiptModal.addEventListener('click', (e) => {
        if (e.target === receiptModal) {
            receiptModal.classList.add('hidden');
        }
    });

    // Función de imprimir boleta
    printReceipt.addEventListener('click', () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Boleta de Compra</title>
                    <style>
                        body { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
                        .text-center { text-align: center; }
                        .font-bold { font-weight: bold; }
                        .mb-4 { margin-bottom: 16px; }
                        .py-1 { padding: 4px 0; }
                        .border-t { border-top: 1px solid #ccc; }
                        .border-b { border-bottom: 1px solid #ccc; }
                        .py-3 { padding: 12px 0; }
                        .text-right { text-align: right; }
                        .text-2xl { font-size: 24px; }
                        .mt-6 { margin-top: 24px; }
                        .text-sm { font-size: 14px; }
                        .text-gray-500 { color: #666; }
                        .bg-gray-50 { background-color: #f9f9f9; }
                        .p-3 { padding: 12px; }
                        .rounded { border-radius: 4px; }
                        .flex { display: flex; }
                        .justify-between { justify-content: space-between; }
                    </style>
                </head>
                <body>
                    ${receiptContent.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print(); 
    });

    // Hacer funciones globales para los botones del carrito
    window.addToCart = addToCart; // 💡 NUEVO
    window.removeFromCart = removeFromCart; // 💡 NUEVO

    // Inicializar
    cargarYRenderizarProductos(); // Llama a la función que carga y renderiza
    updateCartCount(); // Actualiza el contador del carrito
    updateCartDisplay(); // Muestra los items en el carrito
});