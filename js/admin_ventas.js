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
    * @description Elimina un producto de localStorage.
    * **NUEVA FUNCIÓN**
    * @param {string} productId - El ID del producto a eliminar.
    */
    const deleteProduct = (productId) => {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        const updatedProducts = productos.filter(p => p.id_producto != productId);
        localStorage.setItem('productos', JSON.stringify(updatedProducts));

        loadProducts();

        window.dispatchEvent(new Event('productosActualizados'));

        alert('Producto eliminado con éxito.');
    };

    /**
     * @description Obtiene los productos y llena la tabla de inventario.
     * **MODIFICADO**: Ahora incluye un botón de eliminar.
     */
    const loadProducts = async () => {
        const inventoryTableBody = document.getElementById('inventoryTableBody'); // <-- Agrega esta línea si no la tienes en la parte superior
        try {
            const products = JSON.parse(localStorage.getItem('productos')) || [];
            inventoryTableBody.innerHTML = '';

            if (products.length > 0) {
                products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.nombre}</td>
                        <td>${product.proveedor}</td>
                        <td>${product.id_producto}</td>
                        <td>${product.fecha_vencimiento || 'N/A'}</td>
                        <td>${product.cantidad || 'N/A'}</td>
                        <td>$${product.precio_unitario.toLocaleString('es-ES')}</td>
                        <td><button class="delete-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" data-id="${product.id_producto}">Eliminar</button></td>
                    `;
                    inventoryTableBody.appendChild(row);
                });

                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = e.target.dataset.id;
                        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                            deleteProduct(productId);
                        }
                    });
                });
            } else {
                inventoryTableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No hay productos en el inventario.</td></tr>';
            }
        } catch (error) {
            console.error('Error al cargar productos:', error);
            alert('Error al cargar el inventario. Verifique los datos en localStorage.');
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

    document.getElementById('productForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Recolectar los datos del formulario
        const productName = document.getElementById('productName').value;
        const productId = Date.now().toString();
        const selectedSupplier = document.getElementById('selectedSupplier').value;
        const unitPrice = document.getElementById('unitPrice').value.replace(/\./g, '');
        const productImage = document.getElementById('productImage').value;

        // Crear un objeto producto
        const newProduct = {
            id_producto: productId,
            nombre: productName,
            proveedor: selectedSupplier,
            precio_unitario: parseFloat(unitPrice),
            enlace_imagen: productImage
        };

        // Obtener los productos existentes del localStorage
        let productos = JSON.parse(localStorage.getItem('productos')) || [];

        // Agregar el nuevo producto al array
        productos.push(newProduct);

        // Guardar el array actualizado en localStorage
        localStorage.setItem('productos', JSON.stringify(productos));

        // Limpiar el formulario
        this.reset();

        // Opcional: Mostrar un mensaje de éxito
        alert('Producto agregado con éxito!');

        // Recargar los productos en Principal.js
        window.dispatchEvent(new Event('productosActualizados'));
    });
});