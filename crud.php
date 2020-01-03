<?php
    include "dbconfig.php";

    if(isset($_GET["getAllAnnouncement"])){
        try{
            $stmt = $pdo->query("SELECT * FROM announcement");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ)){
                $data[] = $row;
            }
            echo json_encode($data);
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    if(isset($_GET["getAllSites"])){
        try{
            $stmt = $pdo->query("SELECT * FROM sites");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ)){
                $data[] = $row;
            }
            echo json_encode($data);
        }catch(PDOException $e){
            echo $e->getMessage();
        } 
    }

    if(isset($_POST["addNewSite"])){
        $name = $_POST["name"];
        $address = $_POST["address"];

        try{
            $sql = "INSERT INTO sites(site_name, site_address) VALUES(:name_site, :address_site)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':name_site', $name, PDO::PARAM_STR);
            $stmt->bindParam(':address_site', $address, PDO::PARAM_STR);
            $stmt->execute();

            echo "New site added !";
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    if(isset($_POST["deleteSite"])){
        $id = $_POST["id"];
        try {
           $sql = "DELETE FROM sites WHERE site_id=:id";
           $stmt = $pdo->prepare($sql);
           $stmt->bindParam(':id', $id, PDO::PARAM_STR);
           $stmt->execute();

           echo "Site deleted !";
        }
        // Catch any errors in running the prepared statement
        catch(PDOException $e)
        {
           echo $e->getMessage();
        }
   }

   if(isset($_POST["saveEdit"])){
        $id = $_POST["id"];
        $name = $_POST["nameInp"];
        $address = $_POST["addressInp"];
        try {
            $sql = "UPDATE sites SET site_name=:name_site, site_address=:address_site WHERE site_id=:id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':name_site', $name, PDO::PARAM_STR);
            $stmt->bindParam(':address_site', $address, PDO::PARAM_STR);
            $stmt->bindParam(':id', $id, PDO::PARAM_STR);
            $stmt->execute();

            echo "Site edited !";
        }
        // Catch any errors in running the prepared statement
        catch(PDOException $e)
        {
            echo $e->getMessage();
        }
    }

    if(isset($_POST["assignSite"])){
        $annID = $_POST["annID"];
        $siteID = $_POST["siteID"];
        $start = $_POST["start"];
        $end = $_POST["end"];
        $duration = $_POST["duration"];

        try{
            $sql = "INSERT INTO announcement_has_site(as_ann_id, as_site_id, as_start, as_end, as_duration) VALUES(:annId, :siteID, :startD, :endD, :duration)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':annId', $annID, PDO::PARAM_STR);
            $stmt->bindParam(':siteID', $siteID, PDO::PARAM_STR);
            $stmt->bindParam(':startD', $start, PDO::PARAM_STR);
            $stmt->bindParam(':endD', $end, PDO::PARAM_STR);
            $stmt->bindParam(':duration', $duration, PDO::PARAM_STR);
            $stmt->execute();

            echo "New site assigned !";
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    if(isset($_GET["getAllAssigedSites"])){
        $id = $_GET["annID"];
        try{
            $stmt = $pdo->query("SELECT * FROM announcement_has_site join announcement on an_id = as_ann_id LEFT join sites on site_id = as_site_id WHERE as_ann_id=$id");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ)){
                $data[] = $row;
            }

            if(!empty($data)){
                echo json_encode($data);
            }else{
                echo json_encode(0);
            }
        }catch(PDOException $e){
            echo $e->getMessage();
        } 
    }

    if(isset($_POST["deleteAssignSite"])){
        $id = $_POST["id"];
        try {
           $sql = "DELETE FROM announcement_has_site WHERE as_id=:id";
           $stmt = $pdo->prepare($sql);
           $stmt->bindParam(':id', $id, PDO::PARAM_STR);
           $stmt->execute();

           echo "Site deleted !";
        }
        // Catch any errors in running the prepared statement
        catch(PDOException $e)
        {
           echo $e->getMessage();
        }
   }

    

    
?>