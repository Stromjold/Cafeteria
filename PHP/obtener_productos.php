<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

require 'conexion.php'; 

$sql = "SELECT nombre, proveedor, fecha_vencimiento, precio_unitario, cantidad, (cantidad * precio_unitario) AS subtotal, id_producto FROM productos";
$result = $conn->query($sql);

$productos = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
} else {
    // Si no hay resultados, devuelve un arreglo vacío
    $productos = [];
}

echo json_encode(['success' => true, 'productos' => $productos]);

$conn->close();
?>