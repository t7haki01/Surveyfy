CREATE DATABASE  IF NOT EXISTS `survey` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `survey`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: survey
-- ------------------------------------------------------
-- Server version	5.6.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'test1','pass1',0,'2018-11-12 22:00:00','2019-11-12 22:00:00','2018-11-12 22:00:00'),(2,'test2','pass2',0,'2018-11-12 22:00:00','2019-11-12 22:00:00','2018-11-12 22:00:00'),(3,'test3','pass3',0,'2018-11-12 22:00:00','2019-11-12 22:00:00','2018-11-12 22:00:00'),(5,'postman','test',1,'2018-11-12 22:00:00','2018-11-12 22:00:00','2018-11-12 22:00:00');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `answer_options`
--

LOCK TABLES `answer_options` WRITE;
/*!40000 ALTER TABLE `answer_options` DISABLE KEYS */;
INSERT INTO `answer_options` VALUES (1,'1',1),(2,'2',1),(3,'3',1),(4,'4',1),(5,'5',1),(7,'Tuesday',2),(8,'Wednesday',2),(9,'Thursday',2),(10,'Friday',2),(11,'Red',3),(12,'Blue',3),(13,'Yellow',3),(14,'Black',3),(15,'White',3),(16,'Coke Cola',4),(17,'Pepsi',4),(18,'Fanta',4),(19,'Redbull',4),(20,'Water',4),(21,'Sausage',5),(22,'Sushi',5),(23,'Kebab',5),(24,'Pizza',5),(25,'Hamburger',5),(26,'Laiva',6),(27,'Car',6),(28,'Watch',6),(29,'Sauna',6),(30,'Kitchen',6),(31,'Sunday',2);
/*!40000 ALTER TABLE `answer_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'What is your favorite number among those?',1),(2,'Which day is the best?',1),(3,'What is your favorite color?',1),(4,'What would you like to drink?',2),(5,'What would you eat?',2),(6,'What would you buy?',2),(7,'What do you want to do?',1);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `survey`
--

LOCK TABLES `survey` WRITE;
/*!40000 ALTER TABLE `survey` DISABLE KEYS */;
INSERT INTO `survey` VALUES (1,'Survey Test1'),(2,'Survey Test2'),(3,'It used to be Test from postman');
/*!40000 ALTER TABLE `survey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test','from postman',1,'testemail@postman.com','2018-10-10','111-1111-11111','testkuja1','11111',11,'2018-11-11 22:00:00'),(2,'second','tester',2,'test2@test.com','0000-00-00','007-007-007','testkatu2','67894',10,'2018-11-12 22:00:00'),(3,'third','tester',3,'test3@test.com','2018-11-13','333-333-3333','testkatu3','33333',33,'2018-11-12 22:00:00'),(4,'post','man',5,'postman@test.com','2018-11-11','999-999-9999','postmanKatu1','00000',999,'0000-00-00 00:00:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-13 11:07:30
