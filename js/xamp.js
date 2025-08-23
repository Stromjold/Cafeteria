 // Funciones JavaScript para gestión de empleados
        function editarEmpleado(id) {
            // Implementar edición de empleado
            alert('Función de edición para empleado ID: ' + id);
        }

        function toggleEstado(id, nuevoEstado) {
            if (confirm('¿Estás seguro de cambiar el estado de este empleado?')) {
                // Enviar petición AJAX para cambiar estado
                fetch('procesar_empleado.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'accion=toggle_estado&id=' + id + '&estado=' + nuevoEstado
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        location.reload();
                    } else {
                        alert('Error: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al procesar la solicitud');
                });
            }
        }

        // Validación del formulario
        document.querySelector('form').addEventListener('submit', function(e) {
            const pin = document.getElementById('pin').value;
            if (!/^\d{6}$/.test(pin)) {
                e.preventDefault();
                alert('El PIN debe tener exactamente 6 dígitos numéricos');
            }
        });