<?php
  
  if(!defined('ACCESS')) die;


  // function jsonEncode($returnStatement = false, $extraParameters = array()) {
  //   $jsonParameters = array(
  //                           'returnStatement' => $returnStatement,
  //                           'returnType' => gettype($returnStatement)
  //                          );
  //   if ($extraParameters) $jsonParameters = array_merge($jsonParameters,$extraParameters);
  // 	echo json_encode($jsonParameters);
  // }

  // function generateString($length) {
  // 	return (bin2hex(random_bytes($length)));
  // }

  // function generateID($lenght = 13) {
  //   if (function_exists("random_bytes")) {
  //       $bytes = random_bytes(ceil($lenght / 2));
  //   } elseif (function_exists("openssl_random_pseudo_bytes")) {
  //       $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
  //   } else {
  //       throw new Exception("Crypto error");
  //   }
  //   return substr(bin2hex($bytes), 0, $lenght);
  // }

  function randomStr ($length) {
    $s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?()[]{}|/:@#$%^&*~<>+=-';
    $n = '';
    for ($i = 0; $i < $length; $i++) {
      $n .= $s[mt_rand(0, strlen($s) - 1)];
    }
    return $n;
  }

  // function randNewConst($variableName, $startNum, $endNum) {
  //   $randomNum = rand($startNum, $endNum);
  //   return constant($variableName.$randomNum);
  // }

  // function checkPostData(){
  //   if(ACTION == 'Login') {
  //     if(!(2<strlen(trim($_POST['Login'])) && strlen(trim($_POST['Login']))<81) || !(6<strlen(trim($_POST['Password'])) && strlen(trim($_POST['Password']))<34) || !preg_match('/^[a-zA-Z0-9]+(?:[_@.][a-zA-Z0-9]+)*$/',$_POST['Login']) || !preg_match('/^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$/',$_POST['Password'])) {

  //       exit;
  //     }
  //   }
  //   if(ACTION == 'Register') {
  //     if(!(2<strlen(trim($_POST['Username'])) && strlen(trim($_POST['Username']))<34) || !(4<strlen(trim($_POST['Email'])) && strlen(trim($_POST['Email']))<81) || !(6<strlen(trim($_POST['Password'])) && strlen(trim($_POST['Password']))<34) || !preg_match('/^[a-zA-Z0-9]+(?:[_][a-zA-Z0-9]+)*$/',$_POST['Username']) || !preg_match('/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*[a-z]{0,})$/',$_POST['Email']) || !preg_match('/^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$/',$_POST['Password'])) {

  //       exit;
  //     }
  //   }
  //   if(ACTION == 'Validate') {
  //     if(strlen(trim($_POST['Answer'])) !== 13 || !isset($_POST['Response'])) {
  //       exit;
  //     }
  //   }
  // }

  function validEmail($e) {
    return mb_strlen(preg_replace("/^[\pL\d.!#$%&‚*+\/=?^_{|}~-]+@([\pL\d-]+(?:.[\pL\d-]+)*|\[[\pL\d.:]+\])$/u", '', $e)) ? false : true;
  }

  // function validUsername($u) {
  //   return mb_strlen(preg_replace("/^(@?[\pL\d\u{00a9}\u{00ae}\u{2000}-\u{3300}\u{d000}-\u{dfff}\u{d83c}\u{d83d}\u{d83e}]+([ _.][\pL\d\u{00a9}\u{00ae}\u{2000}-\u{3300}\u{d000}-\u{dfff}\u{d83c}\u{d83d}\u{d83e}]+)*)(\s[\pL\d]+([ _.][\pL\d]+)*)*$/", '', $u)) ? false : true;
  // }

  function validUsername($u) {
    return mb_strlen(preg_replace("/^(@?[\pL\d\u{00a9}\u{00ae}\u{2000}-\u{3300}\u{d000}-\u{dfff}\u{d83c}\u{d83d}\u{d83e}]+([ _][\pL\d\u{00a9}\u{00ae}\u{2000}-\u{3300}\u{d000}-\u{dfff}\u{d83c}\u{d83d}\u{d83e}]+)*)(\s[\pL\d]+([ _][\pL\d]+)*)*$/", '', $u)) ? false : true;
  }

  function validPassword($p) {
    return mb_strlen(preg_replace("/^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*\d)[\pL\d\/[\]{}()<>@#%&$|!?\"'`^*.:;,_~=+-]+$/u", '', $p)) ? false : true;
  }

  function validCode($c) {
    return strlen(preg_replace('/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?()[\]{}|\/:@#$%^&*~<>+=-]{6}/', '', $c)) ? false : true;
  }

  function sendMail($to, $subject, $body) {

    $headers  = "From: WikiWarrior < ".EMAIL." >\n";
    $headers .= "Cc: WikiWarrior < ".EMAIL." >\n"; 
    $headers .= "X-Sender: WikiWarrior < ".EMAIL." >\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();
    $headers .= "X-Priority: 1\n"; // Urgent message!
    $headers .= "Return-Path: ".EMAIL."\n"; // Return path for errors
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=iso-8859-1\n";
    
    if(mail($to, $subject, $body, $headers)) return true;
    return false;
  }

  // function dropToBLOB($dropList) {
  //   foreach ($dropList as $type => $array) {
  //     $charArr = array_fill_keys(array_keys(array_flip(preg_split('//u', $array, null, PREG_SPLIT_NO_EMPTY))),0);
  //     foreach ($charArr as $char => $quantity) {
  //         $newCharArr[$type][$char] = $quantity;
  //       }
  //   }
  //   return $newCharArr;
  // }


  function expToPercent($exp) {
    $x = floor(($exp*100)/1000);
    return $x;
  }

?>