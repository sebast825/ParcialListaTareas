const changeStatus = document.querySelector(".changeStatus");
const updateList = document.querySelector(".updateList");


           function cargarTasksUpdateModal(){
            updateList.innerHTML += "";
            tareaLista.forEach(tarea =>{
               let li = `
                          <li class="list-group-item updateTarea" data-tittle="${tarea.tittle}"data-id="
                          ${tarea.id}">                          <h4>${tarea.tittle} </h4>
                         <h6>${tarea.fechaCreacion} </h6>

                          </li>

               `
               updateList.innerHTML += li;
            })

            const updateTarea = document.querySelectorAll(".updateTarea");
            const tareaAEdiar = document.querySelector(".tareaEditar-tittle");
 
            updateTarea.forEach(elem =>{
             elem.addEventListener("click", (e)=>{
               let elemntWithInfo;
               if (e.target.tagName === 'LI') {
                  elemntWithInfo = e.target;
                  //en caso de recibir un elemento hijo llama al padre
              } else {
               elemntWithInfo= e.target.parentElement
              }
                console.log(elemntWithInfo.dataset.tittle,elemntWithInfo.dataset.id)
  
               })
            })
          
           }
         
           /*
           updateList.addEventListener('click', function() {
            document.getElementById('taskList').style.display = 'none';
            document.getElementById('secondList').style.display = 'block';
          });
           */
changeStatus.addEventListener("click", (e)=>{
   cargarTasksUpdateModal()
} )

