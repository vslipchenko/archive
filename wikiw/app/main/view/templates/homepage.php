<?php if(!defined('ACCESS')) die; ?>
<!DOCTYPE html>
<html lang="<?=LOCALE?>">
<head>
	<!-- <meta charset="UTF-8"> -->
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>WikiWarrior - Game-Based Learning website</title>
    <!-- <link href="https://fonts.googleapis.com/css?family=Nunito:900&display=swap" rel="stylesheet">  -->
<!--     <link href="https://fonts.googleapis.com/css?family=Jura:500|Roboto|Russo+One&display=swap&subset=cyrillic,cyrillic-ext" rel="stylesheet">    -->
    <link href="https://fonts.googleapis.com/css?family=Jura:500|Nunito:900|Russo+One&display=swap&subset=cyrillic,cyrillic-ext" rel="stylesheet"/>
    <link href="/app/main/view/fonts/pressuru/font.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="/app/main/view/css/homepage.css">

    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <script type="text/javascript" src="/app/main/js/homepage/functions.js" ></script>
    <script type="text/javascript" src="/app/main/js/homepage/locale/<?=LOCALE?>.js"></script>
    <script type="text/javascript" src="/app/main/js/homepage/main.js" ></script>
	<!-- <script type="text/javascript">const LOCALE = '<?=LOCALE?>';</script> -->
	</head>

	<body class="state_default theme_d">
		<!-- <span class="label theme_g">wikiw</span> -->
		<svg class="svg" height="100%" width="100%" preserveAspectRatio="none" viewBox="0 -50 525 275">
			<defs>
    			<filter id="filter" x="0" y="0" width="1" height="1">
      				<feFlood flood-color="gold"/>
      				<feComposite in="SourceGraphic" />
    			</filter>
  			</defs>
			<g class="svg__circle svg__circle_type_login"
			   onclick="App.show(2);">
    			<circle cx="150" cy="-25" r="23" stroke="gold" stroke-width="3" fill="gold"></circle>
    			<g class="svg__ankh">
    				<circle cx="150" cy="-30" r="10" fill="rgb(10, 10, 10)"></circle>
					<path d="M150 -40 140 0 160 0 Z" fill="rgb(10, 10, 10)"></path>
				</g>
				<!-- <g class="svg__close"> -->
				<!-- <path class="svg__close" d="M140 -35 160 -15 M160 -35 140 -15" stroke="rgb(10, 10, 10)"></path> -->
                <path class="svg__close" d="M140 -34.75 160 -15.25 M160 -34.75 140 -15.25" stroke="rgb(10, 10, 10)"></path>
                <path class="svg__memento-mori" d="M150 -35 140 -35 160 -35 Z" fill="rgb(10, 10, 10)"></path>
				<!-- </g> -->
			</g>
    		<g class="svg__circle svg__circle_type_register"
    		   onclick="App.show(1);">
    			<circle cx="375" cy="-25" r="24" stroke="gold" fill="rgba(0, 0, 0, 0)"></circle>
    			<!-- <g > -->
    			<!-- 	<line x1="351" y1="-25" x2="399" y2="-25" stroke="gold" stroke-width="1"></line>
    				<line x1="375" y1="-1" x2="375" y2="-49" stroke="gold" stroke-width="1"></line> -->
    			<path class="svg__init" d="M351 -25 399 -25 M375 -1 375 -49" stroke="gold"></path>
    			<!-- <path class="svg__close" d="M365 -35 385 -15 M385 -35 365 -15" stroke="gold"></path> -->
                <path class="svg__close" d="M365 -34.75 385 -15.25 M385 -34.75 365 -15.25" stroke="gold"></path>
                <path class="svg__memento-mori" d="M375 -35 365 -35 385 -35 Z" fill="gold"></path>
                <path class="svg__success-mark" d="M365 -25 365 -15.25 385 -34.75" stroke="lime" fill="none"></path>
    			<!-- </g> -->
    		</g>
    		<g class="svg__pyramids">
				<g class="svg__pyramid svg__pyramid_type_light">
        			<path d="M150 0 0 225 300 225 Z" fill="gold"></path>
   					<path d="M150 0 225 225 300 225 Z" fill="goldenrod"></path>
   				</g>
    			<g class="svg__pyramid svg__pyramid_type_darkness">
        			<path d="M375 0 225 225 525 225 Z" fill="gold"></path>
        			<path d="M375 0 300 225 525 225 Z" fill="goldenrod"></path>
        		</g>
   				<g class="svg__pyramid svg__pyramid_type_yin-yang"
   				   onclick="App.show(0);">
        		<!-- <path d="M262.5 169 L225 225 L300 225 Z" fill="goldenrod"></path> -->
        		<path d="M262.5 170 L226 225 L299 225 Z" fill="goldenrod"></path>
        			<!-- <path d="M263 170 226.5 225 299.5 225 Z" fill="goldenrod"></path> -->
        		<!-- <g class="svg__does-not-matter-be-wise">
        			<line style="stroke:white;stroke-width:1" y1="190" y2="190" x1="257" x2="268"></line>
        			<line style="stroke:white;stroke-width:1" y1="190" x2="262.5" y2="197" x1="268"></line>
        			<line style="stroke:white;stroke-width:1" x1="262.5" y1="197" y2="204" x2="268"></line>
        			<line style="stroke:white;stroke-width:1" x1="268" x2="257" y1="204" y2="204"></line>
        		</g> -->
        		<!-- <path d="M256 192 L268 192 L262.5 199 L268 206 L257 206 L257 212" stroke-width="1" stroke="rgb(10, 10, 10)" fill="none"></path> -->
        		<!-- <path d="M258 196 L266 196 L262 201 L266 206 L258 206 L258 211" stroke-width="1" stroke="rgb(10, 10, 10)" fill="none"></path> -->
        			<!-- <g class="svg__temet-nosce"> -->
        				<path class="svg__temet-nosce" d="M260 182 264.5 182 262.5 184 264.5 186 260.5 186 260.5 188 M260.5 190 260.5 191" stroke="rgb(10, 10, 10)" fill="none"></path>
        				<!-- <path class="svg__closee" d="M260 184 264.5 189 M264.5 184 260 189" stroke="white" fill="none"></path> -->
        				<path class="svg__close" d="M260 183 264.5 188 M264.5 183 260 188" stroke="rgb(10, 10, 10)" fill="none"></path>
        				<!-- <line x1="260.5" y1="190" x2="260.5" y2="191" stroke="rgb(10, 10, 10)" stroke-width="1"></line> -->
        				<!-- <text x="240" y="210" filter="url(#solid)" fill="rgb(10, 10, 10)">wikiw</text> -->
        			<!-- </g> -->
        			<text x="247.8" y="206.5" font-family="'Nunito', sans-serif" font-size="10" filter="url(#filter)" fill="rgb(10, 10, 10)">wikiw</text>
        		</g>
   			<!--  <g class="svg__pyramid svg__pyramid_type_life">
        		<path d="M262.5 169 L225 225 L300 225 Z" fill="rgba(0,0,0,0)" stroke="rgb(10, 10, 10)" stroke-width="0.5px"></path>
        	</g> -->
   			</g>
		</svg>
		<div class="login-form theme_g font_j">
			<span class="login-form__label font_r-o">Вход</span>
            <span class="login-form__message login-form__message_type_verification">
                Пожалуйста введите код подтверждения, отправленный Вам на почту
            </span>
            <input type="text" class="login-form__input login-form__input_type_verification-code" placeholder="Код">
			<input type="text" class="login-form__input login-form__input_type_email" placeholder="E-mail">
			<input type="password" class="login-form__input login-form__input_type_password" placeholder="Пароль">
			<button class="login-form__button login-form__button_type_login icon"
                    onclick="App.Login.login(L(this));"></button>
		</div>
		<div class="info">
			<span class="about__stand-by image"></span>
			<video class="about__video"
				   onclick="window.open(this.href, '_blank');"></video>
			<div class="about__descriptiion">
				<span class="about__title font_r-o">О проекте</span>
				<span class="about__content font_j">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</span>
			</div>
		</div>
		<div class="register-form theme_d font_j">
			<!-- <span class="register-form__background image"></span> -->
			<!-- <div class="register-form__content font_r-o"> -->
			<span class="register-form__label font_r-o">Регистрация</span>
            <span class="register-form__rose">Прошла успешно! Пожалуйста введите код подтверждения, отправленный Вам на почту, при первом входе в аккаунт.</span>
            <span class="register-form__rose emoji">🥳</span>
			<input type="text" class="register-form__input register-form__input_type_email" placeholder="E-mail">
			<input type="text" class="register-form__input register-form__input_type_username" placeholder="Имя пользователя">
			<input type="password" class="register-form__input register-form__input_type_password" placeholder="Пароль">
			<div class="register-form__google-p-t">
				This site is protected by reCAPTCHA and the Google
    			<a class="register-form__link" href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and
    			<a class="register-form__link" href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.
    		</div>
			<!-- <div class=""> -->
			<div class="register-form__message register-form__message_type_email">
				<span class="register-form__message-mark register-form__message-mark_color_aqua"></span>
				<span class="register-form__message-text"></span>
			</div>
			<div class="register-form__message register-form__message_type_username">
				<span class="register-form__message-mark register-form__message-mark_color_lime"></span>
				<span class="register-form__message-text"></span>
			</div>
			<div class="register-form__message register-form__message_type_password">
				<span class="register-form__message-mark register-form__message-mark_color_hotpink"></span>
				<span class="register-form__message-text"></span>
			</div>
            <div class="register-form__message register-form__message_type_duplicate">
                <span class="register-form__message-mark register-form__message-mark_color_aqua"></span>
                <span class="register-form__message-mark register-form__message-mark_color_lime"></span>
                <span class="register-form__message-text">Данный e-mail или имя пользователя уже используется</span>
            </div>
			<!-- </div> -->
			<div class="g-recaptcha"
				 data-sitekey="6Lfp5b4UAAAAAO_3oFKdYXUAjWu2y_9Mw2wNB3uR"
				 data-size="invisible"
      			 data-callback="submitRegister"
      			 data-expired-callback="grecaptcha.reset">
      		</div>
			<button class="register-form__button register-form__button_type_register icon"
      				onclick="App.Register.register(L(this));"></button>
			<!-- </div> -->
		</div>
    </body>
</html>