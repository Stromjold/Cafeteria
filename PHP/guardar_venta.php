<?php
// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";      // Cambia por tu usuario de MySQL
$password = "Labaiep25";          // Cambia por tu contraseña de MySQL (vacío para XAMPP por defecto)
$dbname = "dulceria"; 
// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$proveedor = $_POST['selectedSupplier'];
$producto = $_POST['productName'];
$id_producto = $_POST['productId'];
$fecha_vencimiento = $_POST['expiryDate'];
$cantidad = $_POST['quantity'];
$precio_unitario = $_POST['unitPrice'];

// Preparar y ejecutar la consulta SQL para insertar los datos en la tabla 'productos'
$sql = "INSERT INTO productos (nombre, proveedor, id_producto, fecha_vencimiento, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssid", $producto, $proveedor, $id_producto, $fecha_vencimiento, $cantidad, $precio_unitario);

if ($stmt->execute()) {
    echo "Producto guardado correctamente";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>