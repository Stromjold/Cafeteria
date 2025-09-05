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
  // Lógica para registrar un nuevo empleado
  const empleadoForm = document.getElementById('empleadoForm');
  if (empleadoForm) {
    empleadoForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      try {
        const response = await fetch('PHP/guardar_empleado.php', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        if (result.success) {
          alert("Empleado registrado exitosamente. ID: " + result.id_empleado);
          this.reset();
          cargarEmpleados();
        } else {
          alert("Error: " + result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert("Hubo un problema al conectar con el servidor.");
      }
    });
  }

  // ==================== LÓGICA PARA EDICIÓN DE EMPLEADOS (NUEVA) ====================
  const empleadoEditForm = document.getElementById('empleadoEditForm');
  const buscarBtn = document.getElementById('buscarEmpleadoBtn');
  const editFields = document.getElementById('editFields');
  
  if (empleadoEditForm && buscarBtn) {
    buscarBtn.addEventListener('click', async () => {
      const id_personal = empleadoEditForm.querySelector('input[name="id_personal"]').value;
      if (id_personal) {
        try {
          const response = await fetch(`PHP/obtener_empleado.php?id_personal=${id_personal}`);
          const empleado = await response.json();
          if (empleado.id_personal) {
            empleadoEditForm.querySelector('input[name="nombre_edit"]').value = empleado.nombre;
            empleadoEditForm.querySelector('input[name="rut_edit"]').value = empleado.rut;
            empleadoEditForm.querySelector('input[name="correo_edit"]').value = empleado.correo;
            empleadoEditForm.querySelector('select[name="tipo_edit"]').value = empleado.rol;
            editFields.style.display = 'block';
          } else {
            alert("No se encontró un empleado con ese ID.");
            editFields.style.display = 'none';
          }
        } catch (error) {
          console.error('Error:', error);
          alert("Hubo un problema al buscar al empleado.");
        }
      } else {
        alert("Por favor, ingrese un ID de empleado.");
      }
    });

    empleadoEditForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id_personal = empleadoEditForm.querySelector('input[name="id_personal"]').value;
      const nombre_edit = empleadoEditForm.querySelector('input[name="nombre_edit"]').value;
      const rut_edit = empleadoEditForm.querySelector('input[name="rut_edit"]').value;
      const correo_edit = empleadoEditForm.querySelector('input[name="correo_edit"]').value;
      const tipo_edit = empleadoEditForm.querySelector('select[name="tipo_edit"]').value;

      const formData = new FormData();
      formData.append('id_personal', id_personal);
      formData.append('nombre', nombre_edit);
      formData.append('rut', rut_edit);
      formData.append('correo', correo_edit);
      formData.append('rol', tipo_edit);

      try {
        const response = await fetch('PHP/editar_empleado.php', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        if (result.success) {
          alert("Empleado actualizado exitosamente.");
          empleadoEditForm.reset();
          editFields.style.display = 'none';
          cargarEmpleados(); // Recargar la lista de empleados
        } else {
          alert("Error: " + result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert("Hubo un problema al conectar con el servidor.");
      }
    });
  }

  // Lógica para cargar la lista de empleados
  async function cargarEmpleados() {
    try {
      const response = await fetch('PHP/obtener_empleados.php');
      const empleados = await response.json();
      const lista = document.getElementById('listaEmpleados');
      lista.innerHTML = '';
      if (empleados.length > 0) {
        empleados.forEach(emp => {
          const div = document.createElement('div');
          div.style.cssText = 'border: 1px solid #ddd; padding: 10px; margin: 5px 0; border-radius: 5px;';
          div.innerHTML = `
            <strong>${emp.nombre}</strong> - ${emp.id_personal}<br>
            <small>RUT: ${emp.rut} | Correo: ${emp.correo} | Rol: ${emp.rol}</small>
          `;
          lista.appendChild(div);
        });
      } else {
        lista.innerHTML = '<p>No hay empleados registrados.</p>';
      }
    } catch (error) {
      console.error('Error al cargar empleados:', error);
      const lista = document.getElementById('listaEmpleados');
      lista.innerHTML = '<p>No se pudo cargar la lista de empleados.</p>';
    }
  }

  // Cargar empleados al iniciar la página
  cargarEmpleados();
});

function formatearRut(input) {
  let rut = input.value.replace(/\./g, '').replace(/-/g, '');

  if (rut.length > 1) {
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    
    cuerpo = cuerpo.split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('');
    
    input.value = cuerpo + '-' + dv;
  }
}

// ... (código existente para la navegación con radios y registro de empleados)

// ==================== LÓGICA PARA EDICIÓN DE EMPLEADOS (ACTUALIZADA) ====================
const empleadoEditForm = document.getElementById('empleadoEditForm');
const buscarBtn = document.getElementById('buscarEmpleadoBtn');
const editFields = document.getElementById('editFields');

if (empleadoEditForm && buscarBtn) {
  buscarBtn.addEventListener('click', async () => {
    const id_personal = empleadoEditForm.querySelector('input[name="id_personal"]').value;
    if (id_personal) {
      try {
        // Usa el nuevo endpoint para un solo empleado
        const response = await fetch(`PHP/obtener_empleado.php?id_personal=${id_personal}`);
        const empleado = await response.json();
        if (empleado && empleado.id_personal) { // Verifica si 'empleado' no es nulo/vacío y tiene un id
          empleadoEditForm.querySelector('input[name="nombre_edit"]').value = empleado.nombre;
          empleadoEditForm.querySelector('input[name="rut_edit"]').value = empleado.rut;
          empleadoEditForm.querySelector('input[name="correo_edit"]').value = empleado.correo;
          empleadoEditForm.querySelector('select[name="tipo_edit"]').value = empleado.rol;
          editFields.style.display = 'block';
        } else {
          alert("No se encontró un empleado con ese ID.");
          editFields.style.display = 'none';
        }
      } catch (error) {
        console.error('Error:', error);
        alert("Hubo un problema al buscar al empleado.");
      }
    } else {
      alert("Por favor, ingrese un ID de empleado.");
    }
  });

  empleadoEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id_personal = empleadoEditForm.querySelector('input[name="id_personal"]').value;
    const nombre_edit = empleadoEditForm.querySelector('input[name="nombre_edit"]').value;
    const rut_edit = empleadoEditForm.querySelector('input[name="rut_edit"]').value;
    const correo_edit = empleadoEditForm.querySelector('input[name="correo_edit"]').value;
    const tipo_edit = empleadoEditForm.querySelector('select[name="tipo_edit"]').value;

    const formData = new FormData();
    formData.append('id_personal', id_personal);
    formData.append('nombre', nombre_edit);
    formData.append('rut', rut_edit);
    formData.append('correo', correo_edit);
    formData.append('rol', tipo_edit);

    try {
      const response = await fetch('PHP/editar_empleado.php', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        alert("Empleado actualizado exitosamente.");
        empleadoEditForm.reset();
        editFields.style.display = 'none';
        cargarEmpleados(); // Recargar la lista de empleados
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Hubo un problema al conectar con el servidor.");
    }
  });
}

// Lógica para cargar la lista de empleados (ahora usa el nuevo archivo)
async function cargarEmpleados() {
  try {
    const response = await fetch('PHP/obtener_empleados.php'); // Nombre del archivo correcto
    const empleados = await response.json();
    const lista = document.getElementById('listaEmpleados');
    lista.innerHTML = '';
    if (empleados.length > 0) {
      empleados.forEach(emp => {
        const div = document.createElement('div');
        div.style.cssText = 'border: 1px solid #ddd; padding: 10px; margin: 5px 0; border-radius: 5px;';
        div.innerHTML = `
          <strong>${emp.nombre}</strong> - ${emp.id_personal}<br>
          <small>RUT: ${emp.rut} | Correo: ${emp.correo} | Rol: ${emp.rol}</small>
        `;
        lista.appendChild(div);
      });
    } else {
      lista.innerHTML = '<p>No hay empleados registrados.</p>';
    }
  } catch (error) {
    console.error('Error al cargar empleados:', error);
    const lista = document.getElementById('listaEmpleados');
    lista.innerHTML = '<p>No se pudo cargar la lista de empleados.</p>';
  }
}

// Cargar empleados al iniciar la página
cargarEmpleados();

// ... (código existente para la función formatearRut)