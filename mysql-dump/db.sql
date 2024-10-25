-- MySQL Script generated by MySQL Workbench
-- Thu Oct 24 00:47:02 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema codeVenture
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `codeVenture` ;

-- -----------------------------------------------------
-- Schema codeVenture
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `codeVenture` DEFAULT CHARACTER SET utf8 ;
USE `codeVenture` ;

-- -----------------------------------------------------
-- Table `codeVenture`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeVenture`.`users` ;

CREATE TABLE IF NOT EXISTS `codeVenture`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'developer.access@email.com','$2a$10$HZp1TugssOp2hTrCdiC.6.SshhsK4Uz8u8nE/XHG9D0MAN/FP0YLe','2024-10-19 04:38:45','2024-10-19 04:38:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `codeVenture`.`credentials`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeVenture`.`credentials` ;

CREATE TABLE IF NOT EXISTS `codeVenture`.`credentials` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_credentials_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `codeVenture`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_credentials_users_idx` ON `codeVenture`.`credentials` (`user_id` ASC) ;

--
-- Dumping data for table `credentials`
--

LOCK TABLES `credentials` WRITE;
/*!40000 ALTER TABLE `credentials` DISABLE KEYS */;
INSERT INTO `credentials` VALUES (1,1,'developer','access','2024-10-19 04:38:46','2024-10-19 04:38:46');
/*!40000 ALTER TABLE `credentials` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `codeVenture`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeVenture`.`roles` ;

CREATE TABLE IF NOT EXISTS `codeVenture`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `roles` VARCHAR(255) NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_roles_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `codeVenture`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_roles_users1_idx` ON `codeVenture`.`roles` (`user_id` ASC) ;
--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,1,'admin','2024-10-19 04:38:46','2024-10-19 04:38:46');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `codeVenture`.`lessons`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeVenture`.`lessons` ;

CREATE TABLE IF NOT EXISTS `codeVenture`.`lessons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `title` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_groups_teachers1`
    FOREIGN KEY (`role_id`)
    REFERENCES `codeVenture`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_groups_teachers1_idx` ON `codeVenture`.`lessons` (`role_id` ASC) ;
--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (1,1,'New Lesson ','test','2024-10-19 04:39:18','2024-10-19 04:39:18');
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `codeVenture`.`levels`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeVenture`.`levels` ;

