<?php
require_once '../PHP/empleados/database.php';

class Empleado {
    private $db;
    private $table = 'empleados';

    public function __construct() {
        $this->db = new Database();
    }

    // Generar ID automático para empleado
    private function generateId($tipo) {
        $prefijos = [
            'asistente' => 'ASG',
            'administrador' => 'ADM',
            'supervisor' => 'SUP',
            'cajero' => 'CAJ',
            'cocinero' => 'COC',
            'limpieza' => 'LIM'
        ];

        $prefijo = $prefijos[$tipo];
        
        // Obtener el último número
        $this->db->query("SELECT id_empleado FROM {$this->table} WHERE tipo_empleado = :tipo ORDER BY id DESC LIMIT 1");
        $this->db->bind(':tipo', $tipo);
        $ultimo = $this->db->single();
        
        if ($ultimo) {
            $numero = intval(substr($ultimo['id_empleado'], -3)) + 1;
        } else {
            $numero = 1;
        }
        
        return $prefijo . '-' . str_pad($numero, 3, '0', STR_PAD_LEFT);
    }

    // Crear nuevo empleado
    public function crear($nombre, $rut, $certificado, $experiencia, $tipo) {
        // Validar que el RUT no exista
        if ($this->rutExiste($rut)) {
            return ['success' => false, 'message' => 'El RUT ya existe en el sistema'];
        }

        // Generar ID automático
        $id_empleado = $this->generateId($tipo);
        
        $query = "INSERT INTO {$this->table} (id_empleado, nombre, rut, certificado, experiencia, tipo_empleado) 
                  VALUES (:id_empleado, :nombre, :rut, :certificado, :experiencia, :tipo)";
        
        $this->db->query($query);
        $this->db->bind(':id_empleado', $id_empleado);
        $this->db->bind(':nombre', $nombre);
        $this->db->bind(':rut', $rut);
        $this->db->bind(':certificado', $certificado);
        $this->db->bind(':experiencia', $experiencia);
        $this->db->bind(':tipo', $tipo);
        
        if ($this->db->execute()) {
            return [
                'success' => true, 
                'message' => 'Empleado creado exitosamente',
                'id_empleado' => $id_empleado,
                'id' => $this->db->lastInsertId()
            ];
        } else {
            return ['success' => false, 'message' => 'Error al crear el empleado'];
        }
    }

    // Verificar si RUT existe
    private function rutExiste($rut) {
        $this->db->query("SELECT id FROM {$this->table} WHERE rut = :rut");
        $this->db->bind(':rut', $rut);
        return $this->db->single() ? true : false;
    }

    // Obtener empleados por tipo
    public function obtenerPorTipo($tipo) {
        $this->db->query("SELECT * FROM {$this->table} WHERE tipo_empleado = :tipo AND activo = 1 ORDER BY nombre");
        $this->db->bind(':tipo', $tipo);
        return $this->db->resultSet();
    }

    // Obtener todos los empleados
    public function obtenerTodos() {
        $this->db->query("SELECT * FROM {$this->table} WHERE activo = 1 ORDER BY tipo_empleado, nombre");
        return $this->db->resultSet();
    }

    // Actualizar empleado
    public function actualizar($id, $nombre, $rut, $certificado, $experiencia) {
        $query = "UPDATE {$this->table} SET nombre = :nombre, rut = :rut, certificado = :certificado, experiencia = :experiencia WHERE id = :id";
        
        $this->db->query($query);
        $this->db->bind(':id', $id);
        $this->db->bind(':nombre', $nombre);
        $this->db->bind(':rut', $rut);
        $this->db->bind(':certificado', $certificado);
        $this->db->bind(':experiencia', $experiencia);
        
        if ($this->db->execute()) {
            return ['success' => true, 'message' => 'Empleado actualizado exitosamente'];
        } else {
            return ['success' => false, 'message' => 'Error al actualizar el empleado'];
        }
    }

    // Eliminar empleado (soft delete)
    public function eliminar($id) {
        $this->db->query("UPDATE {$this->table} SET activo = 0 WHERE id = :id");
        $this->db->bind(':id', $id);
        
        if ($this->db->execute()) {
            return ['success' => true, 'message' => 'Empleado eliminado exitosamente'];
        } else {
            return ['success' => false, 'message' => 'Error al eliminar el empleado'];
        }
    }

    // Validar RUT chileno
    public function validarRut($rut) {
        $rut = preg_replace('/[^k0-9]/i', '', $rut);
        $dv = substr($rut, -1);
        $numero = substr($rut, 0, strlen($rut) - 1);
        
        $i = 2;
        $suma = 0;
        foreach (array_reverse(str_split($numero)) as $v) {
            if ($i == 8) $i = 2;
            $suma += $v * $i;
            ++$i;
        }
        
        $dvr = 11 - ($suma % 11);
        if ($dvr == 11) $dvr = 0;
        if ($dvr == 10) $dvr = 'K';
        
        return $dvr == strtoupper($dv);
    }
}


require_once 'Empleado.php';

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get data from the POST request
    $nombre = $_POST['nombre'] ?? '';
    $rut = $_POST['rut'] ?? '';
    $certificado = $_POST['certificado'] ?? '';
    $experiencia = $_POST['experiencia'] ?? '';
    $tipo = $_POST['tipo'] ?? ''; // This is the new parameter from personal.js

    // Instantiate the Empleado class
    $empleado = new Empleado();

    // Call the crear method
    $result = $empleado->crear($nombre, $rut, $certificado, $experiencia, $tipo);
    
    // Return the JSON response from the crear method
    header('Content-Type: application/json');
    echo json_encode($result);
} else {
    // If it's not a POST request, return an error
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}
?>
?>