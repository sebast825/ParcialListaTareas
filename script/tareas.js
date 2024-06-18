
function retornarFilaHTML(data) {
   return `
  <div class="card p-3  ${data.estado}">
       <div class="row no-gutters ">
         <div class="col-9 col-md-8">
           <div class="card-body">
             <h2 class="card-title">${data.tittle}</h2>
             <p class="card-text">${data.fechaCreacion}</p>
           </div>
         </div>
         <div class="col-3 col-md-4 d-flex justify-content-center align-items-center">
           <img src="images/play.png" class="card-img" alt="...">
         </div>
       </div>
     </div>
 
   `;
 }
 obtenerTareas()
 
 function mostrarTareas(){
   console.log("estamos aca")
   ordenarTareas()
   containerTasks.innerHTML = "";
   tareaLista.forEach(
     (tarea) => {
       containerTasks.innerHTML += retornarFilaHTML(tarea)
     }
   )
 }
 
 function ordenarTareas(){
   let statusTerminado = listaEstados[listaEstados.length-1]
   tareaLista.sort((a, b) => {
       //ordena por estado
       if (a.estado == statusTerminado && b.estado != statusTerminado) {
         return 1;
     }
     if (a.estado != statusTerminado && b.estado == statusTerminado) {
         return -1;
     }
 
     // ordena por fecha en caso de que los estados sean iguales
     let fechaA = new Date(a.fechaCreacion);
     let fechaB = new Date(b.fechaCreacion);
   
     return fechaA - fechaB;
   });
 
 }