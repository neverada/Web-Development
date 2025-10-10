
// Q13. add greetings of time to ur alert user msg
function greet() {
    var CurrentHour = new Date().getHours();
    if (CurrentHour < 15) {
        return "Good Morning";
    } else {
        return "Good Evening";
    }
}
var timeGreet = greet();
// Q1. Write a script to greet your website visitor using JS alert box
alert(`Hello User! ${timeGreet} You will definitely regret opening this page`)




// Q2. Declare a variable called username. 2. Declare a variable called myName & assign to it a 
// string that represents your Full Name.
let UserName;
let myName = "Noorulain Junaid"
console.log(myName)

// Q3. Write script to a) Declare a JS variable, titled message. b) Assign “Hello World” to variable
// message c) Display the message in alert box
let message = "Hello World"
// alert(message)

// Q4. Declare a variable called email and assign to it a string that represents your Email
// Address(e.g. example@example.com). Show the blow mentioned message in an alert box.(Hint:
// use string concatenation)
// ‘My email address is ‘example@example.com’
let email = "noorulainjunaid.sp@gmail.com"
alert("My email address is " + email)

// Q5. Declare 3 variables in one statement.
var variable1 = true, variable2 = 0, variable3 = "Hi";
console.log("variable 1", variable1, "variable 2", variable2, "variable 3", variable3)

// Q7. Write a program that take two numbers & add them in a new variable. Show the result in
// your browser.
// Repeat task above for subtraction, multiplication, division & modulus.
const display = document.getElementById('display');

function appendChar(char) {
    display.value += char;
}

function clearDisplay() {
    display.value = '';
}

function delChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    }
}

// Q8. Cost of one movie ticket is 600 PKR. Write a script to store ticket price in a variable &
// calculate the cost of buying 5 tickets to a movie. Example output:
var ticketPkr = 600
var discountAmount = document.getElementById('discount-amount')
var subtotal = document.getElementById('subtotal')
var fnlPrice = document.getElementById('final-price')
var DiscMsg = document.getElementById('discount-message')

function calculatePrice() {
    var noOfTickets = parseInt(document.getElementById('tickets').value);
    var total = ticketPkr * noOfTickets;
    if (noOfTickets >= 5) {
        var discount = total * 0.2
        var discountedprice = total - discount;
        discountAmount.innerText = `-${discount} PKR`
        subtotal.innerText = `${total} PKR`
        fnlPrice.innerText = `${discountedprice} PKR`
         DiscMsg.style.visibility = "hidden";
    } else {
        subtotal.innerText = `${total} PKR`
        fnlPrice.innerText = `${total} PKR`
        DiscMsg.style.visibility = "visible";
    }
}


// Q9. Write a script to display multiplication table of any number in your browser.
function table() {
    const number = parseInt(document.getElementById('number').value);
    const writeTable = document.getElementById('Table');
    writeTable.innerHTML = '';
    if (isNaN(number)) {
        alert("Please enter a valid number.");
    } else {
        for (let i = 0; i <= 10; i++) {
            writeTable.innerHTML += '<li class=tablestyle>' + number + ' x ' + i + " = " + (number * i) + '</li>';
        }
    }
}

