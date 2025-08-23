// Abrir y cerrar el modal
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".modal");
    const openModalBtn = document.querySelector("#openModalBtn"); // Botón para abrir el modal
    const cancelBtn = document.querySelector("#cancelBtn");
    const charCountSpan = document.querySelector("#charCount");
    const textarea = document.querySelector("textarea");

    // Abrir el modal
    openModalBtn?.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Cerrar el modal
    cancelBtn?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Contador de caracteres
    textarea?.addEventListener("input", () => {
        const maxLength = 500;
        const remaining = maxLength - textarea.value.length;
        charCountSpan.textContent = remaining;

        if (remaining < 0) {
            charCountSpan.style.color = "red";
        } else {
            charCountSpan.style.color = "black";
        }
    });

    // Checkbox de urgencia
    const urgentCheck = document.querySelector("#urgentCheck");
    urgentCheck?.addEventListener("change", () => {
        if (urgentCheck.checked) {
            alert("Has marcado la solicitud como urgente.");
        }
    });
});