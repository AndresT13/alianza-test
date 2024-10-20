-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: alianza
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shared_key` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (18,'alewis18','Anna Lewis','4006780123','alewis18@mail.co','2023-07-01 00:00:00.000000',NULL),(19,'hsanchez19','Hannah Sanchez','4007891234','hsanchez19@mail.co','2023-08-01 00:00:00.000000',NULL),(20,'ejackson20','Evan Jackson','4008902345','ejackson20@mail.co','2023-09-01 00:00:00.000000',NULL),(21,'fwalker21','Felicia Walker','4009013456','fwalker21@mail.co','2023-10-01 00:00:00.000000',NULL),(22,'jhill22','James Hill','4000124678','jhill22@mail.co','2023-11-01 00:00:00.000000',NULL),(23,'gmorris23','Grace Morris','4001235789','gmorris23@mail.co','2023-12-01 00:00:00.000000',NULL),(24,'kford24','Katherine Ford','4002346890','kford24@mail.co','2024-01-01 00:00:00.000000',NULL),(25,'nlewis25','Nathan Lewis','4003457901','nlewis25@mail.co','2024-02-01 00:00:00.000000',NULL),(26,'tgreen26','Tim Green','4004568012','tgreen26@mail.co','2024-03-01 00:00:00.000000',NULL),(27,'gthompson27','Grace Thompson','4005679123','gthompson27@mail.co','2024-04-01 00:00:00.000000',NULL),(28,'cjones28','Charlie Jones','4006780234','cjones28@mail.co','2024-05-01 00:00:00.000000',NULL),(29,'sprice29','Sophie Price','4007891345','sprice29@mail.co','2024-06-01 00:00:00.000000',NULL),(30,'mdavis30','Michael Davis','4008902456','mdavis30@mail.co','2024-07-01 00:00:00.000000',NULL),(31,'scook31','Samantha Cook','4009013567','scook31@mail.co','2024-08-01 00:00:00.000000',NULL),(32,'jcameron32','John Cameron','4000124789','jcameron32@mail.co','2024-09-01 00:00:00.000000',NULL),(33,'ewalker33','Emma Walker','4001235890','ewalker33@mail.co','2024-10-01 00:00:00.000000',NULL),(34,'tcarter34','Thomas Carter','4002346901','tcarter34@mail.co','2024-11-01 00:00:00.000000',NULL),(35,'hrodriguez35','Helen Rodriguez','4003457012','hrodriguez35@mail.co','2024-12-01 00:00:00.000000',NULL),(36,'bpeterson36','Brian Peterson','4004568123','bpeterson36@mail.co','2025-01-01 00:00:00.000000',NULL),(37,'kbrooks37','Karen Brooks','4005679234','kbrooks37@mail.co','2025-02-01 00:00:00.000000',NULL),(38,'jcarson38','Jessica Carson','4006780345','jcarson38@mail.co','2025-03-01 00:00:00.000000',NULL),(39,'gsmith39','George Smith','4007891456','gsmith39@mail.co','2025-04-01 00:00:00.000000',NULL),(40,'lwilson40','Lisa Wilson','4008902567','lwilson40@mail.co','2025-05-01 00:00:00.000000',NULL),(41,'rwright41','Ricky Wright','4009013678','rwright41@mail.co','2025-06-01 00:00:00.000000',NULL),(42,'afisher42','Amanda Fisher','4000124890','afisher42@mail.co','2025-07-01 00:00:00.000000',NULL),(43,'nmartin43','Nathan Martin','4001235901','nmartin43@mail.co','2025-08-01 00:00:00.000000',NULL),(44,'alewis44','Alice Lewis','4002346012','alewis44@mail.co','2025-09-01 00:00:00.000000',NULL),(45,'jkelly45','Jason Kelly','4003457123','jkelly45@mail.co','2025-10-01 00:00:00.000000',NULL),(46,'jhayes46','Jordan Hayes','4004568234','jhayes46@mail.co','2025-11-01 00:00:00.000000',NULL),(47,'mward47','Michael Ward','4005679345','mward47@mail.co','2025-12-01 00:00:00.000000',NULL),(48,'jdavis48','James Davis','4006780456','jdavis48@mail.co','2026-01-01 00:00:00.000000',NULL),(49,'ddouglas49','Dylan Douglas','4007891567','ddouglas49@mail.co','2026-02-01 00:00:00.000000',NULL),(50,'awilliams50','Anna Williams','4008902678','awilliams50@mail.co','2026-03-01 00:00:00.000000',NULL),(51,'rgomez1','Rafael Gomez','4001234567','rgomez1@mail.co','2023-01-01 00:00:00.000000',NULL),(52,'mbeltran2','Maria Beltran','4002345678','mbeltran2@mail.co','2023-02-01 00:00:00.000000',NULL),(53,'jsmith3','John Smith','4003456789','jsmith3@mail.co','2023-03-01 00:00:00.000000',NULL),(54,'ajohnson4','Ana Johnson','4004567890','ajohnson4@mail.co','2023-04-01 00:00:00.000000',NULL),(55,'mjones5','Mark Jones','4005678901','mjones5@mail.co','2023-05-01 00:00:00.000000',NULL),(56,'elópez6','Elena López','4006789012','elópez6@mail.co','2023-06-01 00:00:00.000000',NULL),(58,'lmartínez8','Laura Martínez','4008901234','lmartínez8@mail.co','2023-08-01 00:00:00.000000',NULL),(59,'jrodríguez9','Juan Rodríguez','4009012345','jrodríguez9@mail.co','2023-09-01 00:00:00.000000',NULL),(60,'dhernández10','Diego Hernández','4000123456','dhernández10@mail.co','2023-10-01 00:00:00.000000',NULL),(61,'bfernández11','Beatriz Fernández','4001234789','bfernández11@mail.co','2023-11-01 00:00:00.000000',NULL),(62,'cmorales12','Carlos Morales','4002345890','cmorales12@mail.co','2023-12-01 00:00:00.000000',NULL),(63,'lramírez13','Laura Ramírez','4003456901','lramírez13@mail.co','2024-01-01 00:00:00.000000',NULL),(64,'pvera14','Pedro Vera','4004567012','pvera14@mail.co','2024-02-01 00:00:00.000000',NULL),(65,'atellez92','andres tellez','456789765','atellez@mail.com','2024-10-20 00:00:00.000000',NULL),(66,'acortes63','angel cortes','4567894356','acortes@mail.co','2024-10-20 00:00:00.000000',NULL),(67,'apoveda24','angel poveda','987945667','apoveda@mail.co','2024-10-15 00:00:00.000000',NULL),(68,'druiz18','daniela ruiz','345678977','druiz@mail.es','2024-10-20 00:00:00.000000',NULL),(69,'lperez51','lola perez','2344567821','lperez@mail.es','2024-10-20 00:00:00.000000',NULL),(70,'dsosa52','dolores sosa','09809809809','dsosa@mail.co','2024-10-20 00:00:00.000000',NULL),(71,'ioiuikhyoiu94','iuyiouy oiuikhyoiu','6896896','ioiuikhyoiu@mail.co','2024-10-20 00:00:00.000000',NULL),(72,'mgrua11','martha grua','765875875875','mgrua@mail.co','2024-10-20 00:00:00.000000',NULL),(73,'mvela69','Mar Vela','9809768767','mvela@mail.co','2024-10-20 00:00:00.000000',NULL);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-20 13:59:51
