const containerTasks = document.querySelector(".container");

const URLtarea =
  "https://66252bda04457d4aaf9e131e.mockapi.io/api/v1/tasks";
  
let tareaLista = [];

function retornarFilaHTML(data) {
  return `
 <div class="card p-3">
      <div class="row no-gutters">
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



function obtenerTareas() {
   tareaLista = [];
  fetch(URLtarea)
    .then((response) => {
      // operador ternario como alternativa
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("No se pueden obtener los datos del servidor.");
      }
    })
    .then((data) => {
      tareaLista.push(...data);
      console.log(tareaLista)
      tareaLista.reverse();
      
    })
    .then(() => {
      if (tareaLista.length > 0) {
        //containerFotos.innerHTML ="";
        tareaLista.forEach(
          (tarea) => (containerTasks.innerHTML += retornarFilaHTML(tarea))
        )
        
      }
    
    })
    .catch((error) => {
      ToastIt.now({
        message: error.message,
        style: "error",
        timer: 3700,
        close: true,
      });
    });
}

function guardarTarea(data, callback) {
   // Validación de datos
   const nuevoProducto = {
     fechaCreacion: data.fecha,
     fechaConculsion: null,
     tittle: data.tittle,
     descritcion: data.description,
     estado: "nuevo"
   };
   const opciones = {
     method: "POST",
     headers: { "content-type": "application/json" },
     body: JSON.stringify(nuevoProducto),
   };
 
   fetch(URLtareaLista, opciones)
     .then((response) => {
       if (response.status === 201) {
         return response.json();
       } else {
         throw new Error("No se puede crear el recurso.");
       }
     })
     .then((data) => {
       // Si se proporciona un callback, se llama después de que se completa el guardado
       if (callback) {
         callback();
       }
       // Actualizar tareaLista y mostrar el ID en inputCodigo
       obtenerTareas();
     
     })
     .catch((error) => {
       // Manejo de errores
       ToastIt.now({
         message: error.message,
         style: "error",
         timer: 3700,
         close: true,
       });
     });
 }
 