var maths=prompt("Enter your maths marks");
var SocialStudies=prompt("Enter your social studies marks");
var english=prompt("Enter your english marks");
var physics=prompt("Enter your physics marks");
var chemistry=prompt("Enter your chemistry marks");
var obtainedmarks=parseInt(maths)+parseInt(SocialStudies)+parseInt(english)+parseInt(physics)+parseInt(chemistry);
var totalmarks=500;
var percentage=(obtainedmarks/totalmarks)*100;
if(percentage<=100 && percentage>=90){
    alert("A-one");
    alert("Excellent");
}else if(percentage<=89 && percentage>=80){
    alert("A");
    alert("Very Good");
}else if(percentage<=79 && percentage>=70){
    alert("B");
    alert("Good");
}else if(percentage<=69 && percentage>=60){
    alert("C");
    alert("You need to improve");
}else if(percentage<=59 && percentage>=50){
    alert("D");
   alert("You need to work hard on your grades improve");
}else if(percentage<=49 && percentage>=0){
    alert("Fail");
    alert("Sorry");
}else{
    alert("Invalid Marks Entered By You");
    alert("Please Enter Valid Marks");
}
console.log(totalmarks);
console.log(obtainedmarks);
console.log(percentage+"%");