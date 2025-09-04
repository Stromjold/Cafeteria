<?php
require 'conexion.php';
header('Content-Type: application/json');

try {
    $sql = "SELECT id_personal, nombre, rut, rol FROM empleados";
    $result = $conn->query($sql);
    
    $empleados = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $empleados[] = $row;
        }
    }
    echo json_encode($empleados);

    $conn->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Error al obtener empleados: ' . $e->getMessage()]);
}
?>