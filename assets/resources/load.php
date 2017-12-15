<?php
require_once "connection.php";

$load = mysqli_query($connect, "SELECT * FROM user");
if ($load){
    while($result = mysqli_fetch_array($load)){
        $output[] = array(
            "id"   => $result["id"],
            "name" => $result["name"],
            "city" => $result["city"]
        );
    }
    echo json_encode($output, JSON_PRETTY_PRINT);
} else {
    echo json_encode(" Error fetching data :" .mysqli_error($connect));    
}