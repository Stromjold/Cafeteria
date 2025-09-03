<?php
require 'conexion.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['id_personal'], $_POST['nombre'], $_POST['rut'], $_POST['rol'])) {
        echo json_encode(['success' => false, 'message' => 'Faltan campos obligatorios.']);
        exit;
    }

    $id_personal = $_POST['id_personal'];
    $nombre = trim($_POST['nombre']);
    $rut = trim($_POST['rut']);
    $rol = $_POST['rol'];

    try {
        $sql = "UPDATE empleados SET nombre = ?, rut = ?, rol = ? WHERE id_personal = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $nombre, $rut, $rol, $id_personal);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Empleado actualizado exitosamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al actualizar empleado: ' . $stmt->error]);
        }
        $stmt->close();
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error en el servidor: ' . $e->getMessage()]);
    }
    
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>