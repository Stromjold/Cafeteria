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
            }

            // Vincular eventos
            bindEvents() {
                // Modal events
                this.openModalBtn?.addEventListener("click", () => this.openModal());
                this.closeModalBtn?.addEventListener("click", () => this.closeModal());
                this.cancelBtn?.addEventListener("click", () => this.closeModal());
                
                // Click outside modal to close
                window.addEventListener("click", (event) => {
                    if (event.target === this.modal) {
                        this.closeModal();
                    }
                });

                // Form submission
                this.supervisorForm?.addEventListener("submit", (e) => this.handleFormSubmit(e));

                // Character counter
                this.textarea?.addEventListener("input", () => this.updateCharCounter());

                // PIN visibility toggle
                this.showPinBtn?.addEventListener("click", () => this.togglePinVisibility());

                // PIN input validation (only numbers)
                this.pinInput?.addEventListener("input", () => this.validatePinInput());

                // Urgent checkbox alert
                this.urgentCheck?.addEventListener("change", () => this.handleUrgentCheck());

                // ESC key to close modal
                document.addEventListener("keydown", (e) => {
                    if (e.key === "Escape" && this.modal.style.display === "block") {
                        this.closeModal();
                    }
                });
            }

            // ==================== MÉTODOS DEL MODAL ==================== 
            openModal() {
                this.modal.style.display = "block";
                document.body.style.overflow = "hidden"; // Prevent background scroll
                this.resetForm();
            }

            closeModal() {
                this.modal.style.display = "none";
                document.body.style.overflow = "auto"; // Restore scroll
            }

            resetForm() {
                this.supervisorForm?.reset();
                this.updateCharCounter();
            }

            // ==================== MÉTODOS DEL FORMULARIO ==================== 
            handleFormSubmit(event) {
                event.preventDefault();
                
                // Validate required fields
                const employeeId = document.querySelector("#employeeId").value.trim();
                const problemDescription = this.textarea?.value.trim();
                
                if (!employeeId || !problemDescription) {
                    alert("Por favor, complete todos los campos obligatorios.");
                    return;
                }

                // Show success message
                this.showSuccessMessage();
                this.closeModal();
            }

            showSuccessMessage() {
                alert("✅ Mensaje enviado exitosamente. Un supervisor se pondrá en contacto contigo pronto.");
            }

            // ==================== CONTADOR DE CARACTERES ==================== 
            updateCharCounter() {
                if (!this.textarea || !this.charCountSpan) return;
                
                const maxLength = 500;
                const currentLength = this.textarea.value.length;
                const remaining = maxLength - currentLength;
                
                this.charCountSpan.textContent = remaining;
                
                // Change color based on remaining characters
                if (remaining < 50) {
                    this.charCountSpan.style.color = "#dc3545"; // Red
                } else if (remaining < 100) {
                    this.charCountSpan.style.color = "#ffc107"; // Yellow
                } else {
                    this.charCountSpan.style.color = "#28a745"; // Green
                }
            }

            // ==================== VISIBILIDAD DEL PIN ==================== 
            togglePinVisibility() {
                if (!this.pinInput || !this.showPinBtn) return;

                const isPassword = this.pinInput.type === "password";
                
                if (isPassword) {
                    this.pinInput.type = "text";
                    this.showPinBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    this.pinInput.type = "password";
                    this.showPinBtn.innerHTML = '<i class="fas fa-eye"></i>';
                }
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