<?php if(!defined('ACCESS')) die;
// global $User;
// var_dump(new User);die;
?>
<!DOCTYPE html>
<html>
<head>
	<!-- <meta charset="UTF-8"> -->
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>WikiWarrior - Game-Based Learning website</title>
    <!-- <link href="https://fonts.googleapis.com/css?family=Nunito:900&display=swap" rel="stylesheet">  -->
<!--     <link href="https://fonts.googleapis.com/css?family=Jura:500|Roboto|Russo+One&display=swap&subset=cyrillic,cyrillic-ext" rel="stylesheet">    -->
    <link href="https://fonts.googleapis.com/css?family=Jura:500|Russo+One&display=swap&subset=cyrillic,cyrillic-ext" rel="stylesheet"/>
    <!-- <link href="https://fontlibrary.org/face/pressuru" type="text/css" rel="stylesheet" media="screen"> -->
    <!-- <link href="/app/view/default/fonts/Pressuru/stylesheet.css" type="text/css" rel="stylesheet" media="screen"> -->
    <link href="/app/main/view/fonts/pressuru/font.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="/app/main/view/css/profile.css">

	<script type="text/javascript">const locale = '<?=LOCALE?>';</script>
	<script type="text/javascript" src="/app/main/js/profile/functions.js"></script>
    <script type="text/javascript" src="/app/main/js/profile/main.js"></script>
