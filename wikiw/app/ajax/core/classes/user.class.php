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
    
    public function init(string $id) {
      // $id = $this->session->get('id');
      if (is_numeric($id)) {

        try {
          $this->db->begin();

          $query = "INSERT INTO ".DB_PREFIX."user_data
                    (user_id)
                    VALUES ($id)";

          $this->db->execute($query);
            // $table = DB_PREFIX.'user_collection';
          $query = "INSERT INTO ".DB_PREFIX."user_collection
                    (user_id)
                    VALUES ($id)";

          $this->db->execute($query); //Можно одним запросом
            // $table = DB_PREFIX.'user_vocabulary_en';
          $query = "INSERT INTO ".DB_PREFIX."user_vocabulary_en
                    (user_id)
                    VALUES ($id)";

          $this->db->execute($query);
            // $table = DB_PREFIX.'user_vocabulary_ru';

          $query = "INSERT INTO ".DB_PREFIX."user_vocabulary_ru
                    (user_id)
                    VALUES ($id)";

          $this->db->execute($query);

          $this->db->commit();
        }
        catch (Exception $e) {
          $this->db->rollback();
        }
      } 
      else {
        die;
      }
    }

    public function getUserData(array $queryArray) {
      
      $id = $this->session->get('id');
      //if(!is_null($userID) && $this->session->isAble()) {
      if(is_numeric($id)) {

        $parameters = array(
          ':user_id' => $id
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

            $result[$table] = $this->db->query($query, $parameters)->fetchAll();
            //$rowCount[$table] = $this->db->getLastQueryRowCount();
          }   
        }
        else {
          $query = 'SELECT *
                    FROM '.DB_PREFIX.'user_data
                    WHERE user_id = :user_id';

          $result = $this->db->query($query, $parameters)->fetchAll();
          //$rowCount = $this->db->getLastQueryRowCount();
        }

        //if($rowCount) {
        return $result;
        // }
        // else {
        //   return false;
        // }
      }
      else {
        return false;
      }
    }

    public function updateUserData(array $queryArray) {

      $userID = $this->session->getUserID();

      if(!is_null($userID) && $this->session->isAble()) {

        $defaultParameters = array(':user_id' => $userID);

        try{

          if(count($queryArray)>1) {
            $this->db->prepare();
          }

          foreach ($queryArray as $action => $tblcolval){
 
            foreach ($tblcolval as $table => $colval) {

              $query = 'UPDATE '.DB_PREFIX.$table.'
                        SET';

              $parameters = $defaultParameters;

              foreach ($colval as $column => $value) {
            //$query.= ' '.$column.' = '.$this->db->quote($value).',';
                $parameter = ':'.$column;
                $parameters[$parameter] = $value; 
             
                if($action == 'update') {
                  $query.= ' '.$column.' = '.$parameter.',';
                }
                if($action == 'add') {
                //Detect type
                  if(gettype($value) == 'integer') {
                    $query.= ' '.$column.' = '.$column.' + '. $value .',';
                  }
                  if(gettype($value) == 'string') {
                    $query.= ' '.$column.' = CONCAT('.$column.', '. $this->db->quote($value) .'),';
                  }
                }
              //}
              }

              $query = rtrim($query, ','); //Trim last coma
              $query.= ' WHERE user_id = :user_id';

              if($action == 'add') {
                $parameters = $defaultParameters;
              }

            //var_dump($query);
              $this->db->execute($query, $parameters);
            }
  
          }

          if(count($queryArray)>1) {
            $this->db->commit();
          }

          return true;
        }
        catch(Exception $e) {
          //$e->getMessage();
          return false;
        }
      }
      else {
        return false;
      }
    }

    public function updateLastActivity() {
      if($this->session->isAble()) {

        $parameters = array(
          ':user_id' => $this->session->getUserID()
        ); 

        $query = 'UPDATE '.DB_PREFIX.'user_data
                  SET last_activity = NOW()
                  WHERE user_id = :user_id';

                    $this->db->query($query, $parameters);
        $rowCount = $this->db->getLastQueryRowCount();

        $rowCount ?: exit;
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