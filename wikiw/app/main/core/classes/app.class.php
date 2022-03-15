<?php

  if(!defined('ACCESS')) die();

  class App {

    private $db;
    private $session;
    // private $data;
   // private $session;

    function __construct() {
      require_once(ROOT.'/app/main/core/functions.php');

      require_once(ROOT.'/app/main/core/classes/session.class.php');

      require_once(ROOT.'/config.php');

      require_once(ROOT.'/app/main/core/classes/db.class.php');
    }

    // public function handle($fn) {
    //   $fn($this);
    // }

   //  public function render($template) {

   //    require_once(ROOT.'/app/view/default/templates/main/'.$template.'.php');
  	// }

    private function getContent($contentSelector) {
      
      $parameters = array(
        ':selector' => $contentSelector
      );

      $query = 'SELECT selector,content 
                FROM '.DB_PREFIX.'content_'.LOCALE.'
                WHERE selector LIKE CONCAT(:selector,"%")';

      $qHandler = $this->dbase->query($query, $parameters);
      $rowCount = $this->dbase->getLastQueryRowCount();
      //var_dump('rowCount is ',$rowCount);
      //var_dump('qHandler is ',$qHandler);
      if($rowCount){  
          ob_start();
          for($i=0;$i<count($qHandler);$i++) {
            // $this->data[$contentSelector][$qHandler[$i]['selector']] = $qHandler[$i]['content'];
            // if($outputContent){
              echo $qHandler[$i]['content'];
            //}
          }
          return ob_get_clean();
        }
        //var_dump('this data is ',$this->data);     
    }

    public function loadPage() {
      if (strlen($_SERVER['REQUEST_URI']) > 1) {
       
        $fragments = array_filter(explode('/', $_SERVER['REQUEST_URI']));
        if (count($fragments) === 1) {
          if (validUsername(array_pop($fragments))) { //check if user exist
            $this->session->set('page', 'pageant');
             // var_dump('here1', $_SESSION);
            // die;
            require_once(ROOT.'/app/main/locale/pageant/'.LOCALE.'.php');
            require_once(ROOT.'/app/main/view/templates/pageant.php');
          }
          else {
            require_once(ROOT.'/app/main/view/templates/404.php');
          }
        }
      }
      else if (is_numeric($this->session->get('id'))) {
        
        $this->session->set('page', 'profile');
         // var_dump('here2', $_SESSION);
// var_dump($_SESSION);die;
        require_once(ROOT.'/app/main/core/classes/user.class.php');
        require_once(ROOT.'/app/main/locale/profile/'.LOCALE.'.php');
        require_once(ROOT.'/app/main/view/templates/profile.php');
      }
      else {
        $this->session->set('page', 'homepage');
         // var_dump('here3', $_SESSION);
        require_once(ROOT.'/app/main/locale/homepage/'.LOCALE.'.php');
        require_once(ROOT.'/app/main/view/templates/homepage.php');
      }
       
    }  	
  }
  //$View = new View($Session);
  $App = new App;

?>