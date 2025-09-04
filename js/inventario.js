document.addEventListener('DOMContentLoaded', () => {

    const productsTableBody = document.querySelector('#productos_proveedores tbody');
    const supplierTableBody = document.querySelector('#supplierTable tbody');
    const updateButton = document.getElementById('btn-actualizar');

    const fetchProducts = async () => {
        try {
            const response = await fetch('PHP/obtener_productos.php');
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.statusText}`);
            }
            const data = await response.json();
            
            productsTableBody.innerHTML = '';
            
            const productos = data.productos || data;

            if (productos.length > 0) {
                productos.forEach(product => {
                    const row = `<tr>
                        <td>${product.nombre}</td>
                        <td>${product.proveedor}</td>
                        <td>${product.fecha_vencimiento}</td>
                        <td>$${parseFloat(product.precio_unitario).toFixed(2)}</td>
                        <td>${product.cantidad}</td>
                        <td>$${parseFloat(product.cantidad * product.precio_unitario).toFixed(2)}</td>
                        <td>${product.id_producto}</td>
                    </tr>`;
                    productsTableBody.innerHTML += row;
                });
            } else {
                productsTableBody.innerHTML = '<tr><td colspan="7">No hay productos registrados.</td></tr>';
            }
        } catch (error) {
            console.error('Error al obtener productos:', error);
            productsTableBody.innerHTML = '<tr><td colspan="7">Error al cargar los productos.</td></tr>';
        }
    };
    
    const fetchSuppliers = async () => {
        try {
            const response = await fetch('PHP/obtener_proveedores.php');
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.statusText}`);
            }
            const suppliers = await response.json();

            supplierTableBody.innerHTML = '';
            
            if (suppliers.length > 0) {
                suppliers.forEach(supplier => {
                    const row = `<tr>
                        <td>${supplier.nombre}</td>
                        <td>${supplier.rut}</td>
                        <td>${supplier.correo}</td>
                        <td>${supplier.telefono}</td>
                    </tr>`;
                    supplierTableBody.innerHTML += row;
                });
            } else {
                supplierTableBody.innerHTML = '<tr><td colspan="4">No hay proveedores registrados.</td></tr>';
            }
        } catch (error) {
            console.error('Error al obtener proveedores:', error);
            supplierTableBody.innerHTML = '<tr><td colspan="4">Error al cargar la lista de proveedores.</td></tr>';
        }
    };

    updateButton.addEventListener('click', () => {
        fetchSuppliers();
        fetchProducts();
        alert('Inventario actualizado.');
    });

    fetchSuppliers();
    fetchProducts();
});