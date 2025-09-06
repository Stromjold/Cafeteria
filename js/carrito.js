document.addEventListener('DOMContentLoaded', () => {
            const productosContainer = document.getElementById('productos-container');

            const cargarProductos = async () => {
                try {
                    const response = await fetch('PHP/obtener_productos.php');
                    const data = await response.json();

                    if (data.success && data.productos.length > 0) {
                        data.productos.forEach(producto => {
                            const productCard = document.createElement('div');
                            productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105';
                            productCard.innerHTML = `
                                <img src="${producto.enlace_imagen}" alt="${producto.nombre}" class="w-full h-48 object-cover">
                                <div class="p-6">
                                    <h3 class="text-xl font-bold text-[#5a3e2b] mb-2">${producto.nombre}</h3>
                                    <p class="text-gray-600 mb-4">${producto.proveedor}</p>
                                    <p class="text-2xl font-bold text-gray-800">$${new Intl.NumberFormat('es-CL').format(producto.precio_unitario)}</p>
                                    <button class="mt-4 w-full bg-[#7c5d4b] text-white py-2 rounded-lg font-semibold hover:bg-[#5a3e2b] transition-colors">Añadir al Carrito</button>
                                </div>
                            `;
                            productosContainer.appendChild(productCard);
                        });
                    } else {
                        productosContainer.innerHTML = '<p class="text-center text-gray-500">No hay productos disponibles en este momento.</p>';
                    }

                } catch (error) {
                    console.error('Error al cargar productos:', error);
                    productosContainer.innerHTML = '<p class="text-center text-red-500">Hubo un problema al cargar los productos. Por favor, intente de nuevo más tarde.</p>';
                }
            };

            cargarProductos();
        });