</head>
	<!-- <body class="font_russo-one" onresize="App.updateScreen();"> -->
	<body class="font_russo-one"
		  onresize="App.updateView();">
		<main class="interface">
            <div class="backgrounds">
            	<span class="background background__default" 
            		  style="background-image: url(https://upload.wikimedia.org/wikipedia/it/8/8c/Vento_del_Sud_%28singolo%29.png);">
            		   <!-- Back-im prop should contain at least empty string '' -->
                     </span>
				<span class="background background__adventure-mode"></span>
			</div>
			<div class="interface-left">
				<div class="user-card"
					 onclick="App.flipUserCard(this);">
					<div class="user-card__front">
						<span class="user-card__image image" style="background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/%C6%8Fl%C9%99sg%C9%99r_Kaz%C4%B1m_o%C4%9Flu_%C6%8Fl%C9%99kb%C9%99rov.jpg/275px-%C6%8Fl%C9%99sg%C9%99r_Kaz%C4%B1m_o%C4%9Flu_%C6%8Fl%C9%99kb%C9%99rov.jpg)"></span>
						<span class="user-card__username content_center const_theme_gold">Text</span>
					</div>
					<div class="user-card__back const_theme_gold">
						<div class="user-card__back-row">
							<span class="user-card__stat-level">143</span>
							<span class="icon user-card__icon user-card__icon_level"></span>
						</div>
						<div class="user-card__back-row">
							<span class="icon user-card__icon user-card__icon_attack"></span>
							<span class="user-card__stat-attack">253</span>
						</div>
						<div class="user-card__back-row">
							<span class="user-card__stat-defense">167</span>
							<span class="icon user-card__icon user-card__icon_defense"></span>
						</div>
						<div class="user-card__back-row">
							<span class="icon user-card__icon user-card__icon_health"></span>
							<span class="user-card__stat-health">250</span>
						</div>
						<div class="user-card__back-row">
							<span class="user-card__stat-mana">120</span>
							<span class="icon user-card__icon user-card__icon_mana"></span>
						</div>
					</div>
				</div>
				<div class="game-modes">
					<div class="game-modes__adventure-mode">
						<div class="game-modes__icon theme_dark">
							<span class="icon game-modes__icon_adventure-mode"></span>
						</div>
						<button class="theme_gold content_center game-modes__button"
							  	onclick="App.goAdventureMode();"
							  > ПРИКЛЮЧЕНИЯ
						</button>
					</div>
				</div>
				<div class="wiki-music wiki-music_state_ready image const_theme_dark"
					 onclick="App.startWikiMusic();">
					 <!-- <button class="wiki-music__button button_type_previous"></button> -->
					<!-- <marquee behavior="scroll" direction="left">Бегущая строка</marquee> -->
					<span class="wiki-music__timer wiki-music__timer_type_current font_size_small"></span>
					<span class="wiki-music__icon wiki-music__icon_type_default icon"></span>
					<!-- <span class="wiki-music__icon wiki-music__icon_type_cover icon"></span> -->
					<span class="wiki-music__timer wiki-music__timer_type_duration font_size_small"></span>
					<div class="wiki-music__controls font_size_medium">
						<button class="wiki-music__button button_type_audio-source theme_gold_transparent">M</button>
						<button class="wiki-music__button button_type_previous theme_gold_transparent"
							    onclick="App.switchWikiMusic(-1);"></button>
						<button class="wiki-music__button button_type_pause theme_gold_transparent"
								onclick="App.switchWikiMusic(this);"></button>
						<button class="wiki-music__button button_type_next theme_gold_transparent"
								onclick="App.switchWikiMusic(1);"></button>
						<button class="wiki-music__button button_type_image-source theme_gold_transparent">I</button>
					</div>
				</div>
			</div>
			<div class="interface-right">
				<div class="interface-right__row-1">
					<div class="top-bar">
						<div class="user-bar">
							<button class="theme_dark user-bar__button icon user-bar__button_icon_social"
									onclick="App.goSocial();">
							</button>
							<button class="theme_dark user-bar__button icon user-bar__button_icon_collection"
								    onclick="App.goCollection();">
							</button>
						</div>
						<div class="controls">
							<button class="theme_dark content_center controls__button controls__button_type_logout"
									onclick="App.logout();">✕</button>
						</div>
					</div>
					<div class="action-screen">
						<div class="adventure-mode">
							<div class="adventure-mode__top-row"
								 onclick-off="App.toggleAdventureMode();">
								<div class="adventure-mode__column-1">
									<input class="adventure-mode__constellation-name-input font_pressuru_size_large"
										   autocomplete="off"
									 	   type="text"
										   placeholder=""
										   onkeyup="App.toggleContrAdventureMode(this.value);">
									<div class="adventure-mode__controls">
										<button class="content_center adventure-mode__button adventure-mode__button_type_quit"
											  	onclick="App.closeAdventureMode();">
											  ✕
										</button>
										<button class="content_center adventure-mode__button adventure-mode__button_type_language-switcher"
											  	onclick="App.switchLanguage(this);">
											  RU
										</button>
										<button class="content_center adventure-mode__button icon adventure-mode__button_type_random"
											  	onclick="App.randomAdventureMode();">
										</button>
									</div>
								</div>
								<div class="adventure-mode__column-2">
									<span class="adventure-mode__reward-title font_pressuru_size_large">Возможные награды</span>
									<div class="adventure-mode__phase font_pressuru_size_large">
										Звезда -
										<span class="adventure-mode__phase-number"></span>
										-
										<span class="adventure-mode__star-name"></span>
									</div>
								</div>
								<div class="adventure-mode__column-3"></div>
							</div>
							<div class="adventure-mode__master-row">
								<div class="adventure-mode__fluid-content">
									<div class="adventure-mode__column-1">
										<!-- <div class="adventure-mode__constellation-containter"> -->
										<svg class="adventure-mode__constellation"></svg>
										<div class="adventure-mode__task">
											<!-- <span class="adventure-mode__task-label">Тест:</span> -->
											<textarea class="adventure-mode__task-output font_jura_size_regular" spellcheck="false" disabled></textarea>
										</div>
										<!-- </div> -->
									</div>
									<div class="adventure-mode__column-2">
										<div class="adventure-mode__reward items_center">
											<span class="adventure-mode__image content_center">?</span>
											<div class="adventure-mode__reward-list font_pressuru_size_regular items_center">
												<span class="adventure-mode__list-row">Знания</span>
												<span class="adventure-mode__list-row">Цифры</span>
												<span class="adventure-mode__list-row">Изображение статьи</span>
											</div>
										</div>
										<div class="adventure-mode__answer font_jura">
											<!-- <span class="adventure-mode__answer-label">Координаты:</span> -->
											<textarea class="adventure-mode__answer-input font_size_regular" 
													  autocomplete="off" 
													  spellcheck="false"
													  onkeyup="App.answerAdventureMode(this.value);"></textarea>
											<div class="adventure-mode__answer-stats">
												<div>
													<span class="adventure-mode__answer-label">Длина искаженных координат:</span>
													<span class="adventure-mode__answer-task-length font_russo-one"></span>
												</div>
												<div>
													<span class="adventure-mode__answer-label">Длина верных координат:</span>
													<span class="adventure-mode__answer-length font_russo-one"></span>
												</div>
												<div>
													<span class="adventure-mode__answer-label">Оставшееся количество символов:</span>
													<span class="adventure-mode__answer-left-length font_russo-one"></span>
												</div>
											</div>
										</div>
									</div>
									<div class="adventure-mode__column-3">
										<div class="adventure-mode__finish items_center font_pressuru_size_medium">
											<div class="adventure-mode__summary items_center">
												<div>
													<span class="adventure-mode__finish-label">Время в пути:</span>
													<span class="adventure-mode__finish-time"></span>
												</div>
												<div>
													<span class="adventure-mode__finish-label">Полная длина координат:</span>
													<span class="adventure-mode__finish-full-length"></span>
												</div>
												<div>
													<span class="adventure-mode__finish-label">Длина восстановленных координат:</span>
													<span class="adventure-mode__finish-answer-length"></span>
												</div>
											</div>
											<div class="adventure-mode__continue items_center">
												<span class="adventure-mode__continue-label">Ближайшее созвездие:</span>
												<span class="adventure-mode__continue-loading">...</span>
												<span class="adventure-mode__continue-value"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="adventure-mode__static-content">
									<div class="adventure-mode__column-1">
										<button class="content_center theme_gold_transparent adventure-mode__button adventure-mode__button_type_main"
											  onclick="App.startAdventureMode();"
											  onclick-s="App.completeAdventureMode();">
											  НАЧАТЬ
										</button>
									</div>
									<div class="adventure-mode__column-2"></div>
									<div class="adventure-mode__column-3">
										<div class="adventure-mode__finish-buttons">
											<button class="adventure-mode__button adventure-mode__button_type_accept button_type_accept const_theme_gold"
													onclick="App.goAdventureMode(L('.adventure-mode__continue-value').text().slice(1, -1));"></button>
											<button class="adventure-mode__button adventure-mode__button_type_decline button_type_decline"
													onclick="App.closeAdventureMode(1);"></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="interface-right__row-2">
					<!-- <div class="collection theme_dark font_jura"> -->
					<div class="collection theme_dark">
						<div class="collection__inventory">
							<div class="collection__header collection__header_type_inventory">
								<span class="collection__center-cell">Инвентарь</span>
								<div class="collection__right-cell">
									<span class="collection__wikoin-quantity">0</span>
									<span class="collection__wikoin-icon icon"></span>
								</div>
							</div>
							<div class="collection__content collection__content_type_inventory">
								<button id="symdiglet" 
										class="collection__content-row collection__content-row_empty"
										onclick="App.toggleCollection(this);">
									<span class="collection__center-cell">
										Знаки
									</span>
									<span class="collection__right-cell"></span>
								</button>
								<button id="digit"
										
										class="collection__content-row collection__content-row_empty group_symdiglet"
										onclick="App.toggleCollection(this);">
									<span class="collection__center-cell">Числа</span>
									<span class="collection__right-cell"></span>
								</button>
								<button id="letter"
										
										class="collection__content-row collection__content-row_empty group_symdiglet"
										onclick="App.toggleCollection(this);">
									<span class="collection__center-cell">Буквы</span>
									<span class="collection__right-cell"></span>
								</button>
								<button id="symbol"
										
										class="collection__content-row collection__content-row_empty group_symdiglet"
										onclick="App.toggleCollection(this);">
									<span class="collection__center-cell">Символы</span>
									<span class="collection__right-cell"></span>
										<!-- ⮝ -->
								</button>
								<button id="equipment" 
										class="collection__content-row collection__content-row_empty">
									<span class="collection__center-cell">
										Снаряжение
									</span>
									<span class="collection__right-cell"></span>
								</button>
							</div>
						</div>
						<div class="collection__media">
							<div class="collection__header collection__header_type_media items_center">
								<span class="title">Медиа</span>
								<button class="collection__button button_type_accept const_theme_gold"
										onclick="App.saveChangeCollection(1);"></button>
								<button class="collection__button button_type_decline"
										onclick="App.saveChangeCollection(0);"></button>
							</div>
							<div class="collection__content collection__content_type_media">
								<button id="image" 
									 	class="collection__content-row collection__content-row_empty"
									 	onclick="App.toggleCollection(this);">
									<span class="collection__center-cell">
										Изображения
									</span>
									<span class="collection__right-cell"></span>
								</button>
							</div>
						</div>
					</div>
					<div class="social theme_dark">
						<div class="social__header theme_dark">
							<div class="social__tabs">
								<div class="social__tab">
									<span class="social__border"></span>
									<span class="social__tab-text">ДРУЗЬЯ</span>
								</div>
							</div>
							<div class="social__search">
								<button class="social__icon social__icon_type_search theme_gold icon"></button>
								<input class="social__search-input theme_gold" type="text">
							</div>
						</div>
						<div class="social__content">
							<div class="social__friends">
								<div class="social__friend-list">
									<div class="social__row">
										<span class="social__border"></span>
										<span class="social__row-image image" style="background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/%C6%8Fl%C9%99sg%C9%99r_Kaz%C4%B1m_o%C4%9Flu_%C6%8Fl%C9%99kb%C9%99rov.jpg/275px-%C6%8Fl%C9%99sg%C9%99r_Kaz%C4%B1m_o%C4%9Flu_%C6%8Fl%C9%99kb%C9%99rov.jpg)"></span>
										<div class="social__extra-block">
											<div class="social__extra-row-1">
												<div class="social__friend-name">
													<span class="social__indicator indicator_online"></span>
													<span class="social__name">Test</span>
												</div>
											</div>
											<div class="social__extra-row-2">
												<span class="social__icon social__icon_type_new-message icon"></span>
												<button class="social__button social__button_type_unfriend icon"></button>
											</div>
										</div>
									</div>
								</div>
								<div class="social__dialogue">
									<div class="social__dialogue-messages">
										<div class="social__message-d-m-y theme_gold">4 октября 2015</div>
										<div class="social__message-box social__message-box_type_from">
											<span class="social__dialogue-message">Ye</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
										<div class="social__message-box social__message-box_type_to">
											<span class="social__dialogue-message">i wrtote you</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
											<div class="social__message-box social__message-box_type_to">
											<span class="social__dialogue-message">i wrtote youwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
											<div class="social__message-box social__message-box_type_to">
											<span class="social__dialogue-message">i wrtote you</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
											<div class="social__message-box social__message-box_type_to">
											<span class="social__dialogue-message">i wrtote you</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
											<div class="social__message-box social__message-box_type_to">
											<span class="social__dialogue-message">i wrtote you</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
											<div class="social__message-box social__message-box_type_to">
											<span class="social__dialogue-message">i wrtote you</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
											<div class="social__message-box social__message-box_type_to">
											<span class="social__dialogue-message">i wrtote you</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
											<div class="social__message-box social__message-box_type_to">
											<span class="social__dialogue-message">i wrtote you</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
											<div class="social__message-box social__message-box_type_to">
											<span class="social__dialogue-message">i wrtote you</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
											<div class="social__message-box social__message-box_type_to">
											<span class="social__dialogue-message">i wrtote you</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
											<div class="social__message-box social__message-box_type_to">
											<span class="social__dialogue-message">i wrtote you</span>
											<span class="social__message-h-m font_size_small">20:31</span>
										</div>
									</div>
									<div class="social__dialogue-textarea">
										<textarea class="social__dialogue-input"></textarea>
										<div class="social__dialogue-buttons">
											<button class="social__button social__button_type_send icon"></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="wiki-frame">
						<!-- <iframe class="wiki-frame-container__iframe" src="https://<?=LOCALE?>.m.wikipedia.org/"></iframe> -->
						<iframe class="wiki-frame__iframe" src=""></iframe>
					</div>
				</div>
			</div>
			<div class="interface-bottom">
				<span class="progress-bar" style="width: 50%">
				</span>
			</div>
		</main>
	<!-- <footer> -->
</body>
</html>

