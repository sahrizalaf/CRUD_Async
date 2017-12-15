<?php

require_once "connection.php";


if (isset($_GET["id"])){
    $id = mysqli_real_escape_string($connect, $_GET["id"]);    
}

$delete = mysqli_query($connect, "DELETE FROM user WHERE id = '$id'");
if ($delete){
    echo json_encode("Successfully delete data!");
} else {
    echo json_encode("Failed deleting data. Error" . mysqli_error($conn));    
}