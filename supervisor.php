<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>Dashboard Supervisor - Cafetería</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&amp;display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <link rel="stylesheet" href="Estilos/supervisor.css" />
  <link rel="stylesheet" href="Estilos/encavezado.css">
  
</head>
<body>
  <header>
    <a href="configuracion.html" class="logo" title="Inicio">
      <img src="https://img.icons8.com/?size=48&id=s5NUIabJrb4C&format=png" alt="Logo de Capuchin">
    </a>
    <h1>Administracion</h1>
  </header>
    <nav>
        <div class="radio-inputs">
          <label class="radio">
            <input type="radio" name="radio"  value="Administracion.html">
            <span class="name">dashboard</span>
          </label>
          <label class="radio">
            <input type="radio" name="radio" value="Inventario.html">
            <span class="name">Inventario</span>
          </label>
              
          <label class="radio">
            <input type="radio" name="radio" value="personal.html">
            <span class="name">Empleados</span>
          </label>
          <label class="radio">
            <input type="radio" name="radio" value="admin_ventas.html">
            <span class="name">Ventas</span>
          </label>
          <label class="radio">
            <input type="radio" name="radio" value="finanzas.html">
            <span class="name">Finanzas</span>
          </label>
          <label class="radio">
            <input type="radio" name="radio" value="clientes.html">
            <span class="name">Clientes</span>
          </label>
          <label class="radio">
            <input type="radio" name="radio" checked="" value="supervisor.html">
            <span class="name">Supervisor</span>  
          </label>
        </div>
    </nav>
  <main>
    <div class="dashboard-grid">

      <!-- Ventas del Mes -->
      <section id="ventas-mes" class="card" tabindex="0" aria-labelledby="ventas-title">
        <h3 id="ventas-title"><span class="material-icons" aria-hidden="true">point_of_sale</span> Ventas del Mes</h3>
        <div class="card-content">
          <div class="summary-value" aria-live="polite" aria-atomic="true">$24,580</div>
          <div class="summary-label">Total en ventas</div>
        </div>
      </section>

      <!-- Inventario de Productos -->
      <section id="inventario" class="card" tabindex="0" aria-labelledby="inventario-title">
        <h3 id="inventario-title"><span class="material-icons" aria-hidden="true">inventory_2</span> Inventario de Productos</h3>
        <div class="card-content">
          <div class="summary-value" aria-live="polite" aria-atomic="true">156</div>
          <div class="summary-label">Productos en stock</div>
          <small>items disponibles</small>
        </div>
      </section>

      <!-- Empleados Activos -->
      <section id="empleados" class="card" tabindex="0" aria-labelledby="empleados-title">
        <h3 id="empleados-title"><span class="material-icons" aria-hidden="true">groups</span> Empleados Activos</h3>
        <div class="card-content">
          <div class="summary-value" aria-live="polite" aria-atomic="true">15</div>
          <div class="summary-label">Número total de empleados</div>
        </div>
      </section>

      <!-- Clientes Registrados -->
      <section id="clientes" class="card" tabindex="0" aria-labelledby="clientes-title">
        <h3 id="clientes-title"><span class="material-icons" aria-hidden="true">people_alt</span> Clientes Registrados</h3>
        <div class="card-content">
          <div class="summary-value" aria-live="polite" aria-atomic="true">89</div>
          <div class="summary-label">Total de clientes registrados</div>
        </div>
      </section>

      <!-- Últimas Ventas -->
      <section id="ultimas-ventas" class="card" tabindex="0" aria-labelledby="ultimas-ventas-title">
        <h3 id="ultimas-ventas-title"><span class="material-icons" aria-hidden="true">receipt_long</span> Últimas Ventas</h3>
        <ul class="list" aria-label="Lista de transacciones recientes">
          <li><span>2025-06-05</span><span>Café Latte</span><span>$2,000</span></li>
          <li><span>2025-06-05</span><span>Brownie</span><span>$1,500</span></li>
        </ul>
      </section>
      
      <!-- Productos Más Vendidos -->
      <section id="productos-mas-vendidos" class="card" tabindex="0" aria-labelledby="productos-mas-vendidos-title">
        <h3 id="productos-mas-vendidos-title"><span class="material-icons" aria-hidden="true">trending_up</span> Productos Más Vendidos</h3>
        <ul class="list" aria-label="Lista de productos con mayor demanda">
          <li><span>Café Orgánico</span><span>Cantidad Vendida: 45</span></li>
          <li><span>Brownie de Chocolate</span><span>Cantidad Vendida: 32</span></li>
        </ul>
      </section>

      <!-- Sugerencias Adicionales -->
      <section id="sugerencias" class="card" tabindex="0" aria-labelledby="sugerencias-title">
        <h3 id="sugerencias-title"><span class="material-icons" aria-hidden="true">lightbulb</span> Sugerencias Adicionales</h3>
        <ul class="tools-list" aria-label="Funciones y herramientas adicionales">
          <li>Reportes y Análisis: Genera reportes detallados sobre ventas, productos y empleados.</li>
          <li>Herramientas de Gestión: Añadir o remover productos y gestionar tareas de empleados.</li>
          <li>Interacción con Clientes: Registro de feedback y promociones para clientes registrados.</li>
        </ul>
        <button class="btn-action" type="button" aria-label="Generar reporte">
          <span class="material-icons" aria-hidden="true">insert_chart</span> Generar Reporte
        </button>
      </section>

      <!-- Contacto con el Supervisor -->
      <section id="contacto-supervisor" class="card" tabindex="0" aria-labelledby="contacto-supervisor-title">
        <h3 id="contacto-supervisor-title">
          <span class="material-icons" aria-hidden="true">support_agent</span> Contacto de solicitudes
        </h3>
        <div class="contact-section">

          

          <div class="requests-container" aria-live="polite" aria-atomic="true" aria-label="Lista de solicitudes de asistencia recibidas por el supervisor">
            <div class="requests-header">
              <span class="material-icons profile-icon" aria-hidden="true" title="Solicitudes recibidas">account_circle</span>
              <span>Solicitudes de Asistencia</span>
              <span class="badge" id="requests-count" aria-label="Número de solicitudes no respondidas">0</span>
            </div>
            <div class="request-list" id="requestList" tabindex="0">
              <!-- Assistance requests will appear here -->
              <p style="color:#a1887f; font-style: italic; user-select:none;">No hay solicitudes recibidas.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  </main>

   <footer>
        &copy; 2024 Dulcería - Administración de Finanzas
    </footer>

  <script src="js/supervisor.js"></script>
  <script src="js/encavesado.js"></script>
</body>
</html>

