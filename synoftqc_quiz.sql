-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 22, 2021 at 04:00 PM
-- Server version: 10.3.27-MariaDB-log-cll-lve
-- PHP Version: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `synoftqc_quiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `choice_3`
--

CREATE TABLE `choice_3` (
  `q_id` int(100) NOT NULL,
  `c3` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `choice_3`
--

INSERT INTO `choice_3` (`q_id`, `c3`) VALUES
(1, '-10'),
(2, '5');

-- --------------------------------------------------------

--
-- Table structure for table `choice_4`
--

CREATE TABLE `choice_4` (
  `q_id` int(100) NOT NULL,
  `c4` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `choice_4`
--

INSERT INTO `choice_4` (`q_id`, `c4`) VALUES
(1, '-25');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `q_id` int(100) NOT NULL,
  `q` varchar(200) NOT NULL,
  `c1` varchar(200) NOT NULL,
  `c2` varchar(200) NOT NULL,
  `answer` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`q_id`, `q`, `c1`, `c2`, `answer`) VALUES
(1, 'What will the console print?\n\nconst foo = function(a,b) {\n  a += b;\n  return a*(a-b);\n};\nconst num = foo(2,3);\nconsole.log(num);\n', '10', '25', 1),
(2, 'What will the console print?\n\nconst arr = [1,2,3,4,5];\nconst obj = { 1:arr.length };\nconsole.log(obj[1]);', 'undefined', 'Not defined', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `choice_3`
--
ALTER TABLE `choice_3`
  ADD PRIMARY KEY (`q_id`);

--
-- Indexes for table `choice_4`
--
ALTER TABLE `choice_4`
  ADD PRIMARY KEY (`q_id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`q_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `choice_3`
--
ALTER TABLE `choice_3`
  ADD CONSTRAINT `fk_q_for_c3` FOREIGN KEY (`q_id`) REFERENCES `question` (`q_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `choice_4`
--
ALTER TABLE `choice_4`
  ADD CONSTRAINT `fk_q_for_c4` FOREIGN KEY (`q_id`) REFERENCES `question` (`q_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
