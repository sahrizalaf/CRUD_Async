<?php

require_once "connection.php";

if(isset($_GET["id"])){
    $id = mysqli_real_escape_string($connect, $_GET["id"]);
}

$get_where = mysqli_query($connect, "SELECT * FROM user WHERE id = $id");
if($get_where){
    while($result = mysqli_fetch_array($get_where)){
        $output = array(
            "id" => $result["id"],
            "name" => $result["name"],
            "city" => $result["city"]
        );
    }
    echo json_encode($output, JSON_PRETTY_PRINT);
} else {
    echo json_encode(" Error fetching data :" .mysqli_error($connect));    
}