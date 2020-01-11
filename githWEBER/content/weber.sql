-- phpMyAdmin SQL Dump
-- version 4.6.5.1
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Lun 09 Janvier 2017 à 16:52
-- Version du serveur :  5.5.53-0ubuntu0.14.04.1
-- Version de PHP :  5.6.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `weber`
--

-- --------------------------------------------------------

--
-- Structure de la table `authorization`
--

CREATE TABLE `authorization` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `authorization`
--

INSERT INTO `authorization` (`id`, `nom`) VALUES
(1, 'storecheck_app');

-- --------------------------------------------------------

--
-- Structure de la table `distributeur`
--

CREATE TABLE `distributeur` (
  `id` int(11) NOT NULL,
  `enseigne` varchar(255) DEFAULT NULL,
  `picto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `distributeur`
--

INSERT INTO `distributeur` (`id`, `enseigne`, `picto`) VALUES
(1, 'Castorama', 'castorama.png');

-- --------------------------------------------------------

--
-- Structure de la table `point-de-vente`
--

CREATE TABLE `point-de-vente` (
  `id` int(11) NOT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `cp` int(11) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `web` varchar(255) DEFAULT NULL,
  `id_distributeur` int(11) NOT NULL,
  `id_remote` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `point-de-vente`
--

INSERT INTO `point-de-vente` (`id`, `latitude`, `longitude`, `adresse`, `cp`, `ville`, `tel`, `contact`, `email`, `web`, `id_distributeur`, `id_remote`) VALUES
(1, 48.8728, 2.3831, '11, rue jouye rouve', 75020, 'Paris', '0164429272', 'Jonathan Pruvost', 'jonathan@graphikchannel.com', 'http://www.graphikchannel.com', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `point-de-vente_has_zone`
--

CREATE TABLE `point-de-vente_has_zone` (
  `id_point-de-vente` int(11) NOT NULL,
  `id_zone` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `point-de-vente_has_zone`
--

INSERT INTO `point-de-vente_has_zone` (`id_point-de-vente`, `id_zone`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `sc_application-config`
--

CREATE TABLE `sc_application-config` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `valeur` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `sc_image`
--

CREATE TABLE `sc_image` (
  `id` int(11) NOT NULL,
  `id_store-check` int(11) NOT NULL,
  `source` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `sc_store-check`
--

CREATE TABLE `sc_store-check` (
  `id` int(11) NOT NULL,
  `timestamp` varchar(255) DEFAULT NULL,
  `rapport` longtext,
  `sync` int(11) DEFAULT '0',
  `id_point-de-vente` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `statut`
--

CREATE TABLE `statut` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `statut`
--

INSERT INTO `statut` (`id`, `nom`) VALUES
(1, 'comemrciaux');

-- --------------------------------------------------------

--
-- Structure de la table `statut_has_authorization`
--

CREATE TABLE `statut_has_authorization` (
  `id_statut` int(11) NOT NULL,
  `id_authorization` int(11) NOT NULL,
  `read` int(1) DEFAULT NULL,
  `write` int(1) DEFAULT NULL,
  `execute` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `statut_has_authorization`
--

INSERT INTO `statut_has_authorization` (`id_statut`, `id_authorization`, `read`, `write`, `execute`) VALUES
(1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `id_statut` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `id_statut`, `nom`, `prenom`, `email`, `login`, `password`) VALUES
(1, 1, 'Pruvost', 'Jonathan', 'jonathan@graphikchannel.com', 'jonathan', 'auditt');

-- --------------------------------------------------------

--
-- Structure de la table `zone`
--

CREATE TABLE `zone` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `zone`
--

INSERT INTO `zone` (`id`, `nom`) VALUES
(1, 'Paris');

-- --------------------------------------------------------

--
-- Structure de la table `zone_has_user`
--

CREATE TABLE `zone_has_user` (
  `id_zone` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `zone_has_user`
--

INSERT INTO `zone_has_user` (`id_zone`, `id_user`) VALUES
(1, 1);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `authorization`
--
ALTER TABLE `authorization`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `distributeur`
--
ALTER TABLE `distributeur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `point-de-vente`
--
ALTER TABLE `point-de-vente`
  ADD PRIMARY KEY (`id`,`id_distributeur`,`id_remote`);

--
-- Index pour la table `point-de-vente_has_zone`
--
ALTER TABLE `point-de-vente_has_zone`
  ADD PRIMARY KEY (`id_point-de-vente`,`id_zone`);

--
-- Index pour la table `sc_application-config`
--
ALTER TABLE `sc_application-config`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sc_image`
--
ALTER TABLE `sc_image`
  ADD PRIMARY KEY (`id`,`id_store-check`);

--
-- Index pour la table `sc_store-check`
--
ALTER TABLE `sc_store-check`
  ADD PRIMARY KEY (`id`,`id_point-de-vente`,`id_user`);

--
-- Index pour la table `statut`
--
ALTER TABLE `statut`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `statut_has_authorization`
--
ALTER TABLE `statut_has_authorization`
  ADD PRIMARY KEY (`id_statut`,`id_authorization`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`,`id_statut`);

--
-- Index pour la table `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `zone_has_user`
--
ALTER TABLE `zone_has_user`
  ADD PRIMARY KEY (`id_zone`,`id_user`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `authorization`
--
ALTER TABLE `authorization`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `distributeur`
--
ALTER TABLE `distributeur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `point-de-vente`
--
ALTER TABLE `point-de-vente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `sc_application-config`
--
ALTER TABLE `sc_application-config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `sc_image`
--
ALTER TABLE `sc_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `sc_store-check`
--
ALTER TABLE `sc_store-check`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `statut`
--
ALTER TABLE `statut`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `zone`
--
ALTER TABLE `zone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
