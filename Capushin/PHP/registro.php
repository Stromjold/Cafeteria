<?php
session_start();
include("bd_php.php");

// Función para limpiar entrada de datos
function limpiarEntrada($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Función para redirigir con mensaje
function redirigirConMensaje($mensaje, $tipo = 'error', $destino = '../iniciosesionpersonal.html') {
    $tipoAlert = ($tipo === 'error') ? 'error' : 'success';
    echo "<script>
        alert('$mensaje');
        window.location.href='$destino';
    </script>";
    exit();
}

// Verificar que la petición sea POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Validar que los campos requeridos estén presentes
    if (empty($_POST['id_personal']) || empty($_POST['pin'])) {
        redirigirConMensaje('Por favor, complete todos los campos requeridos.');
    }
    
    // Limpiar y validar datos de entrada
    $id_personal = limpiarEntrada($_POST['id_personal']);
    $pin = limpiarEntrada($_POST['pin']);
    $mantener_sesion = isset($_POST['mantener_sesion']) ? true : false;
    
    // Validar formato del PIN (6 dígitos)
    if (!preg_match('/^[0-9]{6}$/', $pin)) {
        redirigirConMensaje('El PIN debe contener exactamente 6 dígitos.');
    }
    
    // Validar formato del ID de empleado
    if (!preg_match('/^EMP-[0-9]{4}-[0-9]{3}$/', $id_personal)) {
        redirigirConMensaje('El formato del ID de empleado no es válido. Debe ser: EMP-YYYY-XXX');
    }
    
    try {
        // Usar prepared statements para prevenir inyección SQL
        $sql = "SELECT id_personal, tipo_usuario, nombre, activo FROM iniciosesion WHERE id_personal = ? AND pin = ?";
        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            throw new Exception("Error en la preparación de la consulta: " . $conn->error);
        }
        
        $stmt->bind_param("ss", $id_personal, $pin);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $usuario = $result->fetch_assoc();
            
            // Verificar si el usuario está activo
            if ($usuario['activo'] == 0) {
                redirigirConMensaje('Su cuenta está desactivada. Contacte al administrador.');
            }
            
            // Crear sesión
            $_SESSION['id_personal'] = $usuario['id_personal'];
            $_SESSION['tipo_usuario'] = $usuario['tipo_usuario'];
            $_SESSION['nombre'] = $usuario['nombre'];
            $_SESSION['login_time'] = time();
            
            // Configurar duración de sesión
            if ($mantener_sesion) {
                // Mantener sesión por 30 días
                ini_set('session.gc_maxlifetime', 2592000);
                session_set_cookie_params(2592000);
            } else {
                // Sesión normal (hasta cerrar navegador)
                ini_set('session.gc_maxlifetime', 0);
                session_set_cookie_params(0);
            }
            
            // Registrar el inicio de sesión (opcional, para auditoría)
            $ip_address = $_SERVER['REMOTE_ADDR'];
            $user_agent = $_SERVER['HTTP_USER_AGENT'];
            
            $log_sql = "INSERT INTO logs_sesion (id_personal, ip_address, user_agent, fecha_login) VALUES (?, ?, ?, NOW())";
            $log_stmt = $conn->prepare($log_sql);
            if ($log_stmt) {
                $log_stmt->bind_param("sss", $id_personal, $ip_address, $user_agent);
                $log_stmt->execute();
                $log_stmt->close();
            }
            
            // Redirigir según el tipo de usuario
            switch ($usuario['tipo_usuario']) {
                case 'administrador':
                    header("Location: ../Administracion.html");
                    break;
                case 'supervisor':
                    header("Location: ../PaginPrincipal.html");
                    break;
                case 'empleado':
                    header("Location: ../PaginPrincipal.html");
                    break;
                default:
                    header("Location: ../PaginPrincipal.html");
                    break;
            }
            exit();
            
        } else {
            // Credenciales incorrectas
            redirigirConMensaje('ID de empleado o PIN incorrectos. Verifique sus credenciales.');
        }
        
        $stmt->close();
        
    } catch (Exception $e) {
        // Log del error
        error_log("Error en login: " . $e->getMessage());
        redirigirConMensaje('Error interno del servidor. Intente nuevamente.');
    }
    
} else {
    // Petición no válida
    redirigirConMensaje('Método de petición no válido.');
}

// Cerrar conexión
$conn->close();
?>