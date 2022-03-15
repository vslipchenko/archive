-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 26 2019 г., 12:29
-- Версия сервера: 8.0.15
-- Версия PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `wikiw`
--

-- --------------------------------------------------------

--
-- Структура таблицы `ww_content_ru`
--

CREATE TABLE `ww_content_ru` (
  `id` int(11) NOT NULL,
  `selector` varchar(100) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `ww_content_ru`
--

INSERT INTO `ww_content_ru` (`id`, `selector`, `content`) VALUES
(1, 'Homepage->about', '<div id=\"homepage-about\" class=\"block\"><span class=\"block-title circle pointer\" id=\"fill-up-button-about\" data-click-action=\"showAboutBlock\">ПРОЕКТЕ</span><div class=\"block-content\" id=\"about-content\"><span class=\"close-form-button\" data-click-action=\"closeForm\"></span><p class=\"paragraph\"><b>WikiWarrior</b> - веб приложение основанное на игрофицицировании процесса обучения, с целью увеличения интереса, мотивации а также поощрения пользователя во время получения новых и закрепления уже имеющихся знаний</p></div></div>'),
(2, 'H-omepage->test', '<div id=\"about\"><h2>Тест2</h2>\r\n</div>');

-- --------------------------------------------------------

--
-- Структура таблицы `ww_user`
--

CREATE TABLE `ww_user` (
  `id` int(11) NOT NULL,
  `uname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs NOT NULL,
  `link` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs NOT NULL,
  `email` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs NOT NULL,
  `upass` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `vcode` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;

--
-- Дамп данных таблицы `ww_user`
--

INSERT INTO `ww_user` (`id`, `uname`, `link`, `email`, `upass`, `vcode`) VALUES
(83, 'newme', 'test', 'new@wew', '$2y$10$Mn1vl6EgMmEM54qBCGaoFeZMSZo982iEUfZesXhO7CNg8f37r9kGC', ''),
(125, 'newMe', 'newMe', 'awiduwiud@idauwd', '$2y$10$FZa79kECdDqDDpimWVeU6enE5ptvQTM2iJR/qTKCKrV/Dm4h6K4Hq', '-qQ|6H'),
(126, 'Newme', 'Newme', 'ioiawduw@widi', '$2y$10$rFzu0S18ptgQKU3bTwMe6ez55VeSWxRvj0mRsqX9EO8umIBx/7Jtm', 'w&MH@w');

-- --------------------------------------------------------

--
-- Структура таблицы `ww_user_collection`
--

CREATE TABLE `ww_user_collection` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `symletnum` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'a:3:{s:7:"numbers";a:10:{i:0;i:0;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:0;i:9;i:0;}s:7:"letters";a:59:{s:2:"А";i:0;s:2:"Б";i:0;s:2:"В";i:0;s:2:"Г";i:0;s:2:"Д";i:0;s:2:"Е";i:0;s:2:"Ё";i:0;s:2:"Ж";i:0;s:2:"З";i:0;s:2:"И";i:0;s:2:"Й";i:0;s:2:"К";i:0;s:2:"Л";i:0;s:2:"М";i:0;s:2:"Н";i:0;s:2:"О";i:0;s:2:"П";i:0;s:2:"Р";i:0;s:2:"С";i:0;s:2:"Т";i:0;s:2:"У";i:0;s:2:"Ф";i:0;s:2:"Х";i:0;s:2:"Ц";i:0;s:2:"Ч";i:0;s:2:"Ш";i:0;s:2:"Щ";i:0;s:2:"Ъ";i:0;s:2:"Ы";i:0;s:2:"Ь";i:0;s:2:"Э";i:0;s:2:"Ю";i:0;s:2:"Я";i:0;s:1:"A";i:0;s:1:"B";i:0;s:1:"C";i:0;s:1:"D";i:0;s:1:"E";i:0;s:1:"F";i:0;s:1:"G";i:0;s:1:"H";i:0;s:1:"I";i:0;s:1:"J";i:0;s:1:"K";i:0;s:1:"L";i:0;s:1:"M";i:0;s:1:"N";i:0;s:1:"O";i:0;s:1:"P";i:0;s:1:"Q";i:0;s:1:"R";i:0;s:1:"S";i:0;s:1:"T";i:0;s:1:"U";i:0;s:1:"V";i:0;s:1:"W";i:0;s:1:"X";i:0;s:1:"Y";i:0;s:1:"Z";i:0;}s:7:"symbols";a:10:{s:1:"-";i:0;s:1:":";i:0;s:1:",";i:0;s:1:".";i:0;s:1:"?";i:0;s:1:"(";i:0;s:1:"!";i:0;s:1:")";i:0;s:1:""";i:0;s:1:"@";i:0;}}',
  `digit` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `letter` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `symbol` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `audio` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `video` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `ww_user_collection`
--

INSERT INTO `ww_user_collection` (`id`, `user_id`, `symletnum`, `digit`, `letter`, `symbol`, `image`, `audio`, `video`) VALUES
(1, 83, 'a:3:{s:7:\"numbers\";a:10:{i:0;i:36;i:1;i:63;i:2;i:70;i:3;i:61;i:4;i:82;i:5;i:59;i:6;i:62;i:7;i:62;i:8;i:60;i:9;i:74;}s:7:\"letters\";a:59:{s:2:\"А\";i:9;s:2:\"Б\";i:13;s:2:\"В\";i:9;s:2:\"Г\";i:13;s:2:\"Д\";i:15;s:2:\"Е\";i:13;s:2:\"Ё\";i:10;s:2:\"Ж\";i:6;s:2:\"З\";i:10;s:2:\"И\";i:9;s:2:\"Й\";i:11;s:2:\"К\";i:10;s:2:\"Л\";i:7;s:2:\"М\";i:13;s:2:\"Н\";i:18;s:2:\"О\";i:11;s:2:\"П\";i:13;s:2:\"Р\";i:8;s:2:\"С\";i:10;s:2:\"Т\";i:18;s:2:\"У\";i:9;s:2:\"Ф\";i:18;s:2:\"Х\";i:13;s:2:\"Ц\";i:9;s:2:\"Ч\";i:14;s:2:\"Ш\";i:11;s:2:\"Щ\";i:10;s:2:\"Ъ\";i:7;s:2:\"Ы\";i:12;s:2:\"Ь\";i:12;s:2:\"Э\";i:10;s:2:\"Ю\";i:14;s:2:\"Я\";i:13;s:1:\"A\";i:11;s:1:\"B\";i:8;s:1:\"C\";i:8;s:1:\"D\";i:12;s:1:\"E\";i:12;s:1:\"F\";i:15;s:1:\"G\";i:11;s:1:\"H\";i:9;s:1:\"I\";i:8;s:1:\"J\";i:7;s:1:\"K\";i:10;s:1:\"L\";i:17;s:1:\"M\";i:12;s:1:\"N\";i:12;s:1:\"O\";i:11;s:1:\"P\";i:12;s:1:\"Q\";i:10;s:1:\"R\";i:12;s:1:\"S\";i:9;s:1:\"T\";i:14;s:1:\"U\";i:15;s:1:\"V\";i:13;s:1:\"W\";i:14;s:1:\"X\";i:11;s:1:\"Y\";i:13;s:1:\"Z\";i:10;}s:7:\"symbols\";a:10:{s:1:\"-\";i:52;s:1:\":\";i:51;s:1:\",\";i:44;s:1:\".\";i:44;s:1:\"?\";i:61;s:1:\"(\";i:46;s:1:\"!\";i:55;s:1:\")\";i:65;s:1:\"\"\";i:53;s:1:\"@\";i:45;}}', '[0,0,0,0,0,0,0,0,0,0]', '{\"\\u0410\":0,\"\\u0411\":0,\"\\u0412\":0,\"\\u0413\":0,\"\\u0414\":0,\"\\u0415\":0,\"\\u0401\":0,\"\\u0416\":0,\"\\u0417\":0,\"\\u0418\":0,\"\\u0419\":0,\"\\u041a\":0,\"\\u041b\":0,\"\\u041c\":0,\"\\u041d\":0,\"\\u041e\":0,\"\\u041f\":0,\"\\u0420\":0,\"\\u0421\":0,\"\\u0422\":0,\"\\u0423\":0,\"\\u0424\":0,\"\\u0425\":0,\"\\u0426\":0,\"\\u0427\":0,\"\\u0428\":0,\"\\u0429\":0,\"\\u042a\":0,\"\\u042b\":0,\"\\u042c\":0,\"\\u042d\":0,\"\\u042e\":0,\"\\u042f\":0,\"A\":0,\"B\":0,\"C\":0,\"D\":0,\"E\":0,\"F\":0,\"G\":0,\"H\":0,\"I\":0,\"J\":0,\"K\":0,\"L\":0,\"M\":0,\"N\":0,\"O\":0,\"P\":0,\"Q\":0,\"R\":0,\"S\":0,\"T\":0,\"U\":0,\"V\":0,\"W\":0,\"X\":0,\"Y\":0,\"Z\":0}', '{\"-\":0,\":\":0,\",\":0,\".\":0,\"?\":0,\"(\":0,\"!\":0,\")\":0,\"\\\"\":0,\"@\":0}', 'commons/thumb/b/b0/Gutenberg_Bible.jpg/400px-Gutenberg_Bible.jpg|commons/thumb/0/04/Michael_Jackson_signature.svg/400px-Michael_Jackson_signature.svg.png|commons/thumb/a/a2/%C6%8Fl%C9%99sg%C9%99r_Kaz%C4%B1m_o%C4%9Flu_%C6%8Fl%C9%99kb%C9%99rov.jpg/275px-%C6%8Fl%C9%99sg%C9%99r_Kaz%C4%B1m_o%C4%9Flu_%C6%8Fl%C9%99kb%C9%99rov.jpg|commons/b/b0/Gutenberg_Bible.jpg|commons/b/b0/Gutenberg_Bible.jpg|commons/b/b0/Gutenberg_Bible.jpg|commons/thumb/3/30/Random_rubble_masonry.jpg/1000px-Random_rubble_masonry.jpg|commons/thumb/f/f5/Pablo_Laso_Real_Madrid_Baloncesto_Euroleague_20171012.jpg/679px-Pablo_Laso_Real_Madrid_Baloncesto_Euroleague_20171012.jpg|commons/f/ff/Commandalake.jpg|commons/thumb/c/c8/%D0%9C%D0%BE%D0%BD%D1%83%D0%BC%D0%B5%D0%BD%D1%82_%D0%90%D0%B2%D0%B8%D1%86%D0%B5%D0%BD%D0%B5.JPG/1000px-%D0%9C%D0%BE%D0%BD%D1%83%D0%BC%D0%B5%D0%BD%D1%82_%D0%90%D0%B2%D0%B8%D1%86%D0%B5%D0%BD%D0%B5.JPG|commons/7/7c/Reichszentrale-Erlass-1936.jpg|ru/3/3c/%D0%93%D0%BB%D1%83%D1%88%D0%BA%D0%BE%D0%B2_%D0%A0%D0%BE%D0%B1%D0%B5%D1%80%D1%82_%D0%93%D0%B5%D0%BE%D1%80%D0%B3%D0%B8%D0%B5%D0%B2%D0%B8%D1%87.jpg|commons/c/ce/M_6.5_-_southeast_of_the_Ryukyu_Islands%2C_Japan.jpg|commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/1000px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg|ru/d/d3/StreetSongsRickJames.jpg|commons/5/5c/TnikpueS7.jpg|commons/5/5e/%D0%9F%D0%BE%D0%B3%D0%BE%D1%80%D1%96%D0%BB%D0%B8%D0%B9_%D0%A1%D0%B5%D1%80%D0%B3%D1%96%D0%B9_%D0%94%D0%B5%D0%BC%E2%80%99%D1%8F%D0%BD%D0%BE%D0%B2%D0%B8%D1%87.jpg|commons/thumb/d/d0/Russia_political_location_map_%28Crimea_disputed%29.svg/1000px-Russia_political_location_map_%28Crimea_disputed%29.svg.png|commons/thumb/e/e9/Chekhov_1898_by_Osip_Braz.jpg/780px-Chekhov_1898_by_Osip_Braz.jpg|ru/4/4c/PMD_-_Business_Is_Business.jpeg|commons/thumb/f/fb/Kihnu_tuletorn_2008.jpg/664px-Kihnu_tuletorn_2008.jpg|commons/thumb/0/0a/%D0%AF%D0%BD%D0%B4%D0%B0%D1%80%D0%BE%D0%B2_%D0%92%D0%B0%D1%85%D0%B0_02.jpg/735px-%D0%AF%D0%BD%D0%B4%D0%B0%D1%80%D0%BE%D0%B2_%D0%92%D0%B0%D1%85%D0%B0_02.jpg|ru/e/e7/Sweepers_1998.jpg|commons/4/4e/Azur.jpg|commons/thumb/e/ea/Giuseppe_bonito-esquilache.jpg/803px-Giuseppe_bonito-esquilache.jpg|commons/0/06/Roma_Ribera_i_Cirera.jpg|commons/2/2d/%D0%97%D1%83%D0%B1%D0%B0%D1%80%D0%B5%D0%B2_%D0%92.%D0%9C._%D0%90%D0%B2%D1%82%D0%BE%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82.jpg|commons/thumb/6/6f/Malmo_castle.jpg/1000px-Malmo_castle.jpg|ru/d/de/Scandal_-_Harukaze.jpg|commons/d/d0/Mamlakat_Yusupova.jpg|ru/4/49/Deborah_Remington.jpg|commons/thumb/0/0d/Jumbo_Supermarkten.jpg/1000px-Jumbo_Supermarkten.jpg|ru/0/0e/%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB_%D0%90%D1%84%D0%B0%D0%BD%D0%B0%D1%81%D1%8C%D0%B5%D0%B2%D0%B8%D1%87_%D0%A4%D0%B5%D0%B4%D0%BE%D1%82%D0%BE%D0%B2_%281929%E2%80%941998%29.jpg|commons/thumb/f/f5/Relief_Map_of_Belarus.png/1000px-Relief_Map_of_Belarus.png|commons/thumb/d/d0/Russia_political_location_map_%28Crimea_disputed%29.svg/1000px-Russia_political_location_map_%28Crimea_disputed%29.svg.png|commons/thumb/e/e9/Ezhou-TV-0115.jpg/1000px-Ezhou-TV-0115.jpg|commons/thumb/3/36/COA_Guzm%C3%A1n_with_crown_of_Lord.svg/786px-COA_Guzm%C3%A1n_with_crown_of_Lord.svg.png|commons/thumb/2/26/USA_Georgia_location_map.svg/868px-USA_Georgia_location_map.svg.png|commons/thumb/b/b2/Azerbaijan_adm_location_map.svg/1000px-Azerbaijan_adm_location_map.svg.png|commons/9/90/Sala_Carlos_Merida.jpg6/6a/Relief-Sverdlovskaya.png|thumb/e/ed/Composer_Peshnyak_2.jpg/797px-Composer_Peshnyak_2.jpg|', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `ww_user_data`
--

CREATE TABLE `ww_user_data` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `answered` bigint(20) NOT NULL DEFAULT '0',
  `experience` bigint(20) NOT NULL DEFAULT '0',
  `level` int(11) NOT NULL DEFAULT '1',
  `health` int(11) NOT NULL DEFAULT '1',
  `attack` int(11) NOT NULL DEFAULT '1',
  `defense` int(11) NOT NULL DEFAULT '1',
  `mana` int(11) NOT NULL DEFAULT '1',
  `settings` varchar(2000) NOT NULL DEFAULT 'a:1:{s:6:"images";a:2:{s:6:"avatar";s:0:"";s:10:"background";s:0:"";}}',
  `last_activity` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `ww_user_data`
--

INSERT INTO `ww_user_data` (`id`, `user_id`, `answered`, `experience`, `level`, `health`, `attack`, `defense`, `mana`, `settings`, `last_activity`) VALUES
(37, 83, 519, 590, 193, 248, 142, 113, 280, 'a:1:{s:6:\"images\";a:2:{s:6:\"avatar\";s:162:\"thumb/a/a2/%C6%8Fl%C9%99sg%C9%99r_Kaz%C4%B1m_o%C4%9Flu_%C6%8Fl%C9%99kb%C9%99rov.jpg/275px-%C6%8Fl%C9%99sg%C9%99r_Kaz%C4%B1m_o%C4%9Flu_%C6%8Fl%C9%99kb%C9%99rov.jpg\";s:10:\"background\";s:56:\"thumb/b/b0/Gutenberg_Bible.jpg/400px-Gutenberg_Bible.jpg\";}}', '2019-10-12 16:27:57');

-- --------------------------------------------------------

--
-- Структура таблицы `ww_user_dialogue`
--

CREATE TABLE `ww_user_dialogue` (
  `id` int(11) NOT NULL,
  `recipient` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `message` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `seen` tinyint(4) NOT NULL DEFAULT '0',
  `time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Структура таблицы `ww_user_friends`
--

CREATE TABLE `ww_user_friends` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `accept` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `ww_user_vocabulary_en`
--

CREATE TABLE `ww_user_vocabulary_en` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vocabulary` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `ww_user_vocabulary_en`
--

INSERT INTO `ww_user_vocabulary_en` (`id`, `user_id`, `vocabulary`) VALUES
(15, 83, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `ww_user_vocabulary_ru`
--

CREATE TABLE `ww_user_vocabulary_ru` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vocabulary` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `ww_user_vocabulary_ru`
--

INSERT INTO `ww_user_vocabulary_ru` (`id`, `user_id`, `vocabulary`) VALUES
(15, 83, 'Гоголь, Николай Васильевич|');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `ww_content_ru`
--
ALTER TABLE `ww_content_ru`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`selector`);

--
-- Индексы таблицы `ww_user`
--
ALTER TABLE `ww_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`uname`) USING BTREE,
  ADD UNIQUE KEY `link` (`link`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Индексы таблицы `ww_user_collection`
--
ALTER TABLE `ww_user_collection`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Индексы таблицы `ww_user_data`
--
ALTER TABLE `ww_user_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`) USING BTREE;

--
-- Индексы таблицы `ww_user_dialogue`
--
ALTER TABLE `ww_user_dialogue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ww_user_dialogue_ibfk_1` (`sender`),
  ADD KEY `ww_user_dialogue_ibfk_2` (`recipient`);

--
-- Индексы таблицы `ww_user_friends`
--
ALTER TABLE `ww_user_friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ww_user_friends_ibfk_1` (`user_id`),
  ADD KEY `ww_user_friends_ibfk_2` (`friend_id`);

--
-- Индексы таблицы `ww_user_vocabulary_en`
--
ALTER TABLE `ww_user_vocabulary_en`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Индексы таблицы `ww_user_vocabulary_ru`
--
ALTER TABLE `ww_user_vocabulary_ru`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `ww_content_ru`
--
ALTER TABLE `ww_content_ru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `ww_user`
--
ALTER TABLE `ww_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT для таблицы `ww_user_collection`
--
ALTER TABLE `ww_user_collection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT для таблицы `ww_user_data`
--
ALTER TABLE `ww_user_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT для таблицы `ww_user_dialogue`
--
ALTER TABLE `ww_user_dialogue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `ww_user_vocabulary_en`
--
ALTER TABLE `ww_user_vocabulary_en`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `ww_user_vocabulary_ru`
--
ALTER TABLE `ww_user_vocabulary_ru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `ww_user_collection`
--
ALTER TABLE `ww_user_collection`
  ADD CONSTRAINT `ww_user_collection_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `ww_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `ww_user_data`
--
ALTER TABLE `ww_user_data`
  ADD CONSTRAINT `ww_user_data_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `ww_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `ww_user_dialogue`
--
ALTER TABLE `ww_user_dialogue`
  ADD CONSTRAINT `ww_user_dialogue_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `ww_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `ww_user_dialogue_ibfk_2` FOREIGN KEY (`recipient`) REFERENCES `ww_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `ww_user_friends`
--
ALTER TABLE `ww_user_friends`
  ADD CONSTRAINT `ww_user_friends_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `ww_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `ww_user_friends_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `ww_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `ww_user_vocabulary_en`
--
ALTER TABLE `ww_user_vocabulary_en`
  ADD CONSTRAINT `ww_user_vocabulary_en_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `ww_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `ww_user_vocabulary_ru`
--
ALTER TABLE `ww_user_vocabulary_ru`
  ADD CONSTRAINT `ww_user_vocabulary_ru_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `ww_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
