document.addEventListener('DOMContentLoaded', () => {

    const addSupplierBtn = document.getElementById('addSupplier');
    const newSupplierName = document.getElementById('newSupplier');
    const newSupplierRut = document.getElementById('newSupplierRut');
    const newSupplierEmail = document.getElementById('newSupplierEmail');
    const newSupplierPhone = document.getElementById('newSupplierPhone');
    const productForm = document.getElementById('productForm');
    const selectedSupplier = document.getElementById('selectedSupplier');
    const updateProductBtn = document.getElementById('updateProduct');


    // Función para cargar proveedores en el select
    const loadSuppliers = async () => {
        try {
            const response = await fetch('PHP/obtener_proveedores.php');
            const proveedores = await response.json();
            
            selectedSupplier.innerHTML = '<option value="">Seleccione un proveedor</option>';
            proveedores.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.nombre;
                option.textContent = proveedor.nombre;
                selectedSupplier.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar los proveedores:', error);
            alert('Error al cargar los proveedores. Verifique su conexión y los archivos PHP.');
        }
    };

    // Listener para el botón de agregar proveedor
    addSupplierBtn.addEventListener('click', async () => {
        const nombre = newSupplierName.value.trim();
        const rut = newSupplierRut.value.trim();
        const correo = newSupplierEmail.value.trim();
        const telefono = newSupplierPhone.value.trim();

        if (!nombre || !rut || !correo || !telefono) {
            alert('Por favor, complete todos los campos para agregar un proveedor.');
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('rut', rut);
        formData.append('correo', correo);
        formData.append('telefono', telefono);

        try {
            const response = await fetch('PHP/guardar_proveedor.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.success) {
                alert('Proveedor guardado exitosamente.');
                newSupplierName.value = '';
                newSupplierRut.value = '';
                newSupplierEmail.value = '';
                newSupplierPhone.value = '';
                loadSuppliers(); // Vuelve a cargar los proveedores para actualizar el select
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error al enviar los datos del proveedor:', error);
            alert('Error al conectar con el servidor.');
        }
    });

// Listener para el formulario de productos
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(productForm);

        try {
            const response = await fetch('PHP/guardar_producto.php', {
                method: 'POST',
                body: formData
            });
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
    
    // Listener para el botón "Actualizar Sistema"
    updateProductBtn.addEventListener('click', () => {
        loadSuppliers();
        alert('Proveedores actualizados.');
    });


    // Carga inicial de proveedores cuando la página se carga
    loadSuppliers();

});

document.getElementById('unitPrice').addEventListener('input', function(event) {
        let input = event.target.value;
        // Elimina todos los caracteres que no sean dígitos
        let numbersOnly = input.replace(/[^0-9]/g, '');

        // Invierte la cadena para empezar a poner los puntos desde la derecha
        let reversedNumbers = numbersOnly.split('').reverse().join('');

        // Agrega un punto cada 3 dígitos
        let formatted = '';
        for (let i = 0; i < reversedNumbers.length; i++) {
            formatted += reversedNumbers[i];
            if ((i + 1) % 3 === 0 && (i + 1) !== reversedNumbers.length) {
                formatted += '.';
            }
        }

        // Vuelve a invertir la cadena para su presentación final
        let finalValue = formatted.split('').reverse().join('');

        // Actualiza el valor del campo de entrada
        event.target.value = finalValue;
    });

document.getElementById('newSupplierPhone').addEventListener('input', function(e) {
        let input = e.target.value;
        // Elimina cualquier caracter que no sea un número.
        let cleaned = input.replace(/\D/g, '');

        // Aplica el formato específico (2, 1, 4, 4) usando grupos de captura.
        let formatted = '';
        if (cleaned.length > 0) {
            // Agrega el signo de más.
            formatted += '+';
            // Primer grupo de 2 dígitos.
            formatted += cleaned.substring(0, 2);
        }
        if (cleaned.length > 2) {
            formatted += ' ' + cleaned.substring(2, 3);
        }
        if (cleaned.length > 3) {
            formatted += ' ' + cleaned.substring(3, 7);
        }
        if (cleaned.length > 7) {
            formatted += ' ' + cleaned.substring(7, 11);
        }

        // Asigna el valor formateado al campo de entrada.
        e.target.value = formatted;
    });

document.getElementById('newSupplierRut').addEventListener('input', function(e) {
        let input = e.target.value.replace(/[^0-9kK]/g, ''); // 1. Limpia la entrada: solo números y 'k'
        let formattedRut = '';
        let rutLength = input.length;

        if (rutLength > 1) {
            // El dígito verificador se separa del resto
            let dv = input.charAt(rutLength - 1);
            let rutBody = input.substring(0, rutLength - 1);

            // Inserción de puntos cada 3 dígitos
            rutBody = rutBody.split('').reverse().join('')
                            .replace(/(\d{3})(?=\d)/g, '$1.')
                            .split('').reverse().join('');

            // Construye el RUT final con guion
            formattedRut = rutBody + '-' + dv;
        } else {
            formattedRut = input;
        }

        e.target.value = formattedRut.toUpperCase(); // 2. Actualiza el campo a mayúsculas
    });

function validarCorreo(email) {
    const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return patron.test(email);
}

// Ejemplo de uso
const correoInvalido = "correo-invalido";
const correoValido = "usuario@ejemplo.com";

console.log(`¿Es "${correoInvalido}" un correo válido? ${validarCorreo(correoInvalido)}`);
// Salida: ¿Es "correo-invalido" un correo válido? false

console.log(`¿Es "${correoValido}" un correo válido? ${validarCorreo(correoValido)}`);
// Salida: ¿Es "usuario@ejemplo.com" un correo válido? true

// ... (código existente)

// Función para verificar duplicidad de RUT y teléfono
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
        return {
            success: false,
            message: 'Error al conectar con el servidor para verificar duplicidad.'
        };
    }
};

// ... (código existente)

// Modificar el listener del botón "addSupplierBtn"
addSupplierBtn.addEventListener('click', async () => {
    const nombre = newSupplierName.value.trim();
    const rut = newSupplierRut.value.trim();
    const correo = newSupplierEmail.value.trim();
    const telefono = newSupplierPhone.value.trim();

    if (!nombre || !rut || !correo || !telefono) {
        alert('Por favor, complete todos los campos para agregar un proveedor.');
        return;
    }

    // Llamada a la nueva función de verificación
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

    // Resto del código para guardar el proveedor...
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('rut', rut);
    formData.append('correo', correo);
    formData.append('telefono', telefono);

    try {
        const response = await fetch('PHP/guardar_proveedor.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (result.success) {
            alert('Proveedor guardado exitosamente.');
            newSupplierName.value = '';
            newSupplierRut.value = '';
            newSupplierEmail.value = '';
            newSupplierPhone.value = '';
            loadSuppliers();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error al enviar los datos del proveedor:', error);
        alert('Error al conectar con el servidor.');
    }
});