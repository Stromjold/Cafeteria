document.addEventListener('DOMContentLoaded', (event) => {
    function cargarInventario() {
        // Lee los productos de localStorage
        const productosGuardados = JSON.parse(localStorage.getItem('products')) || [];
        const tablaBody = document.querySelector('#productos_proveedores tbody');
        tablaBody.innerHTML = '';

        if (productosGuardados.length > 0) {
            productosGuardados.forEach(producto => {
                const newRow = document.createElement('tr');
                const subtotal = (producto.quantity * producto.unitPrice).toFixed(2);
                
                newRow.innerHTML = `
                    <td>${producto.productName}</td>
                    <td>${producto.supplierName}</td>
                    <td>${producto.expiryDate}</td>
                    <td class="numeric">$${producto.unitPrice.toFixed(2)}</td>
                    <td class="numeric">${producto.quantity}</td>
                    <td class="numeric precio">$${subtotal}</td>
                    <td class="numeric">${producto.productId}</td>
                `;
                tablaBody.appendChild(newRow);
            });
        } else {
            tablaBody.innerHTML = '<tr><td colspan="7">No hay productos registrados.</td></tr>';
        }
    }

    cargarInventario();
});