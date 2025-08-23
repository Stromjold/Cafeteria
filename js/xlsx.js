// File: js/xlsx.js
// Este archivo maneja la exportación e importación de datos a Excel utilizando TableExport y
    // Inicializar TableExport para todos los botones de exportación
    document.addEventListener("DOMContentLoaded", function() {
        new TableExport(document.querySelectorAll("table"), {
            formats: ["xlsx"],
            filename: "Inventario_Exportado",
            exportButtons: false
        });

        // Manejar los clics de los botones de exportación
        document.querySelectorAll('.export-btn').forEach(button => {
            button.addEventListener('click', () => {
                const tableId = button.getAttribute('data-table-id');
                const table = document.getElementById(tableId);
                const tableExport = new TableExport(table, {
                    formats: ["xlsx"],
                    filename: tableId,
                    exportButtons: false
                });
                const exportData = tableExport.get.xlsx();
                tableExport.download(exportData.data, exportData.filename, exportData.mimeType);
            });
        });
    });
    
    // Lógica para importar datos desde Excel
    function handleImport(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Asumiendo que la tabla de destino es la primera en el HTML,
            // puede modificar esto para seleccionar una tabla específica
            const table = document.querySelector('table');
            const tableBody = table.querySelector('tbody');

            // Eliminar filas existentes
            while(tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }

            // Agregar nuevas filas desde los datos importados
            jsonData.slice(1).forEach(rowData => {
                const newRow = document.createElement('tr');
                rowData.forEach(cellData => {
                    const newCell = document.createElement('td');
                    newCell.textContent = cellData;
                    newRow.appendChild(newCell);
                });
                tableBody.appendChild(newRow);
            });
        };
        reader.readAsArrayBuffer(file);
    }
 // Extraer datos de las tablas reales en card-div
function getTablesDataFromDOM() {
    const tables = document.querySelectorAll('.card-div table');
    const tablesData = [];
    tables.forEach((table, idx) => {
        // Obtener el título anterior a la tabla
        let titleElem = table.closest('.card-div').previousElementSibling;
        while (titleElem && titleElem.tagName !== 'H2') {
            titleElem = titleElem.previousElementSibling;
        }
        const name = titleElem ? titleElem.textContent.trim() : `Tabla ${idx+1}`;
        // Obtener encabezados
        const headers = [];
        const thead = table.querySelector('thead') || table.querySelector('head');
        if (thead) {
            thead.querySelectorAll('th').forEach(th => headers.push(th.textContent.trim()));
        } else {
            // Si no hay thead, buscar la primera fila como encabezado
            const firstRow = table.querySelector('tr');
            if (firstRow) {
                firstRow.querySelectorAll('th,td').forEach(cell => headers.push(cell.textContent.trim()));
            }
        }
        // Obtener filas de datos
        const rows = [];
        const tbody = table.querySelector('tbody') || table;
        tbody.querySelectorAll('tr').forEach((tr, i) => {
            // Saltar la fila de encabezados si no hay thead
            if (!thead && i === 0) return;
            const row = [];
            tr.querySelectorAll('td').forEach(td => row.push(td.textContent.trim()));
            if (row.length) rows.push(row);
        });
        tablesData.push({
            id: `tabla_${idx+1}`,
            name: name,
            description: `Datos de ${name}`,
            columns: headers,
            data: rows
        });
    });
    return tablesData;
}

        // Datos de ejemplo de las tablas
        let tablesData = [];

        document.addEventListener('DOMContentLoaded', function() {
            tablesData = getTablesDataFromDOM();
            renderTables();
            
            // Cargar la librería para exportar Excel
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
            script.onload = function() {
                console.log('Librería XLSX cargada');
            };
            document.head.appendChild(script);
        });

        // Generar la interfaz de selección de tablas
        function renderTables() {
            const container = document.getElementById('tables-container');
            container.innerHTML = '';

            tablesData.forEach(table => {
                const card = document.createElement('div');
                card.className = 'table-card';
                card.dataset.id = table.id;
                card.innerHTML = `
                    <div class="table-card-header">
                        <div class="table-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 3h18v18H3z"></path>
                                <path d="M3 9h18"></path>
                                <path d="M3 15h18"></path>
                                <path d="M9 3v18"></path>
                                <path d="M15 3v18"></path>
                            </svg>
                        </div>
                        <div>
                            <div class="table-name">${table.name}</div>
                            <div class="table-description">${table.description}</div>
                        </div>
                    </div>
                    <div class="table-card-footer">
                        <label class="checkbox-container">
                            <input type="checkbox" class="table-checkbox" data-id="${table.id}">
                            Seleccionar
                        </label>
                    </div>
                `;

                // Añadir evento click a la tarjeta
                card.addEventListener('click', function(e) {
                    // Evitar que se active cuando se hace click en el checkbox
                    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL') {
                        const checkbox = this.querySelector('.table-checkbox');
                        checkbox.checked = !checkbox.checked;
                        updateCardStyle(this, checkbox.checked);
                    }
                });

                // Añadir evento al checkbox
                const checkbox = card.querySelector('.table-checkbox');
                checkbox.addEventListener('change', function() {
                    updateCardStyle(card, this.checked);
                });

                container.appendChild(card);
            });
        }

        // Actualizar estilo de la tarjeta según selección
        function updateCardStyle(card, isChecked) {
            if (isChecked) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        }

        // Seleccionar todas las tablas
        document.getElementById('select-all').addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.table-checkbox');
            const cards = document.querySelectorAll('.table-card');
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            
            cards.forEach(card => {
                card.classList.add('selected');
            });
        });

        // Deseleccionar todas las tablas
        document.getElementById('deselect-all').addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.table-checkbox');
            const cards = document.querySelectorAll('.table-card');
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            cards.forEach(card => {
                card.classList.remove('selected');
            });
        });

        // Exportar las tablas seleccionadas a Excel
        document.getElementById('export-btn').addEventListener('click', function() {
            const selectedTables = [];
            const checkboxes = document.querySelectorAll('.table-checkbox:checked');
            
            if (checkboxes.length === 0) {
                alert('Por favor selecciona al menos una tabla para exportar');
                return;
            }
            
            checkboxes.forEach(checkbox => {
                const tableId = checkbox.dataset.id;
                const table = tablesData.find(t => t.id === tableId);
                selectedTables.push(table);
            });
            
            exportToExcel(selectedTables);
        });

        // Función para exportar a Excel
        function exportToExcel(tables) {
            // Crear un libro de Excel con cada tabla como una hoja diferente
            const workbook = XLSX.utils.book_new();
            
            tables.forEach(table => {
                // Crear datos de ejemplo para la tabla
                const data = [];
                
                // Añadir encabezados
                data.push(table.columns);
                
                // Añadir filas de ejemplo (en un caso real serían los datos de tu base de datos)
                for (let i = 0; i < 5; i++) {
                    const row = table.columns.map((col, index) => {
                        return `Ejemplo ${index + 1}-${i + 1}`;
                    });
                    data.push(row);
                }
                
                // Convertir a hoja de cálculo
                const worksheet = XLSX.utils.aoa_to_sheet(data);
                
                // Añadir la hoja al libro
                XLSX.utils.book_append_sheet(workbook, worksheet, table.name);
            });
            
            // Generar el archivo Excel
            XLSX.writeFile(workbook, 'tablas_exportadas.xlsx');
        }

        // Cuando se carga la página
        document.addEventListener('DOMContentLoaded', function() {
            renderTables();
            
            // Cargar la librería para exportar Excel
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
            script.onload = function() {
                console.log('Librería XLSX cargada');
            };
            document.head.appendChild(script);
        });
