--
-- Base de datos: `dulceria`
--
CREATE DATABASE IF NOT EXISTS `dulceria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dulceria`;

-- --------------------------------------------------------

--
-- Estructura de la tabla `empleados`
--
CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `id_personal` varchar(50) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `rut` varchar(15) NOT NULL,
  `pin` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `fecha_registro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--
CREATE TABLE `productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `proveedor` VARCHAR(255) NOT NULL,
  `id_producto` VARCHAR(50) NOT NULL,
  `fecha_vencimiento` DATE NOT NULL,
  `cantidad` INT(11) NOT NULL,
  `precio_unitario` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--
CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `id_empleado` VARCHAR(50) NOT NULL,
  `fecha_venta` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
  `total_venta` DECIMAL(10,2) NOT NULL,
  `detalle_venta` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Índices para tablas volcadas
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_personal` (`id_personal`),
  ADD UNIQUE KEY `rut` (`rut`);

ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE `productos`
  MODIFY `id` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
  
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Restricciones para tablas volcadas
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_personal`);
COMMIT;