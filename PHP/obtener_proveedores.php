<?php
// Incluir el archivo de conexión a la base de datos
require 'conexion.php'; 

header('Content-Type: application/json');

// Consulta para obtener todos los proveedores
$sql = "SELECT nombre, rut, correo, telefono FROM proveedores";
$result = $conn->query($sql);

$proveedores = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $proveedores[] = $row;
    }
}

// Devolver los resultados en formato JSON, incluso si no hay proveedores
echo json_encode($proveedores);

$conn->close();
?>