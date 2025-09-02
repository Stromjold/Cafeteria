<?php
header('Content-Type: application/json');
require 'conexion.php'; // Asegúrate de tener el archivo conexion.php con tus datos de la base de datos.

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar y sanear los datos de entrada
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $proveedor = isset($_POST['proveedor']) ? trim($_POST['proveedor']) : '';
    $id_producto = isset($_POST['id_producto']) ? trim($_POST['id_producto']) : '';
    $fecha_vencimiento = isset($_POST['fecha_vencimiento']) ? $_POST['fecha_vencimiento'] : '';
    $cantidad = isset($_POST['cantidad']) ? (int)$_POST['cantidad'] : 0;
    $precio_unitario = isset($_POST['precio_unitario']) ? (float)$_POST['precio_unitario'] : 0.00;

    // Validación básica de campos
    if (empty($nombre) || empty($proveedor) || empty($id_producto) || empty($fecha_vencimiento) || $cantidad <= 0 || $precio_unitario <= 0) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos obligatorios deben ser llenados correctamente.']);
        exit;
    }

    // Verificar si el ID de producto ya existe
    $stmt_check = $conn->prepare("SELECT id_producto FROM productos WHERE id_producto = ?");
    $stmt_check->bind_param("s", $id_producto);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();

    if ($result_check->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Ya existe un producto con este ID.']);
        exit;
    }

    // Preparar la consulta SQL para insertar los datos
    $sql = "INSERT INTO productos (nombre, proveedor, id_producto, fecha_vencimiento, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssid", $nombre, $proveedor, $id_producto, $fecha_vencimiento, $cantidad, $precio_unitario);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Producto registrado exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al registrar el producto: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();

} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>