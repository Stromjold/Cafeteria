<?php
include("bd_php.php"); // Asegúrate de que el archivo de conexión se llame correctamente
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $proveedor = $_POST['proveedor'];
    $producto = $_POST['producto'];
    $id_producto = $_POST['id_producto'];
    $fecha_venc = $_POST['fecha_venc'];
    $cantidad = $_POST['cantidad'];
    $p_unitario = $_POST['p_unitario'];
    $subtotal = $cantidad * $p_unitario; // Calcular subtotal
    // Preparar la consulta SQL
    $sql = "INSERT INTO productos (proveedor, producto, id_producto, fecha_venc, cantidad, p_unitario, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssdd", $proveedor, $producto, $id_producto, $fecha_venc, $cantidad, $p_unitario, $subtotal);
    // Ejecutar la consulta y devolver el resultado
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Producto guardado correctamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al guardar el producto: " . $stmt->error]);
    }
    // Cerrar la declaración y la conexión
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>
