let img = document.getElementById("myImage");
let text = document.getElementById("changingtext");
function changeImage() {
    img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm-5GZke5yljVSuQW-ELOOohY7vKgtWxtdHE4H-WnfWh4BTGIV_NcTBCgk_Dii1_PSMaU&usqp=CAU";
    text.innerHTML = "Battery is Charging 🙂";
    text.style.color = "green";
}
function resetImage() {
    img.src = "https://media.istockphoto.com/id/1178299282/vector/low-level-energy-of-battery-in-flat-cartoon-style-battery-low-charge-symbol-concept-image.jpg?s=612x612&w=0&k=20&c=Tn-h_uJAVoqnBtuSZv2uXlUBSwrXZKpjojWQgfn7X4Q=";
     text.innerHTML = "Battery Dead 🥺";
    text.style.color = "red";
}
