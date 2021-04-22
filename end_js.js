const resultElement = document.getElementById('result'); 
const explicationElement = document.getElementById('explication')

document.getElementById('btnRestart').onclick = function() {
    location.href="index.html";
};

var result = sessionStorage.getItem('gameResult');
var explication = sessionStorage.getItem('explication');

resultElement.innerText=result; 
explicationElement.innerText=explication; 