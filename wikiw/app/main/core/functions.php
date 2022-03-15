<?php
  
  if(!defined('ACCESS')) die();

  // function validUsername($u) {
  //   return mb_strlen(preg_replace("/^(@?[\pL\d\u{00a9}\u{00ae}\u{2000}-\u{3300}\u{d000}-\u{dfff}\u{d83c}\u{d83d}\u{d83e}]+([ _.][\pL\d\u{00a9}\u{00ae}\u{2000}-\u{3300}\u{d000}-\u{dfff}\u{d83c}\u{d83d}\u{d83e}]+)*)(\s[\pL\d]+([ _.][\pL\d]+)*)*$/", '', $u)) ? false : true;
  // }

  function validUsername($u) {
    return mb_strlen(preg_replace("/^(@?[\pL\d\u{00a9}\u{00ae}\u{2000}-\u{3300}\u{d000}-\u{dfff}\u{d83c}\u{d83d}\u{d83e}]+([ _][\pL\d\u{00a9}\u{00ae}\u{2000}-\u{3300}\u{d000}-\u{dfff}\u{d83c}\u{d83d}\u{d83e}]+)*)(\s[\pL\d]+([ _][\pL\d]+)*)*$/", '', $u)) ? false : true;
  }
  

  // function expToPercent($exp) {
  //   $x = floor(($exp*100)/1000);
  //   return $x;
  // }

?>