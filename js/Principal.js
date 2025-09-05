// -------------------------------
// CARGA DEL MENÚ Y PRODUCTOS
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Función para obtener y mostrar productos
    const fetchAndDisplayProducts = async (category = 'all') => {
        menuContainer.innerHTML = ''; // Limpia los productos existentes

        try {
            const response = await fetch('PHP/obtener_productos.php');
            const products = await response.json();

            // Filtra por categoría si corresponde
            const filteredProducts = (category === 'all')
                ? products
                : products.filter(product =>
                    product.categoria.toLowerCase() === category.toLowerCase()
                );

            // Si no hay productos
            if (filteredProducts.length === 0) {
                menuContainer.innerHTML = `
                    <p class="text-center text-xl text-gray-500">
                        No hay productos en esta categoría.
                    </p>`;
                return;
            }

            // Renderizado de tarjetas de producto
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className =
                    'bg-white rounded-lg shadow-md overflow-hidden ' +
                    'transform hover:scale-105 transition-transform duration-300';

                productCard.innerHTML = `
                    <div class="p-6">
                        <h3 class="text-2xl font-bold text-[#5a3e2b]">${product.nombre_producto}</h3>
                        <p class="text-[#7c5a2c] text-lg">${product.categoria}</p>
                        <p class="text-gray-600 mt-2">${product.descripcion || 'Sin descripción.'}</p>

                        <div class="flex items-center justify-between mt-4">
                            <span class="text-2xl font-bold text-[#5a3e2b]">
                                $${new Intl.NumberFormat('es-CL').format(product.precio_unitario)}
                            </span>
                            <button 
                                class="add-to-cart-btn bg-[#5a3e2b] text-white px-4 py-2 rounded-full font-bold hover:bg-[#7c5a2c] transition-colors"
                                data-product='${JSON.stringify(product)}'>
                                Agregar
                            </button>
                        </div>
                    </div>
                `;

                menuContainer.appendChild(productCard);
            });

            // Eventos para botones "Agregar"
            document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productData = JSON.parse(e.target.dataset.product);
                    // Aquí puedes enlazar con tu función de carrito real
                    console.log('Producto agregado al carrito:', productData);
                });
            });

        } catch (error) {
            console.error('Error al cargar los productos:', error);
            menuContainer.innerHTML = `
                <p class="text-center text-xl text-red-500">
                    Error al cargar el menú. Intente de nuevo más tarde.
                </p>`;
        }
    };

    // Listener para botones de categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Estilos de categoría activa
            categoryButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-[#7c5a2c]', 'text-white');
                btn.classList.add('bg-[#e6d7c3]', 'text-[#5a3e2b]');
            });

            e.target.classList.add('active', 'bg-[#7c5a2c]', 'text-white');
            e.target.classList.remove('bg-[#e6d7c3]', 'text-[#5a3e2b]');

            // Filtrar productos por categoría
            const category = e.target.dataset.category;
            fetchAndDisplayProducts(category);
        });
    });

    // Carga inicial de productos
    fetchAndDisplayProducts();
});

// -------------------------------
// MANEJO DEL FORMULARIO DE FACTURA Y CARRITO
// -------------------------------
const invoiceForm = document.getElementById('invoice-form');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');

invoiceForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simula proceso de pago exitoso
    setTimeout(() => {
        // Limpia carrito y contadores
        cartItemsContainer.innerHTML = '';
        document.getElementById('cart-count').textContent = '0';
        document.getElementById('cart-total').textContent = '$0';

        // Actualiza interfaz de carrito
        document.getElementById('cart-content').classList.add('hidden');
        document.getElementById('empty-cart-message').classList.remove('hidden');

        // Mensaje de confirmación
        alert('¡Compra realizada con éxito! ¡Gracias por tu compra!');

        // Cierra modal después de 1s
        setTimeout(() => {
            cartModal.classList.add('hidden');
        }, 1000);

    }, 500);
});
