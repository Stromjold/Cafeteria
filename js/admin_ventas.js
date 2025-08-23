// Data storage
        let suppliers = [];
        let products = [];

        // DOM Elements
        const supplierList = document.getElementById('supplierList');
        const newSupplierInput = document.getElementById('newSupplier');
        const addSupplierBtn = document.getElementById('addSupplier');
        const selectedSupplier = document.getElementById('selectedSupplier');
        const addProductBtn = document.getElementById('addProduct');
        const clearFormBtn = document.getElementById('clearForm');
        const productsTable = document.getElementById('productsBody');
        const totalAmount = document.getElementById('totalAmount');

        // Event Listeners
        addSupplierBtn.addEventListener('click', addSupplier);
        addProductBtn.addEventListener('click', addProduct);
        clearFormBtn.addEventListener('click', clearForm);

        // Functions
        function addSupplier() {
            const name = newSupplierInput.value.trim();
            if (!name) {
                alert('Por favor ingrese un nombre de proveedor');
                return;
            }

            const supplier = {
                id: Date.now().toString(),
                name: name
            };

            suppliers.push(supplier);
            updateSuppliersList();
            updateSupplierDropdown();
            newSupplierInput.value = '';
        }

        function updateSuppliersList() {
            if (suppliers.length === 0) {
                supplierList.innerHTML = '<li class="no-suppliers">No hay proveedores registrados</li>';
                return;
            }

            supplierList.innerHTML = suppliers.map(supplier => `
                <li class="supplier-item" data-id="${supplier.id}">
                    <span>${supplier.name}</span>
                    <button class="btn btn-danger delete-supplier">Eliminar</button>
                </li>
            `).join('');

            // Add event listeners to delete buttons
            document.querySelectorAll('.delete-supplier').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.parentElement.getAttribute('data-id');
                    deleteSupplier(id);
                });
            });
        }

        function updateSupplierDropdown() {
            selectedSupplier.innerHTML = '<option value="">Seleccione un proveedor</option>' + 
                suppliers.map(supplier => `
                    <option value="${supplier.id}">${supplier.name}</option>
                `).join('');
        }

        function deleteSupplier(id) {
            if (!confirm('¿Está seguro de eliminar este proveedor? Todos sus productos también serán eliminados.')) {
                return;
            }

            // Remove supplier
            suppliers = suppliers.filter(s => s.id !== id);
            
            // Remove all products from this supplier
            products = products.filter(p => p.supplierId !== id);
            
            updateSuppliersList();
            updateSupplierDropdown();
            updateProductsTable();
        }

        function addProduct() {
            const supplierId = selectedSupplier.value;
            const productName = document.getElementById('productName').value.trim();
            const productId = document.getElementById('productId').value.trim();
            const expiryDate = document.getElementById('expiryDate').value;
            const quantity = parseFloat(document.getElementById('quantity').value);
            const unitPrice = parseFloat(document.getElementById('unitPrice').value);

            // Validation
            if (!supplierId) {
                alert('Por favor seleccione un proveedor');
                return;
            }
            if (!productName) {
                alert('Por favor ingrese un nombre de producto');
                return;
            }
            if (!productId) {
                alert('Por favor ingrese un ID de producto');
                return;
            }
            if (isNaN(quantity) || quantity <= 0) {
                alert('Por favor ingrese una cantidad válida');
                return;
            }
            if (isNaN(unitPrice) || unitPrice <= 0) {
                alert('Por favor ingrese un precio unitario válido');
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

            products.push(product);
            updateProductsTable();
            clearForm();
        }

        function updateProductsTable() {
            if (products.length === 0) {
                productsTable.innerHTML = '<tr><td colspan="8" class="no-suppliers">No hay productos registrados</td></tr>';
                totalAmount.textContent = '$0.00';
                return;
            }

            productsTable.innerHTML = products.map(product => `
                <tr data-id="${product.id}">
                    <td>${product.supplierName}</td>
                    <td>${product.productName}</td>
                    <td>${product.productId}</td>
                    <td>${product.expiryDate || 'N/A'}</td>
                    <td>${product.quantity}</td>
                    <td>$${product.unitPrice.toFixed(2)}</td>
                    <td>$${product.subtotal.toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger delete-product">Eliminar</button>
                    </td>
                </tr>
            `).join('');

            // Calculate total
            const total = products.reduce((sum, product) => sum + product.subtotal, 0);
            totalAmount.textContent = `$${total.toFixed(2)}`;

            // Add event listeners to delete buttons
            document.querySelectorAll('.delete-product').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.closest('tr').getAttribute('data-id');
                    deleteProduct(id);
                });
            });
        }

        function deleteProduct(id) {
            products = products.filter(p => p.id !== id);
            updateProductsTable();
        }

        function clearForm() {
            document.getElementById('productName').value = '';
            document.getElementById('productId').value = '';
            document.getElementById('expiryDate').value = '';
            document.getElementById('quantity').value = '1';
            document.getElementById('unitPrice').value = '';
            selectedSupplier.focus();
        }

        // Initialize
        updateSuppliersList();
        updateProductsTable();