<?php
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_personal = $_POST['id_personal'];
    $pin = $_POST['pin'];

    $sql = "SELECT id_personal, pin, rol FROM empleados WHERE id_personal = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id_personal);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $empleado = $result->fetch_assoc();
        
        if (password_verify($pin, $empleado['pin'])) {
            session_start();
            $_SESSION['loggedin'] = true;
            $_SESSION['id_personal'] = $empleado['id_personal'];
            $_SESSION['rol'] = $empleado['rol'];

            // Lógica de redirección basada en el rol
            $rol = $empleado['rol'];
            
            if ($rol === 'Cajero' || $rol === 'Supervisor') {
                header("Location: ../PaginPrincipal.html");
                exit();
            } elseif ($rol === 'Supervisor' || $rol === 'Administrador' || $rol === 'Asistente de Gerencia') {
                header("Location: ../Administracion.html");
                exit();
            } else {
                // Redirección por defecto si el rol no coincide
                header("Location: ../iniciosesionpersonal.html");
                exit();
            }

        } else {
            echo "<script>alert('ID de empleado o PIN incorrecto.'); window.location.href='../iniciosesionpersonal.html';</script>";
        }
    } else {
        echo "<script>alert('ID de empleado o PIN incorrecto.'); window.location.href='../iniciosesionpersonal.html';</script>";
    }

    $stmt->close();
    $conn->close();
}
?>