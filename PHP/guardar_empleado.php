<?php
header('Content-Type: application/json');
require_once 'conexion.php';

$response = array('success' => false, 'message' => '');

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Método de solicitud no válido.';
    echo json_encode($response);
    exit;
}

// Obtener y sanitizar los datos del formulario
$nombre = isset($_POST['nombre']) ? $conn->real_escape_string($_POST['nombre']) : '';
$rut = isset($_POST['rut']) ? $conn->real_escape_string($_POST['rut']) : '';
$correo = isset($_POST['correo']) ? $conn->real_escape_string($_POST['correo']) : '';
$pin = isset($_POST['pin']) ? $_POST['pin'] : '';
$rol = isset($_POST['tipo']) ? $conn->real_escape_string($_POST['tipo']) : '';

// Validar datos básicos
if (empty($nombre) || empty($rut) || empty($correo) || empty($pin) || empty($rol)) {
    $response['message'] = 'Todos los campos son obligatorios.';
    echo json_encode($response);
    exit;
}

// Generar id_personal basado en el rol
$prefix = '';
switch ($rol) {
    case 'Administrador':
        $prefix = 'ADM-';
        break;
    case 'Cajero':
        $prefix = 'CAJ-';
        break;
    case 'Cocinero':
        $prefix = 'COC-';
        break;
    case 'Supervisor':
        $prefix = 'SUP-';
        break;
    case 'Limpieza':
        $prefix = 'LIM-';
        break;
    case 'Asistente de Gerencia':
        $prefix = 'ASG-';
        break;
    default:
        $prefix = 'EMP-';
        break;
}

// Obtener el último ID para el rol
$sql_last_id = "SELECT id_personal FROM empleados WHERE id_personal LIKE '{$prefix}%' ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql_last_id);
$last_id = 0;
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $last_id_str = $row['id_personal'];
    $last_id = (int)substr($last_id_str, strlen($prefix));
}
$new_id_number = $last_id + 1;
$id_personal = $prefix . str_pad($new_id_number, 3, '0', STR_PAD_LEFT);

// Hash del PIN para seguridad
$hashed_pin = password_hash($pin, PASSWORD_DEFAULT);

// Preparar la consulta SQL con una declaración preparada
$sql = "INSERT INTO empleados (id_personal, nombre, rut, correo, pin, rol, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("ssssss", $id_personal, $nombre, $rut, $correo, $hashed_pin, $rol);
    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Empleado registrado exitosamente.';
        $response['id_empleado'] = $id_personal;
    } else {
        $response['message'] = 'Error al registrar al empleado: ' . $stmt->error;
    }
    $stmt->close();
} else {
    $response['message'] = 'Error en la preparación de la consulta: ' . $conn->error;
}

$conn->close();
echo json_encode($response);
?>