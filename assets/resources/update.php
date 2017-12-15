<?php

require_once "connection.php";

$id   = mysqli_real_escape_string($connect, $_POST["id"]);
$name = mysqli_real_escape_string($connect, $_POST["name"]);
$city = mysqli_real_escape_string($connect, $_POST["city"]);

$update = mysqli_query($connect, "UPDATE user SET name = '$name', city = '$city' WHERE id = $id");
if ($update){
    echo json_encode("Successfully update data!");
} else {
    echo json_encode("Failed updating data : " .mysqli_error($connect));
}