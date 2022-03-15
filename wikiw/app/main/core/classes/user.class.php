<?php

  if(!defined('ACCESS')) die;

  class User {
    
    private $db;
    private $session;
    
    // private $level;
    // private $health;
    // private $answered;
    // private $experience;

    function __construct(Database $db, Session $session) {
      $this->db = $db;
      $this->session = $session;
    }
    
    public function getUserData($queryArray = array(), $userID = null) {
      
      $userID = $userID ?: $this->session->getUserID();
      //if(!is_null($userID) && $this->session->isAble()) {
      if(!is_null($userID)) {

        $parameters = array(
          ':user_id' => $userID
        );    
        
        if($queryArray){

          $tables = array_keys($queryArray);

          foreach ($tables as $table) {
            # code...
            $selectString = $queryArray[$table]; 

            if($selectString) {
              $query = 'SELECT '.$selectString.'
                        FROM '.DB_PREFIX.$table.'
                        WHERE user_id = :user_id';
            }
            else {
              $query = 'SELECT *
                        FROM '.DB_PREFIX.$table.'
                        WHERE user_id = :user_id';
            } 

            $qHandler[$table] = $this->db->query($query, $parameters);
            //$rowCount[$table] = $this->db->getLastQueryRowCount();
          }   
        }
        else {
          $query = 'SELECT *
                    FROM '.DB_PREFIX.'user_data
                    WHERE user_id = :user_id';

          $qHandler = $this->db->query($query, $parameters);
          //$rowCount = $this->db->getLastQueryRowCount();
        }

        //if($rowCount) {
        return $qHandler;
        // }
        // else {
        //   return false;
        // }
      }
      else {
        return false;
      }
    }

    public function countProgress($curExp, $ansLength) {
      //$userID = $this->session->getUserID();

      if(!is_null($this->session->getUserID()) && $this->session->isAble()) {
        $result = array();

        $summaryExp = $curExp + intval(round(($ansLength)*mt_rand(1,2)/3));
    //$exp = 1000;
        $lvlexp = number_format($summaryExp/1000, 3);
        
        $newexp = intval(explode('.',$lvlexp)[1]);
        $newlevel = intval(explode('.',$lvlexp)[0]);

        if($newlevel>0) {
          //$this->countCharacteristics($newlevel);
          $newHealth = mt_rand(1, $newlevel*3);
          $newAttack = mt_rand(1, $newlevel*2);
          $newDefense = mt_rand(1, $newlevel*2);
          $newMana = $newAttack + $newDefense;
        }
        else {
          $newHealth = $newAttack = $newDefense = $newMana = 0;
        }

        $result['exp'] = $newexp;
        $result['lvl'] = $newlevel;
        $result['health'] = $newHealth;
        $result['attack'] = $newAttack;
        $result['defense'] = $newDefense;
        $result['mana'] = $newMana;
    
        return $result;
      }
      else {
        return false;
      }
    }

    public function getIdByUsername($username) {
      $parameters = array(
          ':uname' => $username
      );
      $query = 'SELECT id 
                       FROM '.DB_PREFIX.'user
                       WHERE uname = :uname';
      return $this->db->query($query, $parameters)[0]['id'];
    }

    // public function getPageantUserData($username) {

    //   $userID = $this->getIdByUsername($username);

    //   //var_dump($userID);die;

    //   // $parameters = array(
    //   //     ':user_id' => $userID
    //   // );

    //   // $query = 'SELECT settings
    //   //                  FROM '.DB_PREFIX.'user_data
    //   //                  WHERE user_id = :user_id';

    //   //return $this->db->query($query, $parameters);
    //   return $this->getUserData(array('user_data' => 'settings'), $userID);
    // }

  }

  $this->user = new User($this->db, $this->session);

  //$userData = $User->getUserData($Session->getUserID());
  //var_dump('user data is ',$User->getUserData($Session->getUserID()));
  //echo 'User class is here';

?>