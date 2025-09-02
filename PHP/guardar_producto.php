<?php
// Incluir el archivo de conexión a la base de datos
require 'conexion.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del POST
    $nombre = $_POST['nombre'] ?? '';
    $proveedor = $_POST['proveedor'] ?? '';
    $id_producto = $_POST['id_producto'] ?? '';
    $fecha_vencimiento = $_POST['fecha_vencimiento'] ?? '';
    $cantidad = $_POST['cantidad'] ?? 0;
    $precio_unitario = $_POST['precio_unitario'] ?? 0.0;

    // Validar datos
    if (empty($nombre) || empty($proveedor) || empty($id_producto) || empty($fecha_vencimiento) || $cantidad <= 0 || $precio_unitario <= 0) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios y deben ser válidos.']);
        exit();
    }

    // Preparar la consulta SQL para insertar los datos de forma segura
    $sql = "INSERT INTO productos (nombre, proveedor, id_producto, fecha_vencimiento, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Enlazar los parámetros y ejecutar la consulta
    $stmt->bind_param("ssssid", $nombre, $proveedor, $id_producto, $fecha_vencimiento, $cantidad, $precio_unitario);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Producto guardado exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al guardar el producto: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido.']);
}
?>