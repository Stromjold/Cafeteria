<?php
include 'conexion.php';

header('Content-Type: application/json');

$sql = "SELECT id_proveedor, nombre, rut, correo, telefono FROM proveedores";
$result = $conn->query($sql);

$proveedores = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $proveedores[] = $row;
    }
}

echo json_encode($proveedores);

$conn->close();
?>