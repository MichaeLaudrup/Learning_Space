<?php
    require_once "pdo.php";
    session_start(); 

    if ( !isset($_SESSION['name']) ) {
        die('Not logged in');
    }
    if(!isset($_GET['profile_id'])){
        $_SESSION['error'] = 'Missing profile_id'; 
        header('Location: index.php'); 
        return; 
    }
    if ( isset($_POST['cancel']) ) {
        header('Location: index.php');
        return;
    }
    if(isset($_POST['clic_save']) ){
        if(strlen($_POST['first_name']) < 1 || strlen($_POST['last_name']) < 1 || strlen($_POST['email']) < 1 || strlen($_POST['headline']) < 1 || strlen($_POST['summary']) < 1 ){
            $_SESSION['error'] = 'All fields are required'; 
            header('Location: edit.php?profile_id='.$_GET['profile_id']);
            return; 
        }
        if(strpos($_POST['email'],'@') === false){
            $_SESSION['error'] = 'Email address must contain @'; 
            header('Location: edit.php?profile_id='.$_GET['profile_id']);
            return; 
        }

        $stmt = $pdo->prepare('UPDATE profile SET first_name = :fn, last_name = :ln, 
        email = :em, headline = :he, summary =:su
        WHERE profile_id = :pid;');
        $stmt->execute(array(
        ':pid' => $_GET['profile_id'], 
        ':fn' => $_POST['first_name'],
        ':ln' => $_POST['last_name'],
        ':em' => $_POST['email'],
        ':he' => $_POST['headline'],
        ':su' => $_POST['summary'])
        );
        $_SESSION['success'] = 'Profile eddited'; 
        header('Location: index.php');
        return;  
    }
    $stmt = $pdo->prepare("SELECT * FROM profile WHERE profile_id = :pf_id");
    $stmt->execute(array(":pf_id" => $_GET['profile_id']));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ( $row === false) {
        $_SESSION['error'] = 'Could not load profile';
        header( 'Location: index.php' ) ;
        return;
    }
?>
<!DOCTYPE html>
<html>
<head>
    <title>Michael Laudrup's Profile Add</title>
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
<h1>Editing Profile for Michael</h1>
<?php
    if(isset($_SESSION['error'])){
        echo('<p style="color: red;">'.$_SESSION['error']."</p>\n");
        unset($_SESSION['error']);
    }
?>
<form method="post">
<p>First Name:
<input type="text" name="first_name"  value="<?=$row['first_name']?>" size="60"/></p>
<p>Last Name:
<input type="text" name="last_name"  value="<?=$row['last_name']?>" size="60"/></p>
<p>Email:
<input type="text" name="email"  value="<?=$row['email']?>" size="30"/></p>
<p>Headline:<br/>
<input type="text" name="headline"  value="<?=$row['headline']?>" size="80"/></p>
<p>Summary:<br/>
<textarea name="summary"  rows="8" cols="80"><?= $row['summary']?></textarea>
<p>
<input type="submit" name="clic_save" value="Save">
<input type="submit" name="cancel" value="Cancel">
</p>
</form>
</div>
</body>
</html>