<?php

  if(!defined('ACCESS')) { die(); }

  // define( "THEME", 'default' );

  define( "LOCALE", $_SESSION['locale'] ?? 'ru' );

  define( "DB_HOST", 'localhost' );

  define( "DB_PORT", '3306' );

  define( "DB_USERNAME", 'root' );

  define( "DB_PASSWORD", '' );

  define( "DB_NAME", 'wikiw' );

  define( "DB_PREFIX", 'ww_' );

  define( "DB_CHARSET", 'utf8mb4' );

  define( "EMAIL", 'wikiwarrior.app@gmail.com' );

  // define('Config', array(

  //   'LOCALE' => $_SESSION['locale'] ?? 'ru',

  //   'DB_HOST' => 'localhost',

  //   'DB_USERNAME' => 'root',

  //   'DB_PASSWORD' => '',

  //   'DB_NAME' => 'wikiw',

  //   'DB_PREFIX' => 'ww_',

  //   'DB_CHARSET' => 'utf8mb4',

  //   'EMAIL' => 'wikiwarrior.app@gmail.com'

  // ));

?>