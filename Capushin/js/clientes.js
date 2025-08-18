const searchInput = document.getElementById('searchInput');
    const tableBody = document.getElementById('clientsTableBody');

    searchInput.addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        let visibleRows = 0;

        Array.from(tableBody.rows).forEach(row => {
            const nameCell = row.cells[0].textContent.toLowerCase();
            if(nameCell.includes(filter)) {
                row.style.display = '';
                visibleRows++;
            } else {
                row.style.display = 'none';
            }
        });

        // Show a no results row if no match
        let noResultsRow = document.getElementById('no-results');
        if(visibleRows === 0) {
            if(!noResultsRow) {
                noResultsRow = document.createElement('tr');
                noResultsRow.id = 'no-results';
                noResultsRow.classList.add('no-results');
                noResultsRow.innerHTML = '<td colspan="6">No se encontraron clientes que coincidan.</td>';
                tableBody.appendChild(noResultsRow);
            }
        } else {
            if(noResultsRow) {
                noResultsRow.remove();
            }
        }
    });