<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$response = array();

// Verificar si se recibió el id_personal por GET
if (!isset($_GET['id_personal']) || empty($_GET['id_personal'])) {
    $response['message'] = 'ID de empleado no proporcionado.';
    echo json_encode($response);
    exit;
}

$id_personal = $conn->real_escape_string($_GET['id_personal']);

// Preparar y ejecutar la consulta
$sql = "SELECT id_personal, nombre, rut, correo, rol FROM empleados WHERE id_personal = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("s", $id_personal);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $empleado = $result->fetch_assoc();
        echo json_encode($empleado);
    } else {
        $response['message'] = 'Empleado no encontrado.';
        echo json_encode($response);
    }
    $stmt->close();
} else {
    $response['message'] = 'Error en la preparación de la consulta: ' . $conn->error;
    echo json_encode($response);
}

$conn->close();
?>