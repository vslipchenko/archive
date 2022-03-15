<?php

  if(!defined('ACCESS')) die;

  class Auth {
    
    private $dbase;
    public $session;
  	  	
  	function __construct(DBase $DBase, Session $Session) {   
      $this->session = $Session;
      $this->dbase = $DBase;
  	}

  	public function logout() {
      if($this->session->get('id')) {
        $this->session->destroy();
      }
      else {
        die();
      }
  	}

  	public function register($data) {
  		// if (is_null($this->session->getUserStatus()) && !is_null($postName) && !is_null($postPassword) && !is_null($postEmail)) {
      if (!is_numeric($this->session->get('id'))) {
  			$parameters = array(
            	':uname' => $data['username'],
              ':link' => $data['link'],
            	':email' => $data['email'],
            	':pass' => password_hash($data['password'], PASSWORD_DEFAULT),
              ':vcode' => $data['verificode']
        );

        $query = 'INSERT INTO '.DB_PREFIX.'user 
                  (uname, link, email, pass, vcode)
                  VALUES (:uname, :link, :email, :pass, :vcode)';

        $this->dbase->query($query, $parameters);

        return $this->dbase->lastQueryResult();
      }
      else {
        die();
      }
  	}

  	public function login($email, $password) {
        if (!is_numeric($this->session->get('id'))) {
    
          $parameters = array(
            	':email' => $email,
            	//':password' => $postPassword
          );
       	// var_dump(Dict);die;
          $query = 'SELECT id, pass, vcode
                    FROM '.DB_PREFIX.'user
                    WHERE email = :email';
                    //WHERE  (name = :login AND password = :password) OR (email = :login AND password = :password) LIMIT 1';
        	$result = $this->dbase->query($query, $parameters)->fetchAll();

          if (password_verify($password, $result[0]['pass'])) {
            if ($result[0]['vcode']) {
              //send vcode on email
              sendMail($email, Dictionary['verification'], Dictionary['verificationCode'] . $result[0]['vcode']);
              return 2;
            }
            else {
              $this->session->set('id', $result[0]['id']);
              return 1;
            }
          }
          else {
            return 0;
          }          
        }
        else {
          die;
        }
  	}

  	public function verify(User $User, $email, $code) {
    	if (!$this->session->get('id')) {

  			$parameters = array(
          ':email' => $email,
          // ':pass' => $password,
          ':vcode' => $code
        );

        $query = 'SELECT id
                  FROM '.DB_PREFIX.'user
                  WHERE email = :email
                  AND vcode = :vcode';

        $id = $this->dbase->query($query, $parameters)->fetchAll()[0]['id'];

        if ($id) {
          $this->session->set('id', $id);

          $query = "UPDATE ".DB_PREFIX."user
                    SET vcode = ''
                    WHERE id = $id";

          $this->dbase->query($query);

          $query = "SELECT id
                    FROM ".DB_PREFIX."user_data
                    WHERE id = $id";

          if (!is_numeric($this->dbase->query($query)->fetchAll()[0]['id'])) {
            // var_dump('initiate');die;
            $User->init($id);
          }
          // Need to create user tables and set valcode to null
          return 1;
        }

        return 3;
  		}
  		else {
  			die;
  		}
  	}

    public function sendValidationCode(){

      if(!is_null($this->session->getUserStatus()) && is_null($this->session->getUserValid()) && !is_null($this->session->getUserID())) {
        $parameters = array(
          ':id' => $this->session->getUserID()
        );

        $query = 'SELECT email,valcode
                  FROM '.DB_PREFIX.'user
                  WHERE id = :id';

        $qHandler = $this->dbase->query($query, $parameters);
        $rowCount = $this->dbase->getLastQueryRowCount();
                
        if($rowCount) {
          $qEmail = $qHandler[0]['email'];
          $qCode = $qHandler[0]['valcode'];
 
          if(!$this->session->checkCooldown('sendMail')) {

            if(sendMail($qEmail,$qCode)){        
              $this->session->setCooldown('sendMail',30,time());
            
              return true;
            }
            else{
              return false;
            }
          }
          else {
            return $this->session->checkCooldown('sendMail',true);
          }
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }

    public function checkValidationCode($answerCode) {

     if(!is_null($this->session->getUserStatus()) && is_null($this->session->getUserValid()) && !is_null($this->session->getUserID())) {
        $parameters = array(
          ':id' => $this->session->getUserID()
        );

        $query = 'SELECT valcode
                  FROM '.DB_PREFIX.'user
                  WHERE id = :id';

        $qHandler = $this->dbase->query($query, $parameters);
        $rowCount = $this->dbase->getLastQueryRowCount();

//var_dump('qVercode is ',$qHandler[0]['valcode'],'code is ',$code);exit;

        if($rowCount) {
          if($qHandler[0]['valcode'] == $answerCode) {
            $query = 'UPDATE '.DB_PREFIX.'user
                      SET valcode = NULL
                      WHERE id = :id';
            $this->dbase->query($query, $parameters);

            return true;
          }
          else {
            return false;
          }
        }
        else {
          return false;
        }
     }
     else {
      return false;
     }
    }

 }

  $Auth = new Auth($DBase, $Session);
//echo 'Auth class is here<br>';
  //$Auth->logout();
  //var_dump('login is ',$Auth->login('t@t.com','111'));
  //var_dump($_SESSION['cooldown']);
   //var_dump('sendmail is ',$Session->checkCooldown('sendMail'));
     //var_dump('user instance is ',$Auth);
   //var_dump('validate is ',$Auth->validate());
  //var_dump('register is ',$Auth->register('lol','t@t.com','111'));
  //var_dump('session id is ',session_id());
  //var_dump('user class return is ',$Auth->login('test','111111'));var_dump('status is ',$Auth->status);var_dump('session username is ', $_SESSION['userLogin']);die;
  //echo '<pre>';
  //var_dump('validated is',$Auth->isValidated());
    //var_dump('login is',$Auth->isLogged());
    //var_dump('login is',$Auth->isOK());
    //var_dump($Auth->login);
    //var_dump($Auth->status);
     //var_dump($Auth->valid);
     //var_dump($Auth->id);
  //echo '</pre>';
   
  //var_dump('user register is ',$Auth->register('new','test1@test.com','lololol'));die;
  //var_dump($Auth->status);
  

?>