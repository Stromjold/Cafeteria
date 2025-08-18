const radioButtons = document.querySelectorAll('input[name="radio"]');
    const glider = document.querySelector('.glider');
    const radioContainer = document.querySelector('.radio-container');

    radioButtons.forEach(radioButton => {
      radioButton.addEventListener('change', function() {
        if (this.checked) {
          window.location.href = this.value; // Redirección

          // Calcula la posición del glider
          const label = document.querySelector(`label[for="${this.id}"]`);
          const labelRect = label.getBoundingClientRect();
          const containerRect = radioContainer.getBoundingClientRect();
          const offset = labelRect.left - containerRect.left;

          // Aplica la transformación para mover el glider
          glider.style.transform = `translateX(${offset}px)`;
        }
      });
    });

    // Establece la posición inicial del glider
    const initialChecked = document.querySelector('input[name="radio"]:checked');
    if (initialChecked) {
      const label = document.querySelector(`label[for="${initialChecked.id}"]`);
      const labelRect = label.getBoundingClientRect();
      const containerRect = radioContainer.getBoundingClientRect();
      const offset = labelRect.left - containerRect.left;
      glider.style.transform = `translateX(${offset}px)`;
    }