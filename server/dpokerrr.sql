-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 09, 2023 at 10:22 AM
-- Server version: 8.0.32
-- PHP Version: 7.4.3-4ubuntu2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dpokerrr`
--

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int NOT NULL,
  `roomname` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `cardsHaveChosen` json DEFAULT NULL,
  `pot` int DEFAULT NULL,
  `users` json DEFAULT NULL,
  `isStart` tinyint(1) DEFAULT NULL,
  `coins` int DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(100) NOT NULL,
  `userTurn` int NOT NULL,
  `cardShowOnTable` json NOT NULL,
  `coinsForTurn` int NOT NULL,
  `isShowResult` tinyint(1) NOT NULL,
  `winner` json NOT NULL,
  `countTurn` decimal(10,0) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `roomname`, `password`, `cardsHaveChosen`, `pot`, `users`, `isStart`, `coins`, `createAt`, `createdBy`, `userTurn`, `cardShowOnTable`, `coinsForTurn`, `isShowResult`, `winner`, `countTurn`) VALUES
(128, 'r4', '', '[\"9S\", \"AD\", \"4S\", \"9D\", \"2D\", \"5D\", \"6H\", \"7C\", \"10H\", \"3C\"]', 171, '[{\"id\": 3, \"name\": \"dat\", \"cards\": [\"JS\", \"AC\"], \"coins\": 57, \"isWin\": false, \"avatar\": \"anime1.jpg\", \"isFold\": false, \"isTurn\": true, \"isAllin\": false, \"allCoins\": -57, \"isActive\": true, \"isWatching\": false}, {\"id\": 20, \"name\": \"xxxx\", \"cards\": [\"8D\", \"6D\"], \"coins\": 0, \"isWin\": false, \"avatar\": \"anime3.jpg\", \"isFold\": true, \"isTurn\": true, \"isAllin\": false, \"allCoins\": 0, \"isActive\": false, \"isWatching\": false}, {\"id\": 21, \"name\": \"dat3\", \"cards\": [\"3S\", \"4D\"], \"coins\": 57, \"isWin\": false, \"avatar\": \"anime10.jpg\", \"isFold\": false, \"isTurn\": true, \"isAllin\": false, \"allCoins\": -243, \"isActive\": true, \"isWatching\": false}, {\"id\": 19, \"name\": \"dat1\", \"cards\": [\"2S\", \"4H\"], \"coins\": 57, \"isWin\": false, \"avatar\": \"anime6.jpg\", \"isFold\": true, \"isTurn\": true, \"isAllin\": false, \"allCoins\": 129, \"isActive\": false, \"isWatching\": false}]', 1, 100, '2023-03-04 12:02:29', '3', 0, '[]', 57, 0, '[]', 3),
(129, 'r', '', '[\"4D\", \"5C\", \"7C\", \"8C\", \"10D\", \"7H\", \"8H\", \"JC\", \"7S\", \"KC\"]', 0, '[{\"id\": 3, \"name\": \"dat\", \"cards\": [\"JS\", \"AS\"], \"coins\": 0, \"isWin\": false, \"avatar\": \"anime1.jpg\", \"isFold\": true, \"isTurn\": true, \"isAllin\": false, \"allCoins\": 0, \"isActive\": true, \"isWatching\": false}, {\"id\": 20, \"name\": \"xxxx\", \"cards\": [\"6D\", \"2S\"], \"coins\": 0, \"isWin\": false, \"avatar\": \"anime3.jpg\", \"isFold\": true, \"isTurn\": false, \"isAllin\": false, \"allCoins\": 291, \"isActive\": false, \"isWatching\": false}, {\"id\": 21, \"name\": \"dat3\", \"cards\": [\"3D\", \"4C\"], \"coins\": 0, \"isWin\": false, \"avatar\": \"anime10.jpg\", \"isFold\": true, \"isTurn\": true, \"isAllin\": false, \"allCoins\": -282, \"isActive\": true, \"isWatching\": false}, {\"id\": 19, \"name\": \"dat1\", \"cards\": [\"5H\", \"2H\"], \"coins\": 0, \"isWin\": true, \"avatar\": \"anime6.jpg\", \"isFold\": true, \"isTurn\": true, \"isAllin\": false, \"allCoins\": -9, \"isActive\": false, \"isWatching\": false}]', 1, 100, '2023-03-04 12:12:34', '3', 3, '[]', 0, 0, '[]', 3),
(130, 'r1', '', '[\"7C\", \"7H\", \"AH\", \"5C\", \"9C\", \"3H\", \"JS\"]', 234, '[{\"id\": 3, \"name\": \"dat\", \"cards\": [\"QS\", \"JC\"], \"coins\": 80, \"isWin\": true, \"avatar\": \"anime1.jpg\", \"isFold\": true, \"isTurn\": true, \"isAllin\": false, \"allCoins\": -1, \"isActive\": false, \"isWatching\": false}, {\"id\": 20, \"name\": \"xxxx\", \"cards\": [\"9S\", \"KD\"], \"coins\": 0, \"isWin\": false, \"avatar\": \"anime3.jpg\", \"isFold\": false, \"isTurn\": false, \"isAllin\": false, \"allCoins\": -53, \"isActive\": false, \"isWatching\": false}, {\"id\": 21, \"name\": \"dat3\", \"cards\": [\"8C\", \"4D\"], \"coins\": 0, \"isWin\": false, \"avatar\": \"anime10.jpg\", \"isFold\": false, \"isTurn\": false, \"isAllin\": false, \"allCoins\": 231, \"isActive\": false, \"isWatching\": false}, {\"id\": 19, \"name\": \"dat1\", \"cards\": [\"9H\", \"6D\"], \"coins\": 0, \"isWin\": false, \"avatar\": \"anime6.jpg\", \"isFold\": true, \"isTurn\": true, \"isAllin\": false, \"allCoins\": -77, \"isActive\": false, \"isWatching\": false}]', 0, 100, '2023-03-04 12:21:51', '3', 0, '[\"4S\", \"10S\", \"JD\"]', 80, 1, '{\"cards\": \"QS,JC\"}', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rooms` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `createAt`, `avatar`, `rooms`) VALUES
(3, 'dat', '1', '2023-02-25 12:55:11', 'anime1.jpg', '[]'),
(19, 'dat1', '1', '2023-02-25 18:07:39', 'anime6.jpg', '[]'),
(20, 'xxxx', '1', '2023-02-26 11:34:21', 'anime3.jpg', '[]'),
(21, 'dat3', '1', '2023-03-02 17:44:51', 'anime10.jpg', '[]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
