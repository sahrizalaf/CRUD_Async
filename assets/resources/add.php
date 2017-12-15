<?php

require_once "connection.php";

$name = mysqli_real_escape_string($connect, $_POST["name"]);
$city = mysqli_real_escape_string($connect, $_POST["city"]);

$insert = mysqli_query($connect, "INSERT INTO user VALUES(NULL, '$name', '$city')");
if ($insert){
    echo json_encode("Successfully added data!");
} else {
    echo json_encode("Failed adding data : " .mysqli_error($connect));
}