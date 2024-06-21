function retornarFilaHTML(data) {
  return `
  <div class="card p-3  ${data.estado}">
       <div class="row no-gutters ">
         <div class="col-9 col-md-8">
           <div class="card-body">
             <h2 class="card-title">${data.tittle}</h2>
             <p class="card-text" data-description="${data.description}">${data.fechaCreacion}</p>
           </div>
         </div>
         <div class="col-3 col-md-4 d-flex justify-content-center align-items-center btnSpeak">
           <img src="images/play.png" class="card-img " alt="...">
         </div>
       </div>
     </div>
 
   `;
}
function agregarEventoAudio() {
  let btnSpeak = document.querySelectorAll(".btnSpeak");

  btnSpeak.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      // Encuentra el elemento con el atributo data-description dentro de la tarjeta
      const descriptionElement = card.querySelector("[data-description]");
      // Obtén el valor de data-description
      const description = descriptionElement.getAttribute("data-description");

      reproducirAudio(description)
    });
  });
}

function mostrarTareas() {
  containerTasks.innerHTML = "";
  tareaLista.forEach((tarea) => {
    containerTasks.innerHTML += retornarFilaHTML(tarea);
  });
  agregarEventoAudio();
}

function ordenarTareas() {
  let statusTerminado = listaEstados[listaEstados.length - 1];
  tareaLista.sort((a, b) => {

    //ordena por estado    
    if (a.estado == statusTerminado && b.estado != statusTerminado) {
      return 1;
    }
    if (a.estado != statusTerminado && b.estado == statusTerminado) {
      return -1;
    }

    //ordena por fecha de creacion las sin terminar
    if(a.estado != statusTerminado && b.estado != statusTerminado){
      let fechaA = convertirFecha(a.fechaCreacion);
      let fechaB = convertirFecha(b.fechaCreacion);
      return fechaB - fechaA;
    }

    //esto es la primer comparacion entre una tarea sin finalizar y una finalizada, si no tira error al envarla ala funcion fecha
    if(a.estado != statusTerminado){
    
      return -1
    }

  // Ordena por fecha en caso de que las 2 tareas esten terminadas
    let fechaA = convertirFecha(a.fechaConclusion);
    let fechaB = convertirFecha(b.fechaConclusion);
    return fechaB - fechaA;
 
 
  });
}

  // Función para convertir la cadena de fecha a un objeto Date

function convertirFecha(fechaStr) {
  const [fecha, hora] = fechaStr.split(', ');
  const [dia, mes, año] = fecha.split('-');
  const [horas, minutos, segundos] = hora.split(':');
  return new Date(año, mes - 1, dia, horas, minutos, segundos);
}
