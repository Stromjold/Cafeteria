document.addEventListener('DOMContentLoaded', () => {
    const btnActualizar = document.querySelector('#btn-actualizar');
    
    // Asigna el evento al botón de "Actualizar"
    btnActualizar.addEventListener('click', cargarInventarioDesdeDB);
    
    // Llama a la función al cargar la página para mostrar los productos
    cargarInventarioDesdeDB(); 
});

function cargarInventarioDesdeDB() {
    fetch('PHP/obtener_productos.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#productos_proveedores tbody');
            tbody.innerHTML = ''; 
            
            if (data.success && data.productos.length > 0) {
                data.productos.forEach(producto => {
                    const row = tbody.insertRow();
                    row.insertCell().textContent = producto.nombre;
                    row.insertCell().textContent = producto.proveedor;
                    row.insertCell().textContent = producto.fecha_vencimiento;
                    row.insertCell().textContent = producto.precio_unitario;
                    row.insertCell().textContent = producto.cantidad;
                    row.insertCell().textContent = producto.subtotal;
                    row.insertCell().textContent = producto.id_producto;
                });
            } else {
                const row = tbody.insertRow();
                const cell = row.insertCell();
                cell.colSpan = 7;
                cell.textContent = 'No hay productos en el inventario.';
                cell.style.textAlign = 'center';
            }
        })
        .catch(error => console.error('Error al obtener el inventario:', error));
}