<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$empleados = array();

// Consulta para seleccionar todos los empleados
$sql = "SELECT id_personal, nombre, rut, correo, rol FROM empleados ORDER BY nombre";
$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $empleados[] = $row;
        }
    }
    echo json_encode($empleados);
    $result->close();
} else {
    // Manejo de error si la consulta falla
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Error en la consulta: ' . $conn->error]);
}

$conn->close();
?>