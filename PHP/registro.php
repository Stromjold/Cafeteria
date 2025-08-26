<?php

// 1. Configuración de la conexión a la base de datos
$servername = "localhost"; // Generalmente es localhost
$username = ""; // Tu usuario de MySQL
$password = ""; // Tu contraseña de MySQL
$dbname = "capushin_mountain"; // El nombre de tu base de datos en phpMyAdmin

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// 2. Recibir los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_personal = $_POST['id_personal'];
    $pin = $_POST['pin']; // ¡Advertencia de seguridad! Ver nota abajo.
    $hora_ingreso = date('Y-m-d H:i:s'); // Obtener la hora actual

    // 3. Preparar y ejecutar la consulta SQL para insertar los datos
    // Usamos sentencias preparadas para prevenir inyecciones SQL
    $stmt = $conn->prepare("INSERT INTO registros_sesion (id_personal, pin_ingresado, hora_ingreso) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $id_personal, $pin, $hora_ingreso);

    if ($stmt->execute()) {
        // Inserción exitosa
        // Aquí puedes redirigir al usuario a la página de inicio o a un panel
        header("Location: ../dashboard.php"); // Redirige a una página de ejemplo
        exit();
    } else {
        // Error en la inserción
        echo "Error al registrar el inicio de sesión: " . $stmt->error;
    }

    // Cerrar la sentencia
    $stmt->close();
} else {
    // Si se intenta acceder a registro.php directamente sin POST
    echo "Acceso no permitido.";
}

// Cerrar la conexión a la base de datos
$conn->close();

?>

<?php

// ... (existing code for database connection and sendResponse function) ...

// 3. Procesar datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_personal = trim($_POST['id_personal'] ?? '');
    $pin = trim($_POST['pin'] ?? '');
    $hora_ingreso = date('Y-m-d H:i:s');

    // ... (existing basic validations) ...

    // Correct the table name from 'personal' to 'empleados'
    $stmt = $conn->prepare("SELECT pin FROM empleados WHERE id_empleado = ?"); // Changed 'id_personal' to 'id_empleado' and table 'personal' to 'empleados'
    if (!$stmt) {
        sendResponse(false, "Error en el servidor. Por favor, intenta más tarde.");
    }
    
    $stmt->bind_param("s", $id_personal);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // The ID exists, check the PIN
        $row = $result->fetch_assoc();
        if ($row['pin'] === $pin) {
            // PIN is correct, register the login
            $stmt_insert = $conn->prepare("INSERT INTO registros_sesion (id_personal, pin_ingresado, hora_ingreso) VALUES (?, ?, ?)");
            // ... (rest of the code is fine) ...
        } else {
            sendResponse(false, "PIN incorrecto. Verifica tu PIN e intenta nuevamente.");
        }
    } else {
        sendResponse(false, "ID de empleado no registrado. Contacta al supervisor si crees que es un error.");
    }

    $stmt->close();
} else {
    sendResponse(false, "Acceso no permitido.");
}

$conn->close();
?>
