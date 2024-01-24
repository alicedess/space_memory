// Demo closure

function operator(operateur) {
  switch (operateur) {
    case "+":
      return (num1, num2) => num1 + num2;

      break;

    case "-":
      return (num1, num2) => num1 - num2;

      break;

    case "*":
      return (num1, num2) => num1 * num2;

      break;

    case "/":
      return (num1, num2) => num1 / num2;

      break;

    default:
      console.log("Opération impossible");

      break;
  }
}

// Appel ma closure

const op1 = operator("+");

// Pour op1 => addition

console.log(op1(3, 4)); // 7

console.log(op1(2, 5)); // 7

// Appel ma closure sur une opération !=

const op2 = operator("-");

// Pour op1 => addition

console.log(op2(3, 4)); // -1

console.log(op2(2, 5)); // -3

// Manager Time

setTimeout(() => {
  alert("Ca va péter !!!");
}, 3000);

let counter = 0;

const idInterval = setInterval(() => {
  alert("Donnez moi votre");

  counter++;

  if (counter === 3) {
    clearInterval(idInterval);
  }
}, 5000);

// Localstorage / SessionStorage

console.log("Localstorage");

// datas

let tabPeople = "";

console.log("array", tabPeople);

// conversion

const dataConverted = JSON.stringify(tabPeople);

console.log("string", dataConverted);

// Save

localStorage.setItem("people", dataConverted);

// Get data from Localstorage

console.log(localStorage.getItem("people"));

// Dans son été d'origine

const people = JSON.parse(localStorage.getItem("people")) || [];

console.log(people);

// Ajout

people.push("Benj");

// update

const dataConvertedTheReturn = JSON.stringify(people);

console.log("string", dataConvertedTheReturn);

// Save

localStorage.setItem("people", dataConvertedTheReturn);

// Get data from Localstorage

console.log(localStorage.getItem("people"));

// Dans son été d'origine

const people2 = JSON.parse(localStorage.getItem("people")) || [];

console.log(people2);

// Cookie

document.cookie = "toto-fait-du-velo=dansleparc;max-age=7200;";

console.log(document.cookie);

// Demo fetch

let idProduct = 1;

document.querySelector("button").addEventListener("click", () => {
  // Demande de récupération d'un product provenant d'une api

  fetch(`https://dummyjson.com/products/${idProduct}`)
    .then((res) => res.json())

    .then((product) => {
      console.log(product);

      // Display product

      document.getElementById("result").insertAdjacentHTML(
        "beforeend",
        ` 

                <h3>${product.title}</h3> 

                <p>${product.description}</p> 

                <img src="${product.images[0]}" alt="${product.description}"> 

            `
      );

      idProduct++;
    });
});
