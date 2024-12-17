-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Dec 17. 14:48
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `booking_system`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) UNSIGNED NOT NULL,
  `listing_id` int(11) UNSIGNED DEFAULT NULL,
  `user_id` int(11) UNSIGNED DEFAULT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `guests` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `bookings`
--

INSERT INTO `bookings` (`id`, `listing_id`, `user_id`, `start_date`, `end_date`, `guests`, `total_price`, `created_at`) VALUES
(1, 1, 5, '2024-12-18', '2024-12-22', 2, 140000.00, '2024-12-17 10:53:48'),
(2, 2, 0, '2024-12-26', '2024-12-28', 4, 200000.00, '2024-12-17 11:18:31');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hosts`
--

CREATE TABLE `hosts` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `role` enum('admin','host','user') DEFAULT 'host',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `hosts`
--

INSERT INTO `hosts` (`id`, `username`, `email`, `password`, `phone`, `role`, `created_at`) VALUES
(1, 'Monopoly', 'laczkolali77@gmail.com', '$2y$10$AtP7NIK.TH490CX9o9duWuV7DC/sNGpvz6qCn01FY/Tu11PruHWEm', '06301783267', 'host', '2024-12-16 18:41:30');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `listings`
--

CREATE TABLE `listings` (
  `id` int(11) UNSIGNED NOT NULL,
  `host_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `listings`
--

INSERT INTO `listings` (`id`, `host_id`, `name`, `address`, `price`, `description`, `image_url`, `created_at`) VALUES
(1, 1, 'Aranybika hotel', 'Debrecen Piac utca 17', 35000.00, 'Nagyon szép, nagyon drága', 'https://www.dehir.hu/upload/images/wp_cikkek/2022/aranybika_1.jpg', '2024-12-16 22:09:41'),
(2, 1, 'Grand Budapest Hotel', 'Budapest Rózsadomb út 22', 100000.00, 'Még drágább mint bármi más', 'https://www.rocky.hu/imgcache/238304/200.jpg', '2024-12-16 22:16:47');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `listing_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `reviews`
--

INSERT INTO `reviews` (`id`, `listing_id`, `user_id`, `rating`, `comment`, `created_at`) VALUES
(1, 2, 0, 4, 'ko', '2024-12-17 12:13:47'),
(2, 2, 0, 5, 'kő', '2024-12-17 12:14:06'),
(3, 1, 0, 5, '', '2024-12-17 12:15:03');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(50) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `role`) VALUES
(0, 'kuku', 'kuku@citromail.hu', '$2y$10$IysTguGE7y3jKTkVxI2Kxe0zI09gknxP5XUA7f5O1c8mw5Qvk3xoK', '2024-12-17 11:18:03', 'user'),
(1, 'tesztuser', 'teszt@example.com', 'jelszó', '2024-12-16 11:01:04', 'user'),
(2, 'testuser', 'test@example.com', '$2y$10$ffEX8PbYBmz9t84AyOwF5OSJf1w0sBW5czPvGsNYCI7VmL0crCBAe', '2024-12-16 16:06:14', 'user'),
(3, 'laczkolali77@gmail.com', 'laczkolali77@gmail.com', '$2y$10$OGyvY0WUYr3bU/WDeqbkVuHAU8ttGVOXAru.qn.nal7SRGd1BBVAi', '2024-12-16 16:08:33', 'user'),
(4, 'csoko99', 'maresz@gmail.com', '$2y$10$2AtgRoBFH0mil.1.4jKzTeKdo6PmkYPc8dBKJVattXRrhRZr0rsMC', '2024-12-16 16:12:26', 'admin'),
(5, 'matyi', 'matyi@gmail.com', '$2y$10$W6G.iBMny4hstqlcZm2.juVJgmZLPb7HBlAm6oZiQiBHsYIIxNSqG', '2024-12-16 17:53:45', 'user');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_listing_id` (`listing_id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- A tábla indexei `hosts`
--
ALTER TABLE `hosts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `host_id` (`host_id`);

--
-- A tábla indexei `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listing_id` (`listing_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `hosts`
--
ALTER TABLE `hosts`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_listing_id` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `listings`
--
ALTER TABLE `listings`
  ADD CONSTRAINT `listings_ibfk_1` FOREIGN KEY (`host_id`) REFERENCES `hosts` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
