<?php
    require_once "pdo.php";
    require_once "util.php";
    session_start(); 
    if(!isset($_GET['profile_id'])){
        $_SESSION['error'] = 'Missing profile_id';  
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
    $positions = loadPos($pdo, $_GET['profile_id'] );
    $schools = loadEdu($pdo, $_GET['profile_id']); 
?>
<!DOCTYPE html>
<html>
<head>
<title>Michael Laudrup's Profile View</title>
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
    
<script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
</head>
<body>
<div class="container">
<h1>Profile information</h1>
<p>First Name: <?= $row['first_name'] ?> </p>
<p>Last Name: <?= $row['last_name'] ?></p>
<p>Email: <?= $row['email'] ?></p>
<p>Headline:<br/> <?= $row['headline'] ?></p>
<p>Summary:<br/> <?= $row['summary'] ?><p>

<?php
    if(count($schools) > 0){
    echo '<p>Education<br/></p><ul>'; 
    for($i = 0; $i < count($schools); $i++){
        echo '<li>'.$schools[$i]['year'].': '. $schools[$i]['name'].'</li>';
         
    }
    echo '</ul>'; 
}
    if(count($positions) > 0){
        echo '<p>Position<br/></p><ul>'; 
        for($i = 0; $i < count($positions); $i++){
            echo '<li>'.$positions[$i]['year'].': '. $positions[$i]['description'].'</li>';
             
        }
        echo '</ul>'; 
    }
?>
<a href="index.php">Done</a>
</div>
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script></body>
</html>
