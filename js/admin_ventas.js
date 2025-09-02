document.addEventListener('DOMContentLoaded', (event) => {
    // Array para almacenar los productos en memoria
    let products = [];
    // Array para almacenar los proveedores en memoria (ejemplo)
    let suppliers = [
        { id: 'prov1', name: 'La Chocolatería S.A.' },
        { id: 'prov2', name: 'Dulces Delicia Ltda.' },
        { id: 'prov3', name: 'Café y Pasteles' }
    ];

    const productsBody = document.querySelector('#productsBody');
    const totalAmountSpan = document.querySelector('#totalAmount');
    const productForm = document.querySelector('#productForm');
    const supplierList = document.querySelector('#supplierList');
    const selectedSupplierDropdown = document.querySelector('#selectedSupplier');
    const addSupplierBtn = document.querySelector('#addSupplier');
    const newSupplierInput = document.querySelector('#newSupplier');
    const updateProductBtn = document.querySelector('#updateProduct');

    // Función para renderizar la lista de proveedores
    function renderSuppliers() {
        supplierList.innerHTML = '';
        if (suppliers.length === 0) {
            supplierList.innerHTML = '<li class="no-suppliers">No hay proveedores registrados</li>';
            selectedSupplierDropdown.innerHTML = '<option value="">Seleccione un proveedor</option>';
        } else {
            selectedSupplierDropdown.innerHTML = '<option value="">Seleccione un proveedor</option>';
            suppliers.forEach(supplier => {
                const li = document.createElement('li');
                li.textContent = supplier.name;
                supplierList.appendChild(li);

                const option = document.createElement('option');
                option.value = supplier.id;
                option.textContent = supplier.name;
                selectedSupplierDropdown.appendChild(option);
            });
        }
    }

    // Función para agregar un nuevo proveedor
    addSupplierBtn.addEventListener('click', () => {
        const newSupplierName = newSupplierInput.value.trim();
        if (newSupplierName) {
            const newSupplier = {
                id: `prov${suppliers.length + 1}`,
                name: newSupplierName
            };
            suppliers.push(newSupplier);
            renderSuppliers();
            newSupplierInput.value = '';
        } else {
            alert('Por favor, ingrese un nombre de proveedor.');
        }
    });

    // Función para actualizar la tabla de productos
    function updateProductsTable() {
        productsBody.innerHTML = '';
        if (products.length === 0) {
            productsBody.innerHTML = '<tr><td colspan="8" class="no-suppliers">No hay productos registrados</td></tr>';
        } else {
            products.forEach((product, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.supplierName}</td>
                    <td>${product.productName}</td>
                    <td>${product.productId}</td>
                    <td>${product.expiryDate}</td>
                    <td>${product.quantity}</td>
                    <td>$${product.unitPrice.toFixed(2)}</td>
                    <td>$${product.subtotal.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-sm btn-edit" data-index="${index}">Editar</button>
                        <button class="btn btn-sm btn-delete" data-index="${index}">Eliminar</button>
                    </td>
                `;
                productsBody.appendChild(row);
            });
        }
        updateTotalAmount();
    }

    // Función para calcular y actualizar el total
    function updateTotalAmount() {
        const total = products.reduce((sum, product) => sum + product.subtotal, 0);
        totalAmountSpan.textContent = `$${total.toFixed(2)}`;
    }

    // Función para limpiar el formulario
    function clearForm() {
        productForm.reset();
    }

    // Función para manejar el envío del formulario
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // **Código de validación existente**
        const supplierId = selectedSupplierDropdown.value;
        const productName = document.querySelector('#productName').value.trim();
        const productId = document.querySelector('#productId').value.trim();
        const expiryDate = document.querySelector('#expiryDate').value;
        const quantity = parseInt(document.querySelector('#quantity').value);
        const unitPrice = parseFloat(document.querySelector('#unitPrice').value);
        
        if (!supplierId || !productName || !productId || !expiryDate || quantity <= 0 || unitPrice <= 0) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }
        
        const supplier = suppliers.find(s => s.id === supplierId);
        const subtotal = quantity * unitPrice;

        const product = {
            id: Date.now().toString(),
            supplierId: supplierId,
            supplierName: supplier.name,
            productName: productName,
            productId: productId,
            expiryDate: expiryDate,
            quantity: quantity,
            unitPrice: unitPrice,
            subtotal: subtotal
        };

        // **Código para guardar en la base de datos**
        const formData = new FormData();
        formData.append('nombre', product.productName);
        formData.append('proveedor', product.supplierName);
        formData.append('id_producto', product.productId);
        formData.append('fecha_vencimiento', product.expiryDate);
        formData.append('cantidad', product.quantity);
        formData.append('precio_unitario', product.unitPrice);

        fetch('PHP/guardar_producto.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                products.push(product); // Solo agrega el producto si se guarda exitosamente
                updateProductsTable();
                clearForm();
                alert(data.message);
            } else {
                alert('Error al guardar el producto: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error de conexión con el servidor.');
        });
        // **Fin del código de guardado**
    });

    // Delegación de eventos para los botones de editar y eliminar
    productsBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-delete')) {
            const index = e.target.getAttribute('data-index');
            products.splice(index, 1);
            updateProductsTable();
        }
        // La funcionalidad de editar no está implementada en este archivo
    });

    // Manejar el botón de "Actualizar Sistema" (recargar la página para ver los cambios)
    updateProductBtn.addEventListener('click', () => {
        alert('El sistema se actualizará recargando la página.');
        location.reload();
    });

    // Llamadas iniciales
    renderSuppliers();
    updateProductsTable();
});