<?php
include 'conexion.php';

header('Content-Type: application/json');

if (isset($_GET['name'])) {
    $supplierName = $conn->real_escape_string($_GET['name']);
    
    $sql = "SELECT nombre, rut, correo, telefono FROM proveedores WHERE nombre = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $supplierName);
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
    echo json_encode(['success' => false, 'message' => 'Nombre de proveedor no especificado.']);
}

$conn->close();
?>