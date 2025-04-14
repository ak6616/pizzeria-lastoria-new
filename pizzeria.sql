-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: pizzeria
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

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
-- Table structure for table `aktualnosci`
--

DROP TABLE IF EXISTS `aktualnosci`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aktualnosci` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tytul` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `data` date DEFAULT NULL,
  `tekst` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aktualnosci`
--

LOCK TABLES `aktualnosci` WRITE;
/*!40000 ALTER TABLE `aktualnosci` DISABLE KEYS */;
INSERT INTO `aktualnosci` VALUES (1,'Powstała nowa strona internetowa','2024-12-01','Od dzisiaj drodzy Państwo możecie zamawiać naszą pizzę na stronie, jednakże dowóz dotyczy tylko pizzerii Lastoria w Miejscu Piastowym'),(2,'Aktualizacja oferty Miejsce Piastowe','2022-04-19','Prezentujemy Państwu nowe pozycje w lokalu w Miejscu Piastowym. Chodzi o nowe pizze dostępne dotychczas tylko w Haczowie. Serdecznie zapraszamy do zapoznania się z ofertą.');
/*!40000 ALTER TABLE `aktualnosci` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dodatki_hacz`
--

DROP TABLE IF EXISTS `dodatki_hacz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dodatki_hacz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cena` int DEFAULT NULL,
  `skladniki` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dodatki_hacz`
--

LOCK TABLES `dodatki_hacz` WRITE;
/*!40000 ALTER TABLE `dodatki_hacz` DISABLE KEYS */;
INSERT INTO `dodatki_hacz` VALUES (1,'Gyros',5,NULL),(2,'Szynka Parmeńska',5,NULL),(3,'Owoce Morza',5,NULL),(4,'Borowiki',5,NULL),(5,'Kurczak',5,NULL),(6,'Ser Żółty',5,NULL),(7,'Pomidory Suszone',4,NULL),(9,'Boczek',4,NULL),(10,'Salami',4,NULL),(11,'Szynka',4,NULL),(12,'Tuńczyk',4,NULL),(13,'Dodatki Warzywne',2,NULL),(14,'Ser Feta',3,NULL),(15,'Sos Czosnkowy',2,NULL),(16,'Ser Pleśniowy',3,NULL),(17,'Ser Wędzony',3,NULL),(18,'Parmezan',3,NULL),(19,'Ketchup',2,NULL);
/*!40000 ALTER TABLE `dodatki_hacz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dodatki_mp`
--

DROP TABLE IF EXISTS `dodatki_mp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dodatki_mp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cena` int DEFAULT NULL,
  `skladniki` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dodatki_mp`
--

