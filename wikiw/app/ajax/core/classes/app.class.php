<?php

  if(!defined('ACCESS')) die;

  class App {

    // private $db;
    // private $session;
    // private $data;
   // private $session;

    function __construct() {
      require_once(ROOT.'/app/ajax/core/functions.php');

      require_once(ROOT.'/app/ajax/core/classes/session.class.php');
// echo json_encode($this->session->get('page'));die;
      require_once(ROOT.'/config.php');

      require_once(ROOT.'/app/ajax/core/classes/db.class.php');

      require_once(ROOT.'/app/ajax/core/classes/auth.class.php');

      require_once(ROOT.'/app/ajax/core/classes/user.class.php');

      // require_once(ROOT.'/app/ajax/locale/'.$this->session->get('page').'/'.LOCALE.'.php');
      require_once(ROOT.'/app/ajax/locale/'.$_SESSION['page'].'/'.LOCALE.'.php');

      // require_once(ROOT.'/app/ajax/core/actions.php');
      require_once(ROOT.'/app/ajax/core/classes/action.'.$_SESSION['page'].'.class.php');

    }
    
  	//public function render($templateName, $isAjax = false, $data = null, Session $Session = null) {
    // public function render($templateName, $extraParameters = array()) {
    public function render($template) {
      ob_start();
      require_once(ROOT.'/app/view/default/templates/snippets/'.$template.'.php');
      return ob_get_clean();
  	}

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

    public function action($a) {
      $a($this);
    }

    // public function loadDependencies() {
    //   $page = $this->session->get('page');
    //   switch ($page) {
    //     case 'profile':
    //       # code...
    //       require_once(ROOT.'/app/ajax/core/classes/auth.class.php');
    //       require_once(ROOT.'/app/ajax/core/classes/user.class.php');
    //       break;
        
    //     case 'homepage':
    //       require_once(ROOT.'/app/ajax/locale/homepage/'.LOCALE.'.php');
    //       require_once(ROOT.'/app/ajax/core/classes/auth.class.php');
    //       # code...
    //       break;

    //     case 'pageant':
    //       # code...
    //       break;
    //   }
    // }  	
  }

  $App = new App;

?>