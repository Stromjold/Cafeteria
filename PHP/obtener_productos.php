<?php
include 'conexion.php';

header('Content-Type: application/json');

$sql = "SELECT nombre, proveedor, id_producto, fecha_vencimiento, cantidad, precio_unitario, enlace_imagen FROM productos";
$result = $conn->query($sql);

$productos = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

echo json_encode(['success' => true, 'productos' => $productos]);

$conn->close();
?>