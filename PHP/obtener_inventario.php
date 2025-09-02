<?php
// Incluir el archivo de conexión a la base de datos
require 'conexion.php';

header('Content-Type: application/json');

// Consulta para obtener todos los productos de la tabla
$sql = "SELECT nombre, proveedor, id_producto, fecha_vencimiento, cantidad, precio_unitario FROM productos";
$result = $conn->query($sql);

$productos = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

// Devolver los resultados en formato JSON
echo json_encode($productos);

$conn->close();
?>