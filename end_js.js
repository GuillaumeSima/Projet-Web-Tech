const resultElement = document.getElementById('result'); 
const explicationElement = document.getElementById('explication')

document.getElementById('btnRestart').onclick = function() {
    location.href="index.html";
};

var result = sessionStorage.getItem('gameResult');
var explication = sessionStorage.getItem('explication');

if(result=="GAME OVER")
{
    resultElement.innerText=result; 
    resultElement.style.color="red";
}
else if (result=="WINNER")
{
    resultElement.innerText=result; 
    resultElement.style.color="green";
}


explicationElement.innerText=explication; 