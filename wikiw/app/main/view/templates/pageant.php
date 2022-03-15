<?php if(!defined('ACCESS')) die; ?>

<!-- <?php $this->render('Header'); ?> -->

<body style="background: rgb(25, 25, 25) 
                         <?php echo $background ? 'url('. $background .')' : 'none'; ?> 
                         repeat fixed center center / cover;">

    	<div class="user-card"
    	     onclick="<?php echo $hymn ? 'playHymn()' : ''; ?>">
    		<img class="image" src="<? echo $avatar; ?>"/>
    		<span class="username"><?=USERNAME?></span>
    	</div>

    <!-- <footer class="footer"> -->
</body>

<!-- <?php $this->render('Footer'); ?> -->