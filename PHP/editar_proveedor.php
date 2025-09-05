<?php
// Incluir el archivo de conexión a la base de datos
require 'conexion.php'; 

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_proveedor = $_POST['id_proveedor'] ?? '';
    $nombre = $_POST['nombre'] ?? '';
    $rut = $_POST['rut'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $telefono = $_POST['telefono'] ?? '';

    // Validar datos
    if (empty($id_proveedor) || empty($nombre) || empty($rut) || empty($correo) || empty($telefono)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
        exit();
    }

    // Preparar la consulta SQL para actualizar los datos
    $sql = "UPDATE proveedores SET nombre = ?, rut = ?, correo = ?, telefono = ? WHERE id_proveedor = ?";
    $stmt = $conn->prepare($sql);

    // Enlazar los parámetros y ejecutar la consulta
    $stmt->bind_param("ssssi", $nombre, $rut, $correo, $telefono, $id_proveedor);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Proveedor actualizado exitosamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'No se realizaron cambios o el proveedor no fue encontrado.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar el proveedor: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}
$conn->close();
?>