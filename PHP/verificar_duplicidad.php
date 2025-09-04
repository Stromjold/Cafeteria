<?php
require 'conexion.php';
header('Content-Type: application/json');

// Obtener y limpiar los datos del cliente
$rut = $_POST['rut'] ?? '';
$telefono = $_POST['telefono'] ?? '';

// Variables de verificación
$rutExists = false;
$telefonoExists = false;

// Preparar la consulta para verificar el RUT
$stmt_rut = $conn->prepare("SELECT COUNT(*) FROM proveedores WHERE rut = ?");
$stmt_rut->bind_param("s", $rut);
$stmt_rut->execute();
$stmt_rut->bind_result($countRut);
$stmt_rut->fetch();
$stmt_rut->close();

if ($countRut > 0) {
    $rutExists = true;
}

// Preparar la consulta para verificar el teléfono
$stmt_tel = $conn->prepare("SELECT COUNT(*) FROM proveedores WHERE telefono = ?");
$stmt_tel->bind_param("s", $telefono);
$stmt_tel->execute();
$stmt_tel->bind_result($countTel);
$stmt_tel->fetch();
$stmt_tel->close();

if ($countTel > 0) {
    $telefonoExists = true;
}

$conn->close();

// Enviar la respuesta
$response['success'] = true;
$response['rutExists'] = $rutExists;
$response['telefonoExists'] = $telefonoExists;
$response['message'] = 'Verificación completada.';

echo json_encode($response);
?>