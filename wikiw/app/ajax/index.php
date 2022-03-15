<?php

// define('IS_AJAX', isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest');

if(!(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') || empty($_POST['action'])) die;

define('ACCESS', true);

define('ROOT', $_SERVER['DOCUMENT_ROOT']);

require_once(ROOT.'/app/ajax/core/classes/app.class.php');

$a = filter_var($_POST['action'], FILTER_SANITIZE_STRING);

$App->action->$a();

?>