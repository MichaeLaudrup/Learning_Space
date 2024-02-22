<?php
require_once "pdo.php";
session_start(); 
if ( ! isset($_SESSION['name']) ) {
  die('ACCESS DENIED');
}
// If the user requested logout go back to index.php
if ( isset($_POST['cancel']) ) {
    header('Location: index.php');
    return;
}
if(isset($_POST['make']) && isset($_POST['year']) && isset($_POST['mileage']) && isset($_POST['model']) ){
    $mileage = $_POST['mileage'];
    $year = $_POST['year']; 
    $make = $_POST['make']; 
    $model = $_POST['model']; 
    if(is_numeric($mileage) && is_numeric($year)){
        if((strlen($make) < 1) && (strlen($model) < 1) ){
            $_SESSION['error'] = 'All fields are required';
            header('Location:add.php');
            return;  
        }else{
            //Here all is right
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $pdo->prepare('INSERT INTO autos
                (make, model, year, mileage) VALUES ( :mk, :mod, :yr, :mi)');
            $stmt->execute(array(
                ':mk' => $make,
                ':mod' => $model, 
                ':yr' => $year,
                ':mi' => $mileage)
            );
            $_SESSION['success'] = 'Record added';
            header('Location:index.php');
            return;
        }
    }else{
        $_SESSION['error'] = 'All fields are required';
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
        unset($_SESSION['error']); 
    }
    ?>
    <form method="post">
        <p>Make:
            <input type="text" name="make" size="60"/></p>
        <p>Model:
            <input type="text" name="model" size="60"/></p>
        <p>Year:
            <input type="text" name="year"/></p>
        <p>Mileage:
            <input type="text" name="mileage"/></p>
            <input type="submit" value="Add">
            <input type="submit" name="cancel" value="Cancel">
    </form>
</div>
</body>
</html>