CREATE TABLE IF NOT EXISTS `codeVenture`.`levels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lesson_id` INT NOT NULL,
  `level_name` VARCHAR(45) NULL,
  `content` BLOB NULL,
  `isTask` TINYINT NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_challenges_groups1`
    FOREIGN KEY (`lesson_id`)
    REFERENCES `codeVenture`.`lessons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_challenges_groups1_idx` ON `codeVenture`.`levels` (`lesson_id` ASC) ;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES (1,1,'PHP Syntax','A PHP script is executed on the server, and the plain HTML result is sent back to the browser.\r\n\r\n## Basic PHP Syntax\r\nA PHP script can be placed anywhere in the document.\r\n\r\nA PHP script starts with `<?php` and ends with `?>`:\r\n\r\n```\r\n<?php\r\n// PHP code goes here\r\n?>\r\n```\r\n\r\nThe default file extension for PHP files is \"`.php`\".\r\n\r\nA PHP file normally contains HTML tags, and some PHP scripting code.\r\n\r\nBelow, we have an example of a simple PHP file, with a PHP script that uses a built-in PHP function \"`echo`\" to output the text \"Hello World!\" on a web page\r\n\r\n## Example\r\nA simple `.php` file with both HTML code and PHP code:\r\n```\r\n<!DOCTYPE html>\r\n<html>\r\n<body>\r\n\r\n<h1>My first PHP page</h1>\r\n\r\n<?php\r\necho \"Hello World!\";\r\n?>\r\n\r\n</body>\r\n</html>\r\n```\r\n\r\n**Note**: PHP statements end with a semicolon (`;`).\r\n\r\n# PHP Case Sensitivity\r\nIn PHP, keywords (e.g. `if`, `else`, `while`, `echo`, etc.), classes, functions, and user-defined functions are not case-sensitive.\r\n\r\nIn the example below, all three echo statements below are equal and legal:\r\n\r\n## Example\r\n`ECHO` is the same as `echo`:\r\n```\r\n<!DOCTYPE html>\r\n<html>\r\n<body>\r\n\r\n<?php\r\nECHO \"Hello World!<br>\";\r\necho \"Hello World!<br>\";\r\nEcHo \"Hello World!<br>\";\r\n?>\r\n\r\n</body>\r\n</html>\r\n```\r\n',0,'2024-10-19 05:04:49','2024-10-19 05:04:49'),(2,1,'PHP Comments','# PHP Comments\r\n## Comments in PHP\r\nA comment in PHP code is a line that is not executed as a part of the program. Its only purpose is to be read by someone who is looking at the code.\r\n\r\nComments can be used to:\r\n\r\n* Let others understand your code\r\n* Remind yourself of what you did - Most programmers have experienced coming back to their own work a year or two later and having to re-figure out what they did. Comments can remind you of what you were thinking when you wrote the code\r\n* Leave out some parts of your code\r\n\r\nPHP supports several ways of commenting:\r\n\r\n## Example\r\nSyntax for comments in PHP code:\r\n```\r\n// This is a single-line comment\r\n\r\n# This is also a single-line comment\r\n\r\n/* This is a\r\nmulti-line comment */\r\n```\r\n\r\n## Single Line Comments\r\nSingle line comments start with `//`.\r\n\r\nAny text between `//` and the end of the line will be ignored (will not be executed).\r\n\r\nYou can also use `#` for single line comments, but in this tutorial we will use `//`.\r\n\r\nThe following examples uses a single-line comment as an explanation:\r\n\r\n## Example\r\nA comment before the code:\r\n```\r\n// Outputs a welcome message:\r\necho \"Welcome Home!\";\r\n```\r\n\r\n## Example\r\nA comment at the end of a line:\r\n```\r\necho \"Welcome Home!\"; // Outputs a welcome message\r\n```\r\n## Comments to Ignore Code\r\nWe can use comments to prevent code lines from being executed:\r\n\r\nExample\r\nDo not display a welcome message:\r\n```\r\n// echo \"Welcome Home!\";\r\n```',0,'2024-10-19 05:30:38','2024-10-19 05:30:38'),(3,1,'PHP Strings','# PHP Strings\r\nA string is a sequence of characters, like \"Hello world!\".\r\n\r\n## Strings\r\nStrings in PHP are surrounded by either double quotation marks, or single quotation marks.\r\n\r\n### Example\r\n```\r\necho \"Hello\";\r\necho \'Hello\';\r\n```\r\n\r\n**Note** There is a big difference between double quotes and single quotes in PHP.\r\n\r\nDouble quotes process special characters, single quotes does not.\r\n\r\n## Double or Single Quotes?\r\nYou can use double or single quotes, but you should be aware of the differences between the two.\r\n\r\nDouble quoted strings perform action on special characters.\r\n\r\nE.g. when there is a variable in the string, it returns the value of the variable:\r\n## Example\r\nDouble quoted string literals perform operations for special characters:\r\n```\r\n$x = \"John\";\r\necho \"Hello $x\";\r\n```\r\nSingle quoted strings does not perform such actions, it returns the string like it was written, with the variable name:\r\n\r\n### Example\r\nSingle quoted string literals returns the string as it is:\r\n```\r\n$x = \"John\";\r\necho \'Hello $x\';\r\n```\r\n## String Length\r\nThe PHP `strlen()` function returns the length of a string.\r\n### Example\r\nReturn the length of the string \"Hello world!\":\r\n```\r\necho strlen(\"Hello world!\");\r\n```\r\n## Word Count\r\nThe PHP `str_word_count()` function counts the number of words in a string.\r\n\r\n### Example\r\nCount the number of word in the string \"Hello world!\":\r\n```\r\necho str_word_count(\"Hello world!\");\r\n```\r\n## Search For Text Within a String\r\nThe PHP `strpos()` function searches for a specific text within a string.\r\n\r\nIf a match is found, the function returns the character position of the first match. If no match is found, it will return FALSE.\r\n\r\n### Example\r\nSearch for the text \"world\" in the string \"Hello world!\":\r\n```\r\necho strpos(\"Hello world!\", \"world\");\r\n```\r\n\r\n**Tip**: The first character position in a string is 0 (not 1).\r\n\r\n## Complete PHP String Reference\r\n\r\nThe PHP string reference contains description and example of use, for each function!\r\n\r\n',0,'2024-10-19 05:43:08','2024-10-19 05:43:08'),(4,1,'PHP Numbers','In this chapter we will look in depth into Integers, Floats, and Number Strings.\r\n\r\n# PHP Numbers\r\n\r\nThere are three main numeric types in PHP:\r\n\r\n*`Integer`\r\n*`Float`\r\n*`Number Strings`\r\n\r\nIn addition, PHP has two more data types used for numbers:\r\n\r\n*`Infinity`\r\n*`NaN`\r\n\r\nVariables of numeric types are created when you assign a value to them:\r\n\r\n### Example\r\n```\r\n$a = 5;\r\n$b = 5.34;\r\n$c = \"25\";\r\n```\r\n\r\nTo verify the type of any object in PHP, use the `var_dump()` function:\r\n\r\n### Example\r\n```\r\nvar_dump($a);\r\nvar_dump($b);\r\nvar_dump($c);\r\n```\r\n\r\nPHP Integers\r\n2, 256, -256, 10358, -179567 are all integers.\r\n\r\nAn integer is a number without any decimal part.\r\n\r\nAn integer data type is a non-decimal number between -2147483648 and 2147483647 in 32 bit systems, and between -9223372036854775808 and 9223372036854775807 in 64 bit systems. A value greater (or lower) than this, will be stored as float, because it exceeds the limit of an integer.\r\n\r\n**Note**: Another important thing to know is that even if 4 * 2.5 is 10, the result is stored as float, because one of the operands is a float (2.5).\r\n\r\nHere are some rules for integers:\r\n\r\n*An integer must have at least one digit\r\n*An integer must NOT have a decimal point\r\n*An integer can be either positive or negative\r\n*Integers can be specified in three formats: decimal (base 10), hexadecimal (base 16 - prefixed with 0x), octal (base 8 - prefixed with 0) or binary (base 2 - prefixed with 0b)\r\n\r\nPHP has the following predefined constants for integers:\r\n\r\n*`PHP_INT_MAX` - The largest integer supported\r\n*`PHP_INT_MIN` - The smallest integer supported\r\n*`PHP_INT_SIZE` -  The size of an integer in bytes\r\n\r\nPHP has the following functions to check if the type of a variable is integer:\r\n\r\n*`is_int()`\r\n*`is_integer()` - alias of `is_int()`\r\n*`is_long()` - alias of `is_int()\r\n\r\n### Example\r\nCheck if the type of a variable is integer:\r\n```\r\n$x = 5985;\r\nvar_dump(is_int($x));\r\n\r\n$x = 59.85;\r\nvar_dump(is_int($x));\r\n```\r\n\r\nPHP Floats\r\nA float is a number with a decimal point or a number in exponential form.\r\n\r\n2.0, 256.4, 10.358, 7.64E+5, 5.56E-5 are all floats.\r\n\r\nThe float data type can commonly store a value up to 1.7976931348623E+308 (platform dependent), and have a maximum precision of 14 digits.\r\n\r\nPHP has the following predefined constants for floats (from PHP 7.2):\r\n\r\n*`PHP_FLOAT_MAX` - The largest representable floating point number\r\n*`PHP_FLOAT_MIN` - The smallest representable positive floating point number\r\n*`PHP_FLOAT_DIG` - The number of decimal digits that can be rounded into a float and back without precision loss\r\n*`PHP_FLOAT_EPSILON` - The smallest representable positive number x, so that x + 1.0 != 1.0\r\n\r\nPHP has the following functions to check if the type of a variable is float:\r\n\r\n*`is_float()`\r\n*`is_double()` - alias of `is_float()`\r\n\r\n### Example\r\nCheck if the type of a variable is float:\r\n```\r\n$x = 10.365;\r\nvar_dump(is_float($x));\r\n```\r\n# PHP Infinity\r\nA numeric value that is larger than `PHP_FLOAT_MAX` is considered infinite.\r\n\r\nPHP has the following functions to check if a numeric value is finite or infinite:\r\n\r\n*is_finite()\r\n*is_infinite()\r\n\r\nHowever, the `PHP var_dump()` function returns the data type and value:\r\n\r\nExample\r\nCheck if a numeric value is finite or infinite:\r\n```\r\n$x = 1.9e411;\r\nvar_dump($x);\r\n```\r\n\r\n## PHP NaN\r\n`NaN` stands for Not a Number.\r\n\r\n`NaN` is used for impossible mathematical operations.\r\n\r\nPHP has the following functions to check if a value is not a number:\r\n\r\n*`is_nan()`\r\n\r\nHowever, the PHP `var_dump()` function returns the data type and value:\r\n\r\nExample\r\nInvalid calculation will return a `NaN` value:\r\n```\r\n$x = acos(8);\r\nvar_dump($x);\r\n```\r\n\r\n## PHP Numerical Strings\r\nThe PHP `is_numeric()` function can be used to find whether a variable is numeric. The function returns true if the variable is a number or a numeric string, false otherwise.\r\n\r\nExample\r\nCheck if the variable is numeric:\r\n```\r\n$x = 5985;\r\nvar_dump(is_numeric($x));\r\n\r\n$x = \"5985\";\r\nvar_dump(is_numeric($x));\r\n$x = \"59.85\" + 100;\r\nvar_dump(is_numeric($x));\r\n\r\n$x = \"Hello\";\r\nvar_dump(is_numeric($x));\r\n```\r\n\r\n**Note**: From PHP 7.0: The `is_numeric()` function will return FALSE for numeric strings in hexadecimal form (e.g. 0xf4c3b00c), as they are no longer considered as numeric strings.\r\n\r\n## PHP Casting Strings and Floats to Integers\r\nSometimes you need to cast a numerical value into another data type.\r\n\r\nThe `(int)`, `(integer)`, and `intval()` functions are often used to convert a value to an integer.\r\n\r\n### Example\r\nCast float and string to integer:\r\n```\r\n// Cast float to int\r\n$x = 23465.768;\r\n$int_cast = (int)$x;\r\necho $int_cast;\r\n\r\necho \"<br>\";\r\n\r\n// Cast string to int\r\n$x = \"23465.768\";\r\n$int_cast = (int)$x;\r\necho $int_cast;\r\n```',0,'2024-10-19 06:04:24','2024-10-19 06:04:24'),(5,1,'PHP Math','# PHP MATH\r\nPHP has a set of math functions that allows you to perform mathematical tasks on numbers.\r\n\r\n## PHP pi() Function\r\nThe `pi()` function returns the value of PI:\r\n\r\nExample\r\n```\r\necho(pi());\r\n```\r\n\r\n## PHP min() and max() Functions\r\nThe `min()` and `max()` functions can be used to find the lowest or highest value in a list of arguments:\r\n\r\nExample\r\n```\r\necho(min(0, 150, 30, 20, -8, -200));\r\necho(max(0, 150, 30, 20, -8, -200));\r\n```\r\n\r\n## PHP abs() Function\r\nThe `abs()` function returns the absolute (positive) value of a number:\r\n\r\nExample\r\n```\r\necho(abs(-6.7));\r\n```\r\n\r\n## PHP sqrt() Function\r\nThe `sqrt()` function returns the square root of a number:\r\n\r\nExample\r\n```\r\necho(sqrt(64));\r\n```\r\n\r\n## PHP round() Function\r\nThe `round()` function rounds a floating-point number to its nearest integer:\r\n\r\nExample\r\n```\r\necho(round(0.60));\r\necho(round(0.49));\r\n```\r\n\r\n## Random Numbers\r\nThe `rand()` function generates a random number:\r\n\r\nExample\r\n```\r\necho(rand());\r\n```\r\n\r\nTo get more control over the random number, you can add the optional min and max parameters to specify the lowest integer and the highest integer to be returned.\r\n\r\nFor example, if you want a random integer between 10 and 100 (inclusive), use `rand(10, 100)`:\r\n\r\nExample\r\n```\r\necho(rand(10, 100));\r\n```\r\n\r\n',0,'2024-10-19 06:12:07','2024-10-19 06:12:07');
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `codeVenture`.`task_answers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `codeVenture`.`task_answers` ;

CREATE TABLE IF NOT EXISTS `codeVenture`.`task_answers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answers` BLOB NULL,
  `user_id` INT NOT NULL,
  `task_id` INT NOT NULL,
  `lesson_id` INT NOT NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_challenge_answers_materials1`
    FOREIGN KEY (`task_id`)
    REFERENCES `codeVenture`.`levels` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_challenge_answers_lessons1`
    FOREIGN KEY (`lesson_id`)
    REFERENCES `codeVenture`.`lessons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_task_answers_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `codeVenture`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_challenge_answers_materials1_idx` ON `codeVenture`.`task_answers` (`task_id` ASC) ;

CREATE INDEX `fk_challenge_answers_lessons1_idx` ON `codeVenture`.`task_answers` (`lesson_id` ASC) ;

CREATE INDEX `fk_task_answers_users1_idx` ON `codeVenture`.`task_answers` (`user_id` ASC) ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
