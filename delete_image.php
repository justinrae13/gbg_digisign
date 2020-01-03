<?php
    $image = $_POST["imageId"].".".$_POST["imageExt"];
    $path = $_SERVER['DOCUMENT_ROOT']."/webdev/gbg/uploaded_images/".$image;
    unlink($path);
    echo "Image => ".$image." has been deleted";
?>