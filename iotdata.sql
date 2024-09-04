-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2022 at 12:46 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iotdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `dashtable`
--

CREATE TABLE `dashtable` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `customer` varchar(255) NOT NULL,
  `savejson` varchar(10000) DEFAULT NULL,
  `idpobj` varchar(5000) DEFAULT NULL,
  `status` enum('enable','disable') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dashtable`
--

INSERT INTO `dashtable` (`id`, `title`, `description`, `customer`, `savejson`, `idpobj`, `status`) VALUES
(11, 'Temperature Sensors', 'For temperature measure', '', '[]', '{\"data\":[]}', 'enable'),
(12, 'Raspberry PI GPIO', '', '', '[]', '{\"data\":[]}', 'enable'),
(13, 'Linkit One GPS Tracking', 'For tracking location', '', '[\n {\n  \"x\": 0,\n  \"y\": 0,\n  \"w\": 7,\n  \"h\": 5,\n  \"content\": \"<div><sapn style=\\\"font-size:25px\\\">Guage</sapn><button onclick=\\\"grid.removeWidget(this.parentNode.parentNode.parentNode)\\\" type=\\\"button\\\" class=\\\"btn btn-outline-dark\\\" style=\\\"display:flex;float:right\\\">X</button></div><div style=\\\"width: 100%; height: 100%; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\\\" id=\\\"gg2\\\" _echarts_instance_=\\\"ec_1651469475118\\\"><div style=\\\"position: relative; width: 609px; height: 429px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;\\\"><canvas data-zr-dom-id=\\\"zr_0\\\" width=\\\"761\\\" height=\\\"536\\\" style=\\\"position: absolute; left: 0px; top: 0px; width: 609px; height: 429px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;\\\"></canvas></div></div>\"\n }\n]', '{\"data\":[{\"id\":\"gg2\",\"deviceid\":\"57f8d470-b729-11ec-9a68-6b50da95566e\",\"selectpara\":\"temp\"}]}', 'enable'),
(14, 'ESP8266 DHT22', 'Temp and Humidity', '', '[\n {\n  \"x\": 0,\n  \"y\": 0,\n  \"w\": 4,\n  \"h\": 4,\n  \"content\": \"<div><sapn style=\\\"font-size:25px\\\">Guage</sapn><button onclick=\\\"grid.removeWidget(this.parentNode.parentNode.parentNode)\\\" type=\\\"button\\\" class=\\\"btn btn-outline-dark\\\" style=\\\"display:flex;float:right\\\">X</button></div><div style=\\\"width: 100%; height: 100%; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\\\" id=\\\"gg2\\\" _echarts_instance_=\\\"ec_1650870770346\\\"><div style=\\\"position: relative; width: 315px; height: 331px; padding: 0px; margin: 0px; border-width: 0px;\\\"><canvas data-zr-dom-id=\\\"zr_0\\\" width=\\\"393\\\" height=\\\"413\\\" style=\\\"position: absolute; left: 0px; top: 0px; width: 315px; height: 331px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;\\\"></canvas></div></div>\"\n },\n {\n  \"x\": 5,\n  \"y\": 0,\n  \"w\": 6,\n  \"h\": 4,\n  \"content\": \"<div><sapn style=\\\"font-size:25px\\\">Chart</sapn><button onclick=\\\"grid.removeWidget(this.parentNode.parentNode.parentNode)\\\" type=\\\"button\\\" class=\\\"btn btn-outline-dark\\\" style=\\\"display:flex; float:right\\\">X</button></div><div style=\\\"width: 100%; height: 100%; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); position: relative;\\\" id=\\\"ch2\\\" _echarts_instance_=\\\"ec_1650870770345\\\"><div style=\\\"position: relative; width: 491px; height: 331px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;\\\"><canvas data-zr-dom-id=\\\"zr_0\\\" width=\\\"613\\\" height=\\\"413\\\" style=\\\"position: absolute; left: 0px; top: 0px; width: 491px; height: 331px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;\\\"></canvas></div><div class=\\\"\\\" style=\\\"position: absolute; display: block; border-style: solid; white-space: nowrap; z-index: 9999999; box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; transition: opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgb(255, 255, 255); border-width: 1px; border-radius: 4px; color: rgb(102, 102, 102); font: 14px / 21px &quot;Microsoft YaHei&quot;; padding: 10px; top: 0px; left: 0px; transform: translate3d(318px, 80px, 0px); border-color: rgb(255, 255, 255); pointer-events: none; visibility: hidden; opacity: 0;\\\"><div style=\\\"margin: 0px 0 0;line-height:1;\\\"><div style=\\\"margin: 0px 0 0;line-height:1;\\\"><div style=\\\"font-size:14px;color:#666;font-weight:400;line-height:1;\\\">Fri</div><div style=\\\"margin: 10px 0 0;line-height:1;\\\"><div style=\\\"margin: 0px 0 0;line-height:1;\\\"><div style=\\\"margin: 0px 0 0;line-height:1;\\\"><span style=\\\"display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#4992ff;\\\"></span><span style=\\\"float:right;margin-left:10px;font-size:14px;color:#666;font-weight:900\\\">0</span><div style=\\\"clear:both\\\"></div></div><div style=\\\"clear:both\\\"></div></div><div style=\\\"clear:both\\\"></div></div><div style=\\\"clear:both\\\"></div></div><div style=\\\"clear:both\\\"></div></div></div></div>\"\n }\n]', '{\"data\":[{\"id\":\"ch2\",\"deviceid\":\"57f8d470-b729-11ec-9a68-6b50da95566e\",\"selectpara\":\"temp\"},{\"id\":\"gg2\",\"deviceid\":\"57f8d470-b729-11ec-9a68-6b50da95566e\",\"selectpara\":\"speed\"}]}', 'enable'),
(15, 'Ardunio DHT22', 'Power Management', '', '[]', '{\"data\":[{\"id\":\"ch4\",\"deviceid\":\"68a9cbe0-bfca-11ec-942a-51543ec1dbaf\",\"selectpara\":\"XYZ\"}]}', 'enable'),
(16, 'random', 'this is description', '', NULL, NULL, 'disable');

-- --------------------------------------------------------

--
-- Table structure for table `logintable`
--

CREATE TABLE `logintable` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(8) NOT NULL,
  `status` enum('enable','disable') NOT NULL DEFAULT 'enable'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logintable`
--

INSERT INTO `logintable` (`id`, `username`, `password`, `status`) VALUES
(1, 'admin', 'admin', 'enable'),
(3, 'harsh', '1234', 'enable'),
(5, 'heet', '4567', 'enable'),
(6, 'deep', '789', 'enable');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dashtable`
--
ALTER TABLE `dashtable`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `logintable`
--
ALTER TABLE `logintable`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dashtable`
--
ALTER TABLE `dashtable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `logintable`
--
ALTER TABLE `logintable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
