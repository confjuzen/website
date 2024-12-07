let listeFilms = ["Star Wars", "Le Seigneur des Anneaux", "Le Hobbit", "Harry Potter"]
let ul = document.createElement("ul")

for (let i = 0; i < listeFilms.length; i++) {

    let li = document.createElement("li")

    li.textContent = listeFilms[i]
}
    ul.appendChild(li)

