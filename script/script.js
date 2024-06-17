const createTittle = document.querySelector(".createTittle");
const createDescription = document.querySelector(".createDescription");

const formCreate = document.querySelector(".formCreate");

formCreate.addEventListener("submit", (e) => {
   e.preventDefault();
   console.log(createTittle.value,createDescription.value);
})

function obtenerFechaHoraActual() {
   const fechaHoraActual = new Date();
 
   const año = fechaHoraActual.getFullYear();
   const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, "0");
   const dia = fechaHoraActual.getDate().toString().padStart(2, "0");
   const hora = fechaHoraActual.getHours().toString().padStart(2, "0");
   const minutos = fechaHoraActual.getMinutes().toString().padStart(2, "0");
   const segundos = fechaHoraActual.getSeconds().toString().padStart(2, "0");
 
   const fecha = `${dia}-${mes}-${año}`;
   const horaString = `${hora}:${minutos}:${segundos}`;
 
   return `${fecha}, ${horaString}`;
 }
console.log(obtenerFechaHoraActual())