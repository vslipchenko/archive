<?php
// var_dump($_SERVER["HTTP_ACCEPT_LANGUAGE"]);die();
  define('ACCESS', true);

  define('ROOT', $_SERVER['DOCUMENT_ROOT']);

  require_once(ROOT.'/app/main/core/classes/app.class.php');
 
  // $App->handleRequest();
  // define('PAGE', $App->definePage());
  // if (PAGE) {
  // 	require_once(ROOT.'/app/locale/'.LOCALE.'/'.PAGE.'.php');
  // $App->handle('test');

  $App->loadPage();
  // var_dump($_SESSION['page']);
  // }

  // var_dump($App);

  // $Auth->logout();

  
?>