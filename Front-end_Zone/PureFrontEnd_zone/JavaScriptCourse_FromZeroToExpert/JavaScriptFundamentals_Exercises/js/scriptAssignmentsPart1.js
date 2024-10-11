'use strict'; 
//ASSIGNEMENTS JAVASCRIPT COURSE FROM ZERO TO EXPERT UDEMY 
const numMaxLecturas = 50; 
const lecturesStatements = new Array(numMaxLecturas); 

/*LECTURE: VALUES AND VARIABLES
1.Declare variables called 'country', 'continent'and 'population'and assign their values according to your own country(population in millions)
2.Log their values to the console
*/
let country = "Spain"; 
let continent = "Europe"; 
let population = 45000000; 

let textToPrint = `In the continent ${continent} there are a country called ${country}, which have a population of ${population} in 2021`; 


/*LECTURE: DATA TYPES 
1. Declare a variable called 'isIsland' and set its value according to your 
country. The variable should hold a Boolean value. Also declare a variable 
'language', but don't assign it any value yet 
2. Log the types of 'isIsland', 'population', 'country' and 'language' 
to the console 
*/

let isIsland = false; 
let language; 
textToPrint = `Type of variable "country" is ${typeof country} \nType of variable "population" is ${typeof population}\nType of variable "isIsland" is ${typeof isIsland}\nType of variable "language" is ${typeof language}`;   


/*LECTURE let, const and var 
1. Set the value of 'language' to the language spoken where you live (some 
countries have multiple languages, but just choose one) 
2. Think about which variables should be const variables (which values will never 
change, and which might change?). Then, change these variables to const. 
3. Try to change one of the changed variables now, and observe what happens 
*/

language = "Spanish"; 
const PI = 3.141516; 
const yearOfBirth = 1994; 
//PI = 2;  ---------->//Uncaught TypeError: invalid assignment to const 'PI'

/*LECTURE 5: Basic Operators
    1. If your country split in half, and each half would contain half the population, 
    then how many people would live in each half? 
    2. Increase the population of your country by 1 and log the result to the console 
    3. Finland has a population of 6 million. Does your country have more people than 
    Finland? 
    4. The average population of a country is 33 million people. Does your country 
    have less people than the average country? 
    5. Based on the variables you created, create a new variable 'description' 
    which contains a string with this format: 'Portugal is in Europe, and its 11 million 
    people speak portuguese'
*/
const populationFinland = 6*(10**6); 
const populationAverage = 33000000; 
/* console.log("Population/2 --> " + population/2);
console.log("Population++ --> " + population++); 
console.log("Does your country have more people than Finland? --> "+ (population > populationFinland )) ; 
console.log("Does your country have less people than the average country? -->" + (population < populationAverage));  */
textToPrint = country + " is in " + continent + ",and its " + (population/(10**6)).toFixed() + " million people speak " + language; 

/*LECTURE: Strings and Template Literals 
    1. Recreate the 'description' variable from the last assignment, this time 
    using the template literal syntax
*/
textToPrint = `${country} is in ${continent},and its ${(population/(10**6)).toFixed()} million people speak ${language}` 

/* LECTURE: Taking Decisions: if / else Statements 
    1. If your country's population is greater that 33 million, log a string like this to the 
    console: 'Portugal's population is above average'. Otherwise, log a string like 
    'Portugal's population is 22 million below average' (the 22 is the average of 33 
    minus the country's population) 
    2. After checking the result, change the population temporarily to 13 and then to 
    130. See the different results, and set the population back to original
*/

let result; 
if(population > 33*(10**6)){
    result = 'above'; 
}else{
    result = ((33*(10**6) - population)/(10**6)).toFixed()+' million below'
}
textToPrint = `${country}'s population is ${result} average`; 


/*LECTURE: Type Conversion and Coercion */ 
lecturesStatements[6] =
`1. Predict the result of these 5 operations without executing them: 
    '9' - '5'; --> 4
    '19' - '13' + '17'; --> 6 + '17' --> '617'
    '19' - '13' + 17; --> 6 + 17 --> 23
    '123' < 57; --> false
    5 + 6 + '4' + 9 - 4 - 2; '1149' - 6 = 1143
2. Execute the operations to check if you were right`; 

