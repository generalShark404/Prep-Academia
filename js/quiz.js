let xhr = new XMLHttpRequest();
let data = null
xhr.open('GET', './data.json');
xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        data = JSON.parse(this.responseText);
    }
}
console.log(data)
xhr.send();

let quiz = document.getElementById('quiz');
let answer = document.querySelectorAll('.answer');
let question = document.querySelectorAll('.qustion');
let a_text = document.querySelector("#a_text")
let b_text = document.querySelector("#b_text")
let c_text = document.querySelector("#c_text")
let d_text = document.querySelector("#d_text")
console.log(answer)