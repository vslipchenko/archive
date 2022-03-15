<?

if(!defined('ACCESS')) die;

class Action {
	private $app;

	function __construct(App $app) {
		$this->app = $app;
	}

  function Logout() {
    	// global $Auth;
    	//echo 'Logout';
    die(json_encode($this->app->auth->logout()));
    // jsonEncode(true);
  }

  function getUserVocabulary() {
    die(json_encode($this->app->user->getUserData(array('user_vocabulary_'.strtolower($_POST['language']) => 'vocabulary'))['user_vocabulary_'.strtolower($_POST['language'])][0]['vocabulary']));
  }
}

$this->action = new Action($this);

?>