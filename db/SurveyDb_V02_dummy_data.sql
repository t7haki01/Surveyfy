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
INSERT INTO `account` VALUES (1,'test1','$2b$10$qEfIAO1xdCKls/ZfTKWR9../Lc9ls9vMJ4/x8ZVxpOUp7DFfJVRti',0,'2018-11-26 10:44:49','0000-00-00 00:00:00','2018-11-26 10:44:49'),(2,'test2','$2b$10$RMFOTkT0AL5hxk8Scbtvje78FsvZ7/EeIQHOoWT2hSoXmr/AAyNHC',0,'2018-11-26 10:44:49','0000-00-00 00:00:00','2018-11-26 10:44:49'),(3,'test3','$2b$10$tuPyaIYSJCl5p7ewCqwZTOH6w.cEz.mW72OMoK3JAxmDeidhe538W',0,'2018-11-26 10:58:41','0000-00-00 00:00:00','2018-11-26 10:58:41'),(4,'test4','$2b$10$/KZLJro5F.DS8r/psTxMd.FtxxmXvM.2gHTyIL6u75x8.bHL4Auai',0,'2018-11-26 10:58:41','0000-00-00 00:00:00','2018-11-26 10:58:41'),(5,'test5','$2b$10$v2xQZGeBFKCvztzkfCuwXO6lqjbbCAJRo.cRJZOn49hCnsx8TP2PG',0,'2018-11-26 10:58:41','0000-00-00 00:00:00','2018-11-26 10:58:41'),(6,'test6','$2b$10$P3MUuCKI49pJr2G7xzoyZ.6fyoeoTUBEXwesqcv4GLp2m/mRypu9a',0,'2019-11-26 11:01:31','0000-00-00 00:00:00','2019-11-26 11:01:31'),(7,'test7','$2b$10$RRi7KcGRPNh7DMT1OPQ3wuZsQnECf3otiaQCqZzzcTo.Lpy0wYZWS',0,'2019-11-26 11:01:31','0000-00-00 00:00:00','2019-11-26 11:01:31'),(8,'test8','$2b$10$hY/E7zY4urUia4z.u0sme.HrhynftCLGvpl559B8NcInjqN0bdSfK',0,'2019-11-26 11:03:57','0000-00-00 00:00:00','2019-11-26 11:03:57'),(9,'test9','$2b$10$M71SZjNd4t9UqeMBsuY.pu9ISfxrQJwUjtmcidybL1bTc.IoJQ/Z.',0,'2018-11-26 11:06:45','2019-11-26 11:06:45','2018-11-26 11:06:45'),(13,'admin','$2b$10$JuwOfJB2nREFS7A40k4VNuAGLZg0zNbEGK5bxIXAB5PKvhlQLJUGC',0,'2018-11-26 11:10:54','2019-11-26 11:10:54','2018-11-26 11:10:54');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `answer_options`
--

