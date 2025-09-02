-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-08-2025 a las 01:05:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dulceria`
--
CREATE DATABASE IF NOT EXISTS `dulceria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dulceria`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--
-- Creación: 28-08-2025 a las 22:49:00
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `id_personal` varchar(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `rut` varchar(12) NOT NULL,
  `pin` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `id_personal`, `nombre`, `rut`, `pin`, `rol`, `fecha_registro`, `activo`) VALUES
(1, 'ASG-322', 'rgrgergg', '24.039.438-3', '$2y$10$raEFGImpa34j.1B3SP6J8OM44vs6nIbXXgWZ1ilRaXCXMg.1O6uqG', 'Asistente de Gerencia', '2025-08-28 22:53:22', 1),
(2, 'ADM-871', 'Rojelio Cerda', '14.265.487-2', '$2y$10$DjcrkhgcomcbeLc67NK.i.6U5fLVR1l0jk1.awJCkasn84T99aPmO', 'Administrador', '2025-08-28 22:59:11', 1),
(3, 'CAJ-299', 'mark', '89.593.487-7', '$2y$10$4JPVsXtncRGT6E5XAc7VYOHNAq2YG5NiKxr8uzsC3oI8zbv8/6dJe', 'Cajero', '2025-08-28 23:01:44', 1),
(4, 'COC-782', 'Cafe Africano', '21.793.214-9', '$2y$10$Rp.iWiIGenZJPsI9/L.fle/PB7U16JVY59OFNwvXfrWowAQ8Z1.Qu', 'Cocinero', '2025-08-28 23:03:29', 1),
(5, 'SUP-058', 'dsae@\"\"', '34.343.343-9', '$2y$10$LBGnlYvyWhwsjI/qjI6AOep4gQkE61buAN5YrfqhSRoM2PCkG3SSS', 'Supervisor', '2025-08-28 23:11:16', 1),
(6, 'ASG-179', 'sam', '45.876.234-6', '$2y$10$4dVH8wnDP8.6nNQHheoyE.AT6xYc3gPILCAnr/2qFBVNx2SAsPs2G', 'Asistente de Gerencia', '2025-08-28 23:23:12', 1),
(7, 'ASG-590', 'suro', '16.887.941-5', '$2y$10$FokPcflm8J/1XFkOlhY9tOwTY.piRa1U5/2nJdv.xfGMu8uHqA3W.', 'Asistente de Gerencia', '2025-08-28 23:43:04', 1),
(8, 'SUP-320', 'uytr', '12.870.631-3', '$2y$10$bRtlAXFOKqbUmAmS3h5U0OXq69qxwXSdG93ZE879kl/mUjwssSo7u', 'Supervisor', '2025-08-28 23:44:37', 1),
(9, 'ADM-788', 'MARK', '67.678.234-6', '$2y$10$HvNMV5K8Fa/RzsHY8KXKp.gtIH8Ubzsd6vCgo2NOfyYEOWaNqBMiO', 'Administrador', '2025-08-29 01:41:54', 1),
(10, 'ADM-707', 'Juan Antonio', '7.538.629-k', '$2y$10$hcMb5m6bn4uOSkQfJp98R.yD3xhsETfN6PA7D5b214.yOQB58EyD.', 'Administrador', '2025-08-29 01:47:35', 1);

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
  `precio_unitario` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_personal` (`id_personal`),
  ADD UNIQUE KEY `rut` (`rut`),
  ADD UNIQUE KEY `id_personal_2` (`id_personal`),
  ADD UNIQUE KEY `rut_2` (`rut`);

--
-- AUTO_INCREMENT de las tablas volcadas
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;