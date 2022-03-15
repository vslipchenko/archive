<?php
  if(!defined('ACCESS')) die;

  class Database {

  	private $pdo;
  	// private $host;
  	// private $user;
  	// private $password;
  	// private $dbName;
  	// private $dbPrefix;
  	// private $charset;
  	// private $port;
  	// private $debug;
  	// private $statusFatal;
  	// private $lastInsertId;
  	private $lastQueryResult;
  	// private $lastQueryRowCount;

  	function __construct($params=array()) {
		// $this->pdo = false;
		// $this->host = DB_HOST; //hostname
		// $this->user = DB_USERNAME; //username
		// $this->password = DB_PASSWORD; //password
		// $this->dbName = DB_NAME; //name of your database
		// $this->dbPrefix = DB_PREFIX;
		// $this->port = DB_PORT;
		// $this->charset = DB_CHARSET;
		// $this->debug = DB_DEBUG;
		$this->connect();
	}

	function __destruct() {
		$this->disconnect();
	}

	private function connect() {
		// if (!$this->pdo) {
			try {
				$this->pdo = new PDO(
					'mysql:host='.DB_HOST.';dbname='.DB_NAME, 
					DB_USERNAME, 
					DB_PASSWORD, 
					array(
						PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES '.DB_CHARSET, 
						PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
   						PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
   					)
				);
				// $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			}
			catch (Exception $e) {
				die('PDO Connection Error : ' . $e->getMessage());
			}
 
			// if (!$this->pdo) {
			// 	echo 'PDO Connection Failed';
			// 	die();
			// } 
		
		// }
 
		// return $this->pdo;
	}

	private function disconnect() {
		// if ($this->pdo) {
			$this->pdo = null;
		// }
	}

	public function lastInsertId() {
		return $this->pdo->lastInsertId();
	}

	// public function lastQueryRowCount() {
	// 	return $this->lastQueryRowCount;
	// }

	public function lastQueryResult() {
		return $this->lastQueryResult;
	}

	public function query($query, $parameters = array()) {
		//$fetch = PDO::FETCH_ASSOC
		try {
            $stmt = $this->pdo->prepare($query);
            $this->lastQueryResult = $stmt->execute($parameters);
            // $this->lastQueryRowCount = $stmt->rowCount();
       
            // return $stmt->fetchAll($fetch);
            return $stmt;
        } 
        catch (Exception $e) {
            throw new Exception("PDO Query Error: " . $e->getMessage());
        }
	}

	public function begin() {
        $this->pdo->beginTransaction();
	}

	public function execute($query, $parameters = array()) {
		// var_dump('$query is ', $query);
		$stmt = $this->pdo->prepare($query);
        $stmt->execute($parameters);
        //return $stmt;
	}

	public function commit() {
		return $this->pdo->commit();
	}

	public function rollback() {
		return $this->pdo->rollBack();
	}

	public function quote($string) {
		return $this->pdo->quote($string);
	}

  }

  $this->db = new Database;
  //$test = $DB->connect();
  // try{
  // $lol=$DB->query('SELECT * FROM `ww_account` WHERE 1');
  // }
  // catch (Exception $e) {
		// 		die('Error : ' . $e->getMessage());
		// 	}
  // var_dump('test db is ',$lol);
  //echo 'DB class is here<br>';

?>