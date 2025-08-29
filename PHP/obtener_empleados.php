<?php
require 'conexion.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar que todos los campos estén presentes
    if (!isset($_POST['nombre'], $_POST['rut'], $_POST['tipo'], $_POST['pin'])) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
        exit;
    }

    $nombre = trim($_POST['nombre']);
    $rut = trim($_POST['rut']);
    $rol = $_POST['tipo'];
    $pin = $_POST['pin'];
    
    // Validaciones básicas
    if (empty($nombre) || empty($rut) || empty($rol) || empty($pin)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
        exit;
    }
    
    // Validar que el PIN tenga exactamente 6 dígitos
    if (!preg_match('/^\d{6}$/', $pin)) {
        echo json_encode(['success' => false, 'message' => 'El PIN debe tener exactamente 6 dígitos.']);
        exit;
    }
    
    // Verificar si el RUT ya existe
    $stmt_check = $conn->prepare("SELECT id_personal FROM empleados WHERE rut = ?");
    $stmt_check->bind_param("s", $rut);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();
    
    if ($result_check->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Ya existe un empleado con este RUT.']);
        exit;
    }
    
    // Encriptar el PIN
    $pin_hasheado = password_hash($pin, PASSWORD_DEFAULT);

    // Generar un id_empleado único basado en el rol
    $prefijo = '';
    switch ($rol) {
        case 'Asistente de Gerencia':
            $prefijo = 'ASG';
            break;
        case 'Administrador':
            $prefijo = 'ADM';
            break;
        case 'Supervisor':
            $prefijo = 'SUP';
            break;
        case 'Cajero':
            $prefijo = 'CAJ';
            break;
        case 'Cocinero':
            $prefijo = 'COC';
            break;
        case 'Limpieza':
            $prefijo = 'LIM';
            break;
        default:
            $prefijo = 'EMP';
    }
    
    // Generar ID único (verificar que no exista)
    do {
        $numero = str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT);
        $id_empleado = $prefijo . '-' . $numero;
        
        $stmt_id = $conn->prepare("SELECT id_personal FROM empleados WHERE id_personal = ?");
        $stmt_id->bind_param("s", $id_empleado);
        $stmt_id->execute();
        $result_id = $stmt_id->get_result();
    } while ($result_id->num_rows > 0);

    // Insertar en la base de datos
    $sql = "INSERT INTO empleados (id_personal, nombre, rut, pin, rol, fecha_registro) VALUES (?, ?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $id_empleado, $nombre, $rut, $pin_hasheado, $rol);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true, 
            'message' => 'Empleado registrado exitosamente.', 
            'id_empleado' => $id_empleado
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al registrar empleado: ' . $stmt->error]);
    }

    $stmt->close();
    $stmt_check->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>