LOCK TABLES `dodatki_mp` WRITE;
/*!40000 ALTER TABLE `dodatki_mp` DISABLE KEYS */;
INSERT INTO `dodatki_mp` VALUES (1,'Gyros',5,NULL),(2,'Szynka Parmeńska',5,NULL),(3,'Owoce Morza',5,NULL),(4,'Borowiki',5,NULL),(5,'Kurczak',5,NULL),(6,'Ser Żółty',5,NULL),(7,'Pomidory Suszone',5,NULL),(9,'Boczek',4,NULL),(10,'Salami',4,NULL),(11,'Szynka',4,NULL),(12,'Tuńczyk',4,NULL),(13,'Dodatki Warzywne',3,NULL),(14,'Ser Feta',3,NULL),(15,'Sos Grecki',2,NULL);
/*!40000 ALTER TABLE `dodatki_mp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dostawaweekday_hacz`
--

DROP TABLE IF EXISTS `dostawaweekday_hacz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dostawaweekday_hacz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ilosc` int NOT NULL,
  `koszt` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dostawaweekday_hacz`
--

LOCK TABLES `dostawaweekday_hacz` WRITE;
/*!40000 ALTER TABLE `dostawaweekday_hacz` DISABLE KEYS */;
INSERT INTO `dostawaweekday_hacz` VALUES (1,'targowiska',NULL,1,2),(2,'łężany',NULL,1,2),(3,'pustyny',NULL,1,2),(4,'iwonicz',NULL,1,2),(5,'wrocanka',NULL,1,2),(6,'rogi',NULL,1,2),(7,'głowienka',NULL,1,4),(8,'głowienka',NULL,2,2),(9,'niżna łąka',NULL,1,4),(10,'niżna łąka',NULL,2,2),(11,'widacz',NULL,1,4),(12,'widacz',NULL,2,2),(13,'lubatówka',NULL,1,4),(14,'lubatówka',NULL,2,2),(15,'równe',NULL,1,4),(16,'równe',NULL,2,2),(17,'głowienka','świętego jana',1,2),(18,'krosno','dębowa',2,4),(19,'krosno','dębowa',3,3),(20,'krosno','handlowa',2,4),(21,'krosno','handlowa',3,3),(22,'krosno','polna',2,4),(23,'krosno','polna',3,3),(24,'krosno','bolesława prusa',2,4),(25,'krosno','bolesława prusa',3,3),(26,'krosno','żniwna',2,4),(27,'krosno','żniwna',3,3),(28,'krosno','władysława stanisława reymonta',2,4),(29,'krosno','władysława stanisława reymonta',3,3),(30,'krosno','nad badoniem',2,4),(31,'krosno','nad badoniem',3,3),(32,'krosno','grunwaldzka',2,4),(33,'krosno','grunwaldzka',3,3),(34,'krosno','stanisława pigonia',2,4),(35,'krosno','stanisława pigonia',3,3),(36,'łęki dukielskie',NULL,2,4),(37,'łęki dukielskie',NULL,3,3),(38,'wietrzno',NULL,2,4),(39,'wietrzno',NULL,3,3),(40,'lubatowa',NULL,2,4),(41,'lubatowa',NULL,3,3),(42,'krościenko wyżne',NULL,1,4),(43,'krościenko wyżne',NULL,2,3),(44,'krościenko wyżne',NULL,3,2),(45,'krosno','suchodolska',1,4),(46,'krosno','suchodolska',2,3),(47,'krosno','suchodolska',3,2),(56,'równe','kopalniana',1,2),(57,'miejsce piastowe',NULL,1,0),(58,'malinówka','edit',2,3);
/*!40000 ALTER TABLE `dostawaweekday_hacz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dostawaweekday_mp`
--

DROP TABLE IF EXISTS `dostawaweekday_mp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dostawaweekday_mp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ilosc` int NOT NULL,
  `koszt` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dostawaweekday_mp`
--

LOCK TABLES `dostawaweekday_mp` WRITE;
/*!40000 ALTER TABLE `dostawaweekday_mp` DISABLE KEYS */;
INSERT INTO `dostawaweekday_mp` VALUES (1,'Targowiska',NULL,1,2),(2,'Łężany',NULL,1,2),(3,'Pustyny',NULL,1,2),(4,'Iwonicz',NULL,1,2),(5,'Wrocanka',NULL,1,2),(6,'Rogi',NULL,1,2),(7,'Głowienka',NULL,1,4),(8,'Głowienka',NULL,2,2),(9,'Niżna Łąka',NULL,1,4),(10,'Niżna Łąka',NULL,2,2),(11,'Widacz',NULL,1,4),(12,'Widacz',NULL,2,2),(13,'Lubatówka',NULL,1,4),(14,'Lubatówka',NULL,2,2),(15,'Równe',NULL,1,4),(16,'Równe',NULL,2,2),(17,'Głowienka','Świętego Jana',1,2),(36,'Łęki Dukielskie',NULL,2,4),(37,'Łęki Dukielskie',NULL,3,3),(38,'Wietrzno',NULL,2,4),(39,'Wietrzno',NULL,3,3),(40,'Lubatowa',NULL,2,4),(41,'Lubatowa',NULL,3,3),(42,'Krościenko Wyżne',NULL,1,4),(43,'Krościenko Wyżne',NULL,2,3),(44,'Krościenko Wyżne',NULL,3,2),(56,'Równe','Kopalniana',1,2),(57,'Miejsce Piastowe',NULL,0,1);
/*!40000 ALTER TABLE `dostawaweekday_mp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dostawaweekend_hacz`
--

DROP TABLE IF EXISTS `dostawaweekend_hacz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dostawaweekend_hacz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ilosc` int NOT NULL,
  `koszt` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dostawaweekend_hacz`
--

LOCK TABLES `dostawaweekend_hacz` WRITE;
/*!40000 ALTER TABLE `dostawaweekend_hacz` DISABLE KEYS */;
INSERT INTO `dostawaweekend_hacz` VALUES (1,'targowiska',NULL,1,2),(2,'łężany',NULL,1,2),(3,'pustyny',NULL,1,2),(4,'iwonicz',NULL,1,2),(5,'wrocanka',NULL,1,2),(6,'rogi',NULL,1,2),(7,'łęki dukielskie',NULL,2,5),(8,'łęki dukielskie',NULL,3,4),(9,'wietrzno',NULL,2,5),(10,'wietrzno',NULL,3,4),(11,'lubatowa',NULL,2,5),(12,'lubatowa',NULL,3,4),(13,'głowienka','świętego jana',1,2),(14,'krosno','dębowa',2,5),(15,'krosno','dębowa',3,4),(16,'krosno','handlowa',2,5),(17,'krosno','handlowa',3,4),(18,'krosno','polna',2,5),(19,'krosno','polna',3,4),(20,'krosno','bolesława prusa',2,5),(21,'krosno','bolesława prusa',3,4),(22,'krosno','żniwna',2,5),(23,'krosno','żniwna',3,4),(24,'krosno','władysława stanisława reymonta',2,5),(25,'krosno','władysława stanisława reymonta',3,4),(26,'krosno','nad badoniem',2,5),(27,'krosno','nad badoniem',3,4),(28,'krosno','grunwaldzka',2,5),(29,'krosno','grunwaldzka',3,4),(30,'krosno','stanisława pigonia',2,5),(31,'krosno','stanisława pigonia',3,4),(32,'krosno','suchodolska',1,5),(33,'krosno','suchodolska',2,4),(34,'krosno','suchodolska',3,3),(35,'krościenko wyżne',NULL,1,5),(36,'krościenko wyżne',NULL,2,4),(37,'krościenko wyżne',NULL,3,3),(38,'głowienka',NULL,1,5),(39,'głowienka',NULL,2,3),(40,'niżna łąka',NULL,1,5),(41,'niżna łąka',NULL,2,3),(42,'widacz',NULL,1,5),(43,'widacz',NULL,2,3),(44,'lubatówka',NULL,1,5),(45,'lubatówka',NULL,2,3),(46,'równe',NULL,1,5),(47,'równe',NULL,3,3),(48,'równe','kopalniana',1,2),(49,'miejsce piastowe',NULL,1,0),(50,'malinówka','edit',3,3);
/*!40000 ALTER TABLE `dostawaweekend_hacz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dostawaweekend_mp`
--

DROP TABLE IF EXISTS `dostawaweekend_mp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dostawaweekend_mp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ilosc` int NOT NULL,
  `koszt` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dostawaweekend_mp`
--

LOCK TABLES `dostawaweekend_mp` WRITE;
/*!40000 ALTER TABLE `dostawaweekend_mp` DISABLE KEYS */;
INSERT INTO `dostawaweekend_mp` VALUES (1,'targowiska',NULL,1,2),(2,'łężany',NULL,1,2),(3,'pustyny',NULL,1,2),(4,'iwonicz',NULL,1,2),(5,'wrocanka',NULL,1,2),(6,'rogi',NULL,1,2),(7,'łęki dukielskie',NULL,2,5),(8,'łęki dukielskie',NULL,3,4),(9,'wietrzno',NULL,2,5),(10,'wietrzno',NULL,3,4),(11,'lubatowa',NULL,2,5),(12,'lubatowa',NULL,3,4),(13,'głowienka','świętego jana',1,2),(35,'krościenko wyżne',NULL,1,5),(36,'krościenko wyżne',NULL,2,4),(37,'krościenko wyżne',NULL,3,3),(38,'głowienka',NULL,1,5),(39,'głowienka',NULL,2,3),(40,'niżna łąka',NULL,1,5),(41,'niżna łąka',NULL,2,3),(42,'widacz',NULL,1,5),(43,'widacz',NULL,2,3),(44,'lubatówka',NULL,1,5),(45,'lubatówka',NULL,2,3),(46,'równe',NULL,1,5),(47,'równe',NULL,3,3),(48,'równe','kopalniana',1,2),(49,'miejsce piastowe',NULL,0,1),(53,'Równe',NULL,2,4);
/*!40000 ALTER TABLE `dostawaweekend_mp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fastfood_hacz`
--

DROP TABLE IF EXISTS `fastfood_hacz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fastfood_hacz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cena` int DEFAULT NULL,
  `skladniki` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fastfood_hacz`
--

LOCK TABLES `fastfood_hacz` WRITE;
/*!40000 ALTER TABLE `fastfood_hacz` DISABLE KEYS */;
INSERT INTO `fastfood_hacz` VALUES (1,'Hamburger',9,NULL),(2,'Cheeseburger',10,NULL),(3,'Małe Frytki',8,NULL),(4,'Frytki małe z serem',10,NULL),(5,'Frytki duże',10,NULL),(6,'Frytki duże z serem',13,NULL);
/*!40000 ALTER TABLE `fastfood_hacz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fastfood_mp`
--

DROP TABLE IF EXISTS `fastfood_mp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fastfood_mp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cena` int DEFAULT NULL,
  `skladniki` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fastfood_mp`
--

LOCK TABLES `fastfood_mp` WRITE;
/*!40000 ALTER TABLE `fastfood_mp` DISABLE KEYS */;
INSERT INTO `fastfood_mp` VALUES (1,'Hamburger',10,NULL);
/*!40000 ALTER TABLE `fastfood_mp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galeria`
--

DROP TABLE IF EXISTS `galeria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galeria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galeria`
--

LOCK TABLES `galeria` WRITE;
/*!40000 ALTER TABLE `galeria` DISABLE KEYS */;
INSERT INTO `galeria` VALUES (1,'https://i.postimg.cc/Vk1KW4Lg/10.jpg'),(2,'https://i.postimg.cc/cLmX9YvS/11.jpg'),(3,'https://i.postimg.cc/fbq5ZN7q/12.jpg'),(4,'https://i.postimg.cc/wBjFSvNs/13.jpg'),(5,'https://i.postimg.cc/bJGgwB3y/14.jpg'),(6,'https://i.postimg.cc/KzdNkDHn/15.jpg'),(7,'https://i.postimg.cc/d3r98Zbg/16.jpg'),(8,'https://i.postimg.cc/QNTSLvFS/17.jpg'),(9,'https://i.postimg.cc/tgryjYM0/1.jpg'),(10,'https://i.postimg.cc/zG7YCy5L/10.jpg'),(11,'https://i.postimg.cc/JhdwFSsM/11.jpg'),(12,'https://i.postimg.cc/xddDt9T6/12.jpg'),(13,'https://i.postimg.cc/1zRP2pMc/2.jpg'),(14,'https://i.postimg.cc/G2HRhdW4/3.jpg'),(15,'https://i.postimg.cc/0QFszhvc/4.jpg'),(16,'https://i.postimg.cc/T1bXgQYG/5.jpg'),(17,'https://i.postimg.cc/3r0hsrj6/6.jpg'),(18,'https://i.postimg.cc/xTK2ds43/7.jpg'),(19,'https://i.postimg.cc/28pYrp25/8.jpg'),(20,'https://i.postimg.cc/htcqQLFW/9.jpg'),(42,'https://i.postimg.cc/W4xxXP1b/a3f3f536-596f-43aa-8a7c-72719e5b482a.jpg'),(43,'https://i.postimg.cc/SRdTF0k9/8ef91aa3-56b6-4692-bcfb-dfd61671019b.jpg'),(44,'https://i.postimg.cc/JnJvFds3/2463be34-2940-427c-9362-4be99b6c3e65.jpg');
/*!40000 ALTER TABLE `galeria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `miejscowosci_hacz`
--

DROP TABLE IF EXISTS `miejscowosci_hacz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `miejscowosci_hacz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `ulica` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `miejscowosci_hacz`
--

LOCK TABLES `miejscowosci_hacz` WRITE;
/*!40000 ALTER TABLE `miejscowosci_hacz` DISABLE KEYS */;
INSERT INTO `miejscowosci_hacz` VALUES (1,'głowienka',NULL),(2,'krosno','dębowa'),(3,'krosno','handlowa'),(4,'krosno','polna'),(5,'krosno','bolesława prusa'),(6,'krosno','żniwna'),(7,'krosno','władysława stanisława reymonta'),(8,'krosno','nad badoniem'),(9,'krosno','grunwaldzka'),(10,'krosno','stanisława pigonia'),(11,'krosno','suchodolska'),(12,'targowiska',NULL),(13,'łężany',NULL),(14,'pustyny',NULL),(15,'iwonicz',NULL),(16,'wrocanka',NULL),(17,'rogi',NULL),(18,'łęki dukielskie',NULL),(19,'niżna łąka',NULL),(20,'widacz',NULL),(21,'lubatówka',NULL),(22,'równe',NULL),(23,'krościenko wyżne',NULL),(24,'wietrzno',NULL),(25,'lubatowa',NULL),(26,'miejsce piastowe',NULL);
/*!40000 ALTER TABLE `miejscowosci_hacz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `napoje_hacz`
--

DROP TABLE IF EXISTS `napoje_hacz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `napoje_hacz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `cena` int DEFAULT NULL,
  `skladniki` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `napoje_hacz`
--

LOCK TABLES `napoje_hacz` WRITE;
/*!40000 ALTER TABLE `napoje_hacz` DISABLE KEYS */;
/*!40000 ALTER TABLE `napoje_hacz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `napoje_mp`
--

DROP TABLE IF EXISTS `napoje_mp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `napoje_mp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `cena` int DEFAULT NULL,
  `skladniki` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `napoje_mp`
--

LOCK TABLES `napoje_mp` WRITE;
/*!40000 ALTER TABLE `napoje_mp` DISABLE KEYS */;
INSERT INTO `napoje_mp` VALUES (1,'Coca Cola 1L',10,NULL),(2,'Celestynka Czysta 0.33L',2,NULL),(3,'Celestynka Cola 0.33L',3,NULL),(4,'Celestynka Pomarańcza 0.33L',3,NULL),(5,'Celestynka Wieloowocowa 0.33L',3,NULL),(6,'Celestynka Cytryna 0.33L',3,NULL),(7,'Celestynka Grejfrut 0.33L',3,NULL),(8,'Celestynka Oranżada 0.33L',3,NULL),(9,'Pepsi 0.5L',7,NULL),(10,'Pepsi 0.85L',10,NULL),(11,'Tymbark Jabłko-Mięta 0.33L',4,NULL),(12,'Tymbark Jabłko-Wiśnia 0.33L',4,NULL),(13,'Tymbark Jabłko-Brzoskwinia 0.3',4,NULL),(14,'Tymbark Jabłko-Mango 0.33L',4,NULL),(15,'Sok Kaktus 1L',10,NULL),(16,'Sok Banan 1L',10,NULL),(17,'Sok Pomarańcza 1L',10,NULL);
/*!40000 ALTER TABLE `napoje_mp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pizza_hacz`
--

DROP TABLE IF EXISTS `pizza_hacz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pizza_hacz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cena` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `skladniki` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pizza_hacz`
--

LOCK TABLES `pizza_hacz` WRITE;
/*!40000 ALTER TABLE `pizza_hacz` DISABLE KEYS */;
INSERT INTO `pizza_hacz` VALUES (1,'Marcherita','24','sos pomidorowy, mozzarella, kukurydza, ser żółty, zioła, oregano'),(2,'Zwyczajna','26','sos pomidorowy, mozzarella, pieczarki, papryka, ser żółty, zioła, oregano'),(3,'Wegetarianska','28','sos pomidorowy, mozzarella, pieczarki, oliwki, papryka, kukurydza, cebula, ser żółty, zioła, oregano'),(4,'Szynkowa','27','sos pomidorowy, mozzarella, szynka, papryka, ser żółty, zioła, oregano'),(5,'Tradycyjna','31','sos pomidorowy, mozzarella, szynka, pieczarki, oliwki, kukurydza, papryka, ser żółty, zioła, oregano'),(6,'Salami','27','sos pomidorowy, mozzarella, salami, papryka, ser żółty, zioła, oregano'),(7,'Diabelska (Pikantna)','31','sos pomidorowy, mozzarella, salami, pieczarki, peperoni, kukurydza, oliwki, papryka, chili, ser żółty, zioła, oregano'),(8,'Z Tuńczykiem','28','sos pomidorowy, mozzarella, tuńczyk, cebula, ser żółty, papryka, zioła, oregano'),(9,'Marynarska','30','sos pomidorowy, mozzarella, tuńczyk, oliwki, pieczarki, papryka, ser żółty, zioła, oregano'),(10,'Firmowa','32','sos pomidorowy, mozzarella, boczek, szynka, cebula, czosnek, pieczarki, oliwki, kukurydza, ser żółty, papryka, zioła, oregano'),(11,'Kurczak (Pikantna)','32','sos pomidorowy, mozzarella, filet z kurczaka, cebula, peperoni, ser żółty, papryka, zioła, oregano'),(12,'Kurczak (Łagodna)','32','sos pomidorowy, mozzarella, filet z kurczaka, pieczarki, oliwki, ser żółty, papryka, zioła, oregano'),(13,'Kurczak z Ananasem','32','sos pomidorowy, mozzarella, filet z kurczaka, ananas, kukurydza, papryka, ser żółty, zioła, oregano'),(14,'Gyros','32','sos pomidorowy, mozzarella, gyros pieczony, cebula, papryka, pieczarki, ser żółty, sos grecki, oliwki, zioła, oregano'),(15,'Owoce Morza','32','sos pomidorowy, mozzarella, owoce morza, tuńczyk, cytryna, ser żółty, papryka, zioła, oregano'),(16,'Domowa','28','sos pomidorowy, mozzarella, szynka, salami, pieczarki, papryka, ser żółty, zioła, oregano'),(17,'Salami i Kurczak','32','sos pomidorowy, mozzarella, kurczak, salami, pieczarki, papryka, ser żółty, fasolka czerwona, zioła, oregano'),(18,'Szynkowa Normalna','28','sos pomidorowy, mozzarella, szynka, pieczarki, papryka, ser żółty, zioła, oregano'),(19,'Super Wegetariańska','28','sos pomidorowy, mozzarella, pieczarki, papryka, kukurydza, fasolka czerwona, groszek, ser żółty, zioła, oregano'),(20,'Wiejska','32','sos pomidorowy, mozzarella, boczek, kiełbasa, ogórek, pieczarki, papryka, cebula, czosnek, ser żółty, zioła, oregano'),(21,'Jarska','29','sos pomidorowy, mozzarella, pomidor, ogórek, groszek, papryka, brokuły, ser żółty, zioła, oregano'),(22,'Hawajska','28','sos pomidorowy, mozzarella, szynka, ananas, kukurydza, ser żółty, zioła, oregano'),(23,'Szynkowa Extra','29','sos pomidorowy, mozzarella, szynka, papryka, kapary, ser żółty, zioła, oregano'),(24,'Gyros Max','32','sos pomidorowy, mozzarella, gyros, ogórek, pomidor, ser feta, oliwki, sos grecki, ser żółty, zioła, oregano'),(25,'Tropicana','32','sos pomidorowy, mozzarella, kurczak, brzoskwinia, ananas, szynka, ser żółty, zioła oregano'),(26,'Gustoza','29','sos pomidorowy, mozzarella, kiełbasa, brokuły, papryka, ser żółty, zioła, oregano'),(27,'Delicat','27','sos pomidorowy, mozzarella, brzoskwinia, ananas, ser żółty, zioła, oregano'),(28,'Grecka','30','sos pomidorowy, mozzarella, pomidor, ogórek, cebula, papryka, oliwki, ser feta, ser żółty, zioła, oregano'),(29,'Meksykanska','30','sos pomidorowy, mozzarella, salami, oliwki, kapary, tabasco, chili, ser żółty, zioła, oregano'),(30,'Cztery Sery','31','sos pomidorowy, ser parmezan, ser pleśniowy, ser feta, ser żółty, zioła, oregano'),(31,'Parmezana','34','sos pomidorowy, mozzarella, ser parmezan, szynka parmeńska, pomidorki koktajlowe, rukola, ser żółty, zioła, oregano'),(32,'Szpinakowa','31','sos pomidorowy, mozzarella, szpinak, pomidory suszone, ser feta, ser żółty, zioła, oregano'),(33,'Z Rukolą','30','sos pomidorowy, mozzarella, salami lub szynka (do wyboru), rukola, ser parmezan, ser żółty, zioła, oregano'),(34,'Grzybowa','32','sos pomidorowy, mozzarella, borowiki, pieczarki, podgrzybki, ser parmezan, ser żółty, zioła, oregano'),(35,'Borowikowa','33','sos pomidorowy, mozzarella, borowiki, boczek, cebula, ser parmezan, oliwki, ser żółty, zioła, oregano'),(36,'Żurawinowa','31','sos pomidorowy, mozzarella, ser wędzony, żurawina, rukola, ser żółty, zioła, oregano'),(37,'Uczta Serowa','31','sos pomidorowy, ser parmezan, ser pleśniowy, ser wędzony, ser żółty, zioła, oregano'),(38,'Szpinakowa_extra','32','sos pomidorowy, mozzarella, szpinak, kurczak, cebula, czosnek, ser żółty, zioła, oregano');
/*!40000 ALTER TABLE `pizza_hacz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pizza_mp`
--

DROP TABLE IF EXISTS `pizza_mp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pizza_mp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cena` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `skladniki` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pizza_mp`
--

LOCK TABLES `pizza_mp` WRITE;
/*!40000 ALTER TABLE `pizza_mp` DISABLE KEYS */;
INSERT INTO `pizza_mp` VALUES (1,'Marcherita','25','sos pomidorowy, mozzarella, kukurydza, ser żółty, zioła, oregano'),(2,'Zwyczajna','26','sos pomidorowy, mozzarella, pieczarki, papryka, ser żółty, zioła, oregano'),(3,'Wegetariańska','27','sos pomidorowy, mozzarella, pieczarki, oliwki, papryka, kukurydza, cebula, ser żółty, zioła, oregano'),(4,'Szynkowa','27','sos pomidorowy, mozzarella, szynka, papryka, ser żółty, zioła, oregano'),(5,'Tradycyjna','30','sos pomidorowy, mozzarella, szynka, pieczarki, oliwki, kukurydza, papryka, ser żółty, zioła, oregano'),(6,'Salami','27','sos pomidorowy, mozzarella, salami, papryka, ser żółty, zioła, oregano'),(7,'Diabelska (Pikantna)','30','sos pomidorowy, mozzarella, salami, pieczarki, peperoni, kukurydza, oliwki, papryka, chili, ser żółty, zioła, oregano'),(8,'Z Tuńczykiem','28','sos pomidorowy, mozzarella, tuńczyk, cebula, ser żółty, papryka, zioła, oregano'),(9,'Marynarska','30','sos pomidorowy, mozzarella, tuńczyk, oliwki, pieczarki, papryka, ser żółty, zioła, oregano'),(10,'Firmowa','31','sos pomidorowy, mozzarella, boczek, szynka, cebula, czosnek, pieczarki, oliwki, kukurydza, ser żółty, papryka, zioła, oregano'),(11,'Kurczak (Pikantna)','31','sos pomidorowy, mozzarella, filet z kurczaka, cebula, peperoni, ser żółty, papryka, zioła, oregano'),(12,'Kurczak (Łagodna)','31','sos pomidorowy, mozzarella, filet z kurczaka, pieczarki, oliwki, ser żółty, papryka, zioła, oregano'),(13,'Kurczak (z Ananasem)','31','sos pomidorowy, mozzarella, filet z kurczaka, ananas, kukurydza, papryka, ser żółty, zioła, oregano'),(14,'Gyros','32','sos pomidorowy, mozzarella, gyros pieczony, cebula, papryka, pieczarki, ser żółty, sos grecki, oliwki, zioła, oregano'),(15,'Owoce Morza','32','sos pomidorowy, mozzarella, owoce morza, tuńczyk, cytryna, ser żółty, papryka, zioła, oregano'),(16,'Domowa','28','sos pomidorowy, mozzarella, szynka, salami, pieczarki, papryka, ser żółty, zioła, oregano'),(17,'Salami i Kurczak','31','sos pomidorowy, mozzarella, kurczak, salami, pieczarki, papryka, ser żółty, fasolka czerwona, zioła, oregano'),(18,'Szynkowa Normalna','28','sos pomidorowy, mozzarella, szynka, pieczarki, papryka, ser żółty, zioła, oregano'),(19,'Super Wegetariańska','28','sos pomidorowy, mozzarella, pieczarki, papryka, kukurydza, fasolka czerwona, groszek, ser żółty, zioła, oregano'),(20,'Wiejska','31','sos pomidorowy, mozzarella, boczek, kiełbasa, ogórek, pieczarki, papryka, cebula, czosnek, ser żółty, zioła, oregano'),(21,'Jarska','29','sos pomidorowy, mozzarella, pomidor, ogórek, groszek, papryka, brokuły, ser żółty, zioła, oregano'),(22,'Hawajska','28','sos pomidorowy, mozzarella, szynka, ananas, kukurydza, ser żółty, zioła, oregano'),(23,'Szynkowa Extra','29','sos pomidorowy, mozzarella, szynka, papryka, kapary, ser żółty, zioła, oregano'),(24,'Gyros Max','32','sos pomidorowy, mozzarella, gyros, ogórek, pomidor, ser feta, oliwki, sos grecki, ser żółty, zioła, oregano'),(25,'Tropicana','31','sos pomidorowy, mozzarella, kurczak, brzoskwinia, ananas, szynka, ser żółty, zioła oregano'),(26,'Gustoza','29','sos pomidorowy, mozzarella, kiełbasa, brokuły, papryka, ser żółty, zioła, oregano'),(27,'Delicat','27','sos pomidorowy, mozzarella, brzoskwinia, ananas, ser żółty, zioła, oregano'),(28,'Grecka','30','sos pomidorowy, mozzarella, pomidor, ogórek, cebula, papryka, oliwki, ser feta, ser żółty, zioła, oregano'),(29,'Meksykańska','30','sos pomidorowy, mozzarella, salami, oliwki, kapary, tabasco, chili, ser żółty, zioła, oregano'),(30,'Cztery Sery','30','sos pomidorowy, ser parmezan, ser pleśniowy, ser feta, ser żółty, zioła, oregano'),(31,'Parmezana','34','sos pomidorowy, mozzarella, ser parmezan, szynka parmeńska, pomidorki koktajlowe, rukola, ser żółty, zioła, oregano'),(32,'Szpinakowa','31','sos pomidorowy, mozzarella, szpinak, pomidory suszone, ser feta, ser żółty, zioła, oregano'),(33,'Z Rukolą','31','sos pomidorowy, mozzarella, salami lub szynka (do wyboru), rukola, ser parmezan, ser żółty, zioła, oregano'),(34,'Grzybowa','33','sos pomidorowy, mozzarella, borowiki, pieczarki, podgrzybki, ser parmezan, ser żółty, zioła, oregano'),(35,'Borowikowa','33','sos pomidorowy, mozzarella, borowiki, boczek, cebula, ser parmezan, oliwki, ser żółty, zioła, oregano'),(36,'Żurawinowa','32','sos pomidorowy, mozzarella, ser wędzony, żurawina, rukola, ser żółty, zioła, oregano'),(37,'Uczta Serowa','31','sos pomidorowy, ser parmezan, ser pleśniowy, ser wędzony, ser żółty, zioła, oregano'),(38,'Szpinakowa Extra','31','sos pomidorowy, mozzarella, szpinak, kurczak, cebula, czosnek, ser żółty, zioła, oregano');
/*!40000 ALTER TABLE `pizza_mp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `password` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','bjdp6tx-27.1rf7g8u3Ed');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zamowienia_hacz`
--

DROP TABLE IF EXISTS `zamowienia_hacz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zamowienia_hacz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imie` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `nazwisko` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `miejscowosc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `numerDomu` int DEFAULT NULL,
  `numerMieszkania` int DEFAULT NULL,
  `numerTelefonu` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `dataGodzinaZamowienia` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
  `zamowienieNaGodzine` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `zamowioneProdukty` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `suma` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zamowienia_hacz`
--

LOCK TABLES `zamowienia_hacz` WRITE;
/*!40000 ALTER TABLE `zamowienia_hacz` DISABLE KEYS */;
/*!40000 ALTER TABLE `zamowienia_hacz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zamowienia_mp`
--

DROP TABLE IF EXISTS `zamowienia_mp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zamowienia_mp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imie` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `nazwisko` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `typ` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `miejscowosc` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `numerDomu` int DEFAULT NULL,
  `numerMieszkania` int DEFAULT NULL,
  `numerTelefonu` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `dataGodzinaZamowienia` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci NOT NULL,
  `zamowienieNaGodzine` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `zamowioneProdukty` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `suma` int DEFAULT NULL,
  `uwagi` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zamowienia_mp`
--

LOCK TABLES `zamowienia_mp` WRITE;
/*!40000 ALTER TABLE `zamowienia_mp` DISABLE KEYS */;
INSERT INTO `zamowienia_mp` VALUES (119,'Tomasz','Mol','delivery','Miejsce Piastowe','Handlowa',4,NULL,'733886001','2025-04-07T11:52:43.356Z',NULL,'[{\"uniqueId\":\"pizza_mp_7\",\"id\":7,\"category\":\"pizza_mp\",\"name\":\"Diabelska (Pikantna)\",\"quantity\":1,\"price\":\"30\",\"doughType\":\"Cienkie\",\"removedIngredients\":[],\"addedIngredients\":[],\"notes\":\"\"}]',30,'sklep mediaexpert,\n\nzamiast ketchupu proszę sos czosnkowy'),(120,'Rafał','Wiernasiewicz','delivery','Rogi','Długa',53,NULL,'782963070','2025-04-07T17:00:18.853Z',NULL,'[{\"uniqueId\":\"pizza_mp_13\",\"id\":13,\"category\":\"pizza_mp\",\"name\":\"Kurczak (z Ananasem)\",\"quantity\":1,\"price\":\"31\",\"doughType\":\"Grube\",\"removedIngredients\":[],\"addedIngredients\":[],\"notes\":\"\"}]',33,''),(121,'Rafał','Gardzina','delivery','Targowiska','Ks.br. Markiewicza',111,NULL,'530511225','2025-04-07T18:47:09.427Z',NULL,'[{\"uniqueId\":\"pizza_mp_38\",\"id\":38,\"category\":\"pizza_mp\",\"name\":\"Szpinakowa Extra\",\"quantity\":1,\"price\":\"31\",\"doughType\":\"Grube\",\"removedIngredients\":[],\"addedIngredients\":[],\"notes\":\"\"},{\"uniqueId\":\"pizza_mp_5\",\"id\":5,\"category\":\"pizza_mp\",\"name\":\"Tradycyjna\",\"quantity\":1,\"price\":\"30\",\"doughType\":\"Grube\",\"removedIngredients\":[],\"addedIngredients\":[],\"notes\":\"\"}]',61,'');
/*!40000 ALTER TABLE `zamowienia_mp` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-08 10:38:46
