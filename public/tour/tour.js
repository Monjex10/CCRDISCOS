
// let nombre = prompt("Cuál es tu nombre?").toUpperCase();
// while (nombre.length < 3) {
//   nombre = prompt(
//     "Mmmm, tu nombre no puede ser tan corto, ingresa al menos 3 letras",
//   ).toUpperCase();
// }
// const span = document.getElementById("Bienvenido");
// span.textContent = `Hola, ${nombre}`;
// const i = document.querySelector("i");
// i.setAttribute("class", "fa fa-ticket");

// let nombreSw;
// let edad;
// let botones =document.querySelectorAll("button");
// let i;

// async function solicitarNombre() {
//   try {
//     nombreSw = await swal("¿Como te llamas?", {
//       content: "input",
//     });
//     while (nombreSw.length <= 3) {
//       nombreSw = await swal("Por favor, ingresa tu nombre completo!", {
//         content: "input",
//       });
//     }
//     const bienvenido=document.getElementById("bienvenido");
//   bienvenido.textContent = `Hola ${nombreSw.toUpperCase()}!`;
//   const i = document.querySelector("i");
//   i.setAttribute("class" , "fa fa-ticket");
//   } catch (error) {
//     console.log(error);
//   }
// }

// solicitarNombre();


// async function solicitarEdad() {
//   try {
//     edad = await swal("¿Cuántos años tenés?", {
//       content: "input",
//     });
//     if (edad < 18) {
//       swal("Ups!", "Tenés que ser mayor de edad para comprar tickets", "warning"); 
//       for (let i = 0; i < botones.length; i++) {

//         botones[i].setAttribute("disabled", "disabled");
//         botones[i].style.backgroundColor = "gray";
//         botones[i].textContent= "X" ;
//         botones[i].style.color = "black";
//         botones[i].style.cursor = "default";
//     }      
//     }
//   } catch (error) {
//     console.error(error);
//   }

// }
// // solicitarEdad();


// let tickets = {
//   Mendoza: 0,
//   Cordoba: 1,
//   Neuquen: 100,
//   BuenosAires: 80,
//   Salta: 12,
// };

// function entradas(place) {
//   disableSoldOutButtons(tickets);
//   if (tickets[place] > 0) {
//     swal("Sold!", `Tenes tu entrada para ${place} `, "perfecto!");
//     tickets[place]--;
//     if (tickets[place] == 0) {
//       disableSoldOutButtons(place);
//     }
//   } else {
//     swal(
//       "Upsss!",
//       `No tuviste suerte, ya no quedan entradas... ${place}`,
//       "info"
//     );
//   }
// }
const nombre = document.querySelector("#nombre-usuario");

const onLoad = async () => {
  try {
    const response = await axios.get("../../../me");
    nombre.textContent = `Hola, ${response.data.nombre} ${response.data.apellido}`;
  } catch (error) {
    console.log(error.message);
    // window.location.href = "../index.html";
  }
};

onLoad();

const logOut = async () => {
  try {
    const response = await axios.post("../../logout");
    window.location.href = "../login/login.html";
  } catch (error) {
    console.log(error.message);
  }
};

const Logout = document.getElementById("logout");

Logout.addEventListener("click", () => {
  logOut();
  window.location.href = "./login/login.html";
});