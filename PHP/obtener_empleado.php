<?php
require 'conexion.php';
header('Content-Type: application/json');

if (!isset($_GET['id_personal'])) {
    echo json_encode(['message' => 'ID de empleado no especificado.']);
    exit;
}

$id_personal = $_GET['id_personal'];

try {
    $sql = "SELECT id_personal, nombre, rut, rol FROM empleados WHERE id_personal = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id_personal);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $empleado = null;
    if ($result->num_rows > 0) {
        $empleado = $result->fetch_assoc();
    }
    
    echo json_encode($empleado);

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Error al obtener empleado: ' . $e->getMessage()]);
}
?>