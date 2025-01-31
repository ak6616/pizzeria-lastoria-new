-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql7.freesqldatabase.com
-- Czas generowania: 02 Sty 2025, 22:36
-- Wersja serwera: 5.5.62-0ubuntu0.14.04.1
-- Wersja PHP: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `sql7748578`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `aktualnosci`
--

CREATE TABLE `aktualnosci` (
  `id` int(11) NOT NULL,
  `tytul` varchar(200) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `data` date DEFAULT NULL,
  `tekst` varchar(1000) COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `aktualnosci`
--

INSERT INTO `aktualnosci` (`id`, `tytul`, `data`, `tekst`) VALUES
(1, 'Powstała nowa strona internetowa', '2024-12-01', 'Od dzisiaj drodzy Państwo możecie zamawiać naszą pizzę na stronie, jednakże dowóz dotyczy tylko pizzerii Lastoria w Miejscu Piastowym'),
(2, 'Aktualizacja oferty Miejsce Piastowe', '2022-04-19', 'Prezentujemy Państwu nowe pozycje w lokalu w Miejscu Piastowym. Chodzi o nowe pizze dostępne dotychczas tylko w Haczowie. Serdecznie zapraszamy do zapoznania się z ofertą.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dodatki_hacz`
--

CREATE TABLE `dodatki_hacz` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `cena` int(11) DEFAULT NULL,
  `skladniki` varchar(200) COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dodatki_hacz`
--

INSERT INTO `dodatki_hacz` (`id`, `nazwa`, `cena`, `skladniki`) VALUES
(1, 'Gyros', 5, NULL),
(2, 'Szynka Parmeńska', 5, NULL),
(3, 'Owoce Morza', 5, NULL),
(4, 'Borowiki', 5, NULL),
(5, 'Kurczak', 5, NULL),
(6, 'Ser Żółty', 5, NULL),
(7, 'Pomidory Suszone', 4, NULL),
(9, 'Boczek', 4, NULL),
(10, 'Salami', 4, NULL),
(11, 'Szynka', 4, NULL),
(12, 'Tuńczyk', 4, NULL),
(13, 'Dodatki Warzywne', 2, NULL),
(14, 'Ser Feta', 3, NULL),
(15, 'Sos Czosnkowy', 2, NULL),
(16, 'Ser Pleśniowy', 3, NULL),
(17, 'Ser Wędzony', 3, NULL),
(18, 'Parmezan', 3, NULL),
(19, 'Ketchup', 2, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dodatki_mp`
--

CREATE TABLE `dodatki_mp` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `cena` int(11) DEFAULT NULL,
  `skladniki` varchar(200) COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dodatki_mp`
--

INSERT INTO `dodatki_mp` (`id`, `nazwa`, `cena`, `skladniki`) VALUES
(1, 'Gyros', 5, NULL),
(2, 'Szynka Parmeńska', 5, NULL),
(3, 'Owoce Morza', 5, NULL),
(4, 'Borowiki', 5, NULL),
(5, 'Kurczak', 5, NULL),
(6, 'Ser Żółty', 5, NULL),
(7, 'Pomidory Suszone', 5, NULL),
(9, 'Boczek', 4, NULL),
(10, 'Salami', 4, NULL),
(11, 'Szynka', 4, NULL),
(12, 'Tuńczyk', 4, NULL),
(13, 'Dodatki Warzywne', 3, NULL),
(14, 'Ser Feta', 3, NULL),
(15, 'Sos Grecki', 2, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dostawaweekday_hacz`
--

CREATE TABLE `dostawaweekday_hacz` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ilosc` int(11) NOT NULL,
  `koszt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dostawaweekday_hacz`
--

INSERT INTO `dostawaweekday_hacz` (`id`, `nazwa`, `ulica`, `ilosc`, `koszt`) VALUES
(1, 'targowiska', NULL, 1, 2),
(2, 'łężany', NULL, 1, 2),
(3, 'pustyny', NULL, 1, 2),
(4, 'iwonicz', NULL, 1, 2),
(5, 'wrocanka', NULL, 1, 2),
(6, 'rogi', NULL, 1, 2),
(7, 'głowienka', NULL, 1, 4),
(8, 'głowienka', NULL, 2, 2),
(9, 'niżna łąka', NULL, 1, 4),
(10, 'niżna łąka', NULL, 2, 2),
(11, 'widacz', NULL, 1, 4),
(12, 'widacz', NULL, 2, 2),
(13, 'lubatówka', NULL, 1, 4),
(14, 'lubatówka', NULL, 2, 2),
(15, 'równe', NULL, 1, 4),
(16, 'równe', NULL, 2, 2),
(17, 'głowienka', 'świętego jana', 1, 2),
(18, 'krosno', 'dębowa', 2, 4),
(19, 'krosno', 'dębowa', 3, 3),
(20, 'krosno', 'handlowa', 2, 4),
(21, 'krosno', 'handlowa', 3, 3),
(22, 'krosno', 'polna', 2, 4),
(23, 'krosno', 'polna', 3, 3),
(24, 'krosno', 'bolesława prusa', 2, 4),
(25, 'krosno', 'bolesława prusa', 3, 3),
(26, 'krosno', 'żniwna', 2, 4),
(27, 'krosno', 'żniwna', 3, 3),
(28, 'krosno', 'władysława stanisława reymonta', 2, 4),
(29, 'krosno', 'władysława stanisława reymonta', 3, 3),
(30, 'krosno', 'nad badoniem', 2, 4),
(31, 'krosno', 'nad badoniem', 3, 3),
(32, 'krosno', 'grunwaldzka', 2, 4),
(33, 'krosno', 'grunwaldzka', 3, 3),
(34, 'krosno', 'stanisława pigonia', 2, 4),
(35, 'krosno', 'stanisława pigonia', 3, 3),
(36, 'łęki dukielskie', NULL, 2, 4),
(37, 'łęki dukielskie', NULL, 3, 3),
(38, 'wietrzno', NULL, 2, 4),
(39, 'wietrzno', NULL, 3, 3),
(40, 'lubatowa', NULL, 2, 4),
(41, 'lubatowa', NULL, 3, 3),
(42, 'krościenko wyżne', NULL, 1, 4),
(43, 'krościenko wyżne', NULL, 2, 3),
(44, 'krościenko wyżne', NULL, 3, 2),
(45, 'krosno', 'suchodolska', 1, 4),
(46, 'krosno', 'suchodolska', 2, 3),
(47, 'krosno', 'suchodolska', 3, 2),
(56, 'równe', 'kopalniana', 1, 2),
(57, 'miejsce piastowe', NULL, 1, 0),
(58, 'malinówka', 'edit', 2, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dostawaweekday_mp`
--

CREATE TABLE `dostawaweekday_mp` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ilosc` int(11) NOT NULL,
  `koszt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dostawaweekday_mp`
--

INSERT INTO `dostawaweekday_mp` (`id`, `nazwa`, `ulica`, `ilosc`, `koszt`) VALUES
(1, 'targowiska', NULL, 1, 2),
(2, 'łężany', NULL, 1, 2),
(3, 'pustyny', NULL, 1, 2),
(4, 'iwonicz', NULL, 1, 2),
(5, 'wrocanka', NULL, 1, 2),
(6, 'rogi', NULL, 1, 2),
(7, 'głowienka', NULL, 1, 4),
(8, 'głowienka', NULL, 2, 2),
(9, 'niżna łąka', NULL, 1, 4),
(10, 'niżna łąka', NULL, 2, 2),
(11, 'widacz', NULL, 1, 4),
(12, 'widacz', NULL, 2, 2),
(13, 'lubatówka', NULL, 1, 4),
(14, 'lubatówka', NULL, 2, 2),
(15, 'równe', NULL, 1, 4),
(16, 'równe', NULL, 2, 2),
(17, 'głowienka', 'świętego jana', 1, 2),
(18, 'krosno', 'dębowa', 2, 4),
(19, 'krosno', 'dębowa', 3, 3),
(20, 'krosno', 'handlowa', 2, 4),
(21, 'krosno', 'handlowa', 3, 3),
(22, 'krosno', 'polna', 2, 4),
(23, 'krosno', 'polna', 3, 3),
(24, 'krosno', 'bolesława prusa', 2, 4),
(25, 'krosno', 'bolesława prusa', 3, 3),
(26, 'krosno', 'żniwna', 2, 4),
(27, 'krosno', 'żniwna', 3, 3),
(28, 'krosno', 'władysława stanisława reymonta', 2, 4),
(29, 'krosno', 'władysława stanisława reymonta', 3, 3),
(30, 'krosno', 'nad badoniem', 2, 4),
(31, 'krosno', 'nad badoniem', 3, 3),
(32, 'krosno', 'grunwaldzka', 2, 4),
(33, 'krosno', 'grunwaldzka', 3, 3),
(34, 'krosno', 'stanisława pigonia', 2, 4),
(35, 'krosno', 'stanisława pigonia', 3, 3),
(36, 'łęki dukielskie', NULL, 2, 4),
(37, 'łęki dukielskie', NULL, 3, 3),
(38, 'wietrzno', NULL, 2, 4),
(39, 'wietrzno', NULL, 3, 3),
(40, 'lubatowa', NULL, 2, 4),
(41, 'lubatowa', NULL, 3, 3),
(42, 'krościenko wyżne', NULL, 1, 4),
(43, 'krościenko wyżne', NULL, 2, 3),
(44, 'krościenko wyżne', NULL, 3, 2),
(45, 'krosno', 'suchodolska', 1, 4),
(46, 'krosno', 'suchodolska', 2, 3),
(47, 'krosno', 'suchodolska', 3, 2),
(56, 'równe', 'kopalniana', 1, 2),
(57, 'miejsce piastowe', NULL, 1, 0),
(58, 'test', 'edit', 2, 22);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dostawaweekend_hacz`
--

CREATE TABLE `dostawaweekend_hacz` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ilosc` int(11) NOT NULL,
  `koszt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dostawaweekend_hacz`
--

INSERT INTO `dostawaweekend_hacz` (`id`, `nazwa`, `ulica`, `ilosc`, `koszt`) VALUES
(1, 'targowiska', NULL, 1, 2),
(2, 'łężany', NULL, 1, 2),
(3, 'pustyny', NULL, 1, 2),
(4, 'iwonicz', NULL, 1, 2),
(5, 'wrocanka', NULL, 1, 2),
(6, 'rogi', NULL, 1, 2),
(7, 'łęki dukielskie', NULL, 2, 5),
(8, 'łęki dukielskie', NULL, 3, 4),
(9, 'wietrzno', NULL, 2, 5),
(10, 'wietrzno', NULL, 3, 4),
(11, 'lubatowa', NULL, 2, 5),
(12, 'lubatowa', NULL, 3, 4),
(13, 'głowienka', 'świętego jana', 1, 2),
(14, 'krosno', 'dębowa', 2, 5),
(15, 'krosno', 'dębowa', 3, 4),
(16, 'krosno', 'handlowa', 2, 5),
(17, 'krosno', 'handlowa', 3, 4),
(18, 'krosno', 'polna', 2, 5),
(19, 'krosno', 'polna', 3, 4),
(20, 'krosno', 'bolesława prusa', 2, 5),
(21, 'krosno', 'bolesława prusa', 3, 4),
(22, 'krosno', 'żniwna', 2, 5),
(23, 'krosno', 'żniwna', 3, 4),
(24, 'krosno', 'władysława stanisława reymonta', 2, 5),
(25, 'krosno', 'władysława stanisława reymonta', 3, 4),
(26, 'krosno', 'nad badoniem', 2, 5),
(27, 'krosno', 'nad badoniem', 3, 4),
(28, 'krosno', 'grunwaldzka', 2, 5),
(29, 'krosno', 'grunwaldzka', 3, 4),
(30, 'krosno', 'stanisława pigonia', 2, 5),
(31, 'krosno', 'stanisława pigonia', 3, 4),
(32, 'krosno', 'suchodolska', 1, 5),
(33, 'krosno', 'suchodolska', 2, 4),
(34, 'krosno', 'suchodolska', 3, 3),
(35, 'krościenko wyżne', NULL, 1, 5),
(36, 'krościenko wyżne', NULL, 2, 4),
(37, 'krościenko wyżne', NULL, 3, 3),
(38, 'głowienka', NULL, 1, 5),
(39, 'głowienka', NULL, 2, 3),
(40, 'niżna łąka', NULL, 1, 5),
(41, 'niżna łąka', NULL, 2, 3),
(42, 'widacz', NULL, 1, 5),
(43, 'widacz', NULL, 2, 3),
(44, 'lubatówka', NULL, 1, 5),
(45, 'lubatówka', NULL, 2, 3),
(46, 'równe', NULL, 1, 5),
(47, 'równe', NULL, 3, 3),
(48, 'równe', 'kopalniana', 1, 2),
(49, 'miejsce piastowe', NULL, 1, 0),
(50, 'malinówka', 'edit', 3, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dostawaweekend_mp`
--

CREATE TABLE `dostawaweekend_mp` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ilosc` int(11) NOT NULL,
  `koszt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dostawaweekend_mp`
--

INSERT INTO `dostawaweekend_mp` (`id`, `nazwa`, `ulica`, `ilosc`, `koszt`) VALUES
(1, 'targowiska', NULL, 1, 2),
(2, 'łężany', NULL, 1, 2),
(3, 'pustyny', NULL, 1, 2),
(4, 'iwonicz', NULL, 1, 2),
(5, 'wrocanka', NULL, 1, 2),
(6, 'rogi', NULL, 1, 2),
(7, 'łęki dukielskie', NULL, 2, 5),
(8, 'łęki dukielskie', NULL, 3, 4),
(9, 'wietrzno', NULL, 2, 5),
(10, 'wietrzno', NULL, 3, 4),
(11, 'lubatowa', NULL, 2, 5),
(12, 'lubatowa', NULL, 3, 4),
(13, 'głowienka', 'świętego jana', 1, 2),
(14, 'krosno', 'dębowa', 2, 5),
(15, 'krosno', 'dębowa', 3, 4),
(16, 'krosno', 'handlowa', 2, 5),
(17, 'krosno', 'handlowa', 3, 4),
(18, 'krosno', 'polna', 2, 5),
(19, 'krosno', 'polna', 3, 4),
(20, 'krosno', 'bolesława prusa', 2, 5),
(21, 'krosno', 'bolesława prusa', 3, 4),
(22, 'krosno', 'żniwna', 2, 5),
(23, 'krosno', 'żniwna', 3, 4),
(24, 'krosno', 'władysława stanisława reymonta', 2, 5),
(25, 'krosno', 'władysława stanisława reymonta', 3, 4),
(26, 'krosno', 'nad badoniem', 2, 5),
(27, 'krosno', 'nad badoniem', 3, 4),
(28, 'krosno', 'grunwaldzka', 2, 5),
(29, 'krosno', 'grunwaldzka', 3, 4),
(30, 'krosno', 'stanisława pigonia', 2, 5),
(31, 'krosno', 'stanisława pigonia', 3, 4),
(32, 'krosno', 'suchodolska', 1, 5),
(33, 'krosno', 'suchodolska', 2, 4),
(34, 'krosno', 'suchodolska', 3, 3),
(35, 'krościenko wyżne', NULL, 1, 5),
(36, 'krościenko wyżne', NULL, 2, 4),
(37, 'krościenko wyżne', NULL, 3, 3),
(38, 'głowienka', NULL, 1, 5),
(39, 'głowienka', NULL, 2, 3),
(40, 'niżna łąka', NULL, 1, 5),
(41, 'niżna łąka', NULL, 2, 3),
(42, 'widacz', NULL, 1, 5),
(43, 'widacz', NULL, 2, 3),
(44, 'lubatówka', NULL, 1, 5),
(45, 'lubatówka', NULL, 2, 3),
(46, 'równe', NULL, 1, 5),
(47, 'równe', NULL, 3, 3),
(48, 'równe', 'kopalniana', 1, 2),
(49, 'miejsce piastowe', NULL, 1, 0),
(50, 'test', 'edit', 22, 22);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `fastfood_hacz`
--

CREATE TABLE `fastfood_hacz` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `cena` int(11) DEFAULT NULL,
  `skladniki` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `fastfood_hacz`
--

INSERT INTO `fastfood_hacz` (`id`, `nazwa`, `cena`, `skladniki`) VALUES
(1, 'Hamburger', 9, NULL),
(2, 'Cheeseburger', 10, NULL),
(3, 'Małe Frytki', 8, NULL),
(4, 'Frytki małe z serem', 10, NULL),
(5, 'Frytki duże', 10, NULL),
(6, 'Frytki duże z serem', 13, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `fastfood_mp`
--

CREATE TABLE `fastfood_mp` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `cena` int(11) DEFAULT NULL,
  `skladniki` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `fastfood_mp`
--

INSERT INTO `fastfood_mp` (`id`, `nazwa`, `cena`, `skladniki`) VALUES
(1, 'Hamburger', 10, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `galeria`
--

CREATE TABLE `galeria` (
  `id` int(11) NOT NULL,
  `link` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `galeria`
--

INSERT INTO `galeria` (`id`, `link`) VALUES
(21, 'https://i.postimg.cc/Vk1KW4Lg/10.jpg'),
(22, 'https://i.postimg.cc/cLmX9YvS/11.jpg'),
(23, 'https://i.postimg.cc/fbq5ZN7q/12.jpg'),
(24, 'https://i.postimg.cc/wBjFSvNs/13.jpg'),
(25, 'https://i.postimg.cc/bJGgwB3y/14.jpg'),
(26, 'https://i.postimg.cc/KzdNkDHn/15.jpg'),
(27, 'https://i.postimg.cc/d3r98Zbg/16.jpg'),
(28, 'https://i.postimg.cc/QNTSLvFS/17.jpg'),
(29, 'https://i.postimg.cc/tgryjYM0/1.jpg'),
(30, 'https://i.postimg.cc/zG7YCy5L/10.jpg'),
(31, 'https://i.postimg.cc/JhdwFSsM/11.jpg'),
(32, 'https://i.postimg.cc/xddDt9T6/12.jpg'),
(33, 'https://i.postimg.cc/1zRP2pMc/2.jpg'),
(34, 'https://i.postimg.cc/G2HRhdW4/3.jpg'),
(35, 'https://i.postimg.cc/0QFszhvc/4.jpg'),
(36, 'https://i.postimg.cc/T1bXgQYG/5.jpg'),
(37, 'https://i.postimg.cc/3r0hsrj6/6.jpg'),
(38, 'https://i.postimg.cc/xTK2ds43/7.jpg'),
(39, 'https://i.postimg.cc/28pYrp25/8.jpg'),
(40, 'https://i.postimg.cc/htcqQLFW/9.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `miejscowosci_hacz`
--

CREATE TABLE `miejscowosci_hacz` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(100) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `ulica` varchar(200) COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `miejscowosci_hacz`
--

INSERT INTO `miejscowosci_hacz` (`id`, `nazwa`, `ulica`) VALUES
(1, 'głowienka', NULL),
(2, 'krosno', 'dębowa'),
(3, 'krosno', 'handlowa'),
(4, 'krosno', 'polna'),
(5, 'krosno', 'bolesława prusa'),
(6, 'krosno', 'żniwna'),
(7, 'krosno', 'władysława stanisława reymonta'),
(8, 'krosno', 'nad badoniem'),
(9, 'krosno', 'grunwaldzka'),
(10, 'krosno', 'stanisława pigonia'),
(11, 'krosno', 'suchodolska'),
(12, 'targowiska', NULL),
(13, 'łężany', NULL),
(14, 'pustyny', NULL),
(15, 'iwonicz', NULL),
(16, 'wrocanka', NULL),
(17, 'rogi', NULL),
(18, 'łęki dukielskie', NULL),
(19, 'niżna łąka', NULL),
(20, 'widacz', NULL),
(21, 'lubatówka', NULL),
(22, 'równe', NULL),
(23, 'krościenko wyżne', NULL),
(24, 'wietrzno', NULL),
(25, 'lubatowa', NULL),
(26, 'miejsce piastowe', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `miejscowosci_mp`
--

CREATE TABLE `miejscowosci_mp` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `ulica` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `miejscowosci_mp`
--

INSERT INTO `miejscowosci_mp` (`id`, `nazwa`, `ulica`) VALUES
(1, 'głowienka', NULL),
(2, 'krosno', 'dębowa'),
(3, 'krosno', 'handlowa'),
(4, 'krosno', 'polna'),
(5, 'krosno', 'bolesława prusa'),
(6, 'krosno', 'żniwna'),
(7, 'krosno', 'władysława stanisława reymonta'),
(8, 'krosno', 'nad badoniem'),
(9, 'krosno', 'grunwaldzka'),
(10, 'krosno', 'stanisława pigonia'),
(11, 'krosno', 'suchodolska'),
(12, 'targowiska', NULL),
(13, 'łężany', NULL),
(14, 'pustyny', NULL),
(15, 'iwonicz', NULL),
(16, 'wrocanka', NULL),
(17, 'rogi', NULL),
(18, 'łęki dukielskie', NULL),
(19, 'niżna łąka', NULL),
(20, 'widacz', NULL),
(21, 'lubatówka', NULL),
(22, 'równe', NULL),
(23, 'krościenko wyżne', NULL),
(24, 'wietrzno', NULL),
(25, 'lubatowa', NULL),
(26, 'miejsce piastowe', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `napoje_hacz`
--

CREATE TABLE `napoje_hacz` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `cena` int(11) DEFAULT NULL,
  `skladniki` varchar(200) COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `napoje_mp`
--

CREATE TABLE `napoje_mp` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `cena` int(11) DEFAULT NULL,
  `skladniki` varchar(200) COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `napoje_mp`
--

INSERT INTO `napoje_mp` (`id`, `nazwa`, `cena`, `skladniki`) VALUES
(1, 'Coca Cola 1L', 10, NULL),
(2, 'Celestynka Czysta 0.33L', 2, NULL),
(3, 'Celestynka Cola 0.33L', 3, NULL),
(4, 'Celestynka Pomarańcza 0.33L', 3, NULL),
(5, 'Celestynka Wieloowocowa 0.33L', 3, NULL),
(6, 'Celestynka Cytryna 0.33L', 3, NULL),
(7, 'Celestynka Grejfrut 0.33L', 3, NULL),
(8, 'Celestynka Oranżada 0.33L', 3, NULL),
(9, 'Pepsi 0.5L', 7, NULL),
(10, 'Pepsi 0.85L', 10, NULL),
(11, 'Tymbark Jabłko-Mięta 0.33L', 4, NULL),
(12, 'Tymbark Jabłko-Wiśnia 0.33L', 4, NULL),
(13, 'Tymbark Jabłko-Brzoskwinia 0.3', 4, NULL),
(14, 'Tymbark Jabłko-Mango 0.33L', 4, NULL),
(15, 'Sok Kaktus 1L', 10, NULL),
(16, 'Sok Banan 1L', 10, NULL),
(17, 'Sok Pomarańcza 1L', 10, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pizza_hacz`
--

CREATE TABLE `pizza_hacz` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `cena` varchar(2) CHARACTER SET utf8mb4 DEFAULT NULL,
  `skladniki` varchar(200) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `pizza_hacz`
--

INSERT INTO `pizza_hacz` (`id`, `nazwa`, `cena`, `skladniki`) VALUES
(1, 'Marcherita', '24', 'sos pomidorowy, mozzarella, kukurydza, ser żółty, zioła, oregano'),
(2, 'Zwyczajna', '26', 'sos pomidorowy, mozzarella, pieczarki, papryka, ser żółty, zioła, oregano'),
(3, 'Wegetarianska', '28', 'sos pomidorowy, mozzarella, pieczarki, oliwki, papryka, kukurydza, cebula, ser żółty, zioła, oregano'),
(4, 'Szynkowa', '27', 'sos pomidorowy, mozzarella, szynka, papryka, ser żółty, zioła, oregano'),
(5, 'Tradycyjna', '31', 'sos pomidorowy, mozzarella, szynka, pieczarki, oliwki, kukurydza, papryka, ser żółty, zioła, oregano'),
(6, 'Salami', '27', 'sos pomidorowy, mozzarella, salami, papryka, ser żółty, zioła, oregano'),
(7, 'Diabelska (Pikantna)', '31', 'sos pomidorowy, mozzarella, salami, pieczarki, peperoni, kukurydza, oliwki, papryka, chili, ser żółty, zioła, oregano'),
(8, 'Z Tuńczykiem', '28', 'sos pomidorowy, mozzarella, tuńczyk, cebula, ser żółty, papryka, zioła, oregano'),
(9, 'Marynarska', '30', 'sos pomidorowy, mozzarella, tuńczyk, oliwki, pieczarki, papryka, ser żółty, zioła, oregano'),
(10, 'Firmowa', '32', 'sos pomidorowy, mozzarella, boczek, szynka, cebula, czosnek, pieczarki, oliwki, kukurydza, ser żółty, papryka, zioła, oregano'),
(11, 'Kurczak (Pikantna)', '32', 'sos pomidorowy, mozzarella, filet z kurczaka, cebula, peperoni, ser żółty, papryka, zioła, oregano'),
(12, 'Kurczak (Łagodna)', '32', 'sos pomidorowy, mozzarella, filet z kurczaka, pieczarki, oliwki, ser żółty, papryka, zioła, oregano'),
(13, 'Kurczak z Ananasem', '32', 'sos pomidorowy, mozzarella, filet z kurczaka, ananas, kukurydza, papryka, ser żółty, zioła, oregano'),
(14, 'Gyros', '32', 'sos pomidorowy, mozzarella, gyros pieczony, cebula, papryka, pieczarki, ser żółty, sos grecki, oliwki, zioła, oregano'),
(15, 'Owoce Morza', '32', 'sos pomidorowy, mozzarella, owoce morza, tuńczyk, cytryna, ser żółty, papryka, zioła, oregano'),
(16, 'Domowa', '28', 'sos pomidorowy, mozzarella, szynka, salami, pieczarki, papryka, ser żółty, zioła, oregano'),
(17, 'Salami i Kurczak', '32', 'sos pomidorowy, mozzarella, kurczak, salami, pieczarki, papryka, ser żółty, fasolka czerwona, zioła, oregano'),
(18, 'Szynkowa Normalna', '28', 'sos pomidorowy, mozzarella, szynka, pieczarki, papryka, ser żółty, zioła, oregano'),
(19, 'Super Wegetariańska', '28', 'sos pomidorowy, mozzarella, pieczarki, papryka, kukurydza, fasolka czerwona, groszek, ser żółty, zioła, oregano'),
(20, 'Wiejska', '32', 'sos pomidorowy, mozzarella, boczek, kiełbasa, ogórek, pieczarki, papryka, cebula, czosnek, ser żółty, zioła, oregano'),
(21, 'Jarska', '29', 'sos pomidorowy, mozzarella, pomidor, ogórek, groszek, papryka, brokuły, ser żółty, zioła, oregano'),
(22, 'Hawajska', '28', 'sos pomidorowy, mozzarella, szynka, ananas, kukurydza, ser żółty, zioła, oregano'),
(23, 'Szynkowa Extra', '29', 'sos pomidorowy, mozzarella, szynka, papryka, kapary, ser żółty, zioła, oregano'),
(24, 'Gyros Max', '32', 'sos pomidorowy, mozzarella, gyros, ogórek, pomidor, ser feta, oliwki, sos grecki, ser żółty, zioła, oregano'),
(25, 'Tropicana', '32', 'sos pomidorowy, mozzarella, kurczak, brzoskwinia, ananas, szynka, ser żółty, zioła oregano'),
(26, 'Gustoza', '29', 'sos pomidorowy, mozzarella, kiełbasa, brokuły, papryka, ser żółty, zioła, oregano'),
(27, 'Delicat', '27', 'sos pomidorowy, mozzarella, brzoskwinia, ananas, ser żółty, zioła, oregano'),
(28, 'Grecka', '30', 'sos pomidorowy, mozzarella, pomidor, ogórek, cebula, papryka, oliwki, ser feta, ser żółty, zioła, oregano'),
(29, 'Meksykanska', '30', 'sos pomidorowy, mozzarella, salami, oliwki, kapary, tabasco, chili, ser żółty, zioła, oregano'),
(30, 'Cztery Sery', '31', 'sos pomidorowy, ser parmezan, ser pleśniowy, ser feta, ser żółty, zioła, oregano'),
(31, 'Parmezana', '34', 'sos pomidorowy, mozzarella, ser parmezan, szynka parmeńska, pomidorki koktajlowe, rukola, ser żółty, zioła, oregano'),
(32, 'Szpinakowa', '31', 'sos pomidorowy, mozzarella, szpinak, pomidory suszone, ser feta, ser żółty, zioła, oregano'),
(33, 'Z Rukolą', '30', 'sos pomidorowy, mozzarella, salami lub szynka (do wyboru), rukola, ser parmezan, ser żółty, zioła, oregano'),
(34, 'Grzybowa', '32', 'sos pomidorowy, mozzarella, borowiki, pieczarki, podgrzybki, ser parmezan, ser żółty, zioła, oregano'),
(35, 'Borowikowa', '33', 'sos pomidorowy, mozzarella, borowiki, boczek, cebula, ser parmezan, oliwki, ser żółty, zioła, oregano'),
(36, 'Żurawinowa', '31', 'sos pomidorowy, mozzarella, ser wędzony, żurawina, rukola, ser żółty, zioła, oregano'),
(37, 'Uczta Serowa', '31', 'sos pomidorowy, ser parmezan, ser pleśniowy, ser wędzony, ser żółty, zioła, oregano'),
(38, 'Szpinakowa_extra', '32', 'sos pomidorowy, mozzarella, szpinak, kurczak, cebula, czosnek, ser żółty, zioła, oregano');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pizza_mp`
--

CREATE TABLE `pizza_mp` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `cena` varchar(2) CHARACTER SET utf8mb4 DEFAULT NULL,
  `skladniki` varchar(200) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `pizza_mp`
--

INSERT INTO `pizza_mp` (`id`, `nazwa`, `cena`, `skladniki`) VALUES
(1, 'Marcherita', '25', 'sos pomidorowy, mozzarella, kukurydza, ser żółty, zioła, oregano'),
(2, 'Zwyczajna', '26', 'sos pomidorowy, mozzarella, pieczarki, papryka, ser żółty, zioła, oregano'),
(3, 'Wegetariańska', '27', 'sos pomidorowy, mozzarella, pieczarki, oliwki, papryka, kukurydza, cebula, ser żółty, zioła, oregano'),
(4, 'Szynkowa', '27', 'sos pomidorowy, mozzarella, szynka, papryka, ser żółty, zioła, oregano'),
(5, 'Tradycyjna', '30', 'sos pomidorowy, mozzarella, szynka, pieczarki, oliwki, kukurydza, papryka, ser żółty, zioła, oregano'),
(6, 'Salami', '27', 'sos pomidorowy, mozzarella, salami, papryka, ser żółty, zioła, oregano'),
(7, 'Diabelska (Pikantna)', '30', 'sos pomidorowy, mozzarella, salami, pieczarki, peperoni, kukurydza, oliwki, papryka, chili, ser żółty, zioła, oregano'),
(8, 'Z Tuńczykiem', '28', 'sos pomidorowy, mozzarella, tuńczyk, cebula, ser żółty, papryka, zioła, oregano'),
(9, 'Marynarska', '30', 'sos pomidorowy, mozzarella, tuńczyk, oliwki, pieczarki, papryka, ser żółty, zioła, oregano'),
(10, 'Firmowa', '31', 'sos pomidorowy, mozzarella, boczek, szynka, cebula, czosnek, pieczarki, oliwki, kukurydza, ser żółty, papryka, zioła, oregano'),
(11, 'Kurczak (Pikantna)', '31', 'sos pomidorowy, mozzarella, filet z kurczaka, cebula, peperoni, ser żółty, papryka, zioła, oregano'),
(12, 'Kurczak (Łagodna)', '31', 'sos pomidorowy, mozzarella, filet z kurczaka, pieczarki, oliwki, ser żółty, papryka, zioła, oregano'),
(13, 'Kurczak (z Ananasem)', '31', 'sos pomidorowy, mozzarella, filet z kurczaka, ananas, kukurydza, papryka, ser żółty, zioła, oregano'),
(14, 'Gyros', '32', 'sos pomidorowy, mozzarella, gyros pieczony, cebula, papryka, pieczarki, ser żółty, sos grecki, oliwki, zioła, oregano'),
(15, 'Owoce Morza', '32', 'sos pomidorowy, mozzarella, owoce morza, tuńczyk, cytryna, ser żółty, papryka, zioła, oregano'),
(16, 'Domowa', '28', 'sos pomidorowy, mozzarella, szynka, salami, pieczarki, papryka, ser żółty, zioła, oregano'),
(17, 'Salami i Kurczak', '31', 'sos pomidorowy, mozzarella, kurczak, salami, pieczarki, papryka, ser żółty, fasolka czerwona, zioła, oregano'),
(18, 'Szynkowa Normalna', '28', 'sos pomidorowy, mozzarella, szynka, pieczarki, papryka, ser żółty, zioła, oregano'),
(19, 'Super Wegetariańska', '28', 'sos pomidorowy, mozzarella, pieczarki, papryka, kukurydza, fasolka czerwona, groszek, ser żółty, zioła, oregano'),
(20, 'Wiejska', '31', 'sos pomidorowy, mozzarella, boczek, kiełbasa, ogórek, pieczarki, papryka, cebula, czosnek, ser żółty, zioła, oregano'),
(21, 'Jarska', '29', 'sos pomidorowy, mozzarella, pomidor, ogórek, groszek, papryka, brokuły, ser żółty, zioła, oregano'),
(22, 'Hawajska', '28', 'sos pomidorowy, mozzarella, szynka, ananas, kukurydza, ser żółty, zioła, oregano'),
(23, 'Szynkowa Extra', '29', 'sos pomidorowy, mozzarella, szynka, papryka, kapary, ser żółty, zioła, oregano'),
(24, 'Gyros Max', '32', 'sos pomidorowy, mozzarella, gyros, ogórek, pomidor, ser feta, oliwki, sos grecki, ser żółty, zioła, oregano'),
(25, 'Tropicana', '31', 'sos pomidorowy, mozzarella, kurczak, brzoskwinia, ananas, szynka, ser żółty, zioła oregano'),
(26, 'Gustoza', '29', 'sos pomidorowy, mozzarella, kiełbasa, brokuły, papryka, ser żółty, zioła, oregano'),
(27, 'Delicat', '27', 'sos pomidorowy, mozzarella, brzoskwinia, ananas, ser żółty, zioła, oregano'),
(28, 'Grecka', '30', 'sos pomidorowy, mozzarella, pomidor, ogórek, cebula, papryka, oliwki, ser feta, ser żółty, zioła, oregano'),
(29, 'Meksykańska', '30', 'sos pomidorowy, mozzarella, salami, oliwki, kapary, tabasco, chili, ser żółty, zioła, oregano'),
(30, 'Cztery Sery', '30', 'sos pomidorowy, ser parmezan, ser pleśniowy, ser feta, ser żółty, zioła, oregano'),
(31, 'Parmezana', '34', 'sos pomidorowy, mozzarella, ser parmezan, szynka parmeńska, pomidorki koktajlowe, rukola, ser żółty, zioła, oregano'),
(32, 'Szpinakowa', '31', 'sos pomidorowy, mozzarella, szpinak, pomidory suszone, ser feta, ser żółty, zioła, oregano'),
(33, 'Z Rukolą', '31', 'sos pomidorowy, mozzarella, salami lub szynka (do wyboru), rukola, ser parmezan, ser żółty, zioła, oregano'),
(34, 'Grzybowa', '33', 'sos pomidorowy, mozzarella, borowiki, pieczarki, podgrzybki, ser parmezan, ser żółty, zioła, oregano'),
(35, 'Borowikowa', '33', 'sos pomidorowy, mozzarella, borowiki, boczek, cebula, ser parmezan, oliwki, ser żółty, zioła, oregano'),
(36, 'Żurawinowa', '32', 'sos pomidorowy, mozzarella, ser wędzony, żurawina, rukola, ser żółty, zioła, oregano'),
(37, 'Uczta Serowa', '31', 'sos pomidorowy, ser parmezan, ser pleśniowy, ser wędzony, ser żółty, zioła, oregano'),
(38, 'Szpinakowa Extra', '31', 'sos pomidorowy, mozzarella, szpinak, kurczak, cebula, czosnek, ser żółty, zioła, oregano');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `password` varchar(30) COLLATE utf8mb4_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienia_hacz`
--

CREATE TABLE `zamowienia_hacz` (
  `id` int(11) NOT NULL,
  `imie` varchar(20) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `nazwisko` varchar(20) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `miejscowosc` varchar(20) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `ulica` varchar(30) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `numerDomu` int(11) DEFAULT NULL,
  `numerMieszkania` int(11) DEFAULT NULL,
  `numerTelefonu` varchar(12) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `dataGodzinaZamowienia` varchar(40) COLLATE utf8mb4_polish_ci NOT NULL,
  `zamowienieNaGodzine` varchar(10) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `zamowioneProdukty` varchar(3000) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `suma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienia_mp`
--

CREATE TABLE `zamowienia_mp` (
  `id` int(11) NOT NULL,
  `imie` varchar(20) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `nazwisko` varchar(20) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `miejscowosc` varchar(20) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `ulica` varchar(30) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `numerDomu` int(11) DEFAULT NULL,
  `numerMieszkania` int(11) DEFAULT NULL,
  `numerTelefonu` varchar(12) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `dataGodzinaZamowienia` varchar(40) COLLATE utf8mb4_polish_ci NOT NULL,
  `zamowienieNaGodzine` varchar(10) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `zamowioneProdukty` varchar(3000) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `suma` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `aktualnosci`
--
ALTER TABLE `aktualnosci`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dodatki_hacz`
--
ALTER TABLE `dodatki_hacz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dodatki_mp`
--
ALTER TABLE `dodatki_mp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dostawaweekday_hacz`
--
ALTER TABLE `dostawaweekday_hacz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dostawaweekday_mp`
--
ALTER TABLE `dostawaweekday_mp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dostawaweekend_hacz`
--
ALTER TABLE `dostawaweekend_hacz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dostawaweekend_mp`
--
ALTER TABLE `dostawaweekend_mp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fastfood_hacz`
--
ALTER TABLE `fastfood_hacz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fastfood_mp`
--
ALTER TABLE `fastfood_mp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `galeria`
--
ALTER TABLE `galeria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `miejscowosci_hacz`
--
ALTER TABLE `miejscowosci_hacz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `miejscowosci_mp`
--
ALTER TABLE `miejscowosci_mp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `napoje_hacz`
--
ALTER TABLE `napoje_hacz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `napoje_mp`
--
ALTER TABLE `napoje_mp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pizza_hacz`
--
ALTER TABLE `pizza_hacz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pizza_mp`
--
ALTER TABLE `pizza_mp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zamowienia_hacz`
--
ALTER TABLE `zamowienia_hacz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zamowienia_mp`
--
ALTER TABLE `zamowienia_mp`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `aktualnosci`
--
ALTER TABLE `aktualnosci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT dla tabeli `dodatki_hacz`
--
ALTER TABLE `dodatki_hacz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT dla tabeli `dodatki_mp`
--
ALTER TABLE `dodatki_mp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT dla tabeli `dostawaweekday_hacz`
--
ALTER TABLE `dostawaweekday_hacz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
--
-- AUTO_INCREMENT dla tabeli `dostawaweekday_mp`
--
ALTER TABLE `dostawaweekday_mp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT dla tabeli `dostawaweekend_hacz`
--
ALTER TABLE `dostawaweekend_hacz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;
--
-- AUTO_INCREMENT dla tabeli `dostawaweekend_mp`
--
ALTER TABLE `dostawaweekend_mp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT dla tabeli `fastfood_hacz`
--
ALTER TABLE `fastfood_hacz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT dla tabeli `fastfood_mp`
--
ALTER TABLE `fastfood_mp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT dla tabeli `galeria`
--
ALTER TABLE `galeria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT dla tabeli `miejscowosci_hacz`
--
ALTER TABLE `miejscowosci_hacz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT dla tabeli `miejscowosci_mp`
--
ALTER TABLE `miejscowosci_mp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT dla tabeli `napoje_hacz`
--
ALTER TABLE `napoje_hacz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT dla tabeli `napoje_mp`
--
ALTER TABLE `napoje_mp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT dla tabeli `pizza_hacz`
--
ALTER TABLE `pizza_hacz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
--
-- AUTO_INCREMENT dla tabeli `pizza_mp`
--
ALTER TABLE `pizza_mp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT dla tabeli `zamowienia_hacz`
--
ALTER TABLE `zamowienia_hacz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT dla tabeli `zamowienia_mp`
--
ALTER TABLE `zamowienia_mp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
