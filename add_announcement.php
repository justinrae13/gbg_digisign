<?php
    include "dbconfig.php";

    if(isset($_GET["name"])){
        $annnouncement = $_GET["name"];
        try {
            $sql = "SELECT * FROM announcement WHERE an_name=:announcement";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':announcement', $annnouncement, PDO::PARAM_STR);
            $stmt->execute();
            $annonce = $stmt->fetch(PDO::FETCH_ASSOC);

            echo $annonce['an_content'];
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }
    }

    if(isset($_POST["uploadAnnouncement"])){
        $name = $_POST["nameAnn"];
        $content = $_POST["contentAnn"];
        $img = $_POST["baseImg"];
        try {
            $sql = "INSERT INTO announcement(an_name, an_image, an_content) VALUES(:ann_name, :img, :content)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':content', $content, PDO::PARAM_STR);
            $stmt->bindParam(':ann_name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':img', $img, PDO::PARAM_STR);
            $stmt->execute();

            header('Location: https://justinrae.ch/jra/gbg');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }
    }

    if(isset($_POST["imgdata"])){
        $name = $_POST["name"];
        $content = $_POST["content"];
        $img = $_POST["imgdata"];
        try {
            $sql = "INSERT INTO announcement(an_name, an_image, an_content ) VALUES(:ann_name, :img, :content)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':content', $content, PDO::PARAM_STR);
            $stmt->bindParam(':ann_name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':img', $img, PDO::PARAM_STR);
            $stmt->execute();

            echo "YES !";
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }
    }
?>
