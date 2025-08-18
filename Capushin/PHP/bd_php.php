<?php
// Configuración de la base de datos para XAMPP
$host = 'localhost';
$user = 'root'; 
$pass = 'Labaiep25'; 
$bd = 'capushin'; 

// Configuración de caracteres UTF-8
$charset = 'utf8mb4';

// DSN (Data Source Name) para PDO
$dsn = "mysql:host=$host;dbname=$bd;charset=$charset";

// Opciones de PDO para mejor manejo de errores y seguridad
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    // Crear conexión PDO
    $pdo = new PDO($dsn, $user, $pass, $options);
    
    // Opcional: Mantener también la conexión mysqli para compatibilidad
    $conn = new mysqli($host, $user, $pass, $bd);
    
    // Verificar conexión mysqli
    if ($conn->connect_error) {
        throw new Exception("Error de conexión MySQLi: " . $conn->connect_error);
    }
    
    // Establecer charset para mysqli
    $conn->set_charset("utf8mb4");
    
} catch (PDOException $e) {
    // Log del error (en producción, no mostrar detalles)
    error_log("Error de conexión PDO: " . $e->getMessage());
    die("Error de conexión a la base de datos. Por favor, contacta al administrador.");
} catch (Exception $e) {
    // Log del error
    error_log("Error de conexión: " . $e->getMessage());
    die("Error de conexión a la base de datos. Por favor, contacta al administrador.");
}

// Función para cerrar conexiones
function cerrarConexiones() {
    global $pdo, $conn;
    $pdo = null;
    if ($conn) {
        $conn->close();
    }
}
?>