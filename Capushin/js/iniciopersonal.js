document.addEventListener('DOMContentLoaded', function() {
            // Obtener elementos del DOM
            const contactLink = document.getElementById('contactSupervisor');
            const modal = document.getElementById('supervisorModal');
            const closeBtn = document.querySelector('.close-modal');
            const cancelBtn = document.getElementById('cancelBtn');
            const submitBtn = document.getElementById('submitBtn');
            const form = document.getElementById('supervisorForm');
            const textarea = document.getElementById('problemDescription');
            const charCount = document.getElementById('charCount');

            // Abrir modal al hacer clic en el enlace
            contactLink.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                textarea.focus();
            });

            // Cerrar modal con la X
            closeBtn.addEventListener('click', function() {
                closeModal();
            });

            // Cerrar modal con el botón Cancelar
            cancelBtn.addEventListener('click', function() {
                closeModal();
            });

            // Cerrar modal al hacer clic fuera de él
            window.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });

            // Función para cerrar el modal
            function closeModal() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                form.reset();
                updateCharCount();
            }

            // Contador de caracteres
            textarea.addEventListener('input', updateCharCount);

            function updateCharCount() {
                const remaining = 500 - textarea.value.length;
                charCount.textContent = remaining;
                
                if (remaining < 50) {
                    charCount.style.color = '#e74c3c';
                } else if (remaining < 100) {
                    charCount.style.color = '#f39c12';
                } else {
                    charCount.style.color = '#666';
                }
            }

            // Manejar envío del formulario
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = {
                    employeeId: document.getElementById('employeeId').value,
                    problemType: document.getElementById('problemType').value,
                    description: textarea.value,
                    timestamp: new Date().toISOString(),
                    urgent: document.getElementById('urgentCheck').checked
                };

                // Validar campos requeridos
                if (!formData.employeeId || !formData.description.trim()) {
                    alert('Por favor, completa todos los campos requeridos.');
                    return;
                }

                // Simular envío
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                setTimeout(() => {
                    console.log('Datos enviados:', formData);
                    alert('Tu solicitud ha sido enviada exitosamente al supervisor. Recibirás una respuesta pronto.');
                    closeModal();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar solicitud';
                }, 1500);
            });

            // Inicializar contador
            updateCharCount();
        });

