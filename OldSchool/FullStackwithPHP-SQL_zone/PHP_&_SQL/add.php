<?php
require_once "pdo.php";
session_start(); 
if ( ! isset($_SESSION['name']) ) {
  die('Not logged in');
}
// If the user requested logout go back to index.php
if ( isset($_POST['logout']) ) {
    header('Location: index.php');
    return;
}
if(isset($_POST['make']) && isset($_POST['year']) && isset($_POST['mileage'])){
    $mileage = $_POST['mileage'];
    $year = $_POST['year']; 
    $make = $_POST['make']; 
    if(is_numeric($mileage) && is_numeric($year)){
        if(strlen($make) < 1){
            $_SESSION['error'] = 'Make is required';
            header('Location:add.php');
            return;  
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
            $_SESSION['success'] = 'Record Inserted';
            header('Location:view.php');
            return;
        }
    }else{
        $_SESSION['error'] = 'Mileage and year must be numeric';
        header('Location:add.php');
        return;
    }
}
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
        echo ' '. $_SESSION['name'];
    ?>

    </h1>
    <?php

    if ( isset($_SESSION['error']) ) {
        echo('<p style="color: red;">'.$_SESSION['error']."</p>\n");
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
</div>
</body>
</html>
