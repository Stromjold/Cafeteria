const supportBubble = document.getElementById('support-bubble');
  const modalBackdrop = document.getElementById('support-modal-backdrop');
  const modalClose = document.getElementById('support-modal-close');
  const supportForm = document.getElementById('support-form');
  supportBubble.addEventListener('click', () => {
    modalBackdrop.classList.add('active');
    modalBackdrop.focus();
  });
  modalClose.addEventListener('click', () => {
    modalBackdrop.classList.remove('active');
    supportBubble.focus();
  });
  modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
      supportBubble.focus();
    }
  });
  supportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Gracias por contactarnos. Te responderemos pronto.');
    supportForm.reset();
    modalBackdrop.classList.remove('active');
    supportBubble.focus();
  });
  // Accessibility: trap focus inside modal when open
  modalBackdrop.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBackdrop.classList.remove('active');
      supportBubble.focus();
    }
    if (e.key === 'Tab') {
      const focusableElements = modalBackdrop.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });