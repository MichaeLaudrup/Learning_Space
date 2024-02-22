<?php

require_once "pdo.php";

// Demand a GET parameter
if ( ! isset($_GET['name']) || strlen($_GET['name']) < 1  ) {
    die('Name parameter missing');
}else{
    $email = $_GET['name']; 
}

// If the user requested logout go back to index.php
if ( isset($_POST['logout']) ) {
    header('Location: index.php');
    return;
}

$failure = false; 
$success = false; 


if(isset($_POST['make']) && isset($_POST['year']) && isset($_POST['mileage'])){

    $mileage = $_POST['mileage'];
    $year = $_POST['year']; 
    $make = $_POST['make']; 
    if(is_numeric($mileage) && is_numeric($year)){
        if(strlen($make) < 1){
            $failure = 'Make is required'; 
        }else{
            //Here all is right
            $make = htmlentities($make); 
            $year = htmlentities($year); 
            $mileage = htmlentities($mileage); 

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $pdo->prepare('INSERT INTO autos
                (make, year, mileage) VALUES ( :mk, :yr, :mi)');
            $stmt->execute(array(
                ':mk' => $make,
                ':yr' => $year,
                ':mi' => $mileage)
            );
            $success = 'Record Inserted';
        }
    }else{
        $failure = 'Mileage and year must be numeric'; 
    }
}else{
    $failue = "some is wrong"; 
}

$stmt = $pdo->query("SELECT  make, year, mileage FROM autos");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);



?>
<!DOCTYPE html>
<html>
<head>
<title>Michael Laudrup Luis Gonzalez Automobile Tracker</title>
<?php require_once "bootstrap.php"; ?>
</head>
<body>
<div class="container">
<h1>Tracking Autos for 
<?php
    echo ' '. $email;
?>

</h1>
<?php

if ( $failure !== false ) {
    echo('<p style="color: red;">'.htmlentities($failure)."</p>\n");
}
if($success !== false){
    echo('<p style="color: green;">'.htmlentities($success)."</p>\n");
}
?>
<form method="post">
<p>Make:
<input type="text" name="make" size="60"/></p>
<p>Year:
<input type="text" name="year"/></p>
<p>Mileage:
<input type="text" name="mileage"/></p>
<input type="submit" value="Add">
<input type="submit" name="logout" value="Logout">
</form>
<h2>Automobiles</h2>
<p>

<ul>
<?php
    foreach ( $rows as $row ) {
        echo "<li>";
        echo $row['make']." " .$row['year']. " / ". $row['mileage'] ;
        echo "</li>\n";
    }
?>
</ul>


<ul>
<p>
</ul>
</div>
</body>
</html>
