document.addEventListener('DOMContentLoaded', (event) => {
    // Carga los datos de localStorage o usa valores iniciales si no existen
    let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [
        { id: 'prov1', name: 'La Chocolatería S.A.' },
        { id: 'prov2', name: 'Dulces Delicia Ltda.' },
        { id: 'prov3', name: 'Café y Pasteles' }
    ];
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
                option.value = supplier.id;
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
                id: `prov${Date.now()}`, // Usa un ID único basado en la marca de tiempo
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
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
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

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Producto agregado exitosamente.');
        productForm.reset();
    });

    // Manejar el botón "Actualizar Sistema"
    updateProductBtn.addEventListener('click', () => {
        alert('El sistema se ha actualizado. Los cambios están guardados en el navegador. Por favor, navegue a la página de "Inventario" para ver la lista completa.');
    });

    // Llamadas iniciales
    renderSuppliers();
});