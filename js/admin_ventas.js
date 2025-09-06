document.addEventListener('DOMContentLoaded', () => {

    // --- Elementos del DOM ---
    const addSupplierBtn = document.getElementById('addSupplierBtn');
    const addSupplierForm = document.getElementById('addSupplierForm');
    const newSupplierName = document.getElementById('newSupplierName');
    const newSupplierRut = document.getElementById('newSupplierRut');
    const newSupplierEmail = document.getElementById('newSupplierEmail');
    const newSupplierPhone = document.getElementById('newSupplierPhone');
    const productForm = document.getElementById('productForm');
    const selectedSupplier = document.getElementById('selectedSupplier');
    const editSupplierSelect = document.getElementById('editSupplierSelect');
    const editFormContainer = document.getElementById('edit-form-container');
    const editSupplierName = document.getElementById('editSupplierName');
    const editSupplierRut = document.getElementById('editSupplierRut');
    const editSupplierEmail = document.getElementById('editSupplierEmail');
    const editSupplierPhone = document.getElementById('editSupplierPhone');
    const updateSupplierBtn = document.getElementById('updateSupplierBtn');
    const unitPriceInput = document.getElementById('unitPrice');
    const navRadios = document.querySelectorAll('input[name="radio"]');
    

    // --- Funciones de utilidad ---

    /**
     * @description Formatea el precio unitario mientras se escribe.
     */
    unitPriceInput.addEventListener('input', (e) => {
        const input = e.target;
        let value = input.value.replace(/\./g, '');
        if (value.length > 3) {
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        input.value = value;
    });

    /**
     * @description Obtiene los proveedores del servidor y llena los select.
     */
    const loadSuppliers = async () => {
        try {
            const response = await fetch('PHP/obtener_proveedores.php');
            const suppliers = await response.json();

            const supplierSelects = [selectedSupplier, editSupplierSelect];
            supplierSelects.forEach(select => {
                select.innerHTML = '';
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Selecciona un proveedor';
                select.appendChild(defaultOption);
                suppliers.forEach(supplier => {
                    const option = document.createElement('option');
                    option.value = supplier.nombre;
                    option.textContent = supplier.nombre;
                    select.appendChild(option);
                });
            });
        } catch (error) {
            console.error('Error al cargar proveedores:', error);
            alert('Error al cargar la lista de proveedores. Por favor, verifique la conexión.');
        }
    };

    /**
     * @description Obtiene los productos y llena la tabla de inventario.
     */
    const loadProducts = async () => {
        const inventoryTableBody = document.getElementById('inventoryTableBody');
        try {
            const response = await fetch('PHP/obtener_inventario.php');
            const products = await response.json();
            inventoryTableBody.innerHTML = '';
            if (products.length > 0) {
                products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.nombre}</td>
                        <td>${product.proveedor}</td>
                        <td>${product.id_producto}</td>
                        <td>${product.fecha_vencimiento}</td>
                        <td>${product.cantidad}</td>
                        <td>$${parseFloat(product.precio_unitario).toFixed(2)}</td>
                    `;
                    inventoryTableBody.appendChild(row);
                });
            } else {
                inventoryTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No hay productos en el inventario.</td></tr>';
            }
        } catch (error) {
            console.error('Error al cargar productos:', error);
            alert('Error al cargar el inventario. Verifique la conexión y los archivos PHP.');
        }
    };


    // --- Listeners de Eventos de Formularios ---

    // Listener para el formulario de productos
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(productForm);
        
        // Nueva validación para el código de producto (código de barra)
        const productId = formData.get('codigo');
        if (productId && productId.length > 14) {
            alert('Error: El código de producto no puede exceder los 14 caracteres.');
            return;
        }

        try {
            const response = await fetch('PHP/guardar_producto.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            
            if (result.success) {
                alert('Producto guardado exitosamente.');
                productForm.reset();
                loadProducts(); // Vuelve a cargar la tabla de inventario
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            alert('Error al conectar con el servidor.');
        }
    });

    // Listener para el formulario de agregar proveedor
    addSupplierForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(addSupplierForm);

        try {
            const response = await fetch('PHP/guardar_proveedor.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            
            if (result.success) {
                alert(result.message);
                addSupplierForm.reset();
                loadSuppliers(); // Vuelve a cargar la lista de proveedores
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error al guardar el proveedor:', error);
            alert('Error al conectar con el servidor.');
        }
    });

    // --- Listeners de cambio de Dropdown ---
    editSupplierSelect.addEventListener('change', async (e) => {
        const supplierName = e.target.value;
        if (supplierName) {
            try {
                const response = await fetch(`PHP/obtener_proveedor.php?name=${encodeURIComponent(supplierName)}`);
                const proveedor = await response.json();
                
                if (proveedor) {
                    editSupplierName.value = proveedor.nombre;
                    editSupplierRut.value = proveedor.rut;
                    editSupplierEmail.value = proveedor.correo;
                    editSupplierPhone.value = proveedor.telefono;
                    editFormContainer.style.display = 'block';
                }
            } catch (error) {
                console.error('Error al obtener los datos del proveedor:', error);
                editFormContainer.style.display = 'none';
                alert('Error al cargar los datos del proveedor. Verifique su conexión y los archivos PHP.');
            }
        } else {
            editFormContainer.style.display = 'none';
        }
    });

    // --- Navegación a través de botones de radio ---
    navRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                window.location.href = e.target.value;
            }
        });
    });

    // Carga inicial
    loadSuppliers();
    loadProducts();
});