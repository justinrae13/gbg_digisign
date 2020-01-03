<?php
    $hn      = 'login-151.hoststar.ch';
    $un      = 'gbg_test_user';
    $pwd     = 'Gbg_test_user_2019';
    $db      = 'gbg_test';
    $cs      = 'utf8';
    $dsn     = "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;

    try{
        $opt = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,PDO::ATTR_EMULATE_PREPARES => false);
        $pdo = new PDO($dsn, $un, $pwd, $opt);
    }catch(Exception $e){
        echo "Unable to connect with the database". $e->getMessage();
    }
?>