LOCK TABLES `answer_options` WRITE;
/*!40000 ALTER TABLE `answer_options` DISABLE KEYS */;
INSERT INTO `answer_options` VALUES (1,'0',1),(2,'1',1),(3,'2',1),(4,'7',1),(5,'99',1),(6,'Red',2),(7,'Blue',2),(8,'Green',2),(9,'Black',2),(10,'White',2),(11,'Benz',3),(12,'Ford',3),(13,'Audi',3),(14,'Kia',3),(15,'Toyota',3),(16,'Pizza',4),(17,'Hamburger',4),(18,'Kebab',4),(19,'Makaroonilaatikko',4),(20,'Lihapulla',4),(21,'Winter',5),(22,'Summer',5),(23,'Spring',5),(24,'Autumn',5),(25,'Soccer',6),(26,'Basketball',6),(27,'Ice Hockey',6),(28,'Star Craft',7),(29,'Football Manager',7),(30,'Fifa',7),(31,'Elder Scroll Skyrim',7),(32,'Diablo',7),(33,'Counter Strike',7),(34,'League Of Legends',7),(35,'Dota',7),(36,'OverWatch',7),(37,'Yes',11),(38,'No',11),(39,'Finnish',13),(40,'Your own mother tongue',13),(41,'C++',13),(42,'Ruby',13),(43,'Chinese',13),(44,'Symfony',19),(45,'Express Js',19),(46,'React JS',19),(47,'Bootstrap',19),(48,'Male',21),(49,'Female',21),(50,'Yes',22),(51,'No',22),(52,'Yes',24),(53,'No',24),(54,'Yes',25),(55,'No',25);
/*!40000 ALTER TABLE `answer_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (2,'1',4,1),(3,'7',5,1),(4,'7',6,1),(5,'7',7,1),(6,'7',8,1),(7,'7',9,1),(8,'White',4,2),(9,'Blue',5,2),(10,'Black',6,2),(11,'Red',7,2),(12,'Black',8,2),(13,'Black',9,2),(14,'Audi',4,3),(15,'Benz',5,3),(16,'Ford',6,3),(17,'Toyota',7,3),(18,'Toyota',8,3),(19,'Audi',9,3),(20,'Pizza',4,4),(21,'Pizza',5,4),(22,'Makaroonilaatikko',6,4),(23,'Lihapulla',7,4),(24,'Kebab',8,4),(25,'Pizza',9,4),(26,'Winter',4,5),(27,'Winter',5,5),(28,'Autumn',6,5),(29,'Summer',7,5),(30,'Summer',8,5),(31,'Summer',9,5),(32,'Ice Hockey',4,6),(33,'Soccer',5,6),(34,'Basketball',6,6),(35,'Soccer',7,6),(36,'Basketball',8,6),(37,'Soccer',9,6),(38,'Football Manager',4,7),(39,'Fifa',5,7),(40,'Star Craft',6,7),(41,'Fifa',7,7),(42,'Fifa',8,7),(43,'Elder Scroll Skyrim',9,7),(44,'Go home',4,8),(45,'I want to go home',5,8),(46,'Sleep',6,8),(47,'I want to sleep',7,8),(48,'Home',8,8),(49,'Sleep',9,8),(50,'Stay home',4,9),(51,'I want to stay home',5,9),(52,'Sleep',6,9),(53,'I want to sleep',7,9),(54,'Home',8,9),(55,'Sleep',9,9),(56,'Stay home',4,10),(57,'I want to stay home',5,10),(58,'Sleep',6,10),(59,'I want to sleep',7,10),(60,'Home',8,10),(61,'Sleep',9,10),(62,'Yes',4,11),(63,'Yes',5,11),(64,'Yes',6,11),(65,'Yes',7,11),(66,'Yes',8,11),(67,'Yes',9,11),(68,'Some feedback',4,12),(69,'Okay',5,12),(70,'feedback',6,12),(71,' ',7,12),(72,'some',8,12),(73,'Feedback',9,12),(74,'Finnish',4,13),(75,'C++',5,13),(76,'Ruby',6,13),(77,'Finnish',7,13),(78,'Chinese',8,13),(79,'Finnish',9,13),(80,'Chirstmas',4,14),(81,'chistmas',5,14),(82,'sunday',6,14),(83,'Sunday',7,14),(84,'chirstmas',8,14),(85,'chirstmas',9,14),(86,'Chirstmas',4,15),(87,'today',5,15),(88,'sunday',6,15),(89,'yesterday',7,15),(90,'chirstmas',8,15),(91,'chirstmas',9,15),(92,'Sausage',4,16),(93,'Cake',5,16),(94,'Pizza',6,16),(95,'Chicken',7,16),(96,'Beef',8,16),(97,' ',9,16),(98,'Go home',4,17),(99,'I want to go home',5,17),(100,'Sleep',6,17),(101,'I want to sleep',7,17),(102,'Home',8,17),(103,'Sleep',9,17),(104,'Mother tongue',4,18),(105,'Javascript',5,18),(106,'Php',6,18),(107,'Java',7,18),(108,'Suomi',8,18),(109,'Korean',9,18),(110,'Symfony',4,19),(111,'Express Js',5,19),(112,'React Js',6,19),(113,'Symfony',7,19),(114,'Bootstrap',8,19),(115,'Bootstrap',9,19),(116,'Java',4,20),(117,'C++',5,20),(118,'C#',6,20),(119,'Javascript',7,20),(120,'Php',8,20),(121,'Python',9,20),(122,'Male',4,21),(123,'Male',5,21),(124,'Male',6,21),(125,'Male',7,21),(126,'Male',8,21),(127,'Female',9,21),(128,'No',4,22),(129,'No',5,22),(130,'No',6,22),(131,'No',7,22),(132,'No',8,22),(133,'Yes',9,22),(134,'Home',4,23),(135,'Africa',5,23),(136,'America',6,23),(137,'North Pole',7,23),(138,'Space',8,23),(139,'Mars',9,23),(140,'Yes',4,24),(141,'Yes',5,24),(142,'Yes',6,24),(143,'No',7,24),(144,'No',8,24),(145,'Yes',9,24),(146,'Yes',4,25),(147,'Yes',5,25),(148,'Yes',6,25),(149,'Yes',7,25),(150,'Yes',8,25),(151,'Yes',9,25);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'What is your favorite number among those?',1),(2,'What is your favorite color among those?',1),(3,'What is your favorite Car among those?',1),(4,'What is your favorite food among those?',1),(5,'What is your favorite season among those?',1),(6,'What is your favorite sports among those?',1),(7,'What is your favorite game among those?',1),(8,'What do you want to do now?',2),(9,'What do you want to do tomorrow?',2),(10,'What do you want to do in future?',2),(11,'Is this survey working well?',2),(12,'Please leave some feedback',2),(13,'Which language is the most difficult among those options as you think?',2),(14,'Which holiday is the best?',2),(15,'Which day is the best?',2),(16,'What is your favorite food?',2),(17,'What do you want to do now?',3),(18,'What language is most comfortable to use for you?',3),(19,'How do you think which framework is the best as you think among options?',3),(20,'What is the best programming languages?',3),(21,'Are you male or female?',3),(22,'Are you minor?',3),(23,'Where do you want to travel?',3),(24,'Have you ever been foreign country?',3),(25,'Is this survey fine?',3);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `survey`
--

LOCK TABLES `survey` WRITE;
/*!40000 ALTER TABLE `survey` DISABLE KEYS */;
INSERT INTO `survey` VALUES (1,'Survey Company1 Test',1),(2,'Survey Company2 Test',2),(3,'Survey Company3 Test',3);
/*!40000 ALTER TABLE `survey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'first','test',1,'test1@test.com','2018-12-31','111-1111','testkau 1','11111',NULL,NULL,'company'),(2,'second','company',2,'test2@test.com','2018-12-31','222-2222','testkau 2','22222',NULL,NULL,'company'),(3,'third','company',3,'test3@test.com','2018-12-31','333-3333','testkau 3','33333',NULL,'2018-11-26 10:58:41','company'),(4,'first','client',4,'test4@test.com','2018-12-31','444-4444','testkuja 4','44444',NULL,'2018-11-26 10:58:41','client'),(5,'second','client',5,'test5@test.com','2018-01-01','555-5555','testtie 5','55555',NULL,'2018-11-26 10:58:41','client'),(6,'third','client',6,'test6@test.com','2018-12-31','666-6666','test avenue 6','66666',NULL,'2018-11-26 11:01:30','client'),(7,'fourth','client',7,'test7@test.com','2018-12-31','777-7777','test street 7','77777',NULL,'2018-11-26 11:01:30','client'),(8,'fifth','client',8,'test8@test.com','2018-01-01','888-8888','testtie 8','88888',NULL,'2018-11-26 11:03:57','client'),(9,'sixth','client',9,'test9@test.com','2018-01-01','999-9999','testkuja 9','999-9999',NULL,'2018-11-26 11:06:45','client'),(13,'super','user',13,'admin@admin.com','2018-12-31','12345','admin avenue','00000',NULL,'2018-11-26 11:10:54','admin');
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

-- Dump completed on 2018-11-26 14:02:40
