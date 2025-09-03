document.addEventListener('DOMContentLoaded', (event) => {
    // Carga los datos de localStorage o usa valores iniciales si no existen
    let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [
        { id: 'prov1', name: 'La Chocolatería S.A.' },
        { id: 'prov2', name: 'Dulces Delicia Ltda.' },
        { id: 'prov3', name: 'Café y Pasteles' }
    ];
    // products ya no se necesita aquí, ya que se manejará con la base de datos
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const productForm = document.querySelector('#productForm');
    const supplierList = document.querySelector('#supplierList');
    const selectedSupplierDropdown = document.querySelector('#selectedSupplier');
    const addSupplierBtn = document.querySelector('#addSupplier');
    const newSupplierInput = document.querySelector('#newSupplier');
    const updateProductBtn = document.querySelector('#updateProduct');

    // Función para renderizar la lista de proveedores
    function renderSuppliers() {
        supplierList.innerHTML = '';
        selectedSupplierDropdown.innerHTML = '<option value="">Seleccione un proveedor</option>';

        if (suppliers.length === 0) {
            supplierList.innerHTML = '<li class="no-suppliers">No hay proveedores registrados</li>';
        } else {
            suppliers.forEach(supplier => {
                const li = document.createElement('li');
                li.textContent = supplier.name;
                supplierList.appendChild(li);

                const option = document.createElement('option');
                option.value = supplier.name; // Usar el nombre como valor para la BD
                option.textContent = supplier.name;
                selectedSupplierDropdown.appendChild(option);
            });
        }
    }

    // Función para agregar un nuevo proveedor y guardarlo en localStorage
    addSupplierBtn.addEventListener('click', () => {
        const newSupplierName = newSupplierInput.value.trim();
        if (newSupplierName) {
            const newSupplier = {
                id: `prov${Date.now()}`, 
                name: newSupplierName
            };
            suppliers.push(newSupplier);
            localStorage.setItem('suppliers', JSON.stringify(suppliers));
            renderSuppliers();
            newSupplierInput.value = '';
        } else {
            alert('Por favor, ingrese un nombre de proveedor.');
        }
    });

    // Función para manejar el envío del formulario y guardar el producto en localStorage
    // ¡Se eliminó e.preventDefault()!
    productForm.addEventListener('submit', (e) => {
        // e.preventDefault(); // <-- ¡Esta línea fue eliminada!
        
        // Ya no se necesita el código para guardar en localStorage
        // El formulario ahora se envía de forma nativa a guardar_producto.php
        
        // El resto del código de validación del lado del cliente podría ser útil si el formulario se envía con fetch
        // Pero para el envío nativo, la validación se puede hacer directamente en el PHP.
    });

    // Manejar el botón "Actualizar Sistema"
    updateProductBtn.addEventListener('click', () => {
        alert('El sistema se ha actualizado. Ahora los cambios se guardan directamente en la base de datos. Por favor, navegue a la página de "Inventario" para ver la lista completa.');
    });

    // Llamadas iniciales
    renderSuppliers();
});

// La función cargarInventario ya no es necesaria aquí, ya que el inventario se gestionará en inventario.js