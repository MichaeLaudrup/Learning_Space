<?php
require_once "pdo.php";
session_start();
if ( ! isset($_SESSION['name']) ) {
    die('ACCESS DENIED');
}
// Guardian: Make sure that user_id is present
if ( ! isset($_GET['auto_id']) ) {
    $_SESSION['error'] = "Bad value for id";
    header('Location: index.php');
    return;
  }
if ( isset($_POST['make']) && isset($_POST['model'])
     && isset($_POST['year']) && isset($_POST['mileage']) ) {
    // Data validation
    if ( strlen($_POST['make']) < 1 || strlen($_POST['model']) < 1) {
        $_SESSION['error'] = 'All fields are required';
        header("Location: edit.php?auto_id=".$_POST['auto_id']);
        return;
    }
    if(!is_numeric($_POST['year'])){
        $_SESSION['error'] = 'Year must be numeric';
        header("Location: edit.php?auto_id=".$_POST['auto_id']);
        return;
    } else if( !is_numeric($_POST['mileage'])){
        $_SESSION['error'] = 'Mileage must be numeric';
        header("Location: edit.php?auto_id=".$_POST['auto_id']);
        return;
    }

    $sql = "UPDATE autos SET make = :mk,
            model = :mod, year = :yr, mileage= :mg
            WHERE auto_id = :aid";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array(
        ':mk' => $_POST['make'],
        ':mod' => $_POST['model'],
        ':yr' => $_POST['year'],
        ':mg' => $_POST['mileage'],
        ':aid' => $_POST['auto_id']));
    $_SESSION['success'] = 'Record edited';
    header( 'Location: index.php' ) ;
    return;
}



$stmt = $pdo->prepare("SELECT * FROM autos where auto_id = :xyz");
$stmt->execute(array(":xyz" => $_GET['auto_id']));
$row = $stmt->fetch(PDO::FETCH_ASSOC);
if ( $row === false ) {
    $_SESSION['error'] = 'Bad value for auto_id';
    header( 'Location: index.php' ) ;
    return;
}

// Flash pattern
if ( isset($_SESSION['error']) ) {
    echo '<p style="color:red">'.$_SESSION['error']."</p>\n";
    unset($_SESSION['error']);
}

$make = htmlentities($row['make']);
$model = htmlentities($row['model']);
$year = htmlentities($row['year']);
$mileage = htmlentities($row['mileage']); 
$auto_id = $row['auto_id'];
?>
<h1>Editing Automobile</h1>
<form method="post">
<p>Make:
<input type="text" name="make" value="<?= $make ?>"></p>
<p>Model:
<input type="text" name="model" value="<?= $model ?>"></p>
<p>Year:
<input type="text" name="year" value="<?= $year ?>"></p>
<p>Mileage:
<input type="text" name="mileage" value="<?= $mileage ?>"></p>
<input type="hidden" name="auto_id" value="<?= $auto_id ?>">
<p><input type="submit" value="Save"/>
<a href="index.php">Cancel</a></p>
</form>
