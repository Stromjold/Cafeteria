<?php
include 'conexion.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $rut = $conn->real_escape_string($_POST['rut']);
    $correo = $conn->real_escape_string($_POST['correo']);
    $telefono = $conn->real_escape_string($_POST['telefono']);

    $sql = "INSERT INTO proveedores (nombre, rut, correo, telefono) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
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