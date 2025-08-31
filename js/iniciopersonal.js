// ==================== CLASE PRINCIPAL ====================
class EmployeeLoginSystem {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    // Inicializar elementos del DOM
    initializeElements() {
        // Modal elements
        this.modal = document.querySelector("#supervisorModal");
        this.openModalBtn = document.querySelector("#openModalBtn");
        this.closeModalBtn = document.querySelector("#closeModalBtn");
        this.cancelBtn = document.querySelector("#cancelBtn");
        this.submitBtn = document.querySelector("#submitBtn");

        // Form elements
        this.textarea = document.querySelector("#problemDescription");
        this.charCountSpan = document.querySelector("#charCount");
        this.pinInput = document.querySelector("#pinInput");
        this.showPinBtn = document.querySelector("#showPinBtn");
        this.urgentCheck = document.querySelector("#urgentCheck");
        this.supervisorForm = document.querySelector("#supervisorForm");
        this.employeeIdInput = document.querySelector("##employeeId");
        this.problemTypeSelect = document.querySelector("#problemType");
    }

    // Vincular eventos
    bindEvents() {
        // Modal events
        this.openModalBtn?.addEventListener("click", () => this.openModal());
        this.closeModalBtn?.addEventListener("click", () => this.closeModal());
        this.cancelBtn?.addEventListener("click", () => this.closeModal());
        window.addEventListener("click", (e) => this.windowOnClick(e));
        
        // Form events
        this.textarea?.addEventListener("input", () => this.updateCharCount());
        this.showPinBtn?.addEventListener("click", () => this.togglePinVisibility());
        this.urgentCheck?.addEventListener("change", () => this.handleUrgentCheck());

        // Manejar el envío del formulario
        this.supervisorForm?.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submitRequestToSupervisor();
        });
    }
    
    // ==================== FUNCIONES DEL MODAL ==================== 
    openModal() {
        this.modal.style.display = "flex";
        this.textarea.focus();
    }

    closeModal() {
        this.modal.style.display = "none";
    }

    windowOnClick(e) {
        if (e.target === this.modal) {
            this.closeModal();
        }
    }
    
    // ==================== MANEJO DE LA SOLICITUD ==================== 
    submitRequestToSupervisor() {
        const employeeID = this.employeeIdInput.value.trim();
        const problemType = this.problemTypeSelect.value;
        const problemMessage = this.textarea.value.trim();
        const isUrgent = this.urgentCheck.checked;
        const timestamp = new Date().toLocaleString();

        if (!employeeID || !problemMessage) {
            alert('Por favor, ingresa tu ID de empleado y la descripción del problema.');
            return;
        }

        const newRequest = {
            employeeID,
            problemType,
            message: problemMessage,
            isUrgent,
            timestamp
        };

        // Obtener solicitudes existentes de localStorage o inicializar un arreglo vacío
        const existingRequests = JSON.parse(localStorage.getItem('supervisorRequests')) || [];
        existingRequests.push(newRequest);
        
        // Guardar la lista actualizada en localStorage
        localStorage.setItem('supervisorRequests', JSON.stringify(existingRequests));

        alert('Tu solicitud ha sido enviada al supervisor. Puedes cerrar este modal.');
        this.closeModal();
    }

    // ==================== CONTADOR DE CARACTERES ==================== 
    updateCharCount() {
        if (!this.textarea || !this.charCountSpan) return;
        
        const maxLength = 500;
        const currentLength = this.textarea.value.length;
        const remaining = maxLength - currentLength;
        
        this.charCountSpan.textContent = `${remaining}`;
    }

    // ==================== MOSTRAR/OCULTAR PIN ====================
    togglePinVisibility() {
        if (!this.pinInput || !this.showPinBtn) return;
        
        const type = this.pinInput.getAttribute("type") === "password" ? "text" : "password";
        this.pinInput.setAttribute("type", type);
        this.showPinBtn.querySelector("i").classList.toggle("fa-eye");
        this.showPinBtn.querySelector("i").classList.toggle("fa-eye-slash");
    }

    // ==================== VALIDACIÓN DEL PIN ==================== 
    validatePinInput() {
        if (!this.pinInput) return;
        
        // Remove non-numeric characters
        this.pinInput.value = this.pinInput.value.replace(/[^0-9]/g, '');
        
        // Limit to 6 digits
        if (this.pinInput.value.length > 6) {
            this.pinInput.value = this.pinInput.value.slice(0, 6);
        }
    }

    // ==================== CHECKBOX URGENTE ==================== 
    handleUrgentCheck() {
        if (!this.urgentCheck) return;
        
        if (this.urgentCheck.checked) {
            const confirmUrgent = confirm(
                "⚠️ Has marcado esta solicitud como URGENTE.\n\n" +
                "Las solicitudes urgentes tienen prioridad alta y serán atendidas de inmediato.\n\n" +
                "¿Confirmas que este problema requiere atención urgente?"
            );
            
            if (!confirmUrgent) {
                this.urgentCheck.checked = false;
            }
        }
    }
}

// ==================== INICIALIZACIÓN ==================== 
document.addEventListener("DOMContentLoaded", () => {
    new EmployeeLoginSystem();
});