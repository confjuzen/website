let btngo = document.getElementById("btngo");
let btn = document.getElementById("btn");


const motaeng = ["one", "two", "three" ]
let score = 0
let count = 0
let motTapeOk = false
let nuberquestions = motaeng.length

document.getElementById("prompt").innerHTML = motaeng[count];

let textarea = document.getElementById("textarea")


btn.addEventListener("click", () => {
    if (textarea === motaeng[count])
        {motTapeOk = true
        score ++
        }
    else {motTapeOk = false }
    count ++



let messagescore = "Votre score est de " + score + " sur " + nuberquestions + " questions!"
document.getElementById("scoredisplay").innerHTML = messagescore

});

textarea.addEventListener("input", () => {
    


