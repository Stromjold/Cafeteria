<?php
// Incluir el archivo de conexión a la base de datos
require 'conexion.php'; 

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del POST
    $nombre = $_POST['nombre'] ?? '';
    $rut = $_POST['rut'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $telefono = $_POST['telefono'] ?? '';

    // Validar datos
    if (empty($nombre) || empty($rut) || empty($correo) || empty($telefono)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
        exit();
    }

    // Preparar la consulta SQL para insertar los datos
    $sql = "INSERT INTO proveedores (nombre, rut, correo, telefono) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Enlazar los parámetros y ejecutar la consulta
    $stmt->bind_param("ssss", $nombre, $rut, $correo, $telefono);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Proveedor guardado exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al guardar el proveedor: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}
$conn->close();
?>

