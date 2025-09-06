<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$response = array('success' => false, 'message' => '');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Método de solicitud no válido.';
    echo json_encode($response);
    exit;
}

// Obtener y sanitizar los datos
$id_personal = isset($_POST['id_personal']) ? $conn->real_escape_string($_POST['id_personal']) : '';
$nombre = isset($_POST['nombre']) ? $conn->real_escape_string($_POST['nombre']) : '';
$rut = isset($_POST['rut']) ? $conn->real_escape_string($_POST['rut']) : '';
$correo = isset($_POST['correo']) ? $conn->real_escape_string($_POST['correo']) : '';
$rol = isset($_POST['rol']) ? $conn->real_escape_string($_POST['rol']) : '';

// Validar que el ID no esté vacío
if (empty($id_personal)) {
    $response['message'] = 'ID de empleado no proporcionado.';
    echo json_encode($response);
    exit;
}

// Preparar la consulta SQL para actualizar el registro
$sql = "UPDATE empleados SET nombre = ?, rut = ?, correo = ?, rol = ? WHERE id_personal = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("sssss", $nombre, $rut, $correo, $rol, $id_personal);
    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Empleado actualizado exitosamente.';
    } else {
        $response['message'] = 'Error al actualizar el empleado: ' . $stmt->error;
    }
    $stmt->close();
} else {
    $response['message'] = 'Error en la preparación de la consulta: ' . $conn->error;
}

$conn->close();
echo json_encode($response);
?>