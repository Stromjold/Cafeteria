document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
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


    // --- Utility Functions ---
    /**
     * @description Fetches suppliers from the server and populates the select dropdowns.
     */
    const loadSuppliers = async () => {
        try {
            const response = await fetch('PHP/obtener_proveedores.php');
            if (!response.ok) throw new Error('Network response was not ok');
            const proveedores = await response.json();

            // Clear and populate both selects
            selectedSupplier.innerHTML = '<option value="">Seleccione un proveedor</option>';
            editSupplierSelect.innerHTML = '<option value="">Seleccione un proveedor para editar</option>';
            
            proveedores.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.nombre;
                option.textContent = proveedor.nombre;
                selectedSupplier.appendChild(option.cloneNode(true));
                editSupplierSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar los proveedores:', error);
            alert('Error al cargar los proveedores. Verifique su conexión y los archivos PHP.');
        }
    };

    /**
     * @description Checks for duplicate RUT or phone number on the server.
     * @param {string} rut
     * @param {string} telefono
     * @returns {Promise<Object>}
     */
    const checkDuplicity = async (rut, telefono) => {
        const formData = new FormData();
        formData.append('rut', rut);
        formData.append('telefono', telefono);
        try {
            const response = await fetch('PHP/verificar_duplicidad.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error al verificar duplicidad:', error);
            return { success: false, message: 'Error al conectar con el servidor para verificar duplicidad.' };
        }
    };


    // --- Input Formatting Event Listeners ---
    unitPriceInput.addEventListener('input', (e) => {
        const input = e.target.value.replace(/[^0-9]/g, '');
        const formatted = input.split('').reverse().join('')
                               .replace(/(\d{3})(?=\d)/g, '$1.')
                               .split('').reverse().join('');
        e.target.value = formatted;
    });

    newSupplierPhone.addEventListener('input', (e) => {
        const cleaned = e.target.value.replace(/\D/g, '');
        let formatted = '';
        if (cleaned.length > 0) formatted += '+' + cleaned.substring(0, 2);
        if (cleaned.length > 2) formatted += ' ' + cleaned.substring(2, 3);
        if (cleaned.length > 3) formatted += ' ' + cleaned.substring(3, 7);
        if (cleaned.length > 7) formatted += ' ' + cleaned.substring(7, 11);
        e.target.value = formatted;
    });

    newSupplierRut.addEventListener('input', (e) => {
        const input = e.target.value.replace(/[^0-9kK]/g, '');
        let formattedRut = '';
        const rutLength = input.length;
        if (rutLength > 1) {
            const dv = input.charAt(rutLength - 1);
            let rutBody = input.substring(0, rutLength - 1);
            rutBody = rutBody.split('').reverse().join('')
                             .replace(/(\d{3})(?=\d)/g, '$1.')
                             .split('').reverse().join('');
            formattedRut = `${rutBody}-${dv}`;
        } else {
            formattedRut = input;
        }
        e.target.value = formattedRut.toUpperCase();
    });

    // --- Form Submission Event Listeners ---
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(productForm);
        try {
            const response = await fetch('PHP/guardar_producto.php', { method: 'POST', body: formData });
            const result = await response.json();
            if (result.success) {
                alert('Producto guardado exitosamente.');
                productForm.reset();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            alert('Error al conectar con el servidor.');
        }
    });

    addSupplierForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = newSupplierName.value.trim();
        const rut = newSupplierRut.value.trim();
        const correo = newSupplierEmail.value.trim();
        const telefono = newSupplierPhone.value.trim();

        if (!nombre || !rut || !correo || !telefono) {
            alert('Por favor, complete todos los campos para agregar un proveedor.');
            return;
        }

        const duplicityCheck = await checkDuplicity(rut, telefono);
        if (!duplicityCheck.success) {
            alert('Error: ' + duplicityCheck.message);
            return;
        }
        if (duplicityCheck.rutExists) {
            alert('Error: El RUT ingresado ya existe.');
            return;
        }
        if (duplicityCheck.telefonoExists) {
            alert('Error: El teléfono ingresado ya existe.');
            return;
        }

        const formData = new FormData(addSupplierForm);
        try {
            const response = await fetch('PHP/guardar_proveedor.php', { method: 'POST', body: formData });
            const result = await response.json();
            if (result.success) {
                alert('Proveedor guardado exitosamente.');
                addSupplierForm.reset();
                loadSuppliers(); // Reload suppliers to update the select menus
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error al enviar los datos del proveedor:', error);
            alert('Error al conectar con el servidor.');
        }
    });
    
    updateSupplierBtn.addEventListener('click', async () => {
        const originalName = editSupplierSelect.value;
        const updatedData = {
            originalName: originalName,
            nombre: editSupplierName.value.trim(),
            rut: editSupplierRut.value.trim(),
            correo: editSupplierEmail.value.trim(),
            telefono: editSupplierPhone.value.trim()
        };
        
        try {
            const response = await fetch('PHP/actualizar_proveedor.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            const result = await response.json();
            
            if (result.success) {
                alert('Proveedor actualizado exitosamente.');
                loadSuppliers();
                editFormContainer.style.display = 'none';
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error al actualizar el proveedor:', error);
            alert('Error al conectar con el servidor.');
        }
    });

    // --- Dropdown Change Listeners ---
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

    // --- Navigation via radio buttons ---
    navRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                window.location.href = e.target.value;
            }
        });
    });

    // Initial load
    loadSuppliers();
});