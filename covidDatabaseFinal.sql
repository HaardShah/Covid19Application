-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: covidtracingapp
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `covidtracingapp`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `covidtracingapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `covidtracingapp`;

--
-- Table structure for table `checkins`
--

DROP TABLE IF EXISTS `checkins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkins` (
  `checkinID` int NOT NULL AUTO_INCREMENT,
  `checkindate` date DEFAULT NULL,
  `checkintime` time DEFAULT NULL,
  `userID` int DEFAULT NULL,
  `venueID` int DEFAULT NULL,
  PRIMARY KEY (`checkinID`),
  KEY `userID` (`userID`),
  KEY `venueID` (`venueID`),
  CONSTRAINT `checkins_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `checkins_ibfk_2` FOREIGN KEY (`venueID`) REFERENCES `venue` (`venueID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkins`
--

LOCK TABLES `checkins` WRITE;
/*!40000 ALTER TABLE `checkins` DISABLE KEYS */;
INSERT INTO `checkins` VALUES (1,'2021-06-13','14:08:41',12,1002),(2,'2021-06-13','14:09:10',12,1005),(3,'2021-06-13','14:09:15',12,1004),(4,'2021-06-13','14:09:20',12,1007),(5,'2021-06-13','14:09:59',12,1008),(6,'2021-06-13','14:14:51',12,1009),(13,'2021-06-13','14:25:06',14,1000),(15,'2021-06-13','14:25:44',14,1001),(16,'2021-06-13','14:25:50',14,1005);
/*!40000 ALTER TABLE `checkins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotspots`
--

DROP TABLE IF EXISTS `hotspots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotspots` (
  `hotspotID` int NOT NULL AUTO_INCREMENT,
  `venueID` int DEFAULT NULL,
  `hoID` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  PRIMARY KEY (`hotspotID`),
  KEY `hoID` (`hoID`),
  KEY `venueID` (`venueID`),
  CONSTRAINT `hotspots_ibfk_1` FOREIGN KEY (`hoID`) REFERENCES `users` (`userID`),
  CONSTRAINT `hotspots_ibfk_2` FOREIGN KEY (`venueID`) REFERENCES `venue` (`venueID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotspots`
--

LOCK TABLES `hotspots` WRITE;
/*!40000 ALTER TABLE `hotspots` DISABLE KEYS */;
INSERT INTO `hotspots` VALUES (2,1005,3,'2021-06-13','00:24:00'),(4,1007,3,'2021-06-08','05:42:00'),(5,1004,3,'2021-06-08','01:59:00'),(6,1008,3,'2021-06-15','08:23:00');
/*!40000 ALTER TABLE `hotspots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `given_name` varchar(30) DEFAULT NULL,
  `surname` varchar(30) DEFAULT NULL,
  `street_number` varchar(15) DEFAULT NULL,
  `street_name` varchar(30) DEFAULT NULL,
  `surburb` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `postcode` varchar(15) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(260) DEFAULT NULL,
  `isUser` tinyint(1) DEFAULT NULL,
  `isVenueManager` tinyint(1) DEFAULT NULL,
  `isHealthOfficial` tinyint(1) DEFAULT NULL,
  `emailNotification` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Aqmal','Pulle','10','Pelagic road','Seaford meadows','SA','5169','0435753189','1999-12-15','aqmal.pulle@gmail.com','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1',0,0,0,1),(2,'haard','shah','130','Ladywood Road','Modbury ','SA','5092','0405673898','2002-10-02','haardashah5@gmail.com','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1',0,1,0,1),(3,'john','depp','64','mooringe ave','north plympton','SA','5037','0433337771','2000-12-19','john.smith@gmail.com','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1',0,1,1,1),(4,'smith','anthony','48','elston street','brooklyn park','SA','5032','0411773388','1999-03-15','smith.anthony@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,1,0,0),(5,'Peter','anthony','10','cudmore terrace','marleston','SA','5033','0485942019','1980-05-12','peter.anthony@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,0,0,1),(6,'wiseley','lee','36','ashford road','keswick','SA','5035','0444444450','1994-06-11','wiseley@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,1,0,1),(7,'person','noname','10','ashford road','keswick','SA','5035','0473728219','1996-06-11','person@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,1,0,1),(8,'johnson','speak','51','Gage Street','St Morris ','SA','5068','0437729392','2003-11-11','johnson.speak@hotmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,1,0,1),(9,'Lally','Singh','12','cudmore terrace','Marleston','VIC','5032','0456377279','1997-06-17','lallysingh21@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,1,0,1),(10,'vinay','kumar','10','pelagic street','seaford meadows','SA','5444','0463678910','1994-09-20','vinay@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,1,0,1),(11,'Jack','White','23','Grove Street','Kilburn','VIC','5089','0432123456','1990-10-11','jwhite@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,1,0,1),(12,'Chelsea','Baerwald','40','first street','Melbourne','SA','4000','0473747482','2001-06-07','chels@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,0,0,1),(13,'Jake','Wilder','34','Street Street','Suburb','SA','5000','0490890789','2000-12-10','plebboy@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,1,0,1),(14,'Shae','Haggis','9b','Britton Avenue','Tranmere','SA','5073','0468585053','1999-05-12','shae.haggis@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,0,0,1),(16,'Vinay','Kumar','10','second street','adelaide','SA','5033','0444444','2021-06-03','vinay@manager.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,1,0,0),(19,'Haard','Shah','130 ','Grange Road','Modbury Heights','SA','5092','0405123456','2002-10-02','haardashah5@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,0,0,1),(20,'Haard','Shah','130 ','Grange Road','Modbury Heights','SA','5092','0405123456','2002-10-02','haardashah5@gmail.com','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',0,0,0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venue`
--

DROP TABLE IF EXISTS `venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venue` (
  `venueID` int NOT NULL AUTO_INCREMENT,
  `venue_name` varchar(50) DEFAULT NULL,
  `venue_manager` int DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `street_number` varchar(15) DEFAULT NULL,
  `street_name` varchar(30) DEFAULT NULL,
  `suburb` varchar(30) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `postcode` varchar(15) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`venueID`),
  KEY `venue_manager` (`venue_manager`),
  CONSTRAINT `venue_ibfk_1` FOREIGN KEY (`venue_manager`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=1012 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venue`
--

LOCK TABLES `venue` WRITE;
/*!40000 ALTER TABLE `venue` DISABLE KEYS */;
INSERT INTO `venue` VALUES (1000,'Tomato',2,50,'12','Anzac HWY','Everard','SA','5035','0838193929'),(1001,'Fisher',3,12,'70','Fisher Pl','Mile end','SA','5031','0800000000'),(1002,'Ship CO',4,24,'190','gouger street','adelaide','SA','5000','0837472539'),(1003,'KFC',6,30,'251','Henley Beach Rd','Torrensville','SA','5031','0882341695'),(1004,'Hungry Jacks',7,42,'128 ','Marion Rd','West Richmond','SA','5033','0883523510'),(1005,'House LTD',8,54,'51','Gage St','St Morris','SA','5068','0847463627'),(1006,'Mangal Sweets',9,12,'10/257 ','North East Road','Hampstead Gardens','SA','5086','0420509442'),(1007,'greek on the lake',10,13,'149','Brebner Dr','West Lakes','SA','5031','0411777919'),(1008,'The Elephant British Pub',11,50,'1','Cinema Place','Adelaide','SA','5000','81119999'),(1009,'The Warradale',13,100,'234','Diagonal Road','Warradale','SA','5046','89127654'),(1011,'home club ',16,3,'22','kanbara street','flinders park','SA','5010','084343434');
/*!40000 ALTER TABLE `venue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-14  3:29:03
