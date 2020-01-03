<?php
    $imagedata = base64_decode($_POST['imgdata']);

    $filename = $_POST["name"];
    //path where you want to upload image
    $file = "uploaded_images/".$filename.".png";
    // $imageurl  = 'http://example.com/uploads/'.$filename.'.png';
    file_put_contents($file,$imagedata);
    echo "Image Saved !";

?>