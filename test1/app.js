let image = document.getElementById("monkey")

image.setAttribute("src", "../img/unicorn.png")
image.classList.add("border")



let text = "unicorn"
let text2 = "elephant"


document.getElementById("birdtext").innerHTML = "Bird";
document.getElementById("monkeytext").innerHTML = text;

let h2 = document.createElement("h2")
h2.innerText = "dinosaur"
let body = document.querySelector("body")
body.appendChild(h2)

let html = `
    <header>
    <h3>${text2}</h3>
    </header>
    `

body.innerHTML += html