<?php
header('Content-Type: application/json');

// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dulceria";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Consulta para seleccionar todos los productos de la tabla 'productos'
$sql = "SELECT nombre, proveedor, fecha_vencimiento, cantidad, precio_unitario, id_producto FROM productos";
$result = $conn->query($sql);

$productos = [];

if ($result->num_rows > 0) {
    // Recorrer los resultados y agregarlos al array de productos
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
}

// Devolver el array en formato JSON
echo json_encode($productos);

$conn->close();
?>