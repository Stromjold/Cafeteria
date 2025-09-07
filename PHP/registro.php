<?php
// Incluir el archivo de conexión a la base de datos
require_once 'conexion.php';

// Iniciar la sesión
session_start();

// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Obtener los datos del formulario de manera segura
    $id_personal = $conn->real_escape_string($_POST['id_personal']);
    $pin = $_POST['pin'];

    // Preparar una consulta SQL para prevenir inyecciones SQL
    // CORRECCIÓN: Se cambia el nombre de la tabla a 'empleados'
    $sql = "SELECT id_personal, pin, rol FROM empleados WHERE id_personal = ?";
    
    if ($stmt = $conn->prepare($sql)) {
        // Enlazar los parámetros a la consulta
        $stmt->bind_param("s", $id_personal);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Obtener el resultado
            $result = $stmt->get_result();

            if ($result->num_rows == 1) {
                $user = $result->fetch_assoc();
                $hashed_pin = $user['pin'];
                $rol = $user['rol'];

                // Verificar el PIN usando password_verify() para una comparación segura
                if (password_verify($pin, $hashed_pin)) {
                    // PIN correcto, iniciar la sesión y redirigir
                    $_SESSION['loggedin'] = true;
                    $_SESSION['id_personal'] = $user['id_personal'];
                    $_SESSION['rol'] = $rol;

                    // Lógica de redirección basada en el rol
                    $targetPage = '';
                    switch ($rol) {
                        case 'Administrador':
                        case 'Supervisor':
                        case 'Asistente de Gerencia':
                            $targetPage = '../Administracion.html';
                            break;
                        case 'Cajero':
                        case 'Cocinero':
                        case 'Limpieza':
                            $targetPage = '../PaginPrincipal.html';
                            break;
                        default:
                            $targetPage = '../PaginPrincipal.html';
                            break;
                    }
                    
                    header("Location: " . $targetPage);
                    exit();
                } else {
                    // PIN incorrecto, redirigir con un error
                    header("Location: ../iniciosesionpersonal.html?error=incorrect_pin");
                    exit();
                }
            } else {
                // ID de empleado no encontrado, redirigir con un error
                header("Location: ../iniciosesionpersonal.html?error=user_not_found");
                exit();
            }
        } else {
            // Error en la ejecución de la consulta
            header("Location: ../iniciosesionpersonal.html?error=query_failed");
            exit();
        }
        $stmt->close();
    } else {
        // Error al preparar la consulta
        header("Location: ../iniciosesionpersonal.html?error=prepare_failed");
        exit();
    }
}
$conn->close();
?>