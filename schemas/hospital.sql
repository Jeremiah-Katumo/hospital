-- Adminer 4.8.1 MySQL 10.4.32-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `doctor_id` int(10) DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `appointment_date` varchar(255) NOT NULL,
  `appointment_time` varchar(255) NOT NULL,
  `patient_email` varchar(255) NOT NULL,
  `patient_phone` varchar(20) NOT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `department_id` (`department_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `complain`;
CREATE TABLE `complain` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `message` varchar(500) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(20) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `user_type` enum('doctor','employee','patient') DEFAULT 'patient',
  `doctor_id` int(10) DEFAULT NULL,
  `employee_id` int(10) DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `update_by` int(11) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `employee_id` (`employee_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `complain_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`),
  CONSTRAINT `complain_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `complain_ibfk_3` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `departments` (`id`, `name`, `description`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`) VALUES
(11,	'Intensive Care Unit (ICU)',	'What is an intensive care unit (ICU)? Intensive care refers to the specialised treatment given to patients who are acutely unwell and require critical medical care. An intensive care unit (ICU) provides the critical care and life support for acutely ill a',	NULL,	NULL,	'2024-12-06 20:29:45',	NULL,	NULL,	NULL),
(16,	'Neurology',	'Neurology is a branch of medicine dealing with disorders of the nervous system. Neurology deals with the diagnosis and treatment of all categories of conditions and disease involving the central and peripheral nervous systems, including their coverings',	NULL,	NULL,	'2024-12-06 20:29:45',	NULL,	NULL,	NULL),
(17,	'Opthalmology',	'dfvgbhjnkml',	NULL,	NULL,	'2024-12-06 20:29:45',	NULL,	NULL,	NULL),
(18,	'Orthopedics',	'dfyuyuo',	NULL,	NULL,	'2024-12-06 20:29:45',	NULL,	NULL,	NULL),
(19,	'Cancer Department',	'asyckuauhcioa',	NULL,	NULL,	'2024-12-06 20:29:45',	NULL,	NULL,	NULL),
(20,	'ENT department',	'savcjaub',	NULL,	NULL,	'2024-12-06 20:29:45',	NULL,	NULL,	NULL);

DROP TABLE IF EXISTS `diagnosis`;
CREATE TABLE `diagnosis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `doctor`;
CREATE TABLE `doctor` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `image` text NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `biography` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `join_date` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `salary` varchar(10) NOT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `leaves`;
CREATE TABLE `leaves` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `employee_id` int(10) NOT NULL,
  `leave_type` varchar(255) NOT NULL,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `reason` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `leaves_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `user_id` int(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `medication`;
CREATE TABLE `medication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `doctor_id` int(10) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `medication_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
  CONSTRAINT `medication_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `patient`;
CREATE TABLE `patient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` int(20) NOT NULL,
  `last_name` int(20) NOT NULL,
  `doctor_id` int(10) DEFAULT NULL,
  `patient_number` varchar(10) DEFAULT NULL,
  `diagnosis` enum('malaria','fever','covid_19') DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(11) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `p_date` varchar(255) NOT NULL,
  `expire` varchar(255) NOT NULL,
  `expire_end` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `temp`;
CREATE TABLE `temp` (
  `id` int(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone` int(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  `email_status` enum('verified','not_verified') DEFAULT 'not_verified',
  `created_at` date DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `verify`;
CREATE TABLE `verify` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `user_id` int(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `updated_by` int(10) DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `deleted_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `verify_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- 2024-12-07 17:42:54