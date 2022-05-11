-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2022 at 08:44 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `garage`
--

-- --------------------------------------------------------

--
-- Table structure for table `register_request`
--

CREATE TABLE `register_request` (
  `id` varchar(15) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `password` varchar(15) NOT NULL,
  `position` varchar(15) NOT NULL,
  `email` varchar(20) NOT NULL,
  `title` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `register_request`
--

INSERT INTO `register_request` (`id`, `first_name`, `last_name`, `phone_number`, `password`, `position`, `email`, `title`) VALUES
('1234', 'sgfwg', 'feewg', '', 'eee', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(20) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `type` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `password`, `type`) VALUES
('1', 'Leulseged', 'Wondimu', 'gedesluel1', 'admin'),
('2', 'Zelalem', 'Hailu', 'melalez2', 'admin'),
('3', 'Alex', 'Bitew', 'xela3', 'user'),
('33', '', '', '33', 'user'),
('atr', 'Sami', 'Nega', '123', 'user'),
('ATR/1329/11', 'Getnet', 'Demle', 'gech123', 'user'),
('test', 'Me', '', '', 'user'),
('wtqwt', 'gsagk', 'kadsh', '1234', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `register_request`
--
ALTER TABLE `register_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
