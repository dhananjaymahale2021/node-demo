CREATE TABLE `student` (
  `roll_no` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `class` varchar(50) DEFAULT NULL,
  `division` varchar(50) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `parent_mobile_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`roll_no`)
);
