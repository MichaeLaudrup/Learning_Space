
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>

<html>
	<head>
		<title>Student Registration Form</title>
	</head>
	<body>
	<form:form action="processForm" modelAttribute="student">
		 <strong>First name:</strong> <form:input path="firstName"/>
		 <hr> 
		 <strong>Last Name (*):</strong> <form:input path="lastName"/>
		 <hr>
		 <strong>Country: </strong>
		 <form:select path="country">
		 	<form:options items="${student.countryOptions}"/>
		 </form:select>
		 <hr>
		 <strong>Favorite language: </strong><form:radiobutton path="favoriteLanguage" value="Java"/>Java 
			 <form:radiobutton path="favoriteLanguage" value="C#"/>C# 
			 <form:radiobutton path="favoriteLanguage" value="PHP"/>PHP 
		  	 <form:radiobutton path="favoriteLanguage" value="JavaScript"/>JavaScript
		 <hr>
		 <strong>Favorite IDE: </strong>
		 <form:radiobuttons path="favoriteIDE" items="${student.ideOptions}"/>
		 <hr>
		 <strong>Operating System</strong>
		 <form:checkboxes path="operatingSystem" items="${student.operatingSystemsList}"/>
		 
		 <input type="submit" value="Submit">
		 
	</form:form>
	</body>

</html>