// Q10. The Temperature Converter: It’s hot out!
// Let’s make a converter based on the steps here.
// a. Store a Celsius temperature into a variable. b.
// Convert it to Fahrenheit & output “NNoC is
// NNoF”. c. Now store a Fahrenheit temperature
// into a variable. d. Convert it to Celsius & output
// “NNoF is NNoC”.
function inputMssg(e) {
    if (e.keyCode === 13) {
        const celsiusinput = document.getElementById('celsiusinput');
        const celsius = celsiusinput.value;

        var intofarenhiet = (celsius * 9 / 5) + 32
        console.log(intofarenhiet)
        const finput = document.getElementById('farenhietinput');
        finput.value = intofarenhiet
    }
}
function inputMsg(e) {
    if (e.keyCode === 13) {
        const finput = document.getElementById('farenhietinput');
        const farenhiet = finput.value;

        var intocelsius = (farenhiet - 32) * 5 / 9
        console.log(intocelsius)
        const celsiusinput = document.getElementById('celsiusinput');
        celsiusinput.value = intocelsius
    }
}
// Q11. The Age Calculator: Forgot how old someone is?
// Calculate it!
// a. Store the current year in a variable.
// b. Store their birth year in a variable.
// c. Calculate their 2 possible ages based on the stored
// values.
// show them on browser
function calculateAndDisplayAge() {
    const currentYear = 2025;
    const birthYear = parseInt(document.getElementById('birthYearInput').value);
    const age1 = currentYear - birthYear;
    const age2 = age1 - 1;

    const resultDiv = document.getElementById('result');
    if (isNaN(birthYear) || birthYear <= 0 || birthYear > currentYear) {
        resultDiv.innerHTML = "Please enter a valid birth year.";
        resultDiv.style.display ="block"
    } else {

        resultDiv.innerHTML = `
                <p>Based on a birth year of ${birthYear} and the current year ${currentYear}:</p> <p>Their age could be: <strong>${age1}</strong> or <strong>${age2}</strong> (if their birthday hasn't occurred yet this year).</p>`
            ;
             resultDiv.style.display ="block"
    }

}
// Q12. Write a JavaScript program that accept two integers and display the larger. Also show if the
// two integers are equal.
function compareinteger() {
    const int1 = parseInt(document.getElementById('int1').value);
    const int2 = parseInt(document.getElementById('int2').value);


    const compareDiv = document.getElementById('compare');
    if (int1 > int2) {
        compareDiv.innerHTML = int1 + " is the larger integer";
        compareDiv.style.display ="block"
    } else if (int2 > int1) {
        compareDiv.innerHTML = int2 + " is the larger integer";
        compareDiv.style.display ="block"
    } else {
        compareDiv.innerHTML = "Both integers are equal.";
        compareDiv.style.display ="block"
    }

}
// Q13. Write a program that a. Store correct password in a JS variable. b. Asks user to enter
// his/her password c. Validate the two passwords: i. Check if user has entered password. If not,
// then give message “ Please enter your password” ii. Check if both passwords are same. If they
// are same, show message “Correct! The password you entered matches the original password”.
// Show “Incorrect password” otherwise.
function checkpassword() {
    const pass1 = document.getElementById('passwordInput').value
    const pass2 = document.getElementById('confirm').value
    const errorDiv = document.getElementById('passwordMessage')


    if (pass1 === "" || pass2 === "") {
        errorDiv.innerHTML = "Please enter your password."
        errorDiv.style.color = "red"
        errorDiv.style.display ="block"
        return
    }


    if (pass1 !== pass2) {
        errorDiv.innerHTML = "Passwords do not match."
        errorDiv.style.color = "red"
         errorDiv.style.display ="block"
        return
    }


    const hasNumber = /\d/.test(pass1);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass1);
    const hasUpper = /[A-Z]/.test(pass1);
    const hasLower = /[a-z]/.test(pass1);

    if (pass1.length < 8) {
        errorDiv.innerHTML = "Password must be at least 8 characters long.";
        errorDiv.style.color = "red";
         errorDiv.style.display ="block"
    } else if (!hasNumber || !hasSpecial || !hasUpper || !hasLower) {
        errorDiv.innerHTML = "Password must include uppercase, lowercase, number & special character.";
        errorDiv.style.color = "red";
         errorDiv.style.display ="block"
    } else {
        errorDiv.innerHTML = "✅ Strong password! You're good to go.";
        errorDiv.style.color = "green";
         errorDiv.style.display ="block"
    }
}

// Q13. This if/else statement does not work. Try to fix it: var greeting; var hour = 13; if (hour < 18)
// { greeting = "Good day"; else greeting = "Good evening"; }
var greeting;
var Hour = new Date().getHours();
if (Hour < 18) {
    greeting = "Good day";
} else {
    greeting = "Good evening";
}
console.log(greeting)

const qualifications = [
    "SSC (Secondary School Certificate)",
    "HSC (Higher Secondary School Certificate)",
    "BCS (Bachelor of Computer Science)",
    "BS (Bachelor of Science)",
    "BCOM (Bachelor of Commerce)",
    "MS (Master of Science)",
    "M. Phil. (Master of Philosophy)",
    "PhD (Doctor of Philosophy)"
];
const listElement = document.getElementById("qualificationsList");
for (let i = 0; i <= 7; i++) {
    const listItem = document.createElement("li")
    listItem.innerText = qualifications[i]
    listElement.appendChild(listItem)
}
