<?

if(!defined('ACCESS')) die;

class Action {
	private $app;

	function __construct(App $app) {
		$this->app = $app;
	}
  
}

$this->action = new Action($this);

?>