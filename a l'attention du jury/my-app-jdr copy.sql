-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 11 déc. 2024 à 23:30
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `my-app-jdr`
--

-- --------------------------------------------------------

--
-- Structure de la table `bible`
--

DROP TABLE IF EXISTS `bible`;
CREATE TABLE IF NOT EXISTS `bible` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_emplacement` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sheet_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sheet_id` (`sheet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `bible`
--

INSERT INTO `bible` (`id`, `img_emplacement`, `sheet_id`) VALUES
(75, '/30/test.png', 99),
(76, '/30/tes.png', 100),
(78, '/1/voila.png', 102),
(79, '/1/test encore.png', 103),
(80, '/1/azeaze.png', 104),
(81, '/32/azeazeazqsd.png', 105);

-- --------------------------------------------------------

--
-- Structure de la table `dropzone`
--

DROP TABLE IF EXISTS `dropzone`;
CREATE TABLE IF NOT EXISTS `dropzone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `backgroundColor` varchar(7) NOT NULL,
  `items` json NOT NULL,
  `sheet_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dropzone_ibfk_1` (`sheet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `dropzone`
--

INSERT INTO `dropzone` (`id`, `backgroundColor`, `items`, `sheet_id`) VALUES
(73, '#be1919', '[{\"x\": 39.83567782895555, \"y\": 8.49523349825027, \"id\": 1729519125497, \"size\": \"16px\", \"text\": \"\", \"type\": \"rectangle\", \"color\": \"#000000\", \"width\": 100, \"height\": 100, \"zIndex\": 1, \"borderColor\": \"#000000\", \"borderStyle\": \"solid\", \"borderWidth\": \"1px\", \"borderRadius\": \"0\", \"backgroundColor\": \"rgba(211, 211, 211, 1)\"}]', 99),
(74, '#b6b6b6', '[{\"x\": 57.56255446284079, \"y\": 15.18844776959897, \"id\": 1729523795906, \"size\": \"16px\", \"text\": \"\", \"type\": \"rectangle\", \"color\": \"#000000\", \"width\": 100, \"height\": 100, \"zIndex\": 1, \"borderColor\": \"#000000\", \"borderStyle\": \"solid\", \"borderWidth\": \"1px\", \"borderRadius\": \"0\", \"backgroundColor\": \"rgba(211, 211, 211, 1)\"}]', 100),
(76, '#b6b6b6', '[{\"x\": 66.28911274829183, \"y\": 7.551318665111352, \"id\": 1733423889843, \"size\": \"16px\", \"text\": \"\", \"type\": \"triangle-up\", \"alpha\": 0, \"color\": \"#000000\", \"width\": 0, \"height\": 0, \"zIndex\": 1, \"baseSize\": 100, \"fontSize\": 16, \"baseColor\": \"#a31919\", \"borderColor\": \"rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 1) rgba(0, 0, 0, 0)\", \"borderStyle\": \"solid\", \"borderWidth\": \"0px 100px 100px 100px\", \"borderRadius\": \"0\", \"backgroundColor\": \"rgba(0, 0, 0, 0)\"}, {\"x\": 62.76082126330209, \"y\": 21.53842028344261, \"id\": 1733423892046, \"size\": \"16px\", \"text\": \"\", \"type\": \"triangle-down\", \"color\": \"#000000\", \"width\": 0, \"height\": 0, \"zIndex\": 1, \"baseSize\": 100, \"baseColor\": \"#000000\", \"baseHeight\": 100, \"borderColor\": \"rgba(0, 0, 0, 1) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)\", \"borderStyle\": \"solid\", \"borderWidth\": \"100px 100px 0px 100px\", \"borderRadius\": \"0\", \"backgroundColor\": \"rgba(0, 0, 0, 0)\"}, {\"x\": 52.28286473212048, \"y\": 9.610769210141722, \"id\": 1733423896675, \"size\": \"16px\", \"text\": \"\", \"type\": \"circle\", \"color\": \"#000000\", \"width\": 100, \"height\": 100, \"zIndex\": 1, \"baseSize\": 100, \"baseColor\": \"#000000\", \"baseHeight\": 100, \"borderColor\": \"#000000\", \"borderStyle\": \"solid\", \"borderWidth\": \"1px\", \"borderRadius\": \"50%\", \"backgroundColor\": \"rgba(211, 211, 211, 1)\"}, {\"x\": 34.32065353580916, \"y\": 10.640494482656903, \"id\": 1733423906436, \"size\": \"16px\", \"text\": \"\", \"type\": \"triangle-up\", \"alpha\": 0, \"color\": \"#000000\", \"width\": 0, \"height\": 0, \"zIndex\": 1, \"baseSize\": \"1000\", \"fontSize\": 16, \"baseColor\": \"#ffa8a8\", \"baseHeight\": \"100\", \"borderColor\": \"rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 1) rgba(0, 0, 0, 0)\", \"borderStyle\": \"solid\", \"borderWidth\": \"0px 100px 100px 100px\", \"borderRadius\": \"0\", \"backgroundColor\": \"rgba(0, 0, 0, 0)\"}]', 102),
(77, '#f5efed', '[{\"x\": 15.780998389694044, \"y\": 13.815480739578726, \"id\": 1733876914184, \"size\": \"16px\", \"text\": \"\", \"type\": \"rectangle\", \"color\": \"#000000\", \"width\": 100, \"height\": 100, \"zIndex\": 1, \"baseSize\": 100, \"baseColor\": \"#000000\", \"baseHeight\": 100, \"borderColor\": \"#000000\", \"borderStyle\": \"solid\", \"borderWidth\": \"1px\", \"borderRadius\": \"0\", \"backgroundColor\": \"rgba(211, 211, 211, 1)\"}]', 103),
(78, '#d3d3d3', '[{\"x\": 40.90177133655394, \"y\": 8.838475255755334, \"id\": 1733876969636, \"size\": \"16px\", \"text\": \"\", \"type\": \"rectangle\", \"color\": \"#000000\", \"width\": 100, \"height\": 100, \"zIndex\": 1, \"baseSize\": 100, \"baseColor\": \"#000000\", \"baseHeight\": 100, \"borderColor\": \"#000000\", \"borderStyle\": \"solid\", \"borderWidth\": \"1px\", \"borderRadius\": \"0\", \"backgroundColor\": \"rgba(211, 211, 211, 1)\"}]', 104),
(79, '#d3d3d3', '[{\"x\": 22.65163714439077, \"y\": 4.63376372631833, \"id\": 1733879780475, \"size\": \"16px\", \"text\": \"\", \"type\": \"rectangle\", \"color\": \"#000000\", \"width\": 100, \"height\": 100, \"zIndex\": 1, \"baseSize\": 100, \"baseColor\": \"#000000\", \"baseHeight\": 100, \"borderColor\": \"#000000\", \"borderStyle\": \"solid\", \"borderWidth\": \"1px\", \"borderRadius\": \"0\", \"backgroundColor\": \"rgba(211, 211, 211, 1)\"}, {\"x\": 17.60601180891036, \"y\": 7.637129104487618, \"id\": 1733879783315, \"size\": \"16px\", \"text\": \"\", \"type\": \"circle\", \"color\": \"#000000\", \"width\": 100, \"height\": 100, \"zIndex\": 1, \"baseSize\": 100, \"baseColor\": \"#000000\", \"baseHeight\": 100, \"borderColor\": \"#000000\", \"borderStyle\": \"solid\", \"borderWidth\": \"1px\", \"borderRadius\": \"50%\", \"backgroundColor\": \"rgba(211, 211, 211, 1)\"}]', 105);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'member');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('S4yRlKNlTD4cikcELtCkXM12Xh2HgJAF', 1734046173, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-12-12T20:39:00.251Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"username\":\"admin\",\"role_id\":1}}');

-- --------------------------------------------------------

--
-- Structure de la table `sheet`
--

DROP TABLE IF EXISTS `sheet`;
CREATE TABLE IF NOT EXISTS `sheet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `statut` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 = fiche cachée\r\n1= fiche visible',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sheet_ibfk_1` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sheet`
--

INSERT INTO `sheet` (`id`, `title`, `description`, `created_at`, `updated_at`, `statut`, `user_id`) VALUES
(99, 'test', 'test', '2024-10-21 15:58:55', '2024-10-23 16:21:44', 1, NULL),
(100, 'tes', 'aze', '2024-10-21 17:16:44', '2024-10-21 17:17:20', 1, NULL),
(102, 'voila', 'c\'est un test', '2024-12-05 19:39:04', '2024-12-12 00:22:01', 1, 1),
(103, 'test encore', 'azze', '2024-12-11 01:29:00', NULL, 1, 1),
(104, 'azeaze', 'azeaze', '2024-12-11 01:29:37', NULL, 1, 1),
(105, 'azeazeazqsd', 'azeaz', '2024-12-11 02:16:33', NULL, 1, 32);

-- --------------------------------------------------------

--
-- Structure de la table `sheet_tag`
--

DROP TABLE IF EXISTS `sheet_tag`;
CREATE TABLE IF NOT EXISTS `sheet_tag` (
  `sheet_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`sheet_id`,`tag_id`),
  KEY `sheet_tag_ibfk_2` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sheet_tag`
--

INSERT INTO `sheet_tag` (`sheet_id`, `tag_id`) VALUES
(99, 1),
(100, 1),
(103, 1),
(105, 1),
(102, 3),
(104, 3);

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
(1, 'DND'),
(3, 'Shadowrun'),
(5, 'Warhammer'),
(13, 'roll20'),
(14, 'Cthulu'),
(15, 'Starfinder'),
(16, 'Pathfinder'),
(17, 'Alien'),
(18, 'Aria'),
(19, 'Bitume'),
(20, 'Fallout'),
(21, 'Custom');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `statut` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0=compte inactif\r\n1=compte activé',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_connection` datetime DEFAULT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `statut`, `created_at`, `last_connection`, `role_id`) VALUES
(1, 'admin', '$2b$10$lP8Su6kCem2HDXK8UU368OL.fzehGcEJ0h7wAnvJHqAf0Pyxj1RsS', 'test@test.free', 1, '0000-00-00 00:00:00', '2024-12-11 21:39:00', 1),
(32, 'user', '$2b$10$fNSfpixYq2DKbxC1i5DpHuhxx/Rfe90XmoCdxN257IKJypyeREj5G', 'user@user.com', 1, '2024-12-11 00:25:23', '2024-12-11 02:16:10', 2);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bible`
--
ALTER TABLE `bible`
  ADD CONSTRAINT `bible_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheet` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Contraintes pour la table `dropzone`
--
ALTER TABLE `dropzone`
  ADD CONSTRAINT `dropzone_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheet` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Contraintes pour la table `sheet`
--
ALTER TABLE `sheet`
  ADD CONSTRAINT `sheet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

--
-- Contraintes pour la table `sheet_tag`
--
ALTER TABLE `sheet_tag`
  ADD CONSTRAINT `sheet_tag_ibfk_1` FOREIGN KEY (`sheet_id`) REFERENCES `sheet` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `sheet_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
