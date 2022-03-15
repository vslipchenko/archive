<?

if(!defined('ACCESS')) die;

class Action {
	private $app;

	function __construct(App $app) {
		$this->app = $app;
	}

	function Login() {
		// if(!validEmail($_POST['email']) || !validPassword($_POST['password'])) echo json_encode();
    if ($_POST['code']) {
      if (validEmail($_POST['email']) && validCode($_POST['code'])) die(json_encode($this->app->auth->verify($this->app->user, $_POST['email'], $_POST['code'])));
      // else {
        die(json_encode(3));
      // }
    }
    else {
      if(validEmail($_POST['email']) && validPassword($_POST['password'])) die(json_encode($this->app->auth->login($_POST['email'], $_POST['password'])));
      // }
      // else {
       die(json_encode(0));
      // }
    }
  }

  function Register() {
    // global $Auth;
    // /^[\pL\d.!#$%&‚*+\/=?^_{|}~-]{1,64}@[\pL\d-]+(?:.[\pL\d-]+)*$/u email
    // /^[\pL\d.!#$%&‚*+\/=?^_{|}~-]{1,64}@([\pL\d-]+(?:.[\pL\d-]+)*|\[[\pL\d.:]+\])$/u
    // /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*\d)[\pL\d{}[\]()@#%&$|!?^*.:;,_~=+-]{6,}$/u password 
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    $recaptcha = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6Lfp5b4UAAAAABXCzTjlYnfrP79ipKDJbD6IEqfC&response=".$_POST['token']), true);
    // var_dump($response);
    // die;
    if (mb_strlen($email) > 320 || mb_strlen($email) < 3) {
      //Forbidden symbols
      $email = '';
      $e[] = 'email:0';
    }
    else if (!validEmail($email)) {
      		//wrong length
      $email = '';
      $e[] = 'email:1';
    }

    if (mb_strlen($username) > 64 || mb_strlen($username) < 1) {
      $username = '';
      $e[] = 'username:0';
    }
    else if (!validUsername($username)) {
      		// mb_strlen(preg_replace('/^(@?[\pL\d]+([ _.][\pL\d]+)*)(\s[\pL\d]+([ _.][\pL\d]+)*)*$/u', '', $username))
      $username = '';
      $e[] = 'username:1';
    }

    if (mb_strlen($password) > 3000 || mb_strlen($password) < 6) {
      		//Forbidden symbols
      $password = '';
      $e[] = 'password:0';
    }
    else if (!validPassword($password)) {
      		//wrong length
      $password = '';
      $e[] = 'password:1';
    }

    if ($email && $username && $password) {
      die(json_encode(
        $this->app->auth->register(array(
          'email' => $email,
          'username' => $username,
          'password' => $password,
          'link' => str_replace(' ', '-', $username),
          'verificode' => randomStr(6)
        ))
      ));
    }
    // else {
        	//ok
      	// $email = preg_replace('/^[\pL\d.!#$%&‚*+\/=?^_{|}~-]{1,64}@([\pL\d-]+(?:.[\pL\d-]+)*|\[[\pL\d.:]+\])$/u', '', $email);
    die(json_encode($e));
    // }
    	// var_dump('errors is ', $e);
  }
}

$this->action = new Action($this);

?>