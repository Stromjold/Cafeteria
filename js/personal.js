// JS para navegación con radios en el menú
document.addEventListener('DOMContentLoaded', function () {
  const radios = document.querySelectorAll('.radio-inputs input[type="radio"]');
  radios.forEach(radio => {
    radio.addEventListener('change', function () {
      if (this.checked) {
        window.location.href = this.value;
      }
    });
  });
});

//=================================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario principal (el que tiene el id del empleado)
    const empleadoForm = document.getElementById('empleadoForm');

    // Verificar si el formulario existe
    if (empleadoForm) {
        empleadoForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Obtener los valores del formulario
            const nombre = empleadoForm.querySelector('input[name="nombre"]').value;
            const rut = empleadoForm.querySelector('input[name="rut"]').value;
            const tipo = empleadoForm.querySelector('select[name="tipo"]').value;

            // Crear un objeto FormData para enviar los datos al servidor
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('rut', rut);
            formData.append('tipo', tipo);

            try {
                // Enviar los datos a guardar_empleado.php
                const response = await fetch('PHP/guardar_empleado.php', {
                    method: 'POST',
                    body: formData
                });

                // Convertir la respuesta a JSON
                const result = await response.json();

                // Verificar si el registro fue exitoso y mostrar un mensaje
                if (result.success) {
                    alert("Empleado registrado exitosamente. ID: " + result.id_empleado + " - PIN: " + result.pin_generado);
                    empleadoForm.reset(); // Limpiar el formulario después del éxito
                } else {
                    alert("Error: " + result.message);
                }

            } catch (error) {
                console.error('Error:', error);
                alert("Hubo un problema al conectar con el servidor.");
            }
        });
    }
});