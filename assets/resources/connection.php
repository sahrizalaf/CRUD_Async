<?php

$host = "localhost";
$user = "root";
$pass = "";
$db   = "ajax";

$connect = mysqli_connect($host, $user, $pass, $db);
if ( mysqli_connect_errno() ){
    echo "Error : ". mysqli_connect_error($connect); 
}