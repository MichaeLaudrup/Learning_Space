<?php 
    require_once "pdo.php";
    session_start(); 
?>


<!DOCTYPE html>
<html>
<head>
<title>Michael Laudrup Luis Gonzalez - Autos Database</title>
<?php require_once "bootstrap.php"; ?>
</head>
<body>
<div class="container">
<h1>Welcome to the Automobiles Database</h1>
<?php
    if(!isset($_SESSION['name'])){
        echo '<p><a href="login.php"><strong>Please log in</strong></a></p>'; 
        echo '<p>Attempt to go to <a href="add.php">add data</a> without logging in </p>'; 
    }else{ 
        if ( isset($_SESSION['success']) ) {
            echo('<p style="color: green;">'.htmlentities($_SESSION['success'])."</p>\n");
            unset($_SESSION['success']);
        }
        if ( isset($_SESSION['error']) ) {
            echo('<p style="color: red;">'.htmlentities($_SESSION['error'])."</p>\n");
            unset($_SESSION['error']);
        }
        $stmt = $pdo->query("SELECT auto_id, make, year,model, mileage FROM autos");
        if($stmt->rowCount() !== 0){
            echo('<table border="1">'."\n");
            echo('<tr><td><strong>Make</strong></td><td><strong>Model</strong></td><td><strong>Year</strong></td><td><strong>Mileage</strong></td><td><strong>Action</strong></td></tr>'); 
            while ( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                echo "<tr><td>";
                echo(htmlentities(htmlentities($row['make'])));
                echo("</td><td>");
                echo(htmlentities(htmlentities($row['model'])));
                echo("</td><td>");
                echo(htmlentities(htmlentities($row['year'])));
                echo("</td><td>");
                echo(htmlentities(htmlentities($row['mileage'])));
                echo("</td><td>");
                echo('<a href="edit.php?auto_id='.$row['auto_id'].'">Edit</a> / ');
                echo('<a href="delete.php?auto_id='.$row['auto_id'].'">Delete</a>');
                echo("</td></tr>\n");

            }
            echo '</table>'; 
        
        }else{
            echo '<p>No rows found</p>'; 
        }       
        echo '<p><a href="add.php">Add New Entry</a></p>'; 
        echo '<p><a href="logout.php">Logout</a></p>'; 
    }
?>
</div>
</body>

