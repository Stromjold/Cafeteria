document.addEventListener('DOMContentLoaded', (event) => {
    function cargarInventario() {
        fetch('PHP/obtener_inventario.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const tablaBody = document.querySelector('#productos_proveedores tbody');
                tablaBody.innerHTML = '';

                if (data.length > 0) {
                    data.forEach(producto => {
                        const newRow = document.createElement('tr');
                        const subtotal = (producto.cantidad * producto.precio_unitario).toFixed(2);
                        
                        newRow.innerHTML = `
                            <td>${producto.nombre}</td>
                            <td>${producto.proveedor}</td>
                            <td>${producto.fecha_vencimiento}</td>
                            <td class="numeric">$${producto.precio_unitario}</td>
                            <td class="numeric">${producto.cantidad}</td>
                            <td class="numeric precio">$${subtotal}</td>
                            <td class="numeric">${producto.id_producto}</td>
                        `;
                        tablaBody.appendChild(newRow);
                    });
                } else {
                    tablaBody.innerHTML = '<tr><td colspan="7">No hay productos registrados.</td></tr>';
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos del inventario:', error);
                const tablaBody = document.querySelector('#productos_proveedores tbody');
                tablaBody.innerHTML = '<tr><td colspan="7">Error al cargar el inventario.</td></tr>';
            });
    }

    cargarInventario();
});