/* console.log("El resultado de la operacion '9'-'5' es: " + ('9' - '5') + ' el cual es de tipo ' + typeof('9' - '5'));
console.log("El resultado de la operacion '19' - '13' + '17' es: " + ('19' - '13' + '17') + ' el cual es de tipo ' + typeof('19' - '13' + '17'));
console.log("El resultado de la operacion '19' - '13' + 17 es: " + ('19' - '13' + 17) + ' el cual es de tipo ' + typeof('19' - '13' + 17));
console.log("El resultado de la operacion '123' < 57 es: " + ('123' < 57) + ' el cual es de tipo ' + typeof('123' < 57));
console.log("El resultado de la operacion 5 + 6 + '4' + 9 - 4 - 2 es: " + (5 + 6 + '4' + 9 - 4 - 2) + ' el cual es de tipo ' + typeof(5 + 6 + '4' + 9 - 4 - 2)); */


/*LECTURE: Equality Operators: == vs. ===*/
lecturesStatements[7] = 
`1. Declare a variable 'numNeighbours' based on a prompt input like this: 
    prompt('How many neighbour countries does your country 
    have?'); 
2. If there is only 1 neighbour, log to the console 'Only 1 border!' (use loose equality == for now) 
3. Use an else-if block to log 'More than 1 border' in case 'numNeighbours' is greater than 1 
4. Use an else block to log 'No borders' (this block will be executed when 'numNeighbours' is 0 or any other value) 
5. Test the code with different values of 'numNeighbours', including 1 and 0. 
6. Change == to ===, and test the code again, with the same values of 
   'numNeighbours'. Notice what happens when there is exactly 1 border! Why 
   is this happening? 
7. Finally, convert 'numNeighbours' to a number, and watch what happens now 
   when you input 1 
8. Reflect on why we should use the === operator and type conversion in this situation `; 

/* RESOLUTION */
/* let numNeighbours = Number(prompt('How many neighbour countries does your country have?')); 

if(numNeighbours === 1){
    console.log('Only 1 border!');
}else if(numNeighbours > 1){
    console.log('More than 1 border');
}else{
    console.log('No borders');
} */


/* LECTURE: Logical Operators*/
lecturesStatements[8] = 
`1.  Comment out the previous code so the prompt doesn't get in the way 
2.  Let's say Sarah is looking for a new country to live in. She wants to live in a 
    country that speaks english, has less than 50 million people and is not an 
    island. 
3.  Write an if statement to help Sarah figure out if your country is right for her. 
    You will need to write a condition that accounts for all of Sarah's criteria. Take 
    your time with this, and check part of the solution if necessary. 
4.  If yours is the right country, log a string like this: 'You should live in Portugal :)'. If 
    not, log 'Portugal does not meet your criteria :(' 
5.  Probably your country does not meet all the criteria. So go back and temporarily 
    change some variables in order to make the condition true (unless you live in 
    Canada :D) ` ; 

/* SOLUTION */
/* if((language==='English') && (population < 50*(10**6)) && !isIsland  ){
    textToPrint = `You should live in ${country} :)`; 
}else{
    textToPrint = `${country} does not meet your criteria :(`; 
}
console.log(textToPrint);  */

/*LECTURE: The switch Statement*/
lecturesStatements[8] =
`1. Use a switch statement to log the following string for the given 'language': 
    chinese or mandarin: 'MOST number of native speakers!' 
    spanish: '2nd place in number of native speakers' 
    english: '3rd place' 
    hindi: 'Number 4' 
    arabic: '5th most spoken language' 
    for all other simply log 'Great language too :D'`; 

switch(language){
    case 'chinese':
    case 'mandarin':
        textToPrint = "MOST number of native speakers!";
        break; 
    case 'spanish': 
        textToPrint = "2nd place in number of native speakers!"; 
        break; 
    case 'english': 
        textToPrint = "3rd place"; 
        break; 
    case 'hindi':
        textToPrint = "Number 4"; 
        break; 
    case 'arabic': 
        textToPrint= '5th most spoken language'; 
        break; 
    default: 
        textToPrint = "Great language too"; 
}
/* /* LECTURE: The Conditional (Ternary) Operator */ 
lecturesStatements[8] =
`1. If your country's population is greater than 33 million, use the ternary operator 
    to log a string like this to the console: 'Portugal's population is above average'. 
    Otherwise, simply log 'Portugal's population is below average'. Notice how only 
    one word changes between these two sentences! 
    2. After checking the result, change the population temporarily to 13 and then to 
    130. See the different results, and set the population back to original`;

textToPrint = `${country}'s population is ${(population > 33) ? 'above' : 'below'} average`; 
