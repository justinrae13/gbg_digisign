<?php
    $filename=$_FILES["file"]["name"];
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    $image_name = $_POST["imageId"].".".$ext;

    $image = "uploaded_images/".$image_name;
    move_uploaded_file($_FILES['file']['tmp_name'],$image);
    echo "uploaded !";
?>