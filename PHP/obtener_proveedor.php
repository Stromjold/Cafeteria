<?php
// Incluir el archivo de conexión a la base de datos
require 'conexion.php'; 

header('Content-Type: application/json');

// Verificar si se ha recibido el parámetro 'id'
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id_proveedor = $_GET['id'];

    // Preparar la consulta SQL para obtener los datos del proveedor
    $sql = "SELECT id_proveedor, nombre, rut, correo, telefono FROM proveedores WHERE id_proveedor = ?";
    $stmt = $conn->prepare($sql);

    // Enlazar el parámetro y ejecutar la consulta
    $stmt->bind_param("i", $id_proveedor);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $proveedor = $result->fetch_assoc();
        echo json_encode($proveedor);
    } else {
        echo json_encode(['success' => false, 'message' => 'Proveedor no encontrado.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'ID de proveedor no proporcionado.']);
}
$conn->close();
?>