<?php 
    require_once "pdo.php";
    session_start(); 
    function print_table(){
        global $pdo; 
        $stmt = $pdo->query("SELECT profile_id, first_name, headline  FROM profile");
        if($stmt->rowCount() !== 0){
            echo('<table border="1">'."\n");
            echo('<tr><td><strong>Name</strong></td><td><strong>Headline</strong></td></tr>'); 
            while ( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                echo "<tr><td>";
                echo('<a href="view.php?profile_id='.$row['profile_id'].'">'.htmlentities($row['first_name']) . '</a>');
                echo("</td><td>");
                echo(htmlentities(htmlentities($row['headline'])));
                echo("</td><td>");
                echo('<a href="edit.php?profile_id='.$row['profile_id'].'">Edit</a> / ');
                echo('<a href="delete.php?profile_id='.$row['profile_id'].'">Delete</a>');
                echo("</td></tr>\n");
            }
            echo '</table>'; 
        }
    }
?>
<!DOCTYPE html>
<html>
    <head>
    <title>Michael Laudrup Resume Registry</title>
        <!-- bootstrap.php - this is HTML -->

        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" 
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" 
            integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" 
            crossorigin="anonymous">

        <!-- Optional theme -->
        <link rel="stylesheet" 
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" 
            integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" 
            crossorigin="anonymous">
    </head>
    <body>
        <div class="container">
            <h1>Michael Laudrup's Resume Registry</h1>
            <?php
            if(isset($_SESSION['error'])){
                echo('<p style="color: red;">'.$_SESSION['error']."</p>\n");
                unset($_SESSION['error']);
            }
            if(isset($_SESSION['success'])){
                echo('<p style="color: green;">'.$_SESSION['success']."</p>\n");
                unset($_SESSION['success']);
            }
            if(isset($_SESSION['name']) && isset($_SESSION['user_id'])){
                echo('<p><a href="logout.php">Logout</a></p>');
                print_table(); 
                echo('<p><a href="add.php">Add New Entry</a></p>');
            }else{
                echo('<p><a href="login.php">Please log in</a></p>');
                print_table(); 
            } 
            ?>

        </div>
    </body>
</html>
