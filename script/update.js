const changeStatus = document.querySelector(".changeStatus");
const updateList = document.querySelector(".updateList");
const estatosTareaList = document.querySelector(".estatosTareaList");
const taskList = document.getElementById("taskList")
const statusList = document.getElementById("secondList")
let statusAEditar;
let idTaskEditar;

function cargarTasksUpdateModal() {
  updateList.innerHTML = "";
  taskList.style.display = "block";
  statusList.style.display = "none";
  tareaLista.forEach((tarea) => {
    let li = `
         <li class="list-group-item updateTarea" data-tittle="${tarea.tittle}"data-id="
         ${tarea.id}">                          <h4>${tarea.tittle} </h4>
         <h6>${tarea.fechaCreacion} </h6>
         </li>`;

    updateList.innerHTML += li;
    eventoSeleccionarTareaEditar();
  });
}


function eventoSeleccionarTareaEditar() {
  const updateTarea = document.querySelectorAll(".updateTarea");
  const tareaAEdiar = document.querySelector(".tareaEditar-tittle");

  updateTarea.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      //cambia los menues
      taskList.style.display = "none";
      statusList.style.display = "block";
      //toma la info de la tarea
      let elemntWithInfo;
      if (e.target.tagName === "LI") {
        elemntWithInfo = e.target;
        //en caso de recibir un elemento hijo llama al padre
      } else {
        elemntWithInfo = e.target.parentElement;
      }
      idTaskEditar = elemntWithInfo.dataset.id.trim();

      //console.log(elemntWithInfo.dataset.tittle,elemntWithInfo.dataset.id)
      tareaAEdiar.innerHTML = elemntWithInfo.dataset.tittle;
      cargarEstadosUpdateModal();
    });
  });
}


function cargarEstadosUpdateModal() {
  estatosTareaList.innerHTML = "";

  listaEstados.forEach((tarea) => {
    let li = `
       <li class="list-group-item updateStatus" data-name="${tarea}""> <h4>${tarea} </h4>  </li>
                 `;
    estatosTareaList.innerHTML += li;
  });
  eventoSeleccionarStatusEditar()
}

function eventoSeleccionarStatusEditar() {
   const updateStatus = document.querySelectorAll(".updateStatus");
   updateStatus.forEach(status =>{
      status.addEventListener("click", (e)=>{
         //statusAEditar = e.target.dataset.name;
         if (e.target.tagName === "LI") {
            statusAEditar = e.target.dataset.name;
            //en caso de recibir un elemento hijo llama al padre
          } else {
            statusAEditar = e.target.parentElement.dataset.name;
          }
          findProductoActualizar()
          //cierra el modal
          document.querySelector('.closeUpdateModalBtn').click();            
      })
    
   })
}

function findProductoActualizar(){

   //let tareaAEditar = tareaLista.forEach(elem => {console.log(parseInt(elem.id) , parseInt(idTaskEditar))})
   let tareaAEditar = tareaLista.find(elem =>parseInt(elem.id) == parseInt(idTaskEditar))

   //console.log(tareaAEditar);
   actualizarTarea(tareaAEditar)

}
function actualizarTarea(tarea)
{
   let neuvaTarea = { ...tarea, estado: statusAEditar };
   if (statusAEditar == listaEstados[listaEstados.length - 1]) {
      let hora = obtenerFechaHoraActual()
       neuvaTarea = { ...neuvaTarea, fechaConclusion: hora};

   }else{
    neuvaTarea = { ...neuvaTarea, fechaConclusion: null};

   }
   tarea = neuvaTarea;
   modifcarProducto(tarea)
   
}
changeStatus.addEventListener("click", (e) => {
  cargarTasksUpdateModal();
});
