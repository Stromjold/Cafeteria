// ==================== CLASE PRINCIPAL ====================
class SupervisorDashboard {
    constructor() {
        this.requestsContainer = document.querySelector('main');
        this.loadRequests();
    }

    // Cargar y mostrar las solicitudes almacenadas en localStorage
    loadRequests() {
        // Obtener las solicitudes del localStorage
        const requests = JSON.parse(localStorage.getItem('supervisorRequests')) || [];

        // Si no hay solicitudes, mostrar un mensaje
        if (requests.length === 0) {
            this.requestsContainer.innerHTML = '<p class="no-requests-message">No hay solicitudes de empleados pendientes.</p>';
            return;
        }

        // Limpiar el contenedor antes de renderizar
        this.requestsContainer.innerHTML = '';

        // Iterar sobre cada solicitud y crear el HTML para mostrarla
        requests.forEach(request => {
            const requestCard = this.createRequestCard(request);
            this.requestsContainer.appendChild(requestCard);
        });
    }

    // Crear un elemento HTML para una solicitud individual
    createRequestCard(request) {
        // Crear el contenedor principal de la tarjeta
        const card = document.createElement('div');
        card.className = 'request-card';

        // Agregar una clase si la solicitud es urgente
        if (request.isUrgent) {
            card.classList.add('urgent');
        }

        // Generar el contenido HTML de la tarjeta
        card.innerHTML = `
            <div class="card-header">
                <h3>Solicitud de Asistencia</h3>
                <span class="timestamp">${request.timestamp}</span>
            </div>
            <div class="card-body">
                <p><strong>ID de Empleado:</strong> ${request.employeeID}</p>
                <p><strong>Tipo de problema:</strong> ${this.getProblemTypeLabel(request.problemType)}</p>
                <div class="problem-description">
                    <h4>Descripción:</h4>
                    <p>${request.message}</p>
                </div>
            </div>
        `;

        return card;
    }

    // Obtener la etiqueta de texto para el tipo de problema
    getProblemTypeLabel(type) {
        const types = {
            'acceso': 'Problemas de acceso/login',
            'sistema': 'Problemas técnicos del sistema',
            'hardware': 'Problemas con equipo/hardware',
            'procedimiento': 'Dudas sobre procedimientos',
            'emergencia': 'Emergencia en el turno',
            'otro': 'Otro'
        };
        return types[type] || 'Desconocido';
    }
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener("DOMContentLoaded", () => {
    new SupervisorDashboard();
});