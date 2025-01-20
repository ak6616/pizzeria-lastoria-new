-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql7.freesqldatabase.com
-- Czas generowania: 01 Gru 2024, 13:09
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
-- Struktura tabeli dla tabeli `dodatki`
--

CREATE TABLE `dodatki` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `cena` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dodatki`
--

INSERT INTO `dodatki` (`id`, `nazwa`, `cena`) VALUES
(1, 'gyros', 5),
(2, 'szynka_parmenska', 5),
(3, 'owoce_morza', 5),
(4, 'borowiki', 5),
(5, 'kurczak', 5),
(6, 'ser_zolty', 5),
(7, 'pomidory_suszone', 5),
(9, 'boczek', 4),
(10, 'salami', 4),
(11, 'szynka', 4),
(12, 'tunczyk', 4),
(13, 'dodatki_warzywne', 3),
(14, 'ser_feta', 3),
(15, 'sos_grecki', 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dostawaweekday`
--

CREATE TABLE `dostawaweekday` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ilosc` int(11) NOT NULL,
  `koszt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dostawaweekday`
--

INSERT INTO `dostawaweekday` (`id`, `nazwa`, `ulica`, `ilosc`, `koszt`) VALUES
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
(56, 'równe', 'kopalniana', 1, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dostawaweekend`
--

CREATE TABLE `dostawaweekend` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ulica` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `ilosc` int(11) NOT NULL,
  `koszt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `dostawaweekend`
--

INSERT INTO `dostawaweekend` (`id`, `nazwa`, `ulica`, `ilosc`, `koszt`) VALUES
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
(48, 'równe', 'kopalniana', 1, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `fastfood`
--

CREATE TABLE `fastfood` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL,
  `cena` int(11) DEFAULT NULL,
  `skladniki` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `fastfood`
--

INSERT INTO `fastfood` (`id`, `nazwa`, `cena`, `skladniki`) VALUES
(1, 'hamburger', 10, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `galeria`
--

CREATE TABLE `galeria` (
  `id` int(11) NOT NULL,
  `link` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `klienci`
--

CREATE TABLE `klienci` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `surname` varchar(20) DEFAULT NULL,
  `place` varchar(50) DEFAULT NULL,
  `street` varchar(50) NOT NULL,
  `homeNumber` int(11) NOT NULL,
  `phone` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `klienci`
--

INSERT INTO `klienci` (`id`, `name`, `surname`, `place`, `street`, `homeNumber`, `phone`) VALUES
(28, 'test', 'kowalski', 'miejsce piastowe', 'dukielska', 42, '123456789'),
(29, 'adrian', 'kowalski', 'krosno', 'dukielska', 42, '123456789'),
(30, 'Anna', 'Józefczyk', 'miejsce piastowe', 'Malinówka', 42, '669853238'),
(31, 'Anna', 'Józefczyk', 'rogi', 'domino', 42, '669853238'),
(32, 'Anna', 'Józefczyk', 'rogi', 'Malinówka', 152, '669853238'),
(33, 'Anna', 'Józefczyk', 'rogi', 'Malinówka', 153, '669853238');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `miejscowosci`
--

CREATE TABLE `miejscowosci` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `ulica` varchar(200) CHARACTER SET latin1 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `miejscowosci`
--

INSERT INTO `miejscowosci` (`id`, `nazwa`, `ulica`) VALUES
(1, 'g?owienka', NULL),
(2, 'krosno', 'd?bowa'),
(3, 'krosno', 'handlowa'),
(4, 'krosno', 'polna'),
(5, 'krosno', 'boles?awa prusa'),
(6, 'krosno', '?niwna'),
(7, 'krosno', 'w?adys?awa stanis?awa reymonta'),
(8, 'krosno', 'nad badoniem'),
(9, 'krosno', 'grunwaldzka'),
(10, 'krosno', 'stanis?awa pigonia'),
(11, 'krosno', 'suchodolska'),
(12, 'targowiska', NULL),
(13, '???any', NULL),
(14, 'pustyny', NULL),
(15, 'iwonicz', NULL),
(16, 'wrocanka', NULL),
(17, 'rogi', NULL),
(18, '??ki dukielskie', NULL),
(19, 'ni?na ??ka', NULL),
(20, 'widacz', NULL),
(21, 'lubatówka', NULL),
(22, 'równe', NULL),
(23, 'kro?cienko wy?ne', NULL),
(24, 'wietrzno', NULL),
(25, 'lubatowa', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `napoje`
--

CREATE TABLE `napoje` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `cena` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `napoje`
--

INSERT INTO `napoje` (`id`, `nazwa`, `cena`) VALUES
(1, 'coca cola 1L', 10),
(2, 'celestynka czysta 0.33L', 2),
(3, 'celestynka cola', 3),
(4, 'celestynka pomarańcza 0.33L', 3),
(5, 'celestynka wieloowocowa 0.33L', 3),
(6, 'celestynka cytryna 0.33L', 3),
(7, 'celestynka grejfrut 0.33L', 3),
(8, 'celestynka oranżada 0.33L', 3),
(9, 'pepsi 0.5L', 7),
(10, 'pepsi 0.85L', 10),
(11, 'tymbark jabłko-mięta 0.33L', 4),
(12, 'tymbark jabłko-wiśnia 0.33L', 4),
(13, 'tymbark jabłko-brzosk 0.33L', 4),
(14, 'tymbark jab?ko-mango', 4),
(15, 'sok kaktus 1L', 10),
(16, 'sok banan 1L', 10),
(17, 'sok pomarańcza 1L', 10);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pizza`
--

CREATE TABLE `pizza` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `cena` varchar(2) CHARACTER SET utf8mb4 DEFAULT NULL,
  `skladniki` varchar(200) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `pizza`
--

INSERT INTO `pizza` (`id`, `nazwa`, `cena`, `skladniki`) VALUES
(1, 'Marcherita', '25', 'sos pomidorowy, mozzarella, kukurydza, ser żółty, zioła, oregano'),
(2, 'Zwyczajna', '26', 'sos pomidorowy, mozzarella, pieczarki, papryka, ser żółty, zioła, oregano'),
(3, 'Wegetarianska', '27', 'sos pomidorowy, mozzarella, pieczarki, oliwki, papryka, kukurydza, cebula, ser żółty, zioła, oregano'),
(4, 'Szynkowa', '27', 'sos pomidorowy, mozzarella, szynka, papryka, ser żółty, zioła, oregano'),
(5, 'Tradycyjna', '30', 'sos pomidorowy, mozzarella, szynka, pieczarki, oliwki, kukurydza, papryka, ser żółty, zioła, oregano'),
(6, 'Salami', '27', 'sos pomidorowy, mozzarella, salami, papryka, ser żółty, zioła, oregano'),
(7, 'Diabelska', '30', 'sos pomidorowy, mozzarella, salami, pieczarki, peperoni, kukurydza, oliwki, papryka, chili, ser żółty, zioła, oregano'),
(8, 'Z_Tunczykiem', '28', 'sos pomidorowy, mozzarella, tuńczyk, cebula, ser żółty, papryka, zioła, oregano'),
(9, 'Marynarska', '30', 'sos pomidorowy, mozzarella, tuńczyk, oliwki, pieczarki, papryka, ser żółty, zioła, oregano'),
(10, 'Firmowa', '31', 'sos pomidorowy, mozzarella, boczek, szynka, cebula, czosnek, pieczarki, oliwki, kukurydza, ser żółty, papryka, zioła, oregano'),
(11, 'Kurczak_Pikantna', '31', 'sos pomidorowy, mozzarella, filet z kurczaka, cebula, peperoni, ser żółty, papryka, zioła, oregano'),
(12, 'Kurczak_Lagodna', '31', 'sos pomidorowy, mozzarella, filet z kurczaka, pieczarki, oliwki, ser żółty, papryka, zioła, oregano'),
(13, 'Kurczak_Ananas', '31', 'sos pomidorowy, mozzarella, filet z kurczaka, ananas, kukurydza, papryka, ser żółty, zioła, oregano'),
(14, 'Gyros', '32', 'sos pomidorowy, mozzarella, gyros pieczony, cebula, papryka, pieczarki, ser żółty, sos grecki, oliwki, zioła, oregano'),
(15, 'Owoce_morza', '32', 'sos pomidorowy, mozzarella, owoce morza, tuńczyk, cytryna, ser żółty, papryka, zioła, oregano'),
(16, 'Domowa', '28', 'sos pomidorowy, mozzarella, szynka, salami, pieczarki, papryka, ser żółty, zioła, oregano'),
(17, 'Salami_Kura', '31', 'sos pomidorowy, mozzarella, kurczak, salami, pieczarki, papryka, ser żółty, fasolka czerwona, zioła, oregano'),
(18, 'Szynkowa_norm', '28', 'sos pomidorowy, mozzarella, szynka, pieczarki, papryka, ser żółty, zioła, oregano'),
(19, 'Super_wege', '28', 'sos pomidorowy, mozzarella, pieczarki, papryka, kukurydza, fasolka czerwona, groszek, ser żółty, zioła, oregano'),
(20, 'Wiejska', '31', 'sos pomidorowy, mozzarella, boczek, kiełbasa, ogórek, pieczarki, papryka, cebula, czosnek, ser żółty, zioła, oregano'),
(21, 'Jarska', '29', 'sos pomidorowy, mozzarella, pomidor, ogórek, groszek, papryka, brokuły, ser żółty, zioła, oregano'),
(22, 'Hawajska', '28', 'sos pomidorowy, mozzarella, szynka, ananas, kukurydza, ser żółty, zioła, oregano'),
(23, 'Szynkowa_extra', '29', 'sos pomidorowy, mozzarella, szynka, papryka, kapary, ser żółty, zioła, oregano'),
(24, 'Gyros_max', '32', 'sos pomidorowy, mozzarella, gyros, ogórek, pomidor, ser feta, oliwki, sos grecki, ser żółty, zioła, oregano'),
(25, 'Tropicana', '31', 'sos pomidorowy, mozzarella, kurczak, brzoskwinia, ananas, szynka, ser żółty, zioła oregano'),
(26, 'Gustoza', '29', 'sos pomidorowy, mozzarella, kiełbasa, brokuły, papryka, ser żółty, zioła, oregano'),
(27, 'Delicat', '27', 'sos pomidorowy, mozzarella, brzoskwinia, ananas, ser żółty, zioła, oregano'),
(28, 'Grecka', '30', 'sos pomidorowy, mozzarella, pomidor, ogórek, cebula, papryka, oliwki, ser feta, ser żółty, zioła, oregano'),
(29, 'Meksykanska', '30', 'sos pomidorowy, mozzarella, salami, oliwki, kapary, tabasco, chili, ser żółty, zioła, oregano'),
(30, 'Cztery_sery', '30', 'sos pomidorowy, ser parmezan, ser pleśniowy, ser feta, ser żółty, zioła, oregano'),
(31, 'Parmezana', '34', 'sos pomidorowy, mozzarella, ser parmezan, szynka parmeńska, pomidorki koktajlowe, rukola, ser żółty, zioła, oregano'),
(32, 'Szpinakowa', '31', 'sos pomidorowy, mozzarella, szpinak, pomidory suszone, ser feta, ser żółty, zioła, oregano'),
(33, 'Z_rukola', '31', 'sos pomidorowy, mozzarella, salami lub szynka (do wyboru), rukola, ser parmezan, ser żółty, zioła, oregano'),
(34, 'Grzybowa', '33', 'sos pomidorowy, mozzarella, borowiki, pieczarki, podgrzybki, ser parmezan, ser żółty, zioła, oregano'),
(35, 'Borowikowa', '33', 'sos pomidorowy, mozzarella, borowiki, boczek, cebula, ser parmezan, oliwki, ser żółty, zioła, oregano'),
(36, 'Zurawinowa', '32', 'sos pomidorowy, mozzarella, ser wędzony, żurawina, rukola, ser żółty, zioła, oregano'),
(37, 'Uczta_serowa', '31', 'sos pomidorowy, ser parmezan, ser pleśniowy, ser wędzony, ser żółty, zioła, oregano'),
(38, 'Szpinakowa_extra', '27', 'sos pomidorowy, mozzarella, szpinak, kurczak, cebula, czosnek, ser żółty, zioła, oregano');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienia`
--

CREATE TABLE `zamowienia` (
  `id` int(11) NOT NULL,
  `imie` varchar(20) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `nazwisko` varchar(20) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `miejscowosc` varchar(20) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `ulica` varchar(30) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `numerDomu` int(11) DEFAULT NULL,
  `numerMieszkania` int(11) DEFAULT NULL,
  `numerTelefonu` varchar(12) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `dataZamowienia` date DEFAULT NULL,
  `zamowienieNaGodzine` time DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `dodatki`
--
ALTER TABLE `dodatki`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dostawaweekday`
--
ALTER TABLE `dostawaweekday`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dostawaweekend`
--
ALTER TABLE `dostawaweekend`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fastfood`
--
ALTER TABLE `fastfood`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `galeria`
--
ALTER TABLE `galeria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `klienci`
--
ALTER TABLE `klienci`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `miejscowosci`
--
ALTER TABLE `miejscowosci`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `napoje`
--
ALTER TABLE `napoje`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pizza`
--
ALTER TABLE `pizza`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `dodatki`
--
ALTER TABLE `dodatki`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT dla tabeli `dostawaweekday`
--
ALTER TABLE `dostawaweekday`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT dla tabeli `dostawaweekend`
--
ALTER TABLE `dostawaweekend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT dla tabeli `fastfood`
--
ALTER TABLE `fastfood`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT dla tabeli `galeria`
--
ALTER TABLE `galeria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `klienci`
--
ALTER TABLE `klienci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT dla tabeli `miejscowosci`
--
ALTER TABLE `miejscowosci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT dla tabeli `napoje`
--
ALTER TABLE `napoje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT dla tabeli `pizza`
--
ALTER TABLE `pizza`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
--
-- AUTO_INCREMENT dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
