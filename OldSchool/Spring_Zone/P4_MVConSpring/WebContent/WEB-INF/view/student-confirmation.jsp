<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<!DOCTYPE html>
	<html>
	<head>
		<title>Student Confirmation</title>
	</head>
	<body>
	 The student is confirmed:
	 <hr>
	 Firstname:  ${student.firstName} <br>
	 Lastname :  ${student.lastName} <br>
	 Country: ${student.country} <br>
	 Favorite language: ${student.favoriteLanguage} <br> 
	 Favorite IDE: ${student.favoriteIDE} <br> 
	 Operating Systems: 
	 <ul>
	 	<c:forEach var="temp" items="${student.operatingSystem}">
	 		<li> ${temp} </li>
	    </c:forEach>
	 </ul>
	 <br> 
	</body>
	
	
	</html>