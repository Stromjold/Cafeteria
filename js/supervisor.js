 // Mobile toggle sidebar
    const mobileToggle = document.querySelector('.mobile-toggle');
    const sidebar = document.querySelector('nav.sidebar');

    mobileToggle.addEventListener('click', () => {
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !expanded);
      sidebar.classList.toggle('show');
    });

    // Close sidebar on click outside on mobile
    document.addEventListener('click', (e) => {
      if(window.innerWidth <= 767) {
        if(!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
          sidebar.classList.remove('show');
          mobileToggle.setAttribute('aria-expanded', false);
        }
      }
    });

    // Assistance requests data storage
    const requests = [];

    const contactForm = document.getElementById('contactForm');
    const requestList = document.getElementById('requestList');
    const requestsCountBadge = document.getElementById('requests-count');

    function updateRequestsCount() {
      const count = requests.filter(r => !r.responded).length;
      requestsCountBadge.textContent = count;
      requestsCountBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }

    function renderRequests() {
      if (requests.length === 0) {
        requestList.innerHTML = '<p style="color:#a1887f; font-style: italic; user-select:none;">No hay solicitudes recibidas.</p>';
        updateRequestsCount();
        return;
      }
      requestList.innerHTML = '';
      requests.forEach((req, index) => {
        const item = document.createElement('article');
        item.className = 'request-item';
        item.setAttribute('tabindex', '0');

        const info = document.createElement('div');
        info.className = 'request-info';
        info.textContent = req.name;

        const email = document.createElement('div');
        email.className = 'request-email';
        email.textContent = req.email;

        const message = document.createElement('div');
        message.className = 'request-message';
        message.textContent = req.message;

        item.appendChild(info);
        item.appendChild(email);
        item.appendChild(message);

        if (!req.responded) {
          // reply UI
          const replyDiv = document.createElement('div');
          replyDiv.className = 'request-reply';

          const textarea = document.createElement('textarea');
          textarea.placeholder = 'Escribe tu respuesta aquí...';
          textarea.rows = 2;
          textarea.setAttribute('aria-label', `Respuesta a ${req.name}`);

          const sendBtn = document.createElement('button');
          sendBtn.type = 'button';
          sendBtn.innerHTML = '<span class="material-icons" aria-hidden="true">send</span> Responder';
          sendBtn.setAttribute('aria-label', `Responder a ${req.name}`);

          sendBtn.addEventListener('click', () => {
            const replyText = textarea.value.trim();
            if (replyText.length === 0) {
              alert('Por favor, escribe una respuesta antes de enviar.');
              textarea.focus();
              return;
            }
            alert(`Respuesta enviada a ${req.name} (${req.email}):\n\n${replyText}`);
            req.responded = true;
            renderRequests();
          });

          replyDiv.appendChild(textarea);
          replyDiv.appendChild(sendBtn);
          item.appendChild(replyDiv);
        } else {
          const respondedMsg = document.createElement('div');
          respondedMsg.style.fontStyle = 'italic';
          respondedMsg.style.color = '#6f4e37';
          respondedMsg.textContent = 'Respuesta enviada.';
          item.appendChild(respondedMsg);
        }
        requestList.appendChild(item);
      });
      updateRequestsCount();
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (name && email && message) {
        // Add new request to the list
        requests.push({ name, email, message, responded: false });
        alert(
          `Gracias, ${name}! Tu mensaje ha sido enviado al supervisor.\n\n` +
          `Correo: ${email}\nMensaje: ${message}`
        );
        contactForm.reset();
        renderRequests();
      } else {
        alert('Por favor, completa todos los campos antes de enviar.');
      }
    });

    // Initial render with empty requests
    renderRequests();

     // Función para recibir la información
        const params = new URLSearchParams(window.location.search);
        const employeeID = params.get('employeeID');
        const message = params.get('message');
        if (employeeID && message) {
            document.getElementById('infoDisplay').innerHTML = 
                `<p>ID de Empleado: ${employeeID}</p>
                 <p>Mensaje: ${message}</p>`;
        } else {
            document.getElementById('infoDisplay').innerText = "No se recibieron datos.";
        }
