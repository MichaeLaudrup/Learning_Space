<?php
    function validatePos() {
        for($i=1; $i<= 9; $i++){
            if(!isset($_POST['year'.$i])) continue;
            if(!isset($_POST['desc'.$i])) continue; 
            $year = $_POST['year'.$i]; 
            $desc = $_POST['desc'.$i];
            if(strlen($year == 0) || strlen($desc) == 0){
                return "All fields are required"; 
            }
            if(!is_numeric($year)){
                return "Position year must be numeric"; 
            }
        }
        return true; 
    }

    function loadPos($pdo, $profile_id){
        $stmt = $pdo->prepare('SELECT * FROM position WHERE profile_id= :prof ORDER BY rank'); 
        $stmt->execute(array(':prof' => $profile_id));
        $positions = array(); 
        while($row = $stmt ->fetch(PDO::FETCH_ASSOC)){
            $positions[] = $row; 
        }
        return $positions; 
    }

    function validateEdu(){
        for($i=1; $i<= 9; $i++){
            if(!isset($_POST['edu_year'.$i])) continue;
            if(!isset($_POST['edu_school'.$i])) continue; 
            $yearEdu = $_POST['edu_year'.$i]; 
            $edu = $_POST['edu_school'.$i];
            if(!is_numeric($yearEdu)){
                return "Education year must be numeric"; 
            }
            if(strlen($yearEdu == 0) || strlen($edu) == 0){
                return "All fields are required"; 
            }
            
        }
        return true; 
    }

    function insertEducations($pdo, $profile_id){
        $rank = 1; 
        for($i = 1; $i<=9; $i++){
            if(!isset($_POST['edu_year'.$i])) continue;
            if(!isset($_POST['edu_school'.$i])) continue; 
            $yearEdu = $_POST['edu_year'.$i]; 
            $edu = $_POST['edu_school'.$i];
            $institution_id = false; 
            $stmt = $pdo->prepare('SELECT institution_id FROM institution WHERE name = :name'); 
            $stmt->execute(array(':name' => $edu));
            if($stmt->rowCount() !== 0){
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $institution_id = $row['institution_id']; 
            }else{
                $stmt = $pdo->prepare('INSERT INTO institution (name) VALUES ( :nam)'); 
                $stmt->execute(array(
                    ':nam' => $edu)
                ); 
                $institution_id = $pdo->lastInsertId(); 
            }
            $stmt = $pdo->prepare('INSERT INTO education (profile_id, institution_id,rank,year)
                VALUES (:pid, :inid, :rank, :year)'); 
            $stmt->execute(array(
                ':pid' => $profile_id,
                ':inid' => $institution_id,
                ':rank' => $rank,
                ':year' => $yearEdu)
            ); 
        }
    }

    function loadEdu($pdo, $profile_id){
        $stmt = $pdo->prepare('SELECT year,name FROM education JOIN institution 
        ON education.institution_id = institution.institution_id
        WHERE profile_id= :prof ORDER BY rank'); 
        $stmt->execute(array(':prof' => $profile_id));
        $educations = array(); 
        $educations = $stmt ->fetchAll(PDO::FETCH_ASSOC);
        return $educations; 
    }
