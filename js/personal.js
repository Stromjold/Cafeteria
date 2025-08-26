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
// ...existing code...

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('asistenteForm');
  const tabla = form.parentElement.querySelector('table.tablefrom tbody');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById('asistenteNombre').value;
    const rut = document.getElementById('asistenteRut').value;
    const certificado = form.querySelector('input[name="certificado"]:checked').value === "true" ? "Sí" : "No";
    const experiencia = document.getElementById('asistenteExperiencia').value;

    // Generar un id simple (puedes mejorar esto)
    const id = "ASG-" + String(tabla.rows.length + 1).padStart(3, '0');

    // Crear nueva fila
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
      <td>${id}</td>
      <td>${nombre}</td>
      <td>${rut}</td>
      <td>${certificado}</td>
      <td>${experiencia}</td>
    `;

    // Agregar la nueva fila a la tabla
    tabla.appendChild(nuevaFila);

    // Limpiar el formulario
    form.reset();
    // Dejar "No" como seleccionado por defecto
    form.querySelector('input[name="certificado"][value="false"]').checked = true;
  });
});

/* Esto hará que todos los formularios de empleados agreguen filas 
 a sus respectivas tablas al hacer clic en "Guardar", sin recargar la página*/

document.addEventListener('DOMContentLoaded', function() {
  // Configuración para cada formulario
  const formularios = [
    {
      id: 'adminForm',
      prefix: 'ADM'
    },
    {
      id: 'supervisorForm',
      prefix: 'SUP'
    },
    {
      id: 'cajeroForm',
      prefix: 'CAJ'
    },
    {
      id: 'cocineroForm',
      prefix: 'COC'
    },
    {
      id: 'limpiezaForm',
      prefix: 'LIM'
    }
  ];

  formularios.forEach(function(config) {
    const form = document.getElementById(config.id);
    if (!form) return;
    const tabla = form.parentElement.querySelector('table.tablefrom tbody');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = form.querySelector('input[name="nombre"]').value;
      const rut = form.querySelector('input[name="rut"]').value;
      const certificado = form.querySelector('input[name="certificado"]:checked').value === "true" ? "Sí" : "No";
      const experiencia = form.querySelector('input[name="experiencia"]').value;

      // Generar id único para cada tipo
      const id = config.prefix + '-' + String(tabla.rows.length + 1).padStart(3, '0');

      const nuevaFila = document.createElement('tr');
      nuevaFila.innerHTML = `
        <td>${id}</td>
        <td>${nombre}</td>
        <td>${rut}</td>
        <td>${certificado}</td>
        <td>${experiencia}</td>
      `;

      tabla.appendChild(nuevaFila);

      form.reset();
      form.querySelector('input[name="certificado"][value="false"]').checked = true;
    });
  });
});

// New function to handle form submission
async function handleFormSubmission(form, tipo) {
  try {
      const nombre = form.querySelector('input[name="nombre"]').value;
      const rut = form.querySelector('input[name="rut"]').value;
      const certificado = form.querySelector('input[name="certificado"]:checked').value;
      const experiencia = form.querySelector('input[name="experiencia"]').value;

      // Use FormData to send data to PHP
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('rut', rut);
      formData.append('certificado', certificado);
      formData.append('experiencia', experiencia);
      formData.append('tipo', tipo); // Add the employee type

      const response = await fetch('PHP/empleados/crear_empleado.php', {
          method: 'POST',
          body: formData
      });

      const result = await response.json();

      if (result.success) {
          alert("Empleado creado exitosamente con ID: " + result.id_empleado);
          // Optionally, update the table with the new data from the server
          // You'll need to fetch the updated list or add the new row
      } else {
          alert("Error: " + result.message);
      }

  } catch (error) {
      console.error('Error:', error);
      alert("Hubo un problema al conectar con el servidor.");
  }
}

// Update the event listeners
document.addEventListener('DOMContentLoaded', function() {
  // ... existing navigation code ...

  const asistenteForm = document.getElementById('asistenteForm');
  if (asistenteForm) {
      asistenteForm.addEventListener('submit', function(e) {
          e.preventDefault();
          handleFormSubmission(asistenteForm, 'asistente');
      });
  }

  // Repeat for other forms:
  const adminForm = document.getElementById('adminForm');
  if (adminForm) {
      adminForm.addEventListener('submit', function(e) {
          e.preventDefault();
          handleFormSubmission(adminForm, 'administrador');
      });
  }
  // ... and so on for supervisor, cajero, etc.
});
// ...existing code...