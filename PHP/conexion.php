<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";      // Cambia por tu usuario de MySQL
$password = "Labaiep25";          // Cambia por tu contraseña de MySQL (vacío para XAMPP por defecto)
$dbname = "dulceria";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Configurar charset para caracteres especiales
$conn->set_charset("utf8");

// Verificar conexión
if ($conn->connect_error) {
    // Log del error para debugging
    error_log("Error de conexión a MySQL: " . $conn->connect_error);
    
    // Respuesta para el cliente
    if (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']);
    } else {
        die("Error de conexión a la base de datos. Contacte al administrador.");
    }
    exit;
}

// Configuración de zona horaria
date_default_timezone_set('America/Santiago');
?>