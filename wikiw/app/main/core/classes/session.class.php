<?php

  if(!defined('ACCESS')) die;

  class Session {

    // private $userID;
    // private $userName;
    // private $userStatus;
    // private $userValid;
    // private $cooldown;

  	function __construct() {
  		// $this->start();
      session_start();
      session_regenerate_id(true);
      // unset($_SESSION['temp']);
      // $this->sessionRefresh();
  	}

    // private function start() {
    //   session_start();
    //   session_regenerate_id(true);
    // }

    // private function sessionRefresh() {
    //   empty($_SESSION['userID']) ? null : $_SESSION['userID'];
    //   empty($_SESSION['userName']) ? null : $_SESSION['userName'];
    //   empty($_SESSION['userStatus']) ? null : 1; 
    //   empty($_SESSION['userValid']) ? null : 1;
    //   empty($_SESSION['cooldown']) ? null : $_SESSION['cooldown'];

    //   $_SESSION['userID'];
    // }

    // public function updateSessionData ($d) {
    //   foreach ($d as $k => $v) {
    //     $_SESSION[$k] = $v;
    //   }
    // }

    public function set($k, $v) {
      if ($v) {
        $_SESSION[$k] = $v;
      }
      else {
        foreach ($k as $i => $v) {
          $_SESSION[$i] = $v;
        }
      }
    }

    public function get($k) {
      return $_SESSION[$k] ?? null;
    }

    public function unset($k) {
      unset($_SESSION[$k]);
    }

    // public function setCooldown($actionName, $secDelay, $currentTime) {
    //   $this->cooldown[$actionName] = $_SESSION['cooldown'][$actionName] = $currentTime.'|'.$secDelay;
    // }

    // public function checkCooldown($actionName, $remainingTime = false) {

    //   if(!is_null($this->cooldown[$actionName])) {
    //     $time = explode('|',$this->cooldown[$actionName]);
    //     $initialTime = $time[0];
    //     $delay = $time[1];
  
    //     if((time() - $initialTime) < $delay){
    //       return $remainingTime ? (time() - $initialTime) : true;
    //     }
    //     else {
    //       return false;
    //     }
    //   }
    //   else {
    //     return false;
    //   }
    // }

    // public function resetCooldown($actionName = null) {
    //   if($actionName){
    //     $this->cooldown[$actionName] = $_SESSION['cooldown'][$actionName] = null;
    //   }
    //   else {
    //     $this->cooldown = $_SESSION['cooldown'] = null;
    //   }
    // }



    // public function setCooldown($actionName, $secDelay, $currentTime) {
    //   $_SESSION['cooldown'][$actionName] = $currentTime.'|'.$secDelay;
    // }

    // public function getCooldown($actionName = null) {
    //   if(!is_null($actionName)) {
    //     return $_SESSION['cooldown'][$actionName];
    //   }
    //   else {
    //     return $_SESSION['cooldown'] ? $_SESSION['cooldown'] : null;
    //   }     
    // }

    // public function checkCooldown($actionName, $remainingTime = false) {

    //   if(!is_null($this->getCooldown($actionName))) {
    //     $time = explode('|', $this->getCooldown($actionName));
    //     $initialTime = $time[0];
    //     $delay = $time[1];
  
    //     if((time() - $initialTime) < $delay){
    //       return $remainingTime ? (time() - $initialTime) : true;
    //     }
    //     else {
    //       return false;
    //     }
    //   }
    //   else {
    //     return false;
    //   }
    // }

    // public function resetCooldown($actionName = null) {
    //   if(!is_null($actionName)) {
    //     $_SESSION['cooldown'][$actionName] = null;
    //   }
    //   else {
    //     $_SESSION['cooldown'] = null;
    //   }
    // }

    // public function getUserID() {
    //   return $this->userID;
    // }

    // public function getUsername() {
    //   return $this->userName;
    // }

    // public function getUserStatus() {
    //   return $this->userStatus;
    // }

    // public function getUserValid() {
    //   return $this->userValid;
    // }

  	public function destroy() {
  		session_destroy();
  	}

  }

  $this->session = new Session;



 ?>