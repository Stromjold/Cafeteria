const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('clientsTableBody');

// Función para cargar los clientes desde localStorage
function loadClientsFromLocalStorage() {
    // Obtener los datos de los clientes desde localStorage
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    
    // Limpiar el contenido de la tabla antes de agregar los nuevos datos
    tableBody.innerHTML = '';
    
    if (clients.length === 0) {
        // Mostrar mensaje si no hay clientes
        const noClientsRow = document.createElement('tr');
        noClientsRow.innerHTML = '<td colspan="5" class="no-results">No hay clientes registrados.</td>';
        tableBody.appendChild(noClientsRow);
    } else {
        // Llenar la tabla con los datos de localStorage
        clients.forEach((client, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${client.nombre}</td>
                <td>${client.rut}</td>
                <td>${client.ultimaCompra}</td>
                <td>$${client.totalCompra.toLocaleString('es-CL')}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Llamar a la función al cargar la página para mostrar los clientes
loadClientsFromLocalStorage();

searchInput.addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    let visibleRows = 0;

    Array.from(tableBody.rows).forEach(row => {
        // Asegurarse de que el elemento existe antes de acceder a su contenido
        const nameCell = row.cells[1]?.textContent.toLowerCase();
        
        if(nameCell && nameCell.includes(filter)) {
            row.style.display = '';
            visibleRows++;
        } else {
            row.style.display = 'none';
        }
    });

    // Mostrar una fila de "no hay resultados" si no se encuentra ninguna coincidencia
    let noResultsRow = document.getElementById('no-results');
    if(visibleRows === 0) {
        if(!noResultsRow) {
            noResultsRow = document.createElement('tr');
            noResultsRow.id = 'no-results';
            noResultsRow.classList.add('no-results');
            noResultsRow.innerHTML = '<td colspan="5">No se encontraron clientes que coincidan.</td>';
            tableBody.appendChild(noResultsRow);
        }
    } else {
        if(noResultsRow) {
            noResultsRow.remove();
        }
    }
});