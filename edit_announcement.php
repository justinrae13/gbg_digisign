<?php
    include "dbconfig.php";

    if(isset($_POST["editAnnouncement"])){
        $name = $_POST["editnameAnn"];
        $content = $_POST["editcontentAnn"];
        $img = $_POST["editbaseImg"];
        try {
            $sql = "UPDATE announcement SET an_image=:img, an_content=:content WHERE an_name=:ann_name";
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

    if(isset($_GET["getOldContent"])){
        $name = $_GET["name"];
        try {
            $sql = "SELECT * FROM announcement WHERE an_name=:announcement";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':announcement', $name, PDO::PARAM_STR);
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
?>
