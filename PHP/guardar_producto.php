<?php
include 'conexion.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $conn->real_escape_string($_POST['nombre_producto']);
    $proveedor = $conn->real_escape_string($_POST['proveedor']);
    $id_producto = $conn->real_escape_string($_POST['codigo']);
    $fecha_vencimiento = $conn->real_escape_string($_POST['fecha_vencimiento']);
    $cantidad = (int)$_POST['cantidad'];
    $precio_unitario = (float)str_replace('.', '', $_POST['precio_unitario']);
    $enlace_imagen = $conn->real_escape_string($_POST['enlace_imagen']);

    $sql = "INSERT INTO productos (nombre, proveedor, id_producto, fecha_vencimiento, cantidad, precio_unitario, enlace_imagen) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssids", $nombre, $proveedor, $id_producto, $fecha_vencimiento, $cantidad, $precio_unitario, $enlace_imagen);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Producto guardado exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al guardar el producto: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}

$conn->close